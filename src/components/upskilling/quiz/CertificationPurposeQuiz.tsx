import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { certificationPurposeQuizData } from '@/data/upskilling/certificationPurposeQuizData';

// Convert the existing data to match SingleQuestionQuiz format
const quizQuestions = certificationPurposeQuizData.map(q => ({
  ...q,
  correct: q.correctAnswer
}));

const CertificationPurposeQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={quizQuestions}
      title="Purpose of Certification Quiz"
    />
  );
};

export default CertificationPurposeQuiz;