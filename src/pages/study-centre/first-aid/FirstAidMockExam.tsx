import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  firstAidQuestionBank,
  firstAidMockExamConfig,
  getRandomFirstAidExamQuestions,
} from '@/data/general-upskilling/firstAidMockExamData';
import useSEO from '@/hooks/useSEO';

const FirstAidMockExam = () => {
  useSEO({
    title: 'First Aid at Work Mock Examination',
    description:
      'Practice First Aid at Work knowledge test — 20 questions, 30-minute timer, from 200-question bank.',
  });

  return (
    <StandardMockExam
      config={firstAidMockExamConfig}
      questionBank={firstAidQuestionBank}
      getRandomQuestions={getRandomFirstAidExamQuestions}
    />
  );
};

export default FirstAidMockExam;
