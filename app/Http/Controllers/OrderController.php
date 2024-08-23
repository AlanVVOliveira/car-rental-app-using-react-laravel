<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        try {
            $cars = Car::where('isActive', 1)->get();
            $clients = Client::where('isActive', 1)->get();
            $orders = Order::all();

            /*return response()->json([
                //'cars' => $cars,
                //'clients' => $clients,
                'orders' => $orders
            ]);*/
            return response()->json(['clients' => $clients, 'cars' => $cars, 'orders' => $orders]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // leave the vehicle unavailable during the rental period
            $car = Car::findOrFail($request->input('car_id'));
            if ($car->isAvailable == 1) {
                $order = Order::create([
                    'client_id' => $request->input('client_id'),
                    'car_id' => $request->input('car_id'),
                    'rental_start_date' => Carbon::parse($request->input('rental_start_date'))->format('Y-m-d H:i:s'),
                    'rental_end_date' => Carbon::parse($request->input('rental_end_date'))->format('Y-m-d H:i:s'),
                    'number_of_rent_days' => $request->input('number_of_rent_days'),
                    'total' => $request->input('total'),
                ]);
                
                $car->isAvailable = 0;
                $car->save();
                return response()->json(['message' => 'Successfully!']);
            } else {
                return response()->json(['message' => 'The car is now unavailable!']);
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function updateStatusActiveOfOrder(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->isActive = 0;
            $order->save();

            return response()->json(['message' => 'Successfully!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
