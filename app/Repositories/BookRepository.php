<?php

namespace App\Repositories;

use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
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

    public function getByIdWithReviewCounting($bookId)
    {
        //Get book with counting all the reviews, and counting each star per book
        $bookWithReviewCounting = $this->query
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
            ->groupBy('book.id');

        return new BookCollection($bookWithReviewCounting->get());
    }

    public function getPopular($number)
    {
        return $this->query->massItemInformation()
            ->whereNot('discount_price', 0)
            ->whereNot('review_counting', 0)
            ->orderBy('review_counting', 'desc')
            ->orderBy('discount_price')
            ->limit($number)
            ->get();
    }

    public function filter($conditions)
    {
        //hanle Condition and Params
        $conditionsArr = explode(',', $conditions);
        $keySearch = $conditionsArr[0];
        $params = array_slice($conditionsArr, 1);

        //Find API
        if ($keySearch === 'rating') {
            return $this->query->massItemInformation()
                ->whereNot('star_scoring', null)
                ->where('star_scoring', '>=', $params[0])
                ->get();
        } else if ($keySearch === 'author') {
            return $this->query->massItemInformation()
                ->where('author_id', $params[0])
                ->get();
        } else if ($keySearch === 'category') {
            return $this->query->massItemInformation()
                ->where('category_id', $params[0])
                ->get();
        }
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

            return $this->query->finalPrice('withJoinSub')
                ->orderBy('sub.final_price', $conditionsArr[1])->get();
        } else if ($conditionsArr[0] === 'popularity') {

            return $this->query->popularity($conditionsArr[1])->get();
        } else {

            // DEFAULT: SALE 
            if (strtoupper($conditionsArr[1]) === 'DESC') {
                return $this->query->finalPrice('withJoinSub')
                    ->orderBy('sub.discount_price', $conditionsArr[1])->get();
            }
            return $this->query->finalPrice('withJoinSub')
                ->orderBy('sub.final_price', $conditionsArr[1])->get();
        }
    }

    public function test()
    {
        return $this->query->massItemInformation()->paginate(10);
    }
}
