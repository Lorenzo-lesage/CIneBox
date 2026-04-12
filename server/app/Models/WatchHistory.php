<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WatchHistory extends Model
{
    /**
     * Summary of fillable
     * @var array
     */
    protected $fillable = [
        'user_id',
        'movie_id',
        'progress_in_seconds',
        'is_completed',
    ];

    /*
    |---------------------------------------------------------------------------
    | Relations
    |---------------------------------------------------------------------------
    */

    /**
     * Summary of casts
     * @var array
     */
    protected $casts = [
        'is_completed' => 'boolean',
        'progress_in_seconds' => 'integer',
    ];

    /**
     * Summary of comments
     * A comment belongs to a movie
     * @return BelongsTo<Movie, Comment>
     */
    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    /**
     * Summary of comments
     * A comment belongs to a user
     * @return BelongsTo<Movie, Comment>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
