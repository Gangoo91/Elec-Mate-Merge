/**
 * InstrumentationMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/instrumentationMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { instrumentationMockExamQuestions } from '@/data/upskilling/instrumentationMockExamData';

export default function InstrumentationMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Instrumentation Mock Exam 2026 — Process Control`}
      description={`Free instrumentation mock exam — 25 questions, 30-min timer, 125-question bank. Sensors, 4-20mA loops, PID control, calibration and fault finding.`}
      slug="instrumentation"
      heading={`Instrumentation Mock Exam`}
      intro={`Free instrumentation mock exam for process control work. 25 questions from a 125-question bank covering process variables, thermocouples and RTDs, pressure and level measurement, 4-20mA current loops and the HART protocol, PID control, signal conditioning, wiring and installation, calibration and fault finding.`}
      questionBank={
        instrumentationMockExamQuestions as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Instrumentation"
    />
  );
}
