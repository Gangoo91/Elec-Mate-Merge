import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { smartHomeModule6Section5QuizQuestions } from '@/data/upskilling/smartHomeModule6Section5QuizData';

export const SmartHomeModule6Section5Quiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={smartHomeModule6Section5QuizQuestions}
      title="Section 6.5 Quiz: Troubleshooting Ecosystem Conflicts"
    />
  );
};

export default SmartHomeModule6Section5Quiz;