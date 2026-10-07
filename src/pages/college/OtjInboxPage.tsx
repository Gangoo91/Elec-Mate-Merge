import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Search, Undo2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { supabase } from '@/integrations/supabase/client';
import { fmtHours, fmtRel } from '@/lib/format';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import {
  Bars,
  BulkBar,
  KeyHint,
  QueueGroup,
  QueueRow,
  SwipeRow,
  daysSince,
  useQueueKeys,
  useSelection,
  waitingLabel,
} from '@/components/college/assessment/AssessmentKit';
import { textareaCn } from '@/components/forms/fieldStyles';
import { useTutorOtjInbox, type InboxRow } from '@/hooks/useTutorOtjInbox';
import { CollegeScopeTabs } from '@/components/college/scope/CollegeScopeSwitch';
import { SpagCheckButton } from '@/components/college/widgets/SpagCheckButton';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { openEvidence } from '@/lib/evidenceUrl';
import { useToast } from '@/hooks/use-toast';
import { useDeepLinkFocus } from '@/hooks/useDeepLinkFocus';
import { OTJ_ACTIVITY_LABEL } from '@/data/otjActivityTypes';

/* ==========================================================================
   OtjInboxPage — /college/otj/inbox. Off-the-job hours to verify.

   Redesigned 7 Oct 2026 on the College Hub kit (ELE-1889): the same row,
   verbs and order as the College inbox, a reading pane beside the list on a
   wide screen (inline under the row on a phone), tick boxes for Verify or
   Return in bulk, and a keyboard on desktop (j/k move, Shift+V verify, r return,
   x tick), swipe on a phone (right verify, left return). Scope is the one
   College Hub setting from the masthead (ELE-1886). Data unchanged: useTutorOtjInbox and the ai-otj-verdict function.
   ========================================================================== */

interface AiVerdict {
  verdict: 'recommend_verify' | 'recommend_question' | 'recommend_reject';
  confidence: number;
  feedback_for_tutor: string | null;
  suggested_ac_refs: string[];
}

const VERDICT_LABEL: Record<AiVerdict['verdict'], string> = {
  recommend_verify: 'Suggested check: looks good',
  recommend_question: 'Suggested check: ask first',
  recommend_reject: 'Suggested check: would return',
};

const VERDICT_TEXT: Record<AiVerdict['verdict'], string> = {
  recommend_verify: 'text-emerald-400',
  recommend_question: 'text-elec-yellow',
  recommend_reject: 'text-orange-300',
};

const ACTIVITY_LABEL: Record<string, string> = OTJ_ACTIVITY_LABEL;

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
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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

const HELP: PageHelpContent = {
  id: 'college-otj-inbox',
  title: 'Hours to verify',
  what: 'Off-the-job hours your apprentices have logged and sent to you. Verified hours count on their record and in the funding evidence; returned ones go back to the learner with your note.',
  steps: [
    { title: 'Start at the top', body: 'The oldest entry comes first. Anything over a week is orange: unverified hours start to cost the learner.' },
    { title: 'Read and decide', body: 'Open an entry to see what they did, their photos and a suggested check. Verify it, or Return it with a note saying what to add.' },
    { title: 'Clear several at once', body: 'Tick the entries you are happy with and Verify them together, or Return them all with one shared note.' },
    { title: 'Use the keyboard', body: 'On a computer: j and k move, Enter opens, Shift+V verifies, r returns, x ticks, Esc clears.' },
  ],
  legend: [
    { swatch: 'bg-orange-500', label: 'Waiting a week or more', body: 'Verify before it turns a week old.' },
    { swatch: 'bg-elec-yellow', label: 'Ask first', body: 'The suggested check thinks the entry needs more detail.' },
  ],
  notes: [
    { title: 'Mine, My cohorts or Whole college', body: 'The switch in the bar at the top sets this for the whole College Hub. Mine is the apprentices assigned to you, My cohorts is everyone in the cohorts you teach. With nobody of yours, you see everyone.' },
    { title: 'The suggested check', body: 'It reads the entry and says whether it looks complete. It never verifies anything for you.' },
  ],
  source: 'Apprenticeship funding rules 2025/26: off-the-job training evidence.',
};

const ageBand = (d: number | null) => (d === null || d <= 0 ? 0 : d <= 3 ? 1 : d < 7 ? 2 : 3);

export default function OtjInboxPage() {
  useSEO({
    title: 'Off-the-job verification inbox',
    description: 'Pending off-the-job training submissions awaiting tutor sign-off.',
    noindex: true,
  });
  const navigate = useNavigate();
  const inbox = useTutorOtjInbox();
  const { toast } = useToast();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [cohortFilter, setCohortFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [bulkReturning, setBulkReturning] = useState(false);
  const [bulkRationale, setBulkRationale] = useState('');
  const [bulkActing, setBulkActing] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [returnFor, setReturnFor] = useState<string | null>(null);

  const cohorts = useMemo(() => {
    const set = new Set<string>();
    for (const r of inbox.rows) if (r.cohort_name) set.add(r.cohort_name);
    return Array.from(set).sort();
  }, [inbox.rows]);

  // ?entry=<id> (from the college inbox) puts that entry first and opens it.
  const focusId = useMemo(() => new URLSearchParams(window.location.search).get('entry'), []);
  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    let base = cohortFilter === 'all' ? inbox.rows : inbox.rows.filter((r) => r.cohort_name === cohortFilter);
    if (q)
      base = base.filter((r) =>
        [r.student_name, r.title, r.cohort_name, r.description].some((v) => (v ?? '').toLowerCase().includes(q))
      );
    if (!focusId) return base;
    const hit = base.find((r) => r.id === focusId);
    return hit ? [hit, ...base.filter((r) => r.id !== focusId)] : base;
  }, [inbox.rows, cohortFilter, focusId, search]);
  const focusRow = focusId ? (inbox.rows.find((r) => r.id === focusId) ?? null) : null;

  // …and scrolls it into view, so the open detail sits beside it.
  useDeepLinkFocus(focusRow ? focusRow.id : null);
  // A notification about a learner outside "My learners" (another tutor's,
  // or one the tutor covers): widen to Everyone once rather than say "not here".
  const widened = useRef(false);
  useEffect(() => {
    if (!focusId || focusRow || widened.current || inbox.loading || inbox.scope !== 'mine') return;
    widened.current = true;
    inbox.setScope('college');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusId, focusRow, inbox.loading, inbox.scope]);
  useEffect(() => {
    if (focusRow && !openId) setOpenId(focusRow.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRow]);

  // On a wide screen the reading pane always shows something.
  useEffect(() => {
    if (!isDesktop) return;
    if (openId && filteredRows.some((r) => r.id === openId)) return;
    setOpenId(filteredRows[0]?.id ?? null);
  }, [isDesktop, filteredRows, openId]);

  const keys = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
  const sel = useSelection(keys);
  const allSelected = keys.length > 0 && keys.every((k) => sel.has(k));

  const verifyOne = useCallback(
    async (id: string) => {
      // The hook drops the row at once and toasts only if it fails.
      await inbox.verify(id);
    },
    [inbox]
  );

  const kb = useQueueKeys({
    keys,
    onOpen: (k) => setOpenId(k),
    onToggle: (k) => sel.toggle(k),
    onClear: () => sel.clear(),
    extra: useMemo(
      () => ({
        // Shift+V, never a bare key: verifying is final (notify-otj-status
        // has no un-verify) and it pushes to the apprentice at once.
        V: (k: string) => void verifyOne(k),
        r: (k: string) => {
          setOpenId(k);
          setReturnFor(k);
        },
      }),
      [verifyOne]
    ),
  });
  // Moving with the keyboard opens the entry in the reading pane.
  useEffect(() => {
    if (kb.focus && isDesktop) setOpenId(kb.focus);
  }, [kb.focus, isDesktop]);

  const handleBulkVerify = async () => {
    const ids = Array.from(sel.selected);
    if (ids.length === 0) return;
    setBulkActing(true);
    try {
      const { ok, failed } = await inbox.bulkVerify(ids);
      sel.clear();
      toast({
        title: failed > 0 ? `Verified ${ok}, ${failed} failed` : `Verified ${ok} ${ok === 1 ? 'entry' : 'entries'}`,
        variant: failed > 0 ? 'destructive' : undefined,
      });
    } finally {
      setBulkActing(false);
    }
  };

  const handleBulkReject = async () => {
    const ids = Array.from(sel.selected);
    if (ids.length === 0 || !bulkRationale.trim()) return;
    setBulkActing(true);
    try {
      const { ok, failed } = await inbox.bulkReject(ids, bulkRationale);
      sel.clear();
      setBulkRationale('');
      setBulkReturning(false);
      toast({
        title: failed > 0 ? `Returned ${ok}, ${failed} failed` : `Returned ${ok} ${ok === 1 ? 'entry' : 'entries'}`,
        variant: failed > 0 ? 'destructive' : undefined,
      });
    } finally {
      setBulkActing(false);
    }
  };

  const totalMinutes = filteredRows.reduce((acc, r) => acc + (r.duration_minutes ?? 0), 0);
  const learnerCount = useMemo(() => new Set(filteredRows.map((r) => r.student_id)).size, [filteredRows]);
  const ages = filteredRows.map((r) => daysSince(r.created_at));
  const oldestDays = ages.reduce<number | null>((m, d) => (d === null ? m : m === null ? d : Math.max(m, d)), null);
  const overWeek = ages.filter((d) => d !== null && d >= 7).length;
  const ready = !(inbox.loading && inbox.rows.length === 0);

  const bands = [0, 0, 0, 0];
  for (const d of ages) bands[ageBand(d)] += 1;
  const byLearner = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of filteredRows) {
      const n = r.student_name ?? 'Apprentice';
      m.set(n, (m.get(n) ?? 0) + (r.duration_minutes ?? 0));
    }
    return Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [filteredRows]);

  const urgentRows = filteredRows.filter((r) => (daysSince(r.created_at) ?? 0) >= 7);
  const otherRows = filteredRows.filter((r) => (daysSince(r.created_at) ?? 0) < 7);
  const openRow = filteredRows.find((r) => r.id === openId) ?? null;

  const renderRow = (row: InboxRow) => {
    const age = daysSince(row.created_at);
    const urgent = age !== null && age >= 7;
    const open = openId === row.id;
    return (
      <li key={row.id} data-qkey={row.id} data-focus-id={row.id}>
        <SwipeRow
          right={{ label: 'Verify', icon: <Check className="h-5 w-5" aria-hidden />, tone: 'go', onAction: () => void verifyOne(row.id) }}
          left={{
            label: 'Return',
            icon: <Undo2 className="h-5 w-5" aria-hidden />,
            onAction: () => {
              setOpenId(row.id);
              setReturnFor(row.id);
            },
          }}
        >
        <QueueRow
          name={row.student_name ?? 'Apprentice'}
          kind={ACTIVITY_LABEL[row.activity_type] ?? 'Hours'}
          title={`${fmtHours(row.duration_minutes)} · ${row.title}`}
          body={row.activity_date ? `Done ${fmtRel(row.activity_date)}` : undefined}
          meta={
            <>
              <b className="font-semibold">{waitingLabel(age)}</b>
              {row.cohort_name ? ` · ${row.cohort_name}` : ''}
            </>
          }
          urgent={urgent}
          action={open ? (isDesktop ? 'Open' : 'Close') : 'Check'}
          onOpen={() => setOpenId(open && !isDesktop ? null : row.id)}
          selectable
          selected={sel.has(row.id)}
          onToggle={() => sel.toggle(row.id)}
          focused={kb.focus === row.id || (isDesktop && open)}
        />
        </SwipeRow>
        {!isDesktop && open && (
          <div className="border-t border-white/[0.06] bg-white/[0.02] px-4 pb-5 pt-4">
            <SubmissionDetail
              row={row}
              startReturning={returnFor === row.id}
              onReturningShown={() => setReturnFor(null)}
              onVerify={() => verifyOne(row.id)}
              onReject={async (rationale) => {
                await inbox.reject(row.id, rationale);
              }}
              onOpenStudent={
                row.college_student_row_id ? () => navigate(`/college/students/${row.college_student_row_id}#otj`) : null
              }
            />
          </div>
        )}
      </li>
    );
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Hours to verify" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <CollegePageHeader
          eyebrow="Off-the-job"
          title={
            !ready
              ? 'Gathering hours…'
              : filteredRows.length === 0
                ? 'No hours to verify'
                : `${filteredRows.length} ${filteredRows.length === 1 ? 'entry' : 'entries'} to verify`
          }
          description={
            !ready
              ? 'Hours your apprentices have logged and sent to you.'
              : filteredRows.length === 0
                ? 'When an apprentice logs off-the-job hours, they land here for you to verify.'
                : `${fmtHours(totalMinutes)} claimed by ${learnerCount} ${learnerCount === 1 ? 'learner' : 'learners'}${overWeek ? `, ${overWeek} waiting over a week` : ''}. Oldest first.`
          }
          help={HELP}
          actions={
            <CollegeScopeTabs />
          }
        />

        {inbox.error && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-500/40 px-4 py-3">
            <p className="text-[13.5px] text-white">Couldn’t load the hours: {inbox.error}</p>
            <button type="button" onClick={() => void inbox.refresh()} className="h-11 px-3 text-[13px] font-semibold text-elec-yellow">
              Try again
            </button>
          </div>
        )}

        {inbox.scope === 'mine' && inbox.fellBackToCollege && (
          <p className="text-[13px] leading-relaxed text-white">
            Showing every learner at the college: nobody is assigned to you yet. Assign learners to yourself (People, then
            Learners) to narrow this to your own.
          </p>
        )}

        <CollegeStats
          items={[
            { label: 'Entries', value: ready ? String(filteredRows.length) : '—', sub: inbox.effectiveScope === 'mine' ? 'From your learners' : 'Across the college' },
            { label: 'Hours claimed', value: ready ? fmtHours(totalMinutes) : '—', sub: 'Count once verified' },
            { label: 'Learners', value: ready ? String(learnerCount) : '—', sub: 'With hours waiting' },
            {
              label: 'Oldest waiting',
              value: ready && oldestDays !== null ? `${oldestDays}d` : '—',
              sub: oldestDays !== null && oldestDays >= 7 ? 'Verify today' : 'Within a week',
              warn: oldestDays !== null && oldestDays >= 7,
            },
          ]}
        />

        {ready && filteredRows.length > 0 && (
          <section className={cn(COLLEGE_CARD, 'grid gap-6 lg:grid-cols-2')}>
            <div className="min-w-0">
              <p className="mb-3 text-[13px] font-semibold text-white">How long entries have waited</p>
              <Bars
                rows={[
                  { label: 'Today', n: bands[0], cls: 'bg-emerald-500' },
                  { label: '1 to 3 days', n: bands[1], cls: 'bg-white' },
                  { label: '4 to 6 days', n: bands[2], cls: 'bg-elec-yellow' },
                  { label: 'A week or more', n: bands[3], cls: 'bg-orange-500' },
                ]}
              />
            </div>
            <div className="min-w-0">
              <p className="mb-3 text-[13px] font-semibold text-white">Most hours waiting, by learner</p>
              <ul className="space-y-1">
                {byLearner.map(([name, min]) => {
                  const max = Math.max(1, byLearner[0]?.[1] ?? 1);
                  return (
                    <li key={name} className="grid min-h-[36px] grid-cols-[minmax(0,8.5rem)_1fr_3.5rem] items-center gap-3 px-1">
                      <span className="truncate text-[12.5px] text-white">{name}</span>
                      <span className="h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
                        <span className="block h-full rounded-full bg-white" style={{ width: `${(min / max) * 100}%` }} />
                      </span>
                      <span className="text-right text-[13px] font-semibold tabular-nums text-white">{fmtHours(min)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <section className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-end gap-3">
              <div className="relative min-w-[200px] flex-1">
                <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Find a learner or entry"
                  aria-label="Find a learner or entry"
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
              </div>
              {cohorts.length > 1 && (
                <select
                  value={cohortFilter}
                  onChange={(e) => setCohortFilter(e.target.value)}
                  aria-label="Filter by cohort"
                  className="h-11 max-w-[220px] rounded-xl border border-white/[0.14] bg-transparent px-3 text-[13px] font-semibold text-white [color-scheme:dark] touch-manipulation"
                >
                  <option value="all">All cohorts</option>
                  {cohorts.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              {filteredRows.length > 0 ? (
                <button
                  type="button"
                  onClick={() => (allSelected ? sel.clear() : sel.setAll(keys))}
                  className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {allSelected ? 'Untick all' : `Tick all ${filteredRows.length}`}
                </button>
              ) : (
                <span />
              )}
              <KeyHint
                items={[
                  ['j k', 'move'],
                  ['Shift V', 'verify'],
                  ['r', 'return'],
                  ['x', 'tick'],
                ]}
              />
            </div>

            {focusId && (
              <p className="text-[13px] font-semibold text-white">
                {focusRow
                  ? `From your inbox: ${focusRow.title}, first below.`
                  : 'That entry is not in this view. Try Whole college; if it is not there, it has been dealt with.'}
              </p>
            )}

            {!ready ? (
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : filteredRows.length === 0 ? (
              <CollegeEmpty
                title={inbox.rows.length > 0 ? 'Nothing matches this view' : 'Nothing to verify'}
                body={
                  inbox.rows.length > 0
                    ? 'Try another cohort, or clear the search.'
                    : inbox.scope === 'mine'
                      ? 'No hours are waiting from your learners. Switch to Whole college to see everyone.'
                      : 'No hours are waiting anywhere in the college. New entries land here as apprentices log them.'
                }
              />
            ) : (
              <>
                {urgentRows.length > 0 && (
                  <QueueGroup title="Waiting a week or more" urgent count={urgentRows.length}>
                    {urgentRows.map(renderRow)}
                  </QueueGroup>
                )}
                {otherRows.length > 0 && (
                  <QueueGroup title={urgentRows.length ? 'Everything else' : 'To verify'} count={otherRows.length}>
                    {otherRows.map(renderRow)}
                  </QueueGroup>
                )}
              </>
            )}
          </section>

          {isDesktop && (
            <aside className="min-w-0 lg:sticky lg:top-16">
              {openRow ? (
                <div className={cn(COLLEGE_CARD, 'max-h-[calc(100vh-6rem)] overflow-y-auto')}>
                  <SubmissionDetail
                    key={openRow.id}
                    row={openRow}
                    startReturning={returnFor === openRow.id}
                    onReturningShown={() => setReturnFor(null)}
                    onVerify={() => verifyOne(openRow.id)}
                    onReject={async (rationale) => {
                      await inbox.reject(openRow.id, rationale);
                    }}
                    onOpenStudent={
                      openRow.college_student_row_id
                        ? () => navigate(`/college/students/${openRow.college_student_row_id}#otj`)
                        : null
                    }
                    showLearner
                  />
                </div>
              ) : (
                ready &&
                filteredRows.length > 0 && <CollegeEmpty title="Pick an entry" body="It opens here to read, verify or return." />
              )}
            </aside>
          )}
        </div>
      </HubBody>

      <BulkBar count={sel.count} onClear={sel.clear}>
        {bulkReturning ? (
          <div className="flex w-full flex-col gap-2 pr-2 sm:flex-row sm:items-end">
            <label className="sr-only" htmlFor="bulk-return-note">
              Shared note for every learner
            </label>
            <textarea
              id="bulk-return-note"
              rows={2}
              value={bulkRationale}
              onChange={(e) => setBulkRationale(e.target.value)}
              placeholder="Shared note, sent to every learner: e.g. add the dates and how long each task took."
              className={cn(textareaCn, 'min-w-0 flex-1 resize-none')}
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setBulkReturning(false)} className={COLLEGE_BTN}>
                Back
              </button>
              <button
                type="button"
                onClick={() => void handleBulkReject()}
                disabled={bulkActing || !bulkRationale.trim()}
                className={COLLEGE_BTN_PRIMARY}
              >
                {bulkActing ? 'Returning…' : `Return ${sel.count}`}
              </button>
            </div>
          </div>
        ) : (
          <>
            <button type="button" onClick={() => setBulkReturning(true)} disabled={bulkActing} className={COLLEGE_BTN}>
              Return
            </button>
            <button type="button" onClick={() => void handleBulkVerify()} disabled={bulkActing} className={COLLEGE_BTN_PRIMARY}>
              {bulkActing ? 'Verifying…' : `Verify ${sel.count}`}
            </button>
          </>
        )}
      </BulkBar>
    </HubPage>
  );
}

function SubmissionDetail({
  row,
  onVerify,
  onReject,
  onOpenStudent,
  startReturning,
  onReturningShown,
  showLearner,
}: {
  row: InboxRow;
  onVerify: () => Promise<void>;
  onReject: (rationale: string) => Promise<void>;
  onOpenStudent: (() => void) | null;
  startReturning?: boolean;
  onReturningShown?: () => void;
  showLearner?: boolean;
}) {
  const [verdict, setVerdict] = useState<AiVerdict | null>(null);
  const [verdictLoading, setVerdictLoading] = useState(false);
  const [verdictError, setVerdictError] = useState(false);
  const [acting, setActing] = useState<'verify' | 'reject' | null>(null);
  const [rejectingMode, setRejectingMode] = useState(false);
  const [rationale, setRationale] = useState('');

  useEffect(() => {
    if (startReturning) {
      setRejectingMode(true);
      onReturningShown?.();
    }
  }, [startReturning, onReturningShown]);

  useEffect(() => {
    let cancelled = false;
    setVerdictError(false);
    const cached = verdictCache.get(row.id);
    if (cached) {
      setVerdict(cached);
      return;
    }
    setVerdict(null);
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
    if (acting || !rationale.trim()) return;
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
  const facts: Array<[string, string]> = [
    ['Hours', fmtHours(row.duration_minutes)],
    ['Activity', ACTIVITY_LABEL[row.activity_type] ?? row.activity_type],
    ['Done', fmtRel(row.activity_date)],
    ['Cohort', row.cohort_name ?? '—'],
  ];

  return (
    <div className="space-y-4">
      {showLearner && (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
              {row.student_name ?? 'Apprentice'}
            </p>
            <h2 className="mt-1 text-[20px] font-bold leading-snug tracking-tight text-white">{row.title}</h2>
          </div>
          {onOpenStudent && (
            <button type="button" onClick={onOpenStudent} className="h-11 shrink-0 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
              Learner record
            </button>
          )}
        </div>
      )}
      {!showLearner && <p className="text-[15px] font-semibold leading-snug text-white">{row.title}</p>}

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-[12px] text-white">{k}</dt>
            <dd className="mt-0.5 truncate text-[14px] font-semibold text-white">{v}</dd>
          </div>
        ))}
      </dl>

      {(row.in_working_hours !== null || row.outside_hours_compensated !== null) && (
        <p className="text-[12.5px] font-medium text-white">
          {row.in_working_hours
            ? 'Learner says: in normal paid working hours'
            : row.outside_hours_compensated
              ? 'Learner says: outside hours, agreed and paid back'
              : 'Learner says: in their own time'}
        </p>
      )}

      {row.description && (
        <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">{row.description}</p>
      )}

      {row.description && row.description.length >= 30 && (
        <SpagCheckButton
          text={row.description}
          sourceKind="otj"
          sourceId={row.id}
          studentId={row.college_student_row_id ?? undefined}
          studentName={row.student_name ?? undefined}
          variant="compact"
        />
      )}

      {row.unit_codes && row.unit_codes.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {row.unit_codes.map((u) => (
            <span key={u} className="inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[11px] font-medium tabular-nums text-white">
              {u}
            </span>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {photos.map((url, i) => (
            <button
              key={`${url}-${i}`}
              type="button"
              onClick={() => void openEvidence(url)}
              className="block h-20 w-20 overflow-hidden rounded-xl border border-white/[0.12] transition-colors touch-manipulation hover:border-white/[0.3]"
            >
              <EvidenceImage src={url} alt={`Evidence ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] px-4 py-3">
        {verdictLoading ? (
          <p className="text-[12.5px] font-medium text-white">Checking the entry…</p>
        ) : verdictError || !verdict ? (
          <p className="text-[12.5px] font-medium text-white">No suggested check for this one. Read it and decide.</p>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-3">
              <span className={cn('text-[13px] font-semibold', VERDICT_TEXT[verdict.verdict])}>{VERDICT_LABEL[verdict.verdict]}</span>
              <span className="text-[11.5px] tabular-nums text-white">{Math.round(verdict.confidence * 100)}% sure</span>
            </div>
            {verdict.feedback_for_tutor && <p className="mt-1 text-[12.5px] leading-snug text-white">{verdict.feedback_for_tutor}</p>}
            {verdict.suggested_ac_refs.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <span className="text-[11.5px] font-medium text-white">Criteria it may cover:</span>
                {verdict.suggested_ac_refs.map((ref) => (
                  <span key={ref} className="inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[11px] font-medium tabular-nums text-white">
                    {ref}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {!rejectingMode ? (
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setRejectingMode(true)} disabled={acting !== null} className={COLLEGE_BTN}>
            Return
          </button>
          <button type="button" onClick={() => void handleVerify()} disabled={acting !== null} className={COLLEGE_BTN_PRIMARY}>
            {acting === 'verify' ? 'Verifying…' : 'Verify hours'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-[12px] font-medium text-white" htmlFor={`ret-${row.id}`}>
            What does the apprentice need to add or change?
          </label>
          <textarea
            id={`ret-${row.id}`}
            autoFocus
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            rows={3}
            placeholder="e.g. Add the date and how long each task took."
            className={cn(textareaCn, 'w-full resize-none')}
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setRejectingMode(false);
                setRationale('');
              }}
              disabled={acting !== null}
              className={COLLEGE_BTN}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleReject()}
              disabled={acting !== null || rationale.trim().length === 0}
              className={COLLEGE_BTN_PRIMARY}
            >
              {acting === 'reject' ? 'Returning…' : 'Return to apprentice'}
            </button>
          </div>
        </div>
      )}

      {!showLearner && onOpenStudent && (
        <button type="button" onClick={onOpenStudent} className="h-11 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
          Open the learner record
        </button>
      )}
    </div>
  );
}
