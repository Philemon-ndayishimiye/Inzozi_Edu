import logo from '../assets/logo 2.png';
import { IoMdMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Language from './Language';
import { SUPPORTED_LANGUAGES } from '../i18n';

const classVariant ={
  defoult:'bg-[#0b4d7c]',
  primary:'bg-primary-color',
};

type Navigation={
  variant?:keyof typeof classVariant
};

export default function Navigation({variant='defoult'}:Navigation) {
  const { t, i18n } = useTranslation();
  const [open, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (value: string) => {
    i18n.changeLanguage(value);
  };

  const handleClick = () => {
    setIsOpen(!open);
  };

  const closeMenu = () => setIsOpen(false);

  const goToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      document.getElementById('howitWorks')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('howitWorks')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <>
      <div className={` fixed w-full z-50 px-[50px] flex justify-between py-2  ${classVariant[variant]}  border-none max-sm:hidden`}>
        <Link to='/'>
          <div className="flex items-center">
          <div className="text-white font-bold text-xl">
            <img className="w-[70px]" src={logo} />
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="m-0 font-bold text-[25px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent max-sm:text-[18px]">
              inzoziEdu
            </h1>
            <span className="m-0 text-[11px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent font-semibold max-sm:text-[8px]">
              {t('nav.tagline')}
            </span>
          </div>
        </div>
        </Link>

        <nav className="flex items-center gap-[32px] text-white max-sm:hidden">
          <Link to='/' className="text-[15px] font-family-poppins">
            {t('nav.home')}
          </Link>
          <a className="text-[15px] font-family-poppins cursor-pointer" href="#howitWorks" onClick={goToHowItWorks}>
            {t('nav.howItWorks')}
          </a>
          <Link to='/track' className="text-[15px] font-family-poppins">
            {t('nav.trackApplication')}
          </Link>
            <Language options={SUPPORTED_LANGUAGES} value={i18n.resolvedLanguage} variant='defoult' onChange={handleSelect} />
        </nav>
        <div className="flex items-center text-white">
         <Link to='/login' className="text-[15px] font-family-poppins">
            {t('nav.login')}
          </Link>

         {/* <Link to='/login'> <div className='flex justify-center'>
            <div className='flex justify-center items-center rounded-[50%] bg-[#D9D9D9] w-[40px] h-[40px]'><FaUser className='text-2xl  text-[#605F5F]'/></div>
            <div className='text-[12px] pt-3 pl-1 text-[#605F5F]' >▼</div>
          </div>
          </Link> */}
        </div>
      </div>
   {/* phone responsiveness */}
      <div className="w-full z-50 px-4 py-3 bg-[#0b4d7c] text-white text-3xl sm:hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              {' '}
              {open ? (
                <IoClose className='pt-1 text-4xl' onClick={handleClick} />
              ) : (
                <IoMdMenu className='pt-1 text-4xl' onClick={handleClick} />
              )}
            </div>

            <div>
              <Link to='/' onClick={closeMenu} className="flex items-center">
                <div className="text-white font-bold text-xl">
                  <img className="w-[70px]" src={logo} />
                </div>
                <div className="flex flex-col gap-0">
                  <h1 className="m-0 font-bold text-[25px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent max-sm:text-[18px]">
                    inzoziEdu
                  </h1>
                  <span className="m-0 text-[11px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent font-semibold max-sm:text-[8px]">
                    {t('nav.tagline')}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <Language options={SUPPORTED_LANGUAGES} variant='defoult' value={i18n.resolvedLanguage} onChange={handleSelect} />
        </div>

        {open && (
          <nav className="flex flex-col gap-1 pt-3 text-base">
            <Link
              to='/'
              onClick={closeMenu}
              className="text-[15px] font-family-poppins px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15"
            >
              {t('nav.home')}
            </Link>
            <a
              href="#howitWorks"
              onClick={goToHowItWorks}
              className="text-[15px] font-family-poppins px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15 cursor-pointer"
            >
              {t('nav.howItWorks')}
            </a>
            <Link
              to='/track'
              onClick={closeMenu}
              className="text-[15px] font-family-poppins px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/15"
            >
              {t('nav.trackApplication')}
            </Link>
            <Link
              to='/login'
              onClick={closeMenu}
              className="text-[15px] font-family-poppins px-4 py-3 mt-1 rounded-lg bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold text-center"
            >
              {t('nav.login')}
            </Link>
          </nav>
        )}
      </div>

    </>
  );
}
