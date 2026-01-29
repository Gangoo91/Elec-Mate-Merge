import useSEO from "@/hooks/useSEO";
import { StandardMockExam } from "@/components/shared/StandardMockExam";
import { hncQuestionBank, getRandomQuestions } from "@/data/apprentice-courses/hnc/questionBank";
import { MockExamConfig } from "@/types/standardMockExam";

const HNCModule9MockExam = () => {
  useSEO(
    "HNC Mock Exam | Electrical Engineering Practice",
    "Test your HNC Electrical Engineering knowledge with 30 random questions from all 8 modules. 45-minute timed exam with instant results."
  );

  const config: MockExamConfig = {
    examId: "hnc-mock-exam",
    examTitle: "HNC Electrical Engineering Mock Exam",
    totalQuestions: 30,
    timeLimit: 60 * 45, // 45 minutes
    passThreshold: 60,
    exitPath: "/study-centre/apprentice/h-n-c-module9",
    categories: [
      "Health & Safety",
      "Building Services Science",
      "Electrical Principles",
      "Design Principles",
      "Project Management",
      "Sustainability",
      "Power & Lighting",
      "HVAC Systems"
    ]
  };

  return (
    <StandardMockExam
      config={config}
      questionBank={hncQuestionBank}
      getRandomQuestions={getRandomQuestions}
    />
  );
};

export default HNCModule9MockExam;
