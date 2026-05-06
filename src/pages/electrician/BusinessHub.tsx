/**
 * BusinessHub — editorial redesign matching ElectricianHub / SiteSafety.
 *
 * Sticky text-only masthead, date-eyebrow Hero with thematic two-tone
 * headline + state-aware verdict + CTA, `01 · AT A GLANCE` HeadlineStats
 * (Paid this month · Outstanding · Overdue · Win rate), then numbered
 * hairline tool grids:
 *   02 · YOUR DAY
 *   03 · FINANCIALS
 *   04 · ON THE JOB
 *   05 · MONEY & STOCK
 *   06 · GROW
 *   07 · INSIGHTS  (live analytics, inline)
 *
 * BusinessCard chrome and the Insights collapsible are gone — uniform
 * hairline cells, single yellow accent per row, mobile-flat per the project
 * working agreement.
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics/QuoteInvoiceAnalytics';
import { useBusinessHubData } from '@/hooks/useBusinessHubData';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { useSnags } from '@/hooks/useSnags';
import { useTimeTracker, formatDuration } from '@/hooks/useTimeTracker';
import { shareContent } from '@/utils/share';

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
  { yellow: 'Time', white: 'to follow up.' },
  { yellow: 'Close', white: 'the open invoices.' },
  { yellow: 'Tidy', white: 'the books.' },
];

const HEADLINES_PIPELINE: HeroHeadline[] = [
  { yellow: 'Quote', white: 'into job.' },
  { yellow: 'Pipeline', white: 'in motion.' },
  { yellow: 'Send', white: 'today, win Friday.' },
];

const HEADLINES_HEALTHY: HeroHeadline[] = [
  { yellow: 'Stay', white: 'in the black.' },
  { yellow: 'Quiet', white: 'books, sharp moves.' },
  { yellow: 'Push', white: 'a quote out.' },
  { yellow: 'Run', white: 'the business right.' },
];

const HEADLINES_EMPTY: HeroHeadline[] = [
  { yellow: 'First', white: 'quote, first job.' },
  { yellow: 'Start', white: 'the books.' },
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
              Business Hub
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
// HeadlineStats — business variant
// ─────────────────────────────────────────────────────────────────────────

interface BusinessStat {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  onClick: () => void;
}

const BusinessHeadlineStats = ({
  stats,
  number = '01',
  label = 'AT A GLANCE',
}: {
  stats: BusinessStat[];
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
        const isNumericish = /^[\d.,+\-/%hkm£]+$/i.test(valueStr);
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
// EditorialToolGrid — supports either a real route (`to`) or callback
// (`onClick`) per card, since Booking Link is a share action.
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

  // Pad the final row with non-interactive filler cells so the rounded grid
  // never shows the bleed-through grey from `bg-white/[0.12]` between gaps.
  // Filler count is computed at the largest breakpoint (3 cols) since that
  // is where empty trailing cells become visible. At narrower breakpoints
  // (1/2 cols) the cards reflow and the filler is harmless.
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

        {/* Trailing filler cells — match active-cell bg so the row looks
            complete instead of revealing the white/0.12 grid background. */}
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
// Main page
// ─────────────────────────────────────────────────────────────────────────

const BusinessHub = () => {
  const navigate = useNavigate();

  const {
    revenue,
    paidThisMonth,
    outstanding,
    overdueAmount,
    winRate,
    quotes,
    invoices,
    isLoading,
    lastUpdated,
    refresh,
    formatCurrency,
  } = useBusinessHubData();
  const { counts: projectCounts } = useSparkProjects('active');
  const { counts: snagCounts } = useSnags();
  const { activeSession, elapsedSeconds } = useTimeTracker();

  const timeTrackerSubtitle = activeSession
    ? `Running · ${formatDuration(elapsedSeconds)}`
    : 'Log hours';

  const handleShareBookingLink = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;
    const url = `https://www.elec-mate.com/book/${session.user.id}`;
    await shareContent({
      title: 'Book an Appointment',
      text: 'Book a time slot with me:',
      url,
      onFallback: () => {
        toast({ title: 'Share this link', description: url });
      },
    });
  };

  // ── Hero state ───────────────────────────────────────────────────────
  const { headline, verdict, cta } = useMemo(() => {
    const overduePounds = formatCurrency(overdueAmount);
    const outstandingPounds = formatCurrency(outstanding);
    const paidPounds = formatCurrency(paidThisMonth);

    if (overdueAmount > 0) {
      return {
        headline: pickHeadline(HEADLINES_OVERDUE),
        verdict: `${overduePounds} overdue across your books — a single chase email today turns into payment next week.`,
        cta: { label: 'View overdue', onClick: () => navigate('/electrician/invoices?filter=overdue') },
      };
    }
    if (outstanding > 0) {
      return {
        headline: pickHeadline(HEADLINES_PIPELINE),
        verdict: `${outstandingPounds} out for payment, nothing overdue. Push a quote out while the books are quiet.`,
        cta: { label: 'New quote', onClick: () => navigate('/electrician/quotes') },
      };
    }
    if (revenue > 0) {
      return {
        headline: pickHeadline(HEADLINES_HEALTHY),
        verdict: `${paidPounds} paid this month, books all closed out. Plan the next quote, line up the next job.`,
        cta: { label: 'Open quotes', onClick: () => navigate('/electrician/quotes') },
      };
    }
    return {
      headline: pickHeadline(HEADLINES_EMPTY),
      verdict:
        'Set up your first quote and invoice — Elec-Mate handles the maths, the formatting, and the chase.',
      cta: { label: 'New quote', onClick: () => navigate('/electrician/quotes') },
    };
  }, [overdueAmount, outstanding, revenue, paidThisMonth, formatCurrency, navigate]);

  // ── Stats ────────────────────────────────────────────────────────────
  const stats: BusinessStat[] = [
    {
      label: 'Paid · month',
      value: formatCurrency(paidThisMonth),
      sub: 'Cleared',
      accent: true,
      onClick: () => navigate('/electrician/invoices?filter=paid'),
    },
    {
      label: 'Outstanding',
      value: formatCurrency(outstanding),
      sub: outstanding > 0 ? 'Waiting on payment' : 'All clear',
      onClick: () => navigate('/electrician/invoices?filter=outstanding'),
    },
    {
      label: 'Overdue',
      value: formatCurrency(overdueAmount),
      sub: overdueAmount > 0 ? 'Chase today' : 'Nothing overdue',
      onClick: () => navigate('/electrician/invoices?filter=overdue'),
    },
    {
      label: 'Win rate',
      value: winRate != null ? `${winRate}%` : '—',
      sub: winRate != null ? 'Quotes → won' : 'No data yet',
      onClick: () => navigate('/electrician/quotes'),
    },
  ];

  // ── Tool grids ───────────────────────────────────────────────────────
  const yourDay: ToolCard[] = [
    {
      id: 'tasks',
      eyebrow: 'Tasks',
      title: 'Tasks',
      description: 'To-dos, reminders and follow-ups.',
      to: '/electrician/tasks',
      meta: 'Open list',
    },
    {
      id: 'calendar',
      eyebrow: 'Calendar',
      title: 'Calendar',
      description: 'Jobs, appointments and bookings.',
      to: '/electrician/business/calendar',
      meta: new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
    },
    {
      id: 'time-tracker',
      eyebrow: 'Hours',
      title: 'Time Tracker',
      description: 'Log hours on site, billable or otherwise.',
      to: '/electrician/time-tracker',
      meta: timeTrackerSubtitle,
    },
  ];

  const financials: ToolCard[] = [
    {
      id: 'quotes',
      eyebrow: 'Quotes',
      title: 'Quotes',
      description: 'Build, send and track quotes.',
      to: '/electrician/quotes',
      meta: 'Open quotes',
    },
    {
      id: 'invoices',
      eyebrow: 'Invoices',
      title: 'Invoices',
      description: 'Billing, payments and reminders.',
      to: '/electrician/invoices',
      meta:
        overdueAmount > 0
          ? `${formatCurrency(overdueAmount)} overdue`
          : outstanding > 0
            ? `${formatCurrency(outstanding)} out`
            : 'Nothing outstanding',
      alert: overdueAmount > 0,
    },
    {
      id: 'customers',
      eyebrow: 'Clients',
      title: 'Customers',
      description: 'Client records and job history.',
      to: '/customers',
      meta: 'Open list',
    },
    {
      id: 'projects',
      eyebrow: 'Projects',
      title: 'Projects',
      description: 'Group jobs, tasks and snags.',
      to: '/electrician/projects',
      meta:
        projectCounts.active > 0 ? `${projectCounts.active} active` : 'Start a project',
    },
    {
      id: 'booking-link',
      eyebrow: 'Share',
      title: 'Booking Link',
      description: 'Public booking page to share with clients.',
      onClick: handleShareBookingLink,
      meta: 'Share link',
    },
  ];

  const onTheJob: ToolCard[] = [
    {
      id: 'site-visits',
      eyebrow: 'Visits',
      title: 'Site Visits',
      description: 'Pre-job and post-job site visit records.',
      to: '/electrician/site-visits',
      meta: 'New visit',
    },
    {
      id: 'photo-docs',
      eyebrow: 'Photos',
      title: 'Photo Docs',
      description: 'Project photos with timestamps and notes.',
      to: '/electrician/photo-docs',
      meta: 'Capture',
    },
    {
      id: 'snagging',
      eyebrow: 'Snags',
      title: 'Snagging',
      description: 'Track and resolve outstanding snags.',
      to: '/electrician/snagging',
      meta: snagCounts.open > 0 ? `${snagCounts.open} open` : 'All clear',
      alert: snagCounts.open > 0,
    },
    {
      id: 'room-planner',
      eyebrow: 'Plans',
      title: 'Room Planner',
      description: 'Quick electrical floor plans and layouts.',
      to: '/electrician/business/room-planner',
      meta: 'Open planner',
    },
  ];

  const moneyAndStock: ToolCard[] = [
    {
      id: 'expenses',
      eyebrow: 'Expenses',
      title: 'Expenses',
      description: 'Receipts, mileage and reimbursables.',
      to: '/electrician/expenses',
      meta: 'Log an expense',
    },
    {
      id: 'materials',
      eyebrow: 'Stock',
      title: 'Materials',
      description: 'Stock and inventory levels.',
      to: '/electrician/materials',
      meta: 'Open stock',
    },
    {
      id: 'tools',
      eyebrow: 'Tools',
      title: 'Tools',
      description: 'Equipment and asset tracking.',
      to: '/electrician/tools',
      meta: 'Open tools',
    },
    {
      id: 'live-pricing',
      eyebrow: 'Pricing',
      title: 'Live Pricing',
      description: 'Real-time market rates from suppliers.',
      to: '/electrician/live-pricing',
      meta: 'Check rates',
    },
    {
      id: 'price-book',
      eyebrow: 'Markup',
      title: 'Price Book',
      description: 'Materials, markup and labour rates.',
      to: '/electrician/price-book',
      meta: 'Edit rates',
    },
    {
      id: 'stock-tracker',
      eyebrow: 'Inventory',
      title: 'Stock Tracker',
      description: 'Van and garage stock levels.',
      to: '/electrician/inventory',
      meta: 'Open inventory',
    },
  ];

  const grow: ToolCard[] = [
    {
      id: 'start-grow',
      eyebrow: 'Guides',
      title: 'Start & Grow',
      description: 'Business guides for sole traders and Ltds.',
      to: '/electrician/business-development',
      meta: 'Read guides',
    },
    {
      id: 'calculators',
      eyebrow: 'Numbers',
      title: 'Calculators',
      description: 'Day rate, take-home, breakeven and more.',
      to: '/electrician/business-development/tools',
      meta: 'Run a calc',
    },
  ];

  const canonical = `${window.location.origin}/electrician/business`;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      <Helmet>
        <title>Business Hub for Electricians | Quotes, Invoices & More</title>
        <meta
          name="description"
          content="All business tools for UK electricians in one place — quotes, invoices, customers, expenses, live pricing and growth tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <PageMasthead />

      <div className="px-4 py-4 space-y-12 sm:space-y-16 max-w-7xl mx-auto">
        <Hero headline={headline} verdict={verdict} cta={cta} />

        <BusinessHeadlineStats stats={stats} />

        <EditorialToolGrid number="02" label="YOUR DAY" cards={yourDay} columns="three" />

        <EditorialToolGrid number="03" label="FINANCIALS" cards={financials} columns="three" />

        <EditorialToolGrid number="04" label="ON THE JOB" cards={onTheJob} columns="three" />

        <EditorialToolGrid number="05" label="MONEY & STOCK" cards={moneyAndStock} columns="three" />

        <EditorialToolGrid number="06" label="GROW" cards={grow} columns="two" />

        {/* 07 · INSIGHTS — live quote/invoice analytics, no collapsible */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <Eyebrow>07 · INSIGHTS</Eyebrow>
            <span className="text-[11px] text-white/55 tabular-nums">
              {formatCurrency(revenue)} revenue
            </span>
          </motion.div>
          <motion.div variants={itemVariants}>
            <QuoteInvoiceAnalytics
              quotes={quotes}
              invoices={invoices}
              formatCurrency={formatCurrency}
              lastUpdated={lastUpdated}
              onRefresh={refresh}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default BusinessHub;
