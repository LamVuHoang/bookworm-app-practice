<?php

namespace App\Repositories;

// use App\Http\Resources\BookCollection;
// use App\Http\Resources\BookResource;
use App\Repositories\BaseRepository;
use App\Models\Book;

class BookRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Book::query();
    }

    public function getByIdWithReviewCounting($bookId)
    {
        return $this->query->individualItemInformation($bookId)->first();
    }

    public function getPopular($number)
    {
        $popularBook = $this->query->massItemInformation()
            ->whereNot('discount_price', 0)
            ->whereNot('review_counting', 0)
            ->orderBy('review_counting', 'desc')
            ->orderBy('discount_price')
            ->limit($number)
            ->get();

        return $popularBook;
        // return BookResource::collection($popularBook);
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
                ->paginate(parent::$item_per_page);
        } else if ($keySearch === 'author') {
            return $this->query->massItemInformation()
                ->where('author_id', $params[0])
                ->paginate(parent::$item_per_page);
        } else if ($keySearch === 'category') {
            return $this->query->massItemInformation()
                ->where('category_id', $params[0])
                ->paginate(parent::$item_per_page);
        }
    }

    public function sort($conditions)
    {
        //Handle conditions of URL. Make default = sale,ASC
        if (!$conditions) $conditionsArr = ['sale'];
        else {
            $conditionsArr = explode(',', $conditions);
        }
        if (count($conditionsArr) === 1) array_push($conditionsArr, 'DESC');

        //Handle Request
        if ($conditionsArr[0] === 'price') {
            return $this->query->massItemInformation()
                ->orderBy('final_price', $conditionsArr[1])
                ->paginate(parent::$item_per_page);
        } else if ($conditionsArr[0] === 'popularity') {
            return $this->query->massItemInformation()
                ->whereNot('discount_price', 0)
                ->whereNot('review_counting', 0)
                ->orderBy('review_counting', 'desc')
                ->orderBy('discount_price')
                ->paginate(parent::$item_per_page);
        } else {
            // DEFAULT: SALE 
            // if (strtoupper($conditionsArr[1]) === 'DESC') {
            return $this->query->massItemInformation()
                ->whereNot('discount_price', 0)
                ->orderBy('sub_price', $conditionsArr[1])
                ->paginate(parent::$item_per_page);
            // }
        }
    }
}
