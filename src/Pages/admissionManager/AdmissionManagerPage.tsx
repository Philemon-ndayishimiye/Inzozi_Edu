import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineEventSeat } from 'react-icons/md';
import DashboardShell from '../../Components/dashboard/DashboardShell';

export default function AdmissionManagerPage() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const NAV_ITEMS = [
    { to: '/admissionManager/dashboard', label: t('dashboard.navApplications'), icon: <IoDocumentTextOutline /> },
    { to: '/admissionManager/seats', label: t('dashboard.navClassesSpots'), icon: <MdOutlineEventSeat /> },
  ];

  const TITLES: Record<string, string> = {
    '/admissionManager/seats': t('dashboard.navClassesSpots'),
    '/admissionManager/addSeats': t('dashboard.titleAddClass'),
  };

  const title = pathname.includes('/application/')
    ? t('dashboard.titleApplicationReview')
    : (TITLES[pathname] ?? t('dashboard.titleApplicationsToReview'));

  return (
    <DashboardShell
      roleLabel={t('dashboard.roleAdmissionManager')}
      roleContext={t('dashboard.preview')}
      navItems={NAV_ITEMS}
      pageCrumb={t('dashboard.roleAdmissionManager')}
      pageTitle={title}
    >
      <Outlet />
    </DashboardShell>
  );
}
