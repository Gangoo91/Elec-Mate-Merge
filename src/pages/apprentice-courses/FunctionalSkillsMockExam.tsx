import { StandardMockExam } from "@/components/shared/StandardMockExam";
import { functionalSkillsQuestionBank } from "@/data/apprentice-courses/functional-skills/functionalSkillsMockExamData";
import { getRandomQuestionsBalanced } from "@/utils/questionSelection";
import { MockExamConfig } from "@/types/standardMockExam";
import useSEO from "@/hooks/useSEO";

const config: MockExamConfig = {
  examId: "functional-skills-mock",
  examTitle: "Functional Skills Mock Examination",
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes in seconds
  passThreshold: 80,
  exitPath: "/study-centre/apprentice/functional-skills/module6",
  categories: ["Mathematics", "English", "Digital Skills", "Practical Applications", "Assessment"],
};

const FunctionalSkillsMockExam = () => {
  useSEO(
    "Functional Skills Mock Exam",
    "Practice examination with 20 random questions from a 200-question bank covering mathematics, English, digital skills and practical applications"
  );

  const getQuestions = (count: number) =>
    getRandomQuestionsBalanced(functionalSkillsQuestionBank, count, config.categories);

  return (
    <StandardMockExam
      config={config}
      questionBank={functionalSkillsQuestionBank}
      getRandomQuestions={getQuestions}
    />
  );
};

export default FunctionalSkillsMockExam;
