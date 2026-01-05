import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule5Section3QuizData } from '@/data/upskilling/bmsModule5Section3QuizData';

// Convert the existing data to match SingleQuestionQuiz format
const convertedQuizData = bmsModule5Section3QuizData.map((question, index) => ({
  id: index + 1,
  question: question.question,
  options: question.options,
  correctAnswer: question.options.indexOf(question.correctAnswer),
  explanation: `The correct answer is "${question.correctAnswer}". Understanding Modbus RTU and TCP/IP implementation is crucial for reliable building automation systems.`
}));

export const BMSModule5Section3Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={convertedQuizData}
      title="Section 3 Quiz: Modbus RTU and TCP/IP Use Cases"
    />
  );
};