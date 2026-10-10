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
    description: 'Matches the standard required by IPAF operator assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Legislation & types', count: 40 },
  { module: 'Module 2', name: 'Risk assessment', count: 34 },
  { module: 'Module 3', name: 'Inspections & setup', count: 34 },
  { module: 'Module 4', name: 'Safe operation', count: 34 },
  { module: 'Module 5', name: 'Emergency & rescue', count: 30 },
  { module: 'General', name: 'Safety & best practice', count: 28 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn from Legislation, Risk Assessment, Inspections, Operating Procedures and Emergency Rescue. Cover every module before attempting the exam.',
  },
  {
    title: 'Know your regulations',
    description:
      'WAHR 2005, LOLER 1998, PUWER 1998 and HSWA 1974 are heavily tested. Understand the hierarchy of control, thorough examination intervals and duty holder responsibilities.',
  },
  {
    title: 'Understand the six key hazards',
    description:
      'Falls, electrocution, overturn, entrapment, collision and machine failure. Know the causes, prevention measures and statistics for each.',
  },
  {
    title: 'Remember key figures',
    description:
      'Wind limit 12.5 m/s (28 mph), thorough examination every 6 months, power line distances (15m/9m/3m), 10m exclusion zones and 80% pass mark — these numbers appear frequently.',
  },
  {
    title: 'Master the emergency procedures',
    description:
      'Know the four control systems, the three rescue options (ground controls, emergency lowering, emergency services) and the role of the nominated ground rescue person.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function MewpModule6() {
  useSEO({
    title: 'MEWP mock exam | Module 6 | Elec-Mate',
    description:
      'Test your MEWP operator knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../mewp-course"
      description={
        'Put your MEWP operator knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../mewp-mock-exam"
      stats={[
        { label: 'Questions', value: 20, sub: 'Per attempt' },
        { label: 'Time', value: '30m', sub: 'Timer enforced' },
        { label: 'Pass mark', value: '80%', sub: '16 / 20 correct' },
        { label: 'Retakes', value: '∞', sub: 'No cap' },
      ]}
      features={examFeatures}
      categories={categories}
      categoryNote={'Questions drawn from all five content modules (20 total per exam)'}
      tips={preparationTips}
      afterNote={
        "After completing the exam you'll see a full breakdown by category, including which areas need more revision. Use this to focus your study before retaking."
      }
    />
  );
}
