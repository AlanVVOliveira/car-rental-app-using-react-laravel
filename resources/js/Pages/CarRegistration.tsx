import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
//import React from 'react';
import React, { useState, useEffect } from 'react';

// POST
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

export default function CarRegistration({ auth }: PageProps) {
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

  useEffect(() => {
    console.log('FormData updated:', formData);
  }, [formData]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cars</h2>}
    >
      <Head title="Cars" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>Form</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};