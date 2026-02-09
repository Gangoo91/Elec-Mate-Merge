import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  mentalHealthQuestionBank,
  mentalHealthMockExamConfig,
  getRandomMentalHealthExamQuestions
} from '@/data/general-upskilling/mentalHealthMockExamData';
import useSEO from '@/hooks/useSEO';

const MentalHealthMockExam = () => {
  useSEO({
    title: "Mental Health First Aid Mock Examination",
    description:
      "Practice Mental Health First Aid knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={mentalHealthMockExamConfig}
      questionBank={mentalHealthQuestionBank}
      getRandomQuestions={getRandomMentalHealthExamQuestions}
    />
  );
};

export default MentalHealthMockExam;
