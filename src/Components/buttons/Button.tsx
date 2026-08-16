// Button.tsx
import React from 'react';

const buttonVariants = {
  primary: 'bg-primary-color hover:bg-primary-color/90 text-white py-3 px-4 font-semibold',
  secondary: 'bg-[#E69500] cursor-pointer hover:bg-[#E69500]/90 text-white py-3 px-4 font-semibold',
  outline: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 font-medium cursor-pointer',
  danger: 'bg-red-600 hover:bg-red-700 text-white py-3 px-4 font-semibold',
  success: 'bg-green-600 hover:bg-green-700 text-white py-3 px-4 font-semibold',
};

const buttonSizes = {
  small: 'text-xs px-3 py-2',
  medium: 'text-sm px-4 py-3',
  large: 'text-base px-6 py-4',
};

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
}) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );

export default Button;