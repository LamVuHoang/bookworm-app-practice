<?php

namespace App\Http\Controllers;

use App\Repositories\AuthorRepository;
use App\Repositories\BookRepository;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;

class ShopPageController extends Controller
{
    private $_authorRepository;
    private $_categoryRepository;

    public function __construct(
        BookRepository $bookRepository,
        AuthorRepository $authorRepository,
        CategoryRepository $categoryRepository
    ) {
        parent::__construct($bookRepository);
        $this->_authorRepository = $authorRepository;
        $this->_categoryRepository = $categoryRepository;
    }
    public function sort(Request $request)
    {
        return response($this->_bookRepository->sort($request->input('conditions')));
    }

    public function filter(Request $request)
    {
        return response($this->_bookRepository->filter($request->input('conditions')));
    }

    public function getAuthorList()
    {
        return response($this->_authorRepository->getAuthorList());
    }

    public function getCategoryList()
    {
        return response($this->_categoryRepository->getCategoryList());
    }
}
