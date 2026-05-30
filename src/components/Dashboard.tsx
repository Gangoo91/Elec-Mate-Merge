/**
 * Inspection & Testing Dashboard — editorial redesign matching ElectricianHub
 * / SiteSafety / BusinessHub.
 *
 * Sticky text-only masthead, date-eyebrow Hero with thematic two-tone
 * headline + state-aware verdict + CTA, `01 · AT A GLANCE` HeadlineStats
 * (In progress · Part P · Expiring · Completed), optional `02 · CONTINUE`
 * row when there's a draft, then numbered hairline tool grids:
 *   03 · CORE      (Certificates · Specialist · My Reports · Notices & Labels)
 *   04 · COMPLIANCE (Expiring Certs · Customers · Part P · Circuit Designer · I&T Hub)
 *
 * The HubCard / ContinueCard chrome is gone — uniform hairline cells with
 * black 2px gaps and single-yellow accents, mobile-flat per the project
 * working agreement.
 */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import RecoverUnsavedWork from './dashboard/RecoverUnsavedWork';
import HelpPanel from './HelpPanel';
import { useNotifications } from '@/hooks/useNotifications';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { filterByTimeRange, getExpiryUrgency } from '@/utils/expiryHelper';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud } from '@/utils/reportCloud';
import { useDesignedCircuits } from '@/hooks/useDesignedCircuits';

// ─────────────────────────────────────────────────────────────────────────
// Editorial helpers
// ─────────────────────────────────────────────────────────────────────────

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

interface HeroHeadline {
  yellow: string;
  white: string;
}

const HEADLINES_OVERDUE: HeroHeadline[] = [
  { yellow: 'Test done.', white: 'Now sign it off.' },
  { yellow: 'The schedule', white: 'needs your name.' },
  { yellow: 'Inspection complete.', white: 'Make it official.' },
  { yellow: 'Loose ends.', white: 'Tie them off.' },
  { yellow: 'Compliance backlog —', white: 'clear it down.' },
];

const HEADLINES_DRAFT: HeroHeadline[] = [
  { yellow: 'Inspection in.', white: 'Cert one tap away.' },
  { yellow: 'Pick up', white: 'the test sheet.' },
  { yellow: 'Schedule done.', white: 'Sign block calling.' },
  { yellow: 'From test results', white: 'to signed PDF.' },
];

const HEADLINES_HEALTHY: HeroHeadline[] = [
  { yellow: 'Inspection &', white: 'testing, sorted.' },
  { yellow: 'Test it.', white: 'Sign it. Send it.' },
  { yellow: 'From inspection', white: 'to certificate.' },
  { yellow: 'Inspect, test,', white: 'certify.' },
  { yellow: 'Initial.', white: 'Periodic. Issued.' },
  { yellow: 'Continuity, insulation,', white: 'polarity — done.' },
];

const HEADLINES_EMPTY: HeroHeadline[] = [
  { yellow: 'First inspection.', white: 'First test. First cert.' },
  { yellow: 'Open the schedule,', white: 'fire up the megger.' },
  { yellow: 'Inspection &', white: 'testing starts here.' },
];

const pickHeadline = (pool: HeroHeadline[]): HeroHeadline => {
  const now = new Date();
  const hour = now.getHours();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return pool[(hour + dayOfYear) % pool.length];
};

// ─────────────────────────────────────────────────────────────────────────
// Sticky masthead — College pattern
// ─────────────────────────────────────────────────────────────────────────

const PageMasthead = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center h-12 gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate('/electrician')}
            className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
              Electrician
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Inspection &amp; Testing
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────

const Hero = ({
  headline,
  verdict,
  cta,
}: {
  headline: HeroHeadline;
  verdict: string;
  cta?: { label: string; onClick: () => void };
}) => (
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
      <span className="text-elec-yellow">{headline.yellow}</span>{' '}
      <span className="text-white">{headline.white}</span>
    </motion.h1>

    <motion.p
      variants={itemVariants}
      className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
    >
      {verdict}
    </motion.p>

    {cta && (
      <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
        <button
          type="button"
          onClick={cta.onClick}
          className={cn(
            'group inline-flex items-center gap-2 h-10 px-4 rounded-full',
            'border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20',
            'text-[13px] font-medium text-elec-yellow touch-manipulation transition-colors'
          )}
        >
          <span>{cta.label}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.div>
    )}
  </motion.section>
);

// ─────────────────────────────────────────────────────────────────────────
// QuickStart strip — hairline 4-cell mini-grid for one-tap cert launch.
// First cell is the primary/yellow accent (typically EICR), the rest are
// neutral. Same hairline DNA as the rest of the page so it doesn't read as
// a different visual system.
// ─────────────────────────────────────────────────────────────────────────

interface QuickLaunch {
  eyebrow: string;
  title: string;
  description: string;
  onClick: () => void;
}

const QuickStartStrip = ({
  number,
  label,
  items,
}: {
  number: string;
  label: string;
  items: QuickLaunch[];
}) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="space-y-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>
        {number} · {label}
      </Eyebrow>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

      {items.map((q) => (
        <button
          key={q.title}
          type="button"
          onClick={q.onClick}
          className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors px-5 py-5 sm:px-6 sm:py-6 flex flex-col text-left touch-manipulation"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
            {q.eyebrow}
          </span>
          <span className="mt-2 text-[18px] sm:text-[20px] font-semibold tracking-tight leading-tight text-white group-hover:text-elec-yellow transition-colors">
            {q.title}
          </span>
          <span className="mt-1.5 text-[11.5px] leading-snug text-white/55 line-clamp-2">
            {q.description}
          </span>
          <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-elec-yellow">
            Start
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      ))}
    </motion.div>
  </motion.section>
);

// ─────────────────────────────────────────────────────────────────────────
// HeadlineStats
// ─────────────────────────────────────────────────────────────────────────

interface InspStat {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  onClick: () => void;
}

const InspHeadlineStats = ({
  stats,
  number = '01',
  label = 'AT A GLANCE',
}: {
  stats: InspStat[];
  number?: string;
  label?: string;
}) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="space-y-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>
        {number} · {label}
      </Eyebrow>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="relative grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />

      {stats.map((stat) => {
        const valueStr = String(stat.value);
        const isNumericish =
          typeof stat.value === 'number' || /^[\d.,+\-/%hkm£]+$/i.test(valueStr);
        const sizeClass =
          isNumericish || valueStr.length <= 5
            ? 'text-4xl sm:text-5xl lg:text-[56px]'
            : valueStr.length <= 8
              ? 'text-3xl sm:text-4xl lg:text-5xl'
              : 'text-2xl sm:text-3xl lg:text-4xl';

        return (
          <button
            key={stat.label}
            type="button"
            onClick={stat.onClick}
            className={cn(
              'group relative bg-[hsl(0_0%_10%)] px-5 py-6 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation',
              'hover:bg-elec-yellow/[0.04] transition-colors',
              stat.accent &&
                'bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent hover:from-elec-yellow/[0.10]'
            )}
          >
            <div
              className={cn(
                'text-[10px] font-medium uppercase tracking-[0.18em]',
                stat.accent ? 'text-elec-yellow/80' : 'text-white/50'
              )}
            >
              {stat.label}
            </div>
            <span
              className={cn(
                'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                sizeClass,
                stat.accent ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {stat.value}
            </span>
            {stat.sub && (
              <span className="mt-3 text-[11.5px] text-white/55 group-hover:text-white/75 transition-colors">
                {stat.sub}
              </span>
            )}
          </button>
        );
      })}
    </motion.div>
  </motion.section>
);

// ─────────────────────────────────────────────────────────────────────────
// EditorialToolGrid — same DNA as Business Hub. Cards trigger either an
// `onClick` (for in-app section nav) or `to` (for router navigation).
// ─────────────────────────────────────────────────────────────────────────

interface ToolCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
  meta?: string;
  alert?: boolean;
}

const EditorialToolGrid = ({
  number,
  label,
  cards,
  columns = 'three',
}: {
  number: string;
  label: string;
  cards: ToolCard[];
  columns?: 'two' | 'three';
}) => {
  const navigate = useNavigate();
  if (cards.length === 0) return null;

  const colClass =
    columns === 'two'
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const largestColCount = columns === 'two' ? 2 : 3;
  const fillerCount = (largestColCount - (cards.length % largestColCount)) % largestColCount;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>
          {number} · {label}
        </Eyebrow>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'relative grid auto-rows-[220px] sm:auto-rows-[240px] gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
          colClass
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

        {cards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              if (card.onClick) card.onClick();
              else if (card.to) navigate(card.to);
            }}
            className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors p-5 sm:p-6 lg:p-7 text-left touch-manipulation flex flex-col h-full"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  · {card.eyebrow}
                </span>
              </div>
              {card.alert && (
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-400/30 bg-red-500/10 px-1.5 py-0.5 rounded">
                  Action
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
              <span className="text-[11px] text-white/55 truncate tabular-nums">
                {card.meta ?? 'Open'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
                Open
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}

        {Array.from({ length: fillerCount }).map((_, i) => (
          <div
            key={`filler-${i}`}
            aria-hidden
            className="hidden lg:block bg-[hsl(0_0%_10%)]"
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Continue card — full-width single hairline cell when there's a draft.
// ─────────────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'fire-alarm': 'Fire alarm · G1',
  'fire-alarm-commissioning': 'Fire alarm · G2',
  'fire-alarm-inspection': 'Fire alarm · G7',
  'fire-alarm-modification': 'Fire alarm · G4',
  'ev-charging': 'EV charging',
  'emergency-lighting': 'Emergency lighting',
  'pat-testing': 'PAT testing',
  'solar-pv': 'Solar PV',
  bess: 'BESS',
  'lightning-protection': 'Lightning protection',
  'g98-commissioning': 'G98',
  'g99-commissioning': 'G99',
  'smoke-co-alarm': 'Smoke / CO',
};

const ContinueRow = ({
  number,
  reportType,
  clientName,
  address,
  onClick,
}: {
  number: string;
  reportType: string;
  clientName: string;
  address: string;
  onClick: () => void;
}) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="space-y-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>{number} · CONTINUE</Eyebrow>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
      <button
        type="button"
        onClick={onClick}
        className="group w-full text-left p-5 sm:p-6 lg:p-7 hover:bg-elec-yellow/[0.04] transition-colors touch-manipulation flex flex-col gap-3"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Draft
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · {TYPE_LABELS[reportType] ?? reportType.toUpperCase()}
          </span>
        </div>
        <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
          {clientName || 'Untitled'}
        </h3>
        <p className="text-[13px] text-white/60">
          {address || 'No address'}
        </p>
        <div className="mt-2 flex items-center justify-between pt-3 border-t border-white/[0.05]">
          <span className="text-[11px] text-white/55 uppercase tracking-[0.14em]">
            Pick up where you left off
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow">
            Resume
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </button>
    </motion.div>
  </motion.section>
);

// ─────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────

const Dashboard = ({
  onNavigate,
}: {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const { notifications = [] } = useNotifications();
  const { reminders = [] } = useExpiryReminders();
  const { data: designedCircuits } = useDesignedCircuits();

  const { data: reportsData } = useQuery({
    queryKey: ['recent-certificates', user?.id],
    queryFn: async () => {
      if (!user) return { reports: [], totalCount: 0, hasMore: false };
      return await reportCloud.getUserReports(user.id, { limit: 50 });
    },
    enabled: !!user,
    staleTime: 10 * 1000,
  });

  const reports = reportsData?.reports ?? [];
  const inProgressCount = reports.filter(
    (r) => r.status === 'in-progress' || r.status === 'draft'
  ).length;
  const completedCount = reports.filter((r) => r.status === 'completed').length;
  const totalCount = reportsData?.totalCount ?? reports.length;

  const partPPending = notifications.filter(
    (n) => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled'
  );
  const partPDueCount = partPPending.length;
  const overduePartP = partPPending.some(
    (n) => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0
  );
  const partPOverdueCount = partPPending.filter(
    (n) => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0
  ).length;

  const expiringReminders = filterByTimeRange(reminders, '90');
  const expiringCount = expiringReminders.length;
  const expiredCertsCount = reminders.filter(
    (r) => getExpiryUrgency(r.expiry_date) === 'expired'
  ).length;

  const pendingDesigns = (designedCircuits || []).filter(
    (d) => d.status === 'pending' || d.status === 'in-progress'
  ).length;

  const recentDraft = reports.find((r) => r.status === 'in-progress' || r.status === 'draft');

  const handleContinue = () => {
    if (recentDraft) {
      onNavigate(recentDraft.report_type, recentDraft.report_id, recentDraft.report_type);
    }
  };

  // ── Hero state ───────────────────────────────────────────────────────
  const { headline, verdict, cta } = useMemo(() => {
    if (overduePartP || expiredCertsCount > 0) {
      const bits: string[] = [];
      if (partPOverdueCount > 0)
        bits.push(`${partPOverdueCount} Part P ${partPOverdueCount === 1 ? 'notification' : 'notifications'} overdue`);
      if (expiredCertsCount > 0)
        bits.push(`${expiredCertsCount} ${expiredCertsCount === 1 ? 'certificate' : 'certificates'} expired`);
      return {
        headline: pickHeadline(HEADLINES_OVERDUE),
        verdict: `${bits.join(' · ')}. Closing these out keeps you compliant.`,
        cta: { label: 'View action list', onClick: () => onNavigate('notifications') },
      };
    }
    if (recentDraft) {
      return {
        headline: pickHeadline(HEADLINES_DRAFT),
        verdict: `${inProgressCount} ${inProgressCount === 1 ? 'cert' : 'certs'} in progress, ${totalCount} on file. Resume the draft below or start fresh.`,
        cta: { label: 'Resume draft', onClick: handleContinue },
      };
    }
    if (totalCount > 0) {
      return {
        headline: pickHeadline(HEADLINES_HEALTHY),
        verdict: `${totalCount} ${totalCount === 1 ? 'certificate' : 'certificates'} on file, ${completedCount} completed. Pick a cert type to start the next one.`,
        cta: { label: 'Start a new cert', onClick: () => onNavigate('certificates') },
      };
    }
    return {
      headline: pickHeadline(HEADLINES_EMPTY),
      verdict:
        'No certificates yet. Pick a type — we generate the model form, run the maths, and hand you a signed PDF.',
      cta: { label: 'Start your first cert', onClick: () => onNavigate('certificates') },
    };
  }, [overduePartP, expiredCertsCount, partPOverdueCount, recentDraft, inProgressCount, totalCount, completedCount, handleContinue, onNavigate]);

  // ── Stats ────────────────────────────────────────────────────────────
  const stats: InspStat[] = [
    {
      label: 'In progress',
      value: inProgressCount,
      sub: inProgressCount > 0 ? 'Drafts open' : 'Nothing live',
      accent: true,
      onClick: () => onNavigate('my-reports'),
    },
    {
      label: 'Part P',
      value: partPDueCount,
      sub:
        partPOverdueCount > 0
          ? `${partPOverdueCount} overdue`
          : partPDueCount > 0
            ? 'Pending'
            : 'All clear',
      onClick: () => onNavigate('notifications'),
    },
    {
      label: 'Expiring',
      value: expiringCount,
      sub:
        expiredCertsCount > 0
          ? `${expiredCertsCount} expired`
          : expiringCount > 0
            ? 'Within 90 days'
            : 'All clear',
      onClick: () => navigate('/certificate-expiry'),
    },
    {
      label: 'Completed',
      value: completedCount,
      sub: 'On file',
      onClick: () => onNavigate('my-reports'),
    },
  ];

  // ── Tool grids ───────────────────────────────────────────────────────
  const coreTools: ToolCard[] = [
    {
      id: 'certificates',
      eyebrow: 'BS 7671',
      title: 'Certificates',
      description: 'EICR, EIC and Minor Works.',
      onClick: () => onNavigate('certificates'),
      meta:
        inProgressCount > 0 ? `${inProgressCount} in progress` : '4 core types',
    },
    {
      id: 'specialist',
      eyebrow: 'Specialist',
      title: 'Specialist',
      description: 'Fire, EV, solar, BESS, lightning, PAT and more.',
      onClick: () => onNavigate('specialist'),
      meta: '14 cert types',
    },
    {
      id: 'my-reports',
      eyebrow: 'Library',
      title: 'My Reports',
      description: 'Every certificate you have ever issued.',
      onClick: () => onNavigate('my-reports'),
      meta: totalCount > 0 ? `${totalCount} on file` : 'Empty',
    },
    {
      id: 'labels-warnings',
      eyebrow: 'Notices',
      title: 'Notices & Labels',
      description: 'Danger, isolation, permit, warning and handout PDFs.',
      onClick: () => onNavigate('labels-warnings'),
      meta: '11 documents',
    },
  ];

  const complianceTools: ToolCard[] = [
    {
      id: 'expiring',
      eyebrow: 'Expiry',
      title: 'Expiring Certs',
      description: 'Customer certs heading toward review or renewal.',
      to: '/certificate-expiry',
      meta:
        expiredCertsCount > 0
          ? `${expiredCertsCount} expired`
          : expiringCount > 0
            ? `${expiringCount} expiring`
            : 'All clear',
      alert: expiredCertsCount > 0,
    },
    {
      id: 'customers',
      eyebrow: 'Clients',
      title: 'Customers',
      description: 'Properties, history and contact details.',
      to: '/customers',
      meta: 'Open list',
    },
    {
      id: 'part-p',
      eyebrow: 'Part P',
      title: 'Building Notifications',
      description: 'Self-certify Part P notifiable work.',
      onClick: () => onNavigate('notifications'),
      meta:
        partPOverdueCount > 0
          ? `${partPOverdueCount} overdue`
          : partPDueCount > 0
            ? `${partPDueCount} pending`
            : 'All clear',
      alert: partPOverdueCount > 0,
    },
    {
      id: 'circuit-designer',
      eyebrow: 'Design',
      title: 'Circuit Designer',
      description: 'AI-led BS 7671 circuit design and discrimination.',
      to: '/electrician/circuit-designer',
      meta: pendingDesigns > 0 ? `${pendingDesigns} pending` : 'Start a design',
    },
    {
      id: 'learning-hub',
      eyebrow: 'Learning',
      title: 'I&T Hub',
      description: 'BS 7671 guidance, model forms and how-tos.',
      onClick: () => onNavigate('learning-hub'),
      meta: 'Browse hub',
    },
  ];

  return (
    <>
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
        <PageMasthead />

        <div className="px-4 py-4 space-y-12 sm:space-y-16 max-w-7xl mx-auto">
          <Hero headline={headline} verdict={verdict} cta={cta} />

          <QuickStartStrip
            number="01"
            label="START A CERT"
            items={[
              {
                eyebrow: 'BS 7671',
                title: 'EICR',
                description: 'Periodic inspection report for an existing installation.',
                onClick: () => onNavigate('eicr'),
              },
              {
                eyebrow: 'BS 7671',
                title: 'EIC',
                description: 'Initial verification certificate for a new install.',
                onClick: () => onNavigate('eic'),
              },
              {
                eyebrow: 'BS 7671',
                title: 'Minor Works',
                description: 'Additions and alterations to an existing circuit.',
                onClick: () => onNavigate('minor-works'),
              },
              {
                eyebrow: '14 types',
                title: 'All cert types',
                description: 'Fire, EV, solar, BESS, lightning, PAT and more.',
                onClick: () => onNavigate('specialist'),
              },
            ]}
          />

          <InspHeadlineStats number="02" label="AT A GLANCE" stats={stats} />

          {recentDraft && (
            <ContinueRow
              number="03"
              reportType={recentDraft.report_type}
              clientName={recentDraft.client_name}
              address={recentDraft.installation_address}
              onClick={handleContinue}
            />
          )}

          <RecoverUnsavedWork onNavigate={onNavigate} />

          <EditorialToolGrid
            number={recentDraft ? '04' : '03'}
            label="CORE"
            cards={coreTools}
            columns="three"
          />

          <EditorialToolGrid
            number={recentDraft ? '05' : '04'}
            label="COMPLIANCE"
            cards={complianceTools}
            columns="three"
          />
        </div>
      </div>

      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
