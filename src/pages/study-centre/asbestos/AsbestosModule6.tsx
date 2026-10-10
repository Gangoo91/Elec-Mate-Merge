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
    description: 'Matches the standard required by asbestos awareness assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Asbestos types & properties', count: 40 },
  { module: 'Module 2', name: 'Legislation & duty to manage', count: 40 },
  { module: 'Module 3', name: 'Identification & surveys', count: 40 },
  { module: 'Module 4', name: 'Safe working & PPE', count: 40 },
  { module: 'Module 5', name: 'Emergency procedures', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Asbestos Types, Legislation, Identification, Safe Working and Emergency Procedures. Cover every module before attempting the exam.',
  },
  {
    title: 'Know your fibre types',
    description:
      'Chrysotile (white), amosite (brown) and crocidolite (blue) are heavily tested. Understand serpentine vs amphibole groups and their relative dangers.',
  },
  {
    title: 'Understand CAR 2012',
    description:
      'The Control of Asbestos Regulations 2012 is the primary legislation. Know Regulation 4 (Duty to Manage), the three work categories and the 0.1 fibres/cm³ control limit.',
  },
  {
    title: 'Remember the 4-S response',
    description:
      'STOP, SEAL, SIGN, SUMMON is the emergency procedure for accidental disturbance. Know the detailed actions at each step and who to notify.',
  },
  {
    title: 'Know your PPE',
    description:
      'Understand RPE selection (FFP3, half-mask, full-face, powered air), assigned protection factors, face-fit testing and the 7-step decontamination sequence.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function AsbestosModule6() {
  useSEO({
    title: 'Asbestos Awareness Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your asbestos awareness knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../asbestos-awareness-course"
      description={
        'Put your asbestos awareness knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../asbestos-awareness-mock-exam"
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
