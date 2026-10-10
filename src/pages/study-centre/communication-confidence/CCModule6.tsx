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
    description: 'Matches the standard required for professional development assessments.',
  },
  {
    icon: RotateCcw,
    label: 'Unlimited retakes',
    description: 'Practise as many times as you need until you feel confident.',
  },
];

const categories = [
  { module: 'Module 1', name: 'Understanding communication', count: 40 },
  { module: 'Module 2', name: 'Listening & understanding others', count: 40 },
  { module: 'Module 3', name: 'Speaking with confidence', count: 40 },
  { module: 'Module 4', name: 'Professional writing & digital communication', count: 40 },
  { module: 'Module 5', name: 'Negotiation, persuasion & difficult conversations', count: 40 },
];

const preparationTips = [
  {
    title: 'Review all five modules',
    description:
      'Questions are drawn from Understanding Communication, Listening, Speaking with Confidence, Professional Writing and Negotiation. Cover every module before attempting the exam.',
  },
  {
    title: 'Know the key frameworks',
    description:
      "Shannon-Weaver model, Mehrabian 7-38-55 (correctly contextualised), Egan SOLER, Treasure RASA, Covey's 5 levels, Bandura's self-efficacy, DESC model, Fisher & Ury's principled negotiation, and Cialdini's six principles.",
  },
  {
    title: 'Understand communication styles',
    description:
      'The passive-aggressive-assertive continuum, Thomas Gordon I-messages, Eric Berne transactional analysis, and when to use each communication channel (verbal, written, digital).',
  },
  {
    title: 'Remember the practical techniques',
    description:
      'Active listening with RASA, box breathing for anxiety, toolbox talk structure, email etiquette, quote writing, and the preparation framework for difficult conversations.',
  },
  {
    title: 'Apply to construction scenarios',
    description:
      'Many questions present site-based scenarios. Think about how communication principles apply to real situations: toolbox talks, client conversations, subcontractor negotiations, and site documentation.',
  },
  {
    title: 'Flag and return',
    description:
      'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.',
  },
];

export default function CCModule6() {
  useSEO({
    title: 'Communication & confidence mock exam | Module 6 | Elec-Mate',
    description:
      'Test your communication & confidence knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <ExamIntroShell
      section="Module 6 · Final assessment"
      backTo="../communication-confidence"
      description={
        'Put your communication & confidence knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules.'
      }
      examPath="../cc-mock-exam"
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
