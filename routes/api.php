<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ShopPageController;

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

Route::prefix('home')->group(function () {
    // Get top 10 books with the most discount : DONE
    Route::get('top_book_discount', [HomePageController::class, 'topBookDiscount']);
    // Get top 8 books with the most rating start : DONE
    Route::get('top_rating_star', [HomePageController::class, 'topRatingStar']);
    // Get top 8 books with the most review
    // (total number of review of a book and lowest final price )
    // USE https://laravel.com/docs/9.x/queries#subquery-joins

});

Route::prefix('shop')->group(function () {
    // Sort book by on sale

    // Sort by popularity

    // Sort by real_price :
    Route::get('discount', [ShopPageController::class, 'discount']);

    // Filtering by Category:  ?conditions=category,2
    // Filtering by Author: ?conditions=author,2
    // Filtering by Rating Review
    // DONE
    Route::get('filter', [ShopPageController::class, 'filter']);


});

Route::prefix('product')->group(function () {
    // Add to Cart

});

Route::prefix('cart')->group(function () {
    // CRUD order & order_item

});
