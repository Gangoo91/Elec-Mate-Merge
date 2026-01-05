import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { smartHomeModule7Section2QuizQuestions } from '@/data/upskilling/smartHomeModule7Section2QuizData';

const SmartHomeModule7Section2Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={smartHomeModule7Section2QuizQuestions}
      title="Section 2 Quiz: Commissioning and Device Pairing"
    />
  );
};

export default SmartHomeModule7Section2Quiz;