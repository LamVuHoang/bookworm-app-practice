<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


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

    public function scopeStarRating($query)
    {
        // OPTION 1: Counting Number of Star each Book, 
        // and Formula: star1 (1) * numberOfStar1 + ... + star5 (5) * numberOfStar5
        // Then Join with Book Table
        $bookEach = DB::table(function ($query) {
            $query->selectRaw(
                'book.id, 
                ROUND(COUNT(review.id), 1) star_counting, 
                ROUND(SUM(review.rating_start), 1) star_weighting'
            )
                ->from('book')
                ->join('review', 'review.book_id', 'book.id')
                ->groupBy('book.id');
        }, 't1')
            ->selectRaw("t1.id, ROUND(t1.star_weighting/t1.star_counting, 1) star_scoring")
            ->whereNot('t1.star_weighting', null);

        return $query
            ->joinSub($bookEach, 't2', function ($join) {
                $join->on('t2.id', '=', 'book.id');
            })
            ->with('discount')
            ->select('*');

        // FROM OPTION 1 ==> OPTION 2: AVERAGE
        // return $this->query
        //     ->selectRaw('book.*, ROUND(AVG(review.rating_start), 1) star_scoring')
        //     ->join('review', 'review.book_id', '=', 'book.id')
        //     ->groupBy('book.id');
    }

    public function scopeFinalPrice($query, $mode = 'withoutJoinSub')
    {
        $rawTable = $query
            ->selectRaw(
                "book.id,
                book.book_price book_price,
                CASE
                WHEN discount.discount_end_date IS NULL
                    AND DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW()) 
                    THEN discount.discount_price
                WHEN DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())
                    AND DATE_TRUNC('DAY', discount.discount_end_date) > DATE_TRUNC('DAY', NOW()) 
                    THEN discount.discount_price
                ELSE 0
                END discount_price,
                book_price - discount_price final_price"
            )
            ->join('discount', 'discount.book_id', '=', 'book.id');

        if ($mode === 'withJoinSub') {
            return DB::table('book')
                ->joinSub($rawTable, 'sub', function ($join) {
                    $join->on('sub.id', '=', 'book.id');
                })
                ->join('author', 'author.id', 'book.author_id')
                ->select('*');
        }
        return $rawTable;
    }

    public function scopePopularity($query, $mode = 'DESC')
    {
        $finalPrice = $this->scopeFinalPrice($query);

        $rawTable = $query
            ->joinSub($finalPrice, 'sub', function ($join) {
                $join->on('sub.id', '=', 'book.id');
            })
            ->join('author', 'author.id', 'book.author_id')
            ->select('*')
            ->withCount(['reviews as review_count']);

        if (strtoupper($mode) === 'ASC') {
            return $rawTable
                ->orderBy('review_count')
                ->orderBy('sub.final_price', 'DESC');
        }
        return $rawTable
            ->orderBy('review_count', 'DESC')
            ->orderBy('sub.final_price');
    }

    public function newFinalPrice()
    {
        return DB::table('book')->selectRaw(
            "book.id,
            book.book_price book_price,
            CASE
            WHEN discount.discount_end_date IS NULL
                AND DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW()) 
                THEN discount.discount_price
            WHEN DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())
                AND DATE_TRUNC('DAY', discount.discount_end_date) > DATE_TRUNC('DAY', NOW()) 
                THEN discount.discount_price
            ELSE 0
            END discount_price,
            book_price - discount_price sub_price"
        )
            ->leftJoin('discount', 'discount.book_id', '=', 'book.id');
    }

    public function newReviewCount()
    {
        return DB::table('book')
            ->leftJoin('review', 'review.book_id', 'book.id')
            ->selectRaw('book.id, COUNT(review.id) review_counting')
            ->groupBy('book.id');
    }

    public function newStarScoring()
    {
        return DB::table(function ($innerQuery) {
            $innerQuery->selectRaw(
                'book.id, 
            ROUND(COUNT(review.id), 1) star_counting, 
            ROUND(SUM(review.rating_start), 1) star_weighting'
            )
                ->from('book')
                ->leftJoin('review', 'review.book_id', 'book.id')
                ->groupBy('book.id');
        }, 't1')
            ->selectRaw("t1.id, ROUND(t1.star_weighting/t1.star_counting, 1) star_scoring");
    }

    public function scopeMassItemInformation($query)
    {
        $finalPrice = $this->newFinalPrice();

        $reviewCount = $this->newReviewCount();

        $starScoring = $this->newStarScoring();

        return $query->joinSub($finalPrice, 'final_price', function ($join) {
            $join->on('final_price.id', 'book.id');
        })->joinSub($starScoring, 'star_scoring', function ($join) {
            $join->on('star_scoring.id', 'book.id');
        })->joinSub($reviewCount, 'review_count', function ($join) {
            $join->on('review_count.id', 'book.id');
        })
            ->join('author', 'author.id', 'book.author_id');
    }
}
