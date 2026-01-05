import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { smartHomeSection3QuizQuestions } from '@/data/upskilling/smartHomeSection3QuizData';

export const SmartHomeSection3Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={smartHomeSection3QuizQuestions}
      title="Section 1.3 Quiz: Core Components"
    />
  );
};