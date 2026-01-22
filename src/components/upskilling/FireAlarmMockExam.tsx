import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  fireAlarmQuestionBank,
  fireAlarmMockExamConfig,
  getRandomFireAlarmMockExamQuestions
} from '@/data/upskilling/fireAlarmMockExamData';
import useSEO from '@/hooks/useSEO';

const FireAlarmMockExam = () => {
  useSEO(
    "Fire Alarm Systems Mock Examination - BS 5839 Compliance",
    "Test your fire alarm knowledge with 30 questions, 45-minute timer from 150 question bank covering system categories, detectors, design, power supply, installation, testing and BS 5839 compliance"
  );

  return (
    <StandardMockExam
      config={fireAlarmMockExamConfig}
      questionBank={fireAlarmQuestionBank}
      getRandomQuestions={getRandomFireAlarmMockExamQuestions}
    />
  );
};

export default FireAlarmMockExam;
