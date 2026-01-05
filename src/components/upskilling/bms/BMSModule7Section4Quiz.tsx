import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule7Section4Quiz } from '@/data/upskilling/bmsModule7Section4Quiz';

export const BMSModule7Section4Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule7Section4Quiz}
      title="Section 4 Quiz: Software Upload and Controller Setup"
    />
  );
};