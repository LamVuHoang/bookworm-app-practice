<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Book;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class BookRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Book::query();
    }

    public function getById($bookID)
    {
        return $this->query
            ->where('id', $bookID)
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
            ->groupBy('book.id')
            ->get();
    }

    public function getReviewEachBook($bookID, $ratingStar)
    {
        if ($ratingStar) {
            return $this->paginate_review(
                $this->query->find($bookID)->reviews()->where('rating_start', $ratingStar)
            );
        }
        return $this->paginate_review($this->query->find($bookID)->reviews());
    }

    public function getTopMostRatingStar()
    {
        return $this->getStarScoring()->orderBy('star_scoring', 'DESC')->limit(8)->get();
    }
    public function getTopMostReview()
    {
        $finalPrice = $this->getFinalPriceRaw();

        return $this->query
            ->joinSub($finalPrice, 'sub', function ($join) {
                $join->on('sub.id', '=', 'book.id');
            })
            ->select('*')
            ->withCount(['reviews as review_count'])
            ->orderBy('review_count', 'DESC')
            ->orderBy('sub.final_price')
            ->limit(8)
            ->get();
    }

    public function filter($conditions)
    {
        $conditionsArr = explode(',', $conditions);
        if ($conditionsArr[0] === 'rating') {
            return $this->pagination($this->getStarScoring()->orderBy('book.id'));
        }
        return $this->pagination(
            $this->query->whereRelation($conditionsArr[0], 'id', $conditionsArr[1])
        );
    }

    public function sort($conditions)
    {
        if ($conditions) {
            $conditionsArr = explode(',', $conditions);
            if (count($conditionsArr) === 1) array_push($conditionsArr, 'ASC');
        } else {
            $conditionsArr = ['', 'DESC'];
        }


        if ($conditionsArr[0] === 'sale') {
            return $this->getFinalPriceFullTable()
                ->orderBy('sub.discount_price', $conditionsArr[1])
                ->get();
        } else if ($conditionsArr[0] === 'popularity') {
            $finalPrice = $this->getFinalPriceRaw();

            return $this->query
                ->joinSub($finalPrice, 'sub', function ($join) {
                    $join->on('sub.id', '=', 'book.id');
                })
                ->select('*')
                ->withCount(['reviews as review_count'])
                ->orderBy('review_count', 'DESC')
                ->orderBy('sub.final_price')
                ->get();
        } else {
            return $this->getFinalPriceFullTable()
                ->orderBy('sub.final_price', $conditionsArr[1])
                ->get();
        }
    }

    public function getStarScoring()
    {
        // OPTION 1: Counting Number of Star each Book, 
        // and Formula: star1 (1) * numberOfStar1 + ... + star5 (5) * numberOfStar5
        // Then Join with Book Table

        // FROM OPTION 1 ==> OPTION 2: AVERAGE
        return $this->query
            ->selectRaw('book.*, ROUND(AVG(review.rating_start), 1) star_scoring')
            ->join('review', 'review.book_id', '=', 'book.id')
            ->groupBy('book.id');
    }

    public function getFinalPriceRaw()
    {
        return DB::table('book')
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
    }

    public function getFinalPriceFullTable()
    {
        $finalPrice =  $this->getFinalPriceRaw();

        return DB::table('book')
            ->joinSub($finalPrice, 'sub', function ($join) {
                $join->on('sub.id', '=', 'book.id');
            })
            ->select('*');
    }

    public function getSingle($id)
    {
        return $this->query
            ->leftJoin('review', 'book.id', 'review.book_id')
            ->where('book.id', $id)
            ->selectRaw('book.*, review.*')
            ->withCount('reviews as all_review_count')
            ->get();
    }
}
