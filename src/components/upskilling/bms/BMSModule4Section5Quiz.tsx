import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule4Section5QuizData } from '@/data/upskilling/bmsModule4Section5QuizData';

export const BMSModule4Section5Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule4Section5QuizData}
      title="Section 5 Quiz: Combined Energy Saving Scenarios"
    />
  );
};