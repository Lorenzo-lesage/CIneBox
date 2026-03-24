<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class MovieListData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $overview,
        public ?string $poster_path,
        public ?string $backdrop_path,
        public array $genres = [],
        public float $vote_average,
        public ?string $release_date,
        public float $community_rating = 0,
        public bool $is_favorite = false,
        public float $popularity = 0
    ) {}

    public static function fromTmdb(array $data): self
    {
        $genreMap = collect(config('tmdb.genres'))
            ->reduce(function ($carry, $genre) {
                if (!empty($genre['movie'])) {
                    $carry[$genre['movie']] = $genre['label'];
                }

                if (!empty($genre['tv'])) {
                    $carry[$genre['tv']] = $genre['label'];
                }

                return $carry;
            }, []);

        $genres = collect($data['genres'] ?? [])
            ->map(fn($g) => is_array($g) ? $g['name'] : $g);

        if ($genres->isEmpty() && !empty($data['genre_ids'])) {
            $genres = collect($data['genre_ids'])
                ->map(fn($id) => $genreMap[$id] ?? null)
                ->filter();
        }

        return new self(
            id: $data['id'],
            title: $data['title'] ?? $data['name'] ?? 'Untitled',
            overview: $data['overview'] ?? null,
            poster_path: $data['poster_path'] ?? null,
            backdrop_path: $data['backdrop_path'] ?? null,
            genres: $genres->values()->toArray(),
            vote_average: (float) ($data['vote_average'] ?? 0),
            release_date: $data['release_date'] ?? $data['first_air_date'] ?? null,
            community_rating: (float) ($data['community_rating'] ?? 0),
            popularity: (float) ($data['popularity'] ?? 0),
        );
    }
}
