/**
 * ReviewAiDraftPanel — "Draft the summary and targets" in a progress review (ELE-2051).
 *
 * The tutor types or dictates their notes from the conversation; the
 * review-ai-draft edge function (gpt-5.4-mini) turns them, with what the review
 * record already holds, into a draft summary and 3 to 5 SMART targets for the
 * next 3 months. The draft is held (college_review_ai_drafts) and shown marked
 * as AI. Nothing reaches the review until the tutor ticks that they checked it
 * and taps "Use this draft": then the summary goes into the review with
 * summary_source 'ai_draft_confirmed' and who confirmed it, and the targets they
 * kept become actions with source 'ai_draft_confirmed'. Same rule as ELE-1926.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Loader2, Mic, Square } from 'lucide-react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { cn } from '@/lib/utils';
import { UsesAi } from '@/components/college/ui/UsesAi';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  cardCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import {
  OWNER_LABEL,
  fmtReviewDate,
  type ActionOwner,
  type ReviewAction,
  type ReviewOutcomes,
  type TripartiteReview,
} from '@/hooks/useTripartiteReviews';
import { SectionTitle } from './reviewUi';

const db = supabase as unknown as SupabaseClient;

export interface AiTarget {
  action: string;
  owner: ActionOwner;
  due_date: string;
  measure: string;
  unit_code: string | null;
}
interface HeldDraft {
  id: string;
  created_at: string;
  model: string;
  summary: string;
  targets: AiTarget[];
  input_source: string;
}

/** The action text saved for a kept target: what, and how everyone will know it is done. */
export const targetText = (t: AiTarget) =>
  `${t.action.replace(/\.$/, '')}${t.unit_code ? ` (unit ${t.unit_code})` : ''}. Done when: ${t.measure.replace(/\.$/, '')}.`;

export function ReviewAiDraftPanel({
  review,
  actions,
  outcomes,
  patch,
  flush,
  onChanged,
}: {
  review: TripartiteReview;
  actions: ReviewAction[];
  outcomes: ReviewOutcomes;
  patch: (p: Partial<ReviewOutcomes>) => void;
  flush: () => Promise<void>;
  onChanged: () => void;
}) {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [usedVoice, setUsedVoice] = useState(false);
  const [typed, setTyped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<HeldDraft | null>(null);
  const [keep, setKeep] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const [applying, setApplying] = useState(false);
  const speech = useSpeechToText({ continuous: true });
  const baseRef = useRef('');

  // A draft held from earlier (the sheet was closed before it was used).
  useEffect(() => {
    let cancelled = false;
    void db
      .from('college_review_ai_drafts')
      .select('id, created_at, model, summary, targets, input_source')
      .eq('review_id', review.id)
      .is('confirmed_at', null)
      .is('discarded_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        const d = (data?.[0] as HeldDraft | undefined) ?? null;
        if (!cancelled && d) {
          setDraft(d);
          setKeep(new Set(d.targets.map((_, i) => i)));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [review.id]);

  // Dictation appends to whatever was typed when it started.
  useEffect(() => {
    if (!speech.isListening) return;
    const said = `${speech.transcript} ${speech.interimTranscript}`.trim();
    if (said) setNotes(baseRef.current ? `${baseRef.current} ${said}` : said);
  }, [speech.transcript, speech.interimTranscript, speech.isListening]);

  const startDictation = () => {
    baseRef.current = notes.trim();
    speech.resetTranscript();
    speech.startListening();
    setUsedVoice(true);
  };

  const run = useCallback(async () => {
    if (busy) return;
    if (speech.isListening) speech.stopListening();
    setBusy(true);
    try {
      await flush().catch(() => undefined);
      const { data, error } = await supabase.functions.invoke('review-ai-draft', {
        body: {
          review_id: review.id,
          notes: notes.trim(),
          input_source: usedVoice && typed ? 'notes_and_voice' : usedVoice ? 'voice' : 'notes',
        },
      });
      const res = data as { draft?: HeldDraft; error?: string } | null;
      if (error || !res?.draft) {
        let msg = res?.error ?? error?.message ?? 'Try again.';
        const ctx = (error as { context?: Response } | null)?.context;
        if (ctx && typeof ctx.json === 'function') {
          msg = ((await ctx.json().catch(() => null)) as { error?: string } | null)?.error ?? msg;
        }
        throw new Error(msg);
      }
      setDraft(res.draft);
      setKeep(new Set(res.draft.targets.map((_, i) => i)));
      setChecked(false);
    } catch (e) {
      toast({
        title: 'Could not draft',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  }, [busy, flush, notes, review.id, speech, toast, typed, usedVoice]);

  const discard = async () => {
    if (!draft) return;
    const { error } = await db
      .from('college_review_ai_drafts')
      .update({ discarded_at: new Date().toISOString() })
      .eq('id', draft.id);
    if (error) {
      toast({ title: 'Not discarded', description: error.message, variant: 'destructive' });
      return;
    }
    setDraft(null);
    setChecked(false);
  };

  const use = async () => {
    if (!draft || !checked || applying) return;
    setApplying(true);
    try {
      const name = (profile?.full_name as string | undefined) ?? 'the tutor';
      const kept = draft.targets.filter((_, i) => keep.has(i));
      // 1. The draft is confirmed first: if anything after fails, the record still shows who checked it.
      const { error: cErr } = await db
        .from('college_review_ai_drafts')
        .update({
          confirmed_at: new Date().toISOString(),
          confirmed_by_name: name,
          targets_used: kept.length,
        })
        .eq('id', draft.id);
      if (cErr) throw new Error(cErr.message);
      // 2. Targets kept become actions, marked as from a confirmed AI draft.
      if (kept.length) {
        const { error: aErr } = await db.from('college_review_actions').insert(
          kept.map((t, i) => ({
            review_id: review.id,
            college_id: review.college_id,
            student_id: review.student_id,
            action: targetText(t).slice(0, 500),
            owner_party: t.owner,
            due_date: t.due_date,
            position: actions.length + i,
            source: 'ai_draft_confirmed',
            ai_draft_id: draft.id,
          }))
        );
        if (aErr) throw new Error(aErr.message);
      }
      // 3. The summary, with where it came from (frozen with the review at sign-off).
      const current = (outcomes.summary ?? '').trim();
      patch({
        summary: current ? `${current}\n\n${draft.summary}` : draft.summary,
        summary_source: 'ai_draft_confirmed',
        summary_ai_draft_id: draft.id,
        summary_confirmed_by_name: name,
        summary_confirmed_at: new Date().toISOString(),
      });
      await flush().catch(() => undefined);
      toast({
        title: 'Draft used',
        description: `${kept.length} target${kept.length === 1 ? '' : 's'} added as actions. The summary is on the Sign off step for you to edit.`,
      });
      setDraft(null);
      setNotes('');
      setChecked(false);
      onChanged();
    } catch (e) {
      toast({ title: 'Not used', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setApplying(false);
    }
  };

  return (
    <section className={cardCn} data-testid="review-ai-draft">
      <div className="flex flex-wrap items-center gap-2">
        <SectionTitle>Draft the summary and targets</SectionTitle>
        <UsesAi />
      </div>
      {!draft ? (
        <>
          <p className="text-[13px] leading-relaxed text-white">
            From your notes and what this review already holds. You get a summary and SMART targets
            for the next 3 months to check. Nothing is added until you choose to use it.
          </p>
          <div>
            <label className={labelCn} htmlFor="rv-ai-notes">
              Your notes from the conversation
            </label>
            <textarea
              id="rv-ai-notes"
              rows={5}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setTyped(true);
              }}
              placeholder="e.g. Doing well on containment, nervous about testing. Employer happy, wants him on more first fixes. Behind on hours since the summer."
              className={textareaCn}
              data-testid="rv-ai-notes"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {speech.isSupported ? (
              <button
                type="button"
                onClick={speech.isListening ? speech.stopListening : startDictation}
                className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center gap-2')}
                aria-pressed={speech.isListening}
              >
                {speech.isListening ? (
                  <>
                    <Square className="h-4 w-4" /> Stop
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" /> Dictate
                  </>
                )}
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => void run()}
              disabled={busy}
              className={cn(
                buttonSecondaryCn,
                'inline-flex items-center justify-center gap-2 font-semibold'
              )}
              data-testid="rv-ai-run"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {busy ? 'Drafting…' : 'Draft it'}
            </button>
          </div>
          {speech.isListening && (
            <p className="text-[12px] text-white">Listening. Speak your notes, then tap Stop.</p>
          )}
        </>
      ) : (
        <div className="space-y-4" data-testid="rv-ai-draft-result">
          <UsesAi variant="note" />
          <div>
            <p className={labelCn}>Summary (draft)</p>
            <p className="whitespace-pre-line rounded-xl border border-white/[0.12] p-3 text-[14px] leading-relaxed text-white">
              {draft.summary}
            </p>
          </div>
          <div>
            <p className={labelCn}>
              SMART targets for the next 3 months. Untick any you do not want.
            </p>
            <ul className="divide-y divide-white/[0.1] rounded-xl border border-white/[0.12]">
              {draft.targets.map((t, i) => {
                const on = keep.has(i);
                return (
                  <li key={i}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() =>
                        setKeep((prev) => {
                          const n = new Set(prev);
                          if (n.has(i)) n.delete(i);
                          else n.add(i);
                          return n;
                        })
                      }
                      className="flex min-h-11 w-full items-start gap-3 p-3 text-left touch-manipulation"
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                          on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.4]'
                        )}
                      >
                        {on && <Check className="h-3.5 w-3.5 text-black" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-semibold leading-snug text-white">
                          {t.action}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                          Done when: {t.measure}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-white">
                          {OWNER_LABEL[t.owner]} · by {fmtReviewDate(t.due_date)}
                          {t.unit_code ? ` · unit ${t.unit_code}` : ''}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => setChecked((c) => !c)}
            className="flex min-h-11 w-full items-center gap-3 text-left touch-manipulation"
            data-testid="rv-ai-checked"
          >
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
                checked ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.4]'
              )}
            >
              {checked && <Check className="h-4 w-4 text-black" />}
            </span>
            <span className="text-[14px] font-medium text-white">
              I have read this draft and checked it against what was said
            </span>
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => void discard()} className={buttonSecondaryCn}>
              Discard
            </button>
            <button
              type="button"
              onClick={() => void use()}
              disabled={!checked || applying}
              className={buttonPrimaryCn}
              data-testid="rv-ai-use"
            >
              {applying ? 'Adding…' : 'Use this draft'}
            </button>
          </div>
          <p className="text-[12px] leading-relaxed text-white">
            Using it adds the targets you kept as actions and puts the summary on the Sign off step,
            marked "Drafted with AI, confirmed by you". You can still edit both.
          </p>
        </div>
      )}
    </section>
  );
}

/** "Drafted with AI from the tutor's notes, confirmed by X on date." */
export function SummaryProvenance({ outcomes }: { outcomes: ReviewOutcomes }) {
  if (outcomes.summary_source !== 'ai_draft_confirmed') return null;
  return (
    <p
      className="flex flex-wrap items-center gap-2 text-[12px] text-white"
      data-testid="rv-summary-provenance"
    >
      <UsesAi />
      Drafted with AI from the tutor's notes, confirmed by{' '}
      {outcomes.summary_confirmed_by_name ?? 'the tutor'}
      {outcomes.summary_confirmed_at
        ? ` on ${fmtReviewDate(outcomes.summary_confirmed_at.slice(0, 10))}`
        : ''}
      .
    </p>
  );
}

export default ReviewAiDraftPanel;
