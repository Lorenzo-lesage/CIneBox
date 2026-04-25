<?php

namespace App\Data\Traits;

trait HasTmdbGenres
{
    /**
     * Maps TMDB genre IDs to their human-readable labels.
     */
    protected static function mapTmdbGenres(array $genres, array $genreIds = []): array
    {
        // 1. Build the map from config (movie and tv genres)
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

        // 2. Process already provided genre names (if any)
        $mappedGenres = collect($genres)
            ->map(fn($g) => is_array($g) ? $g['name'] : $g);

        // 3. Fallback to mapping IDs if names are missing
        if ($mappedGenres->isEmpty() && !empty($genreIds)) {
            $mappedGenres = collect($genreIds)
                ->map(fn($id) => $genreMap[$id] ?? null)
                ->filter();
        }

        return $mappedGenres->values()->toArray();
    }
}
