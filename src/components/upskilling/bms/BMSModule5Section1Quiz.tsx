import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule5Section1QuizData } from '@/data/upskilling/bmsModule5Section1QuizData';

// Convert the existing data to match SingleQuestionQuiz format
const convertedQuizData = bmsModule5Section1QuizData.map((question, index) => ({
  id: index + 1,
  question: question.question,
  options: question.options,
  correctAnswer: question.options.indexOf(question.correctAnswer),
  explanation: `The correct answer is "${question.correctAnswer}". Understanding BMS communication protocols is essential for proper electrical installation and system integration.`
}));

export const BMSModule5Section1Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={convertedQuizData}
      title="Section 1 Quiz: Overview of BMS Protocols"
    />
  );
};