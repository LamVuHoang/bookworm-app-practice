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

    public function getById($id)
    {
        if ($id) {
            return $this->query->find($id);
        }
        return $this->pagination($this->query->select('*'));
    }

    public function filter($conditions)
    {
        $conditionsArr = explode(',', $conditions);
        if ($conditionsArr[0] === 'rating') {
            return $this->getStarScoring();
        }
        return $this->pagination($this->query->whereRelation($conditionsArr[0], 'id', $conditionsArr[1]));
    }

    public function getReviewEachBook($id_book, $id_review)
    {
        if ($id_review) {
            return $this->query->find($id_book)->review()->where('id', $id_review)->first();
        }
        return $this->paginate_review($this->query->find($id_book)->review());
    }

    public function discount()
    {
        return $this->query->discount()
            ->where('discount_start_date', '<', today())
            ->where('discount_end_date', '>', today())->orWhereNull('discount_end_date')
            ->get();
    }

    public function getStarScoring()
    {
        // $bookEach = Book::query()
        // ->select('id')
        // ->withCount([
        //     'review as star_counting' => function(Builder $query) {
        //         $query->whereIn('rating_start', [1,2,3,4,5]);
        //     }
        // ])
        // ->withSum('review as star_weighting', 'rating_start');

        // Counting Number of Star each Book, and Formula: star1 (1) * numberOfStar1 + ... + star5 (5) * numberOfStar5
        // $bookEach = Book::query()
        //     ->selectRaw('book.id, ROUND(COUNT(review.id), 1) star_counting, ROUND(SUM(review.rating_start), 1) star_weighting')
        //     ->join('review', 'review.book_id', '=', 'book.id')
        //     ->groupBy('book.id');
        // return $this->query
        //     ->joinSub($bookEach, 't1', function ($join) {
        //         $join->on('t1.id', '=', 'book.id');
        //     })
        //     ->selectRaw('ROUND(t1.star_weighting / t1.star_counting, 1) AS star_scoring, book.*')
        //     ->whereNot('t1.star_weighting', null);

        // AVERAGE
        return $this->query
            ->selectRaw('book.*, ROUND(AVG(review.rating_start), 1) star_scoring')
            ->join('review', 'review.book_id', '=', 'book.id')
            ->groupBy('book.id')
            ->orderBy('book.id')->get();

    }

    public function getFinalPrice()
    {
        
    }
}
