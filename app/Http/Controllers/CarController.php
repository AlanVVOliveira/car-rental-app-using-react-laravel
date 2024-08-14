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

    /*public function edit($id)
    {
        $car = Car::findOrFail($id);
        return response()->json($car);
    }*/

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
        /*try {
            Car::updated([
                'manufacturer' => $request->input('manufacturer'),
                'model' => $request->input('model'),
                'exchange' => $request->input('exchange'),
                'version' => $request->input('version'),
                'fuel' => $request->input('fuel'),
                'year' => $request->input('year'),
                'dailyPrice' => $request->input('dailyPrice'),
                'plate' => $request->input('plate'),
            ]);
            return response()->json(['message' => 'Update Successfully!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }*/

        try {
            $car = Car::findOrFail($id);

            // Regras de validação dos dados do formulário
            /*$rules = [
                'name' => 'required|regex:/^[\pL\d\s.,-]*$/u|min:2|max:255',
                'description' => 'required|min:2|max:255',
                'price' => 'required|numeric|max:10',
            ];
            
            $messages = [
                'name.required' => 'O nome do produto é obrigatório.',
                'name.regex' => 'O nome do produto pode conter letras, números e espaços.',
                'name.max' => 'O nome do produto precisa ter no máximo 255 caracteres.',
                'name.min' => 'O nome do produto precisa ter no mínimo 2 caracteres.',
                'description.required' => 'A descrição do produto é obrigatória.',
                'description.max' => 'A descrição precisa ter no máximo 255 caracteres.',
                'description.min' => 'A descrição precisa ter no mínimo 2 caracteres.',
                'price.required' => 'O preço do produto é obrigatório.',
                'price.numeric' => 'O preço deve ser um valor numérico.',
                'price.max' => 'O preço precisa ter no máximo 10 caracteres.'
            ];*/

            // Validação das entradas
            //$validator = Validator::make($request->all(), $rules, $messages);

            /*if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
            } else {*/
                
                // Lógica para atualizar os dados
                $car->update($request->all());
                return response()->json(['message' => 'Update Successfully!']);
            //}
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Erro ao processar atualização do produto. Por favor, tente novamente mais tarde.'], 500);
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
