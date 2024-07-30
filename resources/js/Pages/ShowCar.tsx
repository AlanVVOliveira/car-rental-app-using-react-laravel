import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

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

interface ShowCarProps extends PageProps {
    id: number;
}

export default function ShowCar({ auth, id }: ShowCarProps) {
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/cars-show/${id}`);
                    setCar(response.data);
                } catch (error) {
                    console.error('Error fetching car:', error);
                }
            } else {
                console.error('Car ID is missing');
            }
        };

        fetchData();
    }, [id]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Car</h2>}
        >
            <Head title="Show Car" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {car ? (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Manufacturer</th>
                                        <th scope="col" className="px-6 py-3">Model</th>
                                        <th scope="col" className="px-6 py-3">Exchange</th>
                                        <th scope="col" className="px-6 py-3">Version</th>
                                        <th scope="col" className="px-6 py-3">Fuel</th>
                                        <th scope="col" className="px-6 py-3">Year</th>
                                        <th scope="col" className="px-6 py-3">Daily Price</th>
                                        <th scope="col" className="px-6 py-3">Plate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{car.manufacturer}</td>
                                        <td className="px-6 py-4">{car.model}</td>
                                        <td className="px-6 py-4">{car.exchange}</td>
                                        <td className="px-6 py-4">{car.version}</td>
                                        <td className="px-6 py-4">{car.fuel}</td>
                                        <td className="px-6 py-4">{car.year}</td>
                                        <td className="px-6 py-4">{car.dailyPrice}</td>
                                        <td className="px-6 py-4">{car.plate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
