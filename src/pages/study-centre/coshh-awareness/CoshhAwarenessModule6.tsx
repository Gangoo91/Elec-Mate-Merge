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
    description: 'Matches the standard required by COSHH awareness assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding COSHH', count: 40 },
  { module: 'Module 2', name: 'Legislation & risk assessment', count: 40 },
  { module: 'Module 3', name: 'Hazardous substances on site', count: 40 },
  { module: 'Module 4', name: 'Control measures & PPE', count: 40 },
  { module: 'Module 5', name: 'Monitoring, surveillance & emergencies', count: 40 },
];

const preparationTips = [
  {
    title: 'Know the COSHH Regulations 2002',
    description:
      'Understand the legal duties on employers and employees, the eight steps of a COSHH assessment, and how the regulations link to the Health and Safety at Work Act 1974.',
  },
  {
    title: 'Learn the GHS pictograms',
    description:
      'All nine GHS hazard pictograms are heavily tested. Know what each red-bordered diamond means, including health hazard, corrosive, flammable and environment symbols.',
  },
  {
    title: 'Understand routes of exposure',
    description:
      'Inhalation, ingestion, skin absorption and injection — know which route is most common in construction and why respiratory protection is often the priority.',
  },
  {
    title: 'Master the hierarchy of control',
    description:
      'Elimination, substitution, engineering controls, administrative controls, then PPE. Know real examples of each level and why PPE is always the last resort.',
  },
  {
    title: 'Know your RPE & PPE',
    description:
      'Understand assigned protection factors, the difference between filtering and supplied-air RPE, face-fit testing requirements, and how to select the right gloves for different chemicals.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function CoshhAwarenessModule6() {
  useSEO({
    title: 'COSHH Awareness Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your COSHH awareness knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../coshh-awareness-course"
      description={
        'Put your COSHH awareness knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../coshh-awareness-mock-exam"
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
