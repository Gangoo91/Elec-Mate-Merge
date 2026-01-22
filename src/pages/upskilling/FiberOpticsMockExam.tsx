import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  fiberOpticsQuestionBank,
  fiberOpticsMockExamConfig,
  getRandomFiberOpticsMockExamQuestions
} from '@/data/upskilling/fiberOpticsMockExamData';
import useSEO from '@/hooks/useSEO';

const FiberOpticsMockExam = () => {
  useSEO(
    "Fibre Optics Technology Mock Examination - Optical Communications",
    "Test your fibre optics knowledge with 30 questions, 45-minute timer from 100 question bank covering light transmission, fibre types, splicing, OTDR testing and fault finding"
  );

  return (
    <StandardMockExam
      config={fiberOpticsMockExamConfig}
      questionBank={fiberOpticsQuestionBank}
      getRandomQuestions={getRandomFiberOpticsMockExamQuestions}
    />
  );
};

export default FiberOpticsMockExam;
