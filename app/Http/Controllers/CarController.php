<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index(Request $request)
    {
        // Provisional Data
        $cars = array(
            array("id" => 1, "name" => "Toyota Corolla"),
            array("id" => 2, "name" => "Honda Civic"),
            array("id" => 3, "name" => "Ford Mustang"),
        );

        return response()->json($cars);
    }
}
