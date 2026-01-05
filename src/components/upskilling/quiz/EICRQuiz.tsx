import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { eicrQuizQuestions } from '@/data/upskilling/eicrQuizData';

const EICRQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={eicrQuizQuestions}
      title="EICR Knowledge Quiz"
    />
  );
};

export default EICRQuiz;