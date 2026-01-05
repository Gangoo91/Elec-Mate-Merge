import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule5Section6QuizData } from '@/data/upskilling/emergencyLightingModule5Section6QuizData';

export const EmergencyLightingModule5Section6Quiz = () => {
  return (
    <SingleQuestionQuiz
      questions={emergencyLightingModule5Section6QuizData}
      title="Section 6 Knowledge Check"
    />
  );
};
