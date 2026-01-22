import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  industrialElectricalQuestionBank,
  industrialElectricalMockExamConfig,
  getRandomIndustrialElectricalMockExamQuestions
} from '@/data/upskilling/industrialElectricalMockExamData';
import useSEO from '@/hooks/useSEO';

const IndustrialElectricalMockExam = () => {
  useSEO(
    "Industrial Electrical Systems Mock Examination",
    "Test your industrial electrical knowledge with 30 questions, 45-minute timer covering distribution systems, motors, PLCs, fault finding, power quality and safety"
  );

  return (
    <StandardMockExam
      config={industrialElectricalMockExamConfig}
      questionBank={industrialElectricalQuestionBank}
      getRandomQuestions={getRandomIndustrialElectricalMockExamQuestions}
    />
  );
};

export default IndustrialElectricalMockExam;
