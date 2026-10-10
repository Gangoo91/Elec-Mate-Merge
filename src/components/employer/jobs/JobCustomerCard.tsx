/**
 * The customer side of a firm job (ELE-1822), on the job sheet.
 *
 *  - Tell the customer: the Electrical Hub's TellCustomerSheet with the crew
 *    named ("Dan and Priya will be with you"). WhatsApp and text open the
 *    sender's own phone; email is sent as the firm with a calendar file, and
 *    can switch on the evening-before reminder.
 *  - Ask for a review once the work is done, with the firm's review links.
 *  - What has been sent, newest first, from the job's own log.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Bell, MessageCircle, Star } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import TellCustomerSheet from '@/components/calendar/TellCustomerSheet';
import { DEFAULT_CONFIRMATION_TEMPLATE, greetingName } from '@/components/calendar/confirmationMessage';
import { PlanRow, planBtn, planBtnPrimary } from '@/components/employer/jobs/PlanRow';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  useFirmJobMessage,
  useLogCustomerContact,
  namesList,
  reviewMessage,
  waLink,
  smsLink,
} from '@/hooks/useCustomerMessages';

const when = (iso?: string | null) => (iso ? format(parseISO(iso), 'EEE d MMM, HH:mm') : '');

export function JobCustomerCard({ jobId, onAddContact }: { jobId: string; onAddContact?: () => void }) {
  const navigate = useNavigate();
  const { data: m } = useFirmJobMessage(jobId);
  const log = useLogCustomerContact();
  const [tellOpen, setTellOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const template = useMemo(() => {
    if (!m?.crew.length) return null;
    // The stock wording plus who is coming. Names are plain text, never tokens.
    return DEFAULT_CONFIRMATION_TEMPLATE.replace(
      'Where: {where}',
      `Where: {where}\nWho: ${namesList(m.crew)}`
    );
  }, [m?.crew]);

  if (!m) return null;

  const done = m.status === 'Completed' || m.board_stage === 'Complete';
  // Read from the diary entry only: it is cleared when the job's date moves,
  // so an old message about the previous day never counts as told.
  const lastConfirm = m.event?.confirmation_sent_at ?? null;
  const reminderOn = !!m.event?.reminder_opt_in && !m.event?.reminder_sent_at;
  const hasContact = !!(m.client_phone || m.client_email);

  const who = m.client?.trim() || 'the customer';
  const status = !hasContact
    ? `No phone or email for ${who}`
    : lastConfirm
      ? `Told about the booking ${when(lastConfirm)}${m.event?.confirmation_sent_to ? `, by ${m.event.confirmation_sent_to}` : ''}`
      : m.event
        ? 'Not told about the booking yet'
        : 'Give the job a date to tell them about it';
  const last = m.log[0];
  return (
    <>
      <PlanRow
        helpId="jobs.customer"
        icon={MessageCircle}
        tone={!hasContact || (m.event && !lastConfirm && !done) ? 'warn' : lastConfirm ? 'ok' : 'neutral'}
        title="Customer"
        status={status}
        detail={
          <>
            {reminderOn && (
              <p className="inline-flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5 text-elec-yellow" /> Reminder email goes the evening before
              </p>
            )}
            {last && (
              <p>
                Last: {last.text} ({[last.who, when(last.at)].filter(Boolean).join(', ')})
              </p>
            )}
          </>
        }
        actions={
          !hasContact ? (
            onAddContact ? (
              <button type="button" onClick={onAddContact} className={planBtnPrimary}>
                Add phone or email
              </button>
            ) : undefined
          ) : (
            <>
              {m.event && (
                <button
                  type="button"
                  data-help="jobs.tell-customer"
                  onClick={() => setTellOpen(true)}
                  className={done || lastConfirm ? planBtn : planBtnPrimary}
                >
                  <MessageCircle className="h-4 w-4" />
                  {lastConfirm ? 'Tell again' : 'Tell them'}
                </button>
              )}
              <button
                type="button"
                data-help="jobs.review"
                onClick={() => setReviewOpen(true)}
                className={done ? planBtnPrimary : planBtn}
              >
                <Star className="h-4 w-4" />
                Ask for a review
              </button>
            </>
          )
        }
      />

      {m.event && (
        <TellCustomerSheet
          open={tellOpen}
          onOpenChange={setTellOpen}
          customer={{
            id: m.customer_id ?? undefined,
            name: m.client || 'there',
            phone: m.client_phone ?? undefined,
            email: m.client_email ?? undefined,
          }}
          booking={{
            title: m.title,
            start: parseISO(m.event.start_at),
            end: parseISO(m.event.end_at),
            allDay: !!m.event.all_day,
            location: m.location,
          }}
          businessName={m.business_name}
          eventId={m.event.id}
          firmJobId={m.job_id}
          template={template}
          onSent={(channel) => {
            // Email is logged by the server when it actually sends.
            if (channel !== 'email') log.mutate({ jobId: m.job_id, kind: 'confirmation', channel });
          }}
        />
      )}

      <ReviewSheet
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        message={reviewMessage(m)}
        phone={m.client_phone}
        email={m.client_email}
        hasLinks={(m.review.links ?? []).length > 0}
        name={m.client}
        onSettings={() => navigate('/settings?tab=business&sheet=reviews')}
        onSent={(channel) => log.mutate({ jobId: m.job_id, kind: 'review', channel })}
      />
    </>
  );
}

function ReviewSheet({
  open,
  onOpenChange,
  message,
  phone,
  email,
  hasLinks,
  name,
  onSettings,
  onSent,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  message: string;
  phone: string | null;
  email: string | null;
  hasLinks: boolean;
  name: string | null;
  onSettings: () => void;
  onSent: (channel: 'whatsapp' | 'sms' | 'email' | 'copy') => void;
}) {
  const go = async (channel: 'whatsapp' | 'sms' | 'email') => {
    const url =
      channel === 'whatsapp'
        ? waLink(phone!, message)
        : channel === 'sms'
          ? smsLink(phone!, message)
          : `mailto:${email}?subject=${encodeURIComponent('Thank you')}&body=${encodeURIComponent(message)}`;
    await openExternalUrl(url);
    onSent(channel);
    onOpenChange(false);
  };
  const copy = async () => {
    if (await copyToClipboard(message)) {
      onSent('copy');
      toast.success('Message copied');
    }
  };
  const btn = cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-3');

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="After the job"
      title={`Ask ${greetingName(name) || 'them'} for a review`}
      description="It opens your own WhatsApp, Messages or email with this written. Read it, then press send."
      width="wide"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
        <pre className="whitespace-pre-wrap rounded-2xl border border-white/[0.12] border-l-[3px] border-l-elec-yellow bg-white/[0.04] px-4 py-3.5 font-sans text-[14px] leading-relaxed text-white">
          {message}
        </pre>
        <div className="space-y-3">
          {!hasLinks && (
            <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-3">
              <p className="text-[13px] text-white">
                There's no review link yet. The owner adds the Google (or Checkatrade) link once, in Settings, Business,
                Reviews.
              </p>
              <button type="button" onClick={onSettings} className="mt-2 min-h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation">
                Open Reviews settings
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className={btn} disabled={!phone} onClick={() => go('whatsapp')}>
              WhatsApp
            </button>
            <button type="button" className={btn} disabled={!phone} onClick={() => go('sms')}>
              Text
            </button>
            <button type="button" className={btn} disabled={!email} onClick={() => go('email')}>
              Email
            </button>
            <button type="button" className={btn} onClick={copy}>
              Copy
            </button>
          </div>
          {!phone && <p className="text-[12px] text-white">No phone number on the job, so WhatsApp and text are off.</p>}
        </div>
      </div>
    </FormSheet>
  );
}
