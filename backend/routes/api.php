<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OutletController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API Laravel berhasil'
    ]);
});

Route::apiResource('products', ProductController::class);
Route::apiResource('outlets', OutletController::class);