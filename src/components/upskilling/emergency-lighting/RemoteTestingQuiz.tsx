import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { remoteTestingQuizData } from '@/data/upskilling/emergencyLightingModule4Section5QuizData';

export const RemoteTestingQuiz = () => {
  return (
    <SingleQuestionQuiz 
      questions={remoteTestingQuizData}
      title="Section 5 Quiz: Remote Testing and Monitoring Systems"
    />
  );
};
