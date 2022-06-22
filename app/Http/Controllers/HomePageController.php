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

    public function topBookDiscount()
    {
        return response($this->_discountRepository->getTopDiscount());
    }

    public function topMostRatingStar()
    {
        return response($this->_bookRepository->getTopMostRatingStar());
    }

    public function topMostReview()
    {
        return response($this->_bookRepository->getTopMostReview());
    }
}
