import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  dataCablingQuestionBank,
  dataCablingMockExamConfig,
  getRandomDataCablingMockExamQuestions
} from '@/data/upskilling/dataCablingMockExamData';
import useSEO from '@/hooks/useSEO';

const DataCablingMockExam = () => {
  useSEO(
    "Data Cabling Mock Examination - Structured Cabling Systems",
    "Test your data cabling knowledge with 30 questions, 45-minute timer from 150 question bank covering copper cabling, fibre optics, testing, standards and installation techniques"
  );

  return (
    <StandardMockExam
      config={dataCablingMockExamConfig}
      questionBank={dataCablingQuestionBank}
      getRandomQuestions={getRandomDataCablingMockExamQuestions}
    />
  );
};

export default DataCablingMockExam;
