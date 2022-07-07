<?php

namespace App\Repositories;

use App\Http\Resources\DiscountResource;
use App\Repositories\BaseRepository;
use App\Models\Discount;
use Illuminate\Support\Facades\DB;

class DiscountRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Discount::query();
    }


    public function getTopDiscount($number)
    {
        // $table = $this->query
        //     ->whereRaw("DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())")
        //     ->where(function ($query) {
        //         $query->where('discount_end_date', null)
        //             ->orWhereRaw("DATE_TRUNC('DAY', discount.discount_end_date) > DATE_TRUNC('DAY', NOW())");
        //     })
        //     ->orderBy('discount_price', 'DESC')->limit($number)
        //     ->with('book');

        $table = $this->query
            ->join('book', 'book.id', 'discount.book_id')
            ->whereRaw("DATE_TRUNC('DAY', discount.discount_start_date) < DATE_TRUNC('DAY', NOW())")
            ->where(function ($query) {
                $query->where('discount_end_date', null)
                    ->orWhereRaw("DATE_TRUNC('DAY', discount.discount_end_date) > DATE_TRUNC('DAY', NOW())");
            })
            ->select('*', DB::raw('book.book_price - discount.discount_price sub_price'))
            ->orderByRaw('book.book_price - discount.discount_price')->limit($number);

        // return $table->get();
        return DiscountResource::collection($table->get());
    }
}
