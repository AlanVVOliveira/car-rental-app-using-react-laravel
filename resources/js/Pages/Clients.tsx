import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Client {
    id: number;
    full_name: string;
    gender: string;
    cpf: number;
    phone:number
    country: string;
    state: string;
    city: string;
    street_or_avenue: string;
    number_of_address: number;
}

export default function Clients({ auth }: PageProps) {

    const [clients, setClients] = useState<Client[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients-index');
                setClients(response.data);
                console.log(response.data);
                console.log('log do fech' + clients);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clients</h2>}
        >
            <Head title="Clients" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {clients.length > 0 ? (
                            <div> {clients.map((client) => (
                                <ul key={client.id}>
                                    <li>{client.full_name}</li>
                                    <li>{client.gender}</li>
                                    <li>{client.cpf}</li>
                                    <li>{client.phone}</li>
                                    <li>{client.country}</li>
                                    <li>{client.state}</li>
                                    <li>{client.city}</li>
                                    <li>{client.street_or_avenue}</li>
                                    <li>{client.number_of_address}</li>
                                </ul>
                            ))}
                            </div>)
                            :
                            (
                                <div>
                                    <p>No cars found.</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
