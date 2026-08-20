import logo from '../assets/logo 2.png';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Icons from './Icons';
export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA] pt-[60px] px-6 sm:px-10 lg:px-[130px]">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div className="mb-3 max-w-sm">
          <div className="flex items-center mb-3">
            <div className="text-white font-bold text-xl">
              <img className="w-[70px]" src={logo} />
            </div>

            <div className="flex flex-col gap-0">
              <h1 className="m-0 font-bold text-[25px] text-[#F09C00] leading-none">
                inzozI
              </h1>
              <span className="m-0 text-[11px] text-[#FFB833] leading-none">
                {t('footer.tagline')}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[13px] text-[#000000] leading-relaxed">
              {t('footer.description')}
            </h4>
          </div>

          <div className="flex gap-3 pt-4">
            <Icons icons={<FaTwitter />} />
            <Icons icons={<FaLinkedinIn />} />
            <Icons icons={<FaGithub />} />
            <Icons icons={<MdOutlineMailOutline />} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 lg:flex-shrink-0">
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">{t('footer.legal')}</h1>
            <p className="text-black text-[14px] py-1 ">{t('footer.privacyPolicy')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.termsOfService')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.cookiePolicy')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.gdpr')}</p>
          </div>
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">{t('footer.products')}</h1>
            <p className="text-black text-[14px] py-1 ">{t('footer.features')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.howItWorks')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.pricing')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.demo')}</p>
          </div>
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">{t('footer.resources')}</h1>
            <p className="text-black text-[14px] py-1 ">{t('footer.documentation')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.guide')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.api')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.support')}</p>
          </div>
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">{t('footer.company')}</h1>
            <p className="text-black text-[14px] py-1 ">{t('footer.aboutUs')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.careers')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.press')}</p>
            <p className="text-black text-[14px] py-1 ">{t('footer.contact')}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-black border-b">
        <h1 className="text-center text-[#F09C00] pt-[30px] py-6">{t('footer.stayUpdated')}</h1>
        <p className="text-center px-4 text-[13.5px] sm:text-base">
          {t('footer.newsletterText')}
        </p>

        <form className="flex flex-col sm:flex-row justify-center gap-2 py-7 px-6" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full sm:w-[319px] py-2 h-[40px] px-2 focus:outline-none rounded-md bg-white text-primary-color" placeholder={t('footer.emailPlaceholder')}/>
            <button className="bg-[#054069] text-white flex justify-center items-center rounded-md cursor-pointer px-4 py-2">{t('footer.subscribe')}</button>
        </form>
      </div>

      <div className="pt-[20px] flex flex-col sm:flex-row gap-2 justify-between text-center sm:text-left pb-8 text-[13px]">
           <h1>{t('footer.copyright', { year: new Date().getFullYear() })}</h1>
           <div className="flex gap-[10px] justify-center sm:justify-start">
            <h1>{t('footer.location')}</h1>
           </div>
      </div>
    </div>
  );
}
