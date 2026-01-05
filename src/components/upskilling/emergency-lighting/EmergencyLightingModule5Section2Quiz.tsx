import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule5Section2QuizQuestions } from '@/data/upskilling/emergencyLightingModule5Section2QuizData';

export const EmergencyLightingModule5Section2Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencyLightingModule5Section2QuizQuestions}
      title="Section 2 Quiz: Functional Testing and 3-Hour Duration Tests"
    />
  );
};
