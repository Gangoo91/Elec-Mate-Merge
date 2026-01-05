import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule7Section1Quiz } from '@/data/upskilling/bmsModule7Section1Quiz';

export const BMSModule7Section1Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule7Section1Quiz}
      title="Section 1 Quiz: Device Wiring, Power Supplies, and Containment"
    />
  );
};