/**
 * EPA · PreparationPage — editorial preparation guide.
 *
 * Knowledge / practical / discussion strategies, 4-phase timeline,
 * key calculations, BS 7671 regulation hot list, mental prep, resources.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Wrench,
  MessageSquare,
  AlertTriangle,
  Calculator,
  Library,
  Compass,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const knowledgeTips = [
  'Start with BS 7671 — Part 4 (Protection for Safety) and Part 6 (Inspection & Testing) are heavily tested. Know where to find key regs quickly',
  'Use the On-Site Guide alongside BS 7671 — simplified tables and flowcharts help you understand regs in context',
  'Study Guidance Note 3 (Inspection & Testing, 9th edition) for detailed testing procedures and expected results',
  'Practice cable sizing — voltage drop (Table 4Ab), current-carrying capacity (Section 523), correction factors',
  'Learn the fault current formulas — Zs = Ze + (R1+R2), PFC, max Zs from Tables 41.2 / 41.3',
  'Flashcards for key reg numbers — 411.3.3 (max disconnection), 415.1.1 (RCD), 612 (testing sequence)',
  'Practice past papers or mock exams under timed conditions — use the EPA Simulator in this app',
];

const knowledgeAreas = [
  'Protection against electric shock (Part 411)',
  'Protection against thermal effects (Part 421)',
  'Protection against overcurrent (Part 432)',
  'Earthing arrangements and protective conductors (Parts 542–544)',
  'Initial verification testing sequence (Regulation 612)',
  'Special locations (Part 7) — bathrooms, pools, sites',
  'Isolation and switching (Section 537)',
  'Selection and erection of wiring systems (Parts 521–529)',
];

const practicalTips = [
  'Safe isolation — practise the 5-step procedure every day until automatic. Verbalise each step as you do it',
  'Testing sequence — memorise and practise: CPCs → ring finals → IR → polarity → Zs → RCD → PFC',
  'Know your instruments — Megger, Fluke, Kewtech. Select right test, connect leads correctly, interpret results',
  'Practise interpreting drawings — circuit diagrams, wiring diagrams, layouts',
  'Work methodically — plan, gather materials, work systematically, test, inspect your own work before moving on',
  'Quality of workmanship — neat cable runs, consistent bends, correct gland sizes, proper terminations, labelling',
  'Time yourself — practical is 6–8 hours but goes quickly. Steady, efficient pace without rushing',
];

const instruments = [
  'Multifunction tester — IR, continuity, earth loop, RCD, PFC',
  'Voltage indicator (proving unit / 2-pole tester) — GS38 compliant for safe isolation',
  'Proving unit — verify your voltage indicator works before and after testing',
  'Low-resistance ohmmeter — for continuity testing (often built into MFT)',
  'Non-contact voltage detector (optional) — never rely on it for safe isolation',
];

const discussionTips = [
  'Start your portfolio from day one — collect evidence as you go, not in a last-minute panic',
  'Map every piece of evidence to specific KSBs — use a KSB mapping grid',
  'Include a variety of evidence types — photos, test results, witness testimonies, reflective accounts, CPD, certs',
  'Write reflective accounts for significant work — what happened, what you did, why those decisions, what you learned',
  'Prepare 3–5 strong examples covering multiple KSBs — know these inside out',
  'Practise answering questions — get your employer, supervisor, or provider to run mock discussions',
  'Use the STAR method — Situation, Task, Action, Result',
];

const starExample = [
  { label: 'Situation', text: 'I was asked to investigate an intermittent tripping RCD on a domestic consumer unit.' },
  { label: 'Task', text: 'I needed to identify the fault, determine the cause, and carry out a safe repair.' },
  { label: 'Action', text: 'I safely isolated the supply, then systematically tested each circuit using IR testing. I found a low IR reading on the kitchen circuit. Traced it to a damaged cable in the plinth area where moisture had penetrated a junction box. Replaced the damaged section, re-tested, and all readings were satisfactory.' },
  { label: 'Result', text: 'The RCD stopped tripping and all test results met BS 7671. I documented the repair and advised the customer to relocate the junction box to prevent future moisture ingress.' },
];

const timeline = [
  {
    period: '6 months before',
    tasks: [
      'Review your portfolio — identify gaps in KSB evidence',
      'Start filling evidence gaps with photos, testimonies, and reflective accounts',
      'Begin regular revision of BS 7671 — one Part per week',
      'Practise safe isolation daily at work',
    ],
  },
  {
    period: '3 months before',
    tasks: [
      'Complete your portfolio — all KSBs should be covered',
      'Start mock tests — past papers or the EPA Simulator',
      'Practise full testing sequences with your instruments',
      'Have your first mock professional discussion with your training provider',
    ],
  },
  {
    period: '1 month before',
    tasks: [
      'Intensify revision — focus on weak areas identified in mock tests',
      'Check all test instruments are calibrated and working correctly',
      'Practise timed practical tasks — build confidence in your speed',
      'Have a final mock professional discussion — refine your answers',
      'Review your portfolio one final time — well-organised and indexed',
    ],
  },
  {
    period: '1 week before',
    tasks: [
      'Light revision only — don\'t cram, trust your preparation',
      'Check you have everything: instruments, PPE, tools, portfolio',
      'Get a good night\'s sleep before each assessment',
      'Confirm times, locations, and what to bring with your training provider',
    ],
  },
];

const calculations = [
  {
    title: 'Voltage drop',
    formula: 'VD = (mV/A/m × Ib × L) / 1000',
    explanation:
      'Max 3% lighting (6.9V on 230V), 5% other (11.5V on 230V). Use Table 4Ab in BS 7671.',
  },
  {
    title: 'Earth fault loop impedance',
    formula: 'Zs = Ze + (R1 + R2)',
    explanation:
      'Must not exceed max Zs in Table 41.2 (BS MCBs) or Table 41.3 (fuses) for the relevant disconnection time.',
  },
  {
    title: 'Prospective fault current',
    formula: 'IPFC = Uo / Zs',
    explanation:
      'Must not exceed the rated breaking capacity of the protective device. Measured at origin and most remote point.',
  },
  {
    title: 'Current-carrying capacity',
    formula: 'It = Ib / (Ca × Cg × Ci × Cc)',
    explanation:
      'Ca = ambient temp, Cg = grouping, Ci = insulation, Cc = semi-enclosed fuse. Chosen cable must have It > Ib.',
  },
  {
    title: 'Diversity',
    formula: 'Assessed demand = connected load × diversity factor',
    explanation:
      'Used to calculate maximum demand. Diversity factors in On-Site Guide Table 1B.',
  },
  {
    title: 'Power calculations',
    formula: 'P = V × I, P = I² × R, P = V² / R',
    explanation:
      'Single-phase and three-phase. For three-phase: P = √3 × VL × IL × cos φ.',
  },
];

const regs = [
  { reg: '411.3.3', topic: 'Maximum disconnection times for final circuits (0.4s TN, 0.2s TT)' },
  { reg: '411.4.9', topic: 'Socket outlets up to 32A require 30mA RCD protection' },
  { reg: '415.1.1', topic: 'Additional protection by RCD — requirements and applications' },
  { reg: '421.1.201', topic: 'Protection against fire — cable selection in escape routes' },
  { reg: '432.1', topic: 'Protection against overcurrent — overload and fault current' },
  { reg: '522.6.201', topic: 'Cables in walls — safe zones and RCD protection' },
  { reg: '537.1.4', topic: 'Switching off for mechanical maintenance — isolation requirements' },
  { reg: '542.4', topic: 'Main earthing terminal and conductors' },
  { reg: '543.1', topic: 'Cross-sectional areas of protective conductors — Table 54.7' },
  { reg: '643.1', topic: 'Initial verification — the testing sequence' },
  { reg: '641.7', topic: 'Periodic inspection and testing requirements' },
  { reg: '701', topic: 'Special locations: bathrooms and shower rooms' },
  { reg: '711', topic: 'Special locations: exhibitions, shows, stands' },
  { reg: '717', topic: 'Special locations: mobile / transportable units' },
  { reg: '722', topic: 'Special locations: EV charging installations' },
];

const mentalPrep = [
  {
    title: 'Trust your training',
    description:
      'You\'ve been learning and practising for 3–4 years. The skills are there. EPA is about demonstrating what you already know, not learning something new.',
  },
  {
    title: 'Visualise success',
    description:
      'Before each component, visualise yourself completing it successfully. Picture yourself walking through the practical calmly and competently.',
  },
  {
    title: 'Control what you can control',
    description:
      'You can\'t control the questions or tasks. You can control your preparation, your attitude, and your response to challenges.',
  },
  {
    title: 'Manage nerves',
    description:
      'Some nerves are normal and can improve performance. If anxiety is overwhelming, slow breathing (4-4-4) before starting helps.',
  },
  {
    title: 'Sleep and nutrition',
    description:
      '7–8 hours of sleep the night before. Proper breakfast. Stay hydrated. Your brain and body need fuel to perform at their best.',
  },
  {
    title: 'Arrive early',
    description:
      'Rushing adds stress. Arrive 15–20 minutes early, settle in, compose yourself before the assessment begins.',
  },
];

const resources = [
  {
    title: 'BS 7671:2018+A4:2026',
    description:
      'The Wiring Regulations — your primary reference. A3:2024 is a free supplement adding Reg 530.3.201.',
  },
  {
    title: 'IET On-Site Guide',
    description:
      'Simplified tables and guidance for common installations. Essential for quick reference during practical work.',
  },
  {
    title: 'IET Guidance Note 3 (9th edition)',
    description:
      'Inspection & Testing — detailed procedures, expected results, and documentation.',
  },
  {
    title: 'IET Guidance Note 1',
    description:
      'Selection & Erection — cable selection, protection, and installation methods.',
  },
  {
    title: 'IET Guidance Note 8',
    description:
      'Earthing & Bonding — earthing arrangements, protective conductors, supplementary bonding.',
  },
  {
    title: "Electrician's Guide to the Building Regulations",
    description:
      'Part P requirements and how electrical work interacts with building regulations.',
  },
  {
    title: 'EPA Readiness Simulator (this app)',
    description:
      'AI-powered mock knowledge tests and professional discussions. Practise anytime on your phone.',
  },
  {
    title: 'AM2 Simulator (this app)',
    description:
      'AM2-style practical scenarios and fault-finding exercises to prepare for your AM2 assessment.',
  },
  {
    title: 'Your training provider materials',
    description:
      'Course notes, handouts, and mock papers tailored specifically to your EPA.',
  },
];

interface ComponentBlockProps {
  eyebrow: string;
  title: string;
  meta: string;
  icon: LucideIcon;
  tips: string[];
  extra?: React.ReactNode;
}

const PreparationPage = () => {
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
          title="Preparation guide"
          description="EPA preparation isn't a last-minute rush. The best results come from consistent prep across the final months. Component-by-component strategy, a 4-phase timeline, and the calculations and regs to know cold."
          tone="yellow"
        />
      </motion.div>

      {/* ── Knowledge test prep ─────────────────────────────────── */}
      <ComponentBlock
        eyebrow="Knowledge test"
        title="Study strategy"
        meta="2 hours · multiple choice + short answer · BS 7671 permitted"
        icon={BookOpen}
        tips={knowledgeTips}
        extra={
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
            <Eyebrow className="text-elec-yellow/85">Key areas to revise</Eyebrow>
            <ul className="space-y-1.5">
              {knowledgeAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* ── Practical observation prep ──────────────────────────── */}
      <ComponentBlock
        eyebrow="Practical observation"
        title="Practice strategy"
        meta="6–8 hours · observed by EPAO assessor"
        icon={Wrench}
        tips={practicalTips}
        extra={
          <>
            <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
              <Eyebrow className="text-elec-yellow/85">Instrument checklist</Eyebrow>
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                Make sure you're proficient with all of these:
              </p>
              <ul className="space-y-1.5">
                {instruments.map((item) => (
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
            <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-white/85 leading-relaxed">
                  <span className="font-semibold text-red-300">Calibration:</span>{' '}
                  All test instruments must be in calibration (within the last
                  12 months). Check the calibration sticker before the day.
                  Out-of-cal = invalid results.
                </p>
              </div>
            </div>
          </>
        }
      />

      {/* ── Professional discussion prep ────────────────────────── */}
      <ComponentBlock
        eyebrow="Professional discussion"
        title="Portfolio & discussion strategy"
        meta="60 minutes · 1-to-1 · portfolio-based conversation"
        icon={MessageSquare}
        tips={discussionTips}
        extra={
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
            <Eyebrow className="text-elec-yellow/85">Example STAR response</Eyebrow>
            {starExample.map((s) => (
              <div key={s.label} className="space-y-0.5">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-elec-yellow/85">
                  {s.label}
                </span>
                <p className="text-[12.5px] text-white/85 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* ── Timeline ────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Preparation timeline"
          title="Four phases over the final 6 months"
          meta="Each phase has its own focus and intensity"
        />
        <ul className="space-y-2">
          {timeline.map((phase) => (
            <li
              key={phase.period}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2.5"
            >
              <span className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[10.5px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                {phase.period}
              </span>
              <ul className="space-y-1.5">
                {phase.tasks.map((task) => (
                  <li
                    key={task}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Calculations ───────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Key calculations"
          title="Six formulas to know cold"
          meta="Frequently appear in the knowledge test and practical"
        />
        <ul className="space-y-2">
          {calculations.map((calc) => (
            <li
              key={calc.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <Calculator className="h-3.5 w-3.5 text-elec-yellow/85" />
                <h3 className="text-[14px] font-semibold text-white tracking-tight">
                  {calc.title}
                </h3>
              </div>
              <p className="text-[12.5px] font-mono text-elec-yellow">{calc.formula}</p>
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                {calc.explanation}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── BS 7671 regulation hot list ─────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="BS 7671 regulations"
          title="15 to know where to find quickly"
          meta="Bookmark these pages in your Regs book"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-2">
            {regs.map((item) => (
              <li key={item.reg} className="flex items-start gap-3">
                <span className="text-[12px] font-mono font-semibold text-elec-yellow tabular-nums min-w-[60px] flex-shrink-0">
                  {item.reg}
                </span>
                <span className="text-[12.5px] text-white/85 leading-relaxed">
                  {item.topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Mental prep ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Mental preparation"
          title="EPA is a mental challenge too"
          meta="Six habits to manage nerves and maintain confidence"
        />
        <ul className="space-y-2">
          {mentalPrep.map((item) => (
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

      {/* ── Resources ───────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Recommended resources"
          title="Nine references worth having"
          meta="Build your own EPA library"
        />
        <ul className="space-y-2">
          {resources.map((resource) => (
            <li
              key={resource.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <Library className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {resource.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      <span className="hidden">
        <Compass />
      </span>
    </PageFrame>
  );
};

/* ─────────────────── Component block ─────────────────── */

function ComponentBlock({ eyebrow, title, meta, icon: Icon, tips, extra }: ComponentBlockProps) {
  return (
    <motion.section variants={itemVariants} className="space-y-3">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        meta={meta}
        action={
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
            <Icon className="h-4 w-4 text-elec-yellow" />
          </span>
        }
      />
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
        <ol className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06] text-[11px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-[12.5px] text-white/85 leading-relaxed">
                {tip}
              </span>
            </li>
          ))}
        </ol>
        {extra}
      </div>
    </motion.section>
  );
}

export default PreparationPage;
