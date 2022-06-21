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
    public function getById($id)
    {
    }
    public function getTopRatingStar()
    {
        
    }
}
