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
    

    public function getTopDiscount()
    {
        return $this->query->orderBy('discount_price', 'DESC')->limit(8)
        ->with('book')->get();
    }
}
