<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class GenreMediaListData extends Data
{
    public function __construct(
        public readonly array $data,
        public readonly int $current_page,
        public readonly int $total_pages,
        public readonly int $total_results,
        public readonly array $genre,
    ) {}

    /**
     * Transform paginated TMDB genre data into a clean response object.
     */
    public static function fromTmdb(array $payload): self
    {
        return new self(
            data: collect($payload['results'] ?? [])
                ->map(fn(array $media) => MovieListData::fromTmdb($media)->toArray())
                ->values()
                ->toArray(),
            current_page: (int) ($payload['page'] ?? 1),
            total_pages: (int) ($payload['total_pages'] ?? 1),
            total_results: (int) ($payload['total_results'] ?? 0),
            genre: $payload['genre'] ?? [],
        );
    }
}
