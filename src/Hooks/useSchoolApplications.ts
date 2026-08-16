import { useMemo } from 'react';
import { useGetPendingApplicationsQuery } from '../App/api/students/students';
import { listApplicationsForSchool } from '../Helper/applicationsStore';
import { mapStudentToApplicationRecord } from '../Helper/studentMapper';

// There's no "list all applications" endpoint on the backend — only pending
// ones. Approved/rejected history for "recently decided" is filled in from
// the local cache we write to right after a decision is made in this
// browser; it's a nice-to-have, not a source of truth.
export function useSchoolApplications(schoolId?: string) {
  const { data, isLoading, isFetching, error } = useGetPendingApplicationsQuery();

  const pending = useMemo(
    () =>
      (data?.data ?? [])
        .filter((s) => !schoolId || s.schoolId === schoolId)
        .map((s) => mapStudentToApplicationRecord(s)),
    [data, schoolId],
  );

  const decided = useMemo(() => {
    if (!schoolId) {return [];}
    const pendingIds = new Set(pending.map((p) => p.referenceCode));
    return listApplicationsForSchool(schoolId).filter(
      (a) => a.status !== 'submitted' && !pendingIds.has(a.referenceCode),
    );
  }, [schoolId, pending]);

  const applications = useMemo(
    () => [...pending, ...decided].sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1)),
    [pending, decided],
  );

  return { applications, isLoading, isFetching, error };
}
