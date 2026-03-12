<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        channels: __DIR__ . '/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (\Illuminate\Foundation\Configuration\Middleware $middleware): void {

        // CORS should run first
        $middleware->prepend(\Illuminate\Http\Middleware\HandleCors::class);

        // API authentication via Sanctum
        $middleware->prepend(\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class);

        // Rate limiting for API requests
        $middleware->prepend(\Illuminate\Routing\Middleware\ThrottleRequests::class);
    })
    ->withExceptions(require __DIR__ . '/exceptions.php')
    ->create();
