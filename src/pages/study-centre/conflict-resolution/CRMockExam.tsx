import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  crQuestionBank,
  crMockExamConfig,
  getRandomCRExamQuestions,
} from '@/data/general-upskilling/conflictResolutionMockExamData';
import useSEO from '@/hooks/useSEO';

const CRMockExam = () => {
  useSEO({
    title: 'Conflict Resolution & Difficult Conversations Mock Examination',
    description:
      'Practice conflict resolution knowledge test — 20 questions, 30-minute timer, from 200-question bank covering all 5 modules.',
  });

  return (
    <StandardMockExam
      config={crMockExamConfig}
      questionBank={crQuestionBank}
      getRandomQuestions={getRandomCRExamQuestions}
    />
  );
};

export default CRMockExam;
