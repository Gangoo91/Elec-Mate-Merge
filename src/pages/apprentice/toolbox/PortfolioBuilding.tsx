import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
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
    eyebrow: 'Start',
    title: 'Getting started',
    slug: 'getting-started',
    description:
      'What a portfolio actually is, what it has to prove, and the early habits that turn a paperwork chore into a real record of your work.',
    meta: '8 min read',
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Structure',
    title: 'Structure & planning',
    slug: 'structure',
    description:
      'How to lay the portfolio out, what to keep where, and the structure your assessor + EPAO actually want to see.',
    meta: '7 min read',
    tone: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'Evidence',
    title: 'Evidence collection',
    slug: 'evidence',
    description:
      'Photos, sign-offs, witness testimonies, certificates and observations — what counts, what doesn\'t, and how to keep it tidy.',
    meta: '9 min read',
    tone: 'orange',
  },
  {
    number: '04',
    eyebrow: 'Reflection',
    title: 'Reflective practice',
    slug: 'reflective-practice',
    description:
      'The bit most apprentices fluff. Real reflection — what changed, what you learnt, what you\'d do differently — is what marks your portfolio for distinction.',
    meta: '7 min read',
    tone: 'purple',
  },
  {
    number: '05',
    eyebrow: 'Standards',
    title: 'Industry guidance',
    slug: 'industry-guidance',
    description:
      'How ST0152 KSBs map to evidence, what the major EPAOs (NET, City & Guilds, EAL) want to see, and where standards differ.',
    meta: '8 min read',
    tone: 'amber',
  },
];

const PortfolioBuilding = () => {
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
          eyebrow="Apprentice · Portfolio"
          title="Your portfolio is your proof"
          description="The most important document you'll create during your training. It proves your competence, maps to ST0152 KSBs, and is essential for EPA. Start from day one — don't leave it until Year 4."
          tone="yellow"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-emerald-500/20 bg-emerald-500/[0.04]">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
                Quick facts
              </span>
            </div>
            <ul className="space-y-2.5">
              {[
                'Required for EPA gateway sign-off',
                'Maps to Knowledge, Skills & Behaviours (KSBs)',
                '6 main evidence types to collect',
                'Reviewed during Professional Discussion',
                'Start early — do not leave it until Year 4',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] text-white/85 leading-relaxed"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
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
                navigate(`/apprentice/toolbox/portfolio-building/${s.slug}`)
              }
            />
          ))}
        </HubGrid>
      </motion.section>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-4 sm:px-6 sm:py-5"
      >
        <p className="text-[11.5px] leading-relaxed text-white/60 max-w-3xl">
          Based on the Level 3 Installation Electrician / Maintenance Electrician apprenticeship
          standard (ST0152 v1.2) and current EPAO requirements. Your training provider may have
          specific portfolio formats — always check their guidance alongside this guide.
        </p>
      </motion.div>
    </PageFrame>
  );
};

export default PortfolioBuilding;
