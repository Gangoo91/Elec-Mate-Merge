import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule5Section4QuizData } from '@/data/upskilling/bmsModule5Section4QuizData';

export const BMSModule5Section4Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule5Section4QuizData}
      title="Section 4 Quiz: KNX Topology and Bus Devices"
    />
  );
};