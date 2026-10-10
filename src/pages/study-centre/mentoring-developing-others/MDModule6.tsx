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
    description: 'Matches the standard expected for ILM coaching and mentoring assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'How people learn', count: 40 },
  { module: 'Module 2', name: "The mentor's toolkit", count: 40 },
  { module: 'Module 3', name: 'Supporting apprentices', count: 40 },
  { module: 'Module 4', name: 'Assessment & evaluation', count: 40 },
  { module: 'Module 5', name: 'Challenging situations', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      "Questions are drawn from How People Learn, The Mentor's Toolkit, Supporting Apprentices, Assessment & Evaluation, and Challenging Situations. Cover every module before attempting the exam.",
  },
  {
    title: 'Know your learning theories',
    description:
      "Knowles' andragogy, Kolb's cycle, Bloom's Taxonomy, Vygotsky's ZPD, and Honey & Mumford learning styles are heavily tested. Understand the key principles and how they apply to mentoring on site.",
  },
  {
    title: 'Master the mentoring models',
    description:
      "The GROW model, Pendleton's Rules, SBI feedback model, Johari Window, and Kirkpatrick's four levels appear frequently. Know the steps in each model and when to use them.",
  },
  {
    title: 'Understand the JIB framework',
    description:
      'JIB 4-stage apprenticeship structure, ECS grade progression, AM2 assessment, NVQ evidence types and VACSR principles. These practical topics form a significant portion of the question bank.',
  },
  {
    title: 'Remember key legislation',
    description:
      'HSWA 1974 Section 2(2)(c), CDM 2015 Regulation 13, Electricity at Work Regulations 1989 Regulation 16, MHSWR 1999 Regulation 13, and Equality Act 2010 protected characteristics all feature in questions.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function MDModule6() {
  useSEO({
    title: 'Mentoring & developing others mock exam | Module 6 | Elec-Mate',
    description:
      'Test your mentoring knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../mentoring-developing-others"
      description={
        'Put your mentoring knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../md-mock-exam"
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
