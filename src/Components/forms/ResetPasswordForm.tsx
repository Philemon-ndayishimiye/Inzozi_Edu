import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import LoginInput from '../LoginInput';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../AuthLayout';
import {useForgotPasswordMutation} from '../../App/api/Auth/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ErrorResponse={
  message:string;
}

const ResetPasswordForm: React.FC = () => {
  const[ForgotPassword , {isError , error, isLoading}]=useForgotPasswordMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorm , setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleReset = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!email){
      setError('Email is required');
      return;
    }
    setError('');

    try {
       await ForgotPassword({email}).unwrap();
       navigate('/verification');
    } catch (error) {
       console.log(error);
    }
    setEmail('');
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="You will get an OTP on the email that you provided."
      backTo="/login"
      backLabel="Back to login"
      footer={
        <div className="text-center space-y-3">
          <Link to="/login" className="block w-full border border-gray-300 rounded-lg py-2.5 text-[13.5px] font-semibold text-[#282C34]">
            Return to log in
          </Link>
          <p className="text-[12.5px] text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#F09C00] font-bold">
              Sign up
            </Link>
          </p>
        </div>
      }
    >
      <form onSubmit={handleReset}>
        <LoginInput
          label="Email"
          name="email"
          type="email"
          icon={<FaUser />}
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          variant="default"
        />
        {errorm && <p className="text-red-500 text-[12.5px] pt-1">{errorm}</p>}

        <button
          disabled={isLoading}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-4 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
        >
          {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isLoading ? 'Sending…' : 'Get OTP'}
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
  );
};

export default ResetPasswordForm;
