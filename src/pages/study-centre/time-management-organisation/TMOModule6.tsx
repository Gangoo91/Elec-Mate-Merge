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
  { module: 'Module 1', name: 'Understanding time management', count: 40 },
  { module: 'Module 2', name: 'Planning & scheduling', count: 40 },
  { module: 'Module 3', name: 'Focus & productivity', count: 40 },
  { module: 'Module 4', name: 'Organisation & admin', count: 40 },
  { module: 'Module 5', name: 'Building lasting habits', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Understanding Time Management, Planning, Focus, Organisation and Building Habits. Cover every module before attempting the exam.',
  },
  {
    title: 'Know the priority frameworks',
    description:
      "The Eisenhower Matrix (urgent/important), Covey's Big Rocks and the 80/20 Rule are core tools — understand when to use each.",
  },
  {
    title: 'Master the GTD method',
    description:
      "David Allen's five steps — capture, clarify, organise, reflect, engage — are heavily tested. Know how each step works in practice.",
  },
  {
    title: 'Understand focus techniques',
    description:
      "Cal Newport's Deep Work, the Pomodoro Technique and Parkinson's Law all appear regularly. Know the timings, principles and trade-offs.",
  },
  {
    title: 'Know the science of habits',
    description:
      "James Clear's habit loop and the 4 Laws of Behaviour Change form the foundation of building lasting routines.",
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function TMOModule6() {
  useSEO({
    title: 'Time Management & Organisation Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your time management and organisation knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../time-management-organisation"
      description={
        'Put your time management and organisation knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../tmo-mock-exam"
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
