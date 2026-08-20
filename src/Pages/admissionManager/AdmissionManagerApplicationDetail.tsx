import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApplicationDetailView from '../../Components/dashboard/ApplicationDetailView';

export default function AdmissionManagerApplicationDetail() {
  const { t } = useTranslation();
  const { ref } = useParams();
  const navigate = useNavigate();

  if (!ref) {
    navigate('/admissionManager/dashboard');
    return null;
  }

  return <ApplicationDetailView referenceCode={ref} backTo="/admissionManager/dashboard" backLabel={t('applicationsPage.backToApplications')} />;
}
