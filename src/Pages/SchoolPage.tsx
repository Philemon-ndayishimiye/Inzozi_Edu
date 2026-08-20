import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../Components/Footer';
import ContNav from '../Components/ContNav';
import AuthLayout from '../Components/AuthLayout';

export default function SchoolPage() {
  const { t } = useTranslation();
  return (
    <div>
      <ContNav />
      <AuthLayout
        title={t('schoolPage.title')}
        subtitle={t('schoolPage.subtitle')}
      >
        <Link
          to="/schoolRegister"
          className="block w-full text-center bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px]"
        >
          {t('schoolPage.registerNewSchool')}
        </Link>
      </AuthLayout>
      <Footer />
    </div>
  );
}
