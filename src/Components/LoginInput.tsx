import React, { useState, type ReactNode } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const classVariant = {
  default:
    'border border-gray-200 text-[#4E5155] focus-within:border-[#F09C00] focus-within:ring-2 focus-within:ring-[#FFB833]/30',
  primary:
    'border border-blue-500 text-[#4E5155] focus-within:ring-2 focus-within:ring-blue-600',
  danger:
    'border border-red-500 text-[#4E5155] focus-within:ring-2 focus-within:ring-red-600',
};

type InputType = {
  label: string;
  icon: ReactNode;
  placeholder: string;
  name: string;
  type: 'text' | 'email' | 'password';
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: keyof typeof classVariant;
};

export default function LoginInput({
  label,
  name,
  type,
  icon,
  placeholder,
  value,
  error,
  onChange,
  variant = 'default',
}: InputType) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && reveal ? 'text' : type;

  return (
    <div className="py-3">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#4E5155] font-family-poppins text-[16px]"
      >
        {label}
      </label>

      {/* Input with icon */}
      <div
        className={`w-full h-[50px] flex gap-1 items-center rounded-md transition-shadow ${classVariant[variant]} ${
          error ? 'border-red-500 focus-within:ring-red-600' : ''
        }`}
      >
        <div className="w-[60px] h-[48px] bg-[#F9FAFB] flex items-center justify-center text-xl border-r border-gray-200 flex-shrink-0 rounded-l-md">
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="border-none outline-none w-full px-2 bg-transparent min-w-0"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((r) => !r)}
            className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#282C34] flex-shrink-0 cursor-pointer"
            aria-label={reveal ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {reveal ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
