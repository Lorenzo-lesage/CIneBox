<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function __construct(
        protected \App\Services\TmdbService $tmdbService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(int $tmdbId)
    {
        // 1. Get data from TMDB
        $movieData = $this->tmdbService->getMovie($tmdbId, 'en-US');

        // 2. Check if we have local data (ratings, etc.)
        $localMovie = Movie::where('tmdb_id', $tmdbId)->first();

        if ($localMovie) {
            $movieData->community_rating = $localMovie->avg_rating;
        }

        return response()->json($movieData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        //
    }
}
