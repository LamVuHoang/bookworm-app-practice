<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    protected ReviewRepository $_reviewRepository;
    public function __construct(
        BookRepository $bookRepository,
        DiscountRepository $discountRepository,
        ReviewRepository $reviewRepository
    )
    {
        parent::__construct($bookRepository, $discountRepository);
        $this->_reviewRepository = $reviewRepository;
    }

    public function index($id = null)
    {
        return response($this->_bookRepository->getById($id));
    }

    public function review($id_book, $id_review = null)
    {
        return response($this->_bookRepository->getReviewEachBook($id_book, $id_review));
    }

    public function topBookDiscount()
    {
        return response($this->_discountRepository->getTopDiscount());
    }

    public function topRatingStar()
    {
        return response($this->_reviewRepository->getTopRatingStar());
    }
}
