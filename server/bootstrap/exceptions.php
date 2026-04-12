<?php

use Illuminate\Foundation\Configuration\Exceptions;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

return static function (Exceptions $exceptions): void {

    // Force JSON response for all API requests
    $exceptions->shouldRenderJsonWhen(function ($request, $e) {
        return $request->is('api/*') || $request->expectsJson();
    });

    // Handle 404 Not Found for API
    $exceptions->render(function (NotFoundHttpException $e, $request) {
        if ($request->is('api/*')) {
            return response()->json([
                'status' => 404,
                'error' => 'Not Found',
                'message' => 'Content not found',
            ], 404);
        }
    });

    // Handle 403 Forbidden for API
    $exceptions->render(function (AccessDeniedHttpException $e, $request) {
        if ($request->is('api/*')) {
            return response()->json([
                'status' => 403,
                'error' => 'Forbidden',
                'message' => 'Action denied. You do not have permission to perform this action.',
            ], 403);
        }
    });

    // Optionally, you can add more common API exception handlers here,
    // like 401 Unauthorized, ValidationException, or custom app exceptions
};
