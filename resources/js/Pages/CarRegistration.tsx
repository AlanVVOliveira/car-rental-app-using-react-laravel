import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
//import React from 'react';
import React, { useState, useEffect } from 'react';

export default function CarRegistration({ auth }: PageProps) {


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