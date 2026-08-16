import React from 'react';

// 1. Define the props interface for type safety
interface SchoolDescriptionTextareaProps {
  /** The unique name for the input field. */
  name?: string;
  /** The current value of the textarea. */
  value?: string;
  /** Function to call when the input value changes. */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Text shown when the textarea is empty. */
  placeholder?: string;
  /** The number of visible text lines (optional, defaults to 4). */
  rows?: number;
  label:string;
}

// 2. The Textarea Component with Implicit Return
// The outer curly braces ({}) and the 'return' keyword are removed,
// wrapping the entire JSX in parentheses (()) instead.
const SchoolDescriptionTextarea: React.FC<SchoolDescriptionTextareaProps> = ({
  name,
  label,
  value,
  onChange,
  placeholder = 'Enter school description...', // Set a default placeholder
  rows = 4, // Default rows for a multi-line input
}) => (
  <div className="w-full">
    {/* Optional: Add a label above the description field */}
    <label htmlFor={name} className="block text-lg font-semibold text-gray-800 mb-2">
      {label}
    </label>
    
    {/* The main Textarea element with Tailwind CSS styling */}
    <textarea
      id={name} // Use the name prop as the id for accessibility
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="
        w-full 
        px-4 py-3 
        text-gray-700 
        border border-gray-300 
        rounded-xl 
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-200 
        focus:border-transparent 
        shadow-md 
        resize-y
      "
      // resize-y allows vertical resizing by the user, similar to your image's corner handle.
    ></textarea>
  </div>
);

export default SchoolDescriptionTextarea;