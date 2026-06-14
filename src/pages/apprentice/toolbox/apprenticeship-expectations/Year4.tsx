/**
 * Year4 — editorial Year 4 apprenticeship guide (Qualification & launch).
 *
 * AM2S, 18th Edition, JIB grading, specialisation, career launch.
 * Full editorial rewrite with EPA pass-rate stats, specialisation
 * options, career pathways, job search tips, and the full 4-year salary
 * journey.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Zap,
  Target,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  ChevronDown,
  Search,
  Users,
  Award,
  Sun,
  Building2,
  Rocket,
  GraduationCap,
  PartyPopper,
  FileText,
  DollarSign,
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
    month: 'Month 37–38',
    title: 'Specialisation focus',
    focus: 'Choose and develop specialist skills',
    icon: Target,
    activities: [
      'Select specialisation pathway — industrial, renewables, smart tech, or testing',
      'Advanced technical training — specialist courses and certifications',
      'Industry certification pursuit — manufacturer training and accreditations',
      'Specialist project involvement — getting hands-on with your chosen area',
      'Reach out to specialists in your network for shadowing',
    ],
    dayInLife:
      "This is where you start to shape your future. The specialisation you choose now can define your career for years — but it doesn't lock you in forever.",
  },
  {
    month: 'Month 39–40',
    title: 'EPA execution',
    focus: 'Complete the AM2S End Point Assessment',
    icon: Award,
    activities: [
      'Final EPA preparation — mock assessments and revision',
      'AM2S practical — a single integrated assessment (~16–18 hours, typically over ~2.5 days) at a NET booth',
      'Safe isolation, composite install, inspection & testing, and fault diagnosis — all observed and assessed',
      'Embedded online multiple-choice applied-knowledge test (Section E)',
      'Sleep, eat, hydrate — treat assessment week like an athlete',
    ],
    dayInLife:
      "The big moment arrives. Everything you've worked for over 4 years comes down to these assessments. You've got this.",
  },
  {
    month: 'Month 41–42',
    title: 'Career preparation',
    focus: 'Transition to qualified electrician',
    icon: Briefcase,
    activities: [
      "Job market research — what's out there in your area",
      'CV and portfolio finalisation — showing your best work',
      'Interview preparation — practising common questions',
      'Professional networking — making connections in the industry',
      'ECS card upgrade — apprentice → electrician',
    ],
    dayInLife:
      "You've passed EPA — now it's about your next chapter. Exciting time of possibilities. Negotiate like a qualified pro.",
  },
  {
    month: 'Month 43–44',
    title: 'Professional development',
    focus: 'Industry recognition and advancement',
    icon: GraduationCap,
    activities: [
      'Professional body membership — JIB, IET, NICEIC, NAPIT',
      'CPD planning — staying current as the trade evolves',
      'Advanced qualification research — HNC, degree apprenticeship, 2391',
      'Mentoring program participation — giving back to new apprentices',
      'JIB grading application — Electrician → Approved Electrician (in time)',
    ],
    dayInLife:
      "As a qualified sparky, you're investing in long-term career development and reputation. The best electricians keep learning.",
  },
  {
    month: 'Month 45–46',
    title: 'Transition planning',
    focus: 'Prepare for post-apprenticeship career',
    icon: Rocket,
    activities: [
      'Employment contract negotiation — getting the pay you deserve',
      "Further education planning — if that's your path",
      'Professional goal setting — where do you want to be in 5 years?',
      'Industry networking expansion — building your reputation',
      'Self-employment groundwork (if going that route) — insurance, tools, scheme membership',
    ],
    dayInLife:
      "Whether staying with your employer or moving on, you're now negotiating as a qualified professional. Know your worth.",
  },
  {
    month: 'Month 47–48',
    title: 'Completion & qualification',
    focus: 'Apprenticeship completion and celebration',
    icon: PartyPopper,
    activities: [
      'Final assessments and reviews — wrapping up loose ends',
      'Qualification certification — official recognition',
      'Career transition completion — starting your new role',
      'Apprenticeship graduation ceremony — celebrating your achievement',
      "Time for a proper holiday — you've earned it",
    ],
    dayInLife:
      "You did it. From that nervous first day to fully qualified electrician. Take a moment to appreciate how far you've come.",
  },
];

interface Specialisation {
  title: string;
  icon: LucideIcon;
  description: string;
  careerPaths: string[];
  averageSalary: string;
  growth: string;
  qualifications: string[];
}

const specialisationOptions: Specialisation[] = [
  {
    title: 'Industrial electrical systems',
    icon: Zap,
    description: 'High-voltage systems, motor control, and industrial automation.',
    careerPaths: ['Industrial Electrician', 'Maintenance Engineer', 'Automation Specialist'],
    averageSalary: '£35k–£45k',
    growth: 'Strong demand',
    qualifications: ['CompEx', 'HV Switching', 'PLC Programming'],
  },
  {
    title: 'Renewable energy systems',
    icon: Sun,
    description: 'Solar PV, battery storage, EV charging, and green technology.',
    careerPaths: ['Solar PV Installer', 'EV Charger Specialist', 'Energy Systems Designer'],
    averageSalary: '£32k–£42k',
    growth: 'Rapid growth',
    qualifications: ['MCS Certification', 'Solar PV Design', 'EV Installation'],
  },
  {
    title: 'Smart building technology',
    icon: Building2,
    description: 'Building automation, IoT systems, and intelligent controls.',
    careerPaths: ['Smart Building Specialist', 'BMS Engineer', 'Home Automation Expert'],
    averageSalary: '£34k–£44k',
    growth: 'Growing demand',
    qualifications: ['KNX Certification', 'BMS Programming', 'Network Fundamentals'],
  },
  {
    title: 'Testing & inspection',
    icon: Search,
    description: 'Electrical testing, EICR, and compliance verification.',
    careerPaths: ['Testing Engineer', 'Inspection Contractor', 'Compliance Specialist'],
    averageSalary: '£30k–£40k',
    growth: 'Steady demand',
    qualifications: ['2391 Inspection & Testing', '18th Edition', 'Advanced Testing'],
  },
];

interface CareerPathway {
  path: string;
  icon: LucideIcon;
  description: string;
  advantages: string[];
  considerations: string[];
  typicalSalary: string;
}

const careerPathways: CareerPathway[] = [
  {
    path: 'Employed electrician',
    icon: Building2,
    description: 'Join an established electrical contracting company.',
    advantages: [
      'Steady income and job security',
      'Continued learning from experienced colleagues',
      'Team support and resources',
      'Clear career progression structure',
    ],
    considerations: [
      'Limited control over work schedule',
      'Earning potential may be capped',
      'Subject to company policies',
    ],
    typicalSalary: '£28k–£40k',
  },
  {
    path: 'Self-employed contractor',
    icon: Rocket,
    description: 'Start your own electrical contracting business.',
    advantages: [
      'Higher earning potential',
      'Flexible working schedule',
      'Choose your own clients and jobs',
      'Build your own reputation and brand',
    ],
    considerations: [
      'Business management responsibilities',
      'Variable income — especially initially',
      'Insurance, tax, accounts, marketing',
      'Must find your own work',
    ],
    typicalSalary: '£35k–£60k+',
  },
  {
    path: 'Further education route',
    icon: GraduationCap,
    description: 'Pursue higher qualifications while working.',
    advantages: [
      'Enhanced career prospects',
      'Path to engineering roles',
      'Higher earning potential long-term',
      'Professional recognition and respect',
    ],
    considerations: [
      'Time commitment for study',
      'Course costs (though often employer-sponsored)',
      'Balancing work, study, and life',
    ],
    typicalSalary: '£35k–£55k (as engineer)',
  },
];

const epaTips = [
  'Start preparation 6+ months before EPA',
  'Complete portfolio well in advance — not the week before',
  'Attend every mock assessment offered',
  'Get good sleep before each assessment day',
];

interface JobSearchSection {
  category: string;
  icon: LucideIcon;
  tips: string[];
}

const jobSearchTips: JobSearchSection[] = [
  {
    category: 'CV & portfolio',
    icon: FileText,
    tips: [
      'Keep it to 2 pages maximum',
      'Lead with your qualifications and EPA result',
      'Include specific projects with photos',
      'Get it reviewed by your mentor or tutor',
    ],
  },
  {
    category: 'Interview prep',
    icon: Users,
    tips: [
      'Research the company before the interview',
      "Prepare examples of complex jobs you've done",
      'Be ready to discuss health & safety',
      'Ask questions about their projects and culture',
    ],
  },
  {
    category: 'Salary negotiation',
    icon: DollarSign,
    tips: [
      'Research market rates for your area',
      "Know your worth — you're newly qualified",
      'Consider the whole package: van, tools, training',
      "Don't accept the first offer if below market",
    ],
  },
];

const weeklyScheduleExample: {
  day: string;
  location: 'Site' | 'College' | 'EPA';
  activities: string;
}[] = [
  { day: 'Monday', location: 'Site', activities: 'Specialist installation work — chosen pathway' },
  { day: 'Tuesday', location: 'Site', activities: 'Independent work with minimal supervision' },
  { day: 'Wednesday', location: 'College', activities: 'EPA mock assessment + revision' },
  { day: 'Thursday', location: 'Site', activities: 'Mentoring + portfolio finalisation' },
  { day: 'Friday', location: 'EPA', activities: 'EPA practical at NET booth (when scheduled)' },
];

export default function Year4() {
  const navigate = useNavigate();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);
  const [expandedPathway, setExpandedPathway] = useState<number | null>(null);

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
          eyebrow="Apprentice · Year 4"
          title="Qualification & career launch"
          description="The finish line is in sight. Year 4 is about completing your EPA, choosing your specialisation, and launching your career as a fully qualified electrician. This is what you've been working towards."
          tone="yellow"
        />
      </motion.div>

      {/* Year progress strip — complete */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow ml-2">
            Year 4 of 4 · Final
          </span>
        </div>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
      >
        <StatCell label="Duration" value="12 mo" />
        <StatCell label="Salary" value="£28–35k" mono />
        <StatCell label="Your goal" value="AM2S" highlight />
        <StatCell label="At year end" value="Qualified" highlight />
      </motion.div>

      {/* ── Complete salary journey ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="The complete journey"
          title="From £16.5k to £35k+"
          meta="Year-by-year salary growth across the apprenticeship"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="grid grid-cols-5 gap-2">
            <SalaryYear label="Yr 1" value="£16.5k" />
            <SalaryYear label="Yr 2" value="£20k" />
            <SalaryYear label="Yr 3" value="£26k" />
            <SalaryYear label="Yr 4" value="£32k" highlight />
            <SalaryYear label="Qual." value="£35k+" highlight />
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-white/[0.04]">
            <TrendingUp className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              From <span className="font-mono text-white">£16.5k</span> to{' '}
              <span className="font-mono text-elec-yellow">£35k+</span> in 4 years — more than
              double your starting salary. Specialists and self-employed sparks can earn{' '}
              <span className="font-mono text-elec-yellow">£45k–£60k+</span>.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── EPA success ─────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="EPA success"
          title="Strong odds if you've done the work"
          meta="AM2S via NET — graded Fail / Pass / Distinction"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            The AM2S is one integrated practical assessment with an embedded online knowledge test,
            graded Fail / Pass / Distinction. Most apprentices who reach the gateway well prepared —
            portfolio complete, safe isolation and testing sequences mastered, mocks attended — pass
            first time. Treat preparation, not luck, as the deciding factor.
          </p>
          <div className="pt-3 border-t border-white/[0.04] space-y-2">
            <Eyebrow className="text-elec-yellow/85">Maximise your odds</Eyebrow>
            <ul className="space-y-1.5">
              {epaTips.map((tip) => (
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
        </div>
      </motion.section>

      {/* ── Specialisation pathways ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Specialisation pathways"
          title="Four directions to consider"
          meta="Pick what excites you — you can always pivot later"
        />
        <ul className="space-y-2">
          {specialisationOptions.map((spec) => {
            const Icon = spec.icon;
            return (
              <li
                key={spec.title}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                    <h3 className="text-[15px] font-semibold text-white tracking-tight">
                      {spec.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-elec-yellow">
                    {spec.averageSalary}
                  </span>
                </div>
                <p className="text-[13px] text-white/85 leading-relaxed">{spec.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/[0.04]">
                  <KeyValue label="Career paths" items={spec.careerPaths} />
                  <KeyValue label="Outlook" items={[spec.growth]} highlight />
                  <KeyValue label="Qualifications" items={spec.qualifications} />
                </div>
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Career pathways ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Career pathways"
          title="Three routes post-qualification"
          meta="Each has trade-offs — read the considerations"
        />
        <ul className="space-y-2">
          {careerPathways.map((path, index) => {
            const Icon = path.icon;
            const isExpanded = expandedPathway === index;
            return (
              <li
                key={path.path}
                className={cn(
                  'rounded-xl border overflow-hidden transition-colors',
                  isExpanded
                    ? 'border-elec-yellow/25 bg-elec-yellow/[0.04]'
                    : 'border-white/[0.06] bg-[hsl(0_0%_10%)]'
                )}
              >
                <button
                  onClick={() => setExpandedPathway(isExpanded ? null : index)}
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
                          {path.path}
                        </h3>
                        <span className="text-[11px] font-mono tabular-nums text-elec-yellow">
                          {path.typicalSalary}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-white/70 leading-snug">{path.description}</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
                      <div className="space-y-2">
                        <Eyebrow className="text-elec-yellow/85">Advantages</Eyebrow>
                        <ul className="space-y-1.5">
                          {path.advantages.map((a) => (
                            <li
                              key={a}
                              className="flex items-start gap-2 text-[12px] text-white/85 leading-relaxed"
                            >
                              <CheckCircle2 className="h-3 w-3 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <Eyebrow>Considerations</Eyebrow>
                        <ul className="space-y-1.5">
                          {path.considerations.map((c) => (
                            <li
                              key={c}
                              className="flex items-start gap-2 text-[12px] text-white/85 leading-relaxed"
                            >
                              <Target className="h-3 w-3 text-white/40 flex-shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Job search tips ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Job search"
          title="Three skills to land the right role"
          meta="The CV, the interview, and the negotiation"
        />
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {jobSearchTips.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.category}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {s.category}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {s.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </motion.section>

      {/* ── Monthly timeline ────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Year 4 timeline"
          title="The final 12 months"
          meta="Specialise → EPA → launch → graduate"
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

      {/* ── Typical week ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Typical week"
          title="Specialisation, EPA, and minimal supervision"
          meta="Your week starts looking like a qualified electrician's"
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
                  location === 'College' || location === 'EPA'
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

      {/* ── Closer ──────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-4 w-4 text-elec-yellow" />
            <Eyebrow className="text-elec-yellow/85">Qualified</Eyebrow>
          </div>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            When you finish Year 4 you'll be a{' '}
            <span className="font-semibold text-elec-yellow">qualified electrician</span>— Level 3
            Diploma, NVQ Level 3, AM2S passed, 18th Edition, ECS electrician card. From here it's
            your career to shape: employed, self-employed, specialist, designer, foreman, or
            trainer. The trade needs you.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
}

/* ─────────────────── Stat cell + small components ─────────────────── */

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

function SalaryYear({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-md border p-2 sm:p-3 text-center space-y-0.5',
        highlight
          ? 'border-elec-yellow/30 bg-elec-yellow/[0.06]'
          : 'border-white/[0.06] bg-white/[0.02]'
      )}
    >
      <p
        className={cn(
          'text-[9.5px] uppercase tracking-[0.14em]',
          highlight ? 'text-elec-yellow/85' : 'text-white/55'
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'text-[12px] sm:text-[13px] font-mono font-semibold tabular-nums',
          highlight ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </p>
    </div>
  );
}

function KeyValue({
  label,
  items,
  highlight,
}: {
  label: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <Eyebrow className="text-[9.5px]">{label}</Eyebrow>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              'text-[11.5px] leading-snug',
              highlight ? 'text-elec-yellow' : 'text-white/85'
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
