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
            ->whereRaw("DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())")
            ->where(function ($query) {
                $query->where('discount_end_date', null)
                    ->orWhereRaw("DATE_TRUNC('DAY', discount.discount_end_date) > DATE_TRUNC('DAY', NOW())");
            })
            ->orderBy('discount_price', 'DESC')->limit($number)
            ->with('book')->get();
    }
}