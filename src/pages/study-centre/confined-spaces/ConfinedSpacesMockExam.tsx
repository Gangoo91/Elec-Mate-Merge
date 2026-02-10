import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  confinedSpacesQuestionBank,
  confinedSpacesMockExamConfig,
  getRandomConfinedSpacesExamQuestions
} from '@/data/general-upskilling/confinedSpacesMockExamData';
import useSEO from '@/hooks/useSEO';

const ConfinedSpacesMockExam = () => {
  useSEO({
    title: "Confined Spaces Awareness Mock Examination",
    description:
      "Practice confined spaces awareness knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={confinedSpacesMockExamConfig}
      questionBank={confinedSpacesQuestionBank}
      getRandomQuestions={getRandomConfinedSpacesExamQuestions}
    />
  );
};

export default ConfinedSpacesMockExam;
