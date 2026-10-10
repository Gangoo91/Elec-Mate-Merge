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
    description: 'Matches the standard required by MHFA training assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Mental health fundamentals', count: 40 },
  { module: 'Module 2', name: 'Depression, anxiety & stress', count: 40 },
  { module: 'Module 3', name: 'Substance misuse, self-harm & suicide', count: 40 },
  { module: 'Module 4', name: 'Psychosis, eating disorders & complex needs', count: 40 },
  { module: 'Module 5', name: 'Workplace implementation & wellbeing', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn from Mental Health Fundamentals, Depression & Anxiety, Substance Misuse & Suicide, Psychosis & Complex Needs, and Workplace Implementation. Cover every module before attempting the exam.',
  },
  {
    title: 'Know the ALGEE action plan',
    description:
      'Approach, Listen, Give support, Encourage professional help, Encourage other supports. This framework underpins the entire MHFA approach and is heavily tested.',
  },
  {
    title: 'Understand the legal framework',
    description:
      'The Health and Safety at Work Act 1974, Equality Act 2010 (mental health as disability), HSE Management Standards, and the Thriving at Work core standards. Know what employers must do.',
  },
  {
    title: 'Remember key statistics and warning signs',
    description:
      '1 in 4 adults experience mental health problems each year. Construction has the highest suicide rate of any UK industry (3.7x the national average). Know the risk factors and protective factors.',
  },
  {
    title: 'Master crisis intervention',
    description:
      'The TASC model (Tell, Ask, Safety plan, Call), when to call 999, how to ask about suicide directly, safety planning, and key helpline numbers (Samaritans 116 123, SHOUT 85258).',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function MentalHealthModule6() {
  useSEO({
    title: 'Mental Health First Aid mock exam | Module 6 | Elec-Mate',
    description:
      'Test your Mental Health First Aid knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../mental-health-course"
      description={
        'Put your Mental Health First Aid knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../mental-health-mock-exam"
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
