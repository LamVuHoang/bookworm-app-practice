<?php

namespace App\Repositories;

abstract class BaseRepository
{
    protected $query;
    public static $item_per_page;
    public static $review_per_page;

    public abstract function __construct();
    
    public static function setItemPerPage($item_per_page_in) {
        self::$item_per_page = $item_per_page_in;
    }
    public static function setReviewPerPage($review_per_page_in) {
        self::$review_per_page = $review_per_page_in;
    }

    public function pagination($query)
    {
        return $query->paginate(self::$item_per_page);
    }
    public function paginate_review($query)
    {
        return $query->paginate(self::$review_per_page);
    }
    // public abstract function getById($id);
    // public abstract function filter($conditions);
    // public abstract function create($data);
    // public abstract function update($data);
}
