import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  emergencyLightingQuestionBank,
  emergencyLightingMockExamConfig,
  getRandomEmergencyLightingMockExamQuestions
} from '@/data/upskilling/emergencyLightingMockExamData';
import useSEO from '@/hooks/useSEO';

const EmergencyLightingMockExam = () => {
  useSEO(
    "Emergency Lighting Mock Examination - BS 5266-1 Compliance",
    "Test your emergency lighting knowledge with 30 questions, 45-minute timer from 300 question bank covering design, installation, testing, maintenance and regulatory requirements"
  );

  return (
    <StandardMockExam
      config={emergencyLightingMockExamConfig}
      questionBank={emergencyLightingQuestionBank}
      getRandomQuestions={getRandomEmergencyLightingMockExamQuestions}
    />
  );
};

export default EmergencyLightingMockExam;
