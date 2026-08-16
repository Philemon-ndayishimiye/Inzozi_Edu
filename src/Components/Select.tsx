import React from 'react';

const classVariant = {
   defoult :' w-full  border border-gray-200',
   primary:'w-full border-none bg-white',
};

type selectVariant = keyof typeof classVariant;

export type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  variant?:selectVariant;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const Select: React.FC<SelectProps> = ({ options, value, onChange, className , variant='defoult' }) => (
  <select
    value={value}
    onChange={e => onChange?.(e.target.value)}
    className={` ${classVariant[variant]} focus:outline-none rounded-lg px-3 py-2 text-gray-700 mb-2 ${className}`}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
