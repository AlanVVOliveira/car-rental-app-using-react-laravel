<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $cars = Car::where('isActive', 1)->get();

        return response()->json($cars);
    }

    public function indexAvailableCars(Request $request)
    {
        $cars = Car::where('isAvailable', 1)->where('isActive', 1)->get();

        return response()->json($cars);
    }

    public function indexRentedCars(Request $request)
    {
        $cars = Car::where('isAvailable', 0)->where('isActive', 1)->get();

        return response()->json($cars);
    }

    public function store(Request $request)
    {
        try {

            $rules = [
                'manufacturer' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'model' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'exchange' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'version' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'fuel' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'year' => 'required|regex:/^[\d]{4}$/',
                'dailyPrice' => 'required|numeric|max:9999999999',
                //'plate' => 'required|regex:/^(?:[A-Za-z]{3}\d{4}|[A-Za-z]{3}\d[A-Za-z]\d{2})$/'
                'plate' => 'required|regex:/^[A-Za-z]{3}\d{4}$/'
            ];
            
            $messages = [
                'manufacturer.required' => 'Manufacturer name is required.',
                'manufacturer.regex' => 'The manufacturers name may contain letters, numbers and spaces.',
                'manufacturer.max' => 'The manufacturers name must be a maximum of 40 characters.',
                'manufacturer.min' => 'The manufacturers name must have at least 2 characters.',
                'model.required' => 'Model name is required.',
                'model.regex' => 'The model name may contain letters, numbers and spaces.',
                'model.max' => 'The model name must be a maximum of 40 characters.',
                'model.min' => 'The model name must have at least 2 characters.',
                'exchange.required' => 'Exchange is required.',
                'exchange.regex' => 'The exchange reference may contain letters, numbers and spaces.',
                'exchange.max' => 'The exchange reference must be a maximum of 40 characters.',
                'exchange.min' => 'The exchange reference must have at least 2 characters.',
                'version.required' => 'Version is required.',
                'version.regex' => 'The version reference may contain letters, numbers and spaces.',
                'version.max' => 'The version reference must be a maximum of 40 characters.',
                'version.min' => 'The version reference must have at least 2 characters.',
                'fuel.required' => 'Fuel is required.',
                'fuel.regex' => 'The fuel reference may contain letters, numbers and spaces.',
                'fuel.max' => 'The fuel reference must be a maximum of 40 characters.',
                'fuel.min' => 'The fuel reference must have at least 2 characters.',
                'year.required' => 'Year is required.',
                'year.regex' => 'The year reference must contain 4 numbers.',
                'dailyPrice.required' => 'The daily price is required.',
                'dailyPrice.numeric' => 'The daily price must be a numeric value.',
                'dailyPrice.max' => 'The daily price must have a maximum of 10 characters.',
                'plate.required' => 'The plate is required.',
                'plate.regex' => 'Accepts the old standard or the new Mercosur format. (AAA3333 or DVA-3F33).'
            ];
 
            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()]);
            } else {
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
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function updateStatusActiveOfCar(Request $request, $id)
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

    public function update(Request $request, $id)
    {
        try {
            $car = Car::findOrFail($id);

            $rules = [
                'manufacturer' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'model' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'exchange' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'version' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'fuel' => 'required|regex:/^[\pL\s\d]+$/u|min:2|max:40',
                'year' => 'required|regex:/^[\d]{4}$/',
                'dailyPrice' => 'required|numeric|max:10',
                'plate' => 'required|regex:/^[A-Z]{3}-?[A-J0-9]\d{4}$/'
            ];
            
            $messages = [
                'manufacturer.required' => 'Manufacturer name is required.',
                'manufacturer.regex' => 'The manufacturers name may contain letters, numbers and spaces.',
                'manufacturer.max' => 'The manufacturers name must be a maximum of 40 characters.',
                'manufacturer.min' => 'The manufacturers name must have at least 2 characters.',

                'model.required' => 'Model name is required.',
                'model.regex' => 'The model name may contain letters, numbers and spaces.',
                'model.max' => 'The model name must be a maximum of 40 characters.',
                'model.min' => 'The model name must have at least 2 characters.',

                'exchange.required' => 'Exchange is required.',
                'exchange.regex' => 'The exchange reference may contain letters, numbers and spaces.',
                'exchange.max' => 'The exchange reference must be a maximum of 40 characters.',
                'exchange.min' => 'The exchange reference must have at least 2 characters.',

                'version.required' => 'Version is required.',
                'version.regex' => 'The version reference may contain letters, numbers and spaces.',
                'version.max' => 'The version reference must be a maximum of 40 characters.',
                'version.min' => 'The version reference must have at least 2 characters.',

                'fuel.required' => 'Fuel is required.',
                'fuel.regex' => 'The fuel reference may contain letters, numbers and spaces.',
                'fuel.max' => 'The fuel reference must be a maximum of 40 characters.',
                'fuel.min' => 'The fuel reference must have at least 2 characters.',

                'year.required' => 'Year is required.',
                'year.regex' => 'The year reference must contain 4 numbers.',

                'dailyPrice.required' => 'The daily price is required.',
                'dailyPrice.numeric' => 'The daily price must be a numeric value.',
                'dailyPrice.max' => 'The daily price must have a maximum of 10 characters.',

                'plate.required' => 'The plate is required.',
                'plate.regex' => 'Accepts the old standard or the new Mercosur format. (AAA3333 or DVA-3F33).'
            ];
 
            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()]);
            } else {
                $car->update($request->all());
                return response()->json(['message' => 'Successfully!']);
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function show(Request $request, $id)
    {
        try {
            $car = Car::findOrFail($id);

            return response()->json($car);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}