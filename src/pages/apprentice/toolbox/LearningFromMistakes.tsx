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
    eyebrow: 'Categories',
    title: 'Mistake categories',
    slug: 'categories',
    description:
      'Technical, judgment, communication, attitude — different mistakes need different responses. Knowing which kind you made is half the recovery.',
    meta: '8 min read',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'Recovery',
    title: 'Recovery strategies',
    slug: 'recovery',
    description:
      "How to own it, fix it, and move on without losing trust. The script for talking to a supervisor when you've got bad news.",
    meta: '7 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Resilience',
    title: 'Building resilience',
    slug: 'resilience',
    description:
      'Mistakes will keep happening — your job is to keep going. The mental habits that turn setbacks into the next bit of competence.',
    meta: '7 min read',
    tone: 'yellow',
  },
  {
    number: '04',
    eyebrow: 'Real stories',
    title: 'Case studies',
    slug: 'case-studies',
    description:
      'Anonymised real-world cases — what happened, what they did, what came of it. The kind of war stories you only normally hear at the pub.',
    meta: '9 min read',
    tone: 'yellow',
  },
  {
    number: '05',
    eyebrow: 'Stay sharp',
    title: 'Prevention strategies',
    slug: 'prevention',
    description:
      'The habits that catch mistakes before they happen — checks, pauses, the moment to ask the dumb question.',
    meta: '6 min read',
    tone: 'yellow',
  },
  {
    number: '06',
    eyebrow: 'Help',
    title: 'Support systems',
    slug: 'support',
    description:
      'Who to talk to when things go wrong — supervisor, training provider, college tutor, mental health support, peer networks.',
    meta: '5 min read',
    tone: 'yellow',
  },
];

const LearningFromMistakes = () => {
  const navigate = useNavigate();
  return (
    <HubSubPage
      title="Everyone makes mistakes"
      backTo="/apprentice/toolbox"
      description="What separates a good electrician from a struggling one isn't fewer mistakes — it's how they handle them. Owning errors, learning fast, getting back to work."
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
            onClick: () => navigate(`/apprentice/toolbox/learning-from-mistakes/${s.slug}`),
          }))}
        />
      </motion.section>
    </HubSubPage>
  );
};

export default LearningFromMistakes;
