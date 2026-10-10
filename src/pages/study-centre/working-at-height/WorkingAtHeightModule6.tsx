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
    description: 'Matches the standard required by working at height assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding working at height', count: 40 },
  { module: 'Module 2', name: 'Access equipment & selection', count: 40 },
  { module: 'Module 3', name: 'Fall protection & prevention', count: 40 },
  { module: 'Module 4', name: 'Safe systems of work', count: 40 },
  { module: 'Module 5', name: 'Incident response & responsibilities', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn equally from Understanding Working at Height, Access Equipment, Fall Protection, Safe Systems of Work and Incident Response. Cover every module before attempting the exam.',
  },
  {
    title: 'Know the hierarchy of controls',
    description:
      'Avoid, prevent, mitigate is the core hierarchy. Understand when collective protection takes priority over personal protection and how to justify each control measure.',
  },
  {
    title: 'Understand WAH Regs 2005',
    description:
      'The Work at Height Regulations 2005 is the primary legislation. Know the key duties, what counts as working at height and how it interacts with CDM 2015 and LOLER 1998.',
  },
  {
    title: 'Remember equipment inspection requirements',
    description:
      'Know the inspection frequencies — pre-use checks, 7-day scaffold inspections, LOLER 6-monthly thorough examinations and the legal record retention periods.',
  },
  {
    title: 'Know your PPE — harness components',
    description:
      'Understand harness types, attachment points, lanyard selection, energy absorbers, anchor points and the difference between work restraint and fall arrest systems.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function WorkingAtHeightModule6() {
  useSEO({
    title: 'Working at Height Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your working at height knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../working-at-height-course"
      description={
        'Put your working at height knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../working-at-height-mock-exam"
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
