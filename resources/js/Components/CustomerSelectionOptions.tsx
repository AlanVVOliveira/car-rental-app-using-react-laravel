import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

interface Option {
  value: number;
  label: string;
}

interface ICustomerSelectionOptionsProps {
  url: string; // URL endpoint Laravel
  onChange: (selectedValue: number) => void;
}

export const CustomerSelectionOptions: React.FC<ICustomerSelectionOptionsProps> = ({ url, onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const optionsData = data.map((item: any) => ({
          value: item.id,
          label: item.full_name,
        }));
        setOptions(optionsData);
        console.log('Options updated:', options);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchOptions();
  }, [url]);

  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    } else {
      onChange(0);
    }
  };

  return (
    <Select options={options} onChange={handleChange} />
  );
};
