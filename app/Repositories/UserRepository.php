<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\BaseRepository;


class UserRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = User::query();
    }

    public function signIn($email, $password)
    {
        $user = $this->query->where('email', $email)
            ->where('password', $password)
            ->first();

        if (!$user) return response('Log in Invalid', 503);
        else {
            //Delete token before
            $user->tokens()->delete();

            //Create new token
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
            ]);
        }
    }

    public function getUserInformation()
    {
        return response()->json(request()->user());
    }
}
