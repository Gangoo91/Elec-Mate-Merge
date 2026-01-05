import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule4Section3QuizQuestions } from '@/data/upskilling/bmsModule4Section3QuizData';

export const BMSModule4Section3Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule4Section3QuizQuestions}
      title="Section 3 Quiz: Access Control Basics and Door Relays"
    />
  );
};