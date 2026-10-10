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
    description: 'Matches the standard required by fire safety awareness assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding fire', count: 40 },
  { module: 'Module 2', name: 'Fire safety legislation', count: 40 },
  { module: 'Module 3', name: 'Fire prevention & detection', count: 40 },
  { module: 'Module 4', name: 'Fire marshal duties & evacuation', count: 40 },
  { module: 'Module 5', name: 'Firefighting equipment & incident response', count: 40 },
];

const preparationTips = [
  {
    title: 'Know the Regulatory Reform Order',
    description:
      'RRFSO 2005 structure, articles, responsible person duties, and relationship to other fire safety legislation.',
  },
  {
    title: 'Learn the fire classes',
    description:
      'Know all 6 classes (A-F), examples of each, and which extinguisher types are suitable (including which ones must NEVER be used on certain classes).',
  },
  {
    title: 'Understand detection standards',
    description:
      'BS 5839 Part 1 category system (L1-L5, P1-P2), detector types, and where each is appropriate.',
  },
  {
    title: 'Master evacuation strategies',
    description:
      'Simultaneous, phased, progressive horizontal and defend-in-place strategies, PEEPs, refuges and the role of fire marshals.',
  },
  {
    title: 'Know your extinguishers',
    description:
      'Colour codes (BS EN 3), operating procedures (PASS technique), placement rules and maintenance requirements.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function FireSafetyModule6() {
  useSEO({
    title: 'Fire Safety & Fire Marshal Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your fire safety and fire marshal knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../fire-safety-course"
      description={
        'Put your fire safety and fire marshal knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../fire-safety-mock-exam"
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
