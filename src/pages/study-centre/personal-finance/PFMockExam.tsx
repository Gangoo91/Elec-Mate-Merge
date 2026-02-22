import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  pfQuestionBank,
  pfMockExamConfig,
  getRandomPFExamQuestions,
} from '@/data/general-upskilling/personalFinanceMockExamData';
import useSEO from '@/hooks/useSEO';

const PFMockExam = () => {
  useSEO({
    title: 'Personal Finance & Financial Wellbeing Mock Examination',
    description:
      'Practice personal finance knowledge test — 20 questions, 30-minute timer, from 200-question bank covering all 5 modules.',
  });

  return (
    <StandardMockExam
      config={pfMockExamConfig}
      questionBank={pfQuestionBank}
      getRandomQuestions={getRandomPFExamQuestions}
    />
  );
};

export default PFMockExam;
