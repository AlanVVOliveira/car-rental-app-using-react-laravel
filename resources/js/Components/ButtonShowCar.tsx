import React from 'react';
import { Inertia } from '@inertiajs/inertia';

interface IButtonShowCarProps {
    type?: "button";
    carId: number;
    children: React.ReactNode;
}

export const ButtonShowCar: React.FC<IButtonShowCarProps> = ({ type, carId, children }) => {
    const handleShowCar = () => {
        if (carId) {
            Inertia.visit(`/cars-show/${carId}`);
        } else {
            console.error('Car ID is not defined');
        }
    };

    return (
        <button type={type} onClick={handleShowCar}>
            {children}
        </button>
    );
};
