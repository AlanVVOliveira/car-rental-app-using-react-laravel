import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Client {
    id: number;
    name: string;
}

export default function Cars({ auth }: PageProps) {

    const [clients, setClients] = useState<Client[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/routeIsHere');
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cars</h2>}
        >
            <Head title="Cars" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {clients.length > 0 ? (
                            <div> {clients.map((client) => (
                                <ul key={client.id}>
                                    {client.name}
                                </ul>
                            ))}
                            </div>)
                            :
                            (
                                <div>
                                    <p>No clients found.</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
