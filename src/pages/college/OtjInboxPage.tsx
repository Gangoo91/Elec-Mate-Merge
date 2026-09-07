import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { fmtHours, fmtRel } from '@/lib/format';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
} from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { chipBase, chipOff, selectTriggerCn, textareaCn } from '@/components/forms/fieldStyles';
import { useTutorOtjInbox, type InboxRow, type InboxScope } from '@/hooks/useTutorOtjInbox';
import { SpagCheckButton } from '@/components/college/widgets/SpagCheckButton';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { openEvidence } from '@/lib/evidenceUrl';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   OtjInboxPage — /college/otj/inbox

   Cohort-level off-the-job verification queue. Tutors see every pending
   apprentice-submitted entry across their assigned learners (or the whole
   college via the toggle), with the same Verify / Return controls + AI
   verdict as the per-learner panel. Built for a tutor with 30+ apprentices
   to clear submissions without bouncing between Student 360 pages.

   Rebuilt on the shared hub shell. The amber eyebrow, 40px "Inbox" headline
   and paragraph went; what the page is for is now the masthead title and a
   KPI row (submissions, hours claimed, learners, oldest waiting). Each
   submission is a block inside one card, separated by rules, with a volt
   rule on the left when it is selected.

   Volt: exactly one solid control — "Verify N" in the bulk toolbar, which
   only exists while rows are selected. Per-row Verify is a neutral button
   (thirty of them in volt would be a wall) and Return is text. The AI
   verdict is a word in a neutral box: red only when it would return the
   entry, volt when it would ask first.
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

const VERDICT_TEXT: Record<AiVerdict['verdict'], string> = {
  recommend_verify: 'text-white',
  recommend_question: 'text-elec-yellow',
  recommend_reject: 'text-red-300',
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

const DAY_MS = 86_400_000;

function daysOld(iso: string | null): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / DAY_MS));
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

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

/** Neutral in-row action — 44px, never volt. */
const ROW_ACTION =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] active:scale-[0.98] disabled:bg-white/[0.03] disabled:opacity-60';

/** Quiet text action — 44px tall, no surface. */
const TEXT_ACTION =
  'inline-flex h-11 items-center justify-center px-3 text-[12.5px] font-semibold text-white transition-colors touch-manipulation disabled:opacity-60';

export default function OtjInboxPage() {
  useSEO({
    title: 'Off-the-job verification inbox',
    description: 'Pending off-the-job training submissions awaiting tutor sign-off.',
    noindex: true,
  });
  const navigate = useNavigate();
  const inbox = useTutorOtjInbox();
  const { toast } = useToast();

  const [cohortFilter, setCohortFilter] = useState<string>('all');
  // Multi-select for bulk verify/return — see toolbar below the filter strip.
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkReturning, setBulkReturning] = useState(false);
  const [bulkRationale, setBulkRationale] = useState('');
  const [bulkActing, setBulkActing] = useState(false);

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

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

  // Drop selected ids that are no longer in the visible inbox (e.g. another
  // tab verified them). Keeps the bulk toolbar honest.
  useEffect(() => {
    setSelected((prev) => {
      const visible = new Set(filteredRows.map((r) => r.id));
      let changed = false;
      const next = new Set<string>();
      for (const id of prev) {
        if (visible.has(id)) next.add(id);
        else changed = true;
      }
      return changed ? next : prev;
    });
  }, [filteredRows]);

  const allSelected = filteredRows.length > 0 && filteredRows.every((r) => selected.has(r.id));

  const toggleSelectAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filteredRows.map((r) => r.id)));
  };

  const handleBulkVerify = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    setBulkActing(true);
    try {
      const { ok, failed } = await inbox.bulkVerify(ids);
      setSelected(new Set());
      toast({
        title: failed > 0 ? `Verified ${ok}, ${failed} failed` : `Verified ${ok} submissions`,
        variant: failed > 0 ? 'destructive' : undefined,
      });
    } finally {
      setBulkActing(false);
    }
  };

  const handleBulkReject = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0 || !bulkRationale.trim()) return;
    setBulkActing(true);
    try {
      const { ok, failed } = await inbox.bulkReject(ids, bulkRationale);
      setSelected(new Set());
      setBulkRationale('');
      setBulkReturning(false);
      toast({
        title: failed > 0 ? `Returned ${ok}, ${failed} failed` : `Returned ${ok} submissions`,
        variant: failed > 0 ? 'destructive' : undefined,
      });
    } finally {
      setBulkActing(false);
    }
  };

  const totalMinutes = filteredRows.reduce((acc, r) => acc + (r.duration_minutes ?? 0), 0);
  const learnerCount = useMemo(
    () => new Set(filteredRows.map((r) => r.student_id)).size,
    [filteredRows]
  );
  // The hook orders oldest first, so the first row has waited longest.
  const oldestDays = filteredRows.length > 0 ? daysOld(filteredRows[0].created_at) : null;
  const ready = !(inbox.loading && inbox.rows.length === 0);

  return (
    <HubPage>
      <HubMasthead section="College" title="Off-the-job to verify" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        {inbox.error && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              'flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-red-400/40 px-4 py-3',
              CARD_SURFACE
            )}
          >
            <span className="text-[13px] font-medium text-white">
              Could not load the inbox — {inbox.error}
            </span>
            <button
              type="button"
              onClick={() => void inbox.refresh()}
              className="-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow touch-manipulation"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Four live figures for the current scope and cohort filter. */}
        <HubKpiRow>
          <HubKpi
            accent
            label="Submissions"
            value={ready ? String(filteredRows.length) : '—'}
            verdict={
              !ready
                ? undefined
                : filteredRows.length === 0
                  ? 'Nothing waiting'
                  : inbox.scope === 'mine'
                    ? 'From learners assigned to you'
                    : 'Across the college'
            }
          />
          <HubKpi
            label="Hours claimed"
            value={ready ? fmtHours(totalMinutes) : '—'}
            verdict={
              !ready
                ? undefined
                : totalMinutes > 0
                  ? 'Counts toward their record once verified'
                  : 'No hours waiting'
            }
          />
          <HubKpi
            label="Learners"
            value={ready ? String(learnerCount) : '—'}
            verdict={
              !ready ? undefined : learnerCount > 0 ? 'With something to sign off' : 'None waiting'
            }
          />
          <HubKpi
            label="Oldest waiting"
            value={ready && oldestDays !== null ? `${oldestDays}d` : '—'}
            verdict={
              !ready
                ? undefined
                : oldestDays === null
                  ? 'Nothing waiting'
                  : oldestDays >= 7
                    ? 'A week unverified costs them their hours record'
                    : 'Verify before it turns a week old'
            }
            sentiment={oldestDays !== null && oldestDays >= 7 ? 'bad' : 'neutral'}
          />
        </HubKpiRow>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <HubSectionHeading>Waiting for sign-off</HubSectionHeading>
            <span
              className={cn(
                'text-[11px] font-semibold tabular-nums',
                oldestDays !== null && oldestDays >= 7 ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {plural(filteredRows.length, 'submission')}
              {totalMinutes > 0 ? ` · ${fmtHours(totalMinutes)}` : ''}
            </span>
          </motion.div>

          {/* Scope chips + cohort picker. Active chip is solid white. */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            {(['mine', 'college'] as InboxScope[]).map((s) => {
              const active = inbox.scope === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => inbox.setScope(s)}
                  aria-pressed={active}
                  className={cn(
                    chipBase,
                    'inline-flex items-center px-3.5 text-[12.5px]',
                    active ? 'border-white bg-white font-semibold text-black' : chipOff
                  )}
                >
                  {s === 'mine' ? 'Assigned to me' : 'All college'}
                </button>
              );
            })}
            {cohorts.length > 1 && (
              <select
                value={cohortFilter}
                onChange={(e) => setCohortFilter(e.target.value)}
                aria-label="Filter by cohort"
                className={cn(selectTriggerCn, 'ml-auto max-w-[220px] text-[13px]')}
              >
                <option value="all">All cohorts</option>
                {cohorts.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}
          </motion.div>

          {/* Bulk-action toolbar — only when something is selected. Neutral
              surface; the volt lives on the Verify button. */}
          {selected.size > 0 && (
            <motion.div
              variants={itemVariants}
              className={cn(
                'space-y-3 rounded-2xl border border-elec-yellow/35 p-3 sm:p-4',
                CARD_SURFACE
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-[13px] font-semibold tabular-nums text-elec-yellow">
                  {selected.size} selected
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    disabled={bulkActing}
                    className={TEXT_ACTION}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setBulkReturning((v) => !v)}
                    disabled={bulkActing}
                    aria-expanded={bulkReturning}
                    className={cn(ROW_ACTION, 'w-full sm:w-auto')}
                  >
                    Return for more info
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleBulkVerify()}
                    disabled={bulkActing}
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white sm:w-auto"
                  >
                    {bulkActing ? 'Verifying…' : `Verify ${selected.size}`}
                  </button>
                </div>
              </div>
              {bulkReturning && (
                <div className="space-y-2 border-t border-white/[0.10] pt-3">
                  <label className="block text-[12px] font-medium text-white">
                    Shared rationale — sent to every learner
                  </label>
                  <textarea
                    rows={2}
                    value={bulkRationale}
                    onChange={(e) => setBulkRationale(e.target.value)}
                    placeholder="e.g. Add the dates each task was carried out and how long each took."
                    className={cn(textareaCn, 'w-full resize-none')}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBulkReturning(false);
                        setBulkRationale('');
                      }}
                      className={TEXT_ACTION}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleBulkReject()}
                      disabled={bulkActing || !bulkRationale.trim()}
                      className={ROW_ACTION}
                    >
                      {bulkActing ? 'Returning…' : `Return ${selected.size}`}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Select-all, only when there's anything to select */}
          {filteredRows.length > 0 && (
            <motion.div variants={itemVariants}>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-[12.5px] font-medium text-white touch-manipulation">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-5 w-5 rounded border-white/40 bg-transparent text-elec-yellow focus:ring-elec-yellow"
                />
                <span>{allSelected ? 'Deselect all' : 'Select all shown'}</span>
              </label>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className={cn(
              '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
              CARD_SURFACE
            )}
          >
            {!ready ? (
              <Skeleton />
            ) : filteredRows.length === 0 ? (
              <EmptyState scope={inbox.scope} hasAny={inbox.rows.length > 0} />
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {filteredRows.map((row) => (
                  <SubmissionBlock
                    key={row.id}
                    row={row}
                    selected={selected.has(row.id)}
                    onToggleSelect={() => toggleSelect(row.id)}
                    onVerify={() => inbox.verify(row.id)}
                    onReject={(rationale) => inbox.reject(row.id, rationale)}
                    onOpenStudent={
                      row.college_student_row_id
                        ? () => navigate(`/college/students/${row.college_student_row_id}#otj`)
                        : null
                    }
                  />
                ))}
              </ul>
            )}
          </motion.div>
        </motion.section>
      </HubBody>
    </HubPage>
  );
}

function SubmissionBlock({
  row,
  selected,
  onToggleSelect,
  onVerify,
  onReject,
  onOpenStudent,
}: {
  row: InboxRow;
  selected: boolean;
  onToggleSelect: () => void;
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
  const age = daysOld(row.created_at);
  const urgent = age !== null && age >= 7;
  const meta = [
    row.cohort_name,
    ACTIVITY_LABEL[row.activity_type] ?? row.activity_type,
    fmtHours(row.duration_minutes),
    fmtRel(row.activity_date),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <li className={cn('transition-colors', selected && 'bg-white/[0.06]')}>
      <div className="flex items-stretch">
        {/* Selection — a 44px column down the left of the block. */}
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          aria-label="Select this submission"
          onClick={onToggleSelect}
          className="flex w-11 shrink-0 items-start justify-center pl-3 pt-4 touch-manipulation sm:pl-4"
        >
          <span
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors',
              selected ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.35]'
            )}
          >
            {selected && <span className="text-[13px] font-semibold leading-none">✓</span>}
          </span>
        </button>

        <div className="min-w-0 flex-1 px-4 py-4 sm:px-5">
          {/* Learner row — the work-list row shape; taps through to Student 360 */}
          <button
            type="button"
            onClick={onOpenStudent ?? undefined}
            disabled={!onOpenStudent}
            className={cn(
              '-mx-1 flex w-full min-h-11 items-center gap-3 rounded-lg px-1 text-left touch-manipulation',
              onOpenStudent && 'transition-colors hover:bg-white/[0.06]'
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'h-8 w-[3px] shrink-0 rounded-full',
                selected || urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
              )}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                {row.student_name ?? 'Apprentice'}
              </span>
              <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                {meta}
              </span>
            </span>
            {age !== null && (
              <span
                className={cn(
                  'shrink-0 text-[13px] font-semibold tabular-nums',
                  urgent ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {age === 0 ? 'today' : `${age}d`}
              </span>
            )}
            {onOpenStudent && (
              <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
            )}
          </button>

          {/* Title + description */}
          <div className="mt-2 text-[14px] font-medium leading-snug text-white">{row.title}</div>
          {row.description && (
            <p className="mt-1.5 whitespace-pre-wrap text-[12.5px] leading-snug text-white">
              {row.description}
            </p>
          )}

          {/* SpaG check on apprentice's reflection */}
          {row.description && row.description.length >= 30 && (
            <div className="mt-2">
              <SpagCheckButton
                text={row.description}
                sourceKind="otj"
                sourceId={row.id}
                studentId={row.college_student_row_id ?? undefined}
                studentName={row.student_name ?? undefined}
                variant="compact"
              />
            </div>
          )}

          {/* Unit codes */}
          {row.unit_codes && row.unit_codes.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {row.unit_codes.map((u) => (
                <span
                  key={u}
                  className="inline-flex h-6 items-center rounded-md border border-white/[0.12] px-1.5 text-[11px] font-medium tabular-nums text-white"
                >
                  {u}
                </span>
              ))}
            </div>
          )}

          {/* Photos */}
          {photos.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {photos.map((url, i) => (
                <button
                  key={`${url}-${i}`}
                  type="button"
                  onClick={() => void openEvidence(url)}
                  className="block h-16 w-16 overflow-hidden rounded-lg border border-white/[0.12] transition-colors touch-manipulation hover:border-white/[0.3]"
                >
                  <EvidenceImage
                    src={url}
                    alt={`Evidence ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* AI verdict — a word in a neutral box, coloured only by what it means. */}
          {(verdictLoading || verdict || verdictError) && (
            <div className="mt-3">
              {verdictLoading && (
                <div className="text-[12px] font-medium text-white">AI checking…</div>
              )}
              {verdictError && !verdictLoading && (
                <div className="text-[12px] font-medium text-white">AI verdict unavailable</div>
              )}
              {verdict && !verdictLoading && (
                <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 py-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={cn('text-[12px] font-semibold', VERDICT_TEXT[verdict.verdict])}
                    >
                      {VERDICT_LABEL[verdict.verdict]}
                    </span>
                    <span className="text-[11.5px] tabular-nums text-white">
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
                      <span className="text-[11px] font-medium text-white">Suggested ACs:</span>
                      {verdict.suggested_ac_refs.map((ref) => (
                        <span
                          key={ref}
                          className="inline-flex h-6 items-center rounded-md border border-white/[0.12] px-1.5 text-[11px] font-medium tabular-nums text-white"
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

          {/* Actions — Verify is a neutral button (one per row, never volt);
              Return is text until it is chosen. */}
          {!rejectingMode ? (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => void handleVerify()}
                disabled={acting !== null}
                className={cn(ROW_ACTION, 'flex-1')}
              >
                {acting === 'verify' ? 'Verifying…' : 'Verify hours'}
              </button>
              <button
                type="button"
                onClick={() => setRejectingMode(true)}
                disabled={acting !== null}
                className={cn(TEXT_ACTION, 'flex-1')}
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
                  className={cn(TEXT_ACTION, 'flex-1')}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleReject()}
                  disabled={acting !== null || rationale.trim().length === 0}
                  className={cn(ROW_ACTION, 'flex-1')}
                >
                  {acting === 'reject' ? 'Returning…' : 'Return to apprentice'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function EmptyState({ scope, hasAny }: { scope: InboxScope; hasAny: boolean }) {
  return (
    <div className="px-4 py-6 sm:px-5">
      <div className="text-[14px] font-semibold text-white">Nothing to verify</div>
      <p className="mt-1 max-w-prose text-[12.5px] leading-snug text-white">
        {hasAny
          ? 'Nothing pending in this cohort.'
          : scope === 'mine'
            ? 'No apprentice-submitted off-the-job entries are waiting from the learners assigned to you. When they submit work activities, they appear here.'
            : 'No apprentice-submitted off-the-job entries are waiting across the college.'}
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <ul className="divide-y divide-white/[0.10]">
      {[0, 1, 2].map((i) => (
        <li key={i} className="space-y-3 px-4 py-4 sm:px-5">
          <div className="h-4 w-48 animate-pulse rounded-md bg-white/[0.10]" />
          <div className="h-3 w-2/3 animate-pulse rounded-md bg-white/[0.07]" />
          <div className="h-11 animate-pulse rounded-xl bg-white/[0.05]" />
        </li>
      ))}
    </ul>
  );
}
