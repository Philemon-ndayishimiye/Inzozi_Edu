import React from 'react';

// Define the properties (props) for the component
interface ToggleSwitchProps {
  label: string;
  checked: boolean; // Current state of the switch (on/off)
  onChange: (checked: boolean) => void; // Handler to update the state
  name: string; // The name for the input/form
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
  name,
}) => {
  
  // Unique ID for connecting the label and the hidden checkbox
  const inputId = `toggle-${name}`;

  // Function to handle the internal change event and pass the new state up
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  // Base classes for the outer container and the visual track
  const trackBaseClasses = 
    'relative inline-flex items-center h-6 w-11 rounded-full ' +
    'cursor-pointer transition-colors duration-200 ease-in-out ' +
    'flex-shrink-0'; // Prevents it from shrinking in a flex container

  // Conditional classes for the track color
  const trackColorClasses = checked
    ? 'bg-blue-600' // Blue when checked (like the image)
    : 'bg-gray-200'; // Light gray when unchecked

  // Classes for the visual 'handle' or 'thumb'
  const handleClasses = 
    'pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full ' +
    'bg-white shadow transform transition-transform duration-200 ease-in-out';

  // Conditional class to position the handle based on the 'checked' state
  const handlePositionClass = checked
    ? 'translate-x-5' // Moves the handle to the right when checked
    : 'translate-x-0'; // Keeps the handle to the left when unchecked

  return (
    <div className="flex items-center">
      
      {/* 1. The main interactive switch container */}
      <label htmlFor={inputId} className={trackBaseClasses + ' ' + trackColorClasses}>
        
        {/* Hidden Checkbox: The actual input element */}
        <input
          id={inputId}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="sr-only" // Tailwind utility to visually hide the checkbox but keep it accessible
        />
        
        {/* Visual Handle/Thumb: The white circle */}
        <span
          aria-hidden="true"
          className={handleClasses + ' ' + handlePositionClass}
        />
      </label>

      {/* 2. The Label Text: "Registration Open" */}
      <label htmlFor={inputId} className="ml-3 text-base font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};