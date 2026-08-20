import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import AuthLayout from '../Components/AuthLayout';

export default function HaveAccountPage() {
  const { t } = useTranslation();
  return (
    <div>
      <Navigation />
      <AuthLayout title={t('haveAccount.title')}>
        <div className="flex flex-col items-center text-center py-4">
          <FaCheckCircle className="text-6xl text-[#F09C00] mb-3" />
          <h2 className="text-[#F09C00] text-[20px] font-bold mb-2">{t('haveAccount.success')}</h2>
          <p className="text-gray-500 text-[13.5px] font-family-poppins mb-6">
            {t('haveAccount.body')}
          </p>
          <Link
            to="/login"
            className="w-full bg-[#05416B] text-white font-bold rounded-lg py-3 text-center text-[14.5px]"
          >
            {t('haveAccount.returnToLogin')}
          </Link>
        </div>
      </AuthLayout>
      <Footer />
    </div>
  );
}
