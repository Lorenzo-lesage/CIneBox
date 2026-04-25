<?php

namespace App\Data;

use App\Data\Traits\HasTmdbGenres;
use Spatie\LaravelData\Data;

class MovieListData extends Data
{
    use HasTmdbGenres;

    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly ?string $overview,
        public readonly ?string $poster_path,
        public readonly ?string $backdrop_path,
        public readonly array $genres = [],
        public readonly float $vote_average = 0,
        public readonly ?string $release_date = null,
        public float $community_rating = 0,
        public readonly bool $is_favorite = false,
        public readonly float $popularity = 0
    ) {}

    /**
     * Transform raw TMDB list data into a clean MovieListData object.
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
            genres: $genres,
            vote_average: (float) ($data['vote_average'] ?? 0),
            release_date: $data['release_date'] ?? $data['first_air_date'] ?? null,
            community_rating: (float) ($data['community_rating'] ?? 0),
            popularity: (float) ($data['popularity'] ?? 0),
        );
    }
}
