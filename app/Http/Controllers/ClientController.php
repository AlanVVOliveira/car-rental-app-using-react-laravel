<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::where('isActive', 1)->get();

        return response()->json($clients);
    }

    public function store(Request $request)
    {
        try {
            $rules = [
                'full_name' => 'required|regex:/^[\pL\s]+$/u|min:2|max:255',
                'gender'=> 'required|regex:/^[\pL\s]+$/u|min:2|max:40',
                'cpf' => 'required|regex:/^\d{11}$/',
                'phone' => 'required|regex:/^\d{11}$/',
                'country' => 'required|regex:/^[\pL\s]+$/u|min:2|max:255',
                'state' => 'required|regex:/^[\pL\s]+$/u|min:2|max:255',
                'city' => 'required|regex:/^[\pL\s]+$/u|min:2|max:255',
                'street_or_avenue' => 'required|regex:/^[\pL\s]+$/u|min:2|max:9999999999',
                'number_of_address' => 'required|numeric|max:9999999999',
            ];
            
            $messages = [
                'full_name.required' => 'Full name is required.',
                'full_name.regex' => 'Full name may contain letters and spaces.',
                'full_name.max' => 'Full name must be a maximum of 255 characters.',
                'full_name.min' => 'Full name must have at least 2 characters.',

                'gender.required' => 'The gender is required.',
                'gender.regex' => 'The gender may contain letters and spaces.',
                'gender.max' => 'The gender must be a maximum of 40 characters.',
                'gender.min' => 'The gender must have at least 2 characters.',

                'cpf.required' => 'CPF is required.',
                'cpf.regex' => 'Enter the cpf without special characters.',

                'phone.required' => 'Telephone number is required.',
                'phone.regex' => 'Enter telephone number without special characters.',

                'country.required' => 'Country name is required.',
                'country.regex' => 'country name may contain letters and spaces.',
                'country.max' => 'Country name must be a maximum of 255 characters.',
                'country.min' => 'Country name must have at least 2 characters.',

                'state.required' => 'State name is required.',
                'state.regex' => 'State name may contain letters and spaces.',
                'state.max' => 'State name must be a maximum of 255 characters.',
                'state.min' => 'State name must have at least 2 characters.',

                'city.required' => 'City name is required.',
                'city.regex' => 'City name may contain letters and spaces.',
                'city.max' => 'City name must be a maximum of 255 characters.',
                'city.min' => 'City name must have at least 2 characters.',

                'street_or_avenue.required' => 'Street or avenue is required.',
                'street_or_avenue.regex' => 'Street or avenue may contain letters and spaces.',
                'street_or_avenue.max' => 'Street or avenue must be a maximum of 255 characters.',
                'street_or_avenue.min' => 'Street or avenue must have at least 2 characters.',
                
                'number_of_address.required' => 'The number of address is required.',
                'number_of_address.numeric' => 'The number of address must be a numeric value.',
                'number_of_address.max' => 'The number of address must have a maximum of 10 characters.'
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {

                return response()->json(['errors' => $validator->errors()]);

            } else {

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
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
