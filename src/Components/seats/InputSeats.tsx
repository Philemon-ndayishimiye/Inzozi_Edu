// This component assumes React and Tailwind CSS are set up in your project.
import React from 'react';

// Define the properties (props) for the component
interface TextInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number; // The current value of the input
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
  name?: string; // The name attribute for the input (important for forms)
  type?: string; // e.g., 'text', 'number', 'email'
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder = 'e.g., Year 3', // Default placeholder matches the image
  required = false,
  value,
  onChange,
  name,
  type = 'text',
}) => {

  // A simple, consistent ID for accessibility purposes
  const inputId = `input-${name}`;

  // Tailwind classes for the input field to match the visual style
  const inputClasses = 
    'w-full ' +
    'px-4 py-2 ' + // Padding: Matches size of image input
    'border border-gray-300 ' + // Light gray border
    'rounded-lg ' + // Rounded corners
    'text-base ' + // Standard text size
    'placeholder-gray-400 italic ' + // Placeholder styling (color and italic)
    'focus:border-gray-200 focus:ring-1 focus:ring-gray-200 ' + // Focus effect
    'outline-none transition-all duration-150';

  // Tailwind classes for the label
  const labelClasses = 
    'block mb-2 ' + // Display block and margin bottom for spacing
    'text-gray-800 font-semibold'; // Dark text and semi-bold font

  return (
    <div className="mb-5 w-full"> {/* Wrapper for easy form spacing and full width */}
      
      {/* Label: 'Year of Study *' */}
      <label htmlFor={inputId} className={labelClasses}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Input Field */}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange} // The key onChange property
        className={inputClasses}
      />
    </div>
  );
};