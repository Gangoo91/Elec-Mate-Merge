import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  bmsStandardQuestionBank,
  bmsMockExamConfig,
  getRandomBMSMockExamQuestions
} from '@/data/upskilling/bmsMockExamData';
import useSEO from '@/hooks/useSEO';

const BMSMockExam = () => {
  useSEO(
    "Building Management Systems Mock Examination - BMS Controls",
    "Test your BMS knowledge with 30 questions, 45-minute timer covering HVAC integration, lighting control, communication protocols, commissioning and system management"
  );

  return (
    <StandardMockExam
      config={bmsMockExamConfig}
      questionBank={bmsStandardQuestionBank}
      getRandomQuestions={getRandomBMSMockExamQuestions}
    />
  );
};

export default BMSMockExam;
