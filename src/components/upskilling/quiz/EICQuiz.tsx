import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { eicQuizData } from '@/data/upskilling/eicQuizData';

const EICQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={eicQuizData}
      title="Electrical Installation Certificate Quiz"
    />
  );
};

export default EICQuiz;