import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencySystemTestingQuizData } from '@/data/upskilling/emergencySystemTestingQuizData';

export const EmergencySystemTestingQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencySystemTestingQuizData}
      title="Section 6 Quiz: System Testing and Record Keeping"
    />
  );
};