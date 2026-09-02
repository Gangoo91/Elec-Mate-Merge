import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { DEFAULT_OTJ_STANDARD, OTJ_HOURS_FLOOR } from '@/data/otjStandards';
import { itemVariants, type Tone } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { HubToolGrid, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

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
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'Rights',
    title: 'Your rights',
    slug: 'your-rights',
    description:
      "Core employment rights, training rights, additional protections if under 18, and what to do when they're not being met.",
    meta: '7 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Help',
    title: 'Support & helplines',
    slug: 'support',
    description:
      'Free, confidential numbers — ACAS, National Apprenticeship Helpline, Citizens Advice, HSE, mental health support.',
    meta: '6 min read',
    tone: 'yellow',
  },
  {
    number: '04',
    eyebrow: 'Templates',
    title: 'Tools & templates',
    slug: 'tools',
    description:
      'Practical checklists for pay, training and progress, plus letter templates for raising issues formally.',
    meta: '5 min read',
    tone: 'yellow',
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
    <HubSubPage
      title="Know your rights"
      backTo="/apprentice"
      description="Your apprenticeship should be a positive learning experience. Understanding your legal rights, wage entitlements and where to get help keeps you treated fairly across all four years."
    >
      <motion.div
        variants={itemVariants}
        className={cn(
          'border-0 bg-transparent px-0 py-0 -mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5 sm:py-5 px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Key facts
          </span>
        </div>
        <ul className="space-y-2.5">
          {KEY_FACTS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[13px] text-white leading-relaxed"
            >
              <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="border-0 bg-transparent px-0 py-0 sm:rounded-2xl sm:border sm:border-elec-yellow/25 sm:bg-white/[0.05] sm:px-5 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Off-the-job training
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            · Fixed hours, not 20%
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white max-w-3xl">
          Since 1 August 2025, off-the-job training is a fixed number of hours set by your
          apprenticeship standard — not 20% of your working hours. The {DEFAULT_OTJ_STANDARD.name} (
          {DEFAULT_OTJ_STANDARD.code}) carries{' '}
          <span className="text-elec-yellow font-semibold tabular-nums">
            {DEFAULT_OTJ_STANDARD.otjHours.toLocaleString('en-GB')} hours
          </span>
          , delivered over the apprenticeship. The absolute floor for any standard is{' '}
          {OTJ_HOURS_FLOOR} hours. This is paid time — it counts as part of your working week.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'border-0 bg-transparent px-0 py-0 -mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5 sm:py-5 space-y-4 px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Essentials
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            · The basics worth knowing
          </span>
        </div>
        <dl className="space-y-3.5">
          <div>
            <dt className="text-[12px] font-semibold text-elec-yellow mb-0.5">Holiday pay</dt>
            <dd className="text-[13px] leading-relaxed text-white max-w-3xl">
              You build up paid holiday from your first day. The statutory minimum is 5.6 weeks a
              year — 28 days for a five-day week, which your employer can count bank holidays
              towards. Holiday is paid at your normal rate, not a reduced one.
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold text-elec-yellow mb-0.5">Sick pay</dt>
            <dd className="text-[13px] leading-relaxed text-white max-w-3xl">
              If you're off sick and meet the earnings threshold, you're entitled to Statutory Sick
              Pay from the fourth qualifying day, for up to 28 weeks. Many employers pay more than
              the statutory minimum — check your contract. Report sickness the way your contract
              sets out and keep a record.
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold text-elec-yellow mb-0.5">
              If you're not being trained
            </dt>
            <dd className="text-[13px] leading-relaxed text-white max-w-3xl">
              Being used as cheap labour instead of being taught is a genuine problem, not just bad
              luck. Raise it first with your training provider — they're responsible for the quality
              of your on-the-job learning and can speak to your employer. Keep your own dated notes
              of what you're given to do. If it isn't resolved, escalate to your provider's quality
              team or the National Apprenticeship Helpline.
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold text-elec-yellow mb-0.5">Unions & ACAS</dt>
            <dd className="text-[13px] leading-relaxed text-white max-w-3xl">
              You have the right to join a trade union — Unite the Union represents many electrical
              workers and can advise and represent you. For free, impartial guidance on any
              workplace issue before it escalates, ACAS is on{' '}
              <a
                href="tel:03001231100"
                className="text-elec-yellow underline underline-offset-2 touch-manipulation"
              >
                0300 123 1100
              </a>
              .
            </dd>
          </div>
        </dl>
      </motion.div>

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
            onClick: () => navigate(`/apprentice/rights-and-pay/${s.slug}`),
          }))}
        />
      </motion.section>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-5 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/85">
            Emergency
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            · Immediate help
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white max-w-3xl">
          In immediate danger? Call{' '}
          <a
            href="tel:999"
            className="text-red-300 underline underline-offset-2 touch-manipulation"
          >
            999
          </a>
          . For non-emergency workplace issues, ACAS is free and confidential on{' '}
          <a
            href="tel:03001231100"
            className="text-red-300 underline underline-offset-2 touch-manipulation"
          >
            0300 123 1100
          </a>
          . Exploitation, unsafe conditions and unfair treatment aren't normal — using support shows
          strength, not weakness.
        </p>
      </motion.div>
    </HubSubPage>
  );
}
