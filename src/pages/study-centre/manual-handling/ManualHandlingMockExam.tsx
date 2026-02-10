import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  manualHandlingQuestionBank,
  manualHandlingMockExamConfig,
  getRandomManualHandlingExamQuestions
} from '@/data/general-upskilling/manualHandlingMockExamData';
import useSEO from '@/hooks/useSEO';

const ManualHandlingMockExam = () => {
  useSEO({
    title: "Manual Handling Mock Examination",
    description: "Practice manual handling knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={manualHandlingMockExamConfig}
      questionBank={manualHandlingQuestionBank}
      getRandomQuestions={getRandomManualHandlingExamQuestions}
    />
  );
};

export default ManualHandlingMockExam;
