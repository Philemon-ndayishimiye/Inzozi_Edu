import React, { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const classVariant = {
  default:
    'border border-[#EBEBEB] text-[#4E5155] focus-within:ring-2 focus-within:ring-primary-color transition-shadow',
  primary:
    'border border-blue-500 text-[#4E5155] focus-within:ring-2 focus-within:ring-blue-600 transition-shadow',
  danger:
    'border border-red-500 text-[#4E5155] focus-within:ring-2 focus-within:ring-red-600 transition-shadow',
};

type InputType = {
  label: string;
  placeholder:string;
  name: string;
  type: 'text' | 'email' | 'password'|'file';
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: keyof typeof classVariant;
};

export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  variant = 'default',
}: InputType) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && reveal ? 'text' : type;

  return (
    <div className="w-full flex flex-col gap-1 py-3">
      <label htmlFor={name} className="text-sm font-medium text-[#4E5155] font-family-poppins text-[16px] ">
        {label}
      </label>
      <div className={`relative flex items-center rounded-md ${classVariant[variant]}`}>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full px-3 py-2 bg-transparent outline-none min-w-0"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((r) => !r)}
            className="pr-3 text-gray-400 hover:text-[#282C34] flex-shrink-0 cursor-pointer"
            aria-label={reveal ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {reveal ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        )}
      </div>
    </div>
  );
}
