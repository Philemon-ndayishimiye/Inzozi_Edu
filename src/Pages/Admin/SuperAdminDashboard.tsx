import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetAllSchoolsQuery } from '../../App/api/school/school';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';

export default function SuperAdminDashboard() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllSchoolsQuery();
  const navigate = useNavigate();

  const schools = data?.data.schools ?? [];
  const pending = useMemo(() => schools.filter((s) => s.status === 'pending'), [data]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = schools.filter((s) => s.status === 'approved').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard label={t('superAdminDashboard.pendingApprovals')} value={isLoading ? '—' : pending.length} sub={t('superAdminDashboard.schoolsAwaitingReview')} />
        <StatCard label={t('superAdminDashboard.activeSchools')} value={isLoading ? '—' : active} sub={t('superAdminDashboard.liveOnPlatform')} />
        <StatCard label={t('superAdminDashboard.totalSchools')} value={isLoading ? '—' : schools.length} sub={t('superAdminDashboard.everRegistered')} />
      </div>

      <Panel
        title={t('superAdminDashboard.schoolsAwaitingApproval')}
        action={
          <Link to="/superAdmin/schoolApprovals" className="text-[12px] text-[#05416B] font-bold">
            {t('table.viewAll')}
          </Link>
        }
        noBodyPadding
      >
        {pending.length === 0 ? (
          <div className="px-5 py-10 text-center text-[13px] text-gray-500">
            {isLoading ? t('table.loading') : t('superAdminDashboard.noSchoolsWaiting')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-5 py-2.5">{t('superAdminDashboard.school')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('superAdminDashboard.location')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('table.status')}</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {pending.slice(0, 5).map((school) => (
                  <tr key={school.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-5 py-3">
                      <div className="font-semibold text-[13px] text-[#282C34]">{school.schoolName}</div>
                      <div className="text-[11px] text-gray-400">{school.SchoolManager?.email ?? t('superAdminDashboard.accountDeleted')}</div>
                    </td>
                    <td className="px-3 py-3 text-[13px]">{school.district}</td>
                    <td className="px-3 py-3">
                      <Badge variant="pending">{t('status.pending')}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => navigate(`/superAdmin/ViewSchool/${school.id}`)}
                        className="border border-gray-300 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold cursor-pointer hover:border-[#05416B] hover:text-[#05416B]"
                      >
                        {t('superAdminDashboard.review')}
                      </button>
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
