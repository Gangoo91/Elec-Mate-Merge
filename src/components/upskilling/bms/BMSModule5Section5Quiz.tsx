import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule5Section5QuizData } from '@/data/upskilling/bmsModule5Section5QuizData';

export const BMSModule5Section5Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule5Section5QuizData}
      title="Section 5 Quiz: Gateways and Interoperability Between Protocols"
    />
  );
};