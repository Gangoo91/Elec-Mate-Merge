/**
 * BS7671 Mock Examination
 *
 * Standardised mock exam following the AM2 design pattern.
 * Features: 60-min timer, question flagging, category breakdown,
 * weak area alerts, mobile/desktop layouts, result persistence.
 */

import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  bs7671QuestionBank,
  bs7671MockExamConfig,
  getRandomBS7671ExamQuestions
} from '@/data/upskilling/bs7671MockExamData';
import useSEO from '@/hooks/useSEO';

const BS7671MockExam = () => {
  useSEO(
    "BS7671 Mock Examination - 18th Edition Wiring Regulations",
    "Practice BS7671 knowledge test with 30 questions, 60-minute timer from 150 question bank covering fundamentals, earthing, protection, cables, testing and special locations"
  );

  return (
    <StandardMockExam
      config={bs7671MockExamConfig}
      questionBank={bs7671QuestionBank}
      getRandomQuestions={getRandomBS7671ExamQuestions}
    />
  );
};

export default BS7671MockExam;
