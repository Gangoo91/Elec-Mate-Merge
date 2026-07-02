/**
 * EmergencyLightingMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/emergencyLightingMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { emergencyLightingQuestionBank } from '@/data/upskilling/emergencyLightingMockExamData';

export default function EmergencyLightingMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Emergency Lighting Mock Exam 2026 (BS 5266)`}
      description={`Free BS 5266 emergency lighting mock exam — 25 questions, 30-min timer, 300-question bank. Maintained vs non-maintained, 3-hour duration, testing.`}
      slug="emergency-lighting"
      heading={`Emergency Lighting Mock Exam (BS 5266)`}
      intro={`Free emergency lighting mock exam built around BS 5266-1 practice. 25 questions from a 300-question bank covering maintained, non-maintained and sustained systems, escape route and anti-panic lighting, battery autonomy including the 3-hour duration for premises where people sleep, self-contained luminaires, design and cabling, plus commissioning, functional testing and inspection frequencies.`}
      questionBank={
        emergencyLightingQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Emergency Lighting"
    />
  );
}
