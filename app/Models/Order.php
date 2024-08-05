<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'client_name',
        'car_id',
        'rental_start_date',
        'rental_end_date',
        'number_of_rent_days',
        'total',
        'isActive'
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
