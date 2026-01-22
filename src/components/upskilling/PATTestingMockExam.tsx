import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  patTestingQuestionBank,
  patTestingMockExamConfig,
  getRandomPATTestingExamQuestions
} from '@/data/upskilling/patTestingMockExamData';
import useSEO from '@/hooks/useSEO';

const PATTestingMockExam = () => {
  useSEO(
    "PAT Testing Mock Examination - Portable Appliance Testing",
    "Practice PAT testing knowledge with 25 questions, 45-minute timer from 120 question bank covering regulations, equipment classification, visual inspection, testing procedures and documentation"
  );

  return (
    <StandardMockExam
      config={patTestingMockExamConfig}
      questionBank={patTestingQuestionBank}
      getRandomQuestions={getRandomPATTestingExamQuestions}
    />
  );
};

export default PATTestingMockExam;
