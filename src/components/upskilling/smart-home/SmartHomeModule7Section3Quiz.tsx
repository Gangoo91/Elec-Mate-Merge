import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { smartHomeModule7Section3QuizQuestions } from '@/data/upskilling/smartHomeModule7Section3QuizData';

const SmartHomeModule7Section3Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={smartHomeModule7Section3QuizQuestions}
      title="Section 3 Quiz: Wi-Fi and RF Signal Verification"
    />
  );
};

export default SmartHomeModule7Section3Quiz;