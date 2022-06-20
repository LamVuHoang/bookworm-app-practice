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

// Route::prefix('api')->group(function () {
//     Route::prefix('books')->group(function () {
//         Route::get('{id?}', [HomePageController::class, 'index'])->where('id', '[0-9]+');
//         Route::get('{id_book}/reviews/{id_review?}', [HomePageController::class, 'review'])
//             ->where('id_book', '[0-9]+')->where('id_review', '[0-9]+');
//     });

//     Route::prefix('home')->group(function() {

//     });
// });
