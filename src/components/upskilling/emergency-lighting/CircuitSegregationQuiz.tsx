import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { circuitSegregationQuizQuestions } from '@/data/upskilling/emergencyLightingModule4Section4QuizData';

export const CircuitSegregationQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={circuitSegregationQuizQuestions}
      title="Section 4 Quiz: Circuit Segregation and Fire Integrity"
    />
  );
};
