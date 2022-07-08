<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public static $wrap = 'book';
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'book_title' => $this->book_title,
            'book_price' => $this->book_price,
            'book_cover_photo' => $this->book_cover_photo,
            'reviews' => $this->whenLoaded('reviews', ReviewResource::collection($this->reviews)),
            'author' => new AuthorResource($this->author),
            'discount' => $this->whenLoaded('discount', DiscountResource::make($this->discount))
        ];
    }
}
