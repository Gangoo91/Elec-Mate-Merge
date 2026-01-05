import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { documentationBestPracticesQuizQuestions } from '@/data/upskilling/documentationBestPracticesQuizData';

const DocumentationBestPracticesQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={documentationBestPracticesQuizQuestions}
      title="Documentation Best Practices Quiz"
    />
  );
};

export default DocumentationBestPracticesQuiz;