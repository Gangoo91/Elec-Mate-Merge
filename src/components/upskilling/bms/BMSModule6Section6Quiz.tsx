import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule6Section6Quiz } from '@/data/upskilling/bmsModule6Section6Quiz';

export const BMSModule6Section6Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule6Section6Quiz}
      title="Section 6 Quiz: Remote Monitoring and Fault Alerts"
    />
  );
};