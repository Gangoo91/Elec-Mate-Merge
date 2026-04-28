import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { fmtHours, fmtRel } from '@/lib/format';
import {
  useStudentOtjVerification,
  type OtjEntryRow,
  type SourceKind,
} from '@/hooks/useStudentOtjVerification';

interface AiVerdict {
  verdict: 'recommend_verify' | 'recommend_question' | 'recommend_reject';
  confidence: number;
  signals: {
    description_specificity: number;
    learning_evidence: number;
    otj_eligibility: number;
    duration_plausibility: number;
    ac_relevance: number;
  };
  feedback_for_tutor: string;
  suggested_ac_refs: string[];
}

/* Module-level cache for AI verdicts. Keyed on otj entry id (immutable —
   if the apprentice resubmits they get a new id). Cap at 100 entries with
   FIFO eviction so a tutor scrolling many learners doesn't leak memory. */
const verdictCache = new Map<string, AiVerdict>();
const verdictInflight = new Map<string, Promise<AiVerdict>>();
const VERDICT_CACHE_CAP = 100;

function cacheVerdict(id: string, v: AiVerdict) {
  if (verdictCache.size >= VERDICT_CACHE_CAP) {
    const first = verdictCache.keys().next().value;
    if (first) verdictCache.delete(first);
  }
  verdictCache.set(id, v);
}

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
    cacheVerdict(otjEntryId, json);
    return json;
  })();
  verdictInflight.set(otjEntryId, p);
  try {
    return await p;
  } finally {
    verdictInflight.delete(otjEntryId);
  }
}

const VERDICT_LABEL: Record<AiVerdict['verdict'], string> = {
  recommend_verify: 'AI: looks good',
  recommend_question: 'AI: ask a question first',
  recommend_reject: 'AI: would return this',
};

const VERDICT_TONE: Record<AiVerdict['verdict'], string> = {
  recommend_verify: 'border-emerald-400/30 bg-emerald-500/[0.06] text-emerald-200',
  recommend_question: 'border-amber-400/30 bg-amber-500/[0.06] text-amber-200',
  recommend_reject: 'border-rose-400/30 bg-rose-500/[0.06] text-rose-200',
};

/* ==========================================================================
   OtjVerificationPanel — tutor-side. Sits inside SectionApprenticeOtj on
   Student 360. Three jobs:

     1. Tri-source summary — verified hours per source_kind (in-app /
        apprentice-submitted / tutor-recorded / employer-attested) so the
        tutor can see at a glance where the hours come from.
     2. Pending verifications — the apprentice's submitted work-based OTJ
        entries with description, photos, units, awaiting one-click
        Verify or Reject (with rationale prompt).
     3. Returned-to-apprentice list — recently rejected entries the
        apprentice can resubmit.

   Pairs with the existing SectionApprenticeOtj timeline below — this panel
   is the *action surface* and the timeline is the *history view*.
   ========================================================================== */

const SOURCE_KIND_LABEL: Record<SourceKind, string> = {
  in_app: 'In-app',
  apprentice_submitted: 'Apprentice-submitted',
  tutor_recorded: 'Tutor-recorded',
  employer_attested: 'Employer-attested',
};

const SOURCE_KIND_DOT: Record<SourceKind, string> = {
  in_app: 'bg-blue-400',
  apprentice_submitted: 'bg-emerald-400',
  tutor_recorded: 'bg-amber-400',
  employer_attested: 'bg-purple-400',
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

interface Props {
  studentUserId: string | null;
}

export function OtjVerificationPanel({ studentUserId }: Props) {
  const hook = useStudentOtjVerification(studentUserId);

  if (!studentUserId) return null;
  if (hook.loading && hook.rows.length === 0) return <PanelSkeleton />;

  const showRejected = hook.rejected_apprentice.length > 0;
  const showPending = hook.pending_apprentice.length > 0;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Tri-source verified-hours strip */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 sm:px-5 py-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/95">
            Verified hours by source
          </div>
          <div className="text-[12px] text-white/85 tabular-nums">
            {fmtHours(hook.stats.verified_minutes)} total
          </div>
        </div>
        <ul className="mt-3 space-y-2">
          {(
            ['apprentice_submitted', 'tutor_recorded', 'employer_attested', 'in_app'] as SourceKind[]
          ).map((kind) => {
            const b = hook.stats.by_source_kind[kind];
            const verified = b.verified_minutes;
            const total = b.minutes;
            const pct = total > 0 ? Math.round((verified / total) * 100) : 0;
            const widthPct =
              hook.stats.verified_minutes > 0
                ? (verified / hook.stats.verified_minutes) * 100
                : 0;
            return (
              <li key={kind}>
                <div className="flex items-center justify-between text-[11.5px]">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn('inline-block h-1.5 w-1.5 rounded-full', SOURCE_KIND_DOT[kind])}
                    />
                    <span className="text-white/90">{SOURCE_KIND_LABEL[kind]}</span>
                    <span className="text-white/65 tabular-nums">{b.entries}</span>
                  </div>
                  <span className="text-white/95 tabular-nums">
                    {fmtHours(verified)}
                    {total > 0 && verified < total && (
                      <span className="text-white/55"> / {fmtHours(total)}</span>
                    )}
                    {total > 0 && (
                      <span className="ml-1.5 text-white/55">{pct}%</span>
                    )}
                  </span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', SOURCE_KIND_DOT[kind])}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pending verifications */}
      {showPending && (
        <PendingVerifications
          rows={hook.pending_apprentice}
          onVerify={hook.verify}
          onReject={hook.reject}
        />
      )}

      {/* Recently returned to apprentice */}
      {showRejected && (
        <RejectedHistory rows={hook.rejected_apprentice.slice(0, 4)} />
      )}
    </div>
  );
}

function PendingVerifications({
  rows,
  onVerify,
  onReject,
}: {
  rows: OtjEntryRow[];
  onVerify: (id: string) => Promise<void>;
  onReject: (id: string, rationale: string) => Promise<void>;
}) {
  return (
    <div className="rounded-2xl border border-amber-400/25 bg-amber-500/[0.04] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-amber-300">
            Pending verification
          </div>
          <span className="text-[10.5px] tabular-nums text-amber-200/95">
            {rows.length} {rows.length === 1 ? 'submission' : 'submissions'} awaiting your sign-off
          </span>
        </div>
        <ul className="mt-3 space-y-3">
          {rows.map((r) => (
            <PendingRow key={r.id} row={r} onVerify={onVerify} onReject={onReject} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function PendingRow({
  row,
  onVerify,
  onReject,
}: {
  row: OtjEntryRow;
  onVerify: (id: string) => Promise<void>;
  onReject: (id: string, rationale: string) => Promise<void>;
}) {
  const [acting, setActing] = useState<'verify' | 'reject' | null>(null);
  const [rejectingMode, setRejectingMode] = useState(false);
  const [rationale, setRationale] = useState('');
  const [verdict, setVerdict] = useState<AiVerdict | null>(null);
  const [verdictLoading, setVerdictLoading] = useState(false);
  const [verdictError, setVerdictError] = useState<string | null>(null);

  // Fetch the AI verdict for this pending row. The fetcher hits a
  // module-level cache + in-flight dedupe map — so re-mounting (learner
  // switcher, scroll, etc.) doesn't re-bill OpenAI for the same entry.
  useEffect(() => {
    let cancelled = false;
    setVerdictError(null);
    // Hit cache synchronously to avoid the loading flash.
    const cached = verdictCache.get(row.id);
    if (cached) {
      setVerdict(cached);
      setVerdictLoading(false);
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
      .catch((e: Error) => {
        if (!cancelled) {
          setVerdictError(e.message);
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
      await onVerify(row.id);
    } finally {
      setActing(null);
    }
  };

  const handleReject = async () => {
    if (acting) return;
    if (!rationale.trim()) return; // require a reason so the apprentice knows what to fix
    setActing('reject');
    try {
      await onReject(row.id, rationale);
      setRejectingMode(false);
      setRationale('');
    } finally {
      setActing(null);
    }
  };

  const photos = row.evidence_urls ?? (row.evidence_url ? [row.evidence_url] : []);

  return (
    <li className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-white/85">
            {ACTIVITY_LABEL[row.activity_type] ?? row.activity_type} ·{' '}
            <span className="tabular-nums">{fmtHours(row.duration_minutes)}</span> ·{' '}
            <span>{fmtRel(row.activity_date)}</span>
          </div>
          <div className="mt-0.5 text-[14px] font-medium text-white leading-snug">
            {row.title}
          </div>
        </div>
      </div>

      {row.description && (
        <p className="mt-2 text-[12.5px] text-white/95 leading-snug whitespace-pre-wrap">
          {row.description}
        </p>
      )}

      {/* AI verdict — pre-grade so the tutor knows what to spot-check. */}
      {(verdictLoading || verdict || verdictError) && (
        <div className="mt-2.5">
          {verdictLoading && (
            <div className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[10.5px] text-white/85">
              AI checking…
            </div>
          )}
          {verdictError && !verdictLoading && (
            <div className="text-[10.5px] text-white/65">AI verdict unavailable</div>
          )}
          {verdict && !verdictLoading && (
            <div
              className={cn(
                'rounded-lg border px-2.5 py-2',
                VERDICT_TONE[verdict.verdict]
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.14em]">
                  {VERDICT_LABEL[verdict.verdict]}
                </span>
                <span className="text-[10.5px] tabular-nums opacity-85">
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

      {!rejectingMode ? (
        <div className="mt-3 flex items-center gap-2">
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
        <div className="mt-3 space-y-2">
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
    </li>
  );
}

function RejectedHistory({ rows }: { rows: OtjEntryRow[] }) {
  return (
    <div className="rounded-2xl border border-rose-400/15 bg-rose-500/[0.03] overflow-hidden">
      <div className="px-4 sm:px-5 py-4">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-rose-300/95">
          Returned for more info
        </div>
        <p className="mt-1 text-[11.5px] text-white/85 leading-snug">
          The apprentice has been asked to resubmit these. They show in their hub with your reason.
        </p>
        <ul className="mt-3 -mx-1 divide-y divide-white/[0.05]">
          {rows.map((r) => (
            <li key={r.id} className="px-1 py-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[12.5px] font-medium text-white truncate">{r.title}</div>
                  <div className="mt-0.5 text-[10.5px] text-white/85">
                    {fmtHours(r.duration_minutes)} · {fmtRel(r.activity_date)}
                  </div>
                </div>
                <span className="shrink-0 text-[10.5px] uppercase tracking-tight font-medium text-rose-300">
                  Returned
                </span>
              </div>
              {r.verification_rationale && (
                <div className="mt-1.5 border-l-2 border-rose-400/30 pl-2 text-[11px] text-rose-100/90 leading-snug">
                  {r.verification_rationale}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-5 space-y-3">
        <div className="h-3 w-32 rounded-full bg-white/[0.05]" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-5 rounded-full bg-white/[0.04]" />
        ))}
      </div>
    </div>
  );
}
