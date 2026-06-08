<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'composition',
        'price',
        'category',
        'image_url',
        'is_best_seller',
    ];
}