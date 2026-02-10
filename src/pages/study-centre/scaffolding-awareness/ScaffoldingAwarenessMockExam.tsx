import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  scaffoldingAwarenessQuestionBank,
  scaffoldingAwarenessMockExamConfig,
  getRandomScaffoldingAwarenessExamQuestions
} from '@/data/general-upskilling/scaffoldingAwarenessMockExamData';
import useSEO from '@/hooks/useSEO';

const ScaffoldingAwarenessMockExam = () => {
  useSEO({
    title: "Scaffolding Awareness Mock Examination",
    description: "Practice scaffolding awareness knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });
  return (
    <StandardMockExam
      config={scaffoldingAwarenessMockExamConfig}
      questionBank={scaffoldingAwarenessQuestionBank}
      getRandomQuestions={getRandomScaffoldingAwarenessExamQuestions}
    />
  );
};
export default ScaffoldingAwarenessMockExam;
