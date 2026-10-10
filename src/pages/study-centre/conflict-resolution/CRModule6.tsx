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
    description: 'Matches the standard required by industry assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding conflict', count: 40 },
  { module: 'Module 2', name: 'Communication for difficult conversations', count: 40 },
  { module: 'Module 3', name: 'Resolving client disputes', count: 40 },
  { module: 'Module 4', name: 'Site & workplace conflicts', count: 40 },
  { module: 'Module 5', name: 'Prevention & professional relationships', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Understanding Conflict, Communication, Client Disputes, Site Conflicts and Prevention. Cover every module before attempting the exam.',
  },
  {
    title: 'Know your conflict styles',
    description:
      'The Thomas-Kilmann model — competing, collaborating, compromising, avoiding, accommodating — appears throughout. Be able to identify each style from a scenario.',
  },
  {
    title: 'Master the frameworks',
    description:
      'Crucial Conversations (STATE, mutual purpose), Nonviolent Communication (observation, feelings, needs, requests) and the SBI feedback model are heavily tested.',
  },
  {
    title: 'Understand the legal rights',
    description:
      'The Late Payment Act 1998, Consumer Rights Act 2015 and Construction Act 1996 each give you specific rights. Know the key provisions and time limits.',
  },
  {
    title: 'Know de-escalation techniques',
    description:
      'Verbal Judo principles, the amygdala hijack, the 24-hour rule and the Positive No are practical tools you should be able to apply to scenarios.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function CRModule6() {
  useSEO({
    title: 'Conflict Resolution Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your conflict resolution knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../conflict-resolution"
      description={
        'Put your conflict resolution knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../cr-mock-exam"
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
