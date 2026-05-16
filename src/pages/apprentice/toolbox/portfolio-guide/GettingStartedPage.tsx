/**
 * Portfolio · GettingStartedPage — editorial guide to starting your portfolio.
 *
 * What a portfolio is, why it matters, what goes in it, KSBs explained,
 * when to start, digital vs physical, common mistakes, top tips.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const whyMatters = [
  'Required for EPA gateway sign-off — without it you can\'t progress to assessment',
  'Demonstrates competence against all KSBs in the standard',
  'Provides evidence for your Professional Discussion — assessors use it to guide questions',
  'Creates a permanent record of your professional development for future employers',
  'Proves to your EPAO that you have met all requirements',
  'Shows progression from beginner tasks to complex, independent work over 4 years',
];

const evidenceTypes = [
  {
    title: 'Photographic evidence',
    desc: 'Before/after installation photos, cable routing, terminations, control panels, testing setups. Always clear, well-lit, with context.',
  },
  {
    title: 'Written documentation',
    desc: 'Test certificates, risk assessments, method statements, inspection reports, EICRs, minor works certificates.',
  },
  {
    title: 'Witness testimonies',
    desc: 'Signed statements from supervisors, colleagues, or clients confirming your competence on specific tasks.',
  },
  {
    title: 'Practical assessment records',
    desc: 'Results from practical assessments, skills demonstrations, installation completion records.',
  },
  {
    title: 'Safety documentation',
    desc: 'Safety induction records, PPE usage, accident/incident reports, toolbox talk attendance.',
  },
  {
    title: 'Professional development',
    desc: 'Training certificates, CPD records, college coursework, self-study notes, reflective accounts.',
  },
];

const ksbAreas = [
  {
    code: 'K1–K15',
    title: 'Knowledge',
    description:
      'What you understand — electrical science, BS 7671, health and safety legislation, environmental requirements, testing principles, fault-finding methods, and how electrical systems work.',
  },
  {
    code: 'S1–S15',
    title: 'Skills',
    description:
      'What you can do — install wiring systems, terminate cables, test and inspect circuits, diagnose faults, read drawings, use instruments correctly, work safely at height and in confined spaces.',
  },
  {
    code: 'B1–B6',
    title: 'Behaviours',
    description:
      'How you conduct yourself — working safely, taking responsibility, communicating effectively, working as part of a team, showing initiative, maintaining a professional approach.',
  },
];

const timeline = [
  'Week 1: Set up your portfolio folder (digital or physical)',
  'Month 1: Start collecting induction evidence, safety records, first photos',
  'Every week: Add at least one new piece of evidence',
  'Every month: Write a reflective account on what you\'ve learned',
  'Every quarter: Review your KSB mapping — are there gaps?',
  'Year 3–4: Focus on filling KSB gaps and polishing presentation',
  'Gateway: Final review with your training provider before EPA',
];

const digitalPros = [
  'Easy to back up and can\'t be lost in a fire or flood',
  'Searchable — quickly find evidence for specific KSBs',
  'Photos and videos easily included',
  'Can share instantly with assessors and training providers',
  'Common platforms: OneFile, Smart Assessor, Google Drive',
  'Mobile-friendly — add evidence from your phone on site',
];

const physicalPros = [
  'Good for original certificates and signed documents',
  'Some assessors prefer to flip through a physical folder',
  'No technology issues during assessment',
  'Use a ring binder with divider tabs for each KSB area',
  'Print photos at decent quality — not tiny thumbnails',
  'Always keep digital backups of everything physical',
];

const commonMistakes = [
  'Not starting until Year 3 or 4 — you will forget details and lose evidence',
  'Taking blurry or dark photos — always check quality before moving on',
  'Not getting witness statements signed — ask supervisors on the day, not months later',
  'Collecting quantity over quality — 5 excellent pieces beat 50 weak ones',
  'Not linking evidence to KSBs — every piece must map to at least one',
  'Ignoring Behaviours evidence — many apprentices focus only on Knowledge and Skills',
  'Not backing up digital files — one lost phone or laptop can wipe everything',
  'Waiting for perfect work — everyday tasks are valid evidence too',
];

const topTips = [
  'Set a weekly reminder on your phone to add portfolio evidence',
  'Keep a notes app on your phone for quick reflections on site',
  'Take photos BEFORE, DURING, and AFTER every installation',
  'Ask your assessor what format they prefer — then use that format',
  'Look at example portfolios if your training provider has them',
  'Talk to apprentices in later years — learn from their experience',
  'Create a KSB checklist and tick off evidence as you collect it',
  'Quality over quantity — one detailed, well-annotated photo beats ten blurry ones',
];

const GettingStartedPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/portfolio-building')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Portfolio · Start"
          title="Getting started"
          description="What an apprenticeship portfolio actually is, what it has to prove, and the early habits that turn paperwork chore into a real record of your work."
          tone="yellow"
        />
      </motion.div>

      {/* ── What is a portfolio ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What it is"
          title="A structured record of your competence"
          meta="Not a folder of paperwork — a living document"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Your apprenticeship portfolio is a structured collection of evidence
            proving you're competent against the Level 3 Installation /
            Maintenance Electrician standard (ST0152 v1.2). It tells the story
            of your development from day one to EPA readiness.
          </p>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Reviewed during your End Point Assessment — specifically in the
            Professional Discussion. The assessor will use it as a starting
            point for questions about your knowledge, skills, and behaviours.
          </p>
        </div>
      </motion.section>

      {/* ── Why it matters ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Why it matters"
          title="Six reasons it's non-negotiable"
          meta="From EPA gateway to lifetime CV asset"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {whyMatters.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Evidence types ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What goes in"
          title="Six evidence types"
          meta="A mix is what proves your full range"
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {evidenceTypes.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5"
            >
              <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight">
                {item.title}
              </h3>
              <p className="text-[12.5px] text-white/85 leading-relaxed">{item.desc}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── KSBs explained ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Understanding KSBs"
          title="Knowledge · Skills · Behaviours"
          meta="Every piece of evidence should map to at least one"
        />
        <ul className="space-y-2">
          {ksbAreas.map((area) => (
            <li
              key={area.code}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                  {area.title}
                </h3>
                <span className="text-[11px] font-mono tabular-nums text-elec-yellow">
                  {area.code}
                </span>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed">{area.description}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── When to start ───────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="When to start"
          title="Right now — not Year 3"
          meta="The biggest mistake is leaving it until the end"
        />
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            By Year 3 or 4 you've forgotten details, lost photos, and can't get
            witness statements for work done years ago. Start now.
          </p>
          <div className="space-y-2 pt-2 border-t border-elec-yellow/15">
            <Eyebrow className="text-elec-yellow/85">Recommended timeline</Eyebrow>
            <ul className="space-y-1.5">
              {timeline.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Digital vs Physical ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Digital vs physical"
          title="Most providers now prefer digital"
          meta="Check what your provider requires"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
            <Eyebrow>Digital portfolio</Eyebrow>
            <ul className="space-y-1.5">
              {digitalPros.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
            <Eyebrow>Physical portfolio</Eyebrow>
            <ul className="space-y-1.5">
              {physicalPros.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Common early mistakes ──────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Common early mistakes"
          title="Eight traps to avoid"
          meta="What catches most apprentices in year 1"
        />
        <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {commonMistakes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Top tips ────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Top tips"
          title="Eight habits that compound"
          meta="The ones distinction-grade apprentices recommend"
        />
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {topTips.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default GettingStartedPage;
