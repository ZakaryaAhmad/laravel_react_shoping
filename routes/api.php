<?php

use App\Http\Controllers\shopingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/',[ShopingController::class,'allStore']);
Route::get('/get_product_store/{id}',[ShopingController::class,'get_product_store']);
Route::get('/update-item/{id}',[ShopingController::class,'update_item']);
Route::delete('/delete-store/{id}',[shopingController::class,'delete_store']);
Route::post('/uplode-image',[ShopingController::class,'uploadImage']);
Route::post('/sign-up',[ShopingController::class,'createUser']);
Route::post('/login',[ShopingController::class,'login']);
Route::post('/update/{id}',[ShopingController::class,'update_product']);
Route::post('/add-product',[ShopingController::class,'add_Prodcut']);