import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  tmoQuestionBank,
  tmoMockExamConfig,
  getRandomTMOExamQuestions,
} from '@/data/general-upskilling/timeManagementOrganisationMockExamData';
import useSEO from '@/hooks/useSEO';

const TMOMockExam = () => {
  useSEO({
    title: 'Time Management & Organisation Mock Examination',
    description:
      'Practice time management and organisation knowledge test — 20 questions, 30-minute timer, from 200-question bank covering all 5 modules.',
  });

  return (
    <StandardMockExam
      config={tmoMockExamConfig}
      questionBank={tmoQuestionBank}
      getRandomQuestions={getRandomTMOExamQuestions}
    />
  );
};

export default TMOMockExam;
