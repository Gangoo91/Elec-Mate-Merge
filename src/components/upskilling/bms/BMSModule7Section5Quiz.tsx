import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule7Section5Quiz } from '@/data/upskilling/bmsModule7Section5Quiz';

export const BMSModule7Section5Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule7Section5Quiz}
      title="Section 5 Quiz: Pre-Functional and Functional Commissioning"
    />
  );
};