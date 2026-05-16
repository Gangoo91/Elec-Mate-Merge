/**
 * EPA · ComponentsPage — editorial breakdown of the three EPA components.
 *
 * Knowledge test (25%), practical observation (50%), professional
 * discussion (25%) — what to expect, what's assessed, and how to
 * prepare. Full editorial rewrite of the previous multi-colour pattern.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  ClipboardCheck,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const knowledgeTopics = [
  'Electrical science and principles — Ohm\'s law, power, AC theory, three-phase, impedance, reactance',
  'BS 7671:2018+A2:2022 — Parts 1–7, especially Part 4 (Protection for Safety) and Part 6 (Inspection & Testing)',
  'Health and safety legislation — Electricity at Work 1989, CDM 2015, HSWA 1974, PUWER, LOLER',
  'Installation methods and materials — cable types, containment, earthing (TN-S, TN-C-S, TT), CPDs',
  'Testing and inspection — initial verification, periodic inspection, safe isolation, instruments',
  'Fault diagnosis theory — Zs, PFC, IR, RCD, continuity',
  'Environmental technology — energy efficiency, renewables, EV charging',
  'Special locations — BS 7671 Part 7: bathrooms, pools, agricultural, sites, marinas',
];

const knowledgeOnDay = [
  'Supervised exam conditions — no phones, no talking, invigilator present',
  'Non-programmable calculator permitted',
  'Clean copy of BS 7671 usually permitted — confirm with your EPAO',
  'On-Site Guide may also be permitted — confirm with your EPAO',
  'Mix of recall, application, and scenario questions',
  'Result typically within 10 working days',
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
  { step: 1, text: 'Identify the circuit or equipment to be worked on using drawings, schedules, and labels' },
  { step: 2, text: 'Switch off — isolate the supply using the appropriate isolator, switch, or MCB' },
  { step: 3, text: 'Secure the isolation — apply lock-off device and warning tags (LOTO)' },
  { step: 4, text: 'Test — prove voltage indicator on a known live source, test the isolated circuit dead, then retest the indicator on the known live source' },
  { step: 5, text: 'Begin work only when you have confirmed the circuit is dead' },
];

const practicalOnDay = [
  'Bring your own calibrated test instruments (multifunction tester, voltage indicator, proving unit)',
  'Bring appropriate PPE and hand tools',
  'The assessor will observe silently — they may ask you to explain what you\'re doing',
  'Work at your normal pace — quality over speed',
  'If you make a mistake, acknowledge it, correct it, explain what you did',
  'A brief break is built into the schedule',
];

const discussionTopics = [
  'Portfolio evidence — specific examples of work with photos, test results, certs, job sheets',
  'Problem-solving approaches — how you diagnosed faults and made decisions',
  'Professional behaviours — punctuality, reliability, working with others',
  'Health and safety in practice — risk assessments, safe systems of work, near-miss reporting',
  'Customer service — how you communicated with clients, managed expectations',
  'Career development — CPD activities, future goals, keeping up with regulation changes',
  'Regulatory knowledge — how you applied BS 7671 and other standards',
  'Environmental awareness — energy efficiency, waste, sustainable practices',
];

const portfolioMust = [
  'Evidence mapped to each KSB in the apprenticeship standard',
  'Photographs of completed work with descriptions',
  'Test results and certificates (initial verification, periodic inspection)',
  'Risk assessments and method statements you created or used',
  'Witness testimonies from your employer or supervisor',
  'CPD records — courses, training days, self-study logs',
  'Reflective accounts — what you learned from specific experiences',
  'Additional certificates (PASMA, IPAF, asbestos awareness)',
];

const discussionTips = [
  'Know your portfolio inside out — the assessor will pick examples from it',
  'Use the STAR method — Situation, Task, Action, Result',
  'Don\'t just describe what you did — explain WHY you made those decisions',
  'Be honest about mistakes — assessors value reflection and learning',
  'Speak confidently and professionally — show you\'re a competent electrician',
  'If you don\'t understand a question, ask the assessor to rephrase it',
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
      'Assessors aren\'t expecting perfection. They want to see a competent, reliable electrician who works to industry standards. Making a small mistake and correcting it is fine — not recognising it is the problem.',
  },
  {
    title: 'Understanding, not just doing',
    description:
      'Can you explain WHY, not just WHAT? This is the difference between a Pass and a higher grade. Understanding the principles behind the regulations shows deeper competence.',
  },
  {
    title: 'Professional behaviour',
    description:
      'How you conduct yourself matters. Punctuality, communication, tidiness, respect for the environment, and professional attitude all contribute to the assessor\'s impression.',
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
  'Knowledge test checks you understand the theory — practical checks you can apply it',
  'Topics in your knowledge test may come up in your professional discussion — consistency matters',
  'Portfolio evidence should support what you demonstrate in the practical',
  'Problem-solving in the practical may be discussed further in the professional discussion',
  'Assessors cross-reference your performance across components',
  'Preparing for all three simultaneously is more effective than treating them separately',
];

const dayChecklists = [
  {
    component: 'Knowledge test day',
    items: [
      'Photo ID (driving licence or passport)',
      'Non-programmable calculator',
      'Clean copy of BS 7671 (if EPAO permits)',
      'On-Site Guide (if EPAO permits)',
      'Pens (black ink) and pencils',
      'Water bottle (usually allowed)',
      'Arrive 15+ minutes early',
    ],
  },
  {
    component: 'Practical observation day',
    items: [
      'Photo ID',
      'Calibrated multifunction tester (check cal sticker)',
      'Calibrated voltage indicator (GS38 compliant)',
      'Proving unit',
      'Lock-off devices and warning tags',
      'Full set of hand tools',
      'PPE: safety boots, eye protection, gloves',
      'Tape measure, spirit level, pencil',
      'Cable knife or stripping tools',
      'Packed lunch and water — you may be there all day',
      'Arrive 20+ minutes early',
    ],
  },
  {
    component: 'Professional discussion day',
    items: [
      'Photo ID',
      'Your portfolio of evidence (physical or digital, as agreed)',
      'Additional certificates or documents referenced',
      'Notes if permitted (check with EPAO)',
      'Smart, clean appearance — professional dress',
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
          title="EPA components"
          description="Three components, one final grade. Knowledge test, practical observation, professional discussion — what each is, what you'll be assessed on, and how to prepare for it."
          tone="yellow"
        />
      </motion.div>

      {/* ── Overview ────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <Eyebrow>Overview</Eyebrow>
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight">
            Three components, one grade
          </h2>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Your EPA consists of three components that together assess all the
            Knowledge, Skills, and Behaviours (KSBs) from the apprenticeship
            standard. You must pass all three to achieve your apprenticeship.
            Each is assessed independently by your EPAO, and your overall grade
            reflects your combined performance.
          </p>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Assessment window:</span>{' '}
              all three components must be completed within 3 months after passing
              Gateway. Your EPAO will schedule each component within this period.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Component weightings ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Weightings"
          title="The 25 / 50 / 25 split"
          meta="Practical carries half — but you must pass all three"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          {[
            { name: 'Knowledge test', weight: 25 },
            { name: 'Practical observation', weight: 50 },
            { name: 'Professional discussion', weight: 25 },
          ].map((comp) => (
            <div key={comp.name} className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-white">{comp.name}</span>
                <span className="text-[13px] font-mono tabular-nums text-elec-yellow">
                  {comp.weight}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${comp.weight}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="h-full bg-elec-yellow rounded-full"
                />
              </div>
            </div>
          ))}
          <p className="text-[11.5px] text-white/55 pt-2 border-t border-white/[0.04]">
            Practical carries the most weight because it directly demonstrates
            your competence — but a strong practical alone is not enough.
          </p>
        </div>
      </motion.section>

      {/* ── Component 1: Knowledge test ─────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Component 1 · 25%"
          title="Knowledge test"
          meta="2 hours · multiple choice + short answer · supervised"
          action={<ComponentChip icon={FileText} />}
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            The knowledge test assesses your understanding of electrical theory,
            regulations, and safety principles. Written examination, mix of
            multiple-choice and short-answer questions, under supervised exam
            conditions at a venue arranged by your EPAO.
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
              <span className="font-semibold text-elec-yellow">Typical pass mark:</span>{' '}
              ~60% Pass, ~70% Merit, ~80%+ Distinction. Exact thresholds vary by
              EPAO — your provider will confirm the grade boundaries.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Component 2: Practical observation ──────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Component 2 · 50%"
          title="Practical observation"
          meta="6–8 hours · observed by EPAO assessor"
          action={<ComponentChip icon={ClipboardCheck} />}
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            The largest component at 50%. An independent assessor observes you
            completing electrical installation work in a realistic working
            environment — your workplace, your training provider's workshop, or
            a designated assessment centre. The assessor watches, takes notes,
            and may ask clarifying questions.
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
                  <span className="text-[12.5px] text-white/85 leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                <span className="font-semibold text-red-300">Critical:</span>{' '}
                Failure to follow safe isolation correctly can result in an
                immediate fail of the practical, regardless of the quality of
                other work. Practise it until it\'s second nature.
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

      {/* ── Component 3: Professional discussion ────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Component 3 · 25%"
          title="Professional discussion"
          meta="60 minutes · 1-to-1 with EPAO assessor · portfolio-based"
          action={<ComponentChip icon={MessageSquare} />}
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            A structured, in-depth conversation between you and an EPAO assessor,
            based on your portfolio. Covers the KSBs not fully assessed through
            the knowledge test and practical. NOT a Q&A exam — a professional
            conversation where you demonstrate understanding, decision-making,
            and growth throughout your apprenticeship.
          </p>
          <div className="space-y-2">
            <Eyebrow>Topics you'll discuss</Eyebrow>
            <ul className="space-y-1.5">
              {discussionTopics.map((t) => (
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
          <div className="rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.04] p-3 space-y-2">
            <Eyebrow className="text-elec-yellow/85">Your portfolio must include</Eyebrow>
            <ul className="space-y-1.5">
              {portfolioMust.map((t) => (
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
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <Eyebrow>How to perform well</Eyebrow>
            <ul className="space-y-1.5">
              {discussionTips.map((t) => (
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
        </div>
      </motion.section>

      {/* ── Pathways ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Pathways"
          title="Installation vs maintenance"
          meta="Same standard, same EPA — different emphasis"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <PathwayCard
            title="Installation electrician"
            items={[
              'Practical focuses on new installation — wiring from scratch, containment, working from plans',
              'Knowledge test emphasises circuit design, cable selection, installation methods, initial verification',
              'Portfolio shows a range of installation projects — domestic, commercial, industrial',
              'Professional discussion covers installation planning, specification interpretation, QA',
            ]}
          />
          <PathwayCard
            title="Maintenance electrician"
            items={[
              'Practical focuses on fault finding, repair, and maintenance — diagnosing issues, replacing components, periodic inspection',
              'Knowledge test emphasises fault diagnosis theory, periodic inspection, maintenance planning',
              'Portfolio shows maintenance activities — fault logs, repair records, PPM schedules',
              'Professional discussion covers diagnostic approaches, maintenance strategies, equipment lifecycle',
            ]}
          />
        </div>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Note:</span> The
            core KSBs are the same for both pathways. The difference is
            emphasis and the types of tasks during the practical. Discuss your
            pathway with your training provider to focus your preparation.
          </p>
        </div>
      </motion.section>

      {/* ── What assessors look for ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What assessors look for"
          title="Six priorities — in order"
          meta="What separates Pass from Distinction"
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
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {item.description}
                  </p>
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
          title="Not isolated tests — connected components"
          meta="Prepare for all three simultaneously"
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
          title="What to bring, by component"
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
          title="Knowledge → practical → discussion"
          meta="Decided by your EPAO, but a common sequence"
        />
        <ol className="space-y-2">
          {[
            {
              step: 1,
              title: 'Knowledge test first',
              description:
                'Usually scheduled first — confirms theoretical understanding before the practical. Results may be available before your other components.',
            },
            {
              step: 2,
              title: 'Practical observation',
              description:
                'Most complex to schedule due to the 6–8 hour duration. May take place at your workplace, training provider, or assessment centre.',
            },
            {
              step: 3,
              title: 'Professional discussion last',
              description:
                'Often last because the assessor can reference your practical performance during the discussion. Usually at your training provider or video call.',
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
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Note:</span> Some
            EPAOs schedule all three on consecutive days, others spread them
            over weeks. Your training provider will confirm the schedule once
            your EPAO has arranged dates.
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
      <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
        {title}
      </h3>
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
