/**
 * ConfinedSpacesMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/confinedSpacesMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { confinedSpacesQuestionBank } from '@/data/general-upskilling/confinedSpacesMockExamData';

export default function ConfinedSpacesMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Confined Spaces Mock Test 2026: Free UK Practice`}
      description={`Free Confined Spaces mock test (CSR 1997): 25 questions, 200-Q bank. Risk assessment, atmospheric testing, permits to work, rescue arrangements.`}
      slug="confined-spaces"
      heading={`Confined Spaces Mock Test — Free Practice`}
      intro={`Free Confined Spaces Regulations 1997 mock test for UK electricians, M&E contractors and site workers. 25 questions from a 200-question bank covering definitions, specified risks, the hierarchy of control (avoid, plan, train, equip), atmospheric testing with gas monitors, permit-to-work systems, emergency rescue arrangements and standby personnel.`}
      questionBank={
        confinedSpacesQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Confined Spaces"
    />
  );
}
