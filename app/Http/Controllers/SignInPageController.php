<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogInRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class SignInPageController extends Controller
{
    private $_userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->_userRepository = $userRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(LogInRequest $request)
    {
        $request->validated();
        return $this->_userRepository->signIn($request->input('email'), $request->input('password'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return $this->_userRepository->getUserInformation();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
