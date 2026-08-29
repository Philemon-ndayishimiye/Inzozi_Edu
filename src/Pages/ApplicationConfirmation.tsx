import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoDownloadOutline, IoMailOutline, IoSearchOutline } from 'react-icons/io5';

type ConfirmationState = {
  referenceCode: string;
  schoolName: string;
  studentName: string;
  guardianEmail: string;
  level?: string;
  yearofstudy?: string;
};

export default function ApplicationConfirmation() {
  const { t } = useTranslation();
  const { state } = useLocation() as { state: ConfirmationState | null };
  const navigate = useNavigate();

  if (!state?.referenceCode) {
    return (
      <div>
        <Navigation />
        <div className="pt-[110px] pb-19 px-6 text-center bg-gradient-to-b from-white to-[#CFDCEA] min-h-[70vh]">
          <h1 className="text-[22px] font-bold text-[#282C34] font-family-playfair mb-2">
            {t('applicationConfirmation.noApplicationTitle')}
          </h1>
          <p className="text-[#6B7280] text-[14px] font-family-poppins mb-6">
            {t('applicationConfirmation.noApplicationBody')}
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg px-6 py-3 text-[14px]"
          >
            {t('applicationConfirmation.searchSchools')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="pt-[110px] pb-16 px-5 sm:px-8 bg-gradient-to-b from-white to-[#CFDCEA] min-h-[70vh]">
        <div className="max-w-lg mx-auto text-center">
          <FaRegCheckCircle className="text-6xl text-[#F09C00] mx-auto mb-5" />
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#282C34] font-family-playfair mb-2">
            {t('applicationConfirmation.onItsWay')}
          </h1>
          <p className="text-[#6B7280] text-[14px] font-family-poppins mb-7 leading-relaxed">
            {t('applicationConfirmation.sentTo', { school: state.schoolName, email: state.guardianEmail })}
          </p>

          <div className="bg-white border-[1.5px] border-dashed border-gray-300 rounded-xl p-5 mb-7 text-left sm:text-center">
            <div className="font-mono text-[10.5px] uppercase tracking-wide text-[#6B7280] mb-1">
              {t('applicationConfirmation.trackingCodeLabel')}
            </div>
            <div className="font-mono text-[15px] sm:text-[17px] font-bold text-[#05416B] break-all">
              {state.referenceCode}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 text-left">
            <h3 className="font-mono text-[11px] uppercase tracking-wide text-[#6B7280] mb-3">
              {t('applicationConfirmation.whatHappensNext')}
            </h3>
            <div className="flex gap-3 py-2 text-[13.5px] font-family-poppins">
              <IoDownloadOutline className="text-lg text-[#05416B] flex-shrink-0 mt-0.5" />
              <div>
                <b className="block text-[#282C34]">{t('applicationConfirmation.reviewStepTitle')}</b>
                <span className="text-[#6B7280] text-[12.5px]">{t('applicationConfirmation.reviewStepBody')}</span>
              </div>
            </div>
            <div className="flex gap-3 py-2 text-[13.5px] font-family-poppins">
              <IoMailOutline className="text-lg text-[#05416B] flex-shrink-0 mt-0.5" />
              <div>
                <b className="block text-[#282C34]">{t('applicationConfirmation.emailStepTitle')}</b>
                <span className="text-[#6B7280] text-[12.5px]">{t('applicationConfirmation.emailStepBody', { email: state.guardianEmail })}</span>
              </div>
            </div>
            <div className="flex gap-3 py-2 text-[13.5px] font-family-poppins">
              <IoSearchOutline className="text-lg text-[#05416B] flex-shrink-0 mt-0.5" />
              <div>
                <b className="block text-[#282C34]">{t('applicationConfirmation.checkStepTitle')}</b>
                <span className="text-[#6B7280] text-[12.5px]">{t('applicationConfirmation.checkStepBody')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/track?ref=${encodeURIComponent(state.referenceCode)}`)}
            className="w-full bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mb-3 cursor-pointer"
          >
            {t('applicationConfirmation.trackThisApplication')}
          </button>
          <Link
            to="/"
            className="block w-full border border-gray-300 rounded-lg py-3 text-[14.5px] font-semibold text-[#282C34] font-family-poppins"
          >
            {t('applicationConfirmation.searchMoreSchools')}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
