<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class MovieData extends Data
{
    public function __construct(
        // TMDB
        public int $id,
        public string $title,
        public ?string $overview,
        public ?string $poster_path,
        public ?string $backdrop_path,
        public float $vote_average, // Voto di TMDB
        public ?string $release_date,

        // Custom
        public float $community_rating = 0,
        public bool $is_favorite = false,
    ) {}

    /**
     * Trasforma il JSON disordinato di TMDB in questo oggetto pulito
     */
    public static function fromTmdb(array $data): self
    {
        return new self(
            id: $data['id'],
            title: $data['title'],
            overview: $data['overview'] ?? null,
            poster_path: $data['poster_path'] ?? null,
            backdrop_path: $data['backdrop_path'] ?? null,
            vote_average: (float) $data['vote_average'],
            release_date: $data['release_date'] ?? null,
        );
    }
}
