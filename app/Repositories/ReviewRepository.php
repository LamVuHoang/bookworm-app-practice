<?php

namespace App\Repositories;

use App\Http\Resources\ReviewResource;
use App\Models\Review;
use App\Repositories\BaseRepository;

class ReviewRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Review::query();
    }
    public function getById($bookId, $ratingStar, $conditions)
    {
        if (!$conditions) $conditions = 'DESC';
        // return $conditions;
        if ($ratingStar) {
            $review = $this->query
                ->where('book_id', $bookId)
                ->where('rating_star', $ratingStar)
                ->orderBy('review_date', $conditions);
        } else {
            $review = $this->query
                ->where('book_id', $bookId)
                ->orderBy('review_date', $conditions);
        }
        
        return ReviewResource::collection($review->get());
    }
}
