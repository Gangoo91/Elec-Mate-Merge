import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  coshhQuestionBank,
  coshhMockExamConfig,
  getRandomCoshhExamQuestions
} from '@/data/general-upskilling/coshhMockExamData';
import useSEO from '@/hooks/useSEO';

const CoshhAwarenessMockExam = () => {
  useSEO({
    title: "COSHH Awareness Mock Examination",
    description:
      "Practice COSHH awareness knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={coshhMockExamConfig}
      questionBank={coshhQuestionBank}
      getRandomQuestions={getRandomCoshhExamQuestions}
    />
  );
};

export default CoshhAwarenessMockExam;
