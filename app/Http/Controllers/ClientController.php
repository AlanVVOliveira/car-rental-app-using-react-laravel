<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        // Provisional Data
        $clients = array(
            array("id" => 1, "name" => "John Travolta"),
            array("id" => 2, "name" => "Will Smith"),
            array("id" => 3, "name" => "Bill Gates"),
        );

        return response()->json($clients);
    }
}
