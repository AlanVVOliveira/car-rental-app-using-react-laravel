<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = 'cars';

    protected $fillable = [
        'manufacturer',
        'model',
        'exchange',
        'version',
        'fuel',
        'year',
        'dailyPrice',
        'plate',
        'isAvailable',
        'isActive'
    ];

    public function orders()
       {
           return $this->hasMany(Order::class);
       }
}
