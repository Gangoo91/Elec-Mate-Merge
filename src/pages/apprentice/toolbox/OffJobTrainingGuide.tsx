import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
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
    eyebrow: 'Definition',
    title: 'What counts as OJT',
    slug: 'what-counts',
    description:
      'College days, structured learning, mentor sessions, e-learning, projects, research — what counts towards the 20% and what doesn\'t.',
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
      'Mapping your OJT across the 4 years — front-loading, exam terms, project deadlines and how to keep the 20% spread sensibly.',
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
      'You\'re entitled to OJT during paid hours. What to do if your employer pushes back, books college days as holiday, or doesn\'t plan it.',
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
          title="The 20% rule"
          description="Off-the-job training is a legal requirement — at least 20% of your contracted working hours. Done right, it's where most of your real progression happens. Done badly, it's the thing that derails apprenticeships."
          tone="yellow"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-elec-yellow/20 bg-elec-yellow/[0.04]">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                Quick maths
              </span>
            </div>
            <p className="text-[13px] text-white/85 leading-relaxed">
              On a 40-hour week, 20% is 8 hours. Across a 48-week working year, that's 384 hours of
              OJT — roughly one full day per week, or a structured block of college time. Anything
              less than this isn't a compliant apprenticeship.
            </p>
          </CardContent>
        </Card>
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
              onClick={() =>
                navigate(`/apprentice/toolbox/off-job-training-guide/${s.slug}`)
              }
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
};

export default OffJobTrainingGuide;
