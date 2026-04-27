<?php

namespace App\Services;

use App\Data\MovieData;
use App\Data\GenreMediaListData;

interface TmdbServiceInterface
{
    public function getMedia(int $tmdbId, string $type = 'movie', string $lang = 'en-US'): MovieData;

    public function getMediaList(string $endpoint, array $params = [], int $page = 1, string $lang = 'en-US', string $sortBy = 'popularity.desc'): array;

    public function getMediaTrailer(int $tmdbId, string $type = 'movie'): ?string;

    public function getSortValue(string $sortKey): string;

    public function getPaginatedMediaList(
        string $endpoint,
        array $params = [],
        int $page = 1,
        string $lang = 'en-US',
        string $sortBy = 'popularity.desc',
        array $genre = [],
    ): GenreMediaListData;
}
