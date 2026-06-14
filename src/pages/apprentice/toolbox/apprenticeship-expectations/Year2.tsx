/**
 * Year2 — editorial Year 2 apprenticeship guide (Development year).
 *
 * BS 7671, installations, testing basics. Full editorial rewrite with
 * salary progression, BS 7671 survival guide, test equipment guide,
 * development milestones.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Zap,
  FileText,
  Wrench,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  ChevronDown,
  Lightbulb,
  Settings,
  Gauge,
  Brain,
  Award,
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
    month: 'Month 13–14',
    title: 'Regulations introduction',
    focus: 'BS 7671 Wiring Regulations fundamentals',
    icon: BookOpen,
    activities: [
      'Introduction to BS 7671 — its purpose, structure, and authority',
      'Regulation structure — learning to navigate the "Big Blue Book"',
      'Design principles basics — understanding circuit design',
      'Cable selection fundamentals — choosing the right conductor and CSA',
      'How the On-Site Guide complements the full Regs',
    ],
    dayInLife:
      'The "Big Blue Book" becomes your new best friend. It seems daunting at first, but you\'ll soon learn to find what you need quickly. Tag the parts you reference most.',
  },
  {
    month: 'Month 15–16',
    title: 'Installation methods',
    focus: 'Practical installation techniques across systems',
    icon: Wrench,
    activities: [
      'Different wiring systems — PVC, SWA, MICC, conduit',
      'Cable routing and support — clipping distances and methods',
      'Containment systems — trunking, tray, basket, ladder',
      'Protection methods — MCBs, RCDs, RCBOs, isolators',
      'Earthing arrangements — TN-S, TN-C-S (PNB / PME), TT',
    ],
    dayInLife:
      "You'll start working more independently on installations. Your mentor will check your work but give you more responsibility. Be deliberate — neat work compounds.",
  },
  {
    month: 'Month 17–18',
    title: 'Testing & inspection basics',
    focus: 'Introduction to electrical testing equipment',
    icon: Gauge,
    activities: [
      'Test equipment introduction — multifunction testers and their uses',
      'Continuity testing — ring final circuits and protective conductors',
      'Insulation resistance testing — understanding acceptable values',
      'Basic fault finding — systematic approaches to problem solving',
      'Test sequencing — why the order matters',
    ],
    dayInLife:
      'Learning to test properly is crucial. Your first tests will feel slow, but accuracy matters more than speed at this stage. Get the sequence right every time.',
  },
  {
    month: 'Month 19–20',
    title: 'Advanced installations',
    focus: 'More complex commercial and industrial work',
    icon: Zap,
    activities: [
      'Three-phase installations — commercial and industrial basics',
      'Motor control circuits — DOL starters and contactors',
      'Distribution board work — sub-main installations',
      'Emergency lighting systems — maintained and non-maintained',
      'Voltage drop and disconnection times — calculations on real circuits',
    ],
    dayInLife:
      'Industrial work opens up new challenges. Three-phase can be intimidating but follows the same principles you already know — just rotated 120°.',
  },
  {
    month: 'Month 21–22',
    title: 'Portfolio development',
    focus: 'Evidence collection and documentation',
    icon: FileText,
    activities: [
      'Work-based evidence gathering — photos, signatures, documents',
      'Portfolio structuring — organising evidence properly',
      'Photographic evidence — quality images of your work',
      'Competency demonstration — proving what you can do',
      'Cross-referencing to NVQ units and AC criteria',
    ],
    dayInLife:
      "If you've been keeping up, this is just about organising. If not, it's time to catch up — don't leave it until Year 4. Two hours now saves twenty hours then.",
  },
  {
    month: 'Month 23–24',
    title: 'Year 2 assessment',
    focus: 'Skills consolidation and assessment',
    icon: Award,
    activities: [
      'Practical skills assessment — demonstrating competence under exam conditions',
      'Theory examination preparation — revision and past papers',
      'Portfolio submission — end of year review',
      'Year 3 preparation — looking ahead to commercial and fault-finding',
      "Reflection on year 2 — what worked, what didn't",
    ],
    dayInLife:
      "Assessment time. Stay calm, trust your training — you've been doing this work all year. The exam just proves it.",
  },
];

interface LearningArea {
  title: string;
  icon: LucideIcon;
  topics: string[];
}

const keyLearningAreas: LearningArea[] = [
  {
    title: 'BS 7671 Wiring Regulations',
    icon: BookOpen,
    topics: [
      'Regulation structure and navigation',
      'Design requirements and calculations',
      'Cable selection and sizing',
      'Protection and earthing arrangements',
      'Special locations introduction (Part 7)',
    ],
  },
  {
    title: 'Installation techniques',
    icon: Wrench,
    topics: [
      'Different wiring systems and applications',
      'Containment and support methods',
      'Jointing and termination techniques',
      'Distribution board installation',
      'Circuit protection device selection',
    ],
  },
  {
    title: 'Testing & inspection',
    icon: Gauge,
    topics: [
      'Test equipment usage and calibration',
      'Continuity testing procedures',
      'Insulation resistance testing',
      'Earth fault loop impedance',
      'RCD testing — x1, x5, ramp',
    ],
  },
  {
    title: 'Documentation skills',
    icon: FileText,
    topics: [
      'Electrical installation certificates',
      'Test result recording and interpretation',
      'Portfolio evidence collection',
      'Work method statements',
      'Risk assessment participation',
    ],
  },
];

const testEquipmentGuide = [
  {
    equipment: 'Multifunction tester',
    purpose: 'Performs multiple electrical tests in one unit',
    tests: ['Continuity', 'Insulation resistance', 'Loop impedance', 'RCD'],
    tip: 'Learn one test at a time — master continuity first',
  },
  {
    equipment: 'Voltage indicator (GS38)',
    purpose: 'Confirms circuits are dead before working',
    tests: ['Voltage presence', 'L / N / E identification'],
    tip: 'Always prove → test → prove. Never assume a circuit is dead',
  },
  {
    equipment: 'Earth loop tester',
    purpose: 'Measures impedance of the earth fault path',
    tests: ['Ze (external)', 'Zs (total loop)'],
    tip: 'Understand what the reading means, not just how to get it',
  },
  {
    equipment: 'RCD tester',
    purpose: 'Tests Residual Current Device operation',
    tests: ['Trip time', 'Trip current', 'Ramp'],
    tip: 'Know the different test modes (x1, x5, ramp) and when each applies',
  },
];

const bs7671Parts = [
  { number: 1, title: 'Scope, object and fundamental principles', key: 'Safety first — always' },
  { number: 2, title: 'Definitions', key: 'Know the terminology' },
  {
    number: 3,
    title: 'Assessment of general characteristics',
    key: 'Understanding the installation',
  },
  { number: 4, title: 'Protection for safety', key: 'Most referenced section' },
  { number: 5, title: 'Selection and erection of equipment', key: 'Day-to-day design core' },
  { number: 6, title: 'Inspection and testing', key: 'Your testing bible' },
  { number: 7, title: 'Special installations or locations', key: 'Bathrooms, pools, EV, solar' },
  {
    number: 8,
    title: 'Functional requirements (energy efficiency)',
    key: 'Prosumer / multi-source supply',
  },
];

const bs7671Tips = [
  "Use the index — don't try to memorise everything",
  'Highlight key regulations you reference often',
  'Practise "regulation finding" exercises',
  'Understand the "why", not just the "what"',
  'Compare the On-Site Guide alongside the full Regs',
];

const bs7671A4Changes = [
  'A new Part 8 — Functional requirements (Chapter 82) covering energy efficiency and prosumer / multi-source supply installations',
  'Wider requirements for arc fault detection devices (AFDDs) on certain final circuits',
  'TN-C-S supplies via a protective neutral bonding (PNB) arrangement clarified in the earthing terminology',
  'Revised model certificate and schedule forms — including new and updated schedule columns',
];

interface Challenge {
  challenge: string;
  icon: LucideIcon;
  description: string;
  solutions: string[];
}

const commonChallenges: Challenge[] = [
  {
    challenge: 'BS 7671 overwhelm',
    icon: BookOpen,
    description: 'The regulations book can seem impossibly large and complex at first.',
    solutions: [
      'Get to know Parts 4 (protection), 5 (selection & erection) and 6 (inspection & testing) — the working core — with Part 1 for scope and principles',
      'Use the On-Site Guide alongside the full regulations',
      'Practice finding regulations using the index',
      'Join study groups with other apprentices',
      "Don't try to memorise — learn to navigate",
    ],
  },
  {
    challenge: 'Testing confidence',
    icon: Gauge,
    description: 'Using expensive test equipment and interpreting results correctly.',
    solutions: [
      'Ask to observe testing before doing it yourself',
      'Understand what each test is checking for',
      'Learn acceptable values for common tests',
      'Practice on known-good circuits first',
      'Always follow the test sequence correctly',
    ],
  },
  {
    challenge: 'Increased expectations',
    icon: TrendingUp,
    description: 'More responsibility and complex tasks expected compared to Year 1.',
    solutions: [
      'Communicate when you need guidance',
      "Double-check your work before saying it's complete",
      'Ask for feedback regularly',
      'Take notes on corrections and learn from them',
      'It\'s okay to say "I haven\'t done this before"',
    ],
  },
  {
    challenge: 'Balancing theory & practice',
    icon: Brain,
    description: 'College work gets harder while site work demands more attention.',
    solutions: [
      'Connect what you learn in college to real work',
      'Use commute time for revision or podcasts',
      'Set aside dedicated study time each week',
      'Ask mentors to explain theory behind site work',
      'Keep your portfolio updated weekly, not monthly',
    ],
  },
];

interface Milestone {
  milestone: string;
  icon: LucideIcon;
  description: string;
  importance: string;
  tips: string[];
}

const developmentMilestones: Milestone[] = [
  {
    milestone: 'First BS 7671 assessment',
    icon: BookOpen,
    description: 'Successfully pass your first wiring regulations examination.',
    importance: 'Foundation for all future electrical work and certification',
    tips: [
      'Use the regulations book regularly — get comfortable with it',
      'Practice regulation finding exercises daily',
      'Join study groups with other apprentices',
    ],
  },
  {
    milestone: 'First independent test',
    icon: Gauge,
    description: 'Complete your first full electrical test sequence independently.',
    importance: 'Testing is a core skill for qualified electricians',
    tips: [
      "Understand each test's purpose before performing it",
      'Follow the correct test sequence every time',
      'Learn to interpret results, not just record them',
    ],
  },
  {
    milestone: 'Distribution board install',
    icon: Zap,
    description: 'Complete a consumer unit or distribution board installation.',
    importance: 'Shows you can handle complex, critical work',
    tips: [
      'Plan the layout before starting',
      'Label everything clearly',
      'Take photos for your portfolio',
    ],
  },
  {
    milestone: 'Portfolio 50% complete',
    icon: FileText,
    description: 'Reach the halfway point in your evidence collection.',
    importance: 'Staying on track prevents Year 4 panic',
    tips: [
      'Review portfolio requirements regularly',
      'Collect evidence as you complete work',
      'Get supervisor signatures while tasks are fresh',
    ],
  },
];

const thrivingSigns = [
  'Finds the right regulation by navigating, not memory',
  'Sets the tester up correctly and reads results, not just records them',
  'Always proves dead, tests, then proves again before touching',
  'Portfolio is genuinely near halfway, cross-referenced to NVQ units',
  'Asks for the harder jobs and takes feedback without sulking',
];

const strugglingSigns = [
  'Still flicks blindly through the regs, gives up and guesses',
  'Records a test number without knowing if it passes or fails',
  'Treats safe isolation as a step to rush when behind schedule',
  'Portfolio barely moved since year 1 — evidence not collected',
  "Goes quiet on new tasks instead of saying it's unfamiliar",
];

const weeklyScheduleExample: { day: string; location: 'Site' | 'College'; activities: string }[] = [
  { day: 'Monday', location: 'Site', activities: 'Commercial installation — containment work' },
  { day: 'Tuesday', location: 'Site', activities: 'Distribution board installation' },
  { day: 'Wednesday', location: 'College', activities: 'BS 7671 theory + testing practical' },
  { day: 'Thursday', location: 'Site', activities: 'Final circuits and testing under supervision' },
  { day: 'Friday', location: 'Site', activities: 'Snagging, documentation, portfolio time' },
];

export default function Year2() {
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
          eyebrow="Apprentice · Year 2"
          title="Regulations & testing"
          description="Building on your foundations — Year 2 introduces BS 7671 and electrical testing. These two skills underpin everything you'll do as a qualified electrician."
          tone="yellow"
        />
      </motion.div>

      {/* Year progress strip */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-elec-yellow" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-white/[0.08]" />
          <div className="h-2 w-12 sm:w-16 rounded-full bg-white/[0.08]" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/55 ml-2">
            Year 2 of 4
          </span>
        </div>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
      >
        <StatCell label="Duration" value="12 mo" />
        <StatCell label="Salary" value="£18–22k" mono />
        <StatCell label="Key learning" value="BS 7671" highlight />
        <StatCell label="New skill" value="Testing" highlight />
      </motion.div>

      {/* ── Salary progression ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Salary progression"
          title="Your value rises with your skills"
          meta="Year-on-year jumps are normal as you take on more independent work"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatCell label="Year 1" value="£16,500" mono />
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-3 sm:p-4 space-y-0.5">
              <Eyebrow className="text-[9.5px] text-elec-yellow/85">Year 2</Eyebrow>
              <p className="text-[14px] sm:text-[15px] font-mono font-semibold tabular-nums text-elec-yellow">
                £20,000
              </p>
            </div>
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-3 sm:p-4 space-y-0.5">
              <Eyebrow className="text-[9.5px] text-elec-yellow/85">Uplift</Eyebrow>
              <p className="text-[14px] sm:text-[15px] font-mono font-semibold tabular-nums text-elec-yellow">
                +21%
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-white/[0.04]">
            <TrendingUp className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              Salaries vary by employer, region, and overtime. Your growing skills and productivity
              justify regular pay increases — ask for them.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── BS 7671 survival guide ──────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="BS 7671 survival guide"
          title="The eight parts you'll live in"
          meta="Current edition: BS 7671:2018+A4:2026 — navigation beats memorisation"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <ul className="space-y-1.5">
            {bs7671Parts.map((part) => (
              <li
                key={part.number}
                className="flex items-start sm:items-center justify-between gap-3 p-2.5 rounded-md border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                    {part.number}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[13px] text-white leading-snug">{part.title}</span>
                    <span className="block sm:hidden text-[11px] text-white/55 italic mt-0.5">
                      {part.key}
                    </span>
                  </div>
                </div>
                <span className="hidden sm:block text-[11px] text-white/55 italic flex-shrink-0">
                  {part.key}
                </span>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-white/[0.04] space-y-2">
            <Eyebrow className="text-elec-yellow/85">Top tips</Eyebrow>
            <ul className="space-y-1.5">
              {bs7671Tips.map((tip) => (
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
          <div className="pt-3 border-t border-white/[0.04] space-y-2">
            <Eyebrow className="text-elec-yellow/85">What changed in A4:2026</Eyebrow>
            <ul className="space-y-1.5">
              {bs7671A4Changes.map((change) => (
                <li
                  key={change}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <Zap className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Test equipment guide ────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Test equipment"
          title="Four instruments to know cold"
          meta="What each does, how to use it, and the one tip that matters"
        />
        <ul className="space-y-2">
          {testEquipmentGuide.map((item) => (
            <li
              key={item.equipment}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-elec-yellow/85" />
                <h3 className="text-[14px] font-semibold text-white tracking-tight">
                  {item.equipment}
                </h3>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed">{item.purpose}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tests.map((test) => (
                  <span
                    key={test}
                    className="inline-flex items-center h-7 px-2 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06] text-[11px] font-medium text-elec-yellow"
                  >
                    {test}
                  </span>
                ))}
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/[0.04]">
                <Lightbulb className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-white/85 italic leading-relaxed">{item.tip}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Monthly timeline ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Year 2 timeline"
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
          meta="The four pillars you'll build across Year 2"
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

      {/* ── Development milestones ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Development milestones"
          title="Four checkpoints to hit"
          meta="If you clear these by year end, you're on track"
        />
        <ul className="space-y-2">
          {developmentMilestones.map((m) => {
            const Icon = m.icon;
            return (
              <li
                key={m.milestone}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3 className="text-[14px] font-semibold text-white tracking-tight">
                      {m.milestone}
                    </h3>
                    <p className="text-[13px] text-white/85 leading-relaxed">{m.description}</p>
                    <p className="text-[12px] text-white/55 italic leading-relaxed">
                      {m.importance}
                    </p>
                  </div>
                </div>
                <div className="pl-7 space-y-1.5 border-t border-white/[0.04] pt-3">
                  {m.tips.map((tip) => (
                    <p
                      key={tip}
                      className="flex items-start gap-2 text-[12px] text-white/70 leading-relaxed"
                    >
                      <CheckCircle2 className="h-3 w-3 text-elec-yellow/70 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </p>
                  ))}
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
          meta="More installation, more testing, more responsibility"
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
          title="Four hurdles every Year 2 hits"
          meta="Knowing they're coming makes them easier to clear"
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

      {/* ── Thriving vs struggling ───────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Where you stand"
          title="Thriving vs struggling in Year 2"
          meta="The gap usually opens up around the regs and the test results"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-elec-yellow" />
              <Eyebrow className="text-elec-yellow/85">A thriving Year 2</Eyebrow>
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
              <Brain className="h-4 w-4 text-white/55" />
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
            Year 2 is where a quiet struggle becomes an exam fail or a portfolio backlog. If the
            regs or testing aren&apos;t clicking, say so early — ask your mentor to talk you through
            a live test, and ask your assessor for a regulation-finding session. Both are normal
            requests.
          </p>
        </div>
      </motion.section>

      {/* ── Closer ───────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow/85">End of Year 2</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            By the end of Year 2 you should be{' '}
            <span className="font-semibold text-elec-yellow">comfortable navigating BS 7671</span>,
            able to perform initial verification testing under supervision, and confident installing
            distribution boards and protective devices. Next stop — Year 3: commercial work,
            fault-finding, and supervision.
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
