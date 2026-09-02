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
    eyebrow: 'On site',
    title: 'Workplace communication',
    slug: 'workplace',
    description:
      'Talking to supervisors, joining toolbox talks, asking the right questions, handling banter without losing the plot.',
    meta: '10 min read',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'With clients',
    title: 'Professional skills',
    slug: 'professional-skills',
    description:
      'Customer-facing language, explaining technical work in plain English, writing handover notes that actually help the next sparky.',
    meta: '10 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Tough calls',
    title: 'Difficult situations',
    slug: 'difficult-situations',
    description:
      'Disagreements, complaints, unsafe instructions, mistakes you have to own — how to handle the conversations no one wants.',
    meta: '12 min read',
    tone: 'yellow',
  },
  {
    number: '04',
    eyebrow: 'Tactical',
    title: 'Tools & tips',
    slug: 'tools-tips',
    description:
      "The phrases, frameworks and small habits that make you sound — and feel — like you've been on site for years.",
    meta: '12 min read',
    tone: 'yellow',
  },
];

const CommunicationSkills = () => {
  const navigate = useNavigate();
  return (
    <HubSubPage
      title="The other half of the job"
      backTo="/apprentice/toolbox"
      description="Technical ability gets you on site — communication keeps you there. Talking to supervisors, clients, mates and the difficult-conversation people who turn up on every job."
    >
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <HubSectionHeading>Four chapters</HubSectionHeading>
        <HubToolGrid
          label=""
          columns="two"
          cards={SECTIONS.map((s) => ({
            id: s.slug,
            eyebrow: s.eyebrow,
            title: s.title,
            description: s.description,
            meta: s.meta,
            onClick: () => navigate(`/apprentice/toolbox/communication-skills/${s.slug}`),
          }))}
        />
      </motion.section>
    </HubSubPage>
  );
};

export default CommunicationSkills;
