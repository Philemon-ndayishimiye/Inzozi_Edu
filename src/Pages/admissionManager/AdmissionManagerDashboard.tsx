import { useUser } from '../../Hooks/useUser';
import { useSchoolApplications } from '../../Hooks/useSchoolApplications';
import ApplicationsTable from '../../Components/dashboard/ApplicationsTable';
import StatCard from '../../Components/dashboard/StatCard';

export default function AdmissionManagerDashboard() {
  const { user } = useUser();
  const { applications, isLoading } = useSchoolApplications(user?.schoolId);

  const pending = applications.filter((a) => a.status === 'submitted').length;
  const approved = applications.filter((a) => a.status === 'approved').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard label="Pending review" value={pending} sub="Needs a decision" />
        <StatCard label="Approved (this browser)" value={approved} sub="Recently decided" />
        <StatCard label="Rejected (this browser)" value={rejected} sub="Recently decided" />
      </div>

      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-xl py-14 text-center text-[13.5px] text-gray-500">
          Loading applications…
        </div>
      ) : (
        <ApplicationsTable
          applications={applications}
          detailBasePath="/admissionManager/application"
          emptyMessage="No applications yet."
        />
      )}
    </div>
  );
}
