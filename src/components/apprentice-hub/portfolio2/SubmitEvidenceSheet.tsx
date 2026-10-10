/**
 * Submit for assessment with the learner's declaration and e-signature
 * (ELE-1893 submit / "Send again", ELE-1875 declaration).
 *
 * The learner sees exactly what is going (each item, its criteria, the
 * fingerprint of its content and files), confirms "this is my own work",
 * types their name and signs. submit_portfolio_evidence() creates the
 * submission and stores the declaration bound to those hashes in one go, so
 * the awarding body can later prove what was signed and that it has not
 * changed. Nothing is sent until every part is done.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { cn } from '@/lib/utils';
import { shortHash } from '@/lib/portfolio/contentHash';
import { notifyPortfolioChanged, type PortfolioItemView } from '@/hooks/portfolio/usePortfolio';
import { P_BTN_PRIMARY, P_INPUT, fmtDateTime } from './ui';
import { AiUseRecord } from '@/components/college/ui/AiUseRecord';
import { AI_DECLARATION_TEXT } from '@/lib/portfolio/aiUseRecord';

export const DECLARATION_TEXT =
  'I confirm that the evidence I am submitting is my own work, that I carried out the activities it describes, ' +
  'and that any help I had is shown in it. I understand that my assessor may question me about it, and that ' +
  'submitting work that is not my own is malpractice.';

/**
 * ELE-2048: the declaration as signed. The AI paragraph is always part of it
 * (JCQ: acknowledge any AI use); when an item sent is AI-assisted the learner's
 * own explanation follows "How I used AI:", which the server requires.
 */
export function declarationFor(aiNote: string | null): string {
  const base = `${DECLARATION_TEXT} ${AI_DECLARATION_TEXT}`;
  return aiNote && aiNote.trim() ? `${base}\n\nHow I used AI: ${aiNote.trim()}` : base;
}

export function SubmitEvidenceSheet({
  items,
  open,
  onOpenChange,
  resend = false,
  selectable = false,
}: {
  items: PortfolioItemView[];
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** "Send again" after the assessor asked for more. */
  resend?: boolean;
  /**
   * ELE-1863: several pieces at once (a unit's "Send these"). Every item
   * starts ticked; the learner can untick any before signing.
   */
  selectable?: boolean;
}) {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('');
  const [signature, setSignature] = useState('');
  const [note, setNote] = useState('');
  const [aiNote, setAiNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ bundle: string; at: string } | null>(null);
  // Fixed when the sheet opens: once sent, the item is no longer "needs more".
  const [wasResend, setWasResend] = useState(resend);
  const [chosenIds, setChosenIds] = useState<Set<string>>(() => new Set(items.map((i) => i.id)));

  useEffect(() => {
    if (open) {
      setAgreed(false);
      setSignature('');
      setNote('');
      setAiNote('');
      setDone(null);
      setWasResend(resend);
      setChosenIds(new Set(items.map((i) => i.id)));
      setName((profile?.full_name as string | undefined) ?? '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Fixed once sent, so the "Sent" screen still lists what went.
  const chosen = useMemo(
    () => (selectable ? items.filter((i) => chosenIds.has(i.id)) : items),
    [items, chosenIds, selectable]
  );
  const unclaimed = chosen.filter((i) => i.claimed.length === 0);
  // ELE-2048: AI-assisted evidence needs the learner's own line on how they used it.
  const aiItems = chosen.filter((i) => i.aiAssisted);
  const aiNoteOk = aiItems.length === 0 || aiNote.trim().length >= 10;
  const ready =
    chosen.length > 0 &&
    agreed &&
    name.trim().length > 1 &&
    signature.length > 0 &&
    unclaimed.length === 0 &&
    aiNoteOk;
  const unitList = useMemo(() => [...new Set(chosen.flatMap((i) => i.units))], [chosen]);
  const toggleItem = (id: string) =>
    setChosenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const submit = async () => {
    if (!ready || busy) return;
    setBusy(true);
    const { data, error } = await supabase.rpc(
      'submit_portfolio_evidence' as never,
      {
        p_item_ids: chosen.map((i) => i.id),
        p_typed_name: name.trim(),
        p_signature_image: signature,
        p_declaration_text: declarationFor(aiItems.length ? aiNote : null),
        p_note: note.trim() || null,
      } as never
    );
    setBusy(false);
    if (error) {
      toast({ title: 'Not sent', description: error.message, variant: 'destructive' });
      return;
    }
    setDone({ bundle: (data as { bundle_hash?: string } | null)?.bundle_hash ?? '', at: new Date().toISOString() });
    notifyPortfolioChanged();
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={wasResend ? 'Send again' : 'Submit for assessment'}
      title={done ? 'Sent to your assessor' : 'Sign and send'}
      description={
        done
          ? 'Your declaration is signed and stored with the fingerprint of what you sent. You will get a notification when your assessor decides.'
          : `${chosen.length === 1 ? 'This evidence' : `${chosen.length} pieces of evidence`} for ${
              unitList.length ? `unit${unitList.length === 1 ? '' : 's'} ${unitList.join(', ')}` : 'your qualification'
            }. Check it, confirm it is your own work and sign.`
      }
      footer={
        done ? (
          <button type="button" className={cn(P_BTN_PRIMARY, 'w-full')} onClick={() => onOpenChange(false)}>
            Done
          </button>
        ) : (
          <button
            type="button"
            className={cn(P_BTN_PRIMARY, 'w-full')}
            disabled={!ready || busy}
            onClick={() => void submit()}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {busy
              ? 'Sending…'
              : wasResend
                ? 'Sign and send again'
                : selectable && chosen.length !== 1
                  ? `Sign and send ${chosen.length}`
                  : 'Sign and send'}
          </button>
        )
      }
    >
      {done ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/[0.1] p-4">
            <Check className="h-5 w-5 shrink-0 text-emerald-300" />
            <p className="text-[14px] text-white">
              Signed by {name.trim()} on {fmtDateTime(done.at)}.
            </p>
          </div>
          {done.bundle && (
            <p className="text-[13px] text-white">
              Fingerprint of what you signed:{' '}
              <span className="font-mono text-elec-yellow">{shortHash(done.bundle)}</span>
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className="space-y-3">
            <h3 className="text-[13px] font-semibold text-white">What you are sending</h3>
            {selectable && items.length > 1 && (
              <p className="text-[12.5px] text-white">
                Untick anything you are not ready to send. {chosen.length} of {items.length} ticked.
              </p>
            )}
            <ul className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.1]">
              {items.map((i) => (
                <li key={i.id} className={cn('space-y-1.5 p-4', selectable && !chosenIds.has(i.id) && 'opacity-60')}>
                  {selectable ? (
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={chosenIds.has(i.id)}
                      onClick={() => toggleItem(i.id)}
                      className="flex min-h-[44px] w-full items-center gap-3 text-left touch-manipulation"
                    >
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
                          chosenIds.has(i.id) ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.4]'
                        )}
                      >
                        {chosenIds.has(i.id) && <Check className="h-4 w-4 text-black" />}
                      </span>
                      <span className="min-w-0 text-[14px] font-semibold text-white">{i.title}</span>
                    </button>
                  ) : (
                    <p className="text-[14px] font-semibold text-white">{i.title}</p>
                  )}
                  {i.claimed.length ? (
                    <p className="text-[12.5px] text-white">
                      {i.claimed.map((c) => `${c.unit_code} AC ${c.ac_code}`).join(' · ')}
                    </p>
                  ) : (
                    <p className="text-[12.5px] text-orange-300">
                      Claim the criteria this covers before you send it.
                    </p>
                  )}
                  <p className="text-[12px] text-white">
                    {i.files.length} file{i.files.length === 1 ? '' : 's'}
                    {i.contentHash && (
                      <>
                        {' '}
                        · fingerprint <span className="font-mono">{shortHash(i.contentHash)}</span>
                      </>
                    )}
                  </p>
                  {(i.aiAssisted || !!i.aiUse) && (
                    <AiUseRecord aiAssisted={i.aiAssisted} aiUse={i.aiUse} audience="learner" className="mt-2" />
                  )}
                </li>
              ))}
            </ul>
            <div>
              <label htmlFor="submit-note" className="mb-1 block text-[12px] font-medium text-white">
                A note for your assessor (optional)
              </label>
              <textarea
                id="submit-note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={wasResend ? 'What you added since last time' : 'Anything they should know'}
                className="w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
            </div>
          </section>

          <section className="space-y-5">
            <h3 className="text-[13px] font-semibold text-white">Your declaration</h3>
            <p className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 text-[14px] leading-relaxed text-white">
              {DECLARATION_TEXT} {AI_DECLARATION_TEXT}
            </p>
            {aiItems.length > 0 && (
              <div>
                <label htmlFor="submit-ai-note" className="mb-1 block text-[12px] font-medium text-white">
                  How you used AI on {aiItems.length === 1 ? 'this evidence' : `these ${aiItems.length} pieces`}
                </label>
                <textarea
                  id="submit-ai-note"
                  rows={3}
                  value={aiNote}
                  onChange={(e) => setAiNote(e.target.value)}
                  placeholder="In your own words, e.g. I spoke my notes, the app drafted my reflective account and I rewrote the parts that were wrong."
                  className="w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                  data-testid="submit-ai-note"
                />
                <p className="mt-1 text-[12px] text-white">
                  Your assessor sees this with the AI record on each piece. It is signed with your declaration.
                </p>
              </div>
            )}
            <button
              type="button"
              role="checkbox"
              aria-checked={agreed}
              onClick={() => setAgreed((a) => !a)}
              className="flex min-h-[44px] w-full items-center gap-3 text-left touch-manipulation"
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
                  agreed ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.4]'
                )}
              >
                {agreed && <Check className="h-4 w-4 text-black" />}
              </span>
              <span className="text-[14px] font-medium text-white">I confirm this is my own work</span>
            </button>
            <div>
              <label htmlFor="submit-name" className="mb-1 block text-[12px] font-medium text-white">
                Type your full name
              </label>
              <input
                id="submit-name"
                className={P_INPUT}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <p className="mb-2 text-[12px] font-medium text-white">Sign here</p>
              {open && (
                <SignatureCapture variant="dark" showActions={false} onCapture={setSignature} height={150} />
              )}
            </div>
          </section>
        </div>
      )}
    </FormSheet>
  );
}
