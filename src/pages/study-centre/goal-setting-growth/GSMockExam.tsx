import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  gsQuestionBank,
  gsMockExamConfig,
  getRandomGSExamQuestions,
} from '@/data/general-upskilling/goalSettingGrowthMockExamData';
import useSEO from '@/hooks/useSEO';

const GSMockExam = () => {
  useSEO({
    title: 'Goal Setting & Continuous Growth Mock Examination',
    description:
      'Practice goal setting and continuous growth knowledge test — 20 questions, 30-minute timer, from 200-question bank covering all 5 modules.',
  });

  return (
    <StandardMockExam
      config={gsMockExamConfig}
      questionBank={gsQuestionBank}
      getRandomQuestions={getRandomGSExamQuestions}
    />
  );
};

export default GSMockExam;
