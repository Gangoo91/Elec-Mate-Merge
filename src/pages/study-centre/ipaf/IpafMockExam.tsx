import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  ipafQuestionBank,
  ipafMockExamConfig,
  getRandomIpafExamQuestions
} from '@/data/general-upskilling/ipafMockExamData';
import useSEO from '@/hooks/useSEO';

const IpafMockExam = () => {
  useSEO({
    title: "IPAF Mock Examination",
    description:
      "Practice IPAF mobile scaffold knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={ipafMockExamConfig}
      questionBank={ipafQuestionBank}
      getRandomQuestions={getRandomIpafExamQuestions}
    />
  );
};

export default IpafMockExam;
