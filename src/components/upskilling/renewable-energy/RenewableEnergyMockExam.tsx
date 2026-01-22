import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  renewableEnergyQuestionBank,
  renewableEnergyMockExamConfig,
  getRandomRenewableEnergyMockExamQuestions
} from '@/data/upskilling/renewableEnergyMockExamData';
import useSEO from '@/hooks/useSEO';

const RenewableEnergyMockExam = () => {
  useSEO(
    "Renewable Energy Mock Examination - Solar PV & Battery Storage",
    "Test your renewable energy knowledge with 30 questions, 45-minute timer from 200 question bank covering solar PV, battery storage, grid connection, testing and compliance"
  );

  return (
    <StandardMockExam
      config={renewableEnergyMockExamConfig}
      questionBank={renewableEnergyQuestionBank}
      getRandomQuestions={getRandomRenewableEnergyMockExamQuestions}
    />
  );
};

export default RenewableEnergyMockExam;
