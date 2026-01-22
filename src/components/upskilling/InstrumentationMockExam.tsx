import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  instrumentationMockExamQuestions,
  instrumentationMockExamConfig,
  getRandomInstrumentationMockExamQuestions
} from '@/data/upskilling/instrumentationMockExamData';
import useSEO from '@/hooks/useSEO';

const InstrumentationMockExam = () => {
  useSEO(
    "Instrumentation Mock Examination - Industrial Control Systems",
    "Test your instrumentation knowledge with 25 questions, 40-minute timer from 125 question bank covering sensors, PLCs, control loops, calibration and industrial protocols"
  );

  return (
    <StandardMockExam
      config={instrumentationMockExamConfig}
      questionBank={instrumentationMockExamQuestions}
      getRandomQuestions={getRandomInstrumentationMockExamQuestions}
    />
  );
};

export default InstrumentationMockExam;
