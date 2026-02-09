import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  asbestosQuestionBank,
  asbestosMockExamConfig,
  getRandomAsbestosExamQuestions
} from '@/data/general-upskilling/asbestosMockExamData';
import useSEO from '@/hooks/useSEO';

const AsbestosMockExam = () => {
  useSEO({
    title: "Asbestos Awareness Mock Examination",
    description:
      "Practice asbestos awareness knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={asbestosMockExamConfig}
      questionBank={asbestosQuestionBank}
      getRandomQuestions={getRandomAsbestosExamQuestions}
    />
  );
};

export default AsbestosMockExam;
