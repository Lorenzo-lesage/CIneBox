<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    /**
     * Summary of fillable
     * @var array
     */
    protected $fillable = [
        'tmdb_id',
        'title',
        'poster_path',
        'avg_rating'
    ];

    /**
     * Summary of casts
     * @var array
     */
    protected $casts = [
        'avg_rating' => 'float',
        'tmdb_id' => 'integer',
    ];

    /*
    |---------------------------------------------------------------------------
    | Relations
    |---------------------------------------------------------------------------
    */

    /**
     * Summary of ratings
     * A movie has many ratings
     * @return HasMany<Rating, Movie>
     */
    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    /**
     * Summary of comments
     * A movie has many comments
     * @return HasMany<Comment, Movie>
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Summary of favoritedBy
     * Users that have this movie on favorites
     * @return BelongsToMany<User, Movie, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'movie_user')
            ->withTimestamps();
    }
}
