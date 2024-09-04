import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IDatepickerProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  allowCurrentDate?: boolean;
}

export const Datepicker: React.FC<IDatepickerProps> = ({ date, onDateChange, allowCurrentDate = false }) => {
  const minDate = allowCurrentDate ? new Date() : new Date(new Date().getTime() + 86400000); // Add one day to the current date
  return (
    <DatePicker
      selected={date}
      onChange={onDateChange}
      dateFormat="yyyy-MM-dd"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholderText="Select date"
      //minDate={new Date()}
      minDate={minDate}
    />
  );
};
