import React from 'react';
import { Inertia } from '@inertiajs/inertia';

interface IButtonEditInfoClientProps {
    type?: "button";
    clientId: number;
    children: React.ReactNode;
}

export const ButtonEditInfoClient: React.FC<IButtonEditInfoClientProps> = ({ type, clientId, children }) => {
    const handleEditInfoClient = () => {
        if (clientId) {
            Inertia.visit(`/clients-show/${clientId}`);
        } else {
            console.error('Client ID is not defined');
        }
    };

    return (
        <button className="inline-block rounded bg-yellow-800 px-2 pb-2 pt-2.5 text-xs font-medium uppercase 
        leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-yellow-700 
        hover:shadow-dark-2 focus:bg-yellow-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 
        active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 
        dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            type={type}
            onClick={handleEditInfoClient}>
            {children}
        </button>
    );
};
