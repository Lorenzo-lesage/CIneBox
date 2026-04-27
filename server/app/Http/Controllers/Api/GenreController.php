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
    public function index(string $type, Request $request)
    {

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
    public function movies(string $type, int $genreId, Request $request)
    {
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

    /**
     * Paginated media by genre.
     */
    public function paginatedMedia(string $type, string $genreId, Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Data
        |--------------------------------------------------------------------------
        */
        $genreId = (int) $genreId;
        $page = (int) $request->input('page', 1);
        $sortBy = $this->tmdbService->getSortValue($request->input('sort_by', 'popular'));
        $endpoint = "discover/{$type}";

        $genre = collect(config('tmdb.genres'))
            ->first(function (array $genre) use ($type, $genreId) {
                return (int) ($genre[$type] ?? 0) === $genreId;
            });

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json(
            $this->tmdbService->getPaginatedMediaList(
                $endpoint,
                ['with_genres' => $genreId],
                $page,
                'en-US',
                $sortBy,
                [
                    'id' => $genreId,
                    'type' => $type,
                    'key' => $genre['key'] ?? null,
                    'label' => $genre['label'] ?? null,
                ],
            )
        );
    }
}
