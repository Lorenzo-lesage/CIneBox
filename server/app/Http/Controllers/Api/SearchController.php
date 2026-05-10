<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TmdbServiceInterface;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    public function __construct(
        protected TmdbServiceInterface $tmdbService
    ) {}

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['bail', 'required', 'string', 'min:1', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $results = $this->tmdbService->getSearchMediaList(
            'search/multi',
            [
                'query' => trim($validated['q']),
                'include_adult' => false,
            ],
            $validated['page'] ?? 1
        );

        return response()->json($results);
    }
}
