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
        return $this->query
        ->where(function($query) {
            $query->where('discount_end_date', null)
            ->whereRaw("DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())");
        })
        ->orWhere(function($query) {
            $query->whereRaw("DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())")
            ->whereRaw("DATE_TRUNC('DAY', discount.discount_end_date) > DATE_TRUNC('DAY', NOW())");
        })
        ->orderBy('discount_price', 'DESC')->limit($number)
        ->with('book')->get();
    }
}
