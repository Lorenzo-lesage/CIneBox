<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use App\Services\TmdbServiceInterface;

class MovieController extends Controller
{
    public function __construct(protected TmdbServiceInterface $tmdbService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = $request->input('type', 'movie');
        $page = $request->input('page', 1);
        $sortBy = $this->tmdbService->getSortValue($request->input('sort_by', 'popular'));

        $endpoint = ($type === 'tv') ? 'discover/tv' : 'discover/movie';

        $results = $this->tmdbService->getMediaList($endpoint, [], $page, 'en-US', $sortBy);

        return response()->json($results);
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
    public function show(int $tmdbId, Request $request)
    {
        $type = $request->query('type', 'movie');
        $movieData = $this->tmdbService->getMedia($tmdbId, $type, 'en-US');

        // 2. Check if we have local data (ratings, etc.)
        $localMovie = Movie::firstWhere('tmdb_id', $tmdbId);
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

    /**
     * Summary of trailer
     * @param int $id
     * @param TmdbServiceInterface $tmdbService
     * @return \Illuminate\Http\JsonResponse
     */
    public function trailer(string $type, int $id, TmdbServiceInterface $tmdbService)
    {
        $trailerKey = $tmdbService->getMediaTrailer($id, $type);

        if (!$trailerKey) {
            return response()->json(['message' => 'Trailer not found'], 404);
        }

        return response()->json([
            'trailer_key' => $trailerKey
        ]);
    }
}
