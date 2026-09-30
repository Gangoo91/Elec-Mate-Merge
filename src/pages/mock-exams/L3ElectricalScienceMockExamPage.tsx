/**
 * L3ElectricalScienceMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module3/questionBank
 * The /tmp generator that produced the first cut is gone — edit here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module3Questions } from '@/data/apprentice-courses/level3/module3/questionBank';

export default function L3ElectricalScienceMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Level 3 Electrical Science Mock Exam: 2365-03`}
      description={`Free Level 3 principles of electrical science mock exam with answers: 30 questions per attempt from a 390-question bank. Three-phase, motors, transformers, Zs, RLC.`}
      slug="level-3-electrical-science"
      heading={`Level 3 Electrical Science Mock Exam`}
      intro={`Free mock exam for Level 3 Electrical apprentices on Electrical Science. 30 questions from a 390-question bank covering three-phase systems, motor and transformer theory, voltage drop calculations, earth fault loop impedance, prospective fault current, power factor and RLC circuit analysis.`}
      questionBank={
        module3Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={35}
      passThreshold={70}
      breadcrumbLabel="Level 3 Electrical Science"
    />
  );
}
