<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrderController;
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
Route::put('/cars-update/{id}', [CarController::class, 'update'])->name('cars.update');
Route::get('/cars-show/{id}', [CarController::class, 'show'])->name('cars.show');

Route::get('/clients-index', [ClientController::class, 'index'])->name('clients.index');
Route::post('/clients-store', [ClientController::class, 'store'])->name('clients.store');

Route::get('/orders-index', [OrderController::class, 'index'])->name('orders.index');

