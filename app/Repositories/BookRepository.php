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

    public function getById($bookId)
    {
        //Get book with counting all the reviews, and counting each star per book
        return $this->query
            ->where('id', $bookId)
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

    public function getRecommended($number)
    {
        return $this->calStarRating()->orderBy('star_scoring', 'DESC')->limit($number)->get();
    }
    public function getPopular($number)
    {
        return $this->calPopularity()
            ->limit($number)
            ->get();
    }

    public function filter($conditions)
    {
        $conditionsArr = explode(',', $conditions);

        $keySearch = $conditionsArr[0];
        $params = array_slice($conditionsArr, 1);

        if ($keySearch === 'rating') {
            return $this->pagination($this->calStarRating()
                ->where('star_scoring', '>=', $params[0]));
        }

        // author/category
        return $this->pagination($this->query->whereHas($keySearch, function ($query) use ($params) {
            $query->whereIn('id', $params);
        }));
    }

    public function sort($conditions)
    {
        //Handle conditions of URL. Make default = sale,ASC
        if (!$conditions) $conditionsArr = ['sale'];
        else {
            $conditionsArr = explode(',', $conditions);
        }
        if (count($conditionsArr) === 1) array_push($conditionsArr, 'ASC');

        //Handle Request
        if ($conditionsArr[0] === 'price') {
            return $this->pagination($this->calFinalPrice('withJoinSub')
                ->orderBy('sub.final_price', $conditionsArr[1]));
        } else if ($conditionsArr[0] === 'popularity') {
            return $this->pagination($this->calPopularity($conditionsArr[1]));
        } else {
            // DEFAULT: SALE 
            if (strtoupper($conditionsArr[1]) === 'DESC') {
                return $this->pagination($this->calFinalPrice('withJoinSub')
                    ->orderBy('sub.discount_price', $conditionsArr[1]));
            }
            return $this->pagination($this->calFinalPrice('withJoinSub')
                ->orderBy('sub.final_price', $conditionsArr[1]));
        }
    }

    public function calStarRating()
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

        return $this->query
            ->joinSub($bookEach, 't2', function ($join) {
                $join->on('t2.id', '=', 'book.id');
            })
            ->select('*');

        // FROM OPTION 1 ==> OPTION 2: AVERAGE
        // return $this->query
        //     ->selectRaw('book.*, ROUND(AVG(review.rating_start), 1) star_scoring')
        //     ->join('review', 'review.book_id', '=', 'book.id')
        //     ->groupBy('book.id');
    }

    public function calFinalPrice($mode = 'withoutJoinSub')
    {
        $rawTable = DB::table('book')
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

    public function calPopularity($mode = 'DESC')
    {
        $finalPrice = $this->calFinalPrice();

        $rawTable = $this->query
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
}
