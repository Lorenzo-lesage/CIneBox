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

        // Configura il CORS in modo esplicito per Laravel 12
        $middleware->validateCsrfTokens(except: [
            'api/*', // Esclude il controllo CSRF per le API
        ]);

        $middleware->statefulApi(); // Fondamentale per Sanctum e Next.js

        // Questo sostituisce il vecchio file cors.php
        $middleware->alias([
            'cors' => \Illuminate\Http\Middleware\HandleCors::class,
        ]);
    })
    ->withExceptions(require __DIR__ . '/exceptions.php')
    ->create();
