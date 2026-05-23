/**
 * AM2OnlineMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/am2/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { am2QuestionBank } from '@/data/apprentice-courses/am2/questionBank';

export default function AM2OnlineMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free AM2 Online Knowledge Test Mock 2026`}
      description={`AM2 Section E (online knowledge test) mock — 25 Qs from a 177-Q bank. H&S, BS 7671, safe isolation, inspection & testing, fault diagnosis, building regs.`}
      slug="am2-online-knowledge-test"
      heading={`AM2 Online Knowledge Test — Free Mock Exam`}
      intro={`Free AM2 / AM2E Section E mock exam for the online knowledge test. Note: this is the online theory test, not the practical assessment. 25 questions from a 177-question bank covering Health & Safety (HASAWA, EAWR, COSHH), BS 7671 fundamentals + inspection & testing, safe isolation, Building Regulations and fault finding.`}
      questionBank={
        am2QuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={60}
      passThreshold={70}
      breadcrumbLabel="AM2 Online Knowledge Test"
    />
  );
}
