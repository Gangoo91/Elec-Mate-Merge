/**
 * One enquiry, and everything else with that customer (ELE-2094).
 *
 * Left: what they need (read by the AI reader, with the original underneath),
 * their photos and how to reach them. Right: the reply, then the whole
 * customer: other enquiries, bookings, quotes, jobs and the message thread.
 * Footer: one tap to a quote or a job, with everything carried.
 */
import { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Loader2, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { textareaClass } from '@/components/employer/editorial';
import {
  PanelHead,
  Row,
  Rows,
  StatusPill,
  panelShellClass,
} from '@/components/employer/pageParts/PageParts';
import { CustomerConversationCard } from '@/components/employer/inbox/CustomerConversationCard';
import { openExternalUrl } from '@/utils/open-external-url';
import { copyToClipboard } from '@/utils/clipboard';
import { useFirmQuoteDefaults } from '@/hooks/useFirmQuoteDefaults';
import { SOURCE_LABEL } from '@/hooks/useEnquiries';
import {
  STAGE_LABEL,
  fullAddress,
  itemTitle,
  sourceLabel,
  useDoorPhotoUrls,
  useEmailDoorReply,
  useFrontDoorDetail,
  useFrontDoorThread,
  useJobFromDoor,
  useMarkDoorReplied,
  useQuoteFromDoor,
  useSetDoorStatus,
  type DoorItem,
  type DoorKind,
} from '@/hooks/useFrontDoor';
import type { Quote } from '@/services/financeService';

const stageTone = (s: DoorItem['stage']) =>
  s === 'new'
    ? ('volt' as const)
    : s === 'won'
      ? ('green' as const)
      : s === 'lost'
        ? ('red' as const)
        : ('neutral' as const);

const gbp = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;
const longWhen = (iso: string) => format(parseISO(iso), "EEE d MMM 'at' HH:mm");
const dayWhen = (iso: string) => format(parseISO(iso), 'd MMM yyyy');
const firstName = (s: string | null | undefined) => (s ?? '').trim().split(/\s+/)[0] || '';

const actionBtn =
  'inline-flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-[14px] font-semibold text-white touch-manipulation transition-colors hover:bg-white/[0.1] disabled:opacity-40';

function templateReply(i: DoorItem): string {
  const hi = firstName(i.name) ? `Hi ${firstName(i.name)}` : 'Hi';
  // Lower-case mid-sentence, but keep EICR / EV / PAT as written.
  const jobWords = (i.job_type ?? '')
    .split(/\s+/)
    .map((w) => (/^[A-Z0-9]{2,}s?$/.test(w) ? w : w.toLowerCase()))
    .join(' ');
  const job = i.job_type && i.job_type !== 'Other' ? ` about the ${jobWords}` : '';
  if (i.kind === 'booking' && i.booking) {
    const what = i.job_type ? ` the ${jobWords}` : '';
    return `${hi}, thanks for booking${what}. We have you down for ${i.booking.label}. We will confirm shortly.`;
  }
  return `${hi}, thanks for getting in touch${job}. When would suit for us to come and have a look?`;
}

/** Label and a value that wraps (an address or email never pushes the label out). */
function Detail({ label, value, breakAll }: { label: string; value: string; breakAll?: boolean }) {
  return (
    <div className="flex min-h-[48px] items-start gap-4 px-4 py-3 sm:px-5">
      <span className="w-20 shrink-0 text-[14px] text-white">{label}</span>
      <span
        className={cn(
          'min-w-0 flex-1 text-right text-[15px] font-semibold text-white',
          breakAll ? 'break-all' : 'break-words'
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function EnquirySheet({
  item,
  money,
  onOpenChange,
  onOpenQuote,
  onEditDraft,
  onOpenJob,
  onOpenClient,
  onOpenItem,
  onOpenDiary,
}: {
  item: DoorItem | null;
  money: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenQuote: (id: string) => void;
  onEditDraft: (q: Quote) => void;
  onOpenJob: (id: string) => void;
  onOpenClient: (id: string) => void;
  onOpenItem: (kind: DoorKind, id: string) => void;
  onOpenDiary: () => void;
}) {
  const { data: detail, isLoading: detailLoading } = useFrontDoorDetail(item);
  const { data: thread } = useFrontDoorThread(item);
  const { data: photoUrls = [] } = useDoorPhotoUrls(detail?.photos);
  const { data: defaults } = useFirmQuoteDefaults();
  const makeQuote = useQuoteFromDoor();
  const makeJob = useJobFromDoor();
  const setStatus = useSetDoorStatus();
  const markReplied = useMarkDoorReplied();
  const emailReply = useEmailDoorReply();
  const [message, setMessage] = useState('');
  const [edited, setEdited] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  // A fresh reply for each enquiry: the reader's own draft, or a plain one.
  useEffect(() => {
    if (!item) return;
    setEdited(false);
    setShowOriginal(false);
  }, [item?.kind, item?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!item || edited) return;
    setMessage((detail?.draft_reply ?? '').trim() || templateReply(item));
  }, [item, detail?.draft_reply, edited]);

  const others = useMemo(
    () => (thread?.enquiries ?? []).filter((e) => e.id !== item?.enquiry_id),
    [thread?.enquiries, item?.enquiry_id]
  );
  const customerId = thread?.customer?.id ?? item?.customer_id ?? null;

  if (!item) {
    return (
      <FormSheet open={false} onOpenChange={onOpenChange} title="Enquiry">
        <div />
      </FormSheet>
    );
  }

  const who = item.name || item.contact_name || item.phone || item.email || 'Unknown';
  const address = fullAddress(item.address, item.postcode);
  const hasQuote = !!item.quote;
  const hasJob = !!item.job_id;
  // A booking still to confirm is decided in the diary (crew, clashes, right to work).
  const toConfirm = item.kind === 'booking' && item.stage === 'new' && !hasJob;
  const busy = makeQuote.isPending || makeJob.isPending;
  const closed = item.stage === 'closed';
  const replies = detail?.replies ?? [];

  const onQuote = async () => {
    if (item.quote) return onOpenQuote(item.quote.id);
    try {
      const out = await makeQuote.mutateAsync({
        item,
        photos: detail?.photos ?? [],
        vatRegistered: defaults?.vatRegistered ?? true,
        validityDays: defaults?.validityDays ?? 30,
      });
      if (out.existingId) return onOpenQuote(out.existingId);
      if (out.quote) {
        toast.success('Quote started', {
          description: 'Customer, site and job are filled in. Add your prices.',
        });
        onEditDraft(out.quote);
      }
    } catch (e) {
      toast.error('Could not start the quote', { description: (e as Error).message });
    }
  };

  const onJob = async () => {
    if (item.job_id) return onOpenJob(item.job_id);
    try {
      const out = await makeJob.mutateAsync({ item, photos: detail?.photos ?? [] });
      if (!out.existed) {
        toast.success('Job made', {
          description:
            out.photosCopied > 0
              ? `Customer, site, job and ${out.photosCopied} photo${out.photosCopied === 1 ? '' : 's'} carried over.`
              : 'Customer, site and job are filled in.',
        });
      }
      onOpenJob(out.jobId);
    } catch (e) {
      toast.error('Could not make the job', { description: (e as Error).message });
    }
  };

  const replied = () => {
    if (!item.first_actioned_at) markReplied.mutate(item);
  };
  const call = () => {
    if (!item.phone) return;
    void openExternalUrl(`tel:${item.phone.replace(/\s+/g, '')}`);
    replied();
  };
  const text = () => {
    if (!item.phone) return;
    // `?&body=` prefills on both iOS and Android.
    void openExternalUrl(
      `sms:${item.phone.replace(/\s+/g, '')}?&body=${encodeURIComponent(message)}`
    );
    replied();
  };
  const sendEmail = async () => {
    if (!item.email || message.trim().length < 5) return;
    try {
      await emailReply.mutateAsync({ item, message: message.trim() });
      toast.success(`Emailed ${firstName(item.name) || 'them'}`, {
        description: 'Their reply comes back to your email.',
      });
    } catch (e) {
      toast.error('The email did not go', { description: (e as Error).message });
    }
  };
  const copy = async () => {
    const ok = await copyToClipboard(message);
    if (ok) {
      toast.success('Copied');
      replied();
    } else toast.error('Copy failed');
  };

  const setTo = async (status: 'new' | 'dismissed' | 'spam') => {
    try {
      await setStatus.mutateAsync({ item, status });
      toast.success(
        status === 'new' ? 'Reopened' : status === 'spam' ? 'Marked as junk' : 'Closed'
      );
      if (status !== 'new') onOpenChange(false);
    } catch (e) {
      toast.error('Could not save that', { description: (e as Error).message });
    }
  };

  const description = [sourceLabel(item), longWhen(item.received_at)].join(' · ');

  return (
    <FormSheet
      open={!!item}
      onOpenChange={onOpenChange}
      title={who}
      description={description}
      headerTrailing={
        <StatusPill
          tone={
            item.urgency === 'emergency' && item.stage === 'new' ? 'red' : stageTone(item.stage)
          }
        >
          {item.urgency === 'emergency' && item.stage === 'new'
            ? 'Urgent'
            : toConfirm
              ? 'To confirm'
              : item.stage === 'quoted' && item.quote?.status === 'draft'
                ? 'Quote draft'
                : STAGE_LABEL[item.stage]}
        </StatusPill>
      }
      width="wide"
      bodyClassName="pt-1"
      footer={
        <div className="grid grid-cols-2 gap-2" data-help="enquiries.convert">
          <button
            type="button"
            onClick={toConfirm ? onOpenDiary : onJob}
            disabled={busy}
            className={cn(actionBtn, 'w-full')}
          >
            {makeJob.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {toConfirm ? 'Confirm in diary' : hasJob ? 'Open job' : 'Make a job'}
          </button>
          <button
            type="button"
            onClick={onQuote}
            disabled={busy}
            className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-elec-yellow px-3 text-[14px] font-semibold text-black touch-manipulation transition-colors hover:bg-elec-yellow/90 disabled:opacity-50"
          >
            {makeQuote.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {hasQuote ? 'Open quote' : 'Make a quote'}
          </button>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
        {/* ── What they need ─────────────────────────────────── */}
        <div className="min-w-0 space-y-5">
          <section className={panelShellClass}>
            <PanelHead title={itemTitle(item)} />
            <div className="space-y-3 px-4 py-4 sm:px-5">
              {item.summary && item.summary !== itemTitle(item) && (
                <p className="text-[15px] font-medium leading-relaxed text-white">{item.summary}</p>
              )}
              {item.details ? (
                <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
                  {item.details}
                </p>
              ) : (
                !item.summary && (
                  <p className="text-[14px] leading-relaxed text-white">
                    They did not say what the job is.
                  </p>
                )
              )}
              {(item.urgency === 'emergency' || item.photo_danger || item.fit_note) && (
                <div className="space-y-1.5 border-t border-white/[0.07] pt-3">
                  {item.urgency === 'emergency' && (
                    <p className="text-[13.5px] font-semibold text-red-400">
                      They need someone urgently.
                    </p>
                  )}
                  {item.photo_danger && (
                    <p className="text-[13.5px] font-semibold text-red-400">
                      A photo may show something dangerous. Look before you reply.
                    </p>
                  )}
                  {item.fit_note && <p className="text-[13.5px] text-white">{item.fit_note}</p>}
                </div>
              )}
              {(detail?.photo_findings?.length ?? 0) > 0 && (
                <ul className="space-y-1 border-t border-white/[0.07] pt-3">
                  {detail!.photo_findings.map((f) => (
                    <li key={f} className="text-[13.5px] text-white">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {photoUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 border-t border-white/[0.07] px-4 py-3 sm:grid-cols-4 sm:px-5">
                {photoUrls.map((p) => (
                  <button
                    key={p.photo.path}
                    type="button"
                    onClick={() => void openExternalUrl(p.url)}
                    className="aspect-square overflow-hidden rounded-lg bg-white/[0.06] touch-manipulation"
                  >
                    <img
                      src={p.url}
                      alt="Photo from the customer"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
            {item.photo_count > 0 && photoUrls.length === 0 && detailLoading && (
              <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] text-white sm:px-5">
                Loading {item.photo_count} photo{item.photo_count === 1 ? '' : 's'}.
              </p>
            )}
            {detail?.raw_text && detail.raw_text.trim() !== (item.details ?? '').trim() && (
              <div className="border-t border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => setShowOriginal((v) => !v)}
                  className="flex h-11 w-full items-center px-4 text-left text-[13px] font-semibold text-elec-yellow touch-manipulation sm:px-5"
                >
                  {showOriginal ? 'Hide what they sent' : 'Show what they sent'}
                </button>
                {showOriginal && (
                  <div className="px-4 pb-4 sm:px-5">
                    {detail.raw_subject && (
                      <p className="mb-1 text-[13px] font-semibold text-white">
                        {detail.raw_subject}
                      </p>
                    )}
                    <p className="max-h-72 overflow-y-auto whitespace-pre-line break-words text-[13px] leading-relaxed text-white">
                      {detail.raw_text}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className={panelShellClass}>
            <PanelHead title="Contact" />
            <Rows>
              {item.contact_name && item.contact_name !== item.name && (
                <Detail label="Contact" value={item.contact_name} />
              )}
              <Detail label="Phone" value={item.phone || 'Not given'} />
              <Detail label="Email" value={item.email || 'Not given'} breakAll />
              <Detail label="Address" value={address || 'Not given'} />
              {item.distance_miles != null && (
                <Detail
                  label="Distance"
                  value={`${Math.round(Number(item.distance_miles))} miles`}
                />
              )}
              {item.booking && <Detail label="Booked for" value={item.booking.label} />}
              {detail?.preferred_timing && (
                <Detail label="Best time" value={detail.preferred_timing} />
              )}
            </Rows>
            {item.phone && (
              <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
                <button type="button" onClick={call} className={cn(actionBtn, 'w-full')}>
                  <Phone className="h-4 w-4" />
                  Call {firstName(item.name) || item.phone}
                </button>
              </div>
            )}
          </section>
        </div>

        {/* ── Reply, then the whole customer ─────────────────── */}
        <div className="min-w-0 space-y-5">
          <section className={panelShellClass} data-help="enquiries.reply">
            <PanelHead
              title="Reply"
              meta={
                item.first_actioned_at ? (
                  <span className="text-[12.5px] text-white">
                    Replied {dayWhen(item.first_actioned_at)}
                  </span>
                ) : undefined
              }
            />
            <div className="space-y-3 px-4 py-4 sm:px-5">
              <textarea
                className={cn(textareaClass, 'min-h-[120px]')}
                value={message}
                onChange={(e) => {
                  setEdited(true);
                  setMessage(e.target.value);
                }}
                rows={5}
                aria-label="Your reply"
              />
              <div className="grid grid-cols-3 gap-2">
                <button type="button" onClick={copy} className={actionBtn}>
                  Copy
                </button>
                <button type="button" onClick={text} disabled={!item.phone} className={actionBtn}>
                  Text it
                </button>
                <button
                  type="button"
                  onClick={sendEmail}
                  disabled={!item.email || emailReply.isPending}
                  className={actionBtn}
                >
                  {emailReply.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Email it
                </button>
              </div>
            </div>
            {replies.length > 0 && (
              <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
                <p className="text-[12.5px] font-semibold text-white">Sent</p>
                <ul className="mt-2 space-y-2.5">
                  {replies.slice(-3).map((r) => (
                    <li key={r.at} className="text-[13px] leading-relaxed text-white">
                      <span className="font-semibold">
                        {longWhen(r.at)} by {r.via === 'whatsapp' ? 'WhatsApp' : r.via}
                      </span>
                      <span className="mt-0.5 block line-clamp-3">{r.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className={panelShellClass} data-help="enquiries.thread">
            <PanelHead
              title={thread?.customer ? thread.customer.name : 'This customer'}
              meta={
                thread?.customer ? (
                  <StatusPill>Client</StatusPill>
                ) : item.customer_name ? (
                  <StatusPill>Client</StatusPill>
                ) : undefined
              }
              action={customerId ? 'Open client' : undefined}
              onAction={customerId ? () => onOpenClient(customerId) : undefined}
            />
            {!thread ? (
              <p className="px-4 py-4 text-[14px] text-white sm:px-5">
                {item.email || item.phone
                  ? 'Looking for anything else with them.'
                  : 'No email or phone to match on.'}
              </p>
            ) : others.length +
                thread.bookings.length +
                thread.quotes.length +
                thread.jobs.length ===
              0 ? (
              <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">
                {thread.customer
                  ? 'Nothing else with them yet. Quotes, jobs and bookings for them show here.'
                  : 'New to you. Making a quote or a job adds them to your clients.'}
              </p>
            ) : (
              <Rows>
                {others.map((e) => (
                  <Row
                    key={`e${e.id}`}
                    title={e.title}
                    detail={`Enquiry · ${SOURCE_LABEL[e.source] ?? 'Enquiry'} · ${dayWhen(e.received_at)}`}
                    trailing={
                      <StatusPill tone={stageTone(e.stage)}>{STAGE_LABEL[e.stage]}</StatusPill>
                    }
                    chevron={false}
                    onClick={() => onOpenItem('enquiry', e.id)}
                  />
                ))}
                {thread.bookings.map((b) => (
                  <Row
                    key={`b${b.id}`}
                    title={b.type}
                    detail={`Booking ${b.reference} · ${b.label}`}
                    trailing={
                      <StatusPill
                        tone={
                          b.status === 'tentative'
                            ? 'volt'
                            : b.status === 'confirmed'
                              ? 'green'
                              : 'neutral'
                        }
                      >
                        {b.status === 'tentative'
                          ? 'To confirm'
                          : b.status === 'confirmed'
                            ? 'Confirmed'
                            : 'Declined'}
                      </StatusPill>
                    }
                    chevron={false}
                    onClick={b.job_id ? () => onOpenJob(b.job_id!) : onOpenDiary}
                  />
                ))}
                {thread.quotes.map((q) => (
                  <Row
                    key={`q${q.id}`}
                    title={q.title || `Quote ${q.number ?? ''}`.trim()}
                    detail={`Quote${q.number ? ` ${q.number}` : ''} · ${dayWhen(q.created_at)}`}
                    amount={
                      money && q.total != null && Number(q.total) > 0
                        ? gbp(Number(q.total))
                        : undefined
                    }
                    status={
                      <StatusPill
                        tone={q.accepted ? 'green' : q.status === 'rejected' ? 'red' : 'neutral'}
                      >
                        {q.accepted
                          ? 'Accepted'
                          : q.status === 'draft'
                            ? 'Draft'
                            : q.status === 'rejected'
                              ? 'Declined'
                              : 'Sent'}
                      </StatusPill>
                    }
                    chevron={false}
                    onClick={() => onOpenQuote(q.id)}
                  />
                ))}
                {thread.jobs.map((j) => (
                  <Row
                    key={`j${j.id}`}
                    title={j.title}
                    detail={`Job${j.start_date ? ` · starts ${dayWhen(j.start_date)}` : ''}`}
                    trailing={<StatusPill>{j.status ?? 'Job'}</StatusPill>}
                    chevron={false}
                    onClick={() => onOpenJob(j.id)}
                  />
                ))}
              </Rows>
            )}
          </section>

          {customerId && (
            <CustomerConversationCard
              customerId={customerId}
              customerName={thread?.customer?.name ?? who}
            />
          )}

          <div className="flex flex-wrap justify-end gap-2">
            {item.stage === 'lost' ? null : closed || item.stage === 'spam' ? (
              <button
                type="button"
                onClick={() => setTo('new')}
                disabled={setStatus.isPending}
                className={actionBtn}
              >
                Reopen
              </button>
            ) : (
              !hasQuote &&
              !hasJob && (
                <>
                  <button
                    type="button"
                    onClick={() => setTo('spam')}
                    disabled={setStatus.isPending}
                    className={actionBtn}
                  >
                    Junk
                  </button>
                  <button
                    type="button"
                    onClick={() => setTo('dismissed')}
                    disabled={setStatus.isPending}
                    className={actionBtn}
                  >
                    Not for us
                  </button>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </FormSheet>
  );
}

export default EnquirySheet;
