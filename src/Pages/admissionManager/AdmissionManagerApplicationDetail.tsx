import { useNavigate, useParams } from 'react-router-dom';
import ApplicationDetailView from '../../Components/dashboard/ApplicationDetailView';

export default function AdmissionManagerApplicationDetail() {
  const { ref } = useParams();
  const navigate = useNavigate();

  if (!ref) {
    navigate('/admissionManager/dashboard');
    return null;
  }

  return <ApplicationDetailView referenceCode={ref} backTo="/admissionManager/dashboard" backLabel="Back to applications" />;
}
