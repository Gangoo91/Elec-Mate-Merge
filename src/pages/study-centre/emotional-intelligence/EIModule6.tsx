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
    description: 'Matches the standard required for professional development assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding emotional intelligence', count: 40 },
  { module: 'Module 2', name: 'Self-awareness', count: 40 },
  { module: 'Module 3', name: 'Self-regulation', count: 40 },
  { module: 'Module 4', name: 'Motivation & empathy', count: 40 },
  { module: 'Module 5', name: 'Social skills & applying EI', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn from Understanding EI, Self-Awareness, Self-Regulation, Motivation & Empathy, and Social Skills. Cover every module before attempting the exam.',
  },
  {
    title: "Know Goleman's five domains",
    description:
      'Self-awareness, self-regulation, motivation, empathy, and social skills. Understand the key competencies within each domain and how they build sequentially.',
  },
  {
    title: 'Understand the key frameworks',
    description:
      "Salovey & Mayer's four-branch model, Bar-On's EQ-i, the Trust Equation, Thomas-Kilmann conflict modes, and Goleman's six leadership styles are all heavily tested.",
  },
  {
    title: 'Remember the practical techniques',
    description:
      'Box breathing, the STOP technique, the DESC model, the 10-10-10 rule, cognitive reappraisal, and active listening. Know when and how to apply each one.',
  },
  {
    title: 'Apply EI to construction scenarios',
    description:
      'Many questions present site-based scenarios. Think about how EI principles apply to real situations: apprentice management, client conversations, subcontractor relationships, and safety culture.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function EIModule6() {
  useSEO({
    title: 'Emotional Intelligence Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your emotional intelligence knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../emotional-intelligence"
      description={
        'Put your emotional intelligence knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../ei-mock-exam"
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
