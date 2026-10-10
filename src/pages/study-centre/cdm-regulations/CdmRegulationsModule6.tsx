import { Clock, Target, RotateCcw, BookOpen, ShieldCheck } from 'lucide-react';

import useSEO from '@/hooks/useSEO';

import { ExamIntroShell } from '@/components/study-centre/exam-intro';
const examFeatures = [
  {
    icon: BookOpen,
    label: '200-question bank',
    description: 'Randomly selected each attempt so no two exams are the same.',
  },
  {
    icon: Target,
    label: '20 questions per exam',
    description: 'Balanced across all five content modules for fair coverage.',
  },
  {
    icon: Clock,
    label: '30-minute timer',
    description: 'Timed under exam conditions with a 5-minute warning alert.',
  },
  {
    icon: ShieldCheck,
    label: '80% pass mark (16/20)',
    description: 'Matches the standard required by CDM awareness assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Introduction to CDM 2015', count: 40 },
  { module: 'Module 2', name: 'Duty holders & their roles', count: 40 },
  { module: 'Module 3', name: 'Pre-construction & planning', count: 40 },
  { module: 'Module 4', name: 'Design & risk management', count: 40 },
  { module: 'Module 5', name: 'Construction phase & compliance', count: 40 },
];

const preparationTips = [
  {
    title: 'Know the CDM 2015 structure',
    description:
      'Understand the five parts of the regulations, when they apply, and the distinction between domestic and commercial projects including notification thresholds.',
  },
  {
    title: 'Learn the duty holder roles',
    description:
      'Know the responsibilities of the client, principal designer, principal contractor, designers, contractors and workers, and how their duties differ on single-contractor vs multi-contractor projects.',
  },
  {
    title: 'Understand the key documents',
    description:
      'Pre-construction information, construction phase plan and health and safety file — who produces each, when they are required, and what they must contain.',
  },
  {
    title: 'Master design risk management',
    description:
      'The hierarchy of risk control in design, the general principles of prevention, and how designers must eliminate hazards, reduce risks and inform others of residual risks.',
  },
  {
    title: 'Know enforcement & compliance',
    description:
      'HSE enforcement powers, improvement and prohibition notices, penalties for non-compliance, welfare facility requirements under Schedule 2, and site induction obligations.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function CdmRegulationsModule6() {
  useSEO({
    title: 'CDM regulations awareness mock exam | Module 6 | Elec-Mate',
    description:
      'Test your CDM 2015 knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../cdm-regulations-course"
      description={
        'Put your CDM 2015 knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../cdm-regulations-mock-exam"
      stats={[
        { label: 'Questions', value: 20, sub: 'Per attempt' },
        { label: 'Time', value: '30m', sub: 'Timer enforced' },
        { label: 'Pass mark', value: '80%', sub: '16 / 20 correct' },
        { label: 'Retakes', value: '∞', sub: 'No cap' },
      ]}
      features={examFeatures}
      categories={categories}
      categoryNote={'4 questions drawn from each category per exam (20 total)'}
      tips={preparationTips}
      afterNote={
        "After completing the exam you'll see a full breakdown by category, including which areas need more revision. Use this to focus your study before retaking."
      }
    />
  );
}
