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
        <button type={type} onClick={handleUpdate}>
            {children}
        </button>
    );
};
