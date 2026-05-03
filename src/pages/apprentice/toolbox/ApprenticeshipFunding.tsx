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
    eyebrow: 'How it works',
    title: 'Funding models',
    slug: 'funding-models',
    description:
      'The Apprenticeship Levy, co-investment, employer-led funding — what each one is and which one applies to you.',
    meta: '8 min read',
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Top-ups',
    title: 'Grants & incentives',
    slug: 'grants',
    description:
      'CITB grants, employer incentives, and the schemes that help cover the cost of training, tools and travel.',
    meta: '7 min read',
    tone: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'Employer view',
    title: 'Employer information',
    slug: 'employer-info',
    description:
      "How your employer pays for your apprenticeship — useful for spotting whether they're funding you correctly.",
    meta: '6 min read',
    tone: 'amber',
  },
  {
    number: '04',
    eyebrow: 'Rights',
    title: 'Your rights',
    slug: 'your-rights',
    description:
      "What you should never have to pay for, what your employer must cover, and what to do if they don't.",
    meta: '5 min read',
    tone: 'red',
  },
  {
    number: '05',
    eyebrow: 'Reference',
    title: 'FAQs & glossary',
    slug: 'faqs',
    description:
      "The terms you'll hear thrown around — Levy, EPA, EPAO, ILR, Standards — explained without the jargon.",
    meta: '5 min read',
    tone: 'purple',
  },
];

const ApprenticeshipFunding = () => {
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
          eyebrow="Apprentice · Funding"
          title="How your apprenticeship is paid for"
          description="The Apprenticeship Levy, co-investment, CITB grants and government incentives — explained without the jargon. Knowing where the money comes from is how you tell whether your employer's doing it right."
          tone="yellow"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-elec-yellow/20 bg-elec-yellow/[0.04]">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                Bottom line
              </span>
            </div>
            <p className="text-[13px] text-white/85 leading-relaxed">
              You should never pay for your training, college fees, exam fees or End Point
              Assessment. If you're being asked to, something's wrong — flag it with your training
              provider, ACAS, or the National Apprenticeship Helpline.
            </p>
          </CardContent>
        </Card>
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
              onClick={() =>
                navigate(`/apprentice/toolbox/apprenticeship-funding/${s.slug}`)
              }
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
};

export default ApprenticeshipFunding;
