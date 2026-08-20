import { Outlet, useLocation } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineEventSeat } from 'react-icons/md';
import DashboardShell from '../../Components/dashboard/DashboardShell';

const NAV_ITEMS = [
  { to: '/admissionManager/dashboard', label: 'Applications', icon: <IoDocumentTextOutline /> },
  { to: '/admissionManager/seats', label: 'Classes & Spots', icon: <MdOutlineEventSeat /> },
];

const TITLES: Record<string, string> = {
  '/admissionManager/seats': 'Classes & Spots',
  '/admissionManager/addSeats': 'Add a class',
};

export default function AdmissionManagerPage() {
  const { pathname } = useLocation();
  const title = pathname.includes('/application/')
    ? 'Application review'
    : (TITLES[pathname] ?? 'Applications to review');

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
