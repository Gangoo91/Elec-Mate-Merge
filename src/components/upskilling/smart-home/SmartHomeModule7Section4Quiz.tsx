import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { smartHomeModule7Section4QuizQuestions } from '@/data/upskilling/smartHomeModule7Section4QuizData';

const SmartHomeModule7Section4Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={smartHomeModule7Section4QuizQuestions}
      title="Section 4 Quiz: Electrical Safety and Isolation"
    />
  );
};

export default SmartHomeModule7Section4Quiz;