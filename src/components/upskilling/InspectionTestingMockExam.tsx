import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  inspectionTestingQuestionBank,
  inspectionTestingMockExamConfig,
  getRandomInspectionTestingMockExamQuestions
} from '@/data/upskilling/inspectionTestingMockExamData';
import useSEO from '@/hooks/useSEO';

const InspectionTestingMockExam = () => {
  useSEO(
    "Inspection & Testing Mock Examination - BS7671 Compliance",
    "Test your inspection and testing knowledge with 30 questions, 45-minute timer from 100 question bank covering safe isolation, continuity, insulation resistance, earth fault loop impedance and RCD testing"
  );

  return (
    <StandardMockExam
      config={inspectionTestingMockExamConfig}
      questionBank={inspectionTestingQuestionBank}
      getRandomQuestions={getRandomInspectionTestingMockExamQuestions}
    />
  );
};

export default InspectionTestingMockExam;
