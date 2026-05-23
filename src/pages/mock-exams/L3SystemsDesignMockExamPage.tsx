/**
 * L3SystemsDesignMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module6/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module6Questions } from '@/data/apprentice-courses/level3/module6/questionBank';

export default function L3SystemsDesignMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 3 Mock Exam: Systems Design (Unit 6)`}
      description={`Free Level 3 Systems Design mock — 25 Qs from 201-Q bank. Load assessment, diversity, cable sizing, voltage drop, distribution board layout, schematics.`}
      slug="level-3-systems-design"
      heading={`Free Level 3 Mock Exam: Systems Design (Unit 6)`}
      intro={`Free mock exam for Level 3 Electrical apprentices on Systems Design. 25 questions from a 201-question bank covering load assessment and maximum demand, BS 7671 diversity factors, cable sizing per Appendix 4, voltage drop calculations, distribution board layout, single-line schematics and selection coordination of protective devices.`}
      questionBank={
        module6Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 3 Systems Design"
    />
  );
}
