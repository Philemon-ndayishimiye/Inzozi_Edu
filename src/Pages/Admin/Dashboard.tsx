import { Link } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../Hooks/useUser';
import { useGetAllSpotsQuery } from '../../App/api/spots/spot';
import { useGetUsersQuery } from '../../App/api/users/users';
import { useSchoolApplications } from '../../Hooks/useSchoolApplications';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { data: spotsData } = useGetAllSpotsQuery(user?.schoolId ?? skipToken);
  const { data: usersData } = useGetUsersQuery();
  const { applications, isLoading: applicationsLoading } = useSchoolApplications(user?.schoolId);

  const spots = spotsData?.data.spots ?? [];
  const openSpots = spots.filter((s) => Number(s.totalSpots) - Number(s.occupiedSpots ?? 0) > 0).length;

  const thisMonth = new Date().toISOString().slice(0, 7);
  const applicationsThisMonth = applications.filter((a) => a.submittedAt.startsWith(thisMonth)).length;
  const pendingReview = applications.filter((a) => a.status === 'submitted').length;

  const admissionManagers = (usersData?.data ?? []).filter((u) => u.role?.name === 'AdmissionManager');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={t('schoolManagerDashboard.openClasses')} value={`${openSpots} / ${spots.length}`} sub={t('schoolManagerDashboard.spotsOpen')} />
        <StatCard label={t('schoolManagerDashboard.applicationsThisMonth')} value={applicationsThisMonth} sub={t('schoolManagerDashboard.submittedViaInzozi')} />
        <StatCard label={t('schoolManagerDashboard.pendingReview')} value={pendingReview} sub={t('schoolManagerDashboard.awaitingDecision')} />
        <StatCard
          label={t('schoolManagerDashboard.admissionManager')}
          value={admissionManagers[0] ? admissionManagers[0].email : t('schoolManagerDashboard.notAssigned')}
          sub={admissionManagers[0] ? t('schoolManagerDashboard.reviewingApplications') : t('schoolManagerDashboard.youAreReviewing')}
        />
      </div>

      <Panel
        title={t('schoolManagerDashboard.recentApplications')}
        action={
          <Link to="/schoolAdmin/application" className="text-[12px] text-[#05416B] font-bold">
            {t('table.viewAll')}
          </Link>
        }
        noBodyPadding
      >
        {applicationsLoading ? (
          <div className="px-5 py-10 text-center text-[13px] text-gray-500">{t('table.loading')}</div>
        ) : applications.length === 0 ? (
          <div className="px-5 py-10 text-center text-[13px] text-gray-500">
            {t('schoolManagerDashboard.noApplicationsYet')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-5 py-2.5">{t('table.student')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('table.class')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('table.submitted')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map((app) => (
                  <tr key={app.referenceCode} className="border-b border-gray-100 last:border-0">
                    <td className="px-5 py-3">
                      <div className="font-semibold text-[13px] text-[#282C34]">{app.studentName}</div>
                      <div className="text-[11px] text-gray-400">{app.guardianEmail}</div>
                    </td>
                    <td className="px-3 py-3 text-[13px]">{app.level ?? '—'}</td>
                    <td className="px-3 py-3 font-mono text-[12px] text-gray-500">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant={app.status === 'submitted' ? 'pending' : app.status}>
                        {app.status === 'submitted' ? t('status.pending') : app.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
