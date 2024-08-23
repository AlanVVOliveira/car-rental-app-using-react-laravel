import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ButtonReturnCar } from '@/Components/ButtonReturnCar';

interface ICarProps {
    id: number;
    manufacturer: string;
    model: string;
    exchange: string;
    version: string;
    fuel: string;
    year: number;
    dailyPrice: number;
    plate: string;
}

interface IClientProps {
    id: number;
    full_name: string;
    gender: string;
    cpf: number;
    phone: number
    country: string;
    state: string;
    city: string;
    street_or_avenue: string;
    number_of_address: number;
}

interface IOrdersProps {
    id: number;
    client_id: number;
    car_id: number;
    rental_start_date: string;
    rental_end_date: string;
    number_of_rent_days: number;
    total: number;
    isActive: number;
}

export default function RentalManagement({ auth }: PageProps) {
    const [cars, setCars] = useState<ICarProps[]>([]);
    const [clients, setClients] = useState<IClientProps[]>([]);
    const [orders, setOrders] = useState<IOrdersProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                /*const response = await axios.get('http://localhost:8000/api/orders-index');
                setOrders(response.data);
                console.log(response.data);
                console.log('log do fech' + orders);*/
                const response = await axios.get('http://localhost:8000/api/orders-index');
                //const fetchedOrders = response.data.orders;
                //console.log('Fetched data:', fetchedOrders);
                //setOrders(response.data.orders);
                setCars(response.data.cars);
                setClients(response.data.clients);
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('Cars updated:', cars);
    }, [cars]);

    useEffect(() => {
        console.log('Clients updated:', clients);
    }, [clients]);

    useEffect(() => {
        console.log('Orders updated:', orders);
    }, [orders]);

    const updateOrderInList = (orderId: number) => {
        setOrders(orders.map(order => order.id === orderId ? { ...order, isActive: 0 } : order));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rental Management</h2>}
        >
            <Head title="Rental Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Rental number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Client
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Car
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rental start date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rental end date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Number of rent days
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rental status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                </tr>
                            </thead>
                            {orders.length > 0 ? (
                                <tbody>
                                    {orders.map((order) => {
                                        // Find client name
                                        const matchingClient = clients.find((client) => client.id === order.client_id);
                                        const clientName = matchingClient ? matchingClient.full_name : "Client not found";

                                        // Find car model
                                        const matchingCar = cars.find((car) => car.id === order.car_id);
                                        const carModel = matchingCar ? matchingCar.manufacturer + ' ' + matchingCar.model : "Car not found";

                                        // Status Rent
                                        let statusRent = '';
                                        if (order.isActive == 1) {
                                            statusRent = 'Rented';
                                            //return 'Rented'
                                        } 

                                        return (
                                            <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {order.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {clientName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {carModel}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.rental_start_date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.rental_end_date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.number_of_rent_days}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.total}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {statusRent}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <ButtonReturnCar 
                                                        orderId={order.id}
                                                        onOrderUpdatedIsActive={updateOrderInList}>
                                                        Return car
                                                    </ButtonReturnCar>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>)
                                :
                                (
                                    <div>
                                        <p>No rent's found.</p>
                                    </div>
                                )}

                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}