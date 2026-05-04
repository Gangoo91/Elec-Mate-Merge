/**
 * Cost Engineer — saved quotes list.
 *
 * Lists every estimate the user has run, most recent first. Each row is
 * a chunk of trust signal for the user: project name, client, amount,
 * outcome (won / lost / draft), date. Click a row to load that estimate
 * back into the main interface — the same rendering pipeline as a fresh
 * generation, just hydrated from saved output_data.
 *
 * No new edge function needed — straight Supabase select with RLS doing
 * the user filtering.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Trophy, MoreHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface QuoteRow {
  id: string;
  status: string;
  created_at: string;
  completed_at: string | null;
  project_context: any;
  output_data: any;
  quote_outcome: string | null;
  refine_of: string | null;
}

const OUTCOME_LABEL: Record<string, { label: string; tone: 'good' | 'warn' | 'neutral' }> = {
  won: { label: 'Won', tone: 'good' },
  lost_too_high: { label: 'Lost — too high', tone: 'warn' },
  lost_too_low: { label: 'Lost — too low', tone: 'warn' },
  lost_other: { label: 'Lost', tone: 'warn' },
  abandoned: { label: 'Abandoned', tone: 'neutral' },
  sent: { label: 'Sent', tone: 'neutral' },
  draft: { label: 'Draft', tone: 'neutral' },
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Queued',
  processing: 'Generating',
  complete: 'Complete',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

const fmtGBP = (n: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(isFinite(n) ? n : 0);

const fmtRelative = (iso: string | null) => {
  if (!iso) return '—';
  const d = new Date(iso);
  const ms = Date.now() - d.getTime();
  const mins = Math.floor(ms / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const CostEngineerQuotes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rows, setRows] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'won' | 'lost' | 'draft'>('all');

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('cost_engineer_jobs')
        .select(
          'id, status, created_at, completed_at, project_context, output_data, quote_outcome, refine_of'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100);
      if (!cancelled) {
        setRows((data ?? []) as QuoteRow[]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const filtered = useMemo(() => {
    if (filter === 'all') return rows;
    if (filter === 'won') return rows.filter((r) => r.quote_outcome === 'won');
    if (filter === 'lost')
      return rows.filter((r) =>
        ['lost_too_high', 'lost_too_low', 'lost_other'].includes(r.quote_outcome ?? '')
      );
    return rows.filter((r) => !r.quote_outcome || r.quote_outcome === 'draft');
  }, [rows, filter]);

  const stats = useMemo(() => {
    const wonCount = rows.filter((r) => r.quote_outcome === 'won').length;
    const decided = rows.filter((r) =>
      ['won', 'lost_too_high', 'lost_too_low', 'lost_other'].includes(r.quote_outcome ?? '')
    ).length;
    const wonValue = rows
      .filter((r) => r.quote_outcome === 'won')
      .reduce(
        (sum, r) =>
          sum + Number(r.output_data?.structuredData?.recommendedQuote?.amount ?? 0),
        0
      );
    return {
      total: rows.length,
      won: wonCount,
      decided,
      winRate: decided > 0 ? Math.round((wonCount / decided) * 100) : null,
      wonValue,
    };
  }, [rows]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleSetOutcome = async (
    rowId: string,
    outcome: 'won' | 'lost_too_high' | 'lost_too_low' | 'lost_other' | 'abandoned'
  ) => {
    setOpenMenuId(null);
    // Optimistic update so the chip flips immediately.
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId ? { ...r, quote_outcome: outcome } : r
      )
    );
    const { error } = await supabase
      .from('cost_engineer_jobs')
      .update({ quote_outcome: outcome, quote_outcome_at: new Date().toISOString() })
      .eq('id', rowId);
    if (error) {
      toast.error('Could not update outcome', { description: error.message });
      // Revert on failure.
      setRows((prev) =>
        prev.map((r) => (r.id === rowId ? { ...r, quote_outcome: r.quote_outcome } : r))
      );
      return;
    }
    toast.success(`Marked as ${OUTCOME_LABEL[outcome]?.label ?? outcome}`);
  };

  const handleOpen = (row: QuoteRow) => {
    if (row.status !== 'complete' || !row.output_data) {
      return;
    }
    // Reuse the saved-results navigation hook on the main page — same
    // pipeline as on first render.
    navigate('/electrician/cost-engineer', {
      state: {
        fromSavedResults: true,
        jobId: row.id,
        outputData: row.output_data,
        inputData: { query: row.output_data?.originalQuery, projectContext: row.project_context },
      },
    });
  };

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => navigate('/electrician/cost-engineer')}
              className="flex items-center gap-2 text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Cost Engineer</span>
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 hidden sm:inline">
                Saved
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                My Quotes
              </h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-4 space-y-7 sm:space-y-10"
      >
        {/* HERO */}
        <motion.section variants={itemVariants} className="relative pt-2 sm:pt-4 space-y-3">
          <Eyebrow>QUOTE HISTORY</Eyebrow>
          <h1 className="font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[52px]">
            <span className="text-elec-yellow">{stats.total}</span>{' '}
            <span className="text-white">quotes.</span>
          </h1>
          <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/85 max-w-2xl">
            Every estimate you've run. Tap one to reopen, refine or send to Quote Hub. Mark won
            and lost so the next quote learns from this one.
          </p>
        </motion.section>

        {/* Stats strip */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]"
        >
          <StatCell label="Total" value={String(stats.total)} />
          <StatCell label="Won" value={String(stats.won)} tone="good" />
          <StatCell
            label="Win rate"
            value={stats.winRate !== null ? `${stats.winRate}%` : '—'}
            tone={stats.winRate !== null && stats.winRate >= 50 ? 'good' : 'neutral'}
          />
          <StatCell label="Won value" value={fmtGBP(stats.wonValue)} tone="yellow" />
        </motion.section>

        {/* Filter chips */}
        <motion.section variants={itemVariants} className="flex flex-wrap gap-2">
          {(
            [
              { k: 'all', label: 'All' },
              { k: 'won', label: 'Won' },
              { k: 'lost', label: 'Lost' },
              { k: 'draft', label: 'Open' },
            ] as const
          ).map((f) => (
            <button
              key={f.k}
              type="button"
              onClick={() => setFilter(f.k)}
              className={cn(
                'h-9 px-3 rounded-xl text-[12px] font-medium border transition-colors touch-manipulation',
                filter === f.k
                  ? 'bg-elec-yellow/10 border-elec-yellow/50 text-elec-yellow'
                  : 'bg-[hsl(0_0%_10%)] border-white/[0.10] text-white/75 hover:border-white/20'
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.section>

        {/* List */}
        <motion.section variants={itemVariants} className="space-y-2">
          {loading ? (
            <div className="text-[13px] text-white/55 py-8 text-center">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-white/[0.10] sm:rounded-2xl px-6 py-10 text-center">
              <Eyebrow>NOTHING HERE</Eyebrow>
              <h3 className="mt-2 text-[15px] font-semibold text-white">
                {filter === 'all' ? "You haven't quoted anything yet." : 'No quotes in this filter.'}
              </h3>
              <p className="mt-1 text-[13px] text-white/60 max-w-sm mx-auto leading-snug">
                Open the Cost Engineer to brief a job and your estimates will land here.
              </p>
            </div>
          ) : (
            filtered.map((row) => {
              const recommended = Number(
                row.output_data?.structuredData?.recommendedQuote?.amount ?? 0
              );
              const projectName =
                row.project_context?.projectName ||
                row.output_data?.originalQuery?.slice(0, 60) ||
                'Untitled estimate';
              const clientInfo = row.project_context?.clientInfo ?? '';
              const outcome = row.quote_outcome
                ? OUTCOME_LABEL[row.quote_outcome] ?? null
                : null;
              const isComplete = row.status === 'complete';

              return (
                <div
                  key={row.id}
                  role="button"
                  tabIndex={isComplete ? 0 : -1}
                  onClick={() => isComplete && handleOpen(row)}
                  onKeyDown={(e) => {
                    if (isComplete && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleOpen(row);
                    }
                  }}
                  className={cn(
                    'relative w-full bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5 text-left transition-colors touch-manipulation',
                    isComplete
                      ? 'hover:border-elec-yellow/40 active:scale-[0.99] cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] sm:text-[15px] font-semibold text-white truncate">
                        {projectName}
                      </div>
                      <div className="mt-1 text-[11.5px] text-white/55 truncate">
                        {clientInfo || 'No client'} · {fmtRelative(row.completed_at ?? row.created_at)}
                        {row.refine_of && (
                          <span className="ml-1 uppercase tracking-[0.14em] text-elec-yellow/70">
                            · refined
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[14.5px] sm:text-[16px] font-semibold tabular-nums text-elec-yellow">
                        {isComplete ? fmtGBP(recommended) : '—'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {outcome ? (
                          <OutcomePill label={outcome.label} tone={outcome.tone} />
                        ) : isComplete ? (
                          <OutcomePill label="Open" tone="neutral" />
                        ) : (
                          <OutcomePill label={STATUS_LABEL[row.status] ?? row.status} tone="neutral" />
                        )}
                        {isComplete && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === row.id ? null : row.id);
                            }}
                            className="h-7 w-7 rounded-md hover:bg-white/[0.05] flex items-center justify-center touch-manipulation"
                            aria-label="Mark outcome"
                          >
                            <MoreHorizontal className="h-4 w-4 text-white/55" />
                          </button>
                        )}
                        {isComplete && <ChevronRight className="h-4 w-4 text-white/40" />}
                      </div>
                    </div>
                  </div>

                  {/* Outcome menu — opens inline, click outside (or row tap)
                      closes it. Lightweight, no portal needed. */}
                  {openMenuId === row.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-2"
                    >
                      <OutcomeButton onClick={() => handleSetOutcome(row.id, 'won')} tone="good">
                        Won
                      </OutcomeButton>
                      <OutcomeButton
                        onClick={() => handleSetOutcome(row.id, 'lost_too_high')}
                        tone="warn"
                      >
                        Lost — too high
                      </OutcomeButton>
                      <OutcomeButton
                        onClick={() => handleSetOutcome(row.id, 'lost_too_low')}
                        tone="warn"
                      >
                        Lost — too low
                      </OutcomeButton>
                      <OutcomeButton
                        onClick={() => handleSetOutcome(row.id, 'abandoned')}
                        tone="neutral"
                      >
                        Abandoned
                      </OutcomeButton>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </motion.section>

        {/* Aggregate teaser */}
        {stats.winRate !== null && stats.winRate >= 50 && (
          <motion.section variants={itemVariants}>
            <div className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-emerald-500/20 sm:rounded-2xl py-4 px-4 sm:p-5 flex items-start gap-3">
              <Trophy className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-[14px] font-semibold text-white">
                  Winning {stats.winRate}% of decided quotes
                </div>
                <div className="mt-1 text-[12.5px] text-white/65 leading-snug">
                  Future estimates will surface this on the tier cards so you know which margin
                  policy is actually closing.
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </motion.main>
    </div>
  );
};

export default CostEngineerQuotes;

const StatCell = ({
  label,
  value,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  tone?: 'good' | 'yellow' | 'neutral';
}) => (
  <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
      {label}
    </div>
    <div
      className={cn(
        'mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums',
        tone === 'good' && 'text-emerald-400',
        tone === 'yellow' && 'text-elec-yellow',
        tone === 'neutral' && 'text-white'
      )}
    >
      {value}
    </div>
  </div>
);

const OutcomeButton = ({
  onClick,
  tone,
  children,
}: {
  onClick: () => void;
  tone: 'good' | 'warn' | 'neutral';
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'h-9 px-3 rounded-xl text-[12px] font-medium border transition-colors touch-manipulation',
      tone === 'good' &&
        'bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60',
      tone === 'warn' &&
        'bg-amber-400/[0.06] border-amber-400/30 text-amber-400 hover:border-amber-400/60',
      tone === 'neutral' &&
        'bg-[hsl(0_0%_10%)] border-white/[0.10] text-white/75 hover:border-white/30'
    )}
  >
    {children}
  </button>
);

const OutcomePill = ({ label, tone }: { label: string; tone: 'good' | 'warn' | 'neutral' }) => (
  <span
    className={cn(
      'text-[10px] uppercase tracking-[0.14em] font-semibold border rounded-full px-1.5 py-0.5 whitespace-nowrap',
      tone === 'good' && 'text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.06]',
      tone === 'warn' && 'text-amber-400 border-amber-400/30 bg-amber-400/[0.06]',
      tone === 'neutral' && 'text-white/65 border-white/15 bg-white/[0.04]'
    )}
  >
    {label}
  </span>
);
