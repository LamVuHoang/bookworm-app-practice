<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProductPageController;
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

Route::prefix('home')->group(function () {
    // Get top 10 books with the most discount : DONE
    Route::get('top_book_discount', [HomePageController::class, 'topBookDiscount']);
    // Recommended: Get top 8 books with the most rating start : DONE
    Route::get('top_most_rating_star', [HomePageController::class, 'topMostRatingStar']);
    // Popular: Get top 8 books with the most review : DONE
    Route::get('top_most_review', [HomePageController::class, 'topMostReview']);
});

Route::prefix('shop')->group(function () {
    // Sort book by on sale ????? Requirement File
    // Sort by popularity ????? Requirement File
    // Sort by real_price 
    // DONE
    Route::get('sort', [ShopPageController::class, 'sort']);

    // Filtering by Category:  ?conditions=category,2
    // Filtering by Author: ?conditions=author,2
    // Filtering by Rating Review
    // DONE
    Route::get('filter', [ShopPageController::class, 'filter']);
});

Route::prefix('product')->group(function () {
    // Listing: List rating star, number of review, review_num each rating star: DONE
    Route::get('{id?}', [ProductPageController::class, 'index'])->where('id', '[0-9]+');
    Route::get('{id_book}/rating/{rating_star?}', [ProductPageController::class, 'review'])
        ->where('id_book', '[0-9]+')->where('rating_star', '[1-5]');

    // Sorting: Date of review

});

Route::prefix('cart')->group(function () {
    // CRUD order & order_item
    //READ 

    //CREATE

    //UPDATE

    //DELETE

});
