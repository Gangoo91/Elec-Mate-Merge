import { useNavigate } from 'react-router-dom';
import LearningHub from '@/components/LearningHub';

/**
 * Apprentice Inspection & Testing Hub Page
 *
 * Wraps the main Inspection & Testing Hub component with apprentice-appropriate navigation.
 * Provides the same comprehensive testing and inspection content but returns
 * users to the Apprentice Hub when they click "Back".
 */
const InspectionTestingHubPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/apprentice');
  };

  return <LearningHub onBack={handleBack} />;
};

export default InspectionTestingHubPage;
