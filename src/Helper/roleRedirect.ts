// Where to send a user right after login (or right after a forced password
// change) based on their role and, for SchoolManagers, their school's status.
export function getRoleDestination(
  roleName: string | undefined,
  schoolStatus: 'not_registered' | 'pending' | 'approved' | 'rejected' | undefined,
): string {
  if (roleName === 'Admin') {
    return '/superAdmin/dashboard';
  }
  if (roleName === 'AdmissionManager') {
    return '/admissionManager/dashboard';
  }
  if (roleName === 'SchoolManager') {
    if (schoolStatus === 'not_registered') {return '/schoolManager';}
    if (schoolStatus === 'pending') {return '/pending';}
    if (schoolStatus === 'approved') {return '/schoolAdmin/dashboard';}
  }
  return '/login';
}
