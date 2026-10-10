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
    description: 'Matches the standard required by industry assessment.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding stress', count: 40 },
  { module: 'Module 2', name: 'Understanding resilience', count: 40 },
  { module: 'Module 3', name: 'Coping strategies & mindfulness', count: 40 },
  { module: 'Module 4', name: 'Building daily resilience', count: 40 },
  { module: 'Module 5', name: 'Switching off & sustaining wellbeing', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Understanding Stress, Understanding Resilience, Coping Strategies, Building Daily Resilience and Switching Off. Cover every module before attempting the exam.',
  },
  {
    title: 'Know the stress models',
    description:
      "Selye's General Adaptation Syndrome, Lazarus & Folkman's Transactional Model and the Yerkes-Dodson Law are heavily tested. Understand eustress vs distress and the inverted-U.",
  },
  {
    title: 'Understand the HSE Management Standards',
    description:
      'The 6 HSE Management Standards (Demands, Control, Support, Relationships, Role, Change) form the legal framework for workplace stress management.',
  },
  {
    title: 'Master the mindfulness techniques',
    description:
      '3-Minute Breathing Space, Box Breathing, 5-4-3-2-1 Grounding and the Body Scan are core MBSR practices. Know when and how to use each.',
  },
  {
    title: 'Recognise burnout warning signs',
    description:
      "Maslach's 3 dimensions of burnout (exhaustion, cynicism, reduced efficacy) and the difference between burnout and acute stress are key.",
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function RSMModule6() {
  useSEO({
    title: 'Resilience & Stress Management Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your resilience and stress management knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../resilience-stress-management"
      description={
        'Put your resilience and stress management knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../rsm-mock-exam"
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
