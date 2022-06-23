<?php

namespace App\Repositories;

use App\Models\Review;
use App\Repositories\BaseRepository;

class ReviewRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Review::query();
    }
    public function getById($bookId, $ratingStar = null)
    {
        if($ratingStar) {
            return $this->query->where('book_id', $bookId)->where('rating_start', $ratingStar)->get();
        }
        return $this->query->where('book_id', $bookId)->get();
    }
    public function getTopRatingStar()
    {
        
    }
}
