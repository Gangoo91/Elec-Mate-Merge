/**
 * Year1 — editorial Year 1 apprenticeship guide (Foundation year).
 *
 * The foundation year: safety, basics, ECS card, portfolio started.
 * Full editorial rewrite — drops chunky multi-coloured Cards / Badges /
 * Progress in favour of the editorial pattern. Content retained and
 * enriched.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Wrench,
  Shield,
  Users,
  Calendar,
  Target,
  CheckCircle2,
  Clock,
  GraduationCap,
  Briefcase,
  Star,
  ChevronDown,
  Lightbulb,
  HardHat,
  Zap,
  FileText,
  Coffee,
  Heart,
  X,
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
    month: 'Month 1–2',
    title: 'Induction & orientation',
    focus: 'Workplace safety and the basics of how site works',
    icon: HardHat,
    activities: [
      'Health & safety induction — site rules, emergency procedures, sign-in books',
      "Company policies and procedures — understanding your employer's expectations",
      'Basic tool introduction — identifying and handling common tools safely',
      'College enrolment process — registering for your qualification (C&G 2365 / EAL)',
      'Meet your training officer — first portfolio conversation',
    ],
    dayInLife:
      "Your first weeks will feel overwhelming — that's normal. You'll spend time shadowing experienced sparks, learning names and getting familiar with how things flow. Watch, listen, write it down.",
  },
  {
    month: 'Month 3–4',
    title: 'Foundation learning',
    focus: 'Basic electrical principles — making theory click',
    icon: BookOpen,
    activities: [
      "Ohm's Law fundamentals — V=IR, P=IV, real numbers on real cables",
      'Basic circuit theory — current flow, series vs parallel',
      'Electrical symbols recognition — reading drawings and schematics',
      'Simple calculations — using formulas on actual job specs',
      'Cable colour code and what each conductor does',
    ],
    dayInLife:
      "You'll start connecting what you learn at college with what you see on site. Keep a notebook handy and write down every question you can't answer yet — you'll get to them.",
  },
  {
    month: 'Month 5–6',
    title: 'Practical introduction',
    focus: 'Hands-on experience — your fingers start to learn',
    icon: Wrench,
    activities: [
      'Cable stripping and termination — preparing cables to standard',
      'Basic wiring techniques — making safe, tidy connections',
      'Tool usage practice — building muscle memory',
      'Site observation — understanding how projects progress end-to-end',
      'First photos for your portfolio — get the habit started',
    ],
    dayInLife:
      "This is when things get exciting. You'll start using your hands more, making real connections, and seeing your work come to life. Document everything — your future EPA self will thank you.",
  },
  {
    month: 'Month 7–8',
    title: 'Skills development',
    focus: 'Building practical competencies independently',
    icon: Target,
    activities: [
      'Conduit bending basics — creating neat cable routes',
      'Socket and switch installation — your first complete jobs',
      'Trunking systems — commercial wiring methods',
      'Basic testing procedures — checking your work with a multimeter',
      'Safe isolation — the 7-step procedure, every single time',
    ],
    dayInLife:
      'You might start being given small tasks to complete independently. This trust is earned — keep asking questions and double-check your work. Never assume something is dead.',
  },
  {
    month: 'Month 9–10',
    title: 'Knowledge expansion',
    focus: 'Broadening understanding into three-phase and control',
    icon: GraduationCap,
    activities: [
      'Three-phase systems introduction — industrial power basics',
      'Motor connections — understanding rotating machines',
      'Control circuits basics — switches, relays, contactors',
      'First college assessments — proving your knowledge under exam conditions',
      "Reflective journal entries — what went well, what didn't",
    ],
    dayInLife:
      "College work ramps up now. Balancing site work and study takes effort — use commute time to review notes or listen to electrical podcasts. Don't cram the night before assessments.",
  },
  {
    month: 'Month 11–12',
    title: 'Year 1 consolidation',
    focus: 'Review, assessment prep, and setting up Year 2',
    icon: Star,
    activities: [
      "Portfolio development — documenting what you've done and learned",
      'Skills assessment preparation — practising under timed conditions',
      "Theory revision — filling the gaps you've identified",
      "Year 2 preparation — what's coming and where to focus",
      'ECS card refresh — confirm details, photo, qualifications',
    ],
    dayInLife:
      "Reflect on how far you've come. This is a good time to update your portfolio properly and set goals for Year 2. Your first review with your training officer matters — prepare for it.",
  },
];

interface LearningArea {
  title: string;
  icon: LucideIcon;
  topics: string[];
}

const keyLearningAreas: LearningArea[] = [
  {
    title: 'Health & safety',
    icon: Shield,
    topics: [
      'Construction (Design and Management) Regulations 2015',
      'Personal Protective Equipment (PPE) requirements and limitations',
      'Risk assessment principles and RAMS',
      'Emergency procedures and first aid awareness',
      'Safe working practices and the 7-step isolation procedure',
    ],
  },
  {
    title: 'Basic electrical theory',
    icon: BookOpen,
    topics: [
      "Ohm's Law and power calculations (P=IV)",
      'Series and parallel circuits — behaviour and calculation',
      'AC and DC fundamentals — waveforms, frequency, phase',
      'Electrical symbols and circuit diagrams',
      'Units, prefixes and measurement',
    ],
  },
  {
    title: 'Practical skills',
    icon: Wrench,
    topics: [
      'Cable preparation, stripping and termination',
      'Basic wiring techniques and connections',
      'Tool usage, care and maintenance',
      'Socket, switch and light installation',
      'Conduit bending and trunking systems',
    ],
  },
  {
    title: 'Professional development',
    icon: Users,
    topics: [
      'Communication with colleagues, supervisors and customers',
      'Teamwork and collaboration on multi-trade projects',
      'Time management and punctuality',
      'Following instructions accurately and asking when unclear',
      'Professional workplace behaviour and presentation',
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
    challenge: 'Information overload',
    icon: BookOpen,
    description:
      'Feeling overwhelmed by the amount of new information coming at you from all directions.',
    solutions: [
      'Take notes regularly — carry a small notebook on site',
      'Ask questions when unclear — there are no stupid questions in Year 1',
      'Break learning into manageable chunks — one topic at a time',
      'Use visual aids, diagrams and YouTube videos to reinforce',
    ],
  },
  {
    challenge: 'Practical vs theory gap',
    icon: Lightbulb,
    description: 'Difficulty connecting what you learn at college with what you see on site.',
    solutions: [
      'Discuss college topics with your workplace mentor',
      'Ask to see real examples of theoretical concepts on site',
      'Keep a learning journal connecting theory to practice',
      'Practise calculations using real job scenarios',
    ],
  },
  {
    challenge: 'Confidence building',
    icon: Heart,
    description:
      'Feeling nervous about making mistakes, asking questions, or "not knowing enough".',
    solutions: [
      'Everyone was a beginner once, including your mentor',
      "Asking questions shows you're engaged and want to learn",
      'Learn from mistakes rather than fearing them',
      'Celebrate small achievements — they all compound',
    ],
  },
  {
    challenge: 'Physical demands',
    icon: Zap,
    description:
      'Adjusting to the physical nature of the work — standing, lifting, awkward positions, weather.',
    solutions: [
      'Build stamina gradually — it gets easier within months',
      'Wear proper footwear with good arch support',
      'Learn proper lifting technique — protect your back early',
      'Stay hydrated and eat well to maintain energy across the day',
    ],
  },
];

const firstDaySurvival = [
  {
    item: 'Arrive 15 minutes early',
    icon: Clock,
    tip: 'Shows reliability and gives you time to settle without panic.',
  },
  {
    item: 'Bring a notebook and pen',
    icon: FileText,
    tip: "You'll need to write down instructions, names, and addresses.",
  },
  {
    item: 'Wear appropriate clothing',
    icon: HardHat,
    tip: 'Steel toe boots, work trousers, layers. No tracksuits, no shorts.',
  },
  {
    item: 'Bring lunch and water',
    icon: Coffee,
    tip: 'You may not be near shops on site. Bring more water than you think.',
  },
  {
    item: 'Have ID and documents ready',
    icon: Briefcase,
    tip: 'CSCS card, driving licence, bank details, NI number.',
  },
  {
    item: 'Charge your phone fully',
    icon: Zap,
    tip: 'You may need to call, use maps, or download safety apps.',
  },
];

const basicToolkit = [
  { tool: 'Side cutters', purpose: 'Cutting cables cleanly', priority: 'Essential' as const },
  {
    tool: 'Combination pliers',
    purpose: 'Gripping and twisting wires',
    priority: 'Essential' as const,
  },
  {
    tool: 'Wire strippers',
    purpose: 'Removing cable insulation safely',
    priority: 'Essential' as const,
  },
  { tool: 'Flat screwdriver set', purpose: 'Terminal connections', priority: 'Essential' as const },
  {
    tool: 'Phillips screwdriver set',
    purpose: 'Accessory fixings',
    priority: 'Essential' as const,
  },
  {
    tool: 'Voltage tester (GS38)',
    purpose: 'Checking circuits are dead',
    priority: 'Essential' as const,
  },
  { tool: 'Tape measure (5m)', purpose: 'Measuring cable runs', priority: 'Essential' as const },
  { tool: 'Stanley knife', purpose: 'Cutting and stripping', priority: 'Essential' as const },
  { tool: 'Electrical tape', purpose: 'Insulation and marking', priority: 'Essential' as const },
  {
    tool: 'Spirit level (small)',
    purpose: 'Keeping accessories straight',
    priority: 'Useful' as const,
  },
  { tool: 'Torch / headlamp', purpose: 'Working in dark spaces', priority: 'Useful' as const },
  { tool: 'Tool belt or pouch', purpose: 'Keeping tools accessible', priority: 'Useful' as const },
];

const weeklyScheduleExample: { day: string; location: 'Site' | 'College'; activities: string }[] = [
  { day: 'Monday', location: 'Site', activities: 'Working with mentor on domestic rewire' },
  { day: 'Tuesday', location: 'Site', activities: 'Continuing rewire — first fix work' },
  { day: 'Wednesday', location: 'College', activities: 'Theory classes + practical workshop' },
  { day: 'Thursday', location: 'Site', activities: 'Second fix and testing observation' },
  { day: 'Friday', location: 'Site', activities: 'Finishing jobs, site cleanup, portfolio time' },
];

const successDos = [
  'Ask questions — lots of them, every day',
  'Be early, every day, even Mondays',
  'Keep your portfolio up to date weekly, not monthly',
  'Help with cleanup and tidying without being asked',
  'Stay off your phone on site',
];

const successDonts = [
  "Pretending you understand when you don't",
  'Skipping college or being late',
  'Leaving your portfolio until the end',
  'Being afraid to make mistakes',
  'Thinking you know it all',
];

const thrivingSigns = [
  'Asks questions, then remembers the answer',
  'Portfolio is current — photos logged the same week',
  'Proves dead before touching, every single time',
  'Early, prepared, phone away on site',
  'Volunteers for the boring jobs without sulking',
];

const strugglingSigns = [
  "Goes quiet rather than admitting they're lost",
  'Portfolio empty until a review forces it',
  'Cuts corners on safe isolation when rushed',
  'Late or absent at college, missing assessments',
  'Waits to be told everything, takes no initiative',
];

export default function Year1() {
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
          eyebrow="Apprentice · Year 1"
          title="Building your foundations"
          description="The foundation year — safety first, then electrical principles, then practical skills. The habits you build now (portfolio cadence, asking questions, showing up early) compound through years 2, 3 and 4."
          tone="yellow"
        />
      </motion.div>

      {/* ── Year progress strip ──────────────────────────────────── */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-white/[0.08]" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-white/[0.08]" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-white/[0.08]" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/55 ml-2">
            Year 1 of 4
          </span>
        </div>
      </motion.div>

      {/* ── Year stats KPI strip ─────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
      >
        <StatCell label="Duration" value="12 mo" />
        <StatCell label="Salary" value="£15–18k" mono />
        <StatCell label="College" value="~1 day/wk" />
        <StatCell label="Primary focus" value="Safety" highlight />
      </motion.div>

      {/* ── First day survival ───────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="First day survival"
          title="Six things to nail on day one"
          meta="Reliability + preparation = first impression"
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {firstDaySurvival.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.item}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 flex items-start gap-3"
              >
                <Icon className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 space-y-1">
                  <p className="text-[13.5px] font-medium text-white leading-snug">{item.item}</p>
                  <p className="text-[12px] text-white/70 leading-relaxed">{item.tip}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Basic toolkit ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Basic toolkit"
          title="What to acquire across Year 1"
          meta="Ask your employer what's provided before buying"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] divide-y divide-white/[0.04]">
          {basicToolkit.map((item) => (
            <div key={item.tool} className="flex items-start justify-between gap-3 p-3.5 sm:p-4">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <Wrench className="h-3.5 w-3.5 text-white/40 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 space-y-0.5">
                  <p className="text-[13px] font-medium text-white leading-snug">{item.tool}</p>
                  <p className="text-[11.5px] text-white/55 leading-snug">{item.purpose}</p>
                </div>
              </div>
              <span
                className={cn(
                  'inline-flex items-center h-6 px-2 rounded-md border text-[10px] font-medium uppercase tracking-[0.14em] flex-shrink-0',
                  item.priority === 'Essential'
                    ? 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow'
                    : 'border-white/[0.10] bg-white/[0.03] text-white/85'
                )}
              >
                {item.priority}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            <span className="font-semibold text-elec-yellow">Buy once, cry once.</span> Quality
            tools last decades — Knipex, Wera, Bahco, Klein. Cheap pliers will fail mid-termination
            and embarrass you in front of a supervisor.
          </p>
        </div>
      </motion.section>

      {/* ── Monthly timeline ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Year 1 timeline"
          title="What each month looks like"
          meta="Tap any period for daily reality and what to focus on"
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
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-3 border-t border-elec-yellow/15 pt-3 animate-fade-in">
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

      {/* ── Key learning areas ───────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Key learning areas"
          title="Where to focus your energy"
          meta="The four pillars you'll build across Year 1"
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

      {/* ── Typical week ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Typical week"
          title="What your schedule might look like"
          meta="Your specifics vary — but the cadence usually doesn't"
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
          title="Four things every Year 1 hits"
          meta="Knowing they're coming makes them easier to handle"
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

      {/* ── Keys to success ──────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Keys to year 1 success"
          title="Five do, five don't"
          meta="The habits that separate apprentices who finish year 1 strong"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
              <Eyebrow className="text-elec-yellow/85">Do these things</Eyebrow>
            </div>
            <ul className="space-y-1.5">
              {successDos.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <span className="text-elec-yellow font-mono mt-0.5">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/[0.10] bg-white/[0.02] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-white/55" />
              <Eyebrow className="text-white/55">Avoid these mistakes</Eyebrow>
            </div>
            <ul className="space-y-1.5">
              {successDonts.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <span className="text-white/40 font-mono mt-0.5">−</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Thriving vs struggling ───────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Where you stand"
          title="Thriving vs struggling in year 1"
          meta="An honest mirror — the difference is habits, not talent"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-elec-yellow" />
              <Eyebrow className="text-elec-yellow/85">A thriving year 1</Eyebrow>
            </div>
            <ul className="space-y-1.5">
              {thrivingSigns.map((item) => (
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
          <div className="rounded-xl border border-white/[0.10] bg-white/[0.02] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-white/55" />
              <Eyebrow className="text-white/55">Warning signs</Eyebrow>
            </div>
            <ul className="space-y-1.5">
              {strugglingSigns.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <span className="text-white/40 font-mono mt-0.5">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            See yourself on the right? It&apos;s fixable, and the earliest fix is the easiest. Tell
            your mentor or training assessor you want to get back on track — they would far rather
            hear it now than at your year-end review.
          </p>
        </div>
      </motion.section>

      {/* ── Closer ───────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow/85">End of year 1</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            By the end of year 1 you should have your{' '}
            <span className="font-semibold text-elec-yellow">ECS apprentice card</span>, a portfolio
            populated with photos and tasks completed, the 7-step safe isolation procedure
            memorised, and a clear sense of which areas you'll want to specialise in. Next stop —
            year 2: development.
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
