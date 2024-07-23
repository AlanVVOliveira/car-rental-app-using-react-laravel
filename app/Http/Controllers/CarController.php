<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function store(Request $request)
    {
        try {
            Car::create([
                'inputExample' => $request->input('example'),
            ]);
            return response()->json(['message' => 'Successfully!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
