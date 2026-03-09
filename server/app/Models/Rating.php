<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    /**
     * Summary of fillable
     * @var array
     */
    protected $fillable = [
        'user_id',
        'movie_id',
        'stars',
    ];

    /**
     * Summary of casts
     * @var array
     */
    protected $casts = [
        'stars' => 'integer',
    ];

    /*
    |---------------------------------------------------------------------------
    | Relations
    |---------------------------------------------------------------------------
    */

    /**
     * Summary of user
     * Rate belongs to a user
     * @return BelongsTo<User, Rating>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Summary of movie
     * Rate belongs to a movie
     * @return BelongsTo<Movie, Rating>
     */
    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }
}
