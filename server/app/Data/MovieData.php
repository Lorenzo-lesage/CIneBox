<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Illuminate\Support\Arr;

class MovieData extends Data
{
    private const MAX_CAST = 10;
    private const MAX_SIMILAR = 6;
    private const MAX_KEYWORDS = 5;
    private const DEFAULT_COUNTRY = 'US';
    private const ALT_COUNTRY = 'IT';

    public function __construct(
        // TMDB fields
        public int $id,
        public string $title,
        public ?string $overview,
        public ?string $poster_path,
        public ?string $backdrop_path,
        public ?string $trailer_key,
        public array $genres = [],
        public float $vote_average,
        public ?string $release_date,
        public array $cast = [],
        public ?string $director = null,
        public array $similar = [],
        public array $recommendations = [],
        public ?string $certification = null,
        public array $keywords = [],
        public array $watch_providers = [],

        // Custom fields
        public float $community_rating = 0,
        public bool $is_favorite = false,
    ) {}

    /**
     * Transform raw TMDB JSON into a clean MovieData object.
     */
    public static function fromTmdb(array $data): self
    {
        // --- 1. Extract trailer key ---
        $trailer = collect(Arr::get($data, 'videos.results', []))
            ->first(fn($v) => $v['type'] === 'Trailer' && $v['site'] === 'YouTube')['key'] ?? null;

        // --- 2. Extract director and main cast ---
        $crew = collect(Arr::get($data, 'credits.crew', []));
        $director = $crew->firstWhere('job', 'Director')['name'] ?? null;

        $cast = collect(Arr::get($data, 'credits.cast', []))
            ->take(self::MAX_CAST)
            ->map(fn($c) => [
                'name' => $c['name'],
                'character' => $c['character'],
                'profile_path' => $c['profile_path'],
            ])->toArray();

        // --- 3. Certification (release rating) ---
        $certification = self::extractCertification($data);

        // --- 4. Similar movies ---
        $similar = collect(Arr::get($data, 'similar.results', []))
            ->take(self::MAX_SIMILAR)
            ->map(fn($s) => [
                'id' => $s['id'],
                'title' => $s['title'] ?? $s['name'] ?? 'Untitled',
                'poster_path' => $s['poster_path'] ?? null,
            ])->toArray();

        // --- 5. Genres and keywords ---
        $genres = collect($data['genres'] ?? [])->map(fn($g) => is_array($g) ? $g['name'] : $g)->toArray();
        $keywords = collect(Arr::get($data, 'keywords.keywords', []))
            ->take(self::MAX_KEYWORDS)
            ->pluck('name')
            ->toArray();

        // --- 6. Watch providers (US only for now) ---
        $watchProviders = collect(Arr::get($data, 'watch/providers.results.US.flatrate', []))
            ->map(fn($p) => [
                'name' => $p['provider_name'],
                'logo' => $p['logo_path'],
            ])->toArray();

        // --- 7. Return structured MovieData object ---
        return new self(
            id: $data['id'],
            title: $data['title'] ?? $data['name'] ?? 'Untitled',
            overview: $data['overview'] ?? null,
            poster_path: $data['poster_path'] ?? null,
            backdrop_path: $data['backdrop_path'] ?? null,
            trailer_key: $trailer,
            genres: $genres,
            vote_average: (float) ($data['vote_average'] ?? 0),
            release_date: $data['release_date'] ?? $data['first_air_date'] ?? null,
            cast: $cast,
            director: $director,
            similar: $similar,
            recommendations: Arr::get($data, 'recommendations.results', []),
            certification: $certification,
            keywords: $keywords,
            watch_providers: $watchProviders,
        );
    }

    /**
     * Extract movie certification, fallback IT -> US
     */
    private static function extractCertification(array $data): ?string
    {
        $releaseDates = collect(Arr::get($data, 'release_dates.results', []));

        $cert = $releaseDates
            ->firstWhere('iso_3166_1', self::ALT_COUNTRY)['release_dates'][0]['certification']
            ?? $releaseDates->firstWhere('iso_3166_1', self::DEFAULT_COUNTRY)['release_dates'][0]['certification']
            ?? null;

        return $cert;
    }
}
