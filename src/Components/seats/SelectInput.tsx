import React from 'react';

// Define the structure for each option in the dropdown
interface SelectOption {
  value: string;
  label: string;
}

// Define the properties (props) for the SelectInput component
interface SelectInputProps {
  label?: string; // The text label above the select (e.g., "Level *")
  name?: string; // The 'name' attribute for the select element
  options: SelectOption[]; // An array of options to display in the dropdown
  value?: string; // The currently selected value (controlled by parent state)
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Handler for when an option is selected
  placeholder?: string; // Optional text to show when no option is selected (e.g., "Select level")
  required?: boolean; // If the select field is required for form submission
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = 'Select level', // Default placeholder text
  required = false,
}) => {
  // Unique ID for connecting the label to the select element for accessibility
  const selectId = `select-${name}`;

  // Tailwind classes for the label
  const labelClasses = 
    'block mb-2 text-gray-800 font-semibold';

  // Tailwind classes for the select input field
  const selectClasses = 
    'block w-full ' +
    'px-4 py-2 ' + // Padding matches the visual size of the image
    'border border-gray-300 ' + // Light gray border
    'rounded-lg ' + // Rounded corners
    'bg-white ' + // Explicit white background
    'text-base ' + // Standard text size
    'focus:border-gray-200 focus:ring-1 focus:ring-gray-200 ' + // Focus effect
    'outline-none transition-all duration-150 ' +
    'appearance-none ' + // Hides default browser arrow
    'pr-10'; // Ensures space for our custom arrow

  // Tailwind classes for the custom arrow icon (using a div for positioning)
  const arrowClasses = 
    'absolute inset-y-0 right-0 flex items-center pr-3 ' +
    'pointer-events-none text-gray-400';

  return (
    <div className="mb-5 w-full"> {/* Wrapper for easy form spacing */}
      
      {/* Label: "Level *" */}
      <label htmlFor={selectId} className={labelClasses}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Select Input Field */}
      <div className="relative"> {/* Container for select and custom arrow */}
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={selectClasses}
        >
          {/* Placeholder option (if value is empty, this will be shown) */}
          <option value="" disabled hidden>
            {placeholder}
          </option>
          
          {/* Map through the options array to create actual <option> elements */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Arrow Icon (SVG) */}
        <div className={arrowClasses}>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};