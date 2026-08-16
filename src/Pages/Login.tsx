import { useState } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import LoginInput from '../Components/LoginInput';
import { FaRegUser } from 'react-icons/fa';
import { RxLockClosed } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import AuthLayout from '../Components/AuthLayout';
import {useLoginMutation} from '../App/api/Auth/auth';
import { useUser } from '../Hooks/useUser';


export type ErrorResponse={
  message:string;
}

export default function Login() {
  const{setUserFromLogin}=useUser();
  const[Login , {isLoading , isError ,error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error when user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    // } else if (formData.password.length >= 6) {
    //   newErrors.password = 'Password must be at least 6 characters';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const response = await Login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Save token
     if (response?.data?.token && response?.data?.user) {
  setUserFromLogin?.({
    user: response.data.user,
    token: response.data.token,
  });
}


      // Use the user info directly from response
      const roleName = response?.data?.user?.roleName;
      const schoolStatus= response?.data?.schoolStatus;


      console.log(roleName);
      console.log(schoolStatus);

       if (roleName === 'Admin') {
        navigate('/superAdmin/dashboard');
      }
      else if( schoolStatus === 'not_registered'){
            navigate('/schoolManager');
      }
       else if( schoolStatus === 'pending'){
            navigate('/pending');
      }
       else if( schoolStatus === 'approved'){
            navigate('/schoolAdmin/dashboard');
      }
       else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  }
};



  return (
    <div>
      <Navigation />

      <AuthLayout
        title="Log in to your account"
        subtitle="For School Managers, Admission Managers, and Inzozi Admins. Parents don't need an account — apply directly from a school's page."
        footer={
          <p className="text-center text-[13px] text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#F09C00] font-bold">
              Sign up
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit}>
          <LoginInput
            icon={<FaRegUser />}
            label="Email"
            placeholder="Email"
            value={formData.email}
            name="email"
            type="email"
            onChange={handleChange}
            variant={error ? 'danger' : 'default'}
          />
          {errors.email && <p className="text-red-500 text-[12px]">{errors.email}</p>}

          <LoginInput
            icon={<RxLockClosed />}
            label="Password"
            placeholder="Password"
            value={formData.password}
            name="password"
            type="password"
            onChange={handleChange}
            variant={error ? 'danger' : 'default'}
          />
          {errors.password && <p className="text-red-500 text-[12px]">{errors.password}</p>}

          <Link to="/reset">
            <p className="text-right text-[12.5px] py-2 text-[#F09C00] font-semibold cursor-pointer">
              Forgot password?
            </p>
          </Link>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-2 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
          >
            {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {isLoading ? 'Logging in…' : 'Log in'}
          </button>

          {isError && (
            <p className="text-red-500 text-[13px] text-center font-family-poppins pt-3">
              {'status' in (error as FetchBaseQueryError)
                ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message || 'Invalid email or password'
                : 'Invalid email or password'}
            </p>
          )}
        </form>
      </AuthLayout>

      <Footer />
    </div>
  );
}
