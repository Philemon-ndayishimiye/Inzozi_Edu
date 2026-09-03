import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Components/Input';
import { Link } from 'react-router-dom';
 import { useNavigate } from 'react-router-dom';
 import Navigation from '../Components/Navigation';
 import AuthLayout from '../Components/AuthLayout';
 import {districts , genders} from '../Types/district';
import Select from '../Components/Select';
import {useRegistrationMutation} from '../App/api/Auth/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type{ErrorResponse} from '../Pages/Login';

export default function Registration() {
  const { t } = useTranslation();
  const[Registration ,{ error , isError , isLoading}] = useRegistrationMutation();

   const navigate=useNavigate();
  const[formError , setFormError]=useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    district:'',
    gender:'',
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    district: '',
    gender:'',
  });

 // Input handler (receives event)
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

// Select handler (receives value string)
const handleSelectChange = (name: string) => (value: string) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};


    const isStrongPassword = (password: string) => {
    // Accept any non-alphanumeric as "special"
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };


  const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const firstname = formData.firstName.trim();
  const lastname = formData.lastName.trim();
  const email = formData.email.trim();
  const password = formData.password.trim();



  const errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    district: '',
    gender: '',
  };

  // First name
  if (!firstname || firstname.length < 2) {
    errors.firstName = t('register.firstNameError');
  }

  // Last name
  if (!lastname || lastname.length < 2) {
    errors.lastName = t('register.lastNameError');
  }

  // Email
  if (!email || !email.includes('@')) {
    errors.email = t('register.emailError');
  }

  // Password
  if (!password) {
    errors.password = t('register.passwordRequired');
  } else if (!isStrongPassword(password)) {
    errors.password = t('register.passwordWeak');
  }

  setFormError(errors);

  // Stop if any errors exist
  if (
    errors.firstName ||
    errors.lastName ||
    errors.email ||
    errors.password ||
    errors.gender ||
    errors.district
  ) {
    return;
  }

  //  continue with other logic 

   console.log('Form submitted successfully', formData);
  
   try {

    await Registration({
      firstName:formData.firstName ,
      lastName:formData.lastName , 
      email:formData.email ,
      district:formData.district , 
      gender:formData.gender , 
      password:formData.password,
    }).unwrap();

    navigate('/haveaccount');
    
   } catch (error) {
     console.log('error' , error);
   }


 setFormData({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  district: '',
  gender: '',
});
};

  
  return (
    <div>
      <Navigation />

      <AuthLayout
        title={t('register.title')}
        subtitle={t('register.subtitle')}
        footer={
          <p className="text-center text-[13px] text-gray-600">
            {t('register.alreadyHaveAccount')}{' '}
            <Link to="/login" className="text-[#F09C00] font-bold">
              {t('register.logIn')}
            </Link>
          </p>
        }
      >
        <form onSubmit={handleCreate}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <div>
              <Input label={t('register.firstName')} placeholder={t('register.firstName')} value={formData.firstName} onChange={handleInputChange} name="firstName" type="text" />
              {formError.firstName && <span className="text-red-500 text-[12px]">{formError.firstName}</span>}
            </div>
            <div>
              <Input label={t('register.lastName')} placeholder={t('register.lastName')} value={formData.lastName} onChange={handleInputChange} name="lastName" type="text" />
              {formError.lastName && <span className="text-red-500 text-[12px]">{formError.lastName}</span>}
            </div>
          </div>

          <Input label={t('register.email')} placeholder={t('register.email')} value={formData.email} onChange={handleInputChange} name="email" type="email" />
          {formError.email && <span className="text-red-500 text-[12px]">{formError.email}</span>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <div>
              <Select options={districts} value={formData.district} onChange={handleSelectChange('district')} />
              {formError.district && <span className="text-red-500 text-[12px]">{formError.district}</span>}
            </div>
            <Select options={genders} value={formData.gender} onChange={handleSelectChange('gender')} />
          </div>

          <Input label={t('register.password')} placeholder={t('register.password')} value={formData.password} onChange={handleInputChange} name="password" type="password" />
          {formError.password && <span className="text-red-500 text-[12px]">{formError.password}</span>}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-4 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
          >
            {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {isLoading ? t('register.creatingAccount') : t('register.createAndContinue')}
          </button>

          {isError && (
            <p className="text-red-500 text-[13px] font-family-poppins text-center pt-3">
              {'status' in (error as FetchBaseQueryError)
                ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message || t('register.somethingWentWrong')
                : t('register.somethingWentWrong')}
            </p>
          )}
        </form>
      </AuthLayout>
    </div>
  );
}
