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
  { module: 'Module 1', name: 'Understanding your money', count: 40 },
  { module: 'Module 2', name: 'Budgeting & cash flow', count: 40 },
  { module: 'Module 3', name: 'Debt management & credit', count: 40 },
  { module: 'Module 4', name: 'Pensions & retirement', count: 40 },
  { module: 'Module 5', name: 'Protection & planning', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Understanding Your Money, Budgeting, Debt, Pensions and Protection. Cover every module before attempting the exam.',
  },
  {
    title: 'Know UK tax basics',
    description:
      'Income Tax bands, National Insurance, allowable expenses and self-assessment deadlines are heavily tested. Understand the difference between PAYE, CIS and limited company income.',
  },
  {
    title: 'Understand the pension system',
    description:
      'State Pension qualifying years, workplace auto-enrolment minimums, SIPPs and stakeholder pensions for the self-employed all appear frequently.',
  },
  {
    title: 'Remember key figures',
    description:
      'Personal allowance, NI thresholds, ISA limits, Lifetime ISA bonus, VAT registration threshold and emergency fund targets — these numbers come up often.',
  },
  {
    title: 'Know your consumer rights',
    description:
      'Section 75 protection, Consumer Credit Act rights, the Financial Ombudsman Service and HMRC Time to Pay arrangements are common exam topics.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function PFModule6() {
  useSEO({
    title: 'Personal finance mock exam | Module 6 | Elec-Mate',
    description:
      'Test your personal finance knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../personal-finance"
      description={
        'Put your personal finance knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../pf-mock-exam"
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
