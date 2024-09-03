import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { PageProps } from '@/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CustomAlert } from '@/Components/CustomAlert';

interface FormData {
  full_name: string;
  gender: string;
  cpf: number;
  phone: number
  country: string;
  state: string;
  city: string;
  street_or_avenue: string;
  number_of_address: number;
}

interface IEditClientProps extends PageProps {
  id: number;
}

export default function EditClient({ auth, id }: IEditClientProps) {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    gender: '',
    cpf: 0,
    phone: 0,
    country: '',
    state: '',
    city: '',
    street_or_avenue: '',
    number_of_address: 0,
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Error variables list
  const [fullNameError, setFullNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [streetOrAvenueError, setStreetOrAvenueError] = useState("");
  const [numberOfAddressError, setNumberOfAddressError] = useState("");

  // Fetch car data when the component mounts
  useEffect(() => {
    const fetchClientData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/clients-show/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching car data:', error);
        }
      } else {
        console.error('Car ID is missing');
      }
    };

    fetchClientData();
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
    try {
      const response = await axios.put(`/api/clients-update/${id}`, formData);
      console.log('Form submitted successfully:', response.data);

      if (response.data.message == 'Successfully!') {
        setFullNameError("");
        setGenderError("");
        setCpfError("");
        setPhoneError("");
        setCountryError("");
        setStateError("");
        setCityError("");
        setStreetOrAvenueError("");
        setNumberOfAddressError("");
        setShowSuccessAlert(true);

        // redirect to index page
        Inertia.visit(`/clients-index`);
        
      } else {
        if (response.data.errors.full_name) {
          setFullNameError(response.data.errors.full_name);
        } else {
          setFullNameError("");
        }

        if (response.data.errors.gender) {
          setGenderError(response.data.gender);
        } else {
          setGenderError("");
        }

        if (response.data.errors.cpf) {
          setCpfError(response.data.errors.cpf);
        } else {
          setCpfError("");
        }

        if (response.data.errors.phone) {
          setPhoneError(response.data.errors.phone);
        } else {
          setPhoneError("");
        }

        if (response.data.errors.country) {
          setCountryError(response.data.errors.country);
        } else {
          setCountryError("");
        }

        if (response.data.errors.state) {
          setStateError(response.data.errors.state);
        } else {
          setStateError("");
        }

        if (response.data.errors.city) {
          setCityError(response.data.errors.city);
        } else {
          setCityError("");
        }

        if (response.data.errors.street_or_avenue) {
          setStreetOrAvenueError(response.data.errors.street_or_avenue);
        } else {
          setStreetOrAvenueError("");
        }

        if (response.data.errors.number_of_address) {
          setNumberOfAddressError(response.data.errors.number_of_address);
        } else {
          setNumberOfAddressError("");
        }
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
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Client</h2>}
    >
      <Head title="Edit Client" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">

              <div className="mb-5">
                <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full name
                </label>
                <input
                  type="text"
                  id="full_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{fullNameError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{genderError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  CPF
                </label>
                <input
                  type="number"
                  id="cpf"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="CPF"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{cpfError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{phoneError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{countryError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{stateError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{cityError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="street_or_avenue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Street or avenue
                </label>
                <input
                  type="text"
                  id="street_or_avenue"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Street or avenue"
                  value={formData.street_or_avenue}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{streetOrAvenueError}</span>
              </div>

              <div className="mb-5">
                <label htmlFor="number_of_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Number of address
                </label>
                <input
                  type="number"
                  id="number_of_address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Number of address"
                  value={formData.number_of_address}
                  onChange={handleChange}
                  required
                />
                <span id="error_msg" className="text-red-500 text-xs italic">{numberOfAddressError}</span>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
              text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
              </button>
            </form>

            <div className="flex justify-center">
              {showSuccessAlert && <CustomAlert
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300 dark:bg-gray-800 dark:text-green-400-"
                message="Successfully updated client" type="success" />}

              {showErrorAlert && <CustomAlert
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400-"
                message="Unable to update the client, please try again." type="error" />}
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}