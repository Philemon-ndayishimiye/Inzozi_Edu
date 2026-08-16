import { useState } from 'react';
import Input from '../Components/Input';
import { Link } from 'react-router-dom';
 import { useNavigate } from 'react-router-dom';
 import Navigation from '../Components/Navigation';
 import Footer from '../Components/Footer';
 import AuthLayout from '../Components/AuthLayout';
 import {districts , genders} from '../Types/district';
import Select from '../Components/Select';
import {useRegistrationMutation} from '../App/api/Auth/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type{ErrorResponse} from '../Pages/Login';

export default function Registration() {

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
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last name
  if (!lastname || lastname.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email
  if (!email || !email.includes('@')) {
    errors.email = 'Please enter a valid email';
  }

  // Password
  if (!password) {
    errors.password = 'Password is required';
  } else if (!isStrongPassword(password)) {
    errors.password =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
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
        title="Register as a School Manager"
        subtitle="This step is quick and approved automatically — you'll register your school next, and that part goes to Inzozi Admin for review."
        footer={
          <p className="text-center text-[13px] text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#F09C00] font-bold">
              Log in
            </Link>
          </p>
        }
      >
        <form onSubmit={handleCreate}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <div>
              <Input label="First name" placeholder="First name" value={formData.firstName} onChange={handleInputChange} name="firstName" type="text" />
              {formError.firstName && <span className="text-red-500 text-[12px]">{formError.firstName}</span>}
            </div>
            <div>
              <Input label="Last name" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} name="lastName" type="text" />
              {formError.lastName && <span className="text-red-500 text-[12px]">{formError.lastName}</span>}
            </div>
          </div>

          <Input label="Email" placeholder="Email" value={formData.email} onChange={handleInputChange} name="email" type="email" />
          {formError.email && <span className="text-red-500 text-[12px]">{formError.email}</span>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <div>
              <Select options={districts} value={formData.district} onChange={handleSelectChange('district')} />
              {formError.district && <span className="text-red-500 text-[12px]">{formError.district}</span>}
            </div>
            <Select options={genders} value={formData.gender} onChange={handleSelectChange('gender')} />
          </div>

          <Input label="Password" placeholder="Password" value={formData.password} onChange={handleInputChange} name="password" type="password" />
          {formError.password && <span className="text-red-500 text-[12px]">{formError.password}</span>}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-4 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
          >
            {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {isLoading ? 'Creating account…' : 'Create account & continue'}
          </button>

          {isError && (
            <p className="text-red-500 text-[13px] font-family-poppins text-center pt-3">
              {'status' in (error as FetchBaseQueryError)
                ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message || 'Something went wrong'
                : 'Something went wrong'}
            </p>
          )}
        </form>
      </AuthLayout>

      <Footer />
    </div>
  );
}
