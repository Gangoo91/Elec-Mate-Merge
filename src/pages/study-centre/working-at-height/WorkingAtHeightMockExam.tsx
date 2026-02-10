import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  workingAtHeightQuestionBank,
  workingAtHeightMockExamConfig,
  getRandomWorkingAtHeightExamQuestions
} from '@/data/general-upskilling/workingAtHeightMockExamData';
import useSEO from '@/hooks/useSEO';

const WorkingAtHeightMockExam = () => {
  useSEO({
    title: "Working at Height Mock Examination",
    description:
      "Practice working at height knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={workingAtHeightMockExamConfig}
      questionBank={workingAtHeightQuestionBank}
      getRandomQuestions={getRandomWorkingAtHeightExamQuestions}
    />
  );
};

export default WorkingAtHeightMockExam;
