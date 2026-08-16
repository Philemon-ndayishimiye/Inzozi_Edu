import { useNavigate, useParams } from 'react-router-dom';
import ApplicationDetailView from '../../Components/dashboard/ApplicationDetailView';

export default function StudentInfo() {
  const { ref } = useParams();
  const navigate = useNavigate();

  if (!ref) {
    navigate('/schoolAdmin/application');
    return null;
  }

  return <ApplicationDetailView referenceCode={ref} backTo="/schoolAdmin/application" backLabel="Back to applications" />;
}
