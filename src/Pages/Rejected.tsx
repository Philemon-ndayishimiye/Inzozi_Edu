import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContNav from '../Components/ContNav';
import AuthLayout from '../Components/AuthLayout';
import { IoCloseCircleOutline, IoMailOutline } from 'react-icons/io5';
import { useUser } from '../Hooks/useUser';
import { useGetSchoolDetailsQuery } from '../App/api/school/school';

const SUPPORT_EMAIL = 'info@inzoziedu.com';

export default function Rejected() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { data } = useGetSchoolDetailsQuery(user?.schoolId ?? '', { skip: !user?.schoolId });
  const reason = data?.data?.rejectedReason;

  return (
    <div>
      <ContNav />
      <AuthLayout
        title={t('rejected.title')}
        subtitle={t('rejected.subtitle')}
      >
        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#FCE8E8] text-[#D92D20] flex items-center justify-center flex-shrink-0">
              <IoCloseCircleOutline />
            </div>
            <div>
              <b className="block text-[13.5px] text-[#282C34]">{t('rejected.reasonTitle')}</b>
              <span className="text-[12px] text-gray-500">{reason || t('rejected.reasonFallback')}</span>
            </div>
          </div>

          <p className="text-[12.5px] text-gray-500 leading-relaxed">{t('rejected.whatNext')}</p>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <Link
              to="/schoolRegister"
              className="flex-1 text-center bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14px]"
            >
              {t('rejected.registerAgain')}
            </Link>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-[#282C34] font-bold rounded-lg py-3 text-[14px]"
            >
              <IoMailOutline /> {t('rejected.contactSupport')}
            </a>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
