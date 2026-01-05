import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyExitSignsQuizData } from '@/data/upskilling/emergencyExitSignsQuizData';

export const EmergencyExitSignsQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencyExitSignsQuizData}
      title="Section 5 Quiz: Emergency Exit Signs"
    />
  );
};