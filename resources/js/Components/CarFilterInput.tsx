import React, { useState } from 'react';

interface IRadioOptionProps {
    value: string;
    label: string;
}

interface CarFilterInputProps {
    onFilterChange: (selectedValue: string) => void;
    selectedFilter: string;
}

export const CarFilterInput: React.FC<CarFilterInputProps> = ({ onFilterChange, selectedFilter }) => {
    const options: IRadioOptionProps[] = [
        { value: 'all', label: 'All cars' },
        { value: 'available', label: 'Available Cars' },
        { value: 'rented', label: 'Rented' },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange(event.target.value);
    };

    return (
        <div>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {options.map((option) => (
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3" key={option.value}>
                            <input
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                type="radio"
                                value={option.value}
                                checked={selectedFilter  === option.value}
                                onChange={handleChange}
                            />
                            <label htmlFor="all_cars" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option.label}</label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};