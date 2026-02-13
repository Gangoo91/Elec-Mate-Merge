import { StandardMockExam } from "@/components/shared/StandardMockExam";
import {
  leadershipQuestionBank,
  leadershipMockExamConfig,
  getRandomLeadershipExamQuestions,
} from "@/data/general-upskilling/leadershipMockExamData";
import useSEO from "@/hooks/useSEO";

const LeadershipModule6 = () => {
  useSEO({
    title: "Leadership on Site Mock Examination",
    description:
      "Practice leadership knowledge test — 20 questions, 30-minute timer, from 200-question bank covering all 5 modules.",
  });

  return (
    <StandardMockExam
      config={leadershipMockExamConfig}
      questionBank={leadershipQuestionBank}
      getRandomQuestions={getRandomLeadershipExamQuestions}
    />
  );
};

export default LeadershipModule6;
