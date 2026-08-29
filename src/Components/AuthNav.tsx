import logo from '../assets/logo 2.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import profile from '../assets/profile.png';

import Language from './Language';
import { SUPPORTED_LANGUAGES } from '../i18n';

const classVariant = {
  defoult: 'bg-[#0b4d7c]',
  primary: 'bg-primary-color',
};

type Navigation = {
  variant?: keyof typeof classVariant;
};

export default function AuthNav({ variant = 'defoult' }: Navigation) {
  const { t, i18n } = useTranslation();

  const handleSelect = (value: string) => {
    i18n.changeLanguage(value);
  };
  return (
    <div
      className={`px-[50px] flex justify-between py-2  ${classVariant[variant]}  border-none max-sm:hidden`}
    >
      <Link to="/">
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

      <div className="flex gap-[90px]">
        <nav className="flex items-center gap-[32px] text-white max-sm:hidden">
          <Link to="/">
            <a className="text-[15px] font-family-poppins" href="#">
              {t('nav.home')}
            </a>
          </Link>
          <a className="text-[15px] font-family-poppins" href="#">
            {t('nav.howItWorks')}
          </a>
          <Language
            options={SUPPORTED_LANGUAGES}
            value={i18n.resolvedLanguage}
            variant="defoult"
            onChange={handleSelect}
          />
        </nav>
        <div className="flex items-center text-white">
          
            <div className="flex justify-center">
              <div className="flex justify-center items-center rounded-[50%] bg-[#D9D9D9] w-[40px] h-[40px]">
                <img src={profile} className="w-[40px] h-[40px] rounded-[50%]" />
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
}
