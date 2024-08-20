import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ButtonDeleteCar } from '@/Components/ButtonDeleteCar';
import { ButtonRentCar } from '@/Components/ButtonRentCar';
import { ButtonEditCar } from '@/Components/ButtonEditCar';
import { CarFilterInput } from '@/Components/CarFilterInput';

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

export default function Cars({ auth }: PageProps) {
    const [cars, setCars] = useState<ICarProps[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://localhost:8000/api/cars-index';
                if (selectedFilter === 'available') {
                     url = 'http://localhost:8000/api/cars-indexAvailableCars';
                } else if (selectedFilter === 'rented') {
                    url = 'http://localhost:8000/api/cars-indexRentedCars';
                }

                const response = await axios.get(url);
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchData();
    }, [selectedFilter]);

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
                <CarFilterInput onFilterChange={setSelectedFilter} selectedFilter={selectedFilter} />
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
                                    <th scope="col" className="px-6 py-3">
                                        #
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
                                            <ButtonRentCar
                                                carId={car.id}>
                                                Rent car
                                            </ButtonRentCar>
                                        </td>
                                        <td>
                                            <ButtonEditCar
                                                carId={car.id}>
                                                Edit car
                                            </ButtonEditCar>
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