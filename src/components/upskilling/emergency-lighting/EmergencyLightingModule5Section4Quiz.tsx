import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule5Section4QuizQuestions } from '@/data/upskilling/emergencyLightingModule5Section4QuizData';

export const EmergencyLightingModule5Section4Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencyLightingModule5Section4QuizQuestions}
      title="Section 4 Quiz: System Labelling and Maintenance Records"
    />
  );
};
