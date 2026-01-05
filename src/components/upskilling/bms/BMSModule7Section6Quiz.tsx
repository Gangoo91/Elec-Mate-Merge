import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule7Section6QuizData } from '@/data/upskilling/bmsModule7Section6Quiz';

const BMSModule7Section6Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule7Section6QuizData}
      title="Section 6 Quiz: Client Handover and Documentation Requirements"
    />
  );
};

export { BMSModule7Section6Quiz };