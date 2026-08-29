import ContNav from '../Components/ContNav';
import Footer from '../Components/Footer';
import AuthLayout from '../Components/AuthLayout';
import { useTranslation } from 'react-i18next';
import { IoCheckmarkCircle, IoHourglassOutline, IoMailOutline } from 'react-icons/io5';

export default function Pending() {
  const { t } = useTranslation();
  return (
    <div>
      <ContNav />
      <AuthLayout
        title={t('pending.title')}
        subtitle={t('pending.subtitle')}
      >
        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#E7F5EA] text-[#1E7A34] flex items-center justify-center flex-shrink-0">
              <IoCheckmarkCircle />
            </div>
            <div>
              <b className="block text-[13.5px] text-[#282C34]">{t('pending.step1Title')}</b>
              <span className="text-[12px] text-gray-500">{t('pending.step1Body')}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#FFBE2E] flex items-center justify-center flex-shrink-0">
              <IoHourglassOutline />
            </div>
            <div>
              <b className="block text-[13.5px] text-[#282C34]">{t('pending.step2Title')}</b>
              <span className="text-[12px] text-gray-500">{t('pending.step2Body')}</span>
            </div>
          </div>
          <div className="flex gap-3 opacity-50">
            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
              <IoMailOutline />
            </div>
            <div>
              <b className="block text-[13.5px] text-[#282C34]">{t('pending.step3Title')}</b>
              <span className="text-[12px] text-gray-500">{t('pending.step3Body')}</span>
            </div>
          </div>
        </div>
      </AuthLayout>
      <Footer />
    </div>
  );
}
