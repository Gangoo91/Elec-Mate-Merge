import { useState } from 'react';
import { Check, Download, Loader2, Mail, ReceiptText } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import {
  SEVERITY_SHORT,
  SEVERITY_ORDER,
  type SurveyFinding,
  type SurveySeverity,
} from '@/types/pre-purchase-survey';

/**
 * What happens AFTER the survey is generated (ELE-1634).
 *
 * ── WHY THIS EXISTS ───────────────────────────────────────────────────────
 * Andrew, on running it: *"it come to the end download the pdf, but that was
 * it, nothing else."* The shared generation dialog offers a tick and a Download
 * button, so the most valuable moment in the whole flow — the point where the
 * electrician knows exactly what the property needs and is still in front of
 * the client — went nowhere.
 *
 * The ticket asks for a flow you can "come in at any of the stages" of. A dead
 * end at the last stage is the sharpest version of that problem.
 *
 * ── THE WORK ARISING IS THE POINT ─────────────────────────────────────────
 * A pre-purchase survey is unusual: it is a document AND a sales conversation.
 * The buyer has just been told what is wrong; the obvious question is "what
 * would it cost to put right". So this panel puts the work in front of the
 * electrician grouped by urgency BEFORE offering to quote it — you think about
 * the job, then you price it.
 *
 * 🔴 Only CONFIRMED findings appear here, for the same reason they are the only
 * ones on the PDF. Quoting off an AI draft nobody read would be worse than not
 * quoting at all.
 */

/* Nothing that is not work. "Ageing" is advice about the future, not a job. */
const QUOTABLE: SurveySeverity[] = ['urgent', 'attention'];

const SEVERITY_TINT: Record<SurveySeverity, string> = {
  urgent: 'bg-red-500/15 text-red-300',
  attention: 'bg-orange-500/15 text-orange-300',
  ageing: 'bg-elec-yellow/15 text-elec-yellow',
  acceptable: 'bg-emerald-500/15 text-emerald-300',
  unclear: 'bg-white/[0.12] text-white',
};

interface Props {
  findings: SurveyFinding[];
  reportId: string | null;
  clientEmail: string;
  clientName: string;
  onDownload: () => void;
  onQuote: () => void;
  /**
   * 🔴 Builds the PDFMonkey payload for the email.
   *
   * `send-certificate-resend` renders the attachment from `formattedData`,
   * falling back to the row's `pdf_payload` — and every autosave on this report
   * NULLs `pdf_payload`, repopulating it only at generate. So a survey emailed
   * after any subsequent edit would attach nothing. Passing the payload is what
   * every other certificate in the app does, for the same reason.
   */
  buildPayload: () => unknown;
  /** Compact inside the generation dialog, roomier on the page. */
  variant?: 'dialog' | 'panel';
}

export default function SurveyNextSteps({
  findings,
  reportId,
  clientEmail,
  clientName,
  onDownload,
  onQuote,
  buildPayload,
  variant = 'panel',
}: Props) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* Worst first — the same order the report itself uses. */
  const work = SEVERITY_ORDER.filter((s) => QUOTABLE.includes(s)).flatMap((s) =>
    findings.filter((f) => f.severity === s)
  );
  const later = findings.filter((f) => f.severity === 'ageing');

  /*
   * 🔴 An explicit tap sends a real email to a real client, so the address is
   * shown on the button rather than hidden behind it. Nothing is sent without
   * the electrician reading who it is going to.
   */
  const canSend = !!reportId && !!clientEmail.trim();

  const handleSend = async () => {
    if (!canSend || sending || sent) return;
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-certificate-resend', {
        body: {
          reportId,
          recipientEmail: clientEmail.trim(),
          formattedData: buildPayload(),
        },
      });
      if (error) throw new Error(error.message || 'Could not send it');
      /* Absent `success` is a failure too — matches useCertificateEmail. */
      if (!data?.success) throw new Error(data?.error || data?.hint || 'Could not send it');
      setSent(true);
      toast.success(`Survey sent to ${clientEmail.trim()}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not send it';
      console.error('[SurveyNextSteps] send failed:', err);
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  const btn =
    'flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold ' +
    'transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-40';
  const secondary = 'border border-white/[0.16] bg-white/[0.06] text-white hover:bg-white/[0.1]';

  return (
    <div className={cn('w-full', variant === 'panel' && 'space-y-4')}>
      {variant === 'panel' && (
        <h2 className="text-[15px] font-semibold tracking-tight text-white">What next</h2>
      )}

      {/* ── The job, before the price ──────────────────────────────────── */}
      {work.length > 0 && (
        <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            Work arising
          </p>
          <ul className="mt-2.5 space-y-2">
            {work.map((f) => (
              <li key={f.id} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    'mt-px shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                    SEVERITY_TINT[f.severity]
                  )}
                >
                  {SEVERITY_SHORT[f.severity]}
                </span>
                <span className="min-w-0 text-[13px] leading-snug text-white">
                  {f.identifiedAs || f.note}
                  {f.location && <span className="text-white"> — {f.location}</span>}
                </span>
              </li>
            ))}
          </ul>
          {later.length > 0 && (
            <p className="mt-3 border-t border-white/[0.08] pt-2.5 text-[12px] leading-snug text-white">
              {later.length} further item{later.length === 1 ? '' : 's'} noted as dated but
              working — worth mentioning, not usually quoted now.
            </p>
          )}
        </div>
      )}

      <div className={cn('space-y-2', variant === 'dialog' && 'mt-4')}>
        {/*
         * Quoting leads. The survey has just established what the property
         * needs, and this is the moment that turns an advisory job into the
         * work that follows it.
         */}
        {work.length > 0 && (
          <button type="button" onClick={onQuote} className={cn(btn, 'bg-elec-yellow text-black hover:bg-elec-yellow/90')}>
            <ReceiptText className="h-[18px] w-[18px]" />
            Quote this work ({work.length})
          </button>
        )}

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend || sending || sent}
          className={cn(btn, sent ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : secondary)}
        >
          {sending ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
              Sending
            </>
          ) : sent ? (
            <>
              <Check className="h-[18px] w-[18px]" />
              Sent to {clientName || 'the client'}
            </>
          ) : (
            <>
              <Mail className="h-[18px] w-[18px]" />
              <span className="truncate">
                {canSend ? `Email it to ${clientEmail.trim()}` : 'Email it to the client'}
              </span>
            </>
          )}
        </button>
        {!canSend && !sent && (
          <p className="text-center text-[12px] text-white">
            Add the client&rsquo;s email address to send it from here.
          </p>
        )}

        <button type="button" onClick={onDownload} className={cn(btn, secondary)}>
          <Download className="h-[18px] w-[18px]" />
          Download the report
        </button>
      </div>
    </div>
  );
}
