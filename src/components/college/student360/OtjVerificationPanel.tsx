import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { supabase } from '@/integrations/supabase/client';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { openEvidence } from '@/lib/evidenceUrl';
import { fmtHours, fmtRel } from '@/lib/format';
import { textareaCn } from '@/components/forms/fieldStyles';
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

/* ==========================================================================
   OtjVerificationPanel — tutor-side. Sits inside SectionApprenticeOtj on
   Student 360. Three jobs:

     1. Tri-source summary — verified hours per source_kind (in-app /
        apprentice-submitted / tutor-recorded / employer-attested) so the
        tutor can see at a glance where the hours come from.
     2. Pending verifications — the apprentice's submitted work-based OTJ
        entries with description, photos, units, awaiting one-tap
        Verify or Return (with a reason).
     3. Returned-to-apprentice list — recently returned entries the
        apprentice can resubmit.

   This panel is the *action surface*; the timeline beneath it is the
   *history view*.

   Colour: "Verify hours" is the one solid volt control in the section —
   it is the action the panel exists for. "Return" is neutral, and only the
   word "Returned" on an already-returned entry is red, because that is the
   one genuine problem state on this card. The AI's recommendation is advice,
   not state, so it reads in white.
   ========================================================================== */

const SOURCE_KIND_LABEL: Record<SourceKind, string> = {
  in_app: 'In-app',
  apprentice_submitted: 'Apprentice-submitted',
  tutor_recorded: 'Tutor-recorded',
  employer_attested: 'Employer-attested',
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

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const CARD_TITLE = 'text-[13px] font-semibold text-white';
const CHIP =
  'inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[10.5px] font-medium tabular-nums text-white';
const NEUTRAL_BTN =
  'h-11 flex-1 rounded-lg border border-white/[0.12] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] disabled:opacity-50';

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
    <div className="space-y-3">
      {/* Tri-source verified-hours strip */}
      <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
        <div className="flex items-baseline justify-between gap-3">
          <div className={CARD_TITLE}>Verified hours by source</div>
          <div className="text-[15px] font-semibold tabular-nums text-white">
            {fmtHours(hook.stats.verified_minutes)}
          </div>
        </div>
        <ul className="mt-3 space-y-2.5">
          {(
            [
              'apprentice_submitted',
              'tutor_recorded',
              'employer_attested',
              'in_app',
            ] as SourceKind[]
          ).map((kind) => {
            const b = hook.stats.by_source_kind[kind];
            const verified = b.verified_minutes;
            const total = b.minutes;
            const pct = total > 0 ? Math.round((verified / total) * 100) : 0;
            const widthPct =
              hook.stats.verified_minutes > 0 ? (verified / hook.stats.verified_minutes) * 100 : 0;
            return (
              <li key={kind}>
                <div className="flex items-center justify-between gap-3 text-[12px] text-white">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate">{SOURCE_KIND_LABEL[kind]}</span>
                    <span className="tabular-nums">{b.entries}</span>
                  </div>
                  <span className="tabular-nums">
                    <span className="font-semibold">{fmtHours(verified)}</span>
                    {total > 0 && verified < total && <span> / {fmtHours(total)}</span>}
                    {total > 0 && <span className="ml-1.5">{pct}%</span>}
                  </span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.10]">
                  <div
                    className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pending verifications */}
      {showPending ? (
        <PendingVerifications
          rows={hook.pending_apprentice}
          onVerify={hook.verify}
          onReject={hook.reject}
        />
      ) : (
        <div className={cn(CARD, 'px-4 py-3 sm:px-5')}>
          <div className={CARD_TITLE}>
            Awaiting your sign-off
            <span className="ml-2 font-normal">Nothing outstanding</span>
          </div>
        </div>
      )}

      {/* Recently returned to apprentice */}
      {showRejected && <RejectedHistory rows={hook.rejected_apprentice.slice(0, 4)} />}
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
    <div className={cn(CARD, 'border-elec-yellow/70')}>
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <div className={CARD_TITLE}>Awaiting your sign-off</div>
        <span className="text-[12px] font-semibold tabular-nums text-elec-yellow">
          {rows.length} {rows.length === 1 ? 'submission' : 'submissions'}
        </span>
      </div>
      <ul className="divide-y divide-white/[0.10]">
        {rows.map((r) => (
          <PendingRow key={r.id} row={r} onVerify={onVerify} onReject={onReject} />
        ))}
      </ul>
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
  const canReturn = rationale.trim().length > 0;

  return (
    <li className="px-4 py-4 sm:px-5">
      <div className="text-[12px] tabular-nums text-white">
        {ACTIVITY_LABEL[row.activity_type] ?? row.activity_type} · {fmtHours(row.duration_minutes)}{' '}
        · {fmtRel(row.activity_date)}
      </div>
      <div className="mt-0.5 text-[14px] font-semibold leading-snug text-white">{row.title}</div>

      {row.description && (
        <p className="mt-2 whitespace-pre-wrap text-[12.5px] leading-snug text-white">
          {row.description}
        </p>
      )}

      {/* Employer attestation comment — surfaces concerns/praise the
          supervisor flagged at sign-off so the tutor sees it without
          digging. Only shown for employer-attested rows. */}
      {row.source_kind === 'employer_attested' && row.attestation_comment && (
        <div className="mt-2 border-l-2 border-white/[0.25] pl-3">
          <div className="text-[12px] font-semibold text-white">
            Employer comment
            {row.attested_by_name && <span className="font-normal"> — {row.attested_by_name}</span>}
          </div>
          <p className="mt-0.5 whitespace-pre-wrap text-[12px] leading-snug text-white">
            {row.attestation_comment}
          </p>
        </div>
      )}

      {/* AI verdict — pre-grade so the tutor knows what to spot-check. */}
      {(verdictLoading || verdict || verdictError) && (
        <div className="mt-2.5">
          {verdictLoading && <div className="text-[12px] text-white">AI checking…</div>}
          {verdictError && !verdictLoading && (
            <div className="text-[12px] text-white">AI verdict unavailable</div>
          )}
          {verdict && !verdictLoading && (
            <div className="rounded-lg border border-white/[0.14] px-3 py-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12px] font-semibold text-white">
                  {VERDICT_LABEL[verdict.verdict]}
                </span>
                <span className="text-[12px] tabular-nums text-white">
                  {Math.round(verdict.confidence * 100)}% confident
                </span>
              </div>
              {verdict.feedback_for_tutor && (
                <p className="mt-1 text-[12px] leading-snug text-white">
                  {verdict.feedback_for_tutor}
                </p>
              )}
              {verdict.suggested_ac_refs.length > 0 && (
                <div className="mt-1.5 flex flex-wrap items-center gap-1">
                  <span className="text-[11px] text-white">Suggested ACs:</span>
                  {verdict.suggested_ac_refs.map((ref) => (
                    <span key={ref} className={CHIP}>
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
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {row.unit_codes.map((u) => (
            <span key={u} className={CHIP}>
              {u}
            </span>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {photos.map((url, i) => (
            <a
              key={`${url}-${i}`}
              href={url}
              onClick={(e) => {
                e.preventDefault();
                void openEvidence(url);
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-16 w-16 overflow-hidden rounded-lg border border-white/[0.14] transition-colors touch-manipulation hover:border-elec-yellow/60"
            >
              {' '}
              <EvidenceImage
                src={url}
                alt={`Evidence ${i + 1}`}
                className="h-full w-full object-cover"
              />
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
              'h-11 flex-1 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
              acting !== null
                ? // Disabled goes neutral — a faded volt goes muddy on this ground.
                  'bg-white/[0.08] text-white'
                : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
            )}
          >
            {acting === 'verify' ? 'Verifying…' : 'Verify hours'}
          </button>
          <button
            type="button"
            onClick={() => setRejectingMode(true)}
            disabled={acting !== null}
            className={NEUTRAL_BTN}
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
            className={cn(textareaCn, 'w-full resize-none')}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setRejectingMode(false);
                setRationale('');
              }}
              disabled={acting !== null}
              className={NEUTRAL_BTN}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReject}
              disabled={acting !== null || !canReturn}
              className={cn(
                'h-11 flex-1 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
                acting !== null || !canReturn
                  ? 'bg-white/[0.08] text-white'
                  : 'bg-white text-black hover:bg-white/90'
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
    <div className={CARD}>
      <div className="border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <div className={CARD_TITLE}>Returned for more info</div>
        <p className="mt-0.5 text-[12px] leading-snug text-white">
          The apprentice has been asked to resubmit these. They show in their hub with your reason.
        </p>
      </div>
      <ul className="divide-y divide-white/[0.10]">
        {rows.map((r) => (
          <li key={r.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
            <span
              aria-hidden="true"
              className="mt-0.5 h-8 w-[3px] shrink-0 rounded-full bg-red-400"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-semibold leading-tight text-white">
                    {r.title}
                  </div>
                  <div className="mt-0.5 text-[12px] tabular-nums leading-tight text-white">
                    {fmtHours(r.duration_minutes)} · {fmtRel(r.activity_date)}
                  </div>
                </div>
                <span className="shrink-0 text-[12px] font-semibold text-red-300">Returned</span>
              </div>
              {r.verification_rationale && (
                <div className="mt-1.5 border-l-2 border-white/[0.25] pl-2 text-[12px] leading-snug text-white">
                  {r.verification_rationale}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className={cn(CARD, 'animate-pulse space-y-3 px-4 py-4 sm:px-5')}>
      <div className="h-3 w-32 rounded-full bg-white/[0.10]" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-5 rounded-full bg-white/[0.06]" />
      ))}
    </div>
  );
}
