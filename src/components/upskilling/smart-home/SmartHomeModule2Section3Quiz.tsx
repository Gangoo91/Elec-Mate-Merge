import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { smartHomeModule2Section3QuizQuestions } from '@/data/upskilling/smartHomeModule2Section3QuizData';

export const SmartHomeModule2Section3Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={smartHomeModule2Section3QuizQuestions}
      title="Section 2.3 Quiz: Wi-Fi, Bluetooth, Thread & Matter"
    />
  );
};