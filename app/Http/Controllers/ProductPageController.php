<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductPageController extends Controller
{
    public function index($id)
    {
        return response($this->_bookRepository->getById($id));
    }

    public function review($bookID, $ratingStar = null)
    {
        return response($this->_bookRepository->getReviewEachBook($bookID, $ratingStar));
    }
}
