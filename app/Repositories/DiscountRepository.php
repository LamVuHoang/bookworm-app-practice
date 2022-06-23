<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Discount;

class DiscountRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Discount::query();
    }
    

    public function getTopDiscount($number)
    {
        return $this->query->orderBy('discount_price', 'DESC')->limit($number)
        ->with('book')->get();
    }
}
