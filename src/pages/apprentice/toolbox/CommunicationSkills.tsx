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
    eyebrow: 'On site',
    title: 'Workplace communication',
    slug: 'workplace',
    description:
      'Talking to supervisors, joining toolbox talks, asking the right questions, handling banter without losing the plot.',
    meta: '10 min read',
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'With clients',
    title: 'Professional skills',
    slug: 'professional-skills',
    description:
      'Customer-facing language, explaining technical work in plain English, writing handover notes that actually help the next sparky.',
    meta: '10 min read',
    tone: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'Tough calls',
    title: 'Difficult situations',
    slug: 'difficult-situations',
    description:
      'Disagreements, complaints, unsafe instructions, mistakes you have to own — how to handle the conversations no one wants.',
    meta: '12 min read',
    tone: 'amber',
  },
  {
    number: '04',
    eyebrow: 'Tactical',
    title: 'Tools & tips',
    slug: 'tools-tips',
    description:
      "The phrases, frameworks and small habits that make you sound — and feel — like you've been on site for years.",
    meta: '12 min read',
    tone: 'purple',
  },
];

const CommunicationSkills = () => {
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
          eyebrow="Apprentice · Communication"
          title="The other half of the job"
          description="Technical ability gets you on site — communication keeps you there. Talking to supervisors, clients, mates and the difficult-conversation people who turn up on every job."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Sections" title="Four chapters" />
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
              onClick={() =>
                navigate(`/apprentice/toolbox/communication-skills/${s.slug}`)
              }
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
};

export default CommunicationSkills;
