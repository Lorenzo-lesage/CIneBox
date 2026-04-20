<?php

namespace App\Services;

use App\Data\MovieData;
use App\Data\MovieListData;
use App\Exceptions\TmdbApiException;
use Illuminate\Support\Facades\Http;

class TmdbService implements TmdbServiceInterface
{
    protected string $token;
    protected string $baseUrl;
    private const TIMEOUT = 5;
    private const RETRY_ATTEMPTS = 3;
    private const RETRY_DELAY = 300;

    private const MOVIE_APPEND = [
        'videos',
        'credits',
        'images',
        'keywords',
        'release_dates',
        'similar',
        'recommendations',
        'watch_providers',
    ];

    public function __construct(?string $token = null, ?string $baseUrl = null)
    {
        $this->token = $token ?? config('services.tmdb.token');
        $this->baseUrl = $baseUrl ?? config('services.tmdb.base_url');
    }

    /**
     * Get the sort value based on the provided key
     * @param string $sortKey
     * @return string
     */
    public function getSortValue(string $sortKey): string
    {
        $allowedSorts = [
            'popular'     => 'popularity.desc',
            'top_rated'   => 'vote_average.desc',
            'latest'      => 'release_date.desc',
            'newest'      => 'primary_release_date.desc',
            'oldest'      => 'primary_release_date.asc',
            'title_az'    => 'title.asc',
            'title_za'    => 'title.desc',
        ];

        return $allowedSorts[$sortKey] ?? $allowedSorts['popular'];
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
        $appendToResponse = implode(',', self::MOVIE_APPEND);

        $response = $this->request('GET', "/{$type}/{$tmdbId}", [
            'language' => $lang,
            'append_to_response' => $appendToResponse
        ]);

        return MovieData::fromTmdb($response->json());
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
        $response = $this->request('GET', "/{$endpoint}", array_merge([
            'language' => $lang,
            'page' => $page,
            'sort_by' => $sortBy,
        ], $params));

        $results = collect($response->json('results'));

        return $results->take(10)
            ->map(fn(array $movie) => MovieListData::fromTmdb($movie)->toArray())
            ->toArray();
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
        $response = $this->request('GET', "/{$type}/{$tmdbId}/videos");

        return collect($response->json('results'))
            ->where('site', 'YouTube')
            ->where('type', 'Trailer')
            ->first()['key'] ?? null;
    }

    /**
     * Centralized request method to handle auth, timeouts, and retries.
     */
    protected function request(string $method, string $endpoint, array $query = [])
    {
        $response = Http::withToken($this->token)
            ->timeout(self::TIMEOUT)
            ->retry(self::RETRY_ATTEMPTS, self::RETRY_DELAY)
            ->{$method}($this->baseUrl . $endpoint, $query);

        if (!$response->successful()) {
            throw new TmdbApiException("TMDB API Error: " . $response->status() . " - " . $response->body());
        }

        return $response;
    }
}
