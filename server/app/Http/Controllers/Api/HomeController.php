<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TmdbServiceInterface;

class HomeController extends Controller
{

    public function __construct(
        protected TmdbServiceInterface $tmdbService
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
            $heroList = $this->tmdbService->getMediaList("trending/{$type}/week");

            if ($heroList instanceof \Illuminate\Support\Collection) {
                $response['hero'] = $heroList->shuffle()->values()->all();
            } else {
                shuffle($heroList);
                $response['hero'] = $heroList;
            }

            $response['popular'] = $this->tmdbService->getMediaList("{$type}/popular");
            $response['top_rated'] = $this->tmdbService->getMediaList("{$type}/top_rated");
            $upcomingEndpoint = ($type === 'movie') ? 'movie/upcoming' : 'tv/on_the_air';
            $response['upcoming'] = [
                'label' => ($type === 'movie') ? 'Up coming' : 'On the air',
                'data'  => $this->tmdbService->getMediaList($upcomingEndpoint, ['region' => 'IT'])
            ];
        }

        // Carichiamo i 5 generi della pagina corrente
        if (isset($genrePages[$currentPageIndex])) {
            foreach ($genrePages[$currentPageIndex] as $genre) {
                $genreId = $genre[$type]; // Prende l'ID dinamico (movie o tv)

                // Se il genere non esiste per questo tipo (es. Music per TV), lo saltiamo
                if (!$genreId) continue;

                $response[$genre['key']] = [
                    'label' => $genre['label'],
                    'data'  => $this->tmdbService->getMediaList("discover/{$type}", ['with_genres' => $genreId])
                ];
            }
        }

        $response['hasMore'] = isset($genrePages[$page]);
        $response['nextPage'] = $response['hasMore'] ? $page + 1 : null;

        return response()->json($response);
    }
}
