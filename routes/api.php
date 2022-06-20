<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomePageController;


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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('books')->group(function () {
    Route::get('{id?}', [HomePageController::class, 'index'])->where('id', '[0-9]+');
    Route::get('{id_book}/reviews/{id_review?}', [HomePageController::class, 'review'])
        ->where('id_book', '[0-9]+')->where('id_review', '[0-9]+');
});

Route::prefix('home')->group(function() {
    // Get top 10 books with the most discount 
    Route::get('toptendiscount', [HomePageController::class, 'topTenDiscount']);
});
