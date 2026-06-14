import { useState } from 'react';
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
import {
  OTJ_STANDARDS,
  DEFAULT_OTJ_STANDARD,
  OTJ_HOURS_FLOOR,
  getOtjStandard,
} from '@/data/otjStandards';

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
    eyebrow: 'Definition',
    title: 'What counts as OJT',
    slug: 'what-counts',
    description:
      "College days, structured learning, mentor sessions, e-learning, projects, research — what counts towards your fixed OJT hours and what doesn't.",
    meta: '5 min read',
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Records',
    title: 'Evidence collection',
    slug: 'evidence',
    description:
      'How to log OJT hours so they stand up to audit — formats, time-stamps, witness sign-offs, what your training provider needs.',
    meta: '6 min read',
    tone: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'Plan',
    title: 'Planning your training',
    slug: 'planning',
    description:
      'Mapping your OJT across the programme — front-loading, exam terms, project deadlines and how to keep your required hours spread sensibly.',
    meta: '5 min read',
    tone: 'amber',
  },
  {
    number: '04',
    eyebrow: 'Methods',
    title: 'Delivery methods',
    slug: 'delivery',
    description:
      'In-person college, day-release, block release, e-learning, work-based projects — what each looks like and when each works best.',
    meta: '6 min read',
    tone: 'purple',
  },
  {
    number: '05',
    eyebrow: 'Rights',
    title: 'Your rights',
    slug: 'rights',
    description:
      "You're entitled to OJT during paid hours. What to do if your employer pushes back, books college days as holiday, or doesn't plan it.",
    meta: '5 min read',
    tone: 'red',
  },
  {
    number: '06',
    eyebrow: 'EPA',
    title: 'Assessment & EPA',
    slug: 'assessment',
    description:
      'How OJT records feed into gateway, what your assessor checks, and how to avoid the missing-hours panic two months out.',
    meta: '7 min read',
    tone: 'orange',
  },
  {
    number: '07',
    eyebrow: 'Reference',
    title: 'FAQs & glossary',
    slug: 'faqs',
    description:
      'Lunch breaks, travel time, voluntary courses, sick days — answers to the boundary questions every apprentice asks.',
    meta: '5 min read',
    tone: 'cyan',
  },
];

const OffJobTrainingGuide = () => {
  const navigate = useNavigate();
  const [stdCode, setStdCode] = useState(DEFAULT_OTJ_STANDARD.code);
  const selected = getOtjStandard(stdCode) ?? DEFAULT_OTJ_STANDARD;
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
          eyebrow="Apprentice · OJT"
          title="Off-the-job training"
          description="Off-the-job training is a legal requirement. Since August 2025 it is a fixed number of hours set by your apprenticeship standard, delivered during paid working time over a provider-agreed timeframe (minimum 8-month practical period). Done right, it's where most of your real progression happens."
          tone="yellow"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="sm:rounded-xl sm:border sm:border-elec-yellow/20 sm:bg-elec-yellow/[0.04] sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Your fixed hours
          </span>
          <label htmlFor="otj-standard" className="text-[11.5px] text-white/70 block">
            Choose your apprenticeship standard to see your target:
          </label>
          <select
            id="otj-standard"
            value={stdCode}
            onChange={(e) => setStdCode(e.target.value)}
            className="h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
          >
            {OTJ_STANDARDS.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} (Level {s.level})
              </option>
            ))}
          </select>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-semibold tabular-nums text-elec-yellow leading-none">
              {selected.otjHours.toLocaleString()}
            </span>
            <span className="text-[13px] text-white/85">hours total · {selected.code}</span>
          </div>
          <p className="text-[13px] text-white/85 leading-relaxed">
            That is the total set in your training plan — not a weekly percentage. Over a typical
            programme it averages roughly 5-6 hours a week, commonly delivered as one college day a
            week or block release. The legal test is the total fixed hours, with an absolute floor
            of {OTJ_HOURS_FLOOR} hours that delivery can never fall below.
          </p>
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Sections" title="Seven chapters" />
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
              onClick={() => navigate(`/apprentice/toolbox/off-job-training-guide/${s.slug}`)}
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
};

export default OffJobTrainingGuide;
