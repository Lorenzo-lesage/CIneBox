<?php

namespace App\Data;

use App\Data\Traits\HasTmdbGenres;
use Spatie\LaravelData\Data;
use Illuminate\Support\Arr;

class MovieData extends Data
{
    use HasTmdbGenres;

    private const MAX_CAST = 10;
    private const MAX_SIMILAR = 6;
    private const MAX_KEYWORDS = 5;
    private const DEFAULT_COUNTRY = 'US';
    private const ALT_COUNTRY = 'IT';

    public function __construct(
        // TMDB core fields
        public readonly int $id,
        public readonly string $title,
        public readonly ?string $overview,
        public readonly ?string $poster_path,
        public readonly ?string $backdrop_path,
        public readonly ?string $trailer_key,
        public readonly array $genres = [],
        public readonly float $vote_average = 0,
        public readonly ?string $release_date = null,
        public readonly array $cast = [],
        public readonly ?string $director = null,
        public readonly array $similar = [],
        public readonly array $recommendations = [],
        public readonly ?string $certification = null,
        public readonly array $keywords = [],
        public readonly array $watch_providers = [],
        public readonly ?int $runtime = null,
        public readonly ?string $tagline = null,
        public readonly ?string $status = null,
        public readonly ?int $budget = null,
        public readonly ?int $revenue = null,
        public readonly ?string $homepage = null,
        public readonly ?string $imdb_url = null,
        public readonly array $production_companies = [],
        public readonly array $production_countries = [],
        public readonly array $spoken_languages = [],
        public readonly ?string $collection_name = null,

        // Application custom fields
        public readonly bool $is_upcoming = false,
        public float $community_rating = 0,
        public readonly bool $is_favorite = false,
    ) {}

    /**
     * Transform raw TMDB JSON into a clean MovieData object.
     */
    public static function fromTmdb(array $data): self
    {
        $genres = self::mapTmdbGenres(
            $data['genres'] ?? [],
            $data['genre_ids'] ?? []
        );

        return new self(
            id: $data['id'],
            title: $data['title'] ?? $data['name'] ?? 'Untitled',
            overview: $data['overview'] ?? null,
            poster_path: $data['poster_path'] ?? null,
            backdrop_path: $data['backdrop_path'] ?? null,
            trailer_key: self::extractTrailer($data),
            genres: $genres,
            vote_average: (float) ($data['vote_average'] ?? 0),
            release_date: $data['release_date'] ?? $data['first_air_date'] ?? null,
            cast: self::extractCast($data),
            director: self::extractDirector($data),
            similar: self::extractSimilar($data),
            recommendations: Arr::get($data, 'recommendations.results', []),
            certification: self::extractCertification($data),
            keywords: self::extractKeywords($data),
            watch_providers: self::extractWatchProviders($data),
            runtime: $data['runtime'] ?? null,
            tagline: $data['tagline'] ?? null,
            status: $data['status'] ?? null,
            budget: $data['budget'] ?? 0,
            revenue: $data['revenue'] ?? 0,
            homepage: $data['homepage'] ?? null,
            imdb_url: self::buildImdbUrl($data),
            production_companies: self::extractProductionCompanies($data),
            production_countries: collect(Arr::get($data, 'production_countries', []))->pluck('name')->toArray(),
            spoken_languages: collect(Arr::get($data, 'spoken_languages', []))->pluck('english_name')->toArray(),
            collection_name: data_get($data, 'belongs_to_collection.name'),
            is_upcoming: self::checkIfUpcoming($data),
        );
    }

    // --- Private Extraction Helpers (Improving Readability and Maintainability) ---

    private static function extractTrailer(array $data): ?string
    {
        return collect(Arr::get($data, 'videos.results', []))
            ->first(fn($v) => $v['type'] === 'Trailer' && $v['site'] === 'YouTube')['key'] ?? null;
    }

    private static function extractDirector(array $data): ?string
    {
        return collect(Arr::get($data, 'credits.crew', []))
            ->firstWhere('job', 'Director')['name'] ?? null;
    }

    private static function extractCast(array $data): array
    {
        return collect(Arr::get($data, 'credits.cast', []))
            ->take(self::MAX_CAST)
            ->map(fn($c) => [
                'name' => $c['name'],
                'character' => $c['character'],
                'profile_path' => $c['profile_path'],
            ])->toArray();
    }

    private static function extractSimilar(array $data): array
    {
        return collect(Arr::get($data, 'similar.results', []))
            ->take(self::MAX_SIMILAR)
            ->map(fn($s) => [
                'id' => $s['id'],
                'title' => $s['title'] ?? $s['name'] ?? 'Untitled',
                'poster_path' => $s['poster_path'] ?? null,
            ])->toArray();
    }

    private static function extractKeywords(array $data): array
    {
        return collect(Arr::get($data, 'keywords.keywords', []))
            ->take(self::MAX_KEYWORDS)
            ->pluck('name')
            ->toArray();
    }

    private static function extractWatchProviders(array $data): array
    {
        return collect(Arr::get($data, 'watch/providers.results.US.flatrate', []))
            ->map(fn($p) => [
                'name' => $p['provider_name'],
                'logo' => $p['logo_path'],
            ])->toArray();
    }

    private static function extractProductionCompanies(array $data): array
    {
        return collect(Arr::get($data, 'production_companies', []))
            ->map(fn($p) => [
                'name' => $p['name'],
                'logo' => $p['logo_path'] ? "https://image.tmdb.org/t/p/w200" . $p['logo_path'] : null,
            ])->toArray();
    }

    private static function buildImdbUrl(array $data): ?string
    {
        $imdbId = $data['imdb_id'] ?? null;
        return $imdbId ? "https://www.imdb.com/title/{$imdbId}" : null;
    }

    private static function checkIfUpcoming(array $data): bool
    {
        $releaseDate = $data['release_date'] ?? $data['first_air_date'] ?? null;
        return ($data['status'] !== 'Released') ||
            ($releaseDate && strtotime($releaseDate) > time());
    }

    private static function extractCertification(array $data): ?string
    {
        $releaseDates = collect(Arr::get($data, 'release_dates.results', []));

        return $releaseDates
            ->firstWhere('iso_3166_1', self::ALT_COUNTRY)['release_dates'][0]['certification']
            ?? $releaseDates->firstWhere('iso_3166_1', self::DEFAULT_COUNTRY)['release_dates'][0]['certification']
            ?? null;
    }
}
