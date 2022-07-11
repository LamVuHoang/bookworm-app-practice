<?php

use App\Http\Controllers\HomePageController;
use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Route::prefix('shop')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });
});

Route::prefix('product')->group(function () {
    Route::get('{id}', function () {
        return view('welcome');
    });
});


Route::get('about', function () {
    return view('welcome');
});

Route::get('cart', function () {
    return view('welcome');
});

Route::get('signin', function () {
    return view('welcome');
});
