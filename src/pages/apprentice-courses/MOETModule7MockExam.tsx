import useSEO from "@/hooks/useSEO";
import { StandardMockExam } from "@/components/shared/StandardMockExam";
import { moetQuestionBank, getRandomQuestions } from "@/data/apprentice-courses/moet/questionBank";
import { MockExamConfig } from "@/types/standardMockExam";

const MOETModule7MockExam = () => {
  useSEO(
    "MOET Mock Exam - EPA Practice Test",
    "Test your MOET Level 3 ST1426 knowledge with 40 random questions covering all modules. 60-minute timed EPA practice exam with instant results and category breakdown."
  );

  const config: MockExamConfig = {
    examId: "moet-epa-mock-exam",
    examTitle: "MOET EPA Mock Exam",
    totalQuestions: 40,
    timeLimit: 60 * 60, // 60 minutes
    passThreshold: 60,
    exitPath: "/study-centre/apprentice/m-o-e-t-module7",
    categories: [
      "Health, Safety & Compliance",
      "Engineering Principles & Electrical Theory",
      "Electrical Plant & Systems",
      "Maintenance & Fault Diagnosis",
      "Control & Automation",
      "Documentation",
      "EPA Preparation",
      "Cross-Module Integration"
    ]
  };

  return (
    <StandardMockExam
      config={config}
      questionBank={moetQuestionBank}
      getRandomQuestions={getRandomQuestions}
    />
  );
};

export default MOETModule7MockExam;
