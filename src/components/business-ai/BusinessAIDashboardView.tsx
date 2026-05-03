import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { useAgentActivity, AgentAction } from '@/hooks/useAgentActivity';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import { formatDistanceToNow, parseISO, isAfter, subDays } from 'date-fns';
import { openExternalUrl } from '@/utils/open-external-url';
import { MATE_PHONE_DISPLAY, MATE_WHATSAPP_LINK } from '@/constants/mate';
import { downloadMateVCard } from '@/utils/mate-vcard';
import { FounderBadge } from './FounderBanner';
import {
  capabilityGroups,
  getToolMeta,
  extractToolName,
  estimateMinutesSaved,
  formatMinutes,
} from './mateCapabilities';

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// ─── Editorial atoms ─────────────────────────────────────────────────────────
const Y = ({ children }: { children: React.ReactNode }) => (
  <span className="text-elec-yellow font-semibold">{children}</span>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
    {children}
  </span>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  const clean = phone.replace(/\s/g, '');
  const prefix = clean.slice(0, 7); // e.g. +447507
  const last2 = clean.slice(-2);
  const p1 = prefix.slice(0, 3); // +44
  const p2 = prefix.slice(3, 7); // 7507
  return `${p1} ${p2} \u2022\u2022\u2022 \u2022${last2}`;
}

// ─── Activity row — humanised, linkable ─────────────────────────────────────
function ActivityRow({ action }: { action: AgentAction }) {
  const toolName = extractToolName(action.description);
  const meta = getToolMeta(toolName);
  const timeAgo = formatDistanceToNow(parseISO(action.created_at), { addSuffix: true });
  const failed = action.outcome && action.outcome !== 'success';

  const inner = (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6 py-5 sm:py-6 items-start">
      <div className="flex flex-col items-start gap-1 pt-1 min-w-[80px] sm:min-w-[110px]">
        <span className="text-elec-yellow text-[13px] sm:text-sm font-bold tabular-nums tracking-tight">
          {timeAgo}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
          {meta.tag}
        </span>
      </div>
      <div className="space-y-1 pt-1 min-w-0">
        <p className="text-[15px] sm:text-base font-semibold tracking-[-0.01em] leading-snug text-white">
          {meta.label}
          {failed && <span className="ml-2 text-[11px] font-medium text-red-400">· failed</span>}
        </p>
        {action.customer_name && (
          <p className="text-[13px] text-white/60 truncate">{action.customer_name}</p>
        )}
        {meta.route && (
          <p className="text-[12px] text-white/40 group-hover:text-elec-yellow transition-colors">
            View in app →
          </p>
        )}
      </div>
    </div>
  );

  const rowClass = 'border-b border-white/[0.06]';

  if (meta.route) {
    return (
      <motion.div variants={fadeUp} className={rowClass}>
        <Link
          to={meta.route}
          className="group block touch-manipulation rounded-lg -mx-2 px-2 hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors"
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} className={rowClass}>
      {inner}
    </motion.div>
  );
}

// ─── Big editorial stat (no icons, no card chrome) ──────────────────────────
type Tone = 'default' | 'red' | 'green';

function Stat({
  label,
  value,
  detail,
  valueTone = 'default',
  detailTone = 'default',
}: {
  label: string;
  value: number | null;
  detail: string | null;
  valueTone?: Tone;
  detailTone?: Tone;
}) {
  const valueClass =
    valueTone === 'red' ? 'text-red-400' : valueTone === 'green' ? 'text-green-400' : 'text-white';
  const detailClass =
    detailTone === 'red'
      ? 'text-red-400'
      : detailTone === 'green'
        ? 'text-green-400'
        : 'text-elec-yellow';
  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">{label}</div>
      {value === null ? (
        <div className="h-12 w-20 bg-white/[0.05] rounded animate-pulse" />
      ) : (
        <div
          className={`text-[44px] sm:text-[56px] font-bold tracking-[-0.03em] leading-none tabular-nums ${valueClass}`}
        >
          {value}
        </div>
      )}
      {detail && <div className={`text-[13px] font-medium ${detailClass}`}>{detail}</div>}
    </motion.div>
  );
}

// ═════════ DASHBOARD VIEW ════════════════════════════════════════════════════
export function BusinessAIDashboardView() {
  const { profile, whatsappNumber } = useBusinessAIProfile();
  const { actions, isLoading: activityLoading } = useAgentActivity(12);
  const { business, isLoading: dashLoading } = useDashboardData();
  const { counts: taskCounts, isLoading: tasksLoading } = useSparkTasks('all');
  const healthStatus = profile?.agent_health_status ?? 'healthy';
  const rawFirst = profile?.full_name?.split(' ')[0] || 'there';
  const firstName = rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase();

  // Actions in the last 7 days — used for activity count + time-saved estimate
  const weeklyActions = useMemo(() => {
    const sevenDaysAgo = subDays(new Date(), 7);
    return actions.filter((a) => isAfter(parseISO(a.created_at), sevenDaysAgo));
  }, [actions]);
  const weeklyActionCount = weeklyActions.length;
  const weeklyMinutesSaved = useMemo(() => estimateMinutesSaved(weeklyActions), [weeklyActions]);

  const statsLoading = dashLoading || tasksLoading;
  const isOnline = healthStatus === 'healthy';

  return (
    <div className="min-h-screen bg-background text-white pb-[calc(env(safe-area-inset-bottom)+24px)]">
      {/* Top nav */}
      <div className="px-4 sm:px-6 pt-3 pb-1 max-w-6xl mx-auto">
        <Link to="/electrician">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Electrical Hub
          </Button>
        </Link>
      </div>

      {/* ═════════ HERO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.05] blur-[120px]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-6 sm:pt-16 pb-12 sm:pb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-7 sm:mb-10">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inset-0 rounded-full ${isOnline ? 'bg-green-500 animate-ping' : 'bg-amber-500'} opacity-75`}
              />
              <span
                className={`relative h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-amber-500'}`}
              />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              {isOnline ? 'Live · Online' : `Status · ${healthStatus}`}
            </span>
            <FounderBadge isFounder={profile?.is_founder} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] sm:text-[80px] lg:text-[96px] font-bold tracking-[-0.035em] leading-[0.95] text-white"
          >
            Hey, {firstName}.
            <br />
            Mate&apos;s <span className="text-elec-yellow">got your back</span> today.
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-10 space-y-2 text-base sm:text-lg leading-relaxed"
          >
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                Mate&apos;s on
              </span>
              <span className="font-mono text-base sm:text-xl text-white tracking-tight">
                {MATE_PHONE_DISPLAY}
              </span>
            </p>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                Your number
              </span>
              <span className="font-mono text-base sm:text-xl text-white tracking-tight">
                {whatsappNumber ? maskPhone(whatsappNumber) : 'Not connected'}
              </span>
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7"
          >
            <Button
              onClick={() => openExternalUrl(MATE_WHATSAPP_LINK)}
              className="h-14 px-8 text-base font-bold rounded-full active:scale-[0.98] touch-manipulation transition-all bg-elec-yellow text-black hover:bg-elec-yellow/90 shadow-[0_20px_60px_-20px_rgba(250,204,21,0.5)]"
            >
              Open WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <button
              type="button"
              onClick={downloadMateVCard}
              className="text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 touch-manipulation self-start sm:self-center h-11 sm:h-auto"
            >
              Save Mate to phone contacts
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════ TODAY'S NUMBERS ══════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20"
        >
          <motion.div variants={fadeUp} className="mb-10 sm:mb-14">
            <Eyebrow>Today&apos;s numbers</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              What&apos;s on <Y>the slate.</Y>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
            <Stat
              label="Outstanding"
              value={statsLoading ? null : business.unpaidInvoices}
              detail={
                business.overdueValue > 0
                  ? `£${business.overdueValue.toLocaleString()} overdue`
                  : null
              }
            />
            <Stat
              label="Overdue"
              value={statsLoading ? null : business.overdueInvoices}
              detail={business.overdueInvoices > 0 ? 'invoices late' : 'all clear'}
              valueTone={business.overdueInvoices > 0 ? 'red' : 'green'}
              detailTone={business.overdueInvoices > 0 ? 'red' : 'green'}
            />
            <Stat
              label="Open quotes"
              value={statsLoading ? null : business.activeQuotes}
              detail={business.quoteValue > 0 ? `${business.formattedQuoteValue} pipeline` : null}
            />
            <Stat
              label="Tasks today"
              value={statsLoading ? null : taskCounts.today}
              detail={taskCounts.overdue > 0 ? `${taskCounts.overdue} overdue` : null}
              detailTone={taskCounts.overdue > 0 ? 'red' : 'default'}
            />
          </div>
        </motion.div>
      </section>

      {/* ═════════ TIME SAVED ═══════════════════════════════════════ */}
      {weeklyMinutesSaved > 0 && (
        <section className="relative border-t border-white/[0.06]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16"
          >
            <motion.div
              variants={fadeUp}
              className="grid gap-6 sm:gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
            >
              <div>
                <Eyebrow>Time saved this week</Eyebrow>
                <h2 className="mt-3 text-[40px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.035em] leading-[0.95] text-white tabular-nums">
                  <span className="text-elec-yellow">{formatMinutes(weeklyMinutesSaved)}</span>
                  <span className="text-white/40"> back on the tools.</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed max-w-md">
                  Estimated against the average time it takes to do these things by hand — drafting
                  quotes, looking up regs, sorting receipts, planning routes.
                </p>
              </div>
              <div className="text-sm sm:text-base text-white/70 lg:text-right">
                <div className="text-elec-yellow font-bold tabular-nums">{weeklyActionCount}</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                  action{weeklyActionCount !== 1 ? 's' : ''} logged
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* ═════════ RECENT ACTIVITY ══════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 sm:mb-12 flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <Eyebrow>Recent activity</Eyebrow>
              <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
                What <Y>Mate did.</Y>
              </h2>
              <p className="mt-3 text-sm text-white/50">Tap any row to jump to it in the app.</p>
            </div>
            {weeklyActionCount > 0 && (
              <span className="text-sm text-white/55">
                {weeklyActionCount} action{weeklyActionCount !== 1 ? 's' : ''} this week
              </span>
            )}
          </motion.div>

          {activityLoading ? (
            <motion.div variants={fadeUp} className="py-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-elec-yellow/30 border-t-elec-yellow rounded-full animate-spin" />
            </motion.div>
          ) : actions.length === 0 ? (
            <motion.div variants={fadeUp} className="py-12 text-center space-y-6">
              <p className="text-xl sm:text-2xl font-semibold text-white max-w-md mx-auto">
                No activity yet. <Y>Mate&apos;s ready when you are.</Y>
              </p>
              <Button
                onClick={() => openExternalUrl(MATE_WHATSAPP_LINK)}
                className="h-12 px-7 text-base font-bold rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                Send your first message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
              {actions.map((action) => (
                <ActivityRow key={action.id} action={action} />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* ═════════ WHAT TO ASK MATE ═════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-24"
        >
          <motion.div variants={fadeUp} className="mb-12 sm:mb-16 max-w-2xl">
            <Eyebrow>What to ask Mate</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              Try <Y>saying.</Y>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
              Plain English. Voice notes. Photos. Whatever&apos;s easiest with one hand on the
              ladder.
            </p>
          </motion.div>

          <div className="space-y-14 sm:space-y-20">
            {capabilityGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={fadeUp}
                className="grid gap-5 sm:gap-8 lg:grid-cols-[240px_1fr]"
              >
                <div className="lg:pt-2 space-y-2">
                  <Eyebrow>{group.title}</Eyebrow>
                  <p className="hidden lg:block text-[13px] text-white/55 leading-relaxed max-w-[220px]">
                    {group.strapline}
                  </p>
                </div>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3.5 sm:gap-y-4">
                  {group.prompts.map((prompt) => (
                    <li
                      key={prompt.text}
                      className="text-[17px] sm:text-xl font-semibold tracking-[-0.01em] leading-[1.3] text-white flex items-start gap-2"
                    >
                      {prompt.featured && (
                        <span
                          className="inline-block mt-2 h-1 w-3 rounded-full bg-elec-yellow shrink-0"
                          aria-label="Featured"
                        />
                      )}
                      <span className="flex-1">
                        <span className="text-elec-yellow">&ldquo;</span>
                        {prompt.text}
                        <span className="text-elec-yellow">&rdquo;</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═════════ FOOTER ═══════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 text-center">
          <Link
            to="/subscriptions"
            className="text-sm text-white/55 hover:text-white underline underline-offset-4 decoration-white/15 hover:decoration-white/40 touch-manipulation"
          >
            Manage subscription
          </Link>
        </div>
      </section>
    </div>
  );
}
