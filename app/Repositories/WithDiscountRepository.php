<?php

namespace App\Repositories;

use App\Http\Resources\BookResource;
use App\Repositories\BaseRepository;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class WithDiscountRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Book::query();
    }

    public function getTopDiscount($number)
    {
        return $this->query->massItemInformation()
            ->whereNot('discount_price', 0)
            ->orderBy('sub_price', 'desc')
            ->limit($number)
            ->get();
    }
}
