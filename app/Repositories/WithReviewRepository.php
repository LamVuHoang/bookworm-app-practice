<?php

namespace App\Repositories;

use App\Http\Resources\BookResource;
use App\Repositories\BaseRepository;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class WithReviewRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Book::query();
    }

    public function getRecommended($number)
    {
        return $this->query->massItemInformation()
            ->whereNot('star_scoring', null)
            ->orderBy('star_scoring', 'DESC')
            ->limit($number)
            ->get();
    }
}
