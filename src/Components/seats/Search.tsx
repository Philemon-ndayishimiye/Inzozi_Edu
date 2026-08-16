import React from 'react';

// 1. Define the properties (props) for the component
interface SearchInputProps {
  value?: string; // The current value of the search input
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for input changes
  onClear?: () => void; // Optional handler to clear the search (if a clear button were added)
  placeholder?: string; // Placeholder text
  name?: string; // Input name attribute
  debounceTime?: number; // Optional prop for debounce functionality (not implemented here, but good for design)
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search by level, student type, academic year...', // Default placeholder
  name = 'search',
}) => {
  
  // Unique ID for the input
  const inputId = `search-input-${name}`;

  // Tailwind classes for the input container (provides the rounded white background)
  const containerClasses = 
    'relative flex items-center w-full max-w-xl'; // Max-width is good for large screen control

  // Tailwind classes for the actual input field
  const inputClasses =
    'w-full ' +
    'py-2 px-4 pl-12 ' + // Padding: Increased left padding (pl-12) for the icon
    'border border-gray-300 ' + // Light gray border
    'rounded-lg ' + // Rounded corners
    'bg-white ' + // White background
    'text-base text-gray-800 ' +
    'placeholder-gray-500 ' + // Placeholder color
    'focus:border-gray-200 focus:ring-1 focus:ring-gray-200 ' + // Focus effect
    'outline-none transition-all duration-150';

  // Tailwind classes for the Search Icon wrapper (positioning the icon)
  const iconWrapperClasses = 
    'absolute left-0 top-0 bottom-0 flex items-center pl-4 text-gray-500 pointer-events-none';

  // SVG for the Search Icon (Magnifying Glass)
  const SearchIcon = (
    <svg 
      className="w-5 h-5" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  return (
    <div className={containerClasses}>
      
      {/* Search Icon */}
      <div className={iconWrapperClasses}>
        {SearchIcon}
      </div>

      {/* Input Field */}
      <input
        id={inputId}
        type="search" // Use type="search" for better semantics and mobile keyboard
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        // Optional: Add accessibility attributes
        aria-label="Search"
      />
    </div>
  );
};