import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo 2.png';
import { IoArrowBack } from 'react-icons/io5';

type AuthLayoutProps = {
  title: string;
  subtitle?: ReactNode;
  wide?: boolean;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthLayout({ title, subtitle, wide, backTo, backLabel, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-40px)] bg-gradient-to-b from-white to-[#CFDCEA] flex items-center justify-center px-4 py-10">
      <div className={`w-full ${wide ? 'max-w-2xl' : 'max-w-md'} bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8`}>
        {backTo && (
          <Link to={backTo} className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500 mb-4">
            <IoArrowBack /> {backLabel ?? 'Back'}
          </Link>
        )}

        <Link to="/" className="flex items-center gap-2 mb-6">
          <img className="w-9" src={logo} alt="Inzoziedu" />
          <div>
            <div className="font-family-playfair font-bold text-[17px] bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent leading-none">
              inzoziEdu
            </div>
            <div className="text-[9.5px] font-semibold bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent leading-none mt-0.5">
              Smart Dreams. Bright Futures
            </div>
          </div>
        </Link>

        <h1 className="text-[21px] sm:text-[23px] font-bold text-[#282C34] font-family-playfair mb-1.5">{title}</h1>
        {subtitle && <p className="text-[13px] text-gray-500 leading-relaxed mb-6">{subtitle}</p>}

        {children}

        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}
