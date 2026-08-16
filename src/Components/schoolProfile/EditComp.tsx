import React from 'react';
import { FaPencilAlt } from 'react-icons/fa'; // Importing the pencil icon

// Define the shape of the component's props using a TypeScript interface
interface EditProfileButtonProps {
  /** The text displayed on the button. */
  label: string;
  /** Function to call when the button is clicked. */
  onClick?: () => void;
  /** If true, the button is rendered in a disabled state and cannot be clicked. */
  disabled?: boolean;
  /** If true, shows a spinner instead of the pencil icon (an in-flight action). */
  loading?: boolean;
  type?:'button' |'submit'
}

/**
 * A reusable button component for editing a profile.
 * It features a pencil icon, custom label, and handles click events and disabled state.
 */
const EditProfileButton: React.FC<EditProfileButtonProps> = ({
  label,
  type,
  onClick,
  disabled = false, // Set a default value for 'disabled'
  loading = false,
}) => {
  // Tailwind CSS classes for the button, conditionally applying styles based on the 'disabled' prop
  const buttonClasses = `
    flex items-center justify-center
    px-4 py-2 rounded-xl
    text-white text-lg font-semibold
    transition-all duration-200 ease-in-out
    shadow-lg hover:shadow-xl
    whitespace-nowrap // Ensures the text and icon stay on one line

    // Default (Enabled) Styles
    ${
      !disabled
        ? 'bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] hover:bg-orange-700 active:bg-orange-800 active:scale-[0.97] cursor-pointer'
        : 'bg-orange-300 cursor-not-allowed opacity-70' // Disabled Styles
    }
  `;

  return (
    <button
      type={type} // Important for forms
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={label}
    >
      {loading ? (
        <span className="mr-3 w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      ) : (
        <FaPencilAlt className="mr-3 w-5 h-5" aria-hidden="true" />
      )}
      <span>{label}</span>
    </button>
  );
};

export default EditProfileButton;
