import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  osgTableLookupQuestionBank,
  osgTableLookupMockExamConfig,
  getRandomOsgTableLookupQuestions,
} from '@/data/study-centre/osgTableLookupMockExamData';
import useSEO from '@/hooks/useSEO';

/**
 * ELE-1761 — a paper where every answer has to be read off a table in the
 * On-Site Guide. Built for tutors who teach table navigation as exam
 * technique; marking shows the table and row each value came from.
 */
const OSGTableLookupMockExam = () => {
  useSEO({
    title: 'On-Site Guide table lookup — mock exam',
    description:
      'Twenty questions you can only answer with the On-Site Guide open: maximum Zs, rating factors, cable capacity, voltage drop, conductor resistance and diversity.',
  });

  return (
    <StandardMockExam
      config={osgTableLookupMockExamConfig}
      questionBank={osgTableLookupQuestionBank}
      getRandomQuestions={getRandomOsgTableLookupQuestions}
    />
  );
};

export default OSGTableLookupMockExam;
