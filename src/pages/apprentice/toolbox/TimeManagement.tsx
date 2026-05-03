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
    title: 'Time fundamentals',
    slug: 'fundamentals',
    description:
      'Where the time goes — site, study, college, life. A real picture of a 168-hour week and where the slack actually lives.',
    meta: '7 min read',
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Plan',
    title: 'Schedule planning',
    slug: 'scheduling',
    description:
      'Weekly + monthly planning that survives a real apprenticeship. Calendars, reminders, the day you reset everything that drifted.',
    meta: '7 min read',
    tone: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'Pressure',
    title: 'Stress & wellbeing',
    slug: 'stress',
    description:
      'Spotting overload before it tips into burnout. Practical techniques that work on site, not just in mindfulness apps.',
    meta: '8 min read',
    tone: 'amber',
  },
  {
    number: '04',
    eyebrow: 'Life',
    title: 'Work-life balance',
    slug: 'balance',
    description:
      'Family, partners, mates, hobbies — keeping the rest of your life going while doing a 4-year apprenticeship.',
    meta: '6 min read',
    tone: 'purple',
  },
  {
    number: '05',
    eyebrow: 'Output',
    title: 'Productivity tools',
    slug: 'productivity',
    description:
      'Apps, methods, paper systems — what actually helps and what just makes you feel like you\'re working without doing the work.',
    meta: '6 min read',
    tone: 'orange',
  },
  {
    number: '06',
    eyebrow: 'Try it',
    title: 'Interactive tools',
    slug: 'interactive',
    description:
      'Built-in tools — workload calculator, study planner, energy audit — to help you map your actual week against the time you\'ve got.',
    meta: '5 min read',
    tone: 'cyan',
  },
];

const TimeManagement = () => {
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
          eyebrow="Apprentice · Balance"
          title="There are 168 hours in a week"
          description="40 on site. 8 of OJT. Some study. Some sleep. Some life. The maths only works if you're honest about where the time actually goes — and ruthless about what you protect."
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
              onClick={() =>
                navigate(`/apprentice/toolbox/time-management/${s.slug}`)
              }
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
};

export default TimeManagement;
