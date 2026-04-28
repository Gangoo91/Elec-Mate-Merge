import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { fmtHours, fmtRel } from '@/lib/format';
import {
  useTutorOtjInbox,
  type InboxRow,
  type InboxScope,
} from '@/hooks/useTutorOtjInbox';

/* ==========================================================================
   OtjInboxPage — /college/otj/inbox
   Cohort-level OTJ verification queue. Tutors see every pending
   apprentice_submitted entry across their assigned learners (or whole
   college via the toggle), with the same Verify / Return controls + AI
   verdict from the per-learner panel. Designed for tutors with 30+
   apprentices to clear submissions without bouncing between Student 360
   pages.
   ========================================================================== */

interface AiVerdict {
  verdict: 'recommend_verify' | 'recommend_question' | 'recommend_reject';
  confidence: number;
  feedback_for_tutor: string | null;
  suggested_ac_refs: string[];
}

const VERDICT_LABEL: Record<AiVerdict['verdict'], string> = {
  recommend_verify: 'AI: looks good',
  recommend_question: 'AI: ask first',
  recommend_reject: 'AI: would return',
};

const VERDICT_TONE: Record<AiVerdict['verdict'], string> = {
  recommend_verify: 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-200',
  recommend_question: 'border-amber-400/30 bg-amber-500/[0.08] text-amber-200',
  recommend_reject: 'border-rose-400/30 bg-rose-500/[0.08] text-rose-200',
};

const ACTIVITY_LABEL: Record<string, string> = {
  practical: 'Practical',
  shadowing: 'Shadowing',
  manufacturer_training: 'Manufacturer training',
  industry_visit: 'Industry visit',
  employer_meeting: 'Toolbox talk',
  simulation: 'Simulation',
  mentoring: 'Mentoring',
  theory: 'Theory',
  assessment: 'Assessment',
  workshop: 'Workshop',
  one_to_one: '1-2-1',
  tutorial: 'Tutorial',
  conference: 'Conference',
  other: 'Other',
};

// Module-level verdict cache — same Map the per-learner panel uses
// patterning. New on this page; the existing panel's cache is a different
// instance which is fine (low overlap in practice).
const verdictCache = new Map<string, AiVerdict>();
const verdictInflight = new Map<string, Promise<AiVerdict>>();

async function fetchVerdict(otjEntryId: string): Promise<AiVerdict> {
  const cached = verdictCache.get(otjEntryId);
  if (cached) return cached;
  const inflight = verdictInflight.get(otjEntryId);
  if (inflight) return inflight;
  const p = (async () => {
    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;
    if (!token) throw new Error('Not signed in');
    const url = `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/ai-otj-verdict`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ otj_entry_id: otjEntryId }),
    });
    if (!res.ok) throw new Error(`verdict_${res.status}`);
    const json = (await res.json()) as AiVerdict;
    if (verdictCache.size >= 100) {
      const first = verdictCache.keys().next().value;
      if (first) verdictCache.delete(first);
    }
    verdictCache.set(otjEntryId, json);
    return json;
  })();
  verdictInflight.set(otjEntryId, p);
  try {
    return await p;
  } finally {
    verdictInflight.delete(otjEntryId);
  }
}

export default function OtjInboxPage() {
  useSEO({
    title: 'OTJ verification inbox',
    description: 'Pending off-the-job training submissions awaiting tutor sign-off.',
    noindex: true,
  });
  const navigate = useNavigate();
  const inbox = useTutorOtjInbox();

  const [cohortFilter, setCohortFilter] = useState<string>('all');

  const cohorts = useMemo(() => {
    const set = new Set<string>();
    for (const r of inbox.rows) {
      if (r.cohort_name) set.add(r.cohort_name);
    }
    return Array.from(set).sort();
  }, [inbox.rows]);

  const filteredRows = useMemo(() => {
    if (cohortFilter === 'all') return inbox.rows;
    return inbox.rows.filter((r) => r.cohort_name === cohortFilter);
  }, [inbox.rows, cohortFilter]);

  const totalMinutes = filteredRows.reduce((acc, r) => acc + (r.duration_minutes ?? 0), 0);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 pb-24">
        <motion.button
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1 -ml-1 h-9 px-2 rounded-lg text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 sm:mt-4 lg:mt-6"
        >
          <div className="text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.18em] text-amber-300/85">
            OTJ verification
          </div>
          <h1 className="mt-1 sm:mt-1.5 text-[22px] sm:text-[28px] lg:text-[40px] font-semibold text-white tracking-tight leading-[1.1]">
            Inbox
          </h1>
          <p className="mt-2 sm:mt-3 text-[12.5px] sm:text-[13px] text-white/85 leading-snug max-w-2xl">
            Apprentice-submitted off-the-job entries waiting for your sign-off. Verifying the hours
            here flips the apprentice's ESFA traffic light immediately.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.06 }}
          className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2"
        >
          <ScopeToggle value={inbox.scope} onChange={inbox.setScope} />
          {cohorts.length > 1 && (
            <CohortFilter
              cohorts={cohorts}
              value={cohortFilter}
              onChange={setCohortFilter}
            />
          )}
          <div className="ml-auto text-[11.5px] tabular-nums text-white/85">
            {filteredRows.length} {filteredRows.length === 1 ? 'submission' : 'submissions'}
            {totalMinutes > 0 && (
              <span className="text-white/65"> · {fmtHours(totalMinutes)} total</span>
            )}
          </div>
        </motion.div>

        <div className="mt-5">
          {inbox.loading && inbox.rows.length === 0 ? (
            <Skeleton />
          ) : filteredRows.length === 0 ? (
            <EmptyState scope={inbox.scope} hasAny={inbox.rows.length > 0} />
          ) : (
            <ul className="space-y-3">
              {filteredRows.map((row) => (
                <InboxRowCard
                  key={row.id}
                  row={row}
                  onVerify={() => inbox.verify(row.id)}
                  onReject={(rationale) => inbox.reject(row.id, rationale)}
                  onOpenStudent={
                    row.college_student_row_id
                      ? () =>
                          navigate(
                            `/college/students/${row.college_student_row_id}#otj`
                          )
                      : null
                  }
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ScopeToggle({
  value,
  onChange,
}: {
  value: InboxScope;
  onChange: (v: InboxScope) => void;
}) {
  return (
    <div className="inline-flex h-8 rounded-lg border border-white/[0.10] bg-white/[0.02] p-0.5">
      {(['mine', 'college'] as InboxScope[]).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(
            'h-7 px-3 rounded-md text-[11.5px] font-medium tabular-nums touch-manipulation transition-colors',
            value === s
              ? 'bg-white text-black'
              : 'text-white/85 hover:text-white'
          )}
        >
          {s === 'mine' ? 'Assigned to me' : 'All college'}
        </button>
      ))}
    </div>
  );
}

function CohortFilter({
  cohorts,
  value,
  onChange,
}: {
  cohorts: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 px-3 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[11.5px] text-white/95 touch-manipulation"
    >
      <option value="all">All cohorts</option>
      {cohorts.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

function InboxRowCard({
  row,
  onVerify,
  onReject,
  onOpenStudent,
}: {
  row: InboxRow;
  onVerify: () => Promise<void>;
  onReject: (rationale: string) => Promise<void>;
  /** Null when the apprentice has no college_students row yet — keeps the
      learner name visible but non-clickable. */
  onOpenStudent: (() => void) | null;
}) {
  const [verdict, setVerdict] = useState<AiVerdict | null>(null);
  const [verdictLoading, setVerdictLoading] = useState(false);
  const [verdictError, setVerdictError] = useState(false);
  const [acting, setActing] = useState<'verify' | 'reject' | null>(null);
  const [rejectingMode, setRejectingMode] = useState(false);
  const [rationale, setRationale] = useState('');

  // Fetch verdict on mount — module cache short-circuits if already known.
  useEffect(() => {
    let cancelled = false;
    setVerdictError(false);
    const cached = verdictCache.get(row.id);
    if (cached) {
      setVerdict(cached);
      return;
    }
    setVerdictLoading(true);
    fetchVerdict(row.id)
      .then((v) => {
        if (!cancelled) {
          setVerdict(v);
          setVerdictLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setVerdictError(true);
          setVerdictLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [row.id]);

  const handleVerify = async () => {
    if (acting) return;
    setActing('verify');
    try {
      await onVerify();
    } finally {
      setActing(null);
    }
  };

  const handleReject = async () => {
    if (acting) return;
    if (!rationale.trim()) return;
    setActing('reject');
    try {
      await onReject(rationale);
      setRejectingMode(false);
      setRationale('');
    } finally {
      setActing(null);
    }
  };

  const photos = row.evidence_urls ?? (row.evidence_url ? [row.evidence_url] : []);

  return (
    <li className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        {/* Header — learner + activity meta */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          {onOpenStudent ? (
            <button
              type="button"
              onClick={onOpenStudent}
              className="group inline-flex items-baseline gap-1.5 text-left text-[14px] font-semibold text-white hover:text-amber-200 transition-colors touch-manipulation"
            >
              {row.student_name ?? 'Apprentice'}
              {row.cohort_name && (
                <span className="text-[11px] font-normal text-white/85">
                  · {row.cohort_name}
                </span>
              )}
              <span
                aria-hidden
                className="text-[11px] font-normal text-white/55 group-hover:text-amber-200 transition-colors"
              >
                Open 360 →
              </span>
            </button>
          ) : (
            <span className="text-[14px] font-semibold text-white">
              {row.student_name ?? 'Apprentice'}
              {row.cohort_name && (
                <span className="ml-2 text-[11px] font-normal text-white/85">
                  · {row.cohort_name}
                </span>
              )}
            </span>
          )}
          <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/85 tabular-nums">
            {ACTIVITY_LABEL[row.activity_type] ?? row.activity_type} ·{' '}
            {fmtHours(row.duration_minutes)} · {fmtRel(row.activity_date)}
          </span>
        </div>

        {/* Title + description */}
        <div className="mt-1.5 text-[14px] font-medium text-white leading-snug">
          {row.title}
        </div>
        {row.description && (
          <p className="mt-2 text-[12.5px] text-white/95 leading-snug whitespace-pre-wrap">
            {row.description}
          </p>
        )}

        {/* Unit codes */}
        {row.unit_codes && row.unit_codes.length > 0 && (
          <div className="mt-2 flex items-center flex-wrap gap-1.5">
            {row.unit_codes.map((u) => (
              <span
                key={u}
                className="inline-flex h-5 px-1.5 items-center rounded-md border border-white/[0.10] text-[10.5px] font-medium text-white/95 tabular-nums"
              >
                {u}
              </span>
            ))}
          </div>
        )}

        {/* Photos */}
        {photos.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {photos.map((url, i) => (
              <a
                key={`${url}-${i}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-16 w-16 rounded-lg overflow-hidden border border-white/[0.08] hover:border-white/[0.22] transition-colors touch-manipulation"
              >
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={url} alt={`Evidence ${i + 1}`} className="h-full w-full object-cover" />
              </a>
            ))}
          </div>
        )}

        {/* AI verdict pill */}
        {(verdictLoading || verdict || verdictError) && (
          <div className="mt-3">
            {verdictLoading && (
              <div className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[10.5px] text-white/85">
                AI checking…
              </div>
            )}
            {verdictError && !verdictLoading && (
              <div className="text-[10.5px] text-white/85">AI verdict unavailable</div>
            )}
            {verdict && !verdictLoading && (
              <div className={cn('rounded-lg border px-2.5 py-2', VERDICT_TONE[verdict.verdict])}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[10.5px] font-medium uppercase tracking-[0.14em]">
                    {VERDICT_LABEL[verdict.verdict]}
                  </span>
                  <span className="text-[10.5px] tabular-nums opacity-90">
                    {Math.round(verdict.confidence * 100)}% confident
                  </span>
                </div>
                {verdict.feedback_for_tutor && (
                  <p className="mt-1 text-[11.5px] leading-snug text-white/95">
                    {verdict.feedback_for_tutor}
                  </p>
                )}
                {verdict.suggested_ac_refs.length > 0 && (
                  <div className="mt-1.5 flex items-center flex-wrap gap-1">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/85">
                      Suggested ACs:
                    </span>
                    {verdict.suggested_ac_refs.map((ref) => (
                      <span
                        key={ref}
                        className="inline-flex h-5 px-1.5 items-center rounded-md border border-white/[0.10] text-[10px] font-medium text-white/95 tabular-nums"
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {!rejectingMode ? (
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleVerify}
              disabled={acting !== null}
              className={cn(
                'flex-1 h-10 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
                acting === 'verify'
                  ? 'bg-emerald-500/60 text-black/85'
                  : 'bg-emerald-500 text-black hover:bg-emerald-400'
              )}
            >
              {acting === 'verify' ? 'Verifying…' : 'Verify hours'}
            </button>
            <button
              type="button"
              onClick={() => setRejectingMode(true)}
              disabled={acting !== null}
              className="flex-1 h-10 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[12.5px] font-medium text-white/95 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation disabled:opacity-50"
            >
              Return for more info
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <textarea
              autoFocus
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={2}
              placeholder="What does the apprentice need to add or change?"
              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[12.5px] text-white placeholder:text-white/50 leading-relaxed focus:outline-none focus:border-rose-400/40 focus:ring-1 focus:ring-rose-400/20 touch-manipulation resize-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setRejectingMode(false);
                  setRationale('');
                }}
                disabled={acting !== null}
                className="flex-1 h-10 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[12.5px] font-medium text-white/95 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={acting !== null || rationale.trim().length === 0}
                className={cn(
                  'flex-1 h-10 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
                  acting === 'reject'
                    ? 'bg-rose-500/60 text-white/85'
                    : rationale.trim().length === 0
                      ? 'bg-white/[0.05] text-white/40'
                      : 'bg-rose-500 text-white hover:bg-rose-400'
                )}
              >
                {acting === 'reject' ? 'Returning…' : 'Return to apprentice'}
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

function EmptyState({ scope, hasAny }: { scope: InboxScope; hasAny: boolean }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-6 py-10 text-center">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
        All clear
      </div>
      <p className="mt-2 text-[13px] text-white/95 leading-snug max-w-md mx-auto">
        {hasAny
          ? 'Nothing pending in this cohort filter.'
          : scope === 'mine'
            ? "No apprentice-submitted OTJ pending for the learners assigned to you. When they submit work activities you'll see them here."
            : "No apprentice-submitted OTJ pending across this college."}
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-5 space-y-3"
        >
          <div className="h-4 w-48 rounded-md bg-white/[0.05]" />
          <div className="h-3 w-2/3 rounded-md bg-white/[0.04]" />
          <div className="h-10 rounded-lg bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
