import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  cscsCardQuestionBank,
  cscsCardMockExamConfig,
  getRandomCscsCardExamQuestions
} from '@/data/general-upskilling/cscsCardMockExamData';
import useSEO from '@/hooks/useSEO';

const CscsCardMockExam = () => {
  useSEO({
    title: "CSCS Card Preparation Mock Examination",
    description: "Practice CSCS HS&E test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={cscsCardMockExamConfig}
      questionBank={cscsCardQuestionBank}
      getRandomQuestions={getRandomCscsCardExamQuestions}
    />
  );
};

export default CscsCardMockExam;
