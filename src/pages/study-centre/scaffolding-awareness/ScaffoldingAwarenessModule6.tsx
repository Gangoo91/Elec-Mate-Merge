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
    description: 'Matches the standard required by scaffolding awareness assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Introduction to scaffolding', count: 40 },
  { module: 'Module 2', name: 'Scaffold regulations & standards', count: 40 },
  { module: 'Module 3', name: 'Scaffold components & assembly', count: 40 },
  { module: 'Module 4', name: 'Scaffold inspection & tagging', count: 40 },
  { module: 'Module 5', name: 'Safe use & hazard awareness', count: 40 },
];

const preparationTips = [
  {
    title: 'Know your scaffold components',
    description:
      'Standards, ledgers, transoms, braces, ties, base plates — know what each component does and where it goes in the scaffold structure.',
  },
  {
    title: 'Understand the inspection regime',
    description:
      '7-day inspections, when else to inspect (after weather events, alterations, any event affecting stability) and who can carry out inspections.',
  },
  {
    title: 'Learn the scaffold tag system',
    description:
      'Green (safe to use), yellow (restrictions apply) and red (do not use) — know the meanings, who applies them and what to do for each.',
  },
  {
    title: 'Master TG20 basics',
    description:
      'When TG20 applies, when a designed scaffold is needed instead, the role of the NASC and how TG20 links to BS EN 12811.',
  },
  {
    title: 'Know the regulations',
    description:
      'Work at Height Regulations 2005, NASC guidance, BS EN 12811, CDM 2015 — understand the key duties and requirements from each.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function ScaffoldingAwarenessModule6() {
  useSEO({
    title: 'Scaffolding Awareness Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your scaffolding awareness knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../scaffolding-awareness-course"
      description={
        'Put your scaffolding awareness knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../scaffolding-awareness-mock-exam"
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
