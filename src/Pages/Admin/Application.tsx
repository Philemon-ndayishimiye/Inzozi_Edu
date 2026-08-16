import { useUser } from '../../Hooks/useUser';
import { useSchoolApplications } from '../../Hooks/useSchoolApplications';
import ApplicationsTable from '../../Components/dashboard/ApplicationsTable';

export default function Application() {
  const { user } = useUser();
  const { applications, isLoading } = useSchoolApplications(user?.schoolId);

  return (
    <div className="space-y-4">
      <p className="text-[13.5px] text-gray-500 max-w-xl">
        Applications submitted by parents through Inzozi for your school.
      </p>
      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-xl py-14 text-center text-[13.5px] text-gray-500">
          Loading applications…
        </div>
      ) : (
        <ApplicationsTable
          applications={applications}
          detailBasePath="/schoolAdmin/studentInfo"
          emptyMessage="No applications yet. Applications submitted for your open classes will appear here."
        />
      )}
    </div>
  );
}
