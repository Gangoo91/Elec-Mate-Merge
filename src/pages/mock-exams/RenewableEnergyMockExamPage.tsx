/**
 * RenewableEnergyMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/renewableEnergyMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { renewableEnergyQuestionBank } from '@/data/upskilling/renewableEnergyMockExamData';

export default function RenewableEnergyMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Renewable Energy Mock Exam 2026 — Solar PV`}
      description={`Free renewable energy mock exam — 25 questions, 30-min timer, 200-question bank. Solar PV design, inverters, grid connection, battery storage, wind.`}
      slug="renewable-energy"
      heading={`Renewable Energy Mock Exam — Solar PV & More`}
      intro={`Free renewable energy mock exam with a solar PV focus. 25 questions from a 200-question bank covering panel technologies and efficiency, inverter selection including partial-shading scenarios, system design and tilt angles for UK installations, grid connection, battery storage, testing and commissioning, plus wind energy and solar thermal topics.`}
      questionBank={
        renewableEnergyQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Renewable Energy"
    />
  );
}
