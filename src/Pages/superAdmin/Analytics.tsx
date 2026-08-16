import { useGetAllSchoolsQuery } from '../../App/api/school/school';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import { IoInformationCircleOutline } from 'react-icons/io5';

export default function Analytics() {
  const { data, isLoading } = useGetAllSchoolsQuery();
  const schools = data?.data.schools ?? [];

  const approved = schools.filter((s) => s.status === 'approved').length;
  const pending = schools.filter((s) => s.status === 'pending').length;
  const rejected = schools.filter((s) => s.status === 'rejected').length;
  const approvalRate = schools.length ? Math.round((approved / schools.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <p className="text-[13.5px] text-gray-500 max-w-xl">Platform-wide numbers derived from your registered schools.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total schools" value={isLoading ? '—' : schools.length} />
        <StatCard label="Active schools" value={isLoading ? '—' : approved} />
        <StatCard label="Pending review" value={isLoading ? '—' : pending} />
        <StatCard label="Approval rate" value={isLoading ? '—' : `${approvalRate}%`} sub={`${rejected} rejected all-time`} />
      </div>

      <Panel>
        <div className="flex gap-3 items-start">
          <IoInformationCircleOutline className="text-[#05416B] text-xl flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-gray-600 leading-relaxed">
            Deeper analytics — application volume over time, seat utilization, traffic — need application and
            visit-tracking endpoints that don&apos;t exist on the backend yet. Once those ship, this page can chart
            real trends instead of estimates.
          </p>
        </div>
      </Panel>
    </div>
  );
}
