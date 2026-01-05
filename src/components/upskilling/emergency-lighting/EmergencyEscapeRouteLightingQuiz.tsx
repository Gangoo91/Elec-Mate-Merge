import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyEscapeRouteQuizData } from '@/data/upskilling/emergencyEscapeRouteQuizData';

export const EmergencyEscapeRouteLightingQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencyEscapeRouteQuizData}
      title="Section 4 Quiz: Escape Route Lighting"
    />
  );
};