import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { observationCodesQuizQuestions } from '@/data/upskilling/observationCodesQuizData';

const ObservationCodesQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={observationCodesQuizQuestions}
      title="Observation Codes Knowledge Quiz"
    />
  );
};

export default ObservationCodesQuiz;