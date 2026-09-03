import ContNav from '../Components/ContNav';
import { FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../Components/AuthLayout';
import { Link } from 'react-router-dom';

export default function ResetPasswordSuccessPage() {
  const { t } = useTranslation();
  return (
    <div>
      <ContNav />
      <AuthLayout title={t('resetSuccess.title')}>
        <div className="flex flex-col items-center text-center py-4">
          <FaCheckCircle className="text-6xl text-[#F09C00] mb-3" />
          <h2 className="text-[#F09C00] text-[20px] font-bold mb-2">{t('resetSuccess.success')}</h2>
          <p className="text-gray-500 text-[13.5px] font-family-poppins mb-6">
            {t('resetSuccess.body')}
          </p>
          <Link
            to="/login"
            className="w-full bg-[#05416B] text-white font-bold rounded-lg py-3 text-center text-[14.5px]"
          >
            {t('resetSuccess.returnToLogin')}
          </Link>
        </div>
      </AuthLayout>
    </div>
  );
}
