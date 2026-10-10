/**
 * SafetyFundamentals — editorial landing for the safety knowledge base.
 *
 * Six subsections cover safe isolation, PPE, working at height, emergency,
 * RAMS, and site safety. Replaces the previous multi-colour pattern
 * (red/blue/orange/green/purple Cards with coloured borders) with the
 * editorial style. Critical warning + emergency contacts kept in red since
 * red carries semantic weight here.
 */

import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Siren } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import {
  Eyebrow,
  GUIDE_CARD,
  GuideIndex,
  GuidePage,
  SectionHeader,
} from '@/components/apprentice/shared/GuideKit';

interface Section {
  title: string;
  slug: string;
  readTime: string;
  blurb: string;
}

const sections: Section[] = [
  {
    title: 'Safe isolation',
    slug: 'safe-isolation',
    readTime: '12 min',
    blurb: 'The 7-step procedure that prevents most electrical accidents.',
  },
  {
    title: 'PPE & equipment',
    slug: 'ppe-equipment',
    readTime: '10 min',
    blurb: "What to wear, when, and why it's your last line of defence.",
  },
  {
    title: 'Working at height',
    slug: 'working-at-height',
    readTime: '10 min',
    blurb: 'Ladders, scaffolds, MEWPs — and the rules that keep you on the right side of HSE.',
  },
  {
    title: 'Emergency procedures',
    slug: 'emergency-procedures',
    readTime: '12 min',
    blurb: 'What to do in the first sixty seconds — for you, your mates, and the public.',
  },
  {
    title: 'Risk assessment & RAMS',
    slug: 'risk-assessment',
    readTime: '10 min',
    blurb: 'Reading them, writing them, and why "dynamic" RAMS matter on site.',
  },
  {
    title: 'Site safety rules',
    slug: 'site-safety-rules',
    readTime: '10 min',
    blurb: 'Inductions, permits, exclusion zones, sign-in books — the daily rituals.',
  },
];

const keyFacts = [
  'Around 30 electrical deaths at work in the UK over the past 5 years',
  'Safe isolation prevents the majority of electrical accidents',
  'You must NEVER work on live systems without formal authorisation',
  'PPE is your last line of defence — not your first',
  'Every worker has a legal duty to report unsafe conditions',
  'RIDDOR requires reporting of serious workplace incidents to the HSE',
];

const emergencyContacts = [
  { label: 'Emergency services', number: '999', note: 'Life-threatening emergencies' },
  {
    label: 'HSE incident contact centre',
    number: '0345 300 9923',
    note: 'Report serious incidents',
  },
  { label: 'National gas emergency', number: '0800 111 999', note: 'If you hit a gas pipe' },
  { label: 'Electrical Safety First', number: '020 3463 5100', note: 'Electrical safety advice' },
];

const SafetyFundamentals = () => {
  return (
    <GuidePage
      section="Apprentice · Safety"
      area="Toolbox"
      title="Safety fundamentals"
      backTo="/apprentice/toolbox"
      description="Everything you need to stay safe on site as an electrical apprentice — safe isolation, PPE, emergency response, and the legal duties that sit behind them."
    >
      {/* ── Critical warning ──────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="-mx-4 space-y-2 border-y border-red-500/30 bg-red-500/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-300" strokeWidth={1.5} />
          <Eyebrow className="text-red-300">Electricity can kill</Eyebrow>
        </div>
        <p className="text-[14.5px] leading-relaxed text-white">
          These aren't just guidelines — they're the difference between going home safely and not
          going home at all. As an apprentice, safety is your{' '}
          <span className="font-semibold text-red-300">number one priority</span>. Never compromise
          on it, no matter what anyone tells you. You have the legal right to refuse unsafe work.
        </p>
      </motion.div>

      {/* ── Section index ─────────────────────────────────────────── */}
      <GuideIndex
        title="Six topics to know cold"
        sub={`${sections.length} short reads · all referenced to BS 7671 / HSE`}
        columns={3}
        items={sections.map((section) => ({
          id: section.slug,
          title: section.title,
          description: section.blurb,
          meta: `${section.readTime} read`,
          to: `/apprentice/safety-fundamentals/${section.slug}`,
        }))}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-6">
        {/* ── Key facts ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="Key safety facts"
            title="Six things that should stick"
            meta="The numbers and rules behind the procedures"
          />
          <div className={GUIDE_CARD}>
            <ul className="space-y-2.5">
              {keyFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-white"
                >
                  <CheckCircle2
                    className="mt-1 h-4 w-4 flex-shrink-0 text-elec-yellow"
                    strokeWidth={1.5}
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ── Emergency contacts ────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="If something goes wrong"
            title="Emergency numbers — save these"
            meta="Save to your phone before you need them"
          />
          <ul className="-mx-4 divide-y divide-white/[0.06] border-y border-red-500/30 bg-red-500/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
            {emergencyContacts.map((contact) => (
              <li key={contact.label}>
                <a
                  href={`tel:${contact.number.replace(/\s/g, '')}`}
                  className="flex min-h-[64px] items-center gap-3 px-4 py-3 transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5"
                >
                  <Siren
                    className="h-[18px] w-[18px] flex-shrink-0 text-red-300"
                    strokeWidth={1.5}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold leading-snug text-white">
                      {contact.label}
                    </span>
                    <span className="block text-[13px] leading-snug text-white">
                      {contact.note}
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-[15px] font-semibold tabular-nums text-red-300">
                    {contact.number}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* ── Footnote ──────────────────────────────────────────────── */}
      <p className="max-w-3xl text-[14px] leading-relaxed text-white">
        Safety guidance referenced from BS 7671:2018+A4:2026, the Health and Safety at Work Act
        1974, the Electricity at Work Regulations 1989, HSE guidance note GS38, and current industry
        best practice. Always follow your employer's specific safety procedures and risk
        assessments. If in doubt, stop work and ask your supervisor.
      </p>
    </GuidePage>
  );
};

export default SafetyFundamentals;
