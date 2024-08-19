import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ButtonEditInfoClient } from '@/Components/ButtonEditInfoClient';
import { ButtonDeleteClient } from '@/Components/ButtonDeleteClient';

interface Client {
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

    const updateClientInList = (clientId: number) => {
        setClients(clients.map(client => client.id === clientId ? { ...client, isActive: false } : client));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clients</h2>}
        >
            <Head title="Clients" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* table */}
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Full name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Gender
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            CPF
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Country
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            State
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            City
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Street or Avenue
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            number_of_address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            *
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            *
                                        </th>
                                    </tr>
                                </thead>

                                {clients.length > 0 ? (
                                    <tbody> {clients.map((client) => (

                                        <tr key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.full_name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {client.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {client.cpf}
                                            </td>
                                            <td className="px-6 py-4">
                                                {client.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                {client.country}
                                            </td>
                                            <td className="px-6 py-4">
                                                {client.state}
                                            </td>
                                            <td className="px-6 py-4">
                                                {client.city}
                                            </td>
                                            <td className="px-6 py-4">
                                                {client.street_or_avenue}
                                            </td>
                                            <td className="px-6 py-4">
                                                {client.number_of_address}
                                            </td>
                                            <td className="px-6 py-4">
                                                <ButtonEditInfoClient
                                                    clientId={client.id}>
                                                    Edit Client
                                                </ButtonEditInfoClient>
                                            </td>
                                            <td className="px-6 py-4">
                                                <ButtonDeleteClient
                                                    clientId={client.id}
                                                    onClientUpdated={updateClientInList}>
                                                    Remove client
                                                </ButtonDeleteClient>
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
            </div>
        </AuthenticatedLayout>
    );
}
