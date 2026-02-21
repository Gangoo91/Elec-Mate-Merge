import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  communicationConfidenceQuestionBank,
  communicationConfidenceMockExamConfig,
  getRandomCCExamQuestions,
} from '@/data/general-upskilling/communicationConfidenceMockExamData';
import useSEO from '@/hooks/useSEO';

const CCMockExam = () => {
  useSEO({
    title: 'Communication & Confidence Mock Examination',
    description:
      'Practise Communication & Confidence knowledge test — 20 questions, 30-minute timer, from 200-question bank.',
  });

  return (
    <StandardMockExam
      config={communicationConfidenceMockExamConfig}
      questionBank={communicationConfidenceQuestionBank}
      getRandomQuestions={getRandomCCExamQuestions}
    />
  );
};

export default CCMockExam;
