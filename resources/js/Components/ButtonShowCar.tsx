import React from 'react';
import axios from 'axios';

interface IButtonShowCarProps {
    type?: "button";
    carId: number;
    onCarUpdated: (carId: number) => void;
    children: React.ReactNode;
}

export const ButtonShowCar: React.FC<IButtonShowCarProps> = ({ type, carId, onCarUpdated, children }) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/cars-show/${carId}`);
            if (response.status === 200) {
  
                onCarUpdated(carId);
            } else {
                console.error('Error when trying to display car');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <button type={type} onClick={fetchData}>
            {children}
        </button>
    );
};
