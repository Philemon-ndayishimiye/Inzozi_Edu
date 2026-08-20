import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FaLock } from 'react-icons/fa';
import LoginInput from '../Components/LoginInput';
import AuthLayout from '../Components/AuthLayout';
import { useUpdateUserMutation } from '../App/api/users/users';
import { useUser } from '../Hooks/useUser';
import { getRoleDestination } from '../Helper/roleRedirect';

type ErrorResponse = { message?: string };

const isStrongPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

export default function MustChangePassword() {
  const navigate = useNavigate();
  const { user, refetchUser } = useUser();
  const [updateUser, { isLoading, error, isError }] = useUpdateUserMutation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState({ newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
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
      next.newPassword = 'Password is required.';
    } else if (!isStrongPassword(newPassword)) {
      next.newPassword =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
    }
    if (!confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (newPassword && confirmPassword !== newPassword) {
      next.confirmPassword = 'Passwords do not match.';
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
        'Could not update your password. Please try again.'
      : '';

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="For your security, you need to set your own password before continuing."
    >
      <form onSubmit={handleSubmit}>
        {submitErrorMessage && (
          <div className="mb-3 bg-[#FBEAE8] border border-[#B10E1E]/30 text-[#B10E1E] rounded-lg px-4 py-3 text-[13px] font-semibold">
            {submitErrorMessage}
          </div>
        )}

        <LoginInput
          label="New password"
          name="newPassword"
          type="password"
          icon={<FaLock />}
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          variant="default"
        />
        {formError.newPassword && (
          <span className="text-red-500 text-[12px]">{formError.newPassword}</span>
        )}

        <LoginInput
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          icon={<FaLock />}
          placeholder="Password"
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
          {isLoading ? 'Saving…' : 'Set password & continue'}
        </button>
      </form>
    </AuthLayout>
  );
}
