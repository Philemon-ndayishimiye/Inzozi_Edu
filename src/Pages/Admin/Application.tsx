import { useTranslation } from 'react-i18next';
import { useUser } from '../../Hooks/useUser';
import { useSchoolApplications } from '../../Hooks/useSchoolApplications';
import ApplicationsTable from '../../Components/dashboard/ApplicationsTable';

export default function Application() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { applications, isLoading } = useSchoolApplications(user?.schoolId);

  return (
    <div className="space-y-4">
      <p className="text-[13.5px] text-gray-500 max-w-xl">
        {t('applicationsPage.schoolManagerIntro')}
      </p>
      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-xl py-14 text-center text-[13.5px] text-gray-500">
          {t('applicationsPage.loadingApplications')}
        </div>
      ) : (
        <ApplicationsTable
          applications={applications}
          detailBasePath="/schoolAdmin/studentInfo"
          emptyMessage={t('applicationsPage.schoolManagerEmpty')}
        />
      )}
    </div>
  );
}
