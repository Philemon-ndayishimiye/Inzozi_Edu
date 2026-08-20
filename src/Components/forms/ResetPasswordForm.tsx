import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      setError(t('resetRequest.emailRequired'));
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
      title={t('resetRequest.title')}
      subtitle={t('resetRequest.subtitle')}
      backTo="/login"
      backLabel={t('resetRequest.backToLogin')}
      footer={
        <div className="text-center space-y-3">
          <Link to="/login" className="block w-full border border-gray-300 rounded-lg py-2.5 text-[13.5px] font-semibold text-[#282C34]">
            {t('resetRequest.returnToLogin')}
          </Link>
          <p className="text-[12.5px] text-gray-500">
            {t('resetRequest.noAccount')}{' '}
            <Link to="/register" className="text-[#F09C00] font-bold">
              {t('resetRequest.signUp')}
            </Link>
          </p>
        </div>
      }
    >
      <form onSubmit={handleReset}>
        <LoginInput
          label={t('resetRequest.email')}
          name="email"
          type="email"
          icon={<FaUser />}
          placeholder={t('resetRequest.emailPlaceholder')}
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
          {isLoading ? t('resetRequest.sending') : t('resetRequest.getOtp')}
        </button>

        {isError && (
          <p className="text-red-500 text-[13px] font-family-poppins text-center pt-3">
            {'status' in (error as FetchBaseQueryError)
              ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message || t('resetRequest.somethingWentWrong')
              : t('resetRequest.somethingWentWrong')}
          </p>
        )}
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordForm;
