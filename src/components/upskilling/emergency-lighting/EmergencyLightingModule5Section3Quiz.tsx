import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule5Section3QuizQuestions } from '@/data/upskilling/emergencyLightingModule5Section3QuizData';

export const EmergencyLightingModule5Section3Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencyLightingModule5Section3QuizQuestions}
      title="Section 3 Quiz: Monthly and Annual Testing Requirements"
    />
  );
};
