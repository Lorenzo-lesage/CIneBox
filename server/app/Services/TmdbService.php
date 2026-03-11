<?php

namespace App\Services;

use App\Data\MovieData;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class TmdbService
{
    protected string $token;
    protected string $baseUrl;

    private const MOVIE_APPEND = [
        'videos',
        'credits',
        'images',
        'keywords',
        'release_dates',
        'similar',
        'recommendations'
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

            if ($cached = $cache->get($key)) {
                return $cached;
            }

            $response = Http::withToken($this->token)
                ->timeout(5)
                ->retry(3, 300)
                ->get("{$this->baseUrl}/movie/{$tmdbId}", [
                    'language' => $lang,
                    'append_to_response' => 'videos,credits'
                ]);

            if ($response->failed()) {
                abort(404, "Movie not found in TMDB");
            }

            $movie = MovieData::fromTmdb($response->json());

            $cache->put($key, $movie, now()->addDay());

            return $movie;
        });
    }
}
