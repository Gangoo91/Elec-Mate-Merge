/**
 * IndustrialElectricalMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/industrialElectricalMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { industrialElectricalQuestionBank } from '@/data/upskilling/industrialElectricalMockExamData';

export default function IndustrialElectricalMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Industrial Electrical Mock Exam 2026 (UK)`}
      description={`Free industrial electrical mock exam — 25 questions, 30-min timer, 120-question bank. Three-phase distribution, motors, PLCs, fault finding, isolation.`}
      slug="industrial-electrical"
      heading={`Industrial Electrical Mock Exam`}
      intro={`Free industrial electrical mock exam. 25 questions from a 120-question bank covering three-phase distribution and HV/LV switchboards, transformers, motors and control gear, panel assembly, PLCs and automation, fault finding, cables and containment, power quality, and safe isolation including risk assessment and the Electricity at Work Regulations.`}
      questionBank={
        industrialElectricalQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Industrial Electrical"
    />
  );
}
