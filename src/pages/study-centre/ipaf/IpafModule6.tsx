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
    description: 'Matches the standard required by PASMA training assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Legislation', count: 40 },
  { module: 'Module 2', name: 'Tower types', count: 40 },
  { module: 'Module 3', name: 'Assembly', count: 40 },
  { module: 'Module 4', name: 'Inspection', count: 40 },
  { module: 'Module 5', name: 'Hazards', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Legislation, Tower Types, Assembly, Inspection and Hazards. Cover every module before attempting the exam.',
  },
  {
    title: 'Know your regulations',
    description:
      'The Work at Height Regulations 2005, HSWA 1974 and BS EN 1004-1:2020 are heavily tested. Understand the hierarchy of control and employer duties.',
  },
  {
    title: 'Understand assembly methods',
    description:
      'Be clear on the differences between 3T (Through The Trap) and AGR (Advance Guard Rail), including when each is appropriate and the step-by-step sequences.',
  },
  {
    title: 'Remember key dimensions',
    description:
      'Guardrail height (950 mm), mid-rail (470 mm), toeboard (150 mm), platform safe working load (275 kg) and wind limits (Beaufort 4 cease work) appear frequently.',
  },
  {
    title: 'Inspection triggers',
    description:
      'Know when inspections are required: before first use, every 7 days, after any event that could affect stability and after any modification or relocation.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function IpafModule6() {
  useSEO({
    title: 'IPAF Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your IPAF mobile scaffold knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../ipaf-course"
      description={
        'Put your IPAF mobile scaffold knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../ipaf-mock-exam"
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
