import { Clock, Target, RotateCcw, BookOpen, ShieldCheck } from 'lucide-react';

import useSEO from '@/hooks/useSEO';

import { ExamIntroShell } from '@/components/study-centre/exam-intro';
const examFeatures = [
  {
    icon: BookOpen,
    label: '210-question bank',
    description: 'Randomly selected each attempt so no two exams are the same.',
  },
  {
    icon: Target,
    label: '30 questions per exam',
    description: 'Balanced across all seven content modules for fair coverage.',
  },
  {
    icon: Clock,
    label: '60-minute timer',
    description: 'Timed under exam conditions with a 5-minute warning alert.',
  },
  {
    icon: ShieldCheck,
    label: '70% pass mark (21/30)',
    description: 'Matches the standard required by smart home installer assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Smart home fundamentals', count: 30 },
  { module: 'Module 2', name: 'Communication protocols', count: 30 },
  { module: 'Module 3', name: 'Lighting and scene programming', count: 30 },
  { module: 'Module 4', name: 'HVAC and environmental control', count: 30 },
  { module: 'Module 5', name: 'Security and access control', count: 30 },
  { module: 'Module 6', name: 'Hubs and voice assistants', count: 30 },
  { module: 'Module 7', name: 'Installation and safety', count: 30 },
];

const preparationTips = [
  {
    title: 'Review every module',
    description:
      'Questions are drawn equally from all seven content modules. Cover each before attempting the exam.',
  },
  {
    title: 'Know your protocols',
    description:
      'Zigbee vs Z-Wave, Wi-Fi, Thread and Matter are heavily tested. Understand mesh behaviour, range and power use for each.',
  },
  {
    title: 'Understand BS 7671 alignment',
    description:
      'Smart home installs still need to comply with BS 7671. Know isolation, segregation and notification requirements.',
  },
  {
    title: 'Get the architectures straight',
    description:
      'Local vs cloud vs hybrid, hub vs hubless — each has trade-offs. Know which fits which use case.',
  },
  {
    title: 'Master commissioning',
    description:
      'Device pairing, RF verification and customer handover come up frequently. Walk through the workflow before you sit down.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function SmartHomeModule8() {
  useSEO({
    title: 'Smart Home Mock Exam | Module 8 | Elec-Mate',
    description:
      'Test your smart home knowledge with a timed mock examination — 210-question bank, 30 random questions and a 60-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 8 · Final assessment"
      backTo="../smart-home-course"
      description={
        'Put your smart home knowledge to the test under timed exam conditions. Questions are drawn from a 210-question bank covering all seven content modules.'
      }
      examPath="../smart-home-mock-exam"
      stats={[
        { label: 'Questions', value: 30, sub: 'Per attempt' },
        { label: 'Time', value: '60m', sub: 'Timer enforced' },
        { label: 'Pass mark', value: '70%', sub: '21 / 30 correct' },
        { label: 'Retakes', value: '∞', sub: 'No cap' },
      ]}
      features={examFeatures}
      categories={categories}
      categoryNote={'Questions drawn from each category per exam (30 total)'}
      tips={preparationTips}
      afterNote={
        "After completing the exam you'll see a full breakdown by category, including which areas need more revision. Use this to focus your study before retaking."
      }
    />
  );
}
