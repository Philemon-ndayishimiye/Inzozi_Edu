import { Outlet, useLocation } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import DashboardShell from '../../Components/dashboard/DashboardShell';

const NAV_ITEMS = [{ to: '/admissionManager/dashboard', label: 'Applications', icon: <IoDocumentTextOutline /> }];

export default function AdmissionManagerPage() {
  const { pathname } = useLocation();
  const title = pathname.includes('/application/') ? 'Application review' : 'Applications to review';

  return (
    <DashboardShell
      roleLabel="Admission Manager"
      roleContext="Preview"
      navItems={NAV_ITEMS}
      pageCrumb="Admission Manager"
      pageTitle={title}
    >
      <Outlet />
    </DashboardShell>
  );
}
