import { useTranslation } from 'react-i18next';
import { useGetAllSchoolsQuery } from '../../App/api/school/school';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import { IoInformationCircleOutline } from 'react-icons/io5';

export default function Analytics() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllSchoolsQuery();
  const schools = data?.data.schools ?? [];

  const approved = schools.filter((s) => s.status === 'approved').length;
  const pending = schools.filter((s) => s.status === 'pending').length;
  const rejected = schools.filter((s) => s.status === 'rejected').length;
  const approvalRate = schools.length ? Math.round((approved / schools.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <p className="text-[13.5px] text-gray-500 max-w-xl">{t('analyticsPage.intro')}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={t('analyticsPage.totalSchools')} value={isLoading ? '—' : schools.length} />
        <StatCard label={t('analyticsPage.activeSchools')} value={isLoading ? '—' : approved} />
        <StatCard label={t('analyticsPage.pendingReview')} value={isLoading ? '—' : pending} />
        <StatCard label={t('analyticsPage.approvalRate')} value={isLoading ? '—' : `${approvalRate}%`} sub={t('analyticsPage.rejectedAllTime', { count: rejected })} />
      </div>

      <Panel>
        <div className="flex gap-3 items-start">
          <IoInformationCircleOutline className="text-[#05416B] text-xl flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-gray-600 leading-relaxed">
            {t('analyticsPage.deeperAnalyticsNote')}
          </p>
        </div>
      </Panel>
    </div>
  );
}
