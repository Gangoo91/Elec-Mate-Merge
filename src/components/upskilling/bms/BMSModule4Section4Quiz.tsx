import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule4Section4QuizQuestions } from '@/data/upskilling/bmsModule4Section4QuizData';

export const BMSModule4Section4Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule4Section4QuizQuestions}
      title="Section 4 Quiz: Shading, Blinds, and Façade Automation"
    />
  );
};