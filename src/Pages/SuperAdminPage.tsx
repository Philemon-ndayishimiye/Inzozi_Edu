import { Outlet, useLocation } from 'react-router-dom';
import { MdDashboard, MdOutlineDomainVerification, MdOutlineSchool } from 'react-icons/md';
import { LuUsers } from 'react-icons/lu';
import DashboardShell from '../Components/dashboard/DashboardShell';

const NAV_ITEMS = [
  { to: '/superAdmin/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { to: '/superAdmin/schoolApprovals', label: 'School Approvals', icon: <MdOutlineDomainVerification /> },
  { to: '/superAdmin/schools', label: 'All Schools', icon: <MdOutlineSchool /> },
  { to: '/superAdmin/users', label: 'Users & Roles', icon: <LuUsers /> },
];

const TITLES: Record<string, string> = {
  '/superAdmin/dashboard': 'Platform overview',
  '/superAdmin/schoolApprovals': 'School approvals',
  '/superAdmin/schools': 'All schools',
  '/superAdmin/ViewSchool': 'Review school registration',
  '/superAdmin/users': 'Users & roles',
  '/superAdmin/analytics': 'Analytics',
  '/superAdmin/superSettings': 'Settings',
};

export const SuperAdminPage = () => {
  const { pathname } = useLocation();
  const title = Object.entries(TITLES).find(([path]) => pathname.startsWith(path))?.[1] ?? 'Platform overview';

  return (
    <DashboardShell
      roleLabel="Inzozi Admin"
      roleContext="Platform control"
      navItems={NAV_ITEMS}
      pageCrumb="Admin"
      pageTitle={title}
    >
      <Outlet />
    </DashboardShell>
  );
};

export default SuperAdminPage;
