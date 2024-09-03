import React, { useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

interface IButtonDeleteClientProps {
    type?: "button";
    clientId: number;
    onClientUpdated: (clientId: number) => void;
    children: React.ReactNode;
}

export const ButtonDeleteClient: React.FC<IButtonDeleteClientProps> = ({ type, clientId, onClientUpdated, children }) => {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/clients-update-status/${clientId}`, { isActive: 0 });
            if (response.status === 200) {
                console.log('Client deleted successfully');
                onClientUpdated(clientId);
                Inertia.reload();
            } else {
                console.error('Error updating client');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleConfirm = () => {
        setIsConfirmDialogOpen(true);
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false);
    };

    const handleDelete = () => {
        setIsConfirmDialogOpen(false);
        handleUpdate();
    };

    return (
        <>
            <button className="inline-block rounded bg-red-800 px-2 pb-2 pt-2.5 text-xs font-medium uppercase 
                leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-red-700 
                hover:shadow-dark-2 focus:bg-red-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 
                active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 
                dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type={type}
                onClick={handleConfirm}>
                {children}
            </button>
            {isConfirmDialogOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-center text-lg font-semibold">Are you sure you want to delete this client?</p>
                        <div className="flex justify-center mt-4">
                            <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleDelete}>
                                Yes
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleCancel}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};
