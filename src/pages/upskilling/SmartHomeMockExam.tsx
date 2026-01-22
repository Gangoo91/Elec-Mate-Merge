import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  smartHomeQuestionBank,
  smartHomeMockExamConfig,
  getRandomSmartHomeMockExamQuestions
} from '@/data/upskilling/smartHomeMockExamData';
import useSEO from '@/hooks/useSEO';

const SmartHomeMockExam = () => {
  useSEO(
    "Smart Home Technology Mock Examination - Home Automation Systems",
    "Test your smart home knowledge with 30 questions, 45-minute timer from 200 question bank covering protocols, lighting, HVAC, security, hubs, voice assistants and installation"
  );

  return (
    <StandardMockExam
      config={smartHomeMockExamConfig}
      questionBank={smartHomeQuestionBank}
      getRandomQuestions={getRandomSmartHomeMockExamQuestions}
    />
  );
};

export default SmartHomeMockExam;
