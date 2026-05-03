import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  HubCard,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

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
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Exam day',
    title: 'Exam strategies',
    slug: 'exam-strategies',
    description:
      'Time allocation, multiple-choice tactics, written-answer structure, and how to recover from a question you can\'t answer.',
    meta: '7 min read',
    tone: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'Practice',
    title: 'Learning & revision',
    slug: 'revision',
    description:
      'Past papers, flashcards, group study, mock exams — what to use when, and the techniques that move marks the most.',
    meta: '8 min read',
    tone: 'amber',
  },
  {
    number: '04',
    eyebrow: 'Time',
    title: 'Study time management',
    slug: 'study-time',
    description:
      'Fitting study around 40-hour work weeks. Realistic schedules, micro-sessions, the tools that work and the ones that don\'t.',
    meta: '6 min read',
    tone: 'purple',
  },
  {
    number: '05',
    eyebrow: 'Where to look',
    title: 'Resources',
    slug: 'resources',
    description:
      'Best textbooks, free online resources, podcasts, YouTube channels, and the apps that genuinely help (and the ones that just gamify procrastination).',
    meta: '6 min read',
    tone: 'orange',
  },
  {
    number: '06',
    eyebrow: 'Mindset',
    title: 'Study psychology',
    slug: 'psychology',
    description:
      'Motivation when you\'re tired, dealing with imposter syndrome, building habits that survive a long apprenticeship.',
    meta: '7 min read',
    tone: 'cyan',
  },
];

const StudyTips = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Study"
          title="How to actually study"
          description="School might have taught you to revise — apprenticeship needs you to learn. Different game. The techniques that work for adults studying after a 9-hour shift on site."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Sections" title="Six chapters" />
        <HubGrid columns={3}>
          {SECTIONS.map((s) => (
            <HubCard
              key={s.slug}
              number={s.number}
              eyebrow={s.eyebrow}
              title={s.title}
              description={s.description}
              meta={s.meta}
              tone={s.tone}
              onClick={() => navigate(`/apprentice/toolbox/study-tips/${s.slug}`)}
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
};

export default StudyTips;
