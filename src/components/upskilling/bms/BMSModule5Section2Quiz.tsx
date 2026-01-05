import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule5Section2QuizData } from '@/data/upskilling/bmsModule5Section2QuizData';

// Convert the existing data to match SingleQuestionQuiz format
const convertedQuizData = bmsModule5Section2QuizData.map((question, index) => ({
  id: index + 1,
  question: question.question,
  options: question.options,
  correctAnswer: question.options.indexOf(question.correctAnswer),
  explanation: `The correct answer is "${question.correctAnswer}". Understanding BACnet devices and network types is essential for proper electrical installation and system reliability.`
}));

export const BMSModule5Section2Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={convertedQuizData}
      title="Section 2 Quiz: BACnet Devices and Network Types"
    />
  );
};