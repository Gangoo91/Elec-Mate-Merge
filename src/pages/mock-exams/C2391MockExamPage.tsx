/**
 * C2391MockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/upskilling/inspectionTestingMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { inspectionTestingQuestionBank } from '@/data/upskilling/inspectionTestingMockExamData';

export default function C2391MockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free 2391 Mock Exam 2026: Inspection + Testing UK`}
      description={`Free City & Guilds 2391-52 mock test: 30 questions, 90-min timer, 300-Q bank. Initial verification, periodic inspection, EICR coding, GN3 sequence.`}
      slug="2391-inspection-testing"
      heading={`C&G 2391 Mock Exam — Inspection & Testing`}
      intro={`Free City & Guilds 2391-52 Inspection & Testing mock exam. 30 questions from a 300-question bank covering the BS 7671 testing sequence, initial verification, periodic inspection, EICR coding (C1/C2/C3/FI), continuity testing, insulation resistance, polarity, earth fault loop impedance, RCD testing and the GN3 procedures.`}
      questionBank={
        inspectionTestingQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={90}
      passThreshold={70}
      breadcrumbLabel="2391 Inspection & Testing"
    />
  );
}
