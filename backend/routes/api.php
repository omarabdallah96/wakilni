<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductTypeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});




Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(ProductTypeController::class)->group(function () {
        Route::get('proudct_types', 'index');
        Route::post('proudct_types', 'store');

        Route::get('proudct_types/{id}', 'show');
    });
    Route::controller(ProductController::class)->group(function () {
        Route::get('items', 'index');
        Route::put('items/{id}', 'update');
        Route::post('items', 'store');
    });
});
