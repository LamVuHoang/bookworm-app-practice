<?php

namespace App\Repositories;

use App\Http\Resources\AuthorResource;
use App\Models\Author;
use App\Repositories\BaseRepository;

class AuthorRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Author::query();
    }

    public function getAuthorList()
    {
        return AuthorResource::collection($this->query->get());
    }
}
