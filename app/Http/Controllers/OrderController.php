<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        try {
            $cars = Car::where('isActive', 1)->get();
            $clients = Client::where('isActive', 1)->get();
            $orders = Order::where('isActive', 1)->get();

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
            $car = Car::findOrFail($request->input('car_id'));
            if ($car->isAvailable == 0) {

                return response()->json(['error' => 'The car is now unavailable!']);

            } else if ($request->input('rental_start_date') == $request->input('rental_end_date')) {

                return response()->json(['error' => 'Invalid dates, please try again!']);

            } else {

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
            }
        } catch (Exception $e) {

            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['error' => 'Error'], 500);
        }
    }

    public function updateStatusActiveOfOrder(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->isActive = 0;
            $order->save();
    
            $car = $order->car;
            if ($car) {
                $car->isAvailable = 1;
                $car->save();
            }

            return response()->json(['message' => 'Successfully!']);
            
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Log::info($request->all());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
