/**
 * AcDecisionSheet — the ONE way to pass a criterion (ELE-1867).
 *
 * Passed / Needs more / Not yet on one or more criteria, with the evidence
 * itself on the page (description, files, signed witness statements) so a
 * decision is never made on a title alone. Writes through record_ac_decisions
 * (append-only; the learner is told at once).
 *
 * Opened from:
 *   • Assess criteria (LearnerAssessmentView): tick criteria, Record decision
 *   • the submission drawer: the criteria claimed on what was sent
 *   • the evidence locker (one criterion) and the AC matrix (several)
 *
 * AI (ELE-1926): a held draft (portfolio_ai_feedback_drafts, written by the
 * drawer's "Draft an assessment") or an on-demand draft from the caller is
 * offered, never applied silently. Using it needs a tick to say it was read
 * and checked; the decision then carries feedback_source 'ai_draft_confirmed'
 * and the learner sees "Drafted with AI, confirmed by <name> on <date>".
 *
 * Desktop keys (outside the text box): P passed, M needs more, N not yet,
 * D use the AI draft, F feedback; Ctrl or Cmd + Enter records.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { textareaCn } from '@/components/forms/fieldStyles';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { UsesAi } from '@/components/college/ui/UsesAi';
import { openEvidence } from '@/lib/evidenceUrl';
import type { AcStateRow } from '@/hooks/portfolio/usePortfolioAcState';

export type DecisionKey = 'passed' | 'referred' | 'not_yet';

export interface RecordDecisionArgs {
  criteria: { unit_code: string; ac_code: string }[];
  decision: DecisionKey;
  feedback?: string;
  evidenceItemIds?: string[];
  submissionId?: string | null;
  method?: string;
  feedbackSource?: 'assessor' | 'ai_draft_confirmed';
}

interface EvidenceFile {
  name?: string;
  type?: string;
  url?: string;
}
interface EvidenceItem {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  file_url: string | null;
  storage_urls: EvidenceFile[] | null;
  metadata?: { source?: string; observation?: { kind?: string } } | null;
}
interface WitnessRow {
  id: string;
  portfolio_item_id: string | null;
  witness_name: string | null;
  witness_role: string | null;
  witness_company: string | null;
  statement: string | null;
  signed_at: string | null;
}
interface HeldDraft {
  id: string;
  submission_id: string | null;
  created_at: string;
  verdict: string | null;
  assessor_feedback: string | null;
  strengths_noted: string | null;
  areas_for_improvement: string | null;
  action_required: string | null;
  ac_analysis: { ac_code?: string; unit_code?: string; status?: string; comment?: string }[] | null;
}

export const DECISIONS: { key: DecisionKey; label: string; hotkey: string }[] = [
  { key: 'passed', label: 'Passed', hotkey: 'P' },
  { key: 'referred', label: 'Needs more', hotkey: 'M' },
  { key: 'not_yet', label: 'Not yet', hotkey: 'N' },
];

const METHODS: { key: string; label: string }[] = [
  { key: 'evidence_review', label: 'Evidence' },
  { key: 'observation', label: 'Observed' },
  { key: 'professional_discussion', label: 'Discussion' },
  { key: 'questioning', label: 'Questions' },
  { key: 'witness', label: 'Witness' },
];
/** A pass on these methods can stand without a portfolio item ticked. */
const NO_ITEM_NEEDED = new Set(['observation', 'professional_discussion', 'questioning', 'witness']);

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

const VERDICT_TO_DECISION: Record<string, DecisionKey> = {
  pass: 'passed',
  partial: 'referred',
  refer: 'referred',
  not_yet: 'not_yet',
  passed: 'passed',
  referred: 'referred',
};

function when(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
function filesOf(e: EvidenceItem): EvidenceFile[] {
  const list = Array.isArray(e.storage_urls) ? e.storage_urls.filter((f) => f?.url) : [];
  if (list.length === 0 && e.file_url) list.push({ name: 'Attachment', url: e.file_url });
  return list;
}
const isImage = (f: EvidenceFile) =>
  f.type ? f.type.startsWith('image') : /\.(jpe?g|png|webp|heic|gif)(\?|$)/i.test(f.url ?? '');

const isTyping = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT' || el.isContentEditable;
};

/** The held draft's words for these criteria: overall feedback, then per-criterion notes. */
function composeDraft(d: HeldDraft, rows: AcStateRow[], decision: DecisionKey): string {
  const parts: string[] = [];
  if (d.assessor_feedback?.trim()) parts.push(d.assessor_feedback.trim());
  const notes = (d.ac_analysis ?? [])
    .filter((a) =>
      rows.some((r) => r.ac_code === a.ac_code && (!a.unit_code || a.unit_code === r.unit_code))
    )
    .filter((a) => a.comment?.trim())
    .map((a) => `${a.unit_code ? `${a.unit_code} ` : ''}AC ${a.ac_code}: ${a.comment!.trim()}`);
  if (notes.length) parts.push(notes.join('\n'));
  if (decision !== 'passed' && d.action_required?.trim()) parts.push(`To do: ${d.action_required.trim()}`);
  return parts.join('\n\n');
}

export function AcDecisionSheet({
  open,
  onOpenChange,
  learnerId,
  learnerName,
  rows,
  submissionId = null,
  initialEvidenceIds,
  record,
  draftWithAi,
  onRecorded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  learnerId: string;
  learnerName?: string;
  /** The criteria being decided (from get_portfolio_ac_state). */
  rows: AcStateRow[];
  /** Set when deciding from a submission: the decision is filed against it. */
  submissionId?: string | null;
  /** Evidence to tick at the start; defaults to the items cited on the criteria. */
  initialEvidenceIds?: string[];
  /** usePortfolioAcState().recordDecisions: the record_ac_decisions RPC. */
  record: (args: RecordDecisionArgs) => Promise<void>;
  /** Optional on-demand AI draft for these criteria (e.g. the evidence locker's judgement draft). */
  draftWithAi?: (rows: AcStateRow[]) => Promise<{ text: string; verdict?: string | null } | null>;
  onRecorded?: () => void;
}) {
  const { toast } = useToast();
  const first = learnerName?.split(' ')[0] || 'the learner';
  const First = first.charAt(0).toUpperCase() + first.slice(1);
  const [decision, setDecision] = useState<DecisionKey>('passed');
  const [method, setMethod] = useState('evidence_review');
  const [feedback, setFeedback] = useState('');
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [witnesses, setWitnesses] = useState<WitnessRow[]>([]);
  const [evidenceError, setEvidenceError] = useState<string | null>(null);
  const [chosen, setChosen] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [held, setHeld] = useState<HeldDraft | null>(null);
  const [aiUsed, setAiUsed] = useState(false);
  const [aiChecked, setAiChecked] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);

  const citedIds = useMemo(() => {
    const ids = new Set<string>();
    rows.forEach((r) => (r.evidence_item_ids ?? []).forEach((i) => ids.add(i)));
    return ids;
  }, [rows]);
  const startIds = useMemo(
    () => new Set(initialEvidenceIds && initialEvidenceIds.length ? initialEvidenceIds : [...citedIds]),
    [initialEvidenceIds, citedIds]
  );

  const load = useCallback(async () => {
    const [items, wit, drafts] = await Promise.all([
      supabase
        .from('portfolio_items')
        .select('id, title, description, created_at, file_url, storage_urls, metadata')
        .eq('user_id', learnerId)
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('portfolio_witness_statements' as never)
        .select('id, portfolio_item_id, witness_name, witness_role, witness_company, statement, signed_at')
        .eq('learner_id', learnerId)
        .eq('status', 'signed'),
      supabase
        .from('portfolio_ai_feedback_drafts' as never)
        .select(
          'id, submission_id, created_at, verdict, assessor_feedback, strengths_noted, areas_for_improvement, action_required, ac_analysis'
        )
        .eq('learner_id', learnerId)
        .is('confirmed_at', null)
        .is('discarded_at', null)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);
    if (items.error) setEvidenceError(items.error.message);
    else {
      setEvidenceError(null);
      setEvidence((items.data ?? []) as unknown as EvidenceItem[]);
    }
    setWitnesses((wit.data ?? []) as unknown as WitnessRow[]);
    const list = (drafts.data ?? []) as unknown as HeldDraft[];
    // The draft for this submission first; otherwise one that speaks to these criteria.
    const pick =
      (submissionId && list.find((d) => d.submission_id === submissionId)) ||
      list.find((d) =>
        (d.ac_analysis ?? []).some((a) =>
          rows.some((r) => r.ac_code === a.ac_code && (!a.unit_code || a.unit_code === r.unit_code))
        )
      ) ||
      null;
    setHeld(pick);
  }, [learnerId, submissionId, rows]);

  // Reset each time the sheet opens.
  const rowsKey = rows.map((r) => `${r.unit_code}:${r.ac_code}`).join(',');
  useEffect(() => {
    if (!open) return;
    setChosen(new Set(startIds));
    setFeedback('');
    setDecision('passed');
    setAiUsed(false);
    setAiChecked(false);
    setExpanded(null);
    setMethod('evidence_review');
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, rowsKey, submissionId]);

  // ELE-1873: deciding from an observation or professional discussion records that method.
  useEffect(() => {
    if (!open) return;
    const observed = evidence.find((e) => startIds.has(e.id) && e.metadata?.source === 'college_observation');
    if (observed) {
      setMethod(
        observed.metadata?.observation?.kind === 'professional_discussion' ? 'professional_discussion' : 'observation'
      );
    }
  }, [open, evidence, startIds]);

  const sheetEvidence = useMemo(
    () => [...evidence.filter((e) => startIds.has(e.id) || citedIds.has(e.id)), ...evidence.filter((e) => !startIds.has(e.id) && !citedIds.has(e.id))],
    [evidence, startIds, citedIds]
  );
  const witnessByItem = useMemo(() => {
    const m = new Map<string, WitnessRow[]>();
    witnesses.forEach((w) => {
      if (!w.portfolio_item_id) return;
      m.set(w.portfolio_item_id, [...(m.get(w.portfolio_item_id) ?? []), w]);
    });
    return m;
  }, [witnesses]);

  const heldText = held ? composeDraft(held, rows, decision) : '';
  const useHeld = useCallback(() => {
    if (!held) return;
    const verdict = held.verdict ? VERDICT_TO_DECISION[held.verdict] : undefined;
    const d = verdict ?? decision;
    setDecision(d);
    setFeedback(composeDraft(held, rows, d));
    setAiUsed(true);
    setAiChecked(false);
    window.setTimeout(() => feedbackRef.current?.focus(), 50);
  }, [held, rows, decision]);

  const runOnDemand = useCallback(async () => {
    if (!draftWithAi) return;
    setAiBusy(true);
    try {
      const out = await draftWithAi(rows);
      if (out?.text) {
        const verdict = out.verdict ? VERDICT_TO_DECISION[out.verdict] : undefined;
        if (verdict) setDecision(verdict);
        setFeedback(out.text);
        setAiUsed(true);
        setAiChecked(false);
      }
    } catch (e) {
      toast({ title: 'Could not draft', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setAiBusy(false);
    }
  }, [draftWithAi, rows, toast]);

  const passNeedsItem = decision === 'passed' && !NO_ITEM_NEEDED.has(method) && chosen.size === 0;
  const aiBlocks = aiUsed && feedback.trim().length > 0 && !aiChecked;

  const save = useCallback(async () => {
    if (saving || rows.length === 0) return;
    if (decision !== 'passed' && !feedback.trim()) {
      toast({ title: 'Say what is needed', description: 'Feedback is required when it is not a pass.' });
      return;
    }
    if (passNeedsItem) {
      toast({
        title: 'Tick the evidence',
        description: 'A pass on evidence needs at least one item. If you saw it done, choose Observed.',
      });
      return;
    }
    if (aiBlocks) {
      toast({
        title: 'Check the draft first',
        description: 'Tick that you have read and checked the AI draft, or rewrite it in your own words.',
      });
      return;
    }
    setSaving(true);
    try {
      await record({
        criteria: rows.map((r) => ({ unit_code: r.unit_code, ac_code: r.ac_code })),
        decision,
        feedback,
        evidenceItemIds: [...chosen],
        submissionId,
        method,
        feedbackSource: aiUsed && feedback.trim() ? 'ai_draft_confirmed' : 'assessor',
      });
      toast({
        title: `${rows.length} decision${rows.length === 1 ? '' : 's'} recorded`,
        description: `${First} has been told.`,
      });
      onOpenChange(false);
      onRecorded?.();
    } catch (e) {
      toast({ title: 'Could not record', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }, [saving, rows, decision, feedback, passNeedsItem, aiBlocks, record, chosen, submissionId, method, aiUsed, First, toast, onOpenChange, onRecorded]);

  // Desktop keyboard.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        void save();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const k = e.key.toLowerCase();
      const d = DECISIONS.find((x) => x.hotkey.toLowerCase() === k);
      if (d) {
        e.preventDefault();
        setDecision(d.key);
      } else if (k === 'd' && (held || draftWithAi)) {
        e.preventDefault();
        if (held) useHeld();
        else void runOnDemand();
      } else if (k === 'f') {
        e.preventDefault();
        feedbackRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, save, held, draftWithAi, useHeld, runOnDemand]);

  const label = DECISIONS.find((d) => d.key === decision)?.label.toLowerCase();

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`Record a decision · ${learnerName ?? 'Learner'}`}
      title={`${rows.length} criteri${rows.length === 1 ? 'on' : 'a'}`}
      description={
        rows
          .slice(0, 6)
          .map((r) => `${r.unit_code} AC ${r.ac_code}`)
          .join(', ') + (rows.length > 6 ? ` and ${rows.length - 6} more` : '')
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      footer={
        <div className="w-full">
          {(passNeedsItem || aiBlocks) && (
            <p className="mb-2 text-center text-[12.5px] text-white">
              {aiBlocks
                ? 'Tick that you have checked the AI draft before you record.'
                : 'Tick at least one piece of evidence, or choose how you saw it done.'}
            </p>
          )}
          <button
            type="button"
            disabled={saving || rows.length === 0}
            onClick={() => void save()}
            className="h-11 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black disabled:bg-white/[0.08] disabled:text-white touch-manipulation"
          >
            {saving ? 'Recording…' : `Record ${label}`}
          </button>
          <p className="mt-2 hidden text-center text-[11.5px] text-white lg:block">
            Keys: P passed, M needs more, N not yet{held || draftWithAi ? ', D use the AI draft' : ''}, F feedback,
            Ctrl or Cmd + Enter records
          </p>
        </div>
      }
    >
      {/* ── Left: the decision ── */}
      <div className="min-w-0 space-y-5">
        {rows.length <= 4 && (
          <ul className="space-y-1.5">
            {rows.map((r) => (
              <li key={`${r.unit_code}:${r.ac_code}`} className="text-[13px] leading-snug text-white">
                <span className="font-mono font-semibold">
                  {r.unit_code} AC {r.ac_code}
                </span>{' '}
                {r.ac_text}
              </li>
            ))}
          </ul>
        )}
        <fieldset>
          <legend className="mb-2 text-[12px] font-medium text-white">Decision</legend>
          <div className="grid grid-cols-3 gap-2">
            {DECISIONS.map((d) => (
              <button
                key={d.key}
                type="button"
                aria-pressed={decision === d.key}
                aria-keyshortcuts={d.hotkey}
                onClick={() => setDecision(d.key)}
                className={cn('h-11 rounded-xl border text-[14px] touch-manipulation', decision === d.key ? chipOn : chipOff)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-[12px] font-medium text-white">How you assessed it</legend>
          <div className="flex flex-wrap gap-2">
            {METHODS.map((m) => (
              <button
                key={m.key}
                type="button"
                aria-pressed={method === m.key}
                onClick={() => setMethod(m.key)}
                className={cn('h-11 rounded-full border px-4 text-[13px] touch-manipulation', method === m.key ? chipOn : chipOff)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* AI draft: offered, never applied silently (ELE-1926) */}
        {(held || draftWithAi) && (
          <div className="space-y-3 rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
                {held ? 'There is a draft for this' : 'Draft the feedback'} <UsesAi />
              </p>
              {held ? (
                <button
                  type="button"
                  onClick={useHeld}
                  aria-keyshortcuts="D"
                  className="inline-flex h-11 items-center rounded-xl border border-white/[0.2] px-3.5 text-[13px] font-semibold text-white touch-manipulation"
                >
                  Use the draft
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void runOnDemand()}
                  disabled={aiBusy}
                  aria-keyshortcuts="D"
                  className="inline-flex h-11 items-center rounded-xl border border-white/[0.2] px-3.5 text-[13px] font-semibold text-white disabled:opacity-50 touch-manipulation"
                >
                  {aiBusy ? 'Drafting…' : 'Draft from the evidence'}
                </button>
              )}
            </div>
            {held && !aiUsed && heldText && (
              <p className="line-clamp-4 whitespace-pre-line text-[12.5px] leading-relaxed text-white">{heldText}</p>
            )}
            {held && (
              <p className="text-[12px] text-white">
                Drafted {when(held.created_at)}
                {held.verdict ? `, suggests ${held.verdict.replace('_', ' ')}` : ''}. {First} cannot see
                it until you record a decision with it.
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="ac-decision-feedback" className="mb-1 block text-[12px] font-medium text-white">
            Feedback for {first}
            {decision !== 'passed' ? ' (required)' : ''}
          </label>
          <textarea
            id="ac-decision-feedback"
            ref={feedbackRef}
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (!e.target.value.trim()) setAiUsed(false);
            }}
            placeholder={
              decision === 'passed' ? 'What was good about this evidence?' : 'Exactly what is missing and how to get it.'
            }
            className={cn(textareaCn, 'min-h-[140px]')}
          />
          {aiUsed && feedback.trim() && (
            <label className="mt-2 flex min-h-11 cursor-pointer items-center gap-3 text-[13px] text-white touch-manipulation">
              <input
                type="checkbox"
                checked={aiChecked}
                onChange={(e) => setAiChecked(e.target.checked)}
                className="h-5 w-5 shrink-0 accent-yellow-400"
              />
              I have read and checked this AI draft. {First} will see it marked
              as drafted with AI and confirmed by me.
            </label>
          )}
        </div>
      </div>

      {/* ── Right: the evidence ── */}
      <div className="min-w-0 space-y-2 border-t border-white/[0.1] pt-5 lg:border-t-0 lg:pt-0">
        <p className="text-[12px] font-medium text-white">
          Evidence this decision is based on
          {decision === 'passed' && !NO_ITEM_NEEDED.has(method) ? ' (at least one)' : ''}
        </p>
        {evidenceError ? (
          <p className="text-[13px] text-white">Couldn't load {first}'s evidence. Close and try again.</p>
        ) : sheetEvidence.length === 0 ? (
          <p className="text-[13px] text-white">
            {First} has no evidence yet. Choose Observed, Discussion or
            Questions if you assessed it directly.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.08] rounded-xl border border-white/[0.12]">
            {sheetEvidence.map((e) => {
              const on = chosen.has(e.id);
              const isOpen = expanded === e.id;
              const files = filesOf(e);
              const wits = witnessByItem.get(e.id) ?? [];
              return (
                <li key={e.id}>
                  <div className="flex items-center gap-1 pr-1">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setChosen((p) => {
                          const n = new Set(p);
                          if (n.has(e.id)) n.delete(e.id);
                          else n.add(e.id);
                          return n;
                        })
                      }
                      className="flex min-h-11 min-w-0 flex-1 items-center gap-3 px-3 py-2 text-left touch-manipulation"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
                          on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.3] text-transparent'
                        )}
                      >
                        ✓
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] text-white">{e.title}</span>
                        <span className="block text-[11.5px] text-white">
                          {when(e.created_at)}
                          {citedIds.has(e.id) ? ' · cited on these criteria' : ''}
                          {files.length ? ` · ${files.length} file${files.length === 1 ? '' : 's'}` : ''}
                          {wits.length ? ' · witnessed' : ''}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={isOpen ? 'Hide evidence' : 'View evidence'}
                      onClick={() => setExpanded(isOpen ? null : e.id)}
                      className="h-11 shrink-0 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                    >
                      {isOpen ? 'Hide' : 'View'}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="space-y-3 border-t border-white/[0.08] px-3 py-3">
                      {e.description && <p className="whitespace-pre-line text-[13px] text-white">{e.description}</p>}
                      {files.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {files.map((f, i) =>
                            isImage(f) ? (
                              <button
                                key={i}
                                type="button"
                                onClick={() => void openEvidence(f.url)}
                                aria-label={`Open ${f.name ?? 'photo'}`}
                                className="block aspect-square overflow-hidden rounded-lg border border-white/[0.12] touch-manipulation"
                              >
                                <EvidenceImage src={f.url} alt={f.name ?? 'Evidence photo'} loading="lazy" className="h-full w-full object-cover" />
                              </button>
                            ) : (
                              <button
                                key={i}
                                type="button"
                                onClick={() => void openEvidence(f.url)}
                                className="col-span-3 flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.12] px-3 text-left text-[13px] text-white touch-manipulation sm:col-span-4"
                              >
                                <ExternalLink className="h-4 w-4 shrink-0" />
                                <span className="truncate">{f.name ?? 'Open file'}</span>
                              </button>
                            )
                          )}
                        </div>
                      )}
                      {wits.map((w) => (
                        <div key={w.id} className="rounded-lg border border-emerald-400/30 bg-emerald-500/[0.08] p-3">
                          <p className="text-[12.5px] font-semibold text-emerald-300">
                            Witness statement, signed {when(w.signed_at)}
                          </p>
                          <p className="mt-1 whitespace-pre-line text-[13px] text-white">“{w.statement}”</p>
                          <p className="mt-1 text-[12px] text-white">
                            {w.witness_name}
                            {w.witness_role ? `, ${w.witness_role}` : ''}
                            {w.witness_company ? `, ${w.witness_company}` : ''}
                          </p>
                        </div>
                      ))}
                      {!e.description && files.length === 0 && wits.length === 0 && (
                        <p className="text-[13px] text-white">No description or files on this item.</p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </FormSheet>
  );
}

export default AcDecisionSheet;
