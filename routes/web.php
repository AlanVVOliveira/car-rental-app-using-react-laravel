<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::middleware(['auth', 'verified'])->get('/cars-index', function () {
        return Inertia::render('Cars');
    })->name('cars');

    Route::middleware(['auth', 'verified'])->get('/cars-create', function () {
        return Inertia::render('CarRegistration');
    })->name('car-registration');
    
    Route::middleware(['auth', 'verified'])->get('/cars-show/{id}', function ($id) {
        return Inertia::render('RentCar', [
            'id' => $id
        ]);
    })->name('show-car');


    Route::middleware(['auth', 'verified'])->get('/cars-show2/{id}', function ($id) {
        return Inertia::render('EditCar', [
            'id' => $id
        ]);
    })->name('show2-car');


    Route::middleware(['auth', 'verified'])->get('/cars-edit/{id}', function ($id) {
        return Inertia::render('EditCar', [
            'id' => $id
        ]);
    })->name('edit-car');

    Route::middleware(['auth', 'verified'])->get('/clients-index', function () {
        return Inertia::render('Clients');
    })->name('clients');

    Route::middleware(['auth', 'verified'])->get('/clients-create', function () {
        return Inertia::render('CustomerRegistration');
    })->name('customer-registration');

    Route::middleware(['auth', 'verified'])->get('/clients-edit/{id}', function ($id) {
        return Inertia::render('EditClient', [
            'id' => $id
        ]);
    })->name('edit-client');

});

require __DIR__.'/auth.php';
