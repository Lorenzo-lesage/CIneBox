<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TmdbService;

class GenreController extends Controller
{
    public function __construct(
        protected TmdbService $tmdbService
    ) {}

    /**
     * Movies by genre
     */
    public function movies(int $genreId, Request $request)
    {
        $page = $request->input('page', 1);

        return response()->json(
            $this->tmdbService->getMoviesList(
                'discover/movie',
                ['with_genres' => $genreId],
                $page
            )
        );
    }
}
