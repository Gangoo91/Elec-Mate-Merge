import { StandardMockExam } from "@/components/shared/StandardMockExam";
import {
  mentalHealthQuestionBank,
  mentalHealthMockExamConfig,
  getRandomMentalHealthExamQuestions,
} from "@/data/general-upskilling/mentalHealthMockExamData";
import useSEO from "@/hooks/useSEO";

const MentalHealthModule6 = () => {
  useSEO({
    title: "Mental Health Awareness Mock Examination",
    description:
      "Practice mental health awareness knowledge test — 20 questions, 30-minute timer, from 200-question bank covering all 5 modules.",
  });

  return (
    <StandardMockExam
      config={mentalHealthMockExamConfig}
      questionBank={mentalHealthQuestionBank}
      getRandomQuestions={getRandomMentalHealthExamQuestions}
    />
  );
};

export default MentalHealthModule6;
