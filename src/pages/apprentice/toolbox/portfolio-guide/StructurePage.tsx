/**
 * Portfolio · StructurePage — editorial structure & planning guide.
 *
 * Recommended 8-section structure, 5-step planning guide, KSB tracking
 * method, file naming conventions, planning pitfalls, monthly review
 * checklist.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, FolderTree } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const portfolioSections = [
  {
    section: 'Section 1 — Personal information',
    contents: [
      'Your name, employer, training provider',
      'Apprenticeship start and expected end dates',
      'Apprenticeship standard reference (ST0152 v1.2)',
      'Your pathway (Installation or Maintenance)',
      'Contact details for your assessor and mentor',
    ],
  },
  {
    section: 'Section 2 — Induction & safety',
    contents: [
      'Site induction records',
      'Health and safety training certificates',
      'CSCS card details',
      'First aid training',
      'Manual handling certificate',
      'Working at height training',
    ],
  },
  {
    section: 'Section 3 — Knowledge evidence',
    contents: [
      'College coursework and assignments',
      'Written assessments and exam results',
      'Technical notes and calculations',
      'BS 7671 knowledge demonstrations',
      'Electrical science understanding',
    ],
  },
  {
    section: 'Section 4 — Skills evidence',
    contents: [
      'Installation photographs (before/during/after)',
      'Testing and inspection records',
      'Wiring diagrams you have produced',
      'Fault-finding documentation',
      'Tool and instrument competency records',
    ],
  },
  {
    section: 'Section 5 — Behaviours evidence',
    contents: [
      'Witness testimonies from supervisors',
      'Team working examples',
      'Communication evidence (emails, site reports)',
      'Initiative and problem-solving examples',
      'Professional conduct records',
    ],
  },
  {
    section: 'Section 6 — Professional development',
    contents: [
      'Training certificates (ECS, 18th Edition, AM2)',
      'CPD activity log',
      'Progress review records',
      'Self-assessment and target-setting documents',
      'Additional qualifications gained',
    ],
  },
  {
    section: 'Section 7 — Reflective accounts',
    contents: [
      'Monthly or quarterly reflective journals',
      'Project-based reflections',
      'Learning from mistakes documentation',
      'Links between theory and practice',
      'Personal development insights',
    ],
  },
  {
    section: 'Section 8 — Off-the-job training log',
    contents: [
      'OJT hours tracker',
      'College attendance records',
      'Self-study evidence',
      'Mentoring and coaching records',
      'Activities mapped to 20% minimum requirement',
    ],
  },
];

const planningSteps = [
  {
    step: 1,
    title: 'Understand your requirements',
    tasks: [
      'Read your apprenticeship standard (ST0152 v1.2) on the Skills England website',
      'Get the full KSB list from your training provider',
      'Understand the assessment criteria for each KSB',
      'Note any submission deadlines from your provider',
      'Ask your assessor what format they prefer',
    ],
  },
  {
    step: 2,
    title: 'Set up your filing system',
    tasks: [
      'Create folders for each portfolio section (digital or physical)',
      'Set up a KSB tracking spreadsheet or checklist',
      'Create a naming convention for files (e.g. 2026-02-K3-cable-sizing.jpg)',
      'Set up cloud backup (Google Drive, OneDrive, or iCloud)',
      'If physical, buy a sturdy ring binder with divider tabs',
    ],
  },
  {
    step: 3,
    title: 'Create your evidence collection plan',
    tasks: [
      'List all KSBs and identify which evidence types suit each one',
      'Plan which evidence you can collect in each year of your apprenticeship',
      'Identify gaps early — some KSBs are harder to evidence',
      'Schedule regular portfolio review sessions with your assessor',
      'Set weekly reminders to add new evidence',
    ],
  },
  {
    step: 4,
    title: 'Build your collection habits',
    tasks: [
      'Take photos of every installation you work on',
      'Write brief notes about each task on the same day',
      'Ask supervisors for witness statements immediately after tasks',
      'Save all certificates, reports, and documents straight away',
      'Reflect on what you learned at the end of each week',
    ],
  },
  {
    step: 5,
    title: 'Review and refine',
    tasks: [
      'Check your KSB tracking monthly — identify gaps',
      'Review evidence quality — replace weak items with better ones',
      'Get feedback from your assessor at each progress review',
      'Cross-reference evidence — one piece can map to multiple KSBs',
      'Prepare for gateway by ensuring full KSB coverage',
    ],
  },
];

const ksbColumns = [
  'Column 1: KSB reference (e.g. K3, S5, B2)',
  'Column 2: KSB description (e.g. "Understand cable selection and sizing")',
  'Column 3: Evidence collected (list of file names / descriptions)',
  'Column 4: Evidence type (photo, certificate, witness statement, etc.)',
  'Column 5: Date collected',
  'Column 6: Status (Not started / In progress / Complete)',
  'Column 7: Notes (any gaps, extra evidence needed)',
];

const namingExamples = [
  '2026-02-15_K3_cable-sizing-calculation.pdf',
  '2026-02-15_S5_consumer-unit-install-photo.jpg',
  '2026-02-15_B2_supervisor-witness-teamwork.pdf',
  '2026-02-15_S8_rcd-test-results.pdf',
  '2026-02-15_K7_bs7671-assignment.docx',
];

const pitfalls = [
  'Over-complicating your structure — keep it simple and consistent',
  'Not following your training provider\'s required format',
  'Creating too many sub-folders — you\'ll lose track of where things are',
  'Not including a contents page or index in physical portfolios',
  'Forgetting to update your KSB tracker when adding new evidence',
  'Planning to collect everything in Year 4 — it\'s too late by then',
  'Not making a backup plan — what happens if your laptop breaks?',
];

const monthlyChecklist = [
  'Have I added new evidence this month?',
  'Does every new piece map to at least one KSB?',
  'Are there any KSBs with no evidence yet?',
  'Have I written a reflective account this month?',
  'Are all files named correctly and in the right folder?',
  'Is my KSB tracker up to date?',
  'Have I backed up my digital portfolio this month?',
  'Do I need to request any witness statements?',
  'Is my OJT log current and accurate?',
  'Have I discussed my progress with my assessor?',
];

const StructurePage = () => {
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
          eyebrow="Apprentice · Portfolio · Structure"
          title="Structure & planning"
          description="How to lay the portfolio out, what goes where, and the structure your assessor and EPAO actually want to see."
          tone="yellow"
        />
      </motion.div>

      {/* ── Intro ───────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <Eyebrow>Why structure matters</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            A well-structured portfolio makes it easy for assessors to find
            evidence, demonstrates your organisational skills, and ensures you
            cover all required KSBs. Plan your structure early and stick to it.
          </p>
        </div>
      </motion.div>

      {/* ── Recommended structure ──────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Recommended structure"
          title="Eight sections that work"
          meta="Your training provider may have their own template — follow theirs first"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <FolderTree className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <ul className="space-y-2">
          {portfolioSections.map((item) => (
            <li
              key={item.section}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight">
                {item.section}
              </h3>
              <ul className="space-y-1">
                {item.contents.map((content) => (
                  <li
                    key={content}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <span className="text-elec-yellow/70 mt-0.5">·</span>
                    <span>{content}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── 5-step planning ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Planning guide"
          title="Five steps from setup to gateway"
          meta="Do these in order — each builds on the last"
        />
        <ol className="space-y-2">
          {planningSteps.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                  {item.step}
                </span>
                <h3 className="text-[14px] font-semibold text-white tracking-tight pt-0.5">
                  {item.title}
                </h3>
              </div>
              <ul className="space-y-1.5 pl-10">
                {item.tasks.map((task) => (
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
        </ol>
      </motion.section>

      {/* ── KSB tracking method ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="KSB tracking method"
          title="A 7-column tracker"
          meta="Simple spreadsheet or table — review monthly"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <p className="text-[13px] text-white/85 leading-relaxed">
            Create a simple spreadsheet with these columns to track your
            evidence against each KSB:
          </p>
          <ul className="space-y-1.5">
            {ksbColumns.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[12.5px] text-white/70 leading-relaxed pt-2 border-t border-white/[0.04]">
            Review this tracker monthly. Aim for 2–3 pieces of evidence per
            KSB by gateway. Quality over quantity.
          </p>
        </div>
      </motion.section>

      {/* ── File naming ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="File naming conventions"
          title="Saves hours when searching for evidence"
          meta="Use a consistent format throughout"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
            <Eyebrow className="text-elec-yellow/85">Format</Eyebrow>
            <p className="text-[13px] font-mono text-elec-yellow">
              YYYY-MM-DD_KSB-ref_description.ext
            </p>
          </div>
          <div className="space-y-2">
            <Eyebrow>Examples</Eyebrow>
            <ul className="space-y-1">
              {namingExamples.map((example) => (
                <li
                  key={example}
                  className="text-[12px] font-mono text-white/85 leading-relaxed"
                >
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Pitfalls ────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Planning pitfalls"
          title="Seven traps to avoid"
          meta="Keep it simple, follow the template"
        />
        <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {pitfalls.map((item) => (
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

      {/* ── Monthly review ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Monthly review"
          title="Ten questions to ask yourself"
          meta="Run this at the start of every month"
        />
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {monthlyChecklist.map((item) => (
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

export default StructurePage;
