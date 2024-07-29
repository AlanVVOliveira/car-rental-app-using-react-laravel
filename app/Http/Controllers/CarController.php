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
        $cars = Car::where('isAvailable', 1)->where('isActive', 1)->get();

        return response()->json($cars);
    }

    public function store(Request $request)
    {
        try {
            Car::create([
                'manufacturer' => $request->input('manufacturer'),
                'model' => $request->input('model'),
                'exchange' => $request->input('exchange'),
                'version' => $request->input('version'),
                'fuel' => $request->input('fuel'),
                'year' => $request->input('year'),
                'dailyPrice' => $request->input('dailyPrice'),
                'plate' => $request->input('plate'),
            ]);
            return response()->json(['message' => 'Successfully!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $Car = Car::findOrFail($id);
            $Car->isActive = 0;
            $Car->save();

            return response()->json(['message' => 'Successfully!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
