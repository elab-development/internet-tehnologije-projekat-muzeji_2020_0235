<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MuseumController;
use App\Http\Controllers\ReservationController;
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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/museums', [MuseumController::class, 'index']);       // Prikaz svih muzeja
    Route::get('/museums/{id}', [MuseumController::class, 'show']);   // Prikaz jednog muzeja
    Route::post('/museums', [MuseumController::class, 'store']);      // Kreiranje novog muzeja
    Route::put('/museums/{id}', [MuseumController::class, 'update']); // Ažuriranje muzeja
    Route::delete('/museums/{id}', [MuseumController::class, 'destroy']); // Brisanje muzeja


    Route::get('/reservations', [ReservationController::class, 'index']);       // Prikaz svih rezervacija za korisnika
    Route::get('/reservations/{id}', [ReservationController::class, 'show']);   // Prikaz jedne rezervacije
    Route::post('/reservations', [ReservationController::class, 'store']);      // Kreiranje nove rezervacije
    Route::put('/reservations/{id}', [ReservationController::class, 'update']); // Ažuriranje rezervacije
    Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']); // Brisanje rezervacije

    Route::resource('messages', MessageController::class);
});

 