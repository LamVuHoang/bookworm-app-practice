<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use App\Repositories\WithDiscountRepository;
use App\Repositories\WithReviewRepository;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    private $_withDiscountRepository;
    private $_withReviewRepository;
    public function __construct(
        BookRepository $bookRepository,
        WithDiscountRepository $withDiscountRepository,
        WithReviewRepository $withReviewRepository
    ) {
        parent::__construct($bookRepository);
        $this->_withDiscountRepository = $withDiscountRepository;
        $this->_withReviewRepository = $withReviewRepository;
    }

    public function getTopDiscount($number = 10)
    {
        return response($this->_withDiscountRepository->getTopDiscount($number));
    }

    public function getRecommended($number = 8)
    {
        return response($this->_withReviewRepository->getRecommended($number));
    }

    public function getPopular($number = 8)
    {
        return response($this->_bookRepository->getPopular($number));
    }
}
