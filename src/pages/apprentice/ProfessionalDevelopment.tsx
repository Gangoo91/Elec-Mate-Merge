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
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Professional Development"
          title="Build your future"
          description="Technical skills get you the job — professional skills build the career. Explore pathways, certifications, soft skills and the industry connections that shape what comes next."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Explore" title="Five sections" />
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
              onClick={() => navigate(`/apprentice/professional-development/${s.slug}`)}
            />
          ))}
        </HubGrid>
      </motion.section>

      <motion.div variants={itemVariants} className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-[11.5px] leading-relaxed text-white/60 max-w-3xl">
          Based on UK industry data, ESFA guidance and IET / ECA professional standards. Career and
          salary information reflects current UK averages — may vary by region, employer and
          experience level.
        </p>
      </motion.div>
    </PageFrame>
  );
}
