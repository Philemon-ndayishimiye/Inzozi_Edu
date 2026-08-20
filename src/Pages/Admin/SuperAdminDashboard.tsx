import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllSchoolsQuery } from '../../App/api/school/school';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';

export default function SuperAdminDashboard() {
  const { data, isLoading } = useGetAllSchoolsQuery();
  const navigate = useNavigate();

  const schools = data?.data.schools ?? [];
  const pending = useMemo(() => schools.filter((s) => s.status === 'pending'), [data]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = schools.filter((s) => s.status === 'approved').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard label="Pending approvals" value={isLoading ? '—' : pending.length} sub="Schools awaiting review" />
        <StatCard label="Active schools" value={isLoading ? '—' : active} sub="Live on the platform" />
        <StatCard label="Total schools" value={isLoading ? '—' : schools.length} sub="Ever registered" />
      </div>

      <Panel
        title="Schools awaiting approval"
        action={
          <Link to="/superAdmin/schoolApprovals" className="text-[12px] text-[#05416B] font-bold">
            View all →
          </Link>
        }
        noBodyPadding
      >
        {pending.length === 0 ? (
          <div className="px-5 py-10 text-center text-[13px] text-gray-500">
            {isLoading ? 'Loading…' : 'No schools are waiting for approval right now.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-5 py-2.5">School</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Location</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {pending.slice(0, 5).map((school) => (
                  <tr key={school.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-5 py-3">
                      <div className="font-semibold text-[13px] text-[#282C34]">{school.schoolName}</div>
                      <div className="text-[11px] text-gray-400">{school.SchoolManager?.email ?? 'Account deleted'}</div>
                    </td>
                    <td className="px-3 py-3 text-[13px]">{school.district}</td>
                    <td className="px-3 py-3">
                      <Badge variant="pending">Pending</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => navigate(`/superAdmin/ViewSchool/${school.id}`)}
                        className="border border-gray-300 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold cursor-pointer hover:border-[#05416B] hover:text-[#05416B]"
                      >
                        Review
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
