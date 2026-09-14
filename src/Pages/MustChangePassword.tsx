import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FaLock } from 'react-icons/fa';
import LoginInput from '../Components/LoginInput';
import AuthLayout from '../Components/AuthLayout';
import { useUpdateUserMutation } from '../App/api/users/users';
import { useUser } from '../Hooks/useUser';
import { getRoleDestination } from '../Helper/roleRedirect';
import Cookies from 'js-cookie';

type ErrorResponse = { message?: string };

const isStrongPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

export default function MustChangePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, refetchUser } = useUser();
  const [updateUser, { isLoading, error, isError }] = useUpdateUserMutation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState({ newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    // Already changed (e.g. revisiting this URL directly) - send them on.
    if (user && user.mustChangePassword === false) {
      navigate(getRoleDestination(user.role?.name, undefined), { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const next = { newPassword: '', confirmPassword: '' };
    if (!newPassword) {
      next.newPassword = t('auth.mustChangePassword.passwordRequired');
    } else if (!isStrongPassword(newPassword)) {
      next.newPassword = t('auth.mustChangePassword.passwordWeak');
    }
    if (!confirmPassword) {
      next.confirmPassword = t('auth.mustChangePassword.confirmRequired');
    } else if (newPassword && confirmPassword !== newPassword) {
      next.confirmPassword = t('auth.mustChangePassword.passwordsNoMatch');
    }

    setFormError(next);
    if (next.newPassword || next.confirmPassword) {return;}

    try {
      await updateUser({ userId: 'me', data: { password: newPassword } }).unwrap();
      refetchUser?.();
      navigate(getRoleDestination(user?.role?.name, undefined), { replace: true });
    } catch {
      // surfaced below via `error`
    }
  };

  const submitErrorMessage =
    isError && error && 'status' in (error as FetchBaseQueryError)
      ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message ||
        t('auth.mustChangePassword.genericError')
      : '';

  return (
    <AuthLayout
      title={t('auth.mustChangePassword.title')}
      subtitle={t('auth.mustChangePassword.subtitle')}
    >
      <form onSubmit={handleSubmit}>
        {submitErrorMessage && (
          <div className="mb-3 bg-[#FBEAE8] border border-[#B10E1E]/30 text-[#B10E1E] rounded-lg px-4 py-3 text-[13px] font-semibold">
            {submitErrorMessage}
          </div>
        )}

        <LoginInput
          label={t('auth.mustChangePassword.newPassword')}
          name="newPassword"
          type="password"
          icon={<FaLock />}
          placeholder={t('auth.login.password')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          variant="default"
        />
        {formError.newPassword && (
          <span className="text-red-500 text-[12px]">{formError.newPassword}</span>
        )}

        <LoginInput
          label={t('auth.mustChangePassword.confirmPassword')}
          name="confirmPassword"
          type="password"
          icon={<FaLock />}
          placeholder={t('auth.login.password')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="default"
        />
        {formError.confirmPassword && (
          <span className="text-red-500 text-[12px]">{formError.confirmPassword}</span>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-4 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
        >
          {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isLoading ? t('auth.mustChangePassword.saving') : t('auth.mustChangePassword.setAndContinue')}
        </button>
      </form>
    </AuthLayout>
  );
}
