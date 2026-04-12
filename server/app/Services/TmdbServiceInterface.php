<?php

namespace App\Services;

use App\Data\MovieData;

interface TmdbServiceInterface
{
    public function getMovie(int $tmdbId, string $lang = 'en-US'): MovieData;

    public function getMoviesList(string $endpoint, array $params = [], int $page = 1, string $lang = 'en-US', string $sortBy = 'popularity.desc'): array;

    public function getMovieTrailer(int $tmdbId): ?string;

    public function getSortValue(string $sortKey): string;
}
