<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';

    protected $fillable = [
        'full_name',
        'gender',
        'cpf',
        'phone',
        'Country',
        'state',
        'city',
        'street_or_avenue',
        'NumberOfAddress',
        'isActive',
    ];
}
