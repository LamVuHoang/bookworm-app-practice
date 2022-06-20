<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Book;
use Illuminate\Contracts\Database\Eloquent\Builder;

class BookRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Book::query();
    }
    public function getById($id)
    {
        if ($id) {
            return $this->query->find($id);
        }
        return $this->query->select('*')->get();
    }

    public function getReview($id_book, $id_review)
    {
        // dd($this->query->find($id_book)->review()->where('id', $id_review)->toSql());
        if ($id_review) {
            // return $this->query->whereRelation('review', 'id', $id_review)->get(); : WRONG, it query where of the child table, then show the parent table that has suitable child table
            return $this->query->find($id_book)->review()->where('id', $id_review)->get();
        }
        // return $this->query->where('id', $id_book)->with('review')->get();
        return $this->query->find($id_book)->review()->get();
    }
    public function filter($conditions = null)
    {
        // return $this->query->discount()->get();
    }
}
