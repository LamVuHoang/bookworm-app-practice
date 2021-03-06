<?php

namespace App\Http\Controllers;

use App\Repositories\BaseRepository;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Repositories\BookRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\ReviewRepository;

class Controller extends BaseController
{
    protected BookRepository $_bookRepository;
    protected $item_per_page;

    public function __construct(BookRepository $bookRepository)
    {
        $this->_bookRepository = $bookRepository;

        BaseRepository::setItemPerPage(5);
        BaseRepository::setReviewPerPage(10);
    }

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
