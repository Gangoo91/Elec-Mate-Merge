import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  emotionalIntelligenceQuestionBank,
  emotionalIntelligenceMockExamConfig,
  getRandomEIExamQuestions,
} from '@/data/general-upskilling/emotionalIntelligenceMockExamData';
import useSEO from '@/hooks/useSEO';

const EIMockExam = () => {
  useSEO({
    title: 'Emotional Intelligence Mock Examination',
    description:
      'Practise Emotional Intelligence knowledge test — 20 questions, 30-minute timer, from 200-question bank.',
  });

  return (
    <StandardMockExam
      config={emotionalIntelligenceMockExamConfig}
      questionBank={emotionalIntelligenceQuestionBank}
      getRandomQuestions={getRandomEIExamQuestions}
    />
  );
};

export default EIMockExam;
