import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { itemVariants, type Tone } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { HubToolGrid, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

interface Section {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  slug: string;
  meta: string;
  tone: Tone;
}

const SECTIONS: Section[] = [
  {
    number: '01',
    eyebrow: 'Career',
    title: 'Career pathways',
    description:
      'Map the full progression from improver to design engineer — what roles exist, what they pay, and how to step up.',
    slug: 'career-pathways',
    meta: '10 min read',
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Qualifications',
    title: 'Certifications',
    description:
      'JIB grades, ECS card routes, BS 7671 amendments and the qualifications that move your earning ceiling.',
    slug: 'certifications',
    meta: '12 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Soft skills',
    title: 'Professional skills',
    description:
      'The communication, planning and customer-handling that separates a good electrician from a great one.',
    slug: 'professional-skills',
    meta: '10 min read',
    tone: 'emerald',
  },
  {
    number: '04',
    eyebrow: 'CPD',
    title: 'Continuing education',
    description:
      'Stay current — A4:2026 changes, EV charging, solar PV, smart homes, and the upskilling that pays.',
    slug: 'continuing-education',
    meta: '12 min read',
    tone: 'purple',
  },
  {
    number: '05',
    eyebrow: 'Network',
    title: 'Industry networking',
    description:
      'Trade bodies, conferences, mentor programmes and the rooms where progression actually happens.',
    slug: 'industry-networking',
    meta: '8 min read',
    tone: 'orange',
  },
];

export default function ProfessionalDevelopment() {
  const navigate = useNavigate();

  return (
    <HubSubPage
      title="Build your future"
      backTo="/apprentice"
      description="Pathways, certifications, soft skills and the industry connections that shape what comes after your apprenticeship."
    >
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <HubSectionHeading>Five sections</HubSectionHeading>
        <HubToolGrid
          label=""
          columns="two"
          cards={SECTIONS.map((s) => ({
            id: s.slug,
            eyebrow: s.eyebrow,
            title: s.title,
            description: s.description,
            meta: s.meta,
            onClick: () => navigate(`/apprentice/professional-development/${s.slug}`),
          }))}
        />
      </motion.section>

      <motion.div
        variants={itemVariants}
        className={cn(
          'rounded-2xl border border-elec-yellow/35 px-5 py-4 sm:px-6 sm:py-5',
          CARD_SURFACE
        )}
      >
        <p className="text-[11.5px] leading-relaxed text-white max-w-3xl">
          Based on UK industry data, DfE apprenticeship guidance and IET / ECA professional
          standards. Career and salary information reflects current UK averages — may vary by
          region, employer and experience level.
        </p>
      </motion.div>
    </HubSubPage>
  );
}
