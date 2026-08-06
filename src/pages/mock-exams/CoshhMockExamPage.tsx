/**
 * CoshhMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/coshhMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { coshhQuestionBank } from '@/data/general-upskilling/coshhMockExamData';

export default function CoshhMockExamPage() {
  return (
    <PublicMockExamPage
      title={`COSHH Mock Test 2026 with Answers — Free Practice Exam`}
      description={`Free COSHH mock test with answers explained, covering the COSHH Regulations 2002. 25 questions from a 200-question bank, 30-min timer. WELs, safety data sheets, RPE selection, hierarchy of control, biological agents. Instant results, no sign-up.`}
      slug="coshh"
      heading={`COSHH Mock Test — Free Practice`}
      intro={`Free Control of Substances Hazardous to Health Regulations 2002 mock test. 25 questions from a 200-question bank covering Workplace Exposure Limits (WELs), safety data sheet structure (16 sections), hierarchy of control, respiratory protective equipment selection, biological agents and emergency exposure response.`}
      questionBank={
        coshhQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="COSHH"
    />
  );
}
