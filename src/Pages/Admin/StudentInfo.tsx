import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApplicationDetailView from '../../Components/dashboard/ApplicationDetailView';

export default function StudentInfo() {
  const { t } = useTranslation();
  const { ref } = useParams();
  const navigate = useNavigate();

  if (!ref) {
    navigate('/schoolAdmin/application');
    return null;
  }

  return <ApplicationDetailView referenceCode={ref} backTo="/schoolAdmin/application" backLabel={t('applicationsPage.backToApplications')} />;
}
