import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule7Section3Quiz } from '@/data/upskilling/bmsModule7Section3Quiz';

export const BMSModule7Section3Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule7Section3Quiz}
      title="Section 3 Quiz: Addressing and Device Mapping"
    />
  );
};