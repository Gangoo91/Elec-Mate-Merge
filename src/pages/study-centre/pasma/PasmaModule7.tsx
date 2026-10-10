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
    description: 'Balanced across all six content modules for fair coverage.',
  },
  {
    icon: Clock,
    label: '30-minute timer',
    description: 'Timed under exam conditions with a 5-minute warning alert.',
  },
  {
    icon: ShieldCheck,
    label: '80% pass mark (16/20)',
    description: 'Matches the standard required by PASMA training assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Legislation', count: 34 },
  { module: 'Module 2', name: 'Tower types', count: 28 },
  { module: 'Module 3', name: 'Assembly', count: 28 },
  { module: 'Module 4', name: 'Dismantling', count: 28 },
  { module: 'Module 5', name: 'Inspection', count: 28 },
  { module: 'Module 6', name: 'Hazards', count: 28 },
  { module: 'Module 6', name: 'Safety', count: 26 },
];

const preparationTips = [
  {
    title: 'Review all six modules',
    description:
      'Questions are drawn from Legislation, Tower Types, Assembly, Dismantling, Inspection and Hazards. Cover every module before attempting the exam.',
  },
  {
    title: 'Know your regulations',
    description:
      'WAHR 2005, HSWA 1974, EN 1004:2020 and CDM 2015 are heavily tested. Understand the hierarchy of control and duty holder responsibilities.',
  },
  {
    title: 'Understand assembly & dismantling',
    description:
      'Be clear on the differences between 3T (Through The Trap) and AGR (Advance Guard Rail) methods for both assembly and dismantling, including when each is appropriate.',
  },
  {
    title: 'Remember key dimensions',
    description:
      'Guardrail height (950 mm), mid-rail (470 mm), toeboard (150 mm), platform safe working load and height-to-base ratios appear frequently in questions.',
  },
  {
    title: 'Inspection & compliance',
    description:
      'Know when inspections are required: before first use, every 7 days, after any event that could affect stability and after any modification or relocation.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function PasmaModule7() {
  useSEO({
    title: 'PASMA mock exam | Module 7 | Elec-Mate',
    description:
      'Test your PASMA towers for users knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 7 · Final assessment"
      backTo="../pasma-course"
      description={
        'Put your PASMA towers for users knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all six content modules.'
      }
      examPath="../pasma-mock-exam"
      stats={[
        { label: 'Questions', value: 20, sub: 'Per attempt' },
        { label: 'Time', value: '30m', sub: 'Timer enforced' },
        { label: 'Pass mark', value: '80%', sub: '16 / 20 correct' },
        { label: 'Retakes', value: '∞', sub: 'No cap' },
      ]}
      features={examFeatures}
      categories={categories}
      categoryNote={'Questions drawn from all six content modules (20 total per exam)'}
      tips={preparationTips}
      afterNote={
        "After completing the exam you'll see a full breakdown by category, including which areas need more revision. Use this to focus your study before retaking."
      }
    />
  );
}
