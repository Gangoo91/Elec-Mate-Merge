import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  rsmQuestionBank,
  rsmMockExamConfig,
  getRandomRSMExamQuestions,
} from '@/data/general-upskilling/resilienceStressManagementMockExamData';
import useSEO from '@/hooks/useSEO';

const RSMMockExam = () => {
  useSEO({
    title: 'Resilience & Stress Management Mock Examination',
    description:
      'Practice resilience and stress management knowledge test — 20 questions, 30-minute timer, from 200-question bank covering all 5 modules.',
  });

  return (
    <StandardMockExam
      config={rsmMockExamConfig}
      questionBank={rsmQuestionBank}
      getRandomQuestions={getRandomRSMExamQuestions}
    />
  );
};

export default RSMMockExam;
