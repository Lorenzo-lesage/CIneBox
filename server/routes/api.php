<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\SearchController;

/*
|--------------------------------------------------------------------------
| Public API
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Home
    |--------------------------------------------------------------------------
    */

    Route::get('/home', [HomeController::class, 'index'])
        ->name('home');


    /*
    |--------------------------------------------------------------------------
    | Movies
    |--------------------------------------------------------------------------
    */

    Route::prefix('movies')->group(function () {

        // Movie detail
        Route::get('/{tmdbId}', [MovieController::class, 'show'])
            ->name('movies.show');
    });

    // Movie trailer
    Route::get('/{type}/{id}/trailer', [MovieController::class, 'trailer'])->name('movies.trailer');


    /*
    |--------------------------------------------------------------------------
    | Genres
    |--------------------------------------------------------------------------
    */

    Route::prefix('genres')->group(function () {

        /// Index of genres
        Route::get('/Genres/{type}', [GenreController::class, 'index'])
            ->name('genres.index');

        // Movies by genre
        Route::get('/{genreId}/{type}', [GenreController::class, 'movies'])
            ->name('genres.movies');
    });


    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    Route::get('/search', [SearchController::class, 'search'])
        ->name('search');
});


/*
|--------------------------------------------------------------------------
| Authenticated API
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
