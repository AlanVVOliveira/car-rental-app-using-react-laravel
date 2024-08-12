import React from 'react';
import axios from 'axios';

interface IButtonDeleteCarProps {
    type?: "button";
    carId: number;
    onCarUpdated: (carId: number) => void;
    children: React.ReactNode;
}

export const ButtonDeleteCar: React.FC<IButtonDeleteCarProps> = ({ type, carId, onCarUpdated, children }) => {
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/cars-update/${carId}`, { isActive: 0 });
            if (response.status === 200) {
                console.log('Car updated successfully');
                onCarUpdated(carId);
            } else {
                console.error('Error updating car');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <button className="inline-block rounded bg-red-800 px-2 pb-2 pt-2.5 text-xs font-medium uppercase 
        leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-red-700 
        hover:shadow-dark-2 focus:bg-red-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 
        active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 
        dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            type={type}
            onClick={handleUpdate}>
            {children}
        </button>
    );
};
