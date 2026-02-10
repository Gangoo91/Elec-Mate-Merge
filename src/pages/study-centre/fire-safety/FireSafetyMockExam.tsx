import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  fireSafetyQuestionBank,
  fireSafetyMockExamConfig,
  getRandomFireSafetyExamQuestions
} from '@/data/general-upskilling/fireSafetyMockExamData';
import useSEO from '@/hooks/useSEO';

const FireSafetyMockExam = () => {
  useSEO({
    title: "Fire Safety & Fire Marshal Mock Examination",
    description:
      "Practice fire safety and fire marshal knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={fireSafetyMockExamConfig}
      questionBank={fireSafetyQuestionBank}
      getRandomQuestions={getRandomFireSafetyExamQuestions}
    />
  );
};

export default FireSafetyMockExam;
