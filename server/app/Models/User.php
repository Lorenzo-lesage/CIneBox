<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'provider',
        'provider_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /*
    |---------------------------------------------------------------------------
    | Relations
    |---------------------------------------------------------------------------
    */

    /**
     * Summary of ratings
     * A user has many ratings
     * @return HasMany<Rating, User>
     */
    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    /**
     * Summary of comments
     * A user has many comments
     * @return HasMany<Comment, User>
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Summary of favoriteMovies
     * Users that have this movie on favorites
     * @return BelongsToMany<Movie, User, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function favoriteMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'movie_user')
            ->withTimestamps();
    }

    /**
     * Summary of watchHistories
     * A user has many watchHistories
     * @return HasMany<WatchHistory, User>
     */
    public function watchHistories(): HasMany
    {
        return $this->hasMany(WatchHistory::class);
    }
}
