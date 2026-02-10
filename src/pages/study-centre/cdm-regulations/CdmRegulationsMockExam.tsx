import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  cdmRegulationsQuestionBank,
  cdmRegulationsMockExamConfig,
  getRandomCdmRegulationsExamQuestions
} from '@/data/general-upskilling/cdmRegulationsMockExamData';
import useSEO from '@/hooks/useSEO';

const CdmRegulationsMockExam = () => {
  useSEO({
    title: "CDM Regulations Awareness Mock Examination",
    description:
      "Practice CDM 2015 knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={cdmRegulationsMockExamConfig}
      questionBank={cdmRegulationsQuestionBank}
      getRandomQuestions={getRandomCdmRegulationsExamQuestions}
    />
  );
};

export default CdmRegulationsMockExam;
