import type { MouseEventHandler, ReactNode, ButtonHTMLAttributes } from 'react';

const classVariant = {
  defolt: 'py-1 px-4 border-none text-white bg-gradient-to-r from-orange-600 to-orange-400',
  primary: 'py-1 px-4 border-none text-white',
  secondary: 'h-[38px] px-[20px] bg-primary-color text-white',
  thirdly: 'h-[38px] border px-[40px]',
  registerschool: 'bg-white/30  w-[211px] h-[40px] font-semiBold text-[14px] max-sm:w-[160px] h-[29px] text-[12px]',
  applychild: 'text-[#054069] bg-white w-[211px] h-[40px] font-semiBold text-[14px] max-sm:w-[160px] h-[29px] text-[12px]',
  formbutton: 'w-[98%] h-[52px] text-[21px] bg-[#053F69] text-white',
  login: 'w-[285px] h-[37px] text-[20px] text-white bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00]',
  loginForm: 'bg-primary-color text-white text-22px w-[384px] h-[43px]',
  signupForm: 'w-[280px] h-[32px] text-primary-color text-[15px] border border-primary-color',
  newSchool: 'w-[724px] h-[50px] bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white text-[16px]',
  outline: 'border border-[#F09C00] text-[#F09C00] hover:bg-[#FFF3E0]', // ✅ added outline
  otp:'bg-gradient-to-r from-orange-600 to-orange-400 text-white text-22px w-[384px] h-[43px]',
}; 

export type ButtonVariant = keyof typeof classVariant;

export type ButtonType = {
  disabled?:boolean;
  label?: string; 
  children?: ReactNode; 
  variant: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>; // ✅ lets you pass `type="submit"`

export default function Button({ label, children, disabled, variant, onClick, ...props }: ButtonType) {
  return (
    <button
      
      {...props}
      className={`${classVariant[variant]} flex justify-center items-center font-family-poppins 
      rounded-[12px] ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      
      onClick={onClick}
      disabled={disabled}
    >
      {children || label}
    </button>
  );
}
