<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DiscountResource extends JsonResource
{
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
            'book_id' => $this->book_id,
            'discount_start_date' => date('M d, Y H:i:s', strtotime($this->discount_start_date)),
            'discount_end_date' => $this->discount_end_date !== null ?
                date('M d, Y H:i:s', strtotime($this->discount_end_date)) : 'null',
            'discount_price' => $this->discount_price,
            'sub_price' => $this->sub_price,
            'book' => $this->whenLoaded('book', BookResource::make($this->book))
        ];
    }
}
