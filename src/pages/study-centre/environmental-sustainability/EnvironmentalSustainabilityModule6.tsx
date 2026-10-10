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
    description: 'Matches the standard required by environmental awareness assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Environmental awareness', count: 40 },
  { module: 'Module 2', name: 'Waste management', count: 40 },
  { module: 'Module 3', name: 'Energy & resource efficiency', count: 40 },
  { module: 'Module 4', name: 'Pollution prevention', count: 40 },
  { module: 'Module 5', name: 'Biodiversity & best practice', count: 40 },
];

const preparationTips = [
  {
    title: 'Know the key legislation',
    description:
      'Environmental Protection Act 1990, Environment Act 2021, Clean Air Act, Wildlife and Countryside Act 1981, and the duty of care for waste.',
  },
  {
    title: 'Learn the waste hierarchy',
    description:
      'The five steps (prevention, reuse, recycling, recovery, disposal) and how to apply them. Know the difference between hazardous and non-hazardous waste classifications.',
  },
  {
    title: 'Understand pollution controls',
    description:
      'Dust suppression, silt management, oil containment, noise limits, Section 61 consents, and incident response procedures for environmental spills.',
  },
  {
    title: 'Master energy & resource topics',
    description:
      'Scope 1, 2 and 3 carbon emissions, energy monitoring on site, water conservation methods, and how to choose sustainable materials with lower embodied carbon.',
  },
  {
    title: 'Know biodiversity requirements',
    description:
      'Protected species (bats, newts, badgers), when ecological surveys are needed, BREEAM rating categories, and the ISO 14001 environmental management framework.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function EnvironmentalSustainabilityModule6() {
  useSEO({
    title: 'Environmental & Sustainability Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your environmental and sustainability knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../environmental-sustainability-course"
      description={
        'Put your environmental and sustainability knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../environmental-sustainability-mock-exam"
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
