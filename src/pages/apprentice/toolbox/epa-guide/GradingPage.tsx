/**
 * EPA · GradingPage — editorial guide to EPA grading and results.
 *
 * Pass / Merit / Distinction descriptions, re-sits, results timeline,
 * how component grades combine, what the grade means for your career,
 * appeals process.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Award,
  Trophy,
  Sparkles,
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
import { cn } from '@/lib/utils';

interface GradeProfile {
  grade: 'Pass' | 'Merit' | 'Distinction';
  icon: LucideIcon;
  description: string;
  signals: string[];
}

const gradeProfiles: GradeProfile[] = [
  {
    grade: 'Pass',
    icon: CheckCircle2,
    description:
      'Meets all requirements of the apprenticeship standard. You\'ve demonstrated competence across all KSBs and are ready to work as a qualified electrician.',
    signals: [
      'Knowledge test — solid understanding of electrical principles, regs, and safety across all areas',
      'Practical — installation work completed safely and to an acceptable standard, safe isolation correct, accurate test results',
      'Professional discussion — communicates effectively, relevant portfolio evidence, demonstrates understanding of professional behaviours',
      'Overall — you can work competently and safely as an electrician',
    ],
  },
  {
    grade: 'Merit',
    icon: Award,
    description:
      'Exceeds requirements in several areas. Deeper understanding, initiative, efficiency, and strong problem-solving.',
    signals: [
      'Knowledge test — deeper understanding, applies knowledge to complex scenarios, thorough answers with clear reasoning',
      'Practical — efficient and methodical, high-quality workmanship, shows initiative in problem-solving',
      'Professional discussion — detailed, well-structured portfolio evidence, clear decision-making, strong professional behaviours',
      'Overall — works to a high standard, understands why (not just how), shows the qualities of an effective professional',
    ],
  },
  {
    grade: 'Distinction',
    icon: Trophy,
    description:
      'Exceeds requirements in all areas. Exceptional understanding, outstanding practical skills, and the qualities of a leader in the trade.',
    signals: [
      'Knowledge test — exceptional understanding across all areas, comprehensive and accurate answers, applies knowledge to unfamiliar scenarios',
      'Practical — outstanding quality of work, excellent efficiency, advanced skills and techniques, exemplary safe working practices',
      'Professional discussion — comprehensive portfolio with exemplary evidence, articulates complex ideas clearly, demonstrates leadership',
      'Overall — stands out as exceptional, consistently exceeds expectations, shows leadership potential and deep commitment',
    ],
  },
];

const resitOptions = [
  {
    title: 'Re-sit individual components',
    description:
      'If you fail one component but pass the others, you only re-sit the failed component. You don\'t redo the entire EPA.',
  },
  {
    title: 'One free re-sit per component',
    description:
      'Entitled to one free re-sit funded within the original £23,000 funding band. No additional cost to you or your employer.',
  },
  {
    title: 'Re-sit within 3 months',
    description:
      'Re-sit typically taken within 3 months of the original result. Training provider arranges additional support before the re-sit.',
  },
  {
    title: 'Maximum grade on re-sit',
    description:
      'On a re-sit, maximum grade achievable is typically Pass for that component. Your overall grade may be capped. Check your EPAO\'s specific policy.',
  },
  {
    title: 'Additional support before re-sit',
    description:
      'Training provider must provide additional training and support addressing the areas where you didn\'t meet the standard. Clear action plan expected.',
  },
  {
    title: 'Second failure',
    description:
      'If you fail a re-sit, a second re-sit may be possible but may require separate funding between your employer and training provider. Uncommon — most pass on re-sit.',
  },
];

const resultsCommunication = [
  {
    title: 'Timeline',
    description:
      'Results typically available within 10–15 working days of your final component. EPAO sends results to your training provider, who shares with you.',
  },
  {
    title: 'Certificate',
    description:
      'Once you pass all three, your EPAO requests your apprenticeship certificate from ESFA. Your official qualification — Level 3 Installation or Maintenance Electrician.',
  },
  {
    title: 'Certificate delivery',
    description:
      'Posted to your training provider, who passes it to you. 4–8 weeks after your final result. Contact your provider if you haven\'t received it after 8 weeks.',
  },
  {
    title: 'What your certificate shows',
    description:
      'Your name, the apprenticeship standard, your overall grade (Pass / Merit / Distinction), and the date of completion.',
  },
  {
    title: 'Digital records',
    description:
      'Completion also recorded on the Apprenticeship Service (DAS). Employer can verify through the system. Keep your own copies of EPA documentation.',
  },
];

const afterPassing = [
  'You are now a qualified Level 3 Installation Electrician or Maintenance Electrician',
  'Apply for your JIB Approved Electrician (Gold Card) — your employer or JIB can guide you through the process',
  'Eligible to register with a competent person scheme (NICEIC, NAPIT, ELECSA) once you have the required experience',
  'Your employer should review your pay — you\'re now fully qualified and should be paid accordingly',
  'Consider next steps — specialisation, further qualifications (Level 4 Design & Verification, 18th Edition updates), or self-employment',
  'Keep CPD up to date — regulations change, staying current is essential for your career',
];

const gradeCombinations = [
  { components: 'Pass + Pass + Pass', overall: 'Pass', tone: 'white' as const },
  { components: 'Merit + Pass + Merit', overall: 'Pass or Merit', tone: 'white' as const },
  { components: 'Merit + Merit + Merit', overall: 'Merit', tone: 'yellow' as const },
  { components: 'Distinction + Merit + Distinction', overall: 'Merit or Distinction', tone: 'yellow' as const },
  { components: 'Distinction + Distinction + Distinction', overall: 'Distinction', tone: 'yellow' as const },
  { components: 'Any component: Fail', overall: 'Not achieved (re-sit required)', tone: 'red' as const },
];

const careerMeaning = [
  {
    title: 'All grades are a qualification',
    description:
      'Pass, Merit, and Distinction are all the same Level 3 qualification. You\'re a qualified electrician regardless of grade.',
  },
  {
    title: 'Employers value the qualification most',
    description:
      'Most employers care that you\'ve passed, not whether you got Merit or Distinction. Practical skills, attitude, and work ethic matter more day-to-day.',
  },
  {
    title: 'Higher grades help with progression',
    description:
      'Merit or Distinction can be an advantage for new jobs, promotions, or further training. Demonstrates you went above the minimum.',
  },
  {
    title: 'JIB card is the same for all grades',
    description:
      'Your JIB Approved Electrician (Gold Card) is the same whether Pass, Merit, or Distinction. Grade doesn\'t affect your JIB status.',
  },
  {
    title: 'Competent person scheme registration',
    description:
      'NICEIC, NAPIT registration is based on qualifications and experience, not EPA grade. A Pass is sufficient.',
  },
];

const appealSteps = [
  {
    step: 1,
    title: 'Informal review',
    description:
      'Discuss the result with your training provider. They can request a breakdown of marks and identify grounds for appeal.',
  },
  {
    step: 2,
    title: 'Formal appeal to EPAO',
    description:
      'With grounds, your training provider submits a formal appeal within the specified timeframe (usually 10–20 working days).',
  },
  {
    step: 3,
    title: 'EPAO review',
    description:
      'EPAO reviews assessment evidence, assessor notes, and your appeal. May re-mark your work or arrange re-assessment with a different assessor.',
  },
  {
    step: 4,
    title: 'Outcome',
    description:
      'Written response explaining the outcome. If upheld, grade may be changed or re-assessment arranged at no additional cost.',
  },
];

function getCombinationStyles(tone: 'yellow' | 'red' | 'white') {
  switch (tone) {
    case 'yellow':
      return 'text-elec-yellow';
    case 'red':
      return 'text-red-300';
    default:
      return 'text-white';
  }
}

const GradingPage = () => {
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
          title="Grading & results"
          description="How your grade is calculated, what each grade actually looks like, re-sit options if needed, and what your grade means for your career."
          tone="yellow"
        />
      </motion.div>

      {/* ── How grading works ───────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <Eyebrow>How your grade is determined</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Overall EPA grade reflects performance across all three components.
            Each is graded individually, and your overall grade reflects combined
            performance. You must pass all three — failing any single component
            means you don\'t achieve the apprenticeship, regardless of the other
            two.
          </p>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Important:</span>{' '}
              specific grade boundaries vary by EPAO. Your training provider
              will confirm exact percentages and criteria. Descriptions below
              are general guidance based on the apprenticeship standard.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Grade profiles ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Grade profiles"
          title="Pass · Merit · Distinction"
          meta="What each grade actually demonstrates"
        />
        <ul className="space-y-2.5">
          {gradeProfiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <li
                key={profile.grade}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <span className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[10.5px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                    {profile.grade}
                  </span>
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  {profile.description}
                </p>
                <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                  <Eyebrow>What it looks like</Eyebrow>
                  <ul className="space-y-1.5">
                    {profile.signals.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Combinations ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="How component grades combine"
          title="Not a simple average"
          meta="Practical is weighted most heavily — exact matrix varies by EPAO"
        />
        <ul className="space-y-2">
          {gradeCombinations.map((combo) => (
            <li
              key={combo.components}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4"
            >
              <span className="text-[12.5px] sm:text-[13px] text-white/85 leading-snug">
                {combo.components}
              </span>
              <span
                className={cn(
                  'text-[12.5px] sm:text-[13px] font-semibold leading-snug text-right flex-shrink-0',
                  getCombinationStyles(combo.tone)
                )}
              >
                {combo.overall}
              </span>
            </li>
          ))}
        </ul>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Note:</span> exact
            grading matrices vary by EPAO. Some weight the practical more
            heavily in borderline cases. Your training provider can give you the
            specific grading criteria.
          </p>
        </div>
      </motion.section>

      {/* ── Re-sits ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="If you don't pass"
          title="Six things to know about re-sits"
          meta="It happens — there's a clear process"
        />
        <ul className="space-y-2">
          {resitOptions.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
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

      {/* ── Results ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Receiving your results"
          title="From assessment to certificate"
          meta="Five things to know about the post-EPA process"
        />
        <ul className="space-y-2">
          {resultsCommunication.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <h3 className="text-[14px] font-semibold text-white tracking-tight">
                {item.title}
              </h3>
              <p className="text-[13px] text-white/85 leading-relaxed mt-1">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── After passing ───────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="After you pass"
          title="Six next steps"
          meta="Your career begins the moment your grade lands"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-2">
            {afterPassing.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <Sparkles className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Career meaning ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="What your grade means for your career"
          title="Five honest truths"
          meta="The grade matters less than you think — mostly"
        />
        <ul className="space-y-2">
          {careerMeaning.map((item) => (
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

      {/* ── Appeals ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Appeals process"
          title="Four steps if you believe the result is unfair"
          meta="Procedural grounds, mitigating circumstances, or assessor bias"
        />
        <ol className="space-y-2">
          {appealSteps.map((item) => (
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
            <span className="font-semibold text-elec-yellow">Grounds for appeal:</span>{' '}
            procedural errors (assessment not conducted properly), mitigating
            circumstances (illness, disruption during assessment), or evidence
            of assessor bias. You can\'t appeal simply because you disagree with
            the grade — there must be specific grounds.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default GradingPage;
