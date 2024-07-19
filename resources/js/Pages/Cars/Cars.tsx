import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Car {
    id: number;
    name: string;
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cars</h2>}
        >
            <Head title="Cars" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            {cars.length > 0 ? (
                                <ul>
                                    {cars.map((car) => (
                                        <li key={car.id}>{car.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No cars found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
