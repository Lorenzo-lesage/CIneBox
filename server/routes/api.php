<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MovieController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Movies
|--------------------------------------------------------------------------
*/

Route::get('/movies/{tmdbId}', [MovieController::class, 'show'])->name('movies.show');
