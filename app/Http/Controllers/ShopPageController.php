<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShopPageController extends Controller
{
    public function filter(Request $request)
    {
        return $this->_bookRepository->filter($request->input('conditions'));
    }

    public function sort(Request $request)
    {
        return response($this->_bookRepository->sort($request->input('conditions')));
    }
}
