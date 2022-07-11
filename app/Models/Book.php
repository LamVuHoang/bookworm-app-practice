<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Database\Eloquent\Builder;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    public function discount()
    {
        return $this->hasOne(Discount::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function newDiscountPrice($id = null)
    {
        $newFinalePrice = DB::table(function ($innerQuery) {
            $innerQuery->selectRaw(
                "book.id AS book_id,
                book.book_price AS book_price,
                CASE
                WHEN discount.discount_end_date IS NULL
                AND DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW()) 
                THEN discount.discount_price
                WHEN DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())
                AND DATE_TRUNC('DAY', discount.discount_end_date) > DATE_TRUNC('DAY', NOW()) 
                THEN discount.discount_price
                ELSE 0
                END AS discount_price,
                (book_price - discount_price) AS sub_price"
            )
                ->from('book')
                ->leftJoin('discount', 'discount.book_id', '=', 'book.id');
        }, 't1')
            ->selectRaw("
            t1.book_id,
            t1.book_price,
            t1.discount_price,
            t1.sub_price,
            CASE 
            WHEN t1.discount_price = 0
                THEN t1.book_price
            ELSE t1.discount_price
            END AS final_price
        ");

        if ($id) return $newFinalePrice->where('t1.book_id', $id);
        return $newFinalePrice;
    }

    public function newReviewCount($id = null)
    {
        $newReviewCount = DB::table('book')
            ->leftJoin('review', 'review.book_id', 'book.id')
            ->selectRaw('book.id AS book_id, COUNT(review.id) review_counting')
            ->groupBy('book.id');
        if ($id) return $newReviewCount->where('book.id', $id);
        return $newReviewCount;
    }

    public function newStarScoring($id = null)
    {
        $newStarScoring = DB::table(function ($innerQuery) {
            $innerQuery->selectRaw(
                'book.id AS book_id, 
                ROUND(COUNT(review.id), 1) star_counting, 
                ROUND(SUM(review.rating_start), 1) star_weighting'
            )
                ->from('book')
                ->leftJoin('review', 'review.book_id', 'book.id')
                ->groupBy('book.id');
        }, 't1')
            ->selectRaw("t1.book_id, ROUND(t1.star_weighting/t1.star_counting, 1) star_scoring");

        if ($id) return $newStarScoring->where('t1.book_id', $id);
        return $newStarScoring;
    }

    public function scopeMassItemInformation($query)
    {
        $discountPrice = $this->newDiscountPrice();
        $reviewCount = $this->newReviewCount();
        $starScoring = $this->newStarScoring();

        return $query->joinSub($discountPrice, 'discount_price', function ($join) {
            $join->on('discount_price.book_id', 'book.id');
        })->joinSub($starScoring, 'star_scoring', function ($join) {
            $join->on('star_scoring.book_id', 'book.id');
        })->joinSub($reviewCount, 'review_count', function ($join) {
            $join->on('review_count.book_id', 'book.id');
        })
            ->join('author', 'author.id', 'book.author_id')
            ->selectRaw('*');
    }

    public function scopeIndividualItemInformation($query, $id)
    {
        $discountPrice = $this->newDiscountPrice($id);
        $starScoring = $this->newStarScoring($id);

        return $query
            ->joinSub($discountPrice, 'discount_price', function ($join) {
                $join->on('discount_price.book_id', 'book.id');
            })
            ->joinSub($starScoring, 'star_scoring', function ($join) {
                $join->on('star_scoring.book_id', 'book.id');
            })
            ->join('author', 'book.author_id', 'author.id')
            // Get book with counting all the reviews, and counting each star per book
            ->withCount([
                'reviews AS review_all_count',
                'reviews AS one_star' => function (Builder $query) {
                    $query->where('rating_start', 1);
                },
                'reviews AS two_star' => function (Builder $query) {
                    $query->where('rating_start', 2);
                },
                'reviews AS three_star' => function (Builder $query) {
                    $query->where('rating_start', 3);
                },
                'reviews AS four_star' => function (Builder $query) {
                    $query->where('rating_start', 4);
                },
                'reviews AS five_star' => function (Builder $query) {
                    $query->where('rating_start', 5);
                },
            ])
            ->select('*');
    }
}
