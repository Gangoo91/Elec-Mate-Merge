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
    eyebrow: 'What it is',
    title: 'EPA components',
    slug: 'components',
    description:
      'The AM2S — the integrated practical and knowledge assessment run by NET. What each section tests and how they fit together.',
    meta: '10 min read',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'How it scores',
    title: 'Grading & results',
    slug: 'grading',
    description:
      'How the AM2S is marked, results, re-sits if needed, and what passing means for your career.',
    meta: '8 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Get ready',
    title: 'Preparation guide',
    slug: 'preparation',
    description:
      'How to revise the applied-knowledge test and rehearse every AM2S section — without burning out in the last fortnight.',
    meta: '10 min read',
    tone: 'yellow',
  },
  {
    number: '04',
    eyebrow: 'Sign-off',
    title: 'Gateway & readiness',
    slug: 'gateway',
    description:
      "What gateway sign-off requires, how to know you're ready, and what to do if your tutor or employer disagrees with your verdict.",
    meta: '8 min read',
    tone: 'yellow',
  },
  {
    number: '05',
    eyebrow: 'War stories',
    title: 'Mistakes, tips & FAQs',
    slug: 'tips',
    description:
      'The things people fail on most, the small habits that pay off on the day, and answers to the questions every apprentice asks.',
    meta: '7 min read',
    tone: 'yellow',
  },
];

const EndPointAssessment = () => {
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
          eyebrow="Apprentice · EPA"
          title="The final test"
          description="End-point assessment is the gate that turns 'apprentice' into 'electrician'. For the Installation & Maintenance Electrician (ST0152) it is the integrated AM2S, run by NET — one practical and knowledge assessment taken after Gateway. Everything you need to know, in the order you need to know it."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Sections" title="Five chapters" />
        <HubGrid columns={2}>
          {SECTIONS.map((s) => (
            <HubCard
              key={s.slug}
              number={s.number}
              eyebrow={s.eyebrow}
              title={s.title}
              description={s.description}
              meta={s.meta}
              tone={s.tone}
              onClick={() => navigate(`/apprentice/toolbox/end-point-assessment/${s.slug}`)}
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
};

export default EndPointAssessment;
