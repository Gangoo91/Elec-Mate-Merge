/**
 * SafetyFundamentals — editorial landing for the safety knowledge base.
 *
 * Six subsections cover safe isolation, PPE, working at height, emergency,
 * RAMS, and site safety. Replaces the previous multi-colour pattern
 * (red/blue/orange/green/purple Cards with coloured borders) with the
 * editorial style. Critical warning + emergency contacts kept in red since
 * red carries semantic weight here.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, AlertTriangle, Siren } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface Section {
  title: string;
  slug: string;
  icon: string;
  readTime: string;
  blurb: string;
}

const sections: Section[] = [
  {
    title: 'Safe isolation',
    slug: 'safe-isolation',
    icon: '🔒',
    readTime: '12 min',
    blurb: 'The 7-step procedure that prevents most electrical accidents.',
  },
  {
    title: 'PPE & equipment',
    slug: 'ppe-equipment',
    icon: '🦺',
    readTime: '10 min',
    blurb: 'What to wear, when, and why it\'s your last line of defence.',
  },
  {
    title: 'Working at height',
    slug: 'working-at-height',
    icon: '🪜',
    readTime: '10 min',
    blurb: 'Ladders, scaffolds, MEWPs — and the rules that keep you on the right side of HSE.',
  },
  {
    title: 'Emergency procedures',
    slug: 'emergency-procedures',
    icon: '🚨',
    readTime: '12 min',
    blurb: 'What to do in the first sixty seconds — for you, your mates, and the public.',
  },
  {
    title: 'Risk assessment & RAMS',
    slug: 'risk-assessment',
    icon: '📋',
    readTime: '10 min',
    blurb: 'Reading them, writing them, and why "dynamic" RAMS matter on site.',
  },
  {
    title: 'Site safety rules',
    slug: 'site-safety-rules',
    icon: '🏗',
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
  { label: 'HSE incident contact centre', number: '0345 300 9923', note: 'Report serious incidents' },
  { label: 'National gas emergency', number: '0800 111 999', note: 'If you hit a gas pipe' },
  { label: 'Electrical Safety First', number: '020 3463 5100', note: 'Electrical safety advice' },
];

const SafetyFundamentals = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Safety"
          title="Safety fundamentals"
          description="Everything you need to stay safe on site as an electrical apprentice — safe isolation, PPE, emergency response, and the legal duties that sit behind them."
          tone="yellow"
        />
      </motion.div>

      {/* ── Critical warning ──────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0" />
            <Eyebrow className="text-red-300">Electricity can kill</Eyebrow>
          </div>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            These aren't just guidelines — they're the difference between going
            home safely and not going home at all. As an apprentice, safety is
            your <span className="font-semibold text-red-300">number one priority</span>.
            Never compromise on it, no matter what anyone tells you. You have the
            legal right to refuse unsafe work.
          </p>
        </div>
      </motion.div>

      {/* ── Key facts ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Key safety facts"
          title="Six things that should stick"
          meta="The numbers and rules behind the procedures"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {keyFacts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Section index ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Sections"
          title="Six topics to know cold"
          meta={`${sections.length} short reads · all referenced to BS 7671 / HSE`}
        />
        <ul className="space-y-2">
          {sections.map((section, i) => (
            <li key={section.slug}>
              <button
                onClick={() =>
                  navigate(`/apprentice/safety-fundamentals/${section.slug}`)
                }
                className="w-full flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] active:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation text-left"
              >
                <span className="text-[20px] sm:text-[22px] leading-none flex-shrink-0 mt-0.5">
                  {section.icon}
                </span>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-white/40 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] font-semibold text-white truncate">
                        {section.title}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-mono text-white/55 tabular-nums flex-shrink-0">
                      {section.readTime}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-white/70 leading-relaxed">
                    {section.blurb}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0 mt-1" />
              </button>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Emergency contacts ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="If something goes wrong"
          title="Emergency numbers — save these"
          meta="Save to your phone before you need them"
        />
        <ul className="space-y-2">
          {emergencyContacts.map((contact) => (
            <li
              key={contact.label}
              className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  <Siren className="h-4 w-4 text-red-300 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-[13.5px] font-medium text-white leading-snug">
                      {contact.label}
                    </p>
                    <p className="text-[12px] text-white/70 leading-snug">
                      {contact.note}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${contact.number.replace(/\s/g, '')}`}
                  className="text-[14px] sm:text-[16px] font-mono font-semibold tabular-nums text-red-300 hover:text-red-200 transition-colors touch-manipulation whitespace-nowrap"
                >
                  {contact.number}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Footnote ──────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <p className="text-[11px] text-white/40 leading-relaxed">
          Safety guidance referenced from BS 7671:2018+A2:2022, the Health and
          Safety at Work Act 1974, the Electricity at Work Regulations 1989, HSE
          guidance note GS38, and current industry best practice. Always follow
          your employer's specific safety procedures and risk assessments. If in
          doubt, stop work and ask your supervisor.
        </p>
      </motion.section>
    </PageFrame>
  );
};

export default SafetyFundamentals;
