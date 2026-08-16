import React from 'react';

// 1. Define the props structure
interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset'; // Standard HTML button types
  variant?: 'primary' | 'secondary' | 'danger' |'third'; // Custom variants
  disabled?: boolean;
  loading?: boolean;
}

// 2. Define Tailwind classes for each custom variant
// This object maps the 'variant' prop to the specific Tailwind classes.
const variantClasses = {
  // --- Default (Primary) Variant: Matches the provided image ---
  primary: 
    'bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white ' + // Color and Text (Same as image)
    'hover:bg-orange-500 ' + // Darker on hover
    'shadow-md', // Slight shadow for depth

  // --- Example Secondary Variant ---
  secondary: 
    'bg-gradient-to-r text-white from-[#F09C00] via-[#FFB833] to-[#F09C00] text-gray-800 border border-gray-300 ' +
    'hover:bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00]',

  // --- Example Danger Variant ---

  third:'bg-gray-500 text-white ',
  danger: 
    'bg-red-500 text-white ' +
    'hover:bg-red-600',
};

// 3. Define the component
export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type = 'button',
  variant = 'primary', // Default to 'primary' (the image style)
  disabled = false,
  loading = false,
}) => {

  // Base and common styles applied to ALL buttons
  const baseClasses = 
    'flex items-center justify-center ' +
    'px-5 py-2.5 ' +// Spacing/Padding
    'rounded-lg ' + // Rounded corners (Matches image)
    'font-semibold text-base ' + // Typography (Matches image: semi-bold, 16px)
    'cursor-pointer transition-colors duration-200 ' +
    'whitespace-nowrap';// Prevents text from wrapping

  // Responsiveness: Full width by default, auto width on screens > 640px (sm)
  const responsiveClasses =
    'w-full sm:w-auto';

  // Disabled state styling
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';

  // Combine all classes
  const classes = [
    baseClasses,
    responsiveClasses,
    variantClasses[variant], // Apply custom variant styles
    disabledClasses,
  ].join(' ');

  const PlusIcon = (
    <svg 
      className="w-5 h-5 mr-2" // Tailwind for size and margin-right
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
  
  const Spinner = (
    <span className="w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin flex-shrink-0" />
  );

  // Conditionally show the icon if the label implies 'Add'
  const showIcon = label.toLowerCase().startsWith('add');

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
    >
      {loading ? Spinner : showIcon && PlusIcon}
      {label}
    </button>
  );
};

