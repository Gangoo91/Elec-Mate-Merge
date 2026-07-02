/**
 * FibreOpticsMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/fiberOpticsMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { fiberOpticsQuestionBank } from '@/data/upskilling/fiberOpticsMockExamData';

export default function FibreOpticsMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Fibre Optics Mock Exam 2026 (UK Practice Test)`}
      description={`Free fibre optics mock exam — 25 questions, 30-min timer, 250-question bank. Singlemode vs multimode, connectors, splicing, installation, fault finding.`}
      slug="fibre-optics"
      heading={`Fibre Optics Mock Exam`}
      intro={`Free fibre optics mock exam. 25 questions from a 250-question bank covering how light travels through optical fibre, singlemode and multimode fibre types including OM4, cable construction, connectors and splicing, installation practice for inside and outside plant, standards and design, attenuation and dispersion, and fault finding.`}
      questionBank={
        fiberOpticsQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Fibre Optics"
    />
  );
}
