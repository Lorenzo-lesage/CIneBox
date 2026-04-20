<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TmdbServiceInterface;

class GenreController extends Controller
{
    public function __construct(
        protected TmdbServiceInterface $tmdbService
    ) {}

    /**
     * Summary of index
     * Index of genres
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $type = $request->query('type', 'movie'); // Default a movie

        // Recuperiamo i generi dal file config/tmdb.php che abbiamo creato
        $genres = config('tmdb.genres');

        // Filtriamo per rimuovere i generi che non hanno un ID per quel tipo
        // (es. 'Kids' non ha un ID movie, quindi lo nascondiamo se type=movie)
        $filtered = array_filter($genres, function ($genre) use ($type) {
            return !is_null($genre[$type]);
        });

        // Usiamo array_values per resettare le chiavi dell'array dopo il filtro
        return response()->json(array_values($filtered));
    }

    /**
     * Movies by genre
     */
    public function movies(int $genreId, Request $request)
    {
        $type = $request->query('type', 'movie');
        $page = $request->input('page', 1);
        $sortBy = $this->tmdbService->getSortValue($request->input('sort_by', 'popular'));

        $endpoint = "discover/{$type}";

        return response()->json(
            $this->tmdbService->getMediaList(
                $endpoint,
                ['with_genres' => $genreId],
                (int) $page,
                'en-US',
                $sortBy
            )
        );
    }
}
