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
    <HubSubPage
      title="The final test"
      backTo="/apprentice/toolbox"
      description="End-point assessment is the gate that turns 'apprentice' into 'electrician'. For the Installation & Maintenance Electrician (ST0152) it is the integrated AM2S, run by NET — one practical and knowledge assessment taken after Gateway. Everything you need to know, in the order you need to know it."
    >
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <HubSectionHeading>Five chapters</HubSectionHeading>
        <HubToolGrid
          label=""
          columns="two"
          cards={SECTIONS.map((s) => ({
            id: s.slug,
            eyebrow: s.eyebrow,
            title: s.title,
            description: s.description,
            meta: s.meta,
            onClick: () => navigate(`/apprentice/toolbox/end-point-assessment/${s.slug}`),
          }))}
        />
      </motion.section>
    </HubSubPage>
  );
};

export default EndPointAssessment;
