// CreateNewPasswordForm.tsx
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import LoginInput from '../LoginInput';
import AuthLayout from '../AuthLayout';
import { useResetePasswordMutation } from '../../App/api/Auth/auth';
import { useNavigate } from 'react-router-dom';


const CreateNewPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [resetpass, { isLoading }]=useResetePasswordMutation();
  const[formError , setFormError] = useState({
     newpassword:'',
     confirmpassword:'',
     notmatch:'',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const isStrongPassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };

const handleCreatePassword = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const newpass = newPassword.trim();
  const confirmpass = confirmPassword.trim();

  const errors = {
    newpassword: '',
    confirmpassword: '',
    notmatch: '',
  };

  if (!newpass) {
    errors.newpassword = 'Password is required.';
  } else if (!isStrongPassword(newpass)) {
    errors.newpassword =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
  }

  if (!confirmpass) {
    errors.confirmpassword = 'Please confirm your password.';
  }

  if (newpass && confirmpass && newpass !== confirmpass) {
    errors.notmatch = 'Passwords do not match.';
  }

  setFormError(errors);

  if (errors.newpassword || errors.confirmpassword || errors.notmatch) {
    return;
  }

 try {
  await resetpass({
    newPassword: newpass,
    confirmPassword: confirmpass,
  }).unwrap();

  navigate('/resetSucess');
} catch (error) {
  console.log('error message', error);
}
};

  return (
    <AuthLayout title="Create new password">
      <form onSubmit={handleCreatePassword}>
        <LoginInput
          label="New password"
          name="newPassword"
          type="password"
          icon={<FaLock />}
          placeholder="Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          variant="default"
        />
        {formError.newpassword && (
          <span className="text-red-500 text-[12px]">{formError.newpassword}</span>
        )}

        <LoginInput
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          icon={<FaLock />}
          placeholder="Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          variant="default"
        />
        {formError.confirmpassword && (
          <span className="text-red-500 text-[12px]">{formError.confirmpassword}</span>
        )}
        {formError.notmatch && (
          <span className="text-red-500 text-[12px] block mt-1">{formError.notmatch}</span>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mt-4 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
        >
          {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isLoading ? 'Saving…' : 'Create password'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default CreateNewPasswordForm;
