import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ButtonDeleteCar } from '@/Components/ButtonDeleteCar';

interface Car {
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

export default function Cars({ auth }: PageProps) {

    const [cars, setCars] = useState<Car[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cars-index');
                setCars(response.data);
                console.log(response.data);
                console.log('log do fech' + cars);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchData();
    }, []);

    const updateCarInList = (carId: number) => {
        setCars(cars.map(car => car.id === carId ? { ...car, isActive: false } : car));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cars</h2>}
        >
            <Head title="Cars" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Manufacturer
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Model
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Exchange
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Version
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fuel
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Year
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Daily Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Plate
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                </tr>
                            </thead>
                            {cars.length > 0 ? (
                                <tbody> {cars.map((car) => (
                                    <tr key={car.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {car.manufacturer}
                                        </th>
                                        <td className="px-6 py-4">
                                            {car.model}
                                        </td>
                                        <td className="px-6 py-4">
                                            {car.exchange}
                                        </td>
                                        <td className="px-6 py-4">
                                            {car.version}
                                        </td>
                                        <td className="px-6 py-4">
                                            {car.fuel}
                                        </td>
                                        <td className="px-6 py-4">
                                            {car.year}
                                        </td>
                                        <td className="px-6 py-4">
                                            {car.dailyPrice}
                                        </td>
                                        <td className="px-6 py-4">
                                            {car.plate}
                                        </td>
                                        <td>
                                            <ButtonDeleteCar
                                                carId={car.id}
                                                onCarUpdated={updateCarInList}
                                            >
                                                Remove
                                            </ButtonDeleteCar>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>)
                                :
                                (
                                    <div>
                                        <p>No cars found.</p>
                                    </div>
                                )}

                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
