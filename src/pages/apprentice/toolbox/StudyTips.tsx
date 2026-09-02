import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { itemVariants, type Tone } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { HubToolGrid, HubSectionHeading } from '@/components/hub/HubPrimitives';

interface Section {
  number: string;
  eyebrow: string;
  title: string;
  slug: string;
  description: string;
  meta: string;
  tone: Tone;
}

const SECTIONS: Section[] = [
  {
    number: '01',
    eyebrow: 'Foundations',
    title: 'Study fundamentals',
    slug: 'fundamentals',
    description:
      'How learning actually works — active recall, spaced repetition, why re-reading notes is the worst study habit going.',
    meta: '8 min read',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'Exam day',
    title: 'Exam strategies',
    slug: 'exam-strategies',
    description:
      "Time allocation, multiple-choice tactics, written-answer structure, and how to recover from a question you can't answer.",
    meta: '7 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Practice',
    title: 'Learning & revision',
    slug: 'revision',
    description:
      'Past papers, flashcards, group study, mock exams — what to use when, and the techniques that move marks the most.',
    meta: '8 min read',
    tone: 'yellow',
  },
  {
    number: '04',
    eyebrow: 'Time',
    title: 'Study time management',
    slug: 'study-time',
    description:
      "Fitting study around 40-hour work weeks. Realistic schedules, micro-sessions, the tools that work and the ones that don't.",
    meta: '6 min read',
    tone: 'yellow',
  },
  {
    number: '05',
    eyebrow: 'Where to look',
    title: 'Resources',
    slug: 'resources',
    description:
      'Best textbooks, free online resources, podcasts, YouTube channels, and the apps that genuinely help (and the ones that just gamify procrastination).',
    meta: '6 min read',
    tone: 'yellow',
  },
  {
    number: '06',
    eyebrow: 'Mindset',
    title: 'Study psychology',
    slug: 'psychology',
    description:
      "Motivation when you're tired, dealing with imposter syndrome, building habits that survive a long apprenticeship.",
    meta: '7 min read',
    tone: 'yellow',
  },
];

const StudyTips = () => {
  const navigate = useNavigate();
  return (
    <HubSubPage
      title="How to actually study"
      backTo="/apprentice/toolbox"
      description="School might have taught you to revise — apprenticeship needs you to learn. Different game. The techniques that work for adults studying after a 9-hour shift on site."
    >
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <HubSectionHeading>Six chapters</HubSectionHeading>
        <HubToolGrid
          label=""
          columns="three"
          cards={SECTIONS.map((s) => ({
            id: s.slug,
            eyebrow: s.eyebrow,
            title: s.title,
            description: s.description,
            meta: s.meta,
            onClick: () => navigate(`/apprentice/toolbox/study-tips/${s.slug}`),
          }))}
        />
      </motion.section>
    </HubSubPage>
  );
};

export default StudyTips;
