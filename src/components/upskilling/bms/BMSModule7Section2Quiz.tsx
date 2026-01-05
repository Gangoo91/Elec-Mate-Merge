import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule7Section2Quiz } from '@/data/upskilling/bmsModule7Section2Quiz';

export const BMSModule7Section2Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule7Section2Quiz}
      title="Section 2 Quiz: Programming Methods - Function Blocks, Boolean Logic, PID"
    />
  );
};