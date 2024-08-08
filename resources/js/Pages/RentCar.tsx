import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { CustomerSelectionOptions } from '@/Components/CustomerSelectionOptions';
import { Datepicker } from '@/Components/Datepicker';

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

interface IRentCarProps extends PageProps {
    id: number;
}

export default function RentCar({ auth, id }: IRentCarProps) {
    const [car, setCar] = useState<Car | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [totalRentalDays, setTotalRentalDays] = useState<number | null>(null);
    const [dailyRentalValue, setDailyRentalValue] = useState<number | null>(null);
    const [totalRentalValue, setTotalRentalValue] = useState<number | null>(null);
    const urlApi = 'http://localhost:8000/api/clients-index';

    function calculateDaysDifference(startDate: Date, endDate: Date): number {
        // Calculates the difference in milliseconds
        const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());

        // Convert to days (approximate)
        const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

        return diffInDays;
    }

    useEffect(() => {
        if (startDate && endDate) {
            const calculatedDifference = calculateDaysDifference(startDate, endDate);
            setTotalRentalDays(calculatedDifference);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        if (totalRentalDays !== null && dailyRentalValue !== null) {
            const calculateRentValue = totalRentalDays * dailyRentalValue;
            setTotalRentalValue(calculateRentValue);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/cars-show/${id}`);
                    setCar(response.data);
                    setDailyRentalValue(response.data.dailyPrice);
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rent Car</h2>}
        >
            <Head title="Rent Car" />

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
                    <div >
                        <label className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
                            Client
                        </label>
                        <CustomerSelectionOptions url={urlApi} />
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <label className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
                            Pick-up Date
                        </label><br />
                        <Datepicker date={startDate} onDateChange={setStartDate} />
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <label className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
                            Drop-off Date
                        </label><br />
                        <Datepicker date={endDate} onDateChange={setEndDate} />
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <label className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
                            Total days
                        </label><br />
                        <div>
                            {totalRentalDays}
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <label className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
                            Total
                        </label><br />
                        <div>{totalRentalValue}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}