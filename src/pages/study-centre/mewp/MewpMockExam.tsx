import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  mewpQuestionBank,
  mewpMockExamConfig,
  getRandomMewpExamQuestions,
} from '@/data/general-upskilling/mewpMockExamData';
import useSEO from '@/hooks/useSEO';

const MewpMockExam = () => {
  useSEO({
    title: 'MEWP Mock Examination',
    description:
      'Practice MEWP operator knowledge test — 20 questions, 30-minute timer, from 200-question bank.',
  });

  return (
    <StandardMockExam
      config={mewpMockExamConfig}
      questionBank={mewpQuestionBank}
      getRandomQuestions={getRandomMewpExamQuestions}
    />
  );
};

export default MewpMockExam;
