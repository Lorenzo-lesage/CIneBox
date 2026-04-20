<?php

namespace App\Services;

use App\Data\MovieData;
use Illuminate\Support\Facades\Cache;

class CachingTmdbService implements TmdbServiceInterface
{
    protected TmdbServiceInterface $inner;

    public function __construct(TmdbServiceInterface $inner)
    {
        $this->inner = $inner;
    }

    public function getSortValue(string $sortKey): string
    {
        // No cache needed for a simple mapping
        return $this->inner->getSortValue($sortKey);
    }

    /**
     * Get a movie from TMDB
     * Summary of getMovie
     * @see https://developers.themoviedb.org/3/movies/get-movie-details
     * @param int $tmdbId
     * @param string $lang
     * @return MovieData
     */
    public function getMedia(int $tmdbId, string $type = 'movie', string $lang = 'en-US'): MovieData
    {
        $key = "movie_{$tmdbId}_{$type}_{$lang}";
        $cache = Cache::tags(['movies']);

        if ($cached = $cache->get($key)) {
            return $cached;
        }

        return Cache::lock("lock_{$key}", 10)->block(5, function () use ($tmdbId, $type, $lang, $key, $cache) {
            if ($cached = $cache->get($key)) {
                return $cached;
            }

            $movie = $this->inner->getMedia($tmdbId, $type, $lang);
            $cache->put($key, $movie, now()->addDay());

            return $movie;
        });
    }

    /**
     * Get a list of movies from TMDB
     * Summary of getMoviesList
     * @see https://developers.themoviedb.org/3/discover/movie-discover
     * @param string $endpoint
     * @param array $params
     * @param int $page
     * @param string $lang
     * @param string $sortBy
     * @return array
     */
    public function getMediaList(string $endpoint, array $params = [], int $page = 1, string $lang = 'en-US', string $sortBy = 'popularity.desc'): array
    {
        $cacheKey = "list_" . md5($endpoint . serialize($params) . $page . $lang . $sortBy);

        return Cache::tags(['movies', 'lists'])->remember($cacheKey, now()->addHours(6), function () use ($endpoint, $lang, $params, $page, $sortBy) {
            return $this->inner->getMediaList($endpoint, $params, $page, $lang, $sortBy);
        });
    }

    /**
     * Get a movie trailer from TMDB
     * Summary of getMovieTrailer
     * @see https://developers.themoviedb.org/3/movies/get-movie-videos
     * @param int $tmdbId
     * @return string|null
     */
    public function getMediaTrailer(int $tmdbId, string $type = 'movie'): ?string
    {
        $key = "movie_trailer_{$tmdbId}_{$type}";

        return Cache::remember($key, now()->addWeek(), function () use ($tmdbId, $type) {
            return $this->inner->getMediaTrailer($tmdbId, $type);
        });
    }
}
