/**
 * Employer Hub › job sheet: "Done on site" (gap #3, ELE-2068).
 *
 * What the crew did with Job done: who finished it and when, the customer's
 * signature, the worker's note and photos, the certificate, the extras and
 * the invoice they produced, and the customer's summary email. When the firm
 * has the office check summaries first, this is where it is checked, edited
 * and sent (or not). Shows nothing for a job that was not finished on site.
 *
 * Money (extras, invoice) shows to the owner and admins only; the server
 * leaves it out for everyone else.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import {
  KeyValue,
  PanelHead,
  StatusPill,
  panelShellClass,
  rowBtnPrimary,
  rowBtnSecondary,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { textareaCn, labelCn } from '@/components/forms/fieldStyles';
import {
  gbp,
  useDecideJobDoneMessage,
  useJobDoneSummary,
  type CustomerMessageInvoice,
  type JobDoneMessageStatus,
  type JobDoneSummary,
} from '@/hooks/useJobDone';

const CERT_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

const when = (iso: string) => {
  const d = new Date(iso);
  return `${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} on ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
};

const MESSAGE_PILL: Record<JobDoneMessageStatus, { tone: PillTone; label: string }> = {
  waiting_certificate: { tone: 'neutral', label: 'Waiting for certificate' },
  // Neutral: the one yellow on this card is the Send button.
  to_check: { tone: 'neutral', label: 'To check' },
  queued: { tone: 'neutral', label: 'Sending' },
  sending: { tone: 'neutral', label: 'Sending' },
  sent: { tone: 'green', label: 'Sent' },
  skipped: { tone: 'neutral', label: 'Not sent' },
  cancelled: { tone: 'neutral', label: 'Not sent' },
  failed: { tone: 'red', label: 'Not sent' },
};

/** Signed links for the photos (private bucket; the firm can read Job done photos). */
function usePhotoUrls(paths: string[]) {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const key = paths.join('|');
  useEffect(() => {
    if (!paths.length) return;
    let alive = true;
    void supabase.storage
      .from('visual-uploads')
      .createSignedUrls(paths, 3600)
      .then(({ data }) => {
        if (!alive || !data) return;
        const out: Record<string, string> = {};
        data.forEach((d, i) => {
          if (d.signedUrl) out[paths[i]] = d.signedUrl;
        });
        setUrls(out);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return urls;
}

function certLine(s: JobDoneSummary): { text: string; tone?: 'yellow' | 'green' } {
  const list = s.certificates.certificates;
  if (!list.length) {
    const c = s.completion.certificate_status;
    return {
      text:
        c === 'not_needed'
          ? 'Not needed'
          : c === 'started'
            ? 'Started, not on the job yet'
            : c === 'later'
              ? 'To do later'
              : 'None on the job',
      tone: c === 'started' || c === 'later' ? 'yellow' : undefined,
    };
  }
  const issued = list.filter((c) => c.issued).length;
  const first = list[0];
  // The number already says what it is (EIC-2026-0101); the type only when there is none.
  const name =
    list.length > 1
      ? `${list.length} certificates`
      : first.number || CERT_LABEL[first.type] || 'Certificate';
  if (issued === list.length) {
    return {
      text: list.length === 1 ? `${name} · issued` : `${list.length} issued`,
      tone: 'green',
    };
  }
  const qs = list.find((c) => !c.issued)?.qs;
  return {
    text:
      qs === 'pending'
        ? `${name} · with the QS`
        : qs === 'returned'
          ? `${name} · returned by QS`
          : `${name} · not finished`,
    tone: 'yellow',
  };
}

export function JobDoneOnSiteCard({ jobId }: { jobId: string }) {
  const { data: s } = useJobDoneSummary(jobId);
  if (!s?.completion) return null;
  return <Card s={s} jobId={jobId} />;
}

function Card({ s, jobId }: { s: JobDoneSummary; jobId: string }) {
  const c = s.completion;
  const m = s.message;
  const photoUrls = usePhotoUrls(c.photos ?? []);
  const cert = certLine(s);
  const money = s.can_see_money;
  const extrasN = (c.extras ?? []).length;

  return (
    <section aria-label="Done on site" className={panelShellClass} data-testid="job-done-on-site">
      <PanelHead title="Done on site" meta={<StatusPill tone="green">Finished</StatusPill>} />
      {/* Desktop: what was done on the left, the customer summary on the right. */}
      <div className="lg:grid lg:grid-cols-2 lg:divide-x lg:divide-white/[0.07]">
        <div className="min-w-0">
          <div className="space-y-4 px-4 py-4 sm:px-5">
            <p className="text-[14px] leading-relaxed text-white">
              Finished by <span className="font-semibold">{c.by || 'the crew'}</span> at{' '}
              {when(c.completed_at)}.{' '}
              {c.signed
                ? `Signed off by ${c.customer_name || 'the customer'}.`
                : `Not signed by the customer${c.absent_reason ? `: ${c.absent_reason}` : ''}.`}
            </p>
            {c.note && (
              <p className="whitespace-pre-wrap border-l-2 border-white/[0.18] pl-3 text-[14px] leading-relaxed text-white">
                {c.note}
              </p>
            )}
            {(c.photos.length > 0 || c.signature) && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {c.photos.map((p) => (
                  <a
                    key={p}
                    href={photoUrls[p]}
                    target="_blank"
                    rel="noreferrer"
                    className="block aspect-square overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04]"
                  >
                    {photoUrls[p] && (
                      <img src={photoUrls[p]} alt="" className="h-full w-full object-cover" />
                    )}
                  </a>
                ))}
                {c.signature && (
                  <div className="col-span-2 flex aspect-[2/1] items-center justify-center overflow-hidden rounded-xl bg-white p-1">
                    <img
                      src={c.signature}
                      alt={`Signature of ${c.customer_name ?? 'the customer'}`}
                      className="max-h-full max-w-full"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
            {/* Not KeyValue: its label truncates ("Cert…") when the value is long on a phone. */}
            <div className="flex min-h-[48px] items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
              <span className="shrink-0 text-[14px] text-white">Certificate</span>
              <span
                className={cn(
                  'min-w-0 text-right text-[15px] font-semibold',
                  cert.tone === 'yellow'
                    ? 'text-elec-yellow'
                    : cert.tone === 'green'
                      ? 'text-emerald-400'
                      : 'text-white'
                )}
              >
                {cert.text}
              </span>
            </div>
            {extrasN > 0 && (
              <KeyValue
                label="Extras agreed on site"
                value={
                  money && c.extras_net != null
                    ? `${extrasN === 1 ? '1 item' : `${extrasN} items`}, ${gbp(Number(c.extras_net))}`
                    : extrasN === 1
                      ? '1 item'
                      : `${extrasN} items`
                }
              />
            )}
            {money && (
              <KeyValue
                label="Invoice"
                value={
                  c.invoice_number
                    ? `${c.invoice_number}, ${c.invoice_status === 'draft' ? 'draft to check' : (c.invoice_status ?? '')}`
                    : c.invoice_state === 'not_drafted'
                      ? 'Not raised yet'
                      : 'None'
                }
                tone={
                  c.invoice_status === 'draft' || c.invoice_state === 'not_drafted'
                    ? 'yellow'
                    : undefined
                }
              />
            )}
          </div>
        </div>
        <div className="min-w-0">
          {m ? (
            <MessageBlock s={s} jobId={jobId} photoUrls={photoUrls} />
          ) : s.settings.mode !== 'off' ? null : (
            <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] text-white sm:px-5 lg:border-t-0">
              Customer summaries are off. Switch them on in Automations, Finishing jobs on site.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function MessageBlock({
  s,
  jobId,
  photoUrls,
}: {
  s: JobDoneSummary;
  jobId: string;
  photoUrls: Record<string, string>;
}) {
  const m = s.message!;
  const decide = useDecideJobDoneMessage(jobId);
  // Checked, changed and sent from here while it hasn't gone.
  const editable = m.can_send;
  const [summary, setSummary] = useState(m.summary ?? '');
  const [photos, setPhotos] = useState<string[]>(m.photos ?? []);
  const [invoice, setInvoice] = useState<CustomerMessageInvoice>(m.include_invoice);
  // No sent invoice: nothing can go with the email, so the choice is Leave out.
  const invoiceSent = !!s.invoice.sent;
  const invoiceShown: CustomerMessageInvoice = invoiceSent
    ? invoice === 'pay_link' && s.invoice.has_pay_link === false
      ? 'invoice'
      : invoice
    : 'none';
  useEffect(() => {
    setSummary(m.summary ?? '');
    setPhotos(m.photos ?? []);
    setInvoice(m.include_invoice);
    // Only when the saved message changes, not on every refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m.id, m.summary, (m.photos ?? []).join('|'), m.include_invoice]);
  const pill = MESSAGE_PILL[m.status];
  const all = s.completion.photos ?? [];
  const certs = s.certificates.certificates;
  const certReady = certs.filter((c) => c.issued && c.pdf_url).length;

  const goes = useMemo(() => {
    const out: string[] = [];
    if (photos.length) out.push(`${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`);
    if (certReady) out.push(certReady === 1 ? 'the certificate' : `${certReady} certificates`);
    if (invoiceShown !== 'none')
      out.push(
        invoiceShown === 'pay_link' && s.invoice.has_pay_link
          ? 'the invoice and a pay link'
          : 'the invoice'
      );
    return out;
  }, [photos.length, certReady, invoiceShown, s.invoice]);

  const act = (action: 'send' | 'cancel') =>
    decide.mutate(
      {
        messageId: m.id,
        action,
        summary: action === 'send' ? summary : null,
        photos: action === 'send' ? photos : null,
        includeInvoice: action === 'send' && s.can_see_money ? invoiceShown : null,
      },
      {
        onSuccess: () =>
          toast.success(
            action === 'send'
              ? 'Sending the summary to the customer'
              : 'Not sent. Nothing went to the customer'
          ),
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Couldn’t do that'),
      }
    );

  const statusLine =
    m.status === 'sent'
      ? `Emailed to ${m.sent_to ?? s.job.client_email ?? 'the customer'} at ${m.sent_at ? when(m.sent_at) : 'just now'}.`
      : m.status === 'queued' || m.status === 'sending'
        ? 'On its way to the customer.'
        : m.status === 'to_check'
          ? `Check it, then send it to ${s.job.client || 'the customer'}${s.job.client_email ? ` at ${s.job.client_email}` : ''}.`
          : (m.reason ?? '');

  return (
    <div className="border-t border-white/[0.07] lg:border-t-0" data-testid="job-done-message">
      <div className="flex min-h-[52px] items-center gap-3 px-4 sm:px-5">
        <h3 className="text-[15px] font-semibold text-white">Customer summary</h3>
        <StatusPill tone={pill.tone}>{pill.label}</StatusPill>
      </div>
      <div className="space-y-4 px-4 pb-4 sm:px-5">
        {statusLine && <p className="text-[13.5px] leading-snug text-white">{statusLine}</p>}
        {editable ? (
          <>
            <div>
              <label className={labelCn} htmlFor={`jd-msg-${m.id}`}>
                What we did (the customer reads this)
              </label>
              <textarea
                id={`jd-msg-${m.id}`}
                value={summary}
                maxLength={2000}
                onChange={(e) => setSummary(e.target.value)}
                className={cn(textareaCn, 'min-h-[96px]')}
              />
            </div>
            {all.length > 0 && (
              <div>
                <p className="mb-2 text-[13px] font-semibold text-white">
                  Photos in the email (up to 6)
                </p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {all.map((p) => {
                    const on = photos.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={on}
                        onClick={() =>
                          setPhotos((cur) =>
                            on ? cur.filter((x) => x !== p) : cur.length >= 6 ? cur : [...cur, p]
                          )
                        }
                        className={cn(
                          'relative aspect-square overflow-hidden rounded-xl border-2 touch-manipulation',
                          on ? 'border-white' : 'border-transparent opacity-50'
                        )}
                      >
                        {photoUrls[p] && (
                          <img src={photoUrls[p]} alt="" className="h-full w-full object-cover" />
                        )}
                        {on && (
                          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {s.can_see_money && (
              <div>
                <p className="mb-2 text-[13px] font-semibold text-white">Invoice in the email</p>
                <InvoiceChoice
                  value={invoiceShown}
                  onChange={setInvoice}
                  disabled={{
                    invoice: !invoiceSent,
                    pay_link: !invoiceSent || s.invoice.has_pay_link === false,
                  }}
                />
                {!invoiceSent && (
                  <p className="mt-2 text-[13px] text-white">
                    {s.invoice.exists
                      ? 'The invoice is still a draft, so it is left out. Send the invoice first to include it.'
                      : 'There is no invoice on this job yet, so it is left out.'}
                  </p>
                )}
              </div>
            )}
            <p className="text-[13px] text-white">
              {goes.length
                ? `Goes with ${goes.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`
                : 'Goes as a short summary.'}
              {certs.some((c) => !(c.issued && c.pdf_url))
                ? ' The certificate isn’t issued yet, so the email says it will follow.'
                : ''}
            </p>
            {/* One row, phone too: Don't send on the left, the one yellow on the right. */}
            <div className="flex items-center gap-2 sm:justify-end">
              {m.can_cancel && (
                <button
                  type="button"
                  disabled={decide.isPending}
                  onClick={() => act('cancel')}
                  className={cn(rowBtnSecondary, 'min-w-0 flex-1 sm:flex-none')}
                >
                  Don’t send
                </button>
              )}
              <button
                type="button"
                data-testid="job-done-message-send"
                disabled={decide.isPending}
                onClick={() => act('send')}
                className={cn(rowBtnPrimary, 'min-w-0 flex-[1.4] sm:flex-none')}
              >
                {decide.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {m.status === 'waiting_certificate' ? 'Send now anyway' : 'Send to the customer'}
              </button>
            </div>
          </>
        ) : (
          m.summary && (
            <p className="whitespace-pre-wrap border-l-2 border-white/[0.18] pl-3 text-[14px] leading-relaxed text-white">
              {m.summary}
            </p>
          )
        )}
        {m.status === 'queued' && m.can_cancel && !editable && (
          <button
            type="button"
            disabled={decide.isPending}
            onClick={() => act('cancel')}
            className={cn(rowBtnSecondary, 'w-full sm:w-auto')}
          >
            Stop it
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Leave out / Invoice / Pay link. Drawn like Segments, but quiet (the chosen
 * option is white: the Send button is the card's one yellow) and with options
 * that can be switched off when there is no sent invoice to attach.
 */
function InvoiceChoice({
  value,
  onChange,
  disabled,
}: {
  value: CustomerMessageInvoice;
  onChange: (v: CustomerMessageInvoice) => void;
  disabled: Partial<Record<CustomerMessageInvoice, boolean>>;
}) {
  const items: { value: CustomerMessageInvoice; label: string }[] = [
    { value: 'none', label: 'Leave out' },
    { value: 'invoice', label: 'Invoice' },
    { value: 'pay_link', label: 'Pay link' },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Invoice in the email"
      className="flex w-full min-w-0 rounded-full border border-white/[0.12] bg-white/[0.04] p-0.5 sm:w-auto sm:inline-flex"
    >
      {items.map((it) => {
        const on = it.value === value;
        const off = !!disabled[it.value];
        return (
          <button
            key={it.value}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={off}
            onClick={() => onChange(it.value)}
            className={cn(
              'h-11 min-w-0 flex-auto truncate whitespace-nowrap rounded-full px-1.5 text-[12.5px] font-semibold touch-manipulation transition-colors sm:flex-none sm:px-4 sm:text-[13px]',
              on ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]',
              off && 'cursor-not-allowed opacity-40 hover:bg-transparent'
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
