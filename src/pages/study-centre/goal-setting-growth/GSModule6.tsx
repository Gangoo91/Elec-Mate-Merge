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
    description: 'Matches industry assessment standards for self-development training.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding goals & growth mindset', count: 40 },
  { module: 'Module 2', name: 'Setting effective goals', count: 40 },
  { module: 'Module 3', name: 'Building habits that stick', count: 40 },
  { module: 'Module 4', name: 'Tracking progress & continuous improvement', count: 40 },
  { module: 'Module 5', name: 'Your growth action plan', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Mindset, Effective Goals, Habits, Tracking Progress, and Action Plan. Cover every module before attempting the exam.',
  },
  {
    title: 'Know the SMART framework',
    description:
      'Specific, Measurable, Achievable, Relevant, Time-bound — be able to apply it to apprentice, qualified electrician and business owner scenarios.',
  },
  {
    title: 'Understand habit formation',
    description:
      'The habit loop (cue, routine, reward), the 4 Laws of Behavior Change, habit stacking and the 20-second rule are heavily tested.',
  },
  {
    title: 'Remember the trade-specific frameworks',
    description:
      'JIB pathway, ECS cards, IET registration, NICEIC/NAPIT assessments, BS 7671 amendments and CITB grants — know how each fits CPD planning.',
  },
  {
    title: 'Master mindset & motivation theory',
    description:
      "Carol Dweck's growth mindset, Locke & Latham goal setting, Angela Duckworth's grit, Pink's autonomy/mastery/purpose and the comfort-zone model.",
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function GSModule6() {
  useSEO({
    title: 'Goal Setting & Growth mock exam | Module 6 | Elec-Mate',
    description:
      'Test your goal setting and continuous growth knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../goal-setting-growth"
      description={
        'Put your goal setting and continuous growth knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../gs-mock-exam"
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
