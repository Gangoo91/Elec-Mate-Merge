import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule5Section1QuizData } from '@/data/upskilling/emergencyLightingModule5Section1QuizData';

export const EmergencyLightingModule5Section1Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencyLightingModule5Section1QuizData}
      title="Section 1 Quiz: Initial Inspection and Verification"
    />
  );
};
