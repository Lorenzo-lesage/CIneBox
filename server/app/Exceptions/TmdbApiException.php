<?php

namespace App\Exceptions;

use Exception;

class TmdbApiException extends Exception
{
    protected $statusCode;
    protected $apiResponse;

    public function __construct($message, $statusCode = 0, $apiResponse = null)
    {
        $this->statusCode = $statusCode;
        $this->apiResponse = $apiResponse;

        parent::__construct($message);
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function getApiResponse()
    {
        return $this->apiResponse;
    }

    /**
     * Metodo utile per capire se l'errore è un "Too Many Requests" (429)
     * e se dovremmo riprovare dopo un po'.
     */
    public function isRateLimit()
    {
        return $this->statusCode === 429;
    }
}
