import type { ReactNode } from 'react';
import { WiDirectionRight } from 'react-icons/wi';

const classVariant = {
  defolt: 'rounded-xl bg-gradient-to-r from-[#0E3661] to-[#42A5F5]',
  primary: 'rounded-xl bg-gradient-to-b from-slate-700 to-slate-500',
  secondly:'rounded-[50%] bg-gradient-to-b from-slate-700 to-slate-500',

};

type customWorks = {
  icon: ReactNode;
  step?: string;
  title?: string;
  description?: string;
  variant: keyof typeof classVariant;
};

export default function Works({
  icon,
  step,
  title,
  description,
  variant,
}: customWorks) {
  return (
    <div className="py-3 flex gap-3">
      <div
        className={`${classVariant[variant]} w-[48px] h-[48px] flex justify-center items-center text-3xl  text-white`}
      >
        {icon}
      </div>
      <div>
        <h2 className=" text-[14px] flex">
         <span className='pt-1'>{step}</span>  <WiDirectionRight className="text-[#6B7280] text-4xl text pl-2 " />
        </h2>
        <h2 className="  text-[14px] text-[#1672b4] font-medium">{title}</h2>
        <h2 className="  text-[#6B7280]  text-[16px]">{description}</h2>
      </div>

      
    </div>
  );
}
