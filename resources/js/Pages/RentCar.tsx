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
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [totalRentalDays, setTotalRentalDays] = useState<number | null>(null);
    const [dailyRentalValue, setDailyRentalValue] = useState<number | null>(null);
    const [totalRentalValue, setTotalRentalValue] = useState<number | null>(null);
    const urlApi = 'http://localhost:8000/api/clients-index';
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

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

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        if (!startDate || !endDate) {
            console.error("Start or end date is missing");
            return;
        }

        // Prepare the data to send
        const formData = {
            client_id: selectedClientId,
            rental_start_date: startDate.toISOString(),
            rental_end_date: endDate.toISOString(),
            number_of_rent_days: totalRentalDays,
            total: totalRentalValue,
            car_id: Number(id),
        };
        // debug
        console.log("Data to be sent:", formData);

        try {
            const response = await axios.post('/api/orders-store', formData);
            console.log('Car rental request submitted:', response.data);
        } catch (error) {
            console.error('Error submitting car rental request:', error);
        }
    };

    const handleConfirm = (event: any) => {
        event.preventDefault()
        setIsConfirmDialogOpen(true);
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false);
    };

    const handleSubmit = () => {
        setIsConfirmDialogOpen(false);
        handleFormSubmit(event);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rent Car</h2>}
        >
            <Head title="Rent Car" />
            <form onSubmit={handleConfirm}>
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
                        <div className="bg-white shadow-sm sm:rounded-lg">
                            <label className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                            dark:text-gray-400">
                                Client
                            </label>
                            <CustomerSelectionOptions
                                onChange={(selectedValue) => setSelectedClientId(selectedValue)}
                                url={urlApi} />
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
                        <div>
                            <button
                                className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase 
                                    leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 
                                    hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 
                                    active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 
                                    dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                Confirm
                            </button>
                            {isConfirmDialogOpen && (
                                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-white p-4 rounded-lg shadow-lg">
                                        <p className="text-center text-lg font-semibold">Do you confirm the rental of this car?</p>
                                        <div className="flex justify-center mt-4">
                                            <button 
                                            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                                            onClick={handleSubmit}
                                            type="submit">
                                                Yes, I confirm!
                                            </button>
                                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" 
                                            onClick={handleCancel}>
                                                No, cancel to operation!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}