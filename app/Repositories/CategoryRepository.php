<?php

namespace App\Repositories;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Repositories\BaseRepository;

class CategoryRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Category::query();
    }

    public function getCategoryList()
    {
        return CategoryResource::collection($this->query->get());
    }
}
