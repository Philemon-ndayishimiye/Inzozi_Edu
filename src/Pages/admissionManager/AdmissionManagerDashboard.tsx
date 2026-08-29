import { useTranslation } from 'react-i18next';
import { useUser } from '../../Hooks/useUser';
import { useSchoolApplications } from '../../Hooks/useSchoolApplications';
import ApplicationsTable from '../../Components/dashboard/ApplicationsTable';
import StatCard from '../../Components/dashboard/StatCard';

export default function AdmissionManagerDashboard() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { applications, isLoading } = useSchoolApplications(user?.schoolId);

  const pending = applications.filter((a) => a.status === 'submitted').length;
  const approved = applications.filter((a) => a.status === 'approved').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard label={t('applicationsPage.admissionManagerPendingReview')} value={pending} sub={t('applicationsPage.needsDecision')} />
        <StatCard label={t('applicationsPage.approvedThisBrowser')} value={approved} sub={t('applicationsPage.recentlyDecided')} />
        <StatCard label={t('applicationsPage.rejectedThisBrowser')} value={rejected} sub={t('applicationsPage.recentlyDecided')} />
      </div>

      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-xl py-14 text-center text-[13.5px] text-gray-500">
          {t('applicationsPage.loadingApplications')}
        </div>
      ) : (
        <ApplicationsTable
          applications={applications}
          detailBasePath="/admissionManager/application"
          emptyMessage={t('applicationsPage.admissionManagerEmpty')}
        />
      )}
    </div>
  );
}
