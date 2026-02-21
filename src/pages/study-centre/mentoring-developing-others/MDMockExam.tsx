import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  mdQuestionBank,
  mdMockExamConfig,
  getRandomMDExamQuestions,
} from '@/data/general-upskilling/mentoringDevelopingOthersMockExamData';
import useSEO from '@/hooks/useSEO';

const MDMockExam = () => {
  useSEO({
    title: 'Mentoring & Developing Others Mock Examination',
    description:
      'Practice mentoring knowledge test \u2014 20 questions, 30-minute timer, from 200-question bank.',
  });

  return (
    <StandardMockExam
      config={mdMockExamConfig}
      questionBank={mdQuestionBank}
      getRandomQuestions={getRandomMDExamQuestions}
    />
  );
};

export default MDMockExam;
