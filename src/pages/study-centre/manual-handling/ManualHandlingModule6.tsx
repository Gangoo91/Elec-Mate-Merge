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
    description: 'Matches the standard required by manual handling assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding manual handling', count: 40 },
  { module: 'Module 2', name: 'Principles of safe lifting', count: 40 },
  { module: 'Module 3', name: 'Risk assessment & reduction', count: 40 },
  { module: 'Module 4', name: 'Workplace-specific handling', count: 40 },
  { module: 'Module 5', name: 'Health, welfare & responsibilities', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Understanding Manual Handling, Principles of Safe Lifting, Risk Assessment & Reduction, Workplace-Specific Handling and Health, Welfare & Responsibilities. Cover every module before attempting the exam.',
  },
  {
    title: 'Master the TILE framework',
    description:
      'Task, Individual, Load, Environment is the core risk assessment tool. Understand how each factor affects manual handling operations and how to apply the framework in real-world scenarios.',
  },
  {
    title: 'Know MHOR 1992 inside out',
    description:
      'The Manual Handling Operations Regulations 1992 is the primary legislation. Know the key duties, the hierarchy of measures (avoid, assess, reduce) and how it interacts with HASAWA 1974 and the Management Regs 1999.',
  },
  {
    title: 'Understand the kinetic lifting technique',
    description:
      'Know every step of the eight-step safe lift — from planning the lift to setting down the load. Understand base of support, centre of gravity and why smooth controlled movements prevent injury.',
  },
  {
    title: 'Learn the mechanical aids',
    description:
      'Know when to use trolleys, sack trucks, hoists, pallet trucks and other equipment. Understand how mechanical aids reduce risk and when manual handling can be designed out entirely.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function ManualHandlingModule6() {
  useSEO({
    title: 'Manual Handling Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your manual handling knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../manual-handling-course"
      description={
        'Put your manual handling knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../manual-handling-mock-exam"
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
