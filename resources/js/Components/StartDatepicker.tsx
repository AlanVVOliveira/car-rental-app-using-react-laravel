import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IStartDatepickerProps {
    date: Date | null;
}

export const StartDatepicker: React.FC<IStartDatepickerProps> = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    const handleChange = (date: Date | null) => {
        setStartDate(date);
    };

    return (
        <DatePicker
            selected={startDate}
            onChange={handleChange}
            dateFormat="yyyy-MM-dd"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Select date"
        />
    );
};
