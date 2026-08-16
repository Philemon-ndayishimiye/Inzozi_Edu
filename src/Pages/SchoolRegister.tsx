'use client';

import type React from 'react';

import ContNav from '../Components/ContNav';
import Input from '../Components/Input';
import { useState } from 'react';
import Footer from '../Components/Footer';
import AuthLayout from '../Components/AuthLayout';
import { useRegisterSchoolMutation } from '../App/api/school/school';
import Select from '../Components/Select';
import { districts } from '../Types/district';
import { useNavigate } from 'react-router-dom';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ErrorResponse } from './Login';

export default function SchoolRegister() {
  const navigate = useNavigate();

  const [register, { isLoading, error, isError }] = useRegisterSchoolMutation();
  const [formData, setFormData] = useState({
    schoolCode: '',
    schoolName: '',
    email: '',
    district: '',
    licenseDocument: null as File | null,
  });

  const [errors, setErrors] = useState<{
    schoolcode?: string
    schoolname?: string
    email?: string
    file?: string
    district?: string
  }>({});

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.schoolCode.trim()) {
      newErrors.schoolcode = 'School code is required';
    }
    if (!formData.schoolName.trim()) {
      newErrors.schoolname = 'School name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.licenseDocument) {
      newErrors.file = 'Certificate file is required';
    }
    if (!formData.district) {
      newErrors.district = 'District is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validateForm()) {return;}

  try {
    const form = new FormData();
    form.append('schoolName', formData.schoolName);
    form.append('schoolCode', formData.schoolCode);
    form.append('email', formData.email);
    form.append('district', formData.district);
    if (formData.licenseDocument) {
      form.append('licenseDocument', formData.licenseDocument); // Match backend field name
    }

    // Call the RTK Query mutation
    await register(form).unwrap();

    // Optionally reset form or show success
    setFormData({
      schoolCode: '',
      schoolName: '',
      email: '',
      district: '',
      licenseDocument: null,
    });
    navigate('/pending');
  } catch (err) {
    console.error('Error submitting school registration:', err);
    setErrors((prev) => ({
      ...prev,
      file: 'Failed to register school. Please check your inputs and try again.',
    }));
  }
};


  return (
    <div>
      <ContNav />

      <AuthLayout
        wide
        title="Register your school"
        subtitle="Submit your school's details and legal documents. An Inzozi Admin will review this before your school goes live — usually within 2–3 business days."
      >
        <form onSubmit={handleCreate}>
          {errors.file && <p className="text-red-500 text-sm mb-2">{errors.file}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <div>
              <Input label="School Code" placeholder="School Code" value={formData.schoolCode} onChange={handleChange} name="schoolCode" type="text" />
              {errors.schoolcode && <p className="text-red-500 text-sm">{errors.schoolcode}</p>}
            </div>
            <div>
              <Input label="School Name" placeholder="School Name" value={formData.schoolName} onChange={handleChange} name="schoolName" type="text" />
              {errors.schoolname && <p className="text-red-500 text-sm">{errors.schoolname}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <div>
              <Select options={districts} value={formData.district} onChange={handleSelectChange('district')} />
              {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
            </div>
            <div>
              <Input label="School Email" placeholder="Email" value={formData.email} onChange={handleChange} name="email" type="email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>

          <Input label="Legal registration certificate" placeholder="Certificate" onChange={handleChange} name="licenseDocument" type="file" />
          <p className="text-[11.5px] text-gray-400 -mt-2 mb-3">Required so Inzozi Admin can verify your school is legally recognized.</p>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-2 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
          >
            {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {isLoading ? 'Registering…' : 'Submit for review'}
          </button>

          {isError && (
            <p className="text-red-500 text-[13px] font-family-poppins text-center pt-3">
              {'status' in (error as FetchBaseQueryError)
                ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message || 'Failed to register school'
                : 'Failed to register school'}
            </p>
          )}
        </form>
      </AuthLayout>

      <Footer />
    </div>
  );
}
