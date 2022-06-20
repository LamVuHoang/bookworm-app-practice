<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use App\Repositories\DiscountRepository;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    private BookRepository $_bookRepository;
    private DiscountRepository $_discountRepository;
    public function __construct()
    {
        $this->_bookRepository = new BookRepository();
        $this->_discountRepository = new DiscountRepository();
    }

    public function index($id = null)
    {
        return response($this->_bookRepository->getById($id));
    }

    public function review($id_book, $id_review = null)
    {
        return response($this->_bookRepository->getReview($id_book, $id_review));
    }

    public function topTenDiscount()
    {
        return response($this->_bookRepository->filter());
    }
}
