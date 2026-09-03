import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import LoginInput from '../Components/LoginInput';
import { FaRegUser } from 'react-icons/fa';
import { RxLockClosed } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import AuthLayout from '../Components/AuthLayout';
import {useLoginMutation} from '../App/api/Auth/auth';
import { useUser } from '../Hooks/useUser';
import { getRoleDestination } from '../Helper/roleRedirect';


export type ErrorResponse={
  message:string;
}

export default function Login() {
  const { t } = useTranslation();
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
      newErrors.email = t('auth.login.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.login.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.login.passwordRequired');
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
      const schoolStatus = response?.data?.schoolStatus;
      const mustChangePassword = response?.data?.user?.mustChangePassword;

      // One-time obligation: only true until an Admission Manager sets their
      // own password for the first time after their account is created —
      // never shown again on subsequent logins once that's done.
      if (mustChangePassword) {
        navigate('/must-change-password');
      } else {
        navigate(getRoleDestination(roleName, schoolStatus));
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
        title={t('auth.login.title')}
        subtitle={t('auth.login.subtitle')}
        footer={
          <p className="text-center text-[13px] text-gray-600">
            {t('auth.login.noAccount')}{' '}
            <Link to="/register" className="text-[#F09C00] font-bold">
              {t('auth.login.signUp')}
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit}>
          <LoginInput
            icon={<FaRegUser />}
            label={t('auth.login.email')}
            placeholder={t('auth.login.email')}
            value={formData.email}
            name="email"
            type="email"
            onChange={handleChange}
            variant={error ? 'danger' : 'default'}
          />
          {errors.email && <p className="text-red-500 text-[12px]">{errors.email}</p>}

          <LoginInput
            icon={<RxLockClosed />}
            label={t('auth.login.password')}
            placeholder={t('auth.login.password')}
            value={formData.password}
            name="password"
            type="password"
            onChange={handleChange}
            variant={error ? 'danger' : 'default'}
          />
          {errors.password && <p className="text-red-500 text-[12px]">{errors.password}</p>}

          <Link to="/reset">
            <p className="text-right text-[12.5px] py-2 text-[#F09C00] font-semibold cursor-pointer">
              {t('auth.login.forgotPassword')}
            </p>
          </Link>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-2 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
          >
            {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {isLoading ? t('auth.login.loggingIn') : t('auth.login.logIn')}
          </button>

          {isError && (
            <p className="text-red-500 text-[13px] text-center font-family-poppins pt-3">
              {'status' in (error as FetchBaseQueryError)
                ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message || t('auth.login.invalidCredentials')
                : t('auth.login.invalidCredentials')}
            </p>
          )}
        </form>
      </AuthLayout>
    </div>
  );
}
