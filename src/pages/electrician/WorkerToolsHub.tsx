/**
 * WorkerToolsHub
 *
 * Self-service hub for employed electricians. Built on the same editorial
 * dashboard DNA as the Electrician Hub (ElectricalHub.tsx): sticky text
 * masthead, "Hello, NAME." hero with a worker-aware verdict, an at-a-glance
 * stat band, and numbered hairline-grid tool sections (no icon buckets).
 *
 * Each tool is its own routed page under /electrician/worker-tools/* — the grid
 * cells and stat tiles navigate to those pages (no bottom sheets).
 */

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Clock, Loader2, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { JoinTeamCard } from '@/components/worker-tools/JoinTeamCard';
import { useMyTasks } from '@/hooks/useJobTasks';
import { useQsTeamContext } from '@/hooks/useQsReview';
import { useQsPendingCount } from '@/hooks/useQsReviewQueue';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';

// Dev mode whitelist - allows access without employee record
const DEV_WHITELIST = ['founder@elec-mate.com', 'andrewgangoo91@gmail.com'];

const BASE = '/electrician/worker-tools';

// ────────────────────────────────────────────────────────────────────────
// Date eyebrow + greeting — same shape as ElectricalHub / CollegeOverview
// ────────────────────────────────────────────────────────────────────────

const partOfDay = (): 'MORNING' | 'AFTERNOON' | 'EVENING' => {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
};

const dateEyebrow = (): string => {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
};

// Worker Status helpers
const getStatusLabel = (status?: string): string => {
  switch (status) {
    case 'On Site':
      return 'On Site';
    case 'En Route':
      return 'En Route';
    case 'Office':
      return 'In Office';
    case 'Off Duty':
      return 'Off Duty';
    default:
      return 'Not Set';
  }
};

const formatDuration = (dur: string): string => {
  const parts = dur.split(':');
  if (parts.length >= 2) {
    const hours = parseInt(parts[0], 10);
    const mins = parseInt(parts[1], 10);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }
  return dur;
};

// ────────────────────────────────────────────────────────────────────────
// EditorialToolGrid — hairline-grid DNA from ElectricalHub; each cell links
// to a routed tool page.
// ────────────────────────────────────────────────────────────────────────

interface ToolCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  metaTone?: string;
  badge?: number;
  to: string;
}

const EditorialToolGrid = ({
  number,
  label,
  cards,
  columns = 'three',
  onOpen,
}: {
  number: string;
  label: string;
  cards: ToolCard[];
  columns?: 'two' | 'three';
  onOpen: (to: string) => void;
}) => {
  if (cards.length === 0) return null;

  const colClass =
    columns === 'two' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
        <Eyebrow>
          {number} · {label}
        </Eyebrow>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'relative grid auto-rows-[200px] sm:auto-rows-[220px] gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
          colClass
        )}
      >
        {/* Yellow hairline ceiling */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

        {cards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onOpen(card.to)}
            aria-label={card.title}
            className="group relative bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 lg:p-7 text-left touch-manipulation flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate">
                  · {card.eyebrow}
                </span>
              </div>
              {card.badge !== undefined && card.badge > 0 && (
                <span className="shrink-0 h-5 min-w-[20px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold inline-flex items-center justify-center tabular-nums">
                  {card.badge > 9 ? '9+' : card.badge}
                </span>
              )}
            </div>

            <h3 className="mt-3 sm:mt-4 text-[20px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
              {card.title}
            </h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/60 max-w-[34ch]">
              {card.description}
            </p>

            <div className="flex-grow" />

            <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
              <span
                className={cn('text-[11px] truncate tabular-nums', card.metaTone ?? 'text-white/55')}
              >
                {card.meta ?? 'Open'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
                Open
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Stat band — at-a-glance numerals, same hairline DNA as the dashboard.
// ────────────────────────────────────────────────────────────────────────

interface StatCell {
  label: string;
  value: string | number;
  tone?: string;
  to: string;
}

const StatBand = ({ stats, onOpen }: { stats: StatCell[]; onOpen: (to: string) => void }) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="space-y-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>01 · AT A GLANCE</Eyebrow>
    </motion.div>
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      {stats.map((s) => (
        <button
          key={s.label}
          type="button"
          onClick={() => onOpen(s.to)}
          className="group relative bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_15%)] transition-colors px-5 py-6 lg:px-6 lg:py-7 text-left touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60"
        >
          <Eyebrow>{s.label}</Eyebrow>
          <div
            className={cn(
              'mt-3 sm:mt-4 font-semibold tabular-nums tracking-[-0.02em] leading-none text-[30px] sm:text-4xl lg:text-[44px]',
              s.tone ?? 'text-white'
            )}
          >
            {s.value}
          </div>
          <span className="mt-2 inline-block text-[11px] font-medium text-elec-yellow/0 group-hover:text-elec-yellow/90 transition-colors">
            Open →
          </span>
        </button>
      ))}
    </motion.div>
  </motion.section>
);

export default function WorkerToolsHub() {
  useSEO({
    title: 'Worker Tools',
    description:
      'Self-service hub for employed electricians. Timesheets, leave, team comms, and expenses.',
    noindex: true,
  });
  const navigate = useNavigate();
  const go = (to: string) => navigate(to);

  const { user } = useAuth();
  const { data: myTasks = [] } = useMyTasks();
  const openTaskCount = myTasks.filter((t) => t.status !== 'Done').length;

  // QS reviews — only surfaced to workers who are a QS (or owner/principal QS).
  const { data: qsCtx } = useQsTeamContext();
  const amIQs = Boolean(qsCtx?.am_i_qs);
  const qsPending = useQsPendingCount();

  // Push deep-links land here with ?task=<id> / ?signoff — redirect to the page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('task')) {
      navigate(`${BASE}/tasks${window.location.search}`, { replace: true });
    } else if (params.get('signoff')) {
      navigate(`${BASE}/signoffs${window.location.search}`, { replace: true });
    }
  }, [navigate]);

  const {
    employee,
    isLoadingEmployee,
    hasEmployeeRecord,
    isClockedIn,
    duration,
    todaysHours,
    leaveAllowance,
    unreadCount,
    activeJobsCount,
  } = useWorkerSelfService();

  // Dev mode: allow whitelisted emails to access without employee record
  const isDevMode = user?.email && DEV_WHITELIST.includes(user.email);
  const hasAccess = hasEmployeeRecord || isDevMode;

  // Loading state
  if (isLoadingEmployee) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  // No employee record and not in dev mode - show join-team gate
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-elec-dark">
        <div className="mx-auto max-w-lg md:max-w-2xl px-4 md:px-6 py-8">
          <Link to="/electrician">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/[0.05] -ml-2 h-11 touch-manipulation mb-6"
            >
              ← Back
            </Button>
          </Link>

          <div className="text-center py-8 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-elec-yellow/10 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-elec-yellow" />
            </div>
            <Eyebrow>Worker Tools</Eyebrow>
            <h1 className="mt-2 text-2xl font-bold text-white mb-3">Join your team</h1>
            <p className="text-white/70 max-w-sm mx-auto">
              Your account isn't linked to a company team yet. If your employer added you by email,
              signing in with that email links you automatically — otherwise enter their team invite
              code below.
            </p>
          </div>

          <JoinTeamCard onJoined={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  const firstName = employee?.name?.split(' ')[0] || 'Worker';
  const remainingDays = leaveAllowance?.remainingDays ?? null;

  // Editorial verdict: short, worker-aware, ends with a full stop.
  const verdictParts: string[] = [];
  if (isClockedIn) {
    verdictParts.push(`Clocked in ${formatDuration(duration)}`);
  } else if (todaysHours > 0) {
    verdictParts.push(`${todaysHours.toFixed(1)}h logged today`);
  }
  if (openTaskCount > 0) {
    verdictParts.push(`${openTaskCount} ${openTaskCount === 1 ? 'task' : 'tasks'} open`);
  }
  if (unreadCount > 0) {
    verdictParts.push(`${unreadCount} unread`);
  }
  const verdict =
    verdictParts.length > 0
      ? `${verdictParts.join(', ')}.`
      : isClockedIn
        ? 'You’re on the clock. Have a good shift.'
        : 'All caught up. Clock in when you’re on site.';

  const glanceStats: StatCell[] = [
    {
      label: 'Today',
      value: isClockedIn ? formatDuration(duration) : `${todaysHours.toFixed(1)}h`,
      tone: isClockedIn ? 'text-emerald-400' : 'text-white',
      to: `${BASE}/timesheets`,
    },
    {
      label: 'Open tasks',
      value: openTaskCount,
      tone: openTaskCount > 0 ? 'text-amber-400' : 'text-white',
      to: `${BASE}/tasks`,
    },
    {
      label: 'Leave left',
      value: remainingDays ?? '—',
      to: `${BASE}/leave`,
    },
    {
      label: 'Unread',
      value: unreadCount,
      tone: unreadCount > 0 ? 'text-purple-400' : 'text-white',
      to: `${BASE}/comms`,
    },
  ];

  // Section 02 · WORK
  const workCards: ToolCard[] = [
    ...(amIQs
      ? [
          {
            id: 'qs-reviews',
            eyebrow: 'Quality',
            title: 'QS Reviews',
            description: 'Review and authorise certificates awaiting QS sign-off.',
            meta: qsPending > 0 ? `${qsPending} to review` : 'All reviewed',
            metaTone: qsPending > 0 ? 'text-amber-400' : undefined,
            badge: qsPending,
            to: `${BASE}/qs-reviews`,
          },
        ]
      : []),
    {
      id: 'status',
      eyebrow: 'Status',
      title: 'My Status',
      description: 'Set where you are so the team can see your availability.',
      meta: getStatusLabel(employee?.status as string),
      to: `${BASE}/status`,
    },
    {
      id: 'timesheets',
      eyebrow: 'Time',
      title: 'Timesheets',
      description: 'Clock in and out and review your logged hours.',
      meta: isClockedIn
        ? `Clocked in · ${formatDuration(duration)}`
        : todaysHours > 0
          ? `${todaysHours.toFixed(1)}h today`
          : 'Not clocked in',
      metaTone: isClockedIn ? 'text-emerald-400' : undefined,
      to: `${BASE}/timesheets`,
    },
    {
      id: 'jobs',
      eyebrow: 'Work',
      title: 'My Jobs',
      description: 'See the jobs you’re assigned to and where they’re up to.',
      meta: activeJobsCount > 0 ? `${activeJobsCount} active` : 'View jobs',
      to: `${BASE}/jobs`,
    },
    {
      id: 'tasks',
      eyebrow: 'Tasks',
      title: 'My Tasks',
      description: 'Track what’s on your plate and claim up-for-grabs tickets.',
      meta: openTaskCount > 0 ? `${openTaskCount} open` : 'No open tasks',
      metaTone: openTaskCount > 0 ? 'text-amber-400' : undefined,
      badge: openTaskCount,
      to: `${BASE}/tasks`,
    },
    {
      id: 'signoffs',
      eyebrow: 'Sign-off',
      title: 'Sign-offs',
      description: 'Review and sign RAMS and job packs sent to you.',
      meta: 'RAMS & job packs',
      to: `${BASE}/signoffs`,
    },
  ];

  // Section 03 · PAY & TIME
  const payCards: ToolCard[] = [
    {
      id: 'pay',
      eyebrow: 'Earnings',
      title: 'My Pay',
      description: 'See approved hours, what you’ve earned, and what’s owed.',
      meta: 'Hours, earnings & owed',
      to: `${BASE}/pay`,
    },
    {
      id: 'leave',
      eyebrow: 'Leave',
      title: 'Leave',
      description: 'Request time off and track your remaining allowance.',
      meta: remainingDays !== null ? `${remainingDays} days left` : 'Request leave',
      to: `${BASE}/leave`,
    },
    {
      id: 'expenses',
      eyebrow: 'Claims',
      title: 'Expenses',
      description: 'Submit expense claims and track their approval.',
      meta: 'Submit claims',
      to: `${BASE}/expenses`,
    },
  ];

  // Section 04 · KIT & RECORDS
  const recordCards: ToolCard[] = [
    {
      id: 'credentials',
      eyebrow: 'Identity',
      title: 'Credentials',
      description: 'Your Elec-ID, qualifications and verified credentials.',
      meta: 'View Elec-ID',
      to: `${BASE}/credentials`,
    },
    {
      id: 'equipment',
      eyebrow: 'Kit',
      title: 'My Equipment',
      description: 'Tools assigned to you with PAT and calibration status.',
      meta: 'Assigned tools & PAT',
      to: `${BASE}/equipment`,
    },
    {
      id: 'progress-notes',
      eyebrow: 'Notes',
      title: 'Progress Notes',
      description: 'Log daily progress notes against your jobs.',
      meta: 'Log daily notes',
      to: `${BASE}/progress-notes`,
    },
  ];

  // Section 05 · COMMS & REPORTS
  const commsCards: ToolCard[] = [
    {
      id: 'comms',
      eyebrow: 'Messages',
      title: 'Team Comms',
      description: 'Announcements and messages from your team.',
      meta: unreadCount > 0 ? `${unreadCount} unread` : 'All caught up',
      metaTone: unreadCount > 0 ? 'text-purple-400' : undefined,
      badge: unreadCount,
      to: `${BASE}/comms`,
    },
    {
      id: 'reports',
      eyebrow: 'Report',
      title: 'Reports',
      description: 'Raise a snag, near-miss or safety incident on a job.',
      meta: 'Snag · near-miss · incident',
      to: `${BASE}/reports`,
    },
  ];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      {/* Masthead */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center h-12 gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => navigate('/electrician')}
              className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
            >
              ← Electrical Hub
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
                Worker
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                Worker Tools
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-12 sm:space-y-16 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative pt-2 sm:pt-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>{dateEyebrow()}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            <span className="text-elec-yellow">Hello, </span>
            <span className="text-white uppercase">{firstName}.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
          >
            {verdict}
          </motion.p>

          {/* Clock in / out — primary worker action */}
          <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={() => navigate(`${BASE}/timesheets`)}
              aria-label={isClockedIn ? 'Clock out' : 'Clock in'}
              className={cn(
                'group inline-flex items-center gap-2 h-11 px-5 rounded-full text-[13px] font-semibold touch-manipulation transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                isClockedIn
                  ? 'border border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                  : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
              )}
            >
              {isClockedIn ? (
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              {isClockedIn ? `Clock out · ${formatDuration(duration)}` : 'Clock in'}
            </button>
          </motion.div>
        </motion.section>

        <StatBand stats={glanceStats} onOpen={go} />

        <EditorialToolGrid number="02" label="WORK" cards={workCards} onOpen={go} />
        <EditorialToolGrid number="03" label="PAY & TIME" cards={payCards} columns="three" onOpen={go} />
        <EditorialToolGrid number="04" label="KIT & RECORDS" cards={recordCards} columns="three" onOpen={go} />
        <EditorialToolGrid number="05" label="COMMS & REPORTS" cards={commsCards} columns="two" onOpen={go} />
      </div>
    </div>
  );
}
