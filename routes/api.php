<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientController;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/cars-index', [CarController::class, 'index'])->name('cars.index');
Route::post('/cars-store', [CarController::class, 'store'])->name('cars.store');

Route::get('/clients-index', [ClientController::class, 'index'])->name('clients.index');
Route::get('/clients-store', [ClientController::class, 'store'])->name('clients.store');

