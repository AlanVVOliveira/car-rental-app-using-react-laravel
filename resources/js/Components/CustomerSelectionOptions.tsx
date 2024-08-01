import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

interface Option {
  value: string;
  label: string;
}

interface IDynamicSelectProps {
  url: string; // URL endpoint Laravel
}

export const DynamicSelect: React.FC<IDynamicSelectProps> = ({ url }) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const optionsData = data.map((item: any) => ({
          value: item.id, 
          label: item.name, 
        }));
        setOptions(optionsData);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchOptions();
  }, [url]);

  return (
    <Select options={options} />
  );
};