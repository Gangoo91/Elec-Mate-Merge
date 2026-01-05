import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule5Section6QuizQuestions } from '@/data/upskilling/bmsModule5Section6QuizData';

export const BMSModule5Section6Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={bmsModule5Section6QuizQuestions}
      title="Section 6 Quiz: Network Planning, Segmentation, and Latency Management"
    />
  );
};