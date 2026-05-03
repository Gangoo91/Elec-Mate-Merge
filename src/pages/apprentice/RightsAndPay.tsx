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
    eyebrow: 'Pay',
    title: 'Wages & pay',
    slug: 'wages',
    description:
      "Apprentice rate, JIB rates by stage, what you should be paid for, the red flags that mean something's wrong.",
    meta: '8 min read',
    tone: 'emerald',
  },
  {
    number: '02',
    eyebrow: 'Rights',
    title: 'Your rights',
    slug: 'your-rights',
    description:
      'Core employment rights, training rights, additional protections if under 18, and what to do when they\'re not being met.',
    meta: '7 min read',
    tone: 'blue',
  },
  {
    number: '03',
    eyebrow: 'Help',
    title: 'Support & helplines',
    slug: 'support',
    description:
      'Free, confidential numbers — ACAS, National Apprenticeship Helpline, Citizens Advice, HSE, mental health support.',
    meta: '6 min read',
    tone: 'orange',
  },
  {
    number: '04',
    eyebrow: 'Templates',
    title: 'Tools & templates',
    slug: 'tools',
    description:
      'Practical checklists for pay, training and progress, plus letter templates for raising issues formally.',
    meta: '5 min read',
    tone: 'purple',
  },
];

const KEY_FACTS = [
  'You should never pay for your apprenticeship training',
  'Apprentice NMW: £8.00/hr (April 2026 onwards)',
  '28 days paid holiday per year, including bank holidays',
  'Free training, materials and End Point Assessment',
  'Free, confidential support is always available',
];

export default function RightsAndPay() {
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
          eyebrow="Apprentice · Rights & Pay"
          title="Know your rights"
          description="Your apprenticeship should be a positive learning experience. Understanding your legal rights, wage entitlements and where to get help keeps you treated fairly across all four years."
          tone="yellow"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-emerald-500/20 bg-emerald-500/[0.04]">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
                Key facts
              </span>
            </div>
            <ul className="space-y-2.5">
              {KEY_FACTS.map((item) => (
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
              onClick={() => navigate(`/apprentice/rights-and-pay/${s.slug}`)}
            />
          ))}
        </HubGrid>
      </motion.section>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-5 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/85">
            Emergency
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · Immediate help
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/80 max-w-3xl">
          In immediate danger? Call 999. For non-emergency workplace issues, ACAS is free and
          confidential on 0300 123 1100. Exploitation, unsafe conditions and unfair treatment
          aren't normal — using support shows strength, not weakness.
        </p>
      </motion.div>
    </PageFrame>
  );
}
