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
    description: 'Matches the standard required by CSCS HS&E test assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Introduction to CSCS & the HS&E test', count: 40 },
  { module: 'Module 2', name: 'General health & safety', count: 40 },
  { module: 'Module 3', name: 'Working at height & manual handling', count: 40 },
  { module: 'Module 4', name: 'Hazardous substances & environmental', count: 40 },
  { module: 'Module 5', name: 'Specialist knowledge & site safety', count: 40 },
];

const preparationTips = [
  {
    title: 'Understand the CSCS card scheme',
    description:
      'Know the different card types, colour codes, who needs which card, and the application process. The HS&E test is a mandatory requirement for all CSCS card applications.',
  },
  {
    title: 'Master the risk assessment process',
    description:
      'The 5-step risk assessment process and the hierarchy of controls appear frequently in the HS&E test. Understand each step and be able to apply them to realistic site scenarios.',
  },
  {
    title: 'Know your PPE',
    description:
      'Understand the different types of PPE, when each is required, correct fitting and maintenance, and the split of responsibilities between employers and employees under the PPE Regulations 2022.',
  },
  {
    title: 'Learn the key regulations',
    description:
      'HASAWA 1974, CDM 2015, COSHH 2002, Work at Height Regulations 2005, and Manual Handling Operations Regulations 1992. Know the key duties and requirements of each.',
  },
  {
    title: 'Study behavioural case studies',
    description:
      'The HS&E test includes scenario-based questions about what you should do in specific situations. Practise identifying the safest course of action rather than the quickest.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question — answer what you can confidently first.',
  },
];

export default function CscsCardModule6() {
  useSEO({
    title: 'CSCS Card Preparation Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your CSCS HS&E knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../cscs-card-course"
      description={
        'Put your CSCS HS&E knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../cscs-card-mock-exam"
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
