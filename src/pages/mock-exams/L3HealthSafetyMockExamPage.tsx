/**
 * L3HealthSafetyMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module1/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module1Questions } from '@/data/apprentice-courses/level3/module1/questionBank';

export default function L3HealthSafetyMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 3 Mock Exam: H&S Supervisor (Unit 1)`}
      description={`Free Level 3 H&S mock exam — supervisor-grade, 251-Q bank. HASAWA s.2/s.3/s.7, CDM 2015, CAR 2012, Building Safety Act 2022, FFI, prohibition notices.`}
      slug="level-3-electrical-health-safety"
      heading={`Level 3 Electrical: Health & Safety (Supervisor Grade)`}
      intro={`Free supervisor-grade mock exam for Level 3 Electrical (C&G 2365-03 / 2357 Unit 601) on Health and Safety. 25 questions from a 251-question bank covering HASAWA sections 2, 3 and 7, EAWR 1989, RIDDOR 2013, COSHH 2002, CDM 2015 duty holders, CAR 2012 (asbestos), Building Safety Act 2022 and the Sentencing Council Definitive Guideline 2016.`}
      questionBank={
        module1Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 3 Health & Safety"
    />
  );
}
