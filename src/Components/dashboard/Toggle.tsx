type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export default function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-[23px] rounded-full flex-shrink-0 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        checked ? 'bg-[#1E7A34]' : 'bg-[#B10E1E]'
      }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-[17px] h-[17px] bg-white rounded-full transition-transform ${
          checked ? 'translate-x-[17px]' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
