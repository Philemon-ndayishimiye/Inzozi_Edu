import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { MdDashboard, MdOutlineDomainVerification, MdOutlineSchool } from 'react-icons/md';
import { LuUsers } from 'react-icons/lu';
import DashboardShell from '../Components/dashboard/DashboardShell';

function getNavItems(t: TFunction) {
  return [
    { to: '/superAdmin/dashboard', label: t('dashboard.navDashboard'), icon: <MdDashboard /> },
    { to: '/superAdmin/schoolApprovals', label: t('dashboard.navSchoolApprovals'), icon: <MdOutlineDomainVerification /> },
    { to: '/superAdmin/schools', label: t('dashboard.navAllSchools'), icon: <MdOutlineSchool /> },
    { to: '/superAdmin/users', label: t('dashboard.navUsersRoles'), icon: <LuUsers /> },
  ];
}

function getTitles(t: TFunction): Record<string, string> {
  return {
    '/superAdmin/dashboard': t('dashboard.titlePlatformOverview'),
    '/superAdmin/schoolApprovals': t('dashboard.titleSchoolApprovals'),
    '/superAdmin/schools': t('dashboard.titleAllSchools'),
    '/superAdmin/ViewSchool': t('dashboard.titleReviewSchoolRegistration'),
    '/superAdmin/users': t('dashboard.titleUsersRoles'),
    '/superAdmin/analytics': t('dashboard.titleAnalytics'),
    '/superAdmin/superSettings': t('dashboard.titleSettings'),
  };
}

export const SuperAdminPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const TITLES = getTitles(t);
  const title = Object.entries(TITLES).find(([path]) => pathname.startsWith(path))?.[1] ?? t('dashboard.titlePlatformOverview');

  return (
    <DashboardShell
      roleLabel={t('dashboard.roleInzoziAdmin')}
      roleContext={t('dashboard.platformControl')}
      navItems={getNavItems(t)}
      pageCrumb="Admin"
      pageTitle={title}
    >
      <Outlet />
    </DashboardShell>
  );
};

export default SuperAdminPage;
