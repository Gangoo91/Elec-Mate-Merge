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
    description: 'Matches the standard required by confined spaces awareness assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding confined spaces', count: 40 },
  { module: 'Module 2', name: 'Legislation & risk assessment', count: 40 },
  { module: 'Module 3', name: 'Hazards & atmospheric monitoring', count: 40 },
  { module: 'Module 4', name: 'Safe entry & working procedures', count: 40 },
  { module: 'Module 5', name: 'Emergency & rescue procedures', count: 40 },
];

const preparationTips = [
  {
    title: 'Know the Confined Spaces Regulations 1997',
    description:
      'Understand Regulations 1 to 5, the duties they impose, and how they link to the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999.',
  },
  {
    title: 'Learn the atmospheric limits',
    description:
      'Oxygen depletion below 19.5%, oxygen enrichment above 23.5%, and the occupational exposure limits for common toxic gases such as hydrogen sulphide, carbon monoxide and carbon dioxide.',
  },
  {
    title: 'Understand the hierarchy of controls',
    description:
      'Avoid entry wherever possible, then implement a safe system of work, then arrange emergency procedures. Know real examples of each level and why avoidance is always preferred.',
  },
  {
    title: 'Master the permit-to-work process',
    description:
      'Understand when a permit is required, what it must contain, the roles of authorised persons, competent persons and entrants, and the full permit lifecycle from issue to cancellation.',
  },
  {
    title: 'Know your rescue equipment',
    description:
      'Tripods, winches, davit systems, breathing apparatus, stretchers and communication equipment. Understand the difference between non-entry rescue and entry rescue, and why non-entry is always preferred.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function ConfinedSpacesModule6() {
  useSEO({
    title: 'Confined spaces awareness mock exam | Module 6 | Elec-Mate',
    description:
      'Test your confined spaces awareness knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../confined-spaces-course"
      description={
        'Put your confined spaces awareness knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../confined-spaces-mock-exam"
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
