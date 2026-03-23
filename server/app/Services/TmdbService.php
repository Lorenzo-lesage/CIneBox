<?php

namespace App\Services;

use App\Data\MovieData;
use App\Data\MovieListData;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class TmdbService
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

    public function __construct()
    {
        $this->token = config('services.tmdb.token');
        $this->baseUrl = config('services.tmdb.base_url');
    }

    /**
     * Summary of getSortBy
     * Sorting function
     * @param Request $request
     * @return string
     */
    public function getSortBy(Request $request): string
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

        $sortKey = $request->input('sort_by', 'popular');

        return $allowedSorts[$sortKey] ?? $allowedSorts['popular'];
    }

    /**
     * Return a movie from TMDB
     */
    public function getMovie(int $tmdbId, string $lang = 'en-US'): MovieData
    {
        $key = "movie_{$tmdbId}_{$lang}";
        $cache = Cache::tags(['movies']);

        if ($cached = $cache->get($key)) {
            return $cached;
        }

        return Cache::lock("lock_{$key}", 10)->block(5, function () use ($tmdbId, $lang, $key, $cache) {

            $appendToResponse = implode(',', self::MOVIE_APPEND);

            if ($cached = $cache->get($key)) {
                return $cached;
            }

            $response = Http::withToken($this->token)
                ->timeout(self::TIMEOUT)
                ->retry(self::RETRY_ATTEMPTS, self::RETRY_DELAY)
                ->get("{$this->baseUrl}/movie/{$tmdbId}", [
                    'language' => $lang,
                    'append_to_response' =>  $appendToResponse
                ]);

            if (!$response->successful()) {
                abort(404, "Movie not found in TMDB");
            }

            $movie = MovieData::fromTmdb($response->json());

            $cache->put($key, $movie, now()->addDay());

            return $movie;
        });
    }

    /**
     * Summary of getMoviesList
     * @param string $endpoint
     * @param array $params
     * @param int $page
     * @param string $lang
     * @return array
     */
    public function getMoviesList(string $endpoint, array $params = [], int $page = 1, string $lang = 'en-US', string $sortBy = 'popularity.desc'): array
    {
        // Creiamo una chiave cache che includa anche la pagina
        $cacheKey = "list_" . md5($endpoint . serialize($params) . $page . $lang . $sortBy);

        return Cache::tags(['movies', 'lists'])->remember($cacheKey, now()->addHours(6), function () use ($endpoint, $lang, $params, $page, $sortBy) {
            $response = Http::withToken($this->token)
                ->timeout(self::TIMEOUT)
                ->retry(self::RETRY_ATTEMPTS, self::RETRY_DELAY)
                ->get("{$this->baseUrl}/{$endpoint}", array_merge([
                    'language' => $lang,
                    'page' => $page,
                    'sort_by' => $sortBy,
                ], $params));

            if (!$response->successful()) {
                abort(404, "Movie not found in TMDB");
            }

            // 1. Prendiamo i risultati (che TMDB manda sempre a 20)
            $results = collect($response->json('results'));

            // 2. Ne teniamo solo 10
            $limitedResults = $results->take(10);

            // 3. Trasformiamo solo i 10 selezionati
            return $limitedResults
                ->map(fn(array $movie) => MovieListData::fromTmdb($movie)->toArray())
                ->toArray();
        });
    }


    /**
     * Summary of getMovieTrailer
     * Method to take trailer
     * @param int $tmdbId
     */
    public function getMovieTrailer(int $tmdbId): ?string
    {
        $key = "movie_trailer_{$tmdbId}";

        return Cache::remember($key, now()->addWeek(), function () use ($tmdbId) {
            $response = Http::withToken($this->token)
                ->get("{$this->baseUrl}/movie/{$tmdbId}/videos");

            if ($response->successful()) {
                return collect($response->json('results'))
                    ->where('site', 'YouTube')
                    ->where('type', 'Trailer')
                    ->first()['key'] ?? null;
            }
            return null;
        });
    }
}
