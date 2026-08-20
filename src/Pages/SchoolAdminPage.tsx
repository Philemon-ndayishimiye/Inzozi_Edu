import { Outlet, useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useTranslation } from 'react-i18next';
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
import type { TFunction } from 'i18next';

function getNavItems(t: TFunction) {
  return [
    { to: '/schoolAdmin/dashboard', label: t('dashboard.navDashboard'), icon: <MdDashboard /> },
    { to: '/schoolAdmin/application', label: t('dashboard.navApplications'), icon: <IoDocumentTextOutline /> },
    { to: '/schoolAdmin/schoolProfile', label: t('dashboard.navSchoolProfile'), icon: <IoPersonOutline /> },
    { to: '/schoolAdmin/admissionManager', label: t('dashboard.navAdmissionManager'), icon: <IoPeopleOutline /> },
    { to: '/schoolAdmin/seats', label: t('dashboard.navClassesSpots'), icon: <MdOutlineEventSeat /> },
    { to: '/schoolAdmin/gallery', label: t('dashboard.navFacilities'), icon: <MdOutlinePhotoLibrary /> },
    { to: '/schoolAdmin/settings', label: t('dashboard.navSettings'), icon: <MdOutlineSettings /> },
  ];
}

function getTitles(t: TFunction): Record<string, string> {
  return {
    '/schoolAdmin/dashboard': t('dashboard.navDashboard'),
    '/schoolAdmin/application': t('dashboard.navApplications'),
    '/schoolAdmin/schoolProfile': t('dashboard.navSchoolProfile'),
    '/schoolAdmin/admissionManager': t('dashboard.navAdmissionManager'),
    '/schoolAdmin/seats': t('dashboard.navClassesSpots'),
    '/schoolAdmin/gallery': t('dashboard.navFacilities'),
    '/schoolAdmin/settings': t('dashboard.navSettings'),
  };
}

export const SchoolAdminPage = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { data } = useGetSchoolDetailsQuery(user?.schoolId ?? skipToken);
  const { pathname } = useLocation();

  const TITLES = getTitles(t);
  const title =
    Object.entries(TITLES).find(([path]) => pathname.startsWith(path))?.[1] ?? t('dashboard.navDashboard');

  return (
    <DashboardShell
      roleLabel={t('dashboard.roleSchoolManager')}
      roleContext={data?.data.schoolName}
      navItems={getNavItems(t)}
      pageCrumb={t('dashboard.roleSchoolManager')}
      pageTitle={title}
    >
      <Outlet />
    </DashboardShell>
  );
};

export default SchoolAdminPage;
