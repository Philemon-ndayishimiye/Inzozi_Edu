import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl font-bold text-[#282C34] font-family-playfair mb-2">{t('notFound.title')}</h1>
      <p className="text-[#6B7280] text-[14px] font-family-poppins mb-6">{t('notFound.body')}</p>
      <Link
        to="/"
        className="inline-block bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg px-6 py-3 text-[14px]"
      >
        {t('notFound.backHome')}
      </Link>
    </div>
  );
}
