<?php

namespace App\Services;

use App\Data\MovieData;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Spatie\LaravelData\DataCollection;

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
    public function getMoviesList(string $endpoint, array $params = [], int $page = 1, string $lang = 'en-US'): array
    {
        // Creiamo una chiave cache che includa anche la pagina
        $cacheKey = "list_" . md5($endpoint . serialize($params) . $page . $lang);

        return Cache::tags(['movies', 'lists'])->remember($cacheKey, now()->addHours(6), function () use ($endpoint, $lang, $params, $page) {
            $response = Http::withToken($this->token)
                ->timeout(self::TIMEOUT)
                ->retry(self::RETRY_ATTEMPTS, self::RETRY_DELAY)
                ->get("{$this->baseUrl}/{$endpoint}", array_merge([
                    'language' => $lang,
                    'page' => $page,
                ], $params));

            if (!$response->successful()) {
                abort(404, "Movie not found in TMDB");
            }

            // Trasformiamo i risultati
            return MovieData::collect($response->json('results'), DataCollection::class)->toArray();
        });
    }
}
