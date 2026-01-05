import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule5Section5QuizData } from '@/data/upskilling/emergencyLightingModule5Section5QuizData';

export const EmergencyLightingModule5Section5Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={emergencyLightingModule5Section5QuizData}
      title="Section 5 Quiz: Certification and Commissioning Checklists"
    />
  );
};
