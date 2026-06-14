/**
 * Year3 — editorial Year 3 apprenticeship guide (Progression year).
 *
 * Commercial work, fault-finding, supervision, EPA preparation begins.
 * Full editorial rewrite with EPA component breakdown, leadership
 * opportunities, and salary progression.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Zap,
  Wrench,
  Target,
  CheckCircle2,
  TrendingUp,
  ChevronDown,
  Shield,
  Search,
  Users,
  Brain,
  Award,
  ClipboardCheck,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { cn } from '@/lib/utils';

interface MonthlyPeriod {
  month: string;
  title: string;
  focus: string;
  icon: LucideIcon;
  activities: string[];
  dayInLife: string;
}

const monthlyBreakdown: MonthlyPeriod[] = [
  {
    month: 'Month 25–26',
    title: 'Advanced installation work',
    focus: 'Complex electrical systems and installations',
    icon: Wrench,
    activities: [
      'Industrial installation principles — three-phase commercial work',
      'High-current systems — larger cables and busbars',
      'Advanced control systems — PLCs and automation basics',
      'Specialist equipment installation — machinery and plant',
      'Heavier containment — tray, ladder, cable management at scale',
    ],
    dayInLife:
      "You're trusted with more complex work now. Jobs that seemed impossible in Year 1 are now your bread and butter. Take pride in the upgrade.",
  },
  {
    month: 'Month 27–28',
    title: 'Fault finding & diagnostics',
    focus: 'Advanced troubleshooting techniques',
    icon: Search,
    activities: [
      'Systematic fault finding — a logical approach to any problem',
      'Advanced test equipment — oscilloscopes, thermal imaging, clamp meters',
      'Circuit analysis techniques — reading and interpreting schematics',
      "Repair and maintenance procedures — fixing what others can't",
      'Intermittent faults — the patience and method to chase them down',
    ],
    dayInLife:
      "When something's broken, you're increasingly the one they call. The satisfaction of finding a tricky fault is unmatched — chase the cause, not the symptom.",
  },
  {
    month: 'Month 29–30',
    title: 'Commercial systems',
    focus: 'Commercial and industrial electrical systems',
    icon: Zap,
    activities: [
      'Three-phase distribution systems — substations and HV/LV',
      'Motor control and starters — star-delta, soft starters, VSDs',
      'Building management systems — BMS and integration',
      'Emergency and fire alarm systems — critical life safety',
      'Power factor correction and harmonic distortion basics',
    ],
    dayInLife:
      "Commercial work opens new opportunities. Understanding how whole buildings work electrically gives you perspective that'll pay back for decades.",
  },
  {
    month: 'Month 31–32',
    title: 'Supervisory experience',
    focus: 'Leadership and mentoring skills',
    icon: Users,
    activities: [
      "Mentoring junior apprentices — passing on what you've learned",
      'Work planning and coordination — organising jobs efficiently',
      "Quality control and inspection — checking others' work",
      'Health and safety leadership — setting the example',
      'Toolbox talks — explaining a risk in plain language',
    ],
    dayInLife:
      "Remember your first day? Now you're helping others through theirs. Teaching reinforces your own knowledge and is great EPA prep.",
  },
  {
    month: 'Month 33–34',
    title: 'EPA preparation',
    focus: 'End Point Assessment preparation begins',
    icon: Award,
    activities: [
      'Portfolio completion and review — gathering final evidence',
      'Mock practical assessments — practising under exam conditions',
      'Safe isolation and inspection-testing drills — getting the sequences cold',
      'Applied-knowledge revision — filling any gaps before the online MCQ',
      'AM2S booth practice if your provider offers it',
    ],
    dayInLife:
      "EPA prep time. Everything you've done for 3+ years comes together now. Trust your training — you're closer than you think.",
  },
  {
    month: 'Month 35–36',
    title: 'Year 3 consolidation',
    focus: 'Skills consolidation and final stretch planning',
    icon: Star,
    activities: [
      'Advanced skills demonstration — showing what you can do',
      'Professional competency review — supervisor sign-offs',
      'Career planning discussions — what comes next?',
      'Year 4 transition preparation — final stretch planning',
      'Specialisation conversations — EV, solar, I&T, design',
    ],
    dayInLife:
      "You can see the finish line. This year is about proving you're ready to be called a qualified electrician — and choosing your direction beyond.",
  },
];

interface LearningArea {
  title: string;
  icon: LucideIcon;
  topics: string[];
}

const keyLearningAreas: LearningArea[] = [
  {
    title: 'Advanced installation methods',
    icon: Wrench,
    topics: [
      'Industrial installation techniques',
      'Three-phase low-voltage distribution (up to 1,000 V AC)',
      'Specialist containment systems',
      'Advanced jointing techniques',
      'Complex distribution arrangements',
    ],
  },
  {
    title: 'Fault finding & diagnostics',
    icon: Search,
    topics: [
      'Systematic troubleshooting approaches',
      'Advanced test equipment operation',
      'Circuit analysis and diagnosis',
      'Repair techniques and procedures',
      'Preventive maintenance principles',
    ],
  },
  {
    title: 'Commercial & industrial systems',
    icon: Zap,
    topics: [
      'Three-phase power distribution',
      'Motor control systems (DOL, star-delta, VSD)',
      'Building services integration',
      'Emergency lighting systems',
      'Fire alarm and security systems',
    ],
  },
  {
    title: 'Leadership & mentoring',
    icon: Users,
    topics: [
      'Supervising junior apprentices',
      'Work planning and organisation',
      'Communication and delegation',
      'Quality assurance procedures',
      'Health and safety leadership',
    ],
  },
];

interface EPASection {
  section: string;
  icon: LucideIcon;
  description: string;
}

// AM2S section map (single integrated practical assessment). The knowledge
// element is the embedded online MCQ (Section E) — not a separate component.
const epaSections: EPASection[] = [
  {
    section: 'A1 · Safe isolation & risk assessment',
    icon: Shield,
    description:
      'Carry out safe isolation correctly and assess the risks before any work begins — this gates everything that follows.',
  },
  {
    section: 'A2–A6 · Composite installation',
    icon: Wrench,
    description:
      'Install a composite circuit arrangement to specification — containment, wiring systems, terminations and accessories.',
  },
  {
    section: 'B · Inspection, testing & certification',
    icon: ClipboardCheck,
    description:
      'Inspect and test your installation in the correct sequence and complete the certification accurately.',
  },
  {
    section: 'C · Safe isolation',
    icon: Shield,
    description:
      'Demonstrate safe isolation again at the relevant stage — proving it is a habit, not a one-off.',
  },
  {
    section: 'D · Fault diagnosis & rectification',
    icon: Search,
    description: 'Diagnose and rectify faults on a live installation using a systematic approach.',
  },
  {
    section: 'E · Applied knowledge (online MCQ)',
    icon: Brain,
    description:
      'An embedded online multiple-choice test of your applied knowledge across the standard — the knowledge element sits within the AM2S, not as a separate exam.',
  },
];

const epaPrepTips = [
  'Master safe isolation cold — it appears more than once and gates the rest',
  'Practise the full inspection & testing sequence until it is second nature',
  'Develop a systematic fault-diagnosis method and stick to it under pressure',
  'Have your portfolio complete and signed off before the gateway',
  'Sit mock AM2S sessions in a booth if your provider offers them',
];

interface LeadershipOpp {
  opportunity: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  responsibilities: string[];
}

const leadershipOpportunities: LeadershipOpp[] = [
  {
    opportunity: 'Mentor new apprentices',
    icon: Users,
    description: 'Guide and support first-year apprentices through their learning journey.',
    benefits: ['Develops leadership skills', 'Reinforces your own knowledge', 'Builds confidence'],
    responsibilities: [
      'Provide technical guidance',
      'Share experiences and tips',
      'Support with challenges',
    ],
  },
  {
    opportunity: 'Lead small projects',
    icon: ClipboardCheck,
    description: 'Take responsibility for planning and executing smaller electrical projects.',
    benefits: [
      'Project management experience',
      'Increased responsibility',
      'Problem-solving skills',
    ],
    responsibilities: [
      'Plan work activities',
      'Coordinate with team members',
      'Ensure quality standards',
    ],
  },
  {
    opportunity: 'Quality assurance role',
    icon: Shield,
    description: 'Check and verify work completed by junior team members.',
    benefits: ['Attention to detail', 'Technical knowledge application', 'Quality awareness'],
    responsibilities: [
      'Inspect completed work',
      'Identify issues early',
      'Provide constructive feedback',
    ],
  },
];

interface Challenge {
  challenge: string;
  icon: LucideIcon;
  description: string;
  solutions: string[];
}

const commonChallenges: Challenge[] = [
  {
    challenge: 'EPA anxiety',
    icon: Award,
    description: 'The End Point Assessment can feel overwhelming after years of preparation.',
    solutions: [
      "Start preparation early — don't cram at the end",
      'Attend mock assessments if offered by college',
      "Talk to apprentices who've passed recently",
      "Remember — you've been preparing for 3+ years",
      'Trust your training and experience',
    ],
  },
  {
    challenge: 'Increased responsibility',
    icon: TrendingUp,
    description: 'More complex work and expectations to guide others can feel pressuring.',
    solutions: [
      "Delegate appropriately — you can't do everything",
      "Ask for help when needed — it's not weakness",
      'Set realistic expectations for yourself',
      'Learn from mistakes without dwelling on them',
      'Even qualified sparkies ask questions',
    ],
  },
  {
    challenge: 'Complex technical problems',
    icon: Search,
    description: "Advanced fault finding can be frustrating when solutions aren't obvious.",
    solutions: [
      'Develop a systematic approach to every fault',
      "Document what you've tried and the results",
      "Don't be afraid to ask for a second opinion",
      'Use manufacturer resources and tech support',
      'Every tricky fault teaches you something new',
    ],
  },
  {
    challenge: 'Mentoring others',
    icon: Users,
    description: 'Guiding junior apprentices while still learning yourself can be challenging.',
    solutions: [
      'Be patient — remember your first days',
      "You don't need to know everything to help",
      'It\'s okay to say "let\'s find out together"',
      'Teaching reinforces your own learning',
      'Set boundaries — your work matters too',
    ],
  },
];

const weeklyScheduleExample: { day: string; location: 'Site' | 'College'; activities: string }[] = [
  { day: 'Monday', location: 'Site', activities: 'Industrial installation — motor control panel' },
  { day: 'Tuesday', location: 'Site', activities: 'Commissioning and testing' },
  { day: 'Wednesday', location: 'College', activities: 'EPA preparation, revision sessions' },
  { day: 'Thursday', location: 'Site', activities: 'Fault finding on production line' },
  { day: 'Friday', location: 'Site', activities: 'Mentoring Y1 apprentice, documentation' },
];

export default function Year3() {
  const navigate = useNavigate();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/apprenticeship-expectations')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Year 3"
          title="Advanced skills & EPA prep"
          description="Year 3 is where you step up — more complex installations, fault finding, and the beginning of your End Point Assessment preparation. You'll also start mentoring junior apprentices."
          tone="yellow"
        />
      </motion.div>

      {/* Year progress strip */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-white/[0.08]" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/55 ml-2">
            Year 3 of 4
          </span>
        </div>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
      >
        <StatCell label="Duration" value="12 mo" />
        <StatCell label="Salary" value="£24–28k" mono />
        <StatCell label="Key focus" value="EPA prep" highlight />
        <StatCell label="New role" value="Mentor" highlight />
      </motion.div>

      {/* ── Salary progression ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Salary progression"
          title="Your value compounds yearly"
          meta="The biggest jump is often Year 3 → Year 4"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <StatCell label="Year 1" value="£16.5k" mono />
            <StatCell label="Year 2" value="£20k" mono />
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-3 sm:p-4 space-y-0.5">
              <Eyebrow className="text-[9.5px] text-elec-yellow/85">Year 3</Eyebrow>
              <p className="text-[14px] sm:text-[15px] font-mono font-semibold tabular-nums text-elec-yellow">
                £26k
              </p>
            </div>
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-3 sm:p-4 space-y-0.5">
              <Eyebrow className="text-[9.5px] text-elec-yellow/85">Uplift</Eyebrow>
              <p className="text-[14px] sm:text-[15px] font-mono font-semibold tabular-nums text-elec-yellow">
                +30%
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── EPA Preparation ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="End Point Assessment"
          title="The AM2S — one integrated assessment"
          meta="A single practical assessment via NET — start preparing now, not in Year 4"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="flex items-start gap-2 flex-wrap">
            <span className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[10.5px] uppercase tracking-[0.14em] text-elec-yellow">
              ~16–18 hours
            </span>
            <span className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.10] bg-white/[0.03] text-[10.5px] uppercase tracking-[0.14em] text-white/85">
              ~2.5 days
            </span>
            <span className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.10] bg-white/[0.03] text-[10.5px] uppercase tracking-[0.14em] text-white/85">
              Fail / Pass / Distinction
            </span>
          </div>
          <p className="text-[13px] text-white/85 leading-relaxed">
            The AM2S is a single integrated practical assessment run by NET, worked through in
            equipped assessment booths. There is no separate professional discussion — the
            applied-knowledge element is sat as an embedded online multiple-choice test (Section E).
          </p>
        </div>
        <ul className="space-y-2">
          {epaSections.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.section}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {s.section}
                  </h3>
                </div>
                <p className="text-[12.5px] text-white/85 leading-relaxed">{s.description}</p>
              </li>
            );
          })}
        </ul>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <Eyebrow className="text-elec-yellow/85">How to prepare</Eyebrow>
          <ul className="space-y-1.5">
            {epaPrepTips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Monthly timeline ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Year 3 timeline"
          title="What each month looks like"
          meta="Tap any period for daily reality"
        />
        <ul className="space-y-2">
          {monthlyBreakdown.map((period, index) => {
            const Icon = period.icon;
            const isExpanded = expandedMonth === index;
            return (
              <li
                key={index}
                className={cn(
                  'rounded-xl border overflow-hidden transition-colors',
                  isExpanded
                    ? 'border-elec-yellow/25 bg-elec-yellow/[0.04]'
                    : 'border-white/[0.06] bg-[hsl(0_0%_10%)]'
                )}
              >
                <button
                  onClick={() => setExpandedMonth(isExpanded ? null : index)}
                  className="w-full text-left p-4 sm:p-5 touch-manipulation"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className={cn(
                        'h-4 w-4 flex-shrink-0 mt-0.5',
                        isExpanded ? 'text-elec-yellow' : 'text-white/55'
                      )}
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <h3 className="text-[14px] font-semibold text-white leading-snug">
                          {period.title}
                        </h3>
                        <span className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-white/55">
                          {period.month}
                        </span>
                      </div>
                      <p className="text-[12px] text-white/70 leading-snug">{period.focus}</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white/40 flex-shrink-0 transition-transform mt-0.5',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-elec-yellow/15 pt-3 animate-fade-in">
                    <div className="pl-7 space-y-3">
                      <p className="text-[12.5px] text-white/85 italic leading-relaxed">
                        "{period.dayInLife}"
                      </p>
                      <ul className="space-y-1.5">
                        {period.activities.map((activity, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Key learning areas ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Key learning areas"
          title="Where to focus your energy"
          meta="The four pillars you'll build across Year 3"
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {keyLearningAreas.map((area) => {
            const Icon = area.icon;
            return (
              <li
                key={area.title}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {area.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {area.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Leadership opportunities ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Leadership opportunities"
          title="Three ways to step up"
          meta="Each one builds the supervisory skills your AM2S and portfolio draw on"
        />
        <ul className="space-y-2">
          {leadershipOpportunities.map((opp) => {
            const Icon = opp.icon;
            return (
              <li
                key={opp.opportunity}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {opp.opportunity}
                  </h3>
                </div>
                <p className="text-[13px] text-white/85 leading-relaxed">{opp.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-white/[0.04]">
                  <div className="space-y-1.5">
                    <Eyebrow>What you get</Eyebrow>
                    {opp.benefits.map((b) => (
                      <p
                        key={b}
                        className="flex items-start gap-2 text-[12px] text-white/85 leading-relaxed"
                      >
                        <CheckCircle2 className="h-3 w-3 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </p>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <Eyebrow>What it asks</Eyebrow>
                    {opp.responsibilities.map((r) => (
                      <p
                        key={r}
                        className="flex items-start gap-2 text-[12px] text-white/85 leading-relaxed"
                      >
                        <Target className="h-3 w-3 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Typical week ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Typical week"
          title="What your schedule might look like"
          meta="More leadership, more diagnostics, more independence"
        />
        <ul className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] divide-y divide-white/[0.04] overflow-hidden">
          {weeklyScheduleExample.map(({ day, location, activities }) => (
            <li key={day} className="flex items-center gap-2.5 sm:gap-4 p-3.5 sm:p-4">
              <span className="w-14 sm:w-20 shrink-0 text-[12.5px] font-medium text-white">
                {day}
              </span>
              <span
                className={cn(
                  'inline-flex items-center justify-center h-6 px-2 rounded-md border text-[10px] font-medium uppercase tracking-[0.14em] flex-shrink-0 w-14 sm:w-16',
                  location === 'College'
                    ? 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow'
                    : 'border-white/[0.10] bg-white/[0.03] text-white/85'
                )}
              >
                {location}
              </span>
              <span className="text-[12.5px] text-white/85 flex-1 min-w-0 leading-snug">
                {activities}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Challenges ───────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Common challenges"
          title="Four Year 3-specific hurdles"
          meta="The transition from learner to junior pro"
        />
        <ul className="space-y-2">
          {commonChallenges.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedChallenge === index;
            return (
              <li
                key={item.challenge}
                className={cn(
                  'rounded-xl border overflow-hidden transition-colors',
                  isExpanded
                    ? 'border-elec-yellow/25 bg-elec-yellow/[0.04]'
                    : 'border-white/[0.06] bg-[hsl(0_0%_10%)]'
                )}
              >
                <button
                  onClick={() => setExpandedChallenge(isExpanded ? null : index)}
                  className="w-full text-left p-4 sm:p-5 touch-manipulation"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className={cn(
                        'h-4 w-4 flex-shrink-0 mt-0.5',
                        isExpanded ? 'text-elec-yellow' : 'text-white/55'
                      )}
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-[14px] font-semibold text-white leading-snug">
                        {item.challenge}
                      </h3>
                      <p className="text-[12.5px] text-white/70 leading-snug">{item.description}</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white/40 flex-shrink-0 transition-transform mt-0.5',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-elec-yellow/15 pt-3 animate-fade-in">
                    <div className="pl-7 space-y-2">
                      <Eyebrow className="text-elec-yellow/85">Solutions</Eyebrow>
                      <ul className="space-y-1.5">
                        {item.solutions.map((solution, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Closer ───────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow/85">End of Year 3</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            By the end of Year 3 you should be{' '}
            <span className="font-semibold text-elec-yellow">commercially competent</span>,
            mentoring junior apprentices with confidence, your portfolio substantially complete, and
            your EPA preparation well underway. Year 4 is the final stretch — AM2S, 18th Edition,
            and JIB grading.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
}

/* ─────────────────── Stat cell ─────────────────── */

function StatCell({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4 space-y-0.5">
      <Eyebrow className="text-[9.5px]">{label}</Eyebrow>
      <p
        className={cn(
          'text-[14px] sm:text-[15px] font-semibold tracking-tight',
          highlight ? 'text-elec-yellow' : 'text-white',
          mono && 'font-mono tabular-nums'
        )}
      >
        {value}
      </p>
    </div>
  );
}
