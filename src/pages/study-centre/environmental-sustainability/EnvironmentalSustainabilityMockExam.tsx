import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  environmentalSustainabilityQuestionBank,
  environmentalSustainabilityMockExamConfig,
  getRandomEnvironmentalSustainabilityExamQuestions
} from '@/data/general-upskilling/environmentalSustainabilityMockExamData';
import useSEO from '@/hooks/useSEO';

const EnvironmentalSustainabilityMockExam = () => {
  useSEO({
    title: "Environmental & Sustainability Mock Examination",
    description:
      "Practice environmental and sustainability knowledge test \u2014 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={environmentalSustainabilityMockExamConfig}
      questionBank={environmentalSustainabilityQuestionBank}
      getRandomQuestions={getRandomEnvironmentalSustainabilityExamQuestions}
    />
  );
};

export default EnvironmentalSustainabilityMockExam;
