import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { minorWorksQuizQuestions } from '@/data/upskilling/minorWorksQuizData';

const MinorWorksQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={minorWorksQuizQuestions}
      title="Minor Works Certificate Quiz"
    />
  );
};

export default MinorWorksQuiz;