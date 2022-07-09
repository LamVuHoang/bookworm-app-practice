<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use App\Repositories\ReviewRepository;

class ProductPageController extends Controller
{
    private $_reviewRepository;
    public function __construct(
        BookRepository $bookRepository,
        ReviewRepository $reviewRepository
    ) {
        parent::__construct($bookRepository);
        $this->_reviewRepository = $reviewRepository;
    }

    public function index($id)
    {
        return response($this->_bookRepository->getByIdWithReviewCounting($id));
    }

    public function review($bookId, $ratingStar = null, $conditions = 'DESC')
    {
        return response($this->_reviewRepository->getById($bookId, $ratingStar, $conditions));
    }
}
