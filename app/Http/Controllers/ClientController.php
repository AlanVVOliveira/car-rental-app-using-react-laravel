<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        // Provisional Data
        $clients = Client::where('isActive', 1)->get();
        /*$clients = array(
            array("id" => 1, "name" => "John Travolta"),
            array("id" => 2, "name" => "Will Smith"),
            array("id" => 3, "name" => "Bill Gates"),
        );*/

        return response()->json($clients);
    }

    public function store(Request $request)
    {
        try {
            Client::create([
                'full_name'  => $request->input('full_name'),
                'gender' => $request->input('gender'), 
                'cpf' => $request->input('cpf'),
                'phone' => $request->input('phone'),
                'country' => $request->input('country'),
                'state' => $request->input('state'),
                'city' => $request->input('city'),
                'street_or_avenue' => $request->input('street_or_avenue'),
                'number_of_address' => $request->input('number_of_address'),
            ]);
            return response()->json(['message' => 'Successfully!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
