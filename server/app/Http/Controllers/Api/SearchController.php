<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TmdbServiceInterface;

class SearchController extends Controller
{
    public function __construct(
        protected TmdbServiceInterface $tmdbService
    ) {}

    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
            'page' => 'integer|min:1'
        ]);

        return $this->tmdbService->getMediaList(
            'search/movie',
            ['query' => $request->input('q')],
            $request->input('page', 1)
        );
    }
}
