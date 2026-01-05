import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { escapeRouteCoverageQuizData } from '@/data/upskilling/escapeRouteCoverageQuizData';

export const EscapeRouteCoverageQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={escapeRouteCoverageQuizData}
      title="Section 2 Quiz: Escape Route and Coverage Rules"
    />
  );
};