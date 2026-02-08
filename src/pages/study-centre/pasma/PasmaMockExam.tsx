import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  pasmaQuestionBank,
  pasmaMockExamConfig,
  getRandomPasmaExamQuestions
} from '@/data/general-upskilling/pasmaMockExamData';
import useSEO from '@/hooks/useSEO';

const PasmaMockExam = () => {
  useSEO({
    title: "PASMA Mock Examination",
    description:
      "Practice PASMA Towers for Users knowledge test — 20 questions, 30-minute timer, from 200-question bank.",
  });

  return (
    <StandardMockExam
      config={pasmaMockExamConfig}
      questionBank={pasmaQuestionBank}
      getRandomQuestions={getRandomPasmaExamQuestions}
    />
  );
};

export default PasmaMockExam;
