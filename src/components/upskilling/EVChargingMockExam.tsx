import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  evChargingQuestionBank,
  evChargingMockExamConfig,
  getRandomEVChargingMockExamQuestions
} from '@/data/upskilling/evChargingMockExamData';
import useSEO from '@/hooks/useSEO';

const EVChargingMockExam = () => {
  useSEO(
    "EV Charging Mock Examination - Electric Vehicle Installation",
    "Test your EV charging knowledge with 30 questions, 45-minute timer from 150 question bank covering EVSE types, electrical design, earthing, smart charging, testing and compliance"
  );

  return (
    <StandardMockExam
      config={evChargingMockExamConfig}
      questionBank={evChargingQuestionBank}
      getRandomQuestions={getRandomEVChargingMockExamQuestions}
    />
  );
};

export default EVChargingMockExam;
