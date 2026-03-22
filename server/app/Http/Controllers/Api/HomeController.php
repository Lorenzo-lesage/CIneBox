<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function __construct(
        protected \App\Services\TmdbService $tmdbService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = $request->input('type', 'movie');
        $page = (int) $request->input('page', 1);

        // Recuperiamo la lista intera dal file config
        $allGenres = config('tmdb.genres');

        // Dividiamo la lista in gruppi di 5
        $genrePages = array_chunk($allGenres, 5);
        $currentPageIndex = $page - 1;

        $response = [];

        if ($page === 1) {
            $heroList = $this->tmdbService->getMoviesList("trending/{$type}/week");

            if (is_a($heroList, \Illuminate\Support\Collection::class)) {
                $response['hero'] = $heroList->shuffle()->values()->all();
            } else {
                shuffle($heroList);
                $response['hero'] = $heroList;
            }

            $response['popular'] = $this->tmdbService->getMoviesList("{$type}/popular");
        }

        // Carichiamo i 5 generi della pagina corrente
        if (isset($genrePages[$currentPageIndex])) {
            foreach ($genrePages[$currentPageIndex] as $genre) {
                $genreId = $genre[$type]; // Prende l'ID dinamico (movie o tv)

                // Se il genere non esiste per questo tipo (es. Music per TV), lo saltiamo
                if (!$genreId) continue;

                $response[$genre['key']] = [
                    'label' => $genre['label'],
                    'data'  => $this->tmdbService->getMoviesList("discover/{$type}", ['with_genres' => $genreId])
                ];
            }
        }

        $response['hasMore'] = isset($genrePages[$page]);
        $response['nextPage'] = $response['hasMore'] ? $page + 1 : null;

        return response()->json($response);
    }
}
