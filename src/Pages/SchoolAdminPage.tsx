import { Outlet, useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  MdDashboard,
  MdOutlineEventSeat,
  MdOutlinePhotoLibrary,
  MdOutlineSettings,
} from 'react-icons/md';
import { IoDocumentTextOutline, IoPersonOutline, IoPeopleOutline } from 'react-icons/io5';
import DashboardShell from '../Components/dashboard/DashboardShell';
import { useUser } from '../Hooks/useUser';
import { useGetSchoolDetailsQuery } from '../App/api/school/school';

const NAV_ITEMS = [
  { to: '/schoolAdmin/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { to: '/schoolAdmin/application', label: 'Applications', icon: <IoDocumentTextOutline /> },
  { to: '/schoolAdmin/schoolProfile', label: 'School Profile', icon: <IoPersonOutline /> },
  { to: '/schoolAdmin/admissionManager', label: 'Admission Manager', icon: <IoPeopleOutline /> },
  { to: '/schoolAdmin/seats', label: 'Classes & Spots', icon: <MdOutlineEventSeat /> },
  { to: '/schoolAdmin/gallery', label: 'Facilities', icon: <MdOutlinePhotoLibrary /> },
  { to: '/schoolAdmin/settings', label: 'Settings', icon: <MdOutlineSettings /> },
];

const TITLES: Record<string, string> = {
  '/schoolAdmin/dashboard': 'Dashboard',
  '/schoolAdmin/application': 'Applications',
  '/schoolAdmin/schoolProfile': 'School Profile',
  '/schoolAdmin/admissionManager': 'Admission Manager',
  '/schoolAdmin/seats': 'Classes & Spots',
  '/schoolAdmin/gallery': 'Facilities',
  '/schoolAdmin/settings': 'Settings',
};

export const SchoolAdminPage = () => {
  const { user } = useUser();
  const { data } = useGetSchoolDetailsQuery(user?.schoolId ?? skipToken);
  const { pathname } = useLocation();

  const title =
    Object.entries(TITLES).find(([path]) => pathname.startsWith(path))?.[1] ?? 'Dashboard';

  return (
    <DashboardShell
      roleLabel="School Manager"
      roleContext={data?.data.schoolName}
      navItems={NAV_ITEMS}
      pageCrumb="School Manager"
      pageTitle={title}
    >
      <Outlet />
    </DashboardShell>
  );
};

export default SchoolAdminPage;
