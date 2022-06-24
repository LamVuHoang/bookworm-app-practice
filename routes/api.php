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
    // Get top 10 books with the most discount : NOT YET, discount must be available at that time
    Route::get('get-top-discount/{number?}', [HomePageController::class, 'getTopDiscount'])
        ->where('number', '[0-9]+');
    // Recommended: Get top 8 books with the most rating start : DONE
    Route::get('get-recommended/{number?}', [HomePageController::class, 'getRecommended'])
        ->where('number', '[0-9]+');
    // Popular: Get top 8 books with the most review and lowest price: DONE
    Route::get('get-popular/{number?}', [HomePageController::class, 'getPopular'])
        ->where('number', '[0-9]+');
});

Route::prefix('shop')->group(function () {

    // Allow to sort by on sale: order by the most discount price1 – check 4.5.1 with descending
    // mode and final price with ascending mode. Set it as default sort of the list page.
    // Sort by popularity
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