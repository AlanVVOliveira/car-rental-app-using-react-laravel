import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CustomAlert } from '@/Components/CustomAlert';

interface FormData {
  manufacturer: string;
  model: string;
  exchange: string;
  version: string;
  fuel: string;
  year: number;
  dailyPrice: number;
  plate: string | number | string & number;
}

interface IEditCarProps extends PageProps {
  id: number;
}

export default function EditCar({ auth, id }: IEditCarProps) {
  const [formData, setFormData] = useState<FormData>({
    manufacturer: '',
    model: '',
    exchange: '',
    version: '',
    fuel: '',
    year: 0,
    dailyPrice: 0,
    plate: '',
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Error variables list
  const [manufacturerError, setManufacturerError] = useState("");
  const [modelError, setModelError] = useState("");
  const [exchangeError, setExchangeError] = useState("");
  const [versionError, setVersionError] = useState("");
  const [fuelError, setFuelError] = useState("");
  const [yearError, setYearError] = useState("");
  const [dailyPriceError, setDailyPriceError] = useState("");
  const [plateError, setPlateError] = useState("");

  useEffect(() => {
    const fetchCarData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/cars-show/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching car data:', error);
        }
      } else {
        console.error('Car ID is missing');
      }
    };

    fetchCarData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorMsg = document.getElementById('error_msg');
    if (errorMsg) {
      errorMsg.innerHTML = '';
    }

    try {
      const response = await axios.put(`/api/cars-update/${id}`, formData);
      console.log('Form submitted successfully:', response.data);
      if (response.data.message == 'Successfully!') {
        setShowSuccessAlert(true);
      } else {
        if (response.data.errors.manufacturer) setManufacturerError(response.data.errors.manufacturer);
        if (response.data.errors.model) setModelError;
        if (response.data.errors.exchange) setExchangeError(response.data.errors.exchange)
        if (response.data.errors.version) setVersionError(response.data.errors.version)
        if (response.data.errors.fuel) setFuelError(response.data.errors.fuel)
        if (response.data.errors.year) setYearError(response.data.errors.year)
        if (response.data.errors.dailyPrice) setDailyPriceError(response.data.errors.dailyPrice)
        if (response.data.errors.plate) setPlateError(response.data.errors.plate)
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    console.log('FormData updated:', formData);
  }, [formData]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Car</h2>}
    >
      <Head title="Edit Car" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">

              <div className="mb-5">
                <label htmlFor="manufacturer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Manufacturer
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{manufacturerError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{modelError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="exchange" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Exchange
                </label>
                <input
                  type="text"
                  id="exchange"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Exchange"
                  value={formData.exchange}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{exchangeError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="version" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Version
                </label>
                <input
                  type="text"
                  id="version"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Version"
                  value={formData.version}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{versionError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="fuel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Fuel
                </label>
                <input
                  type="text"
                  id="fuel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{fuelError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{yearError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="dailyPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Daily Price
                </label>
                <input
                  type="number"
                  id="dailyPrice"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Daily Price"
                  value={formData.dailyPrice}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{dailyPriceError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Plate
                </label>
                <input
                  type="text"
                  id="plate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Plate"
                  value={formData.plate}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{plateError}</span>
              </div>

              <button
                type='submit'
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
              text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
              </button>
            </form>

            <div className="flex justify-center">
              {showSuccessAlert && <CustomAlert
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300 dark:bg-gray-800 dark:text-green-400-"
                message="Successfully updated car" type="success" />}

              {showErrorAlert && <CustomAlert
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400-"
                message="Unable to update the car, please try again." type="error" />}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}