<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{

    public function __construct(
        protected \App\Services\TmdbService $tmdbService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'popular' => $this->tmdbService->getMoviesList('movie/popular'),
            'hero'    => $this->tmdbService->getMoviesList('trending/movie/week'),
            'action'  => $this->tmdbService->getMoviesList('discover/movie', ['with_genres' => 28]),
            'horror'  => $this->tmdbService->getMoviesList('discover/movie', ['with_genres' => 27]),
            'series'  => $this->tmdbService->getMoviesList('tv/popular'),
        ]);
    }


}
