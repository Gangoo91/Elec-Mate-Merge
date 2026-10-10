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
    description: 'Matches the standard required by first aid training assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: "First aider's role & legislation", count: 40 },
  { module: 'Module 2', name: 'CPR, AED & choking', count: 40 },
  { module: 'Module 3', name: 'Bleeding, burns & shock', count: 40 },
  { module: 'Module 4', name: 'Medical emergencies & environmental conditions', count: 40 },
  { module: 'Module 5', name: 'Injuries, specific conditions & workplace protocol', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn from Legislation, CPR & AED, Bleeding & Burns, Medical Emergencies, and Injuries & Protocol. Cover every module before attempting the exam.',
  },
  {
    title: 'Know your CPR ratios and depths',
    description:
      'Adult CPR: 30 compressions to 2 breaths, 100-120 per minute, 5-6 cm depth. AED pad placement, choking technique and recovery position steps are heavily tested.',
  },
  {
    title: 'Understand the legal framework',
    description:
      'The Health and Safety (First-Aid) Regulations 1981, RIDDOR 2013, COSHH 2002, and BS 8599-1:2019 first aid kit contents. Know the difference between FAW and EFAW.',
  },
  {
    title: 'Remember key treatments',
    description:
      'Burns: cool for 20 minutes. Bleeding: direct pressure. Shock: lie flat, raise legs. Anaphylaxis: adrenaline auto-injector in outer mid-thigh. Choking: 5 back blows then 5 abdominal thrusts.',
  },
  {
    title: 'Master the emergency scenarios',
    description:
      'Heart attack (aspirin 300mg, sit up), stroke (FAST test, note time), seizures (protect, do NOT restrain), electric shock (isolate before approach), hypothermia (warm gradually).',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function FirstAidModule6() {
  useSEO({
    title: 'First Aid at Work mock exam | Module 6 | Elec-Mate',
    description:
      'Test your First Aid at Work knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../first-aid-course"
      description={
        'Put your First Aid at Work knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../first-aid-mock-exam"
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
