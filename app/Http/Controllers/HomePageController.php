<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use App\Repositories\DiscountRepository;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    private $_discountRepository;
    public function __construct(BookRepository $bookRepository, DiscountRepository $discountRepository)
    {
        parent::__construct($bookRepository);
        $this->_discountRepository = $discountRepository;
    }

    public function getTopDiscount($number = 10)
    {
        return response($this->_discountRepository->getTopDiscount($number));
    }

    public function getRecommended($number = 8)
    {
        return response($this->_bookRepository->getRecommended($number));
    }

    public function getPopular($number = 8)
    {
        return response($this->_bookRepository->getPopular($number));
    }
}
