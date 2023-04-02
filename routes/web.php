<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\shopingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home');
})->name('/Home');




Route::get('/createstore',[shopingController::class,'createStore']);
Route::get('/additem/{id}',[shopingController::class,'product']);
Route::get('/prodcut/{idproduct}',[shopingController::class,'product_store']);
Route::get('/update/{id}',[shopingController::class,'update']);
Route::get('/signup',[shopingController::class,'signup'])->name('sign');


require __DIR__.'/auth.php';
