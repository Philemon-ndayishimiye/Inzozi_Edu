


import { useState } from 'react';

const classVariant = {
  defoult:'w-[180px]',
  primary:'w-[120px]',
};

type Option = {
  value: string
  label: string
}

type LanguageProps = {
  options: Option[];
  value?: string;
  variant:keyof typeof classVariant;
  onChange?: (value: string) => void
}

export default function Language({ options, value, onChange, variant }: LanguageProps) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className={`relative  max-sm:w-[120px] max-sm:text-[13px] ${classVariant[variant]}`}>
      {/* Custom dropdown */}
      <div
        className="flex items-center border-none px-3 py-2 rounded-lg cursor-pointer  transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{selectedOption.label}</span>
        </div>
        <span className={`text-white text-[10px] pt-1 pl-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${
                option.value === value ? 'bg-blue-100 text-blue-700' : 'text-black'
              }`}
              onClick={() => {
                onChange?.(option.value); // trigger parent change
                setOpen(false); // close dropdown
              }}
            >
              
              <span className="font-medium">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
