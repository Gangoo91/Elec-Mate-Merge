/**
 * EPA · ComponentsPage — editorial breakdown of the AM2S end-point assessment.
 *
 * The ST0152 EPA is the integrated AM2S, run by NET: Safe Isolation & Risk
 * Assessment, Composite Installation, Inspection/Testing/Certification, Safe
 * Isolation of circuits, Fault Diagnosis, and an online Assessment of Applied
 * Knowledge — around 16.75 hours in total.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  ClipboardCheck,
  AlertTriangle,
} from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const am2sSections = [
  {
    ref: 'Section A1',
    title: 'Safe Isolation & Risk Assessment',
    meta: '~45 min',
    text: 'Carry out safe isolation and a risk assessment before any work begins.',
  },
  {
    ref: 'Section A2–A6',
    title: 'Composite Installation',
    meta: '~10 hours',
    text: 'Install and wire a composite circuit set from drawings — containment, accessories, terminations and workmanship.',
  },
  {
    ref: 'Section B',
    title: 'Inspection, Testing & Certification',
    meta: '~3.5 hours',
    text: 'Inspect, test and certify your installation — continuity, IR, polarity, Zs, RCD operation, completing the certification.',
  },
  {
    ref: 'Section C',
    title: 'Safe Isolation of circuits',
    meta: '~30 min',
    text: 'Demonstrate safe isolation of individual circuits within the installation.',
  },
  {
    ref: 'Section D',
    title: 'Fault Diagnosis & Rectification',
    meta: '~2 hours',
    text: 'Find and rectify introduced faults using a logical diagnostic approach and the correct instruments.',
  },
  {
    ref: 'Section E',
    title: 'Assessment of Applied Knowledge',
    meta: '~1 hour',
    text: 'Online multiple-choice test (~30 questions) covering BS 7671, theory, and safe working applied to the practical.',
  },
];

const knowledgeTopics = [
  "Electrical science and principles — Ohm's law, power, AC theory, three-phase, impedance, reactance",
  'BS 7671:2018+A4:2026 — Parts 1–7, especially Part 4 (Protection for Safety) and Part 6 (Inspection & Testing)',
  'Health and safety legislation — Electricity at Work 1989, CDM 2015, HSWA 1974, PUWER, LOLER',
  'Installation methods and materials — cable types, containment, earthing (TN-S, TN-C-S, TT), CPDs',
  'Testing and inspection — initial verification, periodic inspection, safe isolation, instruments',
  'Fault diagnosis theory — Zs, PFC, IR, RCD, continuity',
  'Environmental technology — energy efficiency, renewables, EV charging',
  'Special locations — BS 7671 Part 7: bathrooms, pools, agricultural, sites, marinas',
];

const knowledgeOnDay = [
  'Online multiple-choice test, around 30 questions, supervised at the centre',
  'Non-programmable calculator permitted',
  'Reference material as permitted by NET on the day — confirm with your provider',
  'Questions apply BS 7671 and theory to realistic installation scenarios',
  'Forms part of your single integrated AM2S result',
];

const practicalAssessed = [
  'Safe isolation — 5-step procedure followed correctly every time, with lock-off/tag-out and proving dead',
  'Installation — wiring circuits, connecting accessories, installing containment, working from drawings',
  'Testing and verification — continuity, IR, Zs, RCD operation, polarity',
  'Correct use of tools and equipment — calibrated test instruments, hand tools, power tools',
  'BS 7671 compliance — cable selection, protection, earthing, circuit design',
  'Quality of workmanship — neat cable runs, correct terminations, labelling, tidy work area',
  'Risk assessment and method statements — hazards, controls, safe systems of work',
  'Working to specifications — interpreting drawings, following instructions, meeting requirements',
];

const safeIsolationSteps = [
  {
    step: 1,
    text: 'Identify the circuit or equipment to be worked on using drawings, schedules, and labels',
  },
  {
    step: 2,
    text: 'Switch off — isolate the supply using the appropriate isolator, switch, or MCB',
  },
  { step: 3, text: 'Secure the isolation — apply lock-off device and warning tags (LOTO)' },
  {
    step: 4,
    text: 'Test — prove voltage indicator on a known live source, test the isolated circuit dead, then retest the indicator on the known live source',
  },
  { step: 5, text: 'Begin work only when you have confirmed the circuit is dead' },
];

const practicalOnDay = [
  'Bring your own calibrated test instruments (multifunction tester, voltage indicator, proving unit)',
  'Bring appropriate PPE and hand tools',
  "The assessor will observe silently — they may ask you to explain what you're doing",
  'Work at your normal pace — quality over speed',
  'If you make a mistake, acknowledge it, correct it, explain what you did',
  'A brief break is built into the schedule',
];

const assessorsLookFor = [
  {
    title: 'Safety consciousness',
    description:
      'Above everything else, assessors check that you work safely. Safe isolation, correct PPE, hazard awareness, safe systems of work — non-negotiable. An unsafe act can fail you instantly.',
  },
  {
    title: 'Competence, not perfection',
    description:
      "Assessors aren't expecting perfection. They want to see a competent, reliable electrician who works to industry standards. Making a small mistake and correcting it is fine — not recognising it is the problem.",
  },
  {
    title: 'Understanding, not just doing',
    description:
      'Can you explain WHY, not just WHAT? Being asked to explain a step is part of the observation. Understanding the principles behind the regulations shows genuine competence.',
  },
  {
    title: 'Professional behaviour',
    description:
      "How you conduct yourself matters. Punctuality, communication, tidiness, respect for the environment, and professional attitude all contribute to the assessor's impression.",
  },
  {
    title: 'Self-checking',
    description:
      'Do you check your own work? Verify test results make sense? Inspect connections before closing up? Self-checking shows a mature, quality-focused approach.',
  },
  {
    title: 'Regulatory awareness',
    description:
      'Can you reference specific regulations when explaining decisions? "BS 7671 requires..." or "Regulation 411.3.3 states..." shows you know the standards, not just the habits.',
  },
];

const componentLinks = [
  'The applied-knowledge test checks you understand the theory — the practical sections check you can apply it',
  'The same BS 7671 knowledge underpins your installation, testing and fault diagnosis',
  'Safe isolation appears in more than one section — get it automatic and it pays off throughout',
  'Your fault diagnosis draws on the same testing skills used in inspection and certification',
  'The AM2S is one integrated assessment — the sections build on each other, not separate exams',
  'Preparing across all sections together is more effective than treating them in isolation',
];

const dayChecklists = [
  {
    component: 'AM2S practical sections',
    items: [
      'Photo ID (driving licence or passport)',
      'Calibrated multifunction tester (check cal sticker)',
      'Calibrated voltage indicator (GS38 compliant)',
      'Proving unit',
      'Lock-off devices and warning tags',
      'Full set of hand tools',
      'PPE: safety boots, eye protection, gloves',
      'Tape measure, spirit level, pencil',
      'Cable knife or stripping tools',
      'Packed lunch and water — sessions run across the day',
      'Arrive 20+ minutes early',
    ],
  },
  {
    component: 'Applied-knowledge test',
    items: [
      'Photo ID',
      'Non-programmable calculator',
      'Reference material as permitted by NET on the day',
      'Pens (black ink) and pencils',
      'Arrive 15+ minutes early',
    ],
  },
];

const ComponentsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/end-point-assessment')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · EPA"
          title="The AM2S, section by section"
          description="For ST0152 the end-point assessment is the integrated AM2S, run by NET — around 16.75 hours of practical work plus an online applied-knowledge test. Here is every section, what you'll be assessed on, and how to prepare."
          tone="yellow"
        />
      </motion.div>

      {/* ── Overview ────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <Eyebrow>Overview</Eyebrow>
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight">
            One integrated assessment
          </h2>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            The AM2S is a single, integrated end-point assessment run by NET at an approved
            assessment centre. It brings together safe isolation, installation, inspection and
            testing, fault diagnosis, and an online applied-knowledge test. There is no separate
            professional discussion component for this standard — the AM2S is the EPA.
          </p>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">After Gateway:</span> your training
              provider registers you with NET, who schedule the AM2S at an approved centre. The
              sections are taken across the assessment, totalling around 16.75 hours.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── AM2S sections ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="The AM2S sections"
          title="Six sections, ~16.75 hours"
          meta="Composite installation carries the most time"
        />
        <ul className="space-y-2">
          {am2sSections.map((s) => (
            <li
              key={s.ref}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-elec-yellow/85">
                  {s.ref}
                </span>
                <span className="text-[11.5px] font-mono tabular-nums text-elec-yellow flex-shrink-0">
                  {s.meta}
                </span>
              </div>
              <h3 className="text-[14px] font-semibold text-white tracking-tight">{s.title}</h3>
              <p className="text-[12.5px] text-white/85 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Note:</span> section timings are
            indicative. NET confirms the exact schedule and any permitted reference material on the
            day.
          </p>
        </div>
      </motion.section>

      {/* ── Section E: Applied-knowledge test ───────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Section E"
          title="Assessment of Applied Knowledge"
          meta="~1 hour · online multiple choice · supervised"
          action={<ComponentChip icon={FileText} />}
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            The applied-knowledge test checks your understanding of electrical theory, BS 7671, and
            safe working applied to realistic installation scenarios. An online multiple-choice test
            of around 30 questions, taken under supervised conditions at the NET assessment centre.
          </p>
          <div className="space-y-2">
            <Eyebrow>Topics covered</Eyebrow>
            <ul className="space-y-1.5">
              {knowledgeTopics.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <Eyebrow>On the day</Eyebrow>
            <ul className="space-y-1.5">
              {knowledgeOnDay.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <span className="text-elec-yellow font-mono mt-0.5">—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Grading:</span> the applied-knowledge
              test is multiple-choice and assessed on a competence basis. NET confirms the required
              standard — there is no separate published percentage grade boundary to revise to.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Practical sections ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Sections A–D"
          title="The practical sections"
          meta="~15 hours · observed at a NET assessment centre"
          action={<ComponentChip icon={ClipboardCheck} />}
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            The bulk of the AM2S. An independent NET assessor observes you completing a composite
            installation, then inspecting, testing and certifying it, and diagnosing introduced
            faults — all under standardised conditions at an approved assessment centre. The
            assessor watches, takes notes, and may ask you to explain what you are doing.
          </p>
          <div className="space-y-2">
            <Eyebrow>What you'll be assessed on</Eyebrow>
            <ul className="space-y-1.5">
              {practicalAssessed.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safe isolation procedure */}
          <div className="rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.04] p-3 space-y-2">
            <Eyebrow className="text-elec-yellow/85">Safe isolation — 5 steps</Eyebrow>
            <ol className="space-y-2">
              {safeIsolationSteps.map((item) => (
                <li key={item.step} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[11px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-[12.5px] text-white/85 leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                <span className="font-semibold text-red-300">Critical:</span> Failure to follow safe
                isolation correctly can result in an immediate fail of the practical, regardless of
                the quality of other work. Practise it until it&rsquo;s second nature.
              </p>
            </div>
          </div>

          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <Eyebrow>On the day</Eyebrow>
            <ul className="space-y-1.5">
              {practicalOnDay.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <span className="text-elec-yellow font-mono mt-0.5">—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── No separate discussion note ─────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What's not in the AM2S"
          title="No separate professional discussion"
          meta="A common point of confusion — clear it up early"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <p className="text-[13px] text-white/85 leading-relaxed">
            Many generic EPA guides describe a stand-alone professional discussion. For the ST0152
            AM2S there is no separate professional discussion component, and there is no 25 / 50 /
            25 weighting. Your competence is assessed through the practical sections and the online
            applied-knowledge test. The assessor may still ask you to explain what you are doing
            during the practical — that is part of the observation, not a separate interview.
          </p>
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            Your portfolio of evidence remains important for Gateway, but the end-point assessment
            itself is the AM2S.
          </p>
        </div>
      </motion.section>

      {/* ── Pathways ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Pathways"
          title="Installation vs maintenance"
          meta="Same standard, same AM2S — different emphasis"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <PathwayCard
            title="Installation electrician"
            items={[
              'On-programme work focuses on new installation — wiring from scratch, containment, working from plans',
              'Knowledge emphasis on circuit design, cable selection, installation methods, initial verification',
              'Portfolio shows a range of installation projects — domestic, commercial, industrial',
            ]}
          />
          <PathwayCard
            title="Maintenance electrician"
            items={[
              'On-programme work focuses on fault finding, repair, and maintenance — diagnosing issues, replacing components, periodic inspection',
              'Knowledge emphasis on fault diagnosis theory, periodic inspection, maintenance planning',
              'Portfolio shows maintenance activities — fault logs, repair records, PPM schedules',
            ]}
          />
        </div>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Note:</span> The core KSBs are the same
            for both pathways. The AM2S itself is the same assessment — the difference is the
            emphasis of your on-programme experience. Discuss your pathway with your training
            provider to focus your preparation.
          </p>
        </div>
      </motion.section>

      {/* ── What assessors look for ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What assessors look for"
          title="Six priorities — in order"
          meta="What a competent, safe electrician demonstrates"
        />
        <ul className="space-y-2">
          {assessorsLookFor.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── How components link ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="How they link"
          title="One assessment — connected sections"
          meta="Prepare across all sections together"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {componentLinks.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Day-of checklists ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Day-of checklists"
          title="What to bring"
          meta="Print these, tick them off, sleep well"
        />
        <ul className="space-y-2.5">
          {dayChecklists.map((c) => (
            <li
              key={c.component}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow/85 flex-shrink-0" />
                <h3 className="text-[14px] font-semibold text-white tracking-tight">
                  {c.component}
                </h3>
              </div>
              <ul className="space-y-1.5">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Typical order ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Typical order"
          title="How the AM2S runs"
          meta="Scheduled by NET — a common flow"
        />
        <ol className="space-y-2">
          {[
            {
              step: 1,
              title: 'Safe isolation & risk assessment',
              description:
                'You begin by safely isolating and assessing the risks before any installation work starts.',
            },
            {
              step: 2,
              title: 'Composite installation',
              description:
                'The longest part — install and wire the composite circuit set from drawings, around 10 hours.',
            },
            {
              step: 3,
              title: 'Inspection, testing, fault diagnosis',
              description:
                'Inspect, test and certify your installation, demonstrate safe isolation of circuits, then find and rectify introduced faults.',
            },
            {
              step: 4,
              title: 'Applied-knowledge test',
              description:
                'The online multiple-choice test completes your single integrated AM2S result.',
            },
          ].map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                  {item.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Note:</span> the exact order and timing
            are set by NET. Your training provider will confirm the schedule once your assessment
            centre and dates are arranged.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
};

/* ─────────────────── small helpers ─────────────────── */

import type { LucideIcon } from 'lucide-react';

function ComponentChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
      <Icon className="h-4 w-4 text-elec-yellow" />
    </span>
  );
}

function PathwayCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
      <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
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
  );
}

export default ComponentsPage;
