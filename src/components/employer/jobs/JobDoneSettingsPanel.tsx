/**
 * "Finishing jobs on site" (ELE-2068): who in the crew may use Job done in
 * Worker Tools, and what happens when they do. Owner or admin changes it.
 *
 * Job done closes the job, so the office's own automations run from it: the
 * "Draft the invoice" rule. Reviews moved to Clients, Review requests (after
 * payment); this panel points there. It says plainly whether those are on,
 * rather than turning anything on itself.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { panel, PanelTitle, Segments } from '@/components/employer/pageParts/PageParts';
import { FormSheet } from '@/components/forms/FormSheet';
import { useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import {
  useJobDoneSettings,
  type CustomerMessageInvoice,
  type CustomerMessageMode,
  type JobDoneSettings,
  type WhoCanFinish,
} from '@/hooks/useJobDone';

// Gap #3: the customer's summary when a job is done. Off until the firm
// switches it on. "Office checks first" is the default when it is switched on
// (a decision for Andrew: see the ELE-2068 comment).
const MESSAGE_MODES: { v: CustomerMessageMode; label: string; hint: string }[] = [
  {
    v: 'off',
    label: 'Off',
    hint: 'Off. When on, the office checks first: the summary waits on the job for the office to read and send.',
  },
  {
    v: 'office_checks',
    label: 'Office checks first',
    hint: 'The summary waits on the job for the office to read, change and send.',
  },
  {
    v: 'auto',
    label: 'Send automatically',
    hint: 'The summary is emailed as soon as Job done reaches the office, once any certificate is issued.',
  },
];

const INVOICE_CHOICES: { v: CustomerMessageInvoice; label: string }[] = [
  { v: 'none', label: 'Leave out' },
  { v: 'invoice', label: 'Invoice' },
  { v: 'pay_link', label: 'Pay link' },
];

const CHOICES: { v: WhoCanFinish; label: string; hint: string }[] = [
  {
    v: 'crew',
    label: 'Crew',
    hint: 'Engineers and supervisors on the job can close it on site. Apprentices and subcontractors tell the office they have finished their part.',
  },
  {
    v: 'supervisors',
    label: 'Supervisors',
    hint: 'Only supervisors close jobs on site. Engineers tell the office they have finished their part.',
  },
  {
    v: 'office_only',
    label: 'Office only',
    hint: 'Nobody closes jobs on site. The office closes them.',
  },
];

export function JobDoneSettingsPanel({
  onOpenRule,
  onOpenReviews,
}: {
  onOpenRule?: (key: string) => void;
  /** Reviews moved to Clients, Review requests (after payment). */
  onOpenReviews?: () => void;
}) {
  const { data: firmId } = useOfficeFirmId();
  const { data, isLoading, save } = useJobDoneSettings(firmId);
  if (isLoading || !data) return null;
  const current = CHOICES.find((c) => c.v === data.who_can_finish) ?? CHOICES[0];

  return (
    <section aria-label="Finishing jobs on site">
      <PanelTitle title="Finishing jobs on site" meta="Job done" />
      <div className={cn(panel, 'space-y-4 px-4 py-4 sm:px-5')}>
        <p className="text-[14px] leading-relaxed text-white">
          With Job done, the crew finishes on the phone: completion checks, photos, the certificate,
          the customer’s signature and any extras, priced from your price book. It works with no
          signal and closes the job once.
        </p>
        <div>
          <p className="mb-2 text-[13px] font-semibold text-white">Who can close a job on site</p>
          <Segments
            items={CHOICES.map((c) => ({ value: c.v, label: c.label }))}
            value={current.v}
            className={cn(!data.can_change && 'pointer-events-none')}
            onChange={(v) => {
              if (!data.can_change || save.isPending || v === current.v) return;
              const c = CHOICES.find((x) => x.v === v) ?? CHOICES[0];
              save.mutate(v, {
                onSuccess: () => toast.success(`Job done: ${c.label.toLowerCase()}`),
                onError: (e) =>
                  toast.error(e instanceof Error ? e.message : 'Could not change that'),
              });
            }}
          />
          <p className="mt-2 text-[13px] text-white">
            {current.hint}
            {!data.can_change && ' Only the owner or an admin can change this.'}
          </p>
        </div>
        <ul className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
          {[
            {
              key: 'job_complete_draft_invoice',
              on: data.draft_invoice_on,
              onText: 'The invoice is drafted the moment the job is done, with the extras on it.',
              offText: 'No invoice is drafted when the job is done. The office raises it.',
            },
          ].map((r) => (
            <li key={r.key} className="flex items-center justify-between gap-3 py-3">
              <span className="text-[13.5px] leading-snug text-white">
                {r.on ? r.onText : r.offText}
              </span>
              {onOpenRule && (
                <button
                  type="button"
                  onClick={() => onOpenRule(r.key)}
                  className="h-11 shrink-0 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {r.on ? 'Open' : 'Turn on'}
                </button>
              )}
            </li>
          ))}
          {/* Reviews: one place, after payment. A firm with the old rule on
              keeps it working and sees where it moved. */}
          <li className="flex items-center justify-between gap-3 py-3">
            <span className="text-[13.5px] leading-snug text-white">
              <span className="font-semibold">Moved to Review requests.</span>{' '}
              {data.review_request_on
                ? 'Your old review rule still asks when the job is done, until you turn it off.'
                : 'Customers are asked for a review once, after they pay.'}
            </span>
            {(onOpenReviews || onOpenRule) && (
              <button
                type="button"
                onClick={() =>
                  onOpenReviews ? onOpenReviews() : onOpenRule?.('job_complete_review_request')
                }
                className="h-11 shrink-0 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
              >
                Open
              </button>
            )}
          </li>
        </ul>
        <CustomerMessageSettings data={data} firmId={firmId ?? null} />
        {data.updated_by_name && data.updated_at && (
          <p className="text-[12.5px] text-white">
            Last changed by {data.updated_by_name},{' '}
            {new Date(data.updated_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
            .
          </p>
        )}
      </div>
    </section>
  );
}

/** Gap #3: whether, and how, the customer is emailed when a job is done. */
function CustomerMessageSettings({
  data,
  firmId,
}: {
  data: JobDoneSettings;
  firmId: string | null;
}) {
  const { saveMessage } = useJobDoneSettings(firmId);
  const [preview, setPreview] = useState(false);
  const mode = MESSAGE_MODES.find((m) => m.v === data.customer_message) ?? MESSAGE_MODES[0];
  const change = (v: {
    mode?: CustomerMessageMode;
    invoice?: CustomerMessageInvoice;
    photos?: boolean;
  }) => {
    if (!data.can_change || saveMessage.isPending) return;
    saveMessage.mutate(
      {
        mode: v.mode ?? data.customer_message,
        invoice: v.invoice,
        photos: v.photos,
      },
      {
        onSuccess: (d) =>
          toast.success(
            d.customer_message === 'off'
              ? 'Customer summaries are off'
              : d.customer_message === 'auto'
                ? 'Customer summaries go automatically'
                : 'Customer summaries wait for the office'
          ),
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not change that'),
      }
    );
  };

  return (
    <div
      className="space-y-3 border-t border-white/[0.07] pt-4"
      data-testid="job-done-customer-settings"
    >
      <div>
        <p className="text-[13px] font-semibold text-white">
          Email the customer when the job is done
        </p>
        <p className="mt-0.5 text-[13px] leading-snug text-white">
          What was done, the photos the engineer picks, the certificate once it is issued and, if
          you want, the invoice once you have sent it. Never to a customer with no email, never for
          imported jobs, and never twice for one job.
        </p>
      </div>
      <Segments
        items={MESSAGE_MODES.map((m) => ({ value: m.v, label: m.label }))}
        value={mode.v}
        wrap
        className={cn(!data.can_change && 'pointer-events-none')}
        onChange={(v) => v !== mode.v && change({ mode: v })}
      />
      <p className="text-[13px] text-white">
        {mode.hint}
        {!data.can_change && ' Only the owner or an admin can change this.'}
      </p>
      {mode.v !== 'off' && (
        <>
          <div>
            <p className="mb-2 text-[13px] font-semibold text-white">Invoice in the email</p>
            <Segments
              items={INVOICE_CHOICES.map((c) => ({ value: c.v, label: c.label }))}
              value={data.customer_message_invoice}
              className={cn(!data.can_change && 'pointer-events-none')}
              onChange={(v) => v !== data.customer_message_invoice && change({ invoice: v })}
            />
            <p className="mt-2 text-[13px] text-white">
              {data.customer_message_invoice === 'none'
                ? 'The invoice is never in it. Send it as you do now.'
                : data.customer_message_invoice === 'pay_link' && !data.pay_links_on
                  ? 'Card payments are not set up, so the email links the invoice without a pay button.'
                  : 'Only an invoice you have already sent goes in it, never a draft.'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={data.customer_message_photos}
            disabled={!data.can_change}
            onClick={() => change({ photos: !data.customer_message_photos })}
            className="flex min-h-[48px] w-full items-center justify-between gap-3 text-left touch-manipulation"
          >
            <span className="text-[13.5px] text-white">The engineer can add photos (up to 6)</span>
            <span
              className={cn(
                'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                data.customer_message_photos ? 'bg-elec-yellow' : 'bg-white/[0.18]'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 h-5 w-5 rounded-full bg-white transition-transform',
                  data.customer_message_photos ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </span>
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => setPreview(true)}
        className="h-11 px-0 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
        data-testid="job-done-email-preview-open"
      >
        See the email the customer gets
      </button>
      <EmailPreviewSheet open={preview} onOpenChange={setPreview} data={data} />
    </div>
  );
}

/** A faithful sketch of the job-done email (the same blocks the sender uses). */
function EmailPreviewSheet({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  data: JobDoneSettings;
}) {
  const company = data.company_name || 'Your firm';
  const photos = data.customer_message_photos;
  const inv = data.customer_message_invoice;
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Preview"
      title="The customer’s email"
      description="An example with made-up details. The real one uses the job, the engineer’s words and your logo."
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
        <div
          className="overflow-hidden rounded-2xl bg-[#f1f5f9] p-3 sm:p-5"
          data-testid="job-done-email-preview"
        >
          <div className="mx-auto max-w-[560px] overflow-hidden rounded-xl bg-white text-[#334155] shadow-sm">
            <div className="border-b border-[#e2e8f0] px-6 py-4 text-[15px] font-semibold text-[#0f172a]">
              {company}
            </div>
            <div className="space-y-4 px-6 py-5 text-[14px] leading-relaxed">
              <p className="text-[12px] text-[#64748b]">
                Subject: Work finished: Consumer unit upgrade
              </p>
              <p>
                Hi <strong className="text-[#0f172a]">Sarah</strong>,
              </p>
              <p>
                We finished <strong className="text-[#0f172a]">Consumer unit upgrade</strong> on
                Friday 10 October. Sam Taylor did the work. Here is a short record for you to keep.
              </p>
              <div className="border-t border-[#e2e8f0] pt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                  What we did
                </p>
                <p>
                  Replaced the old fuse board with a new RCBO consumer unit, labelled every circuit
                  and tested the lot. Everything is working and safe.
                </p>
                <p className="mt-3 text-[13px] text-[#64748b]">
                  Signed off on site by Sarah Patel.
                </p>
              </div>
              {photos && (
                <div className="border-t border-[#e2e8f0] pt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                    Photos of the finished work
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-[4/3] rounded-lg bg-[#e2e8f0]" />
                    <div className="aspect-[4/3] rounded-lg bg-[#e2e8f0]" />
                  </div>
                </div>
              )}
              <div className="border-t border-[#e2e8f0] pt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                  Your certificate
                </p>
                <p>
                  Electrical Installation Certificate EIC-0142:{' '}
                  <span className="font-semibold text-[#0f172a] underline">download the PDF</span>
                </p>
              </div>
              {inv !== 'none' && (
                <div className="border-t border-[#e2e8f0] pt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                    Invoice
                  </p>
                  <p>
                    Invoice INV-0231, £640.00 to pay.{' '}
                    <span className="font-semibold text-[#0f172a] underline">View the invoice</span>
                    .
                  </p>
                </div>
              )}
              <div className="pt-1 text-center">
                <span className="inline-block rounded-lg bg-[#0f172a] px-8 py-3 text-[15px] font-semibold text-white">
                  {inv === 'pay_link' && data.pay_links_on
                    ? 'Pay £640.00 by card'
                    : 'Download your certificate'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 space-y-3 lg:mt-0">
          <p className="text-[14px] font-semibold text-white">What decides what is in it</p>
          <ul className="space-y-2 text-[13.5px] leading-snug text-white">
            <li>
              The engineer writes what was done and picks the photos on the last step of Job done.
            </li>
            <li>
              The certificate is linked once it is issued (after the QS if you use one), and not if
              you hold certificates until paid.
            </li>
            <li>The invoice only goes once you have sent it. A draft never goes.</li>
            <li>
              {data.customer_message === 'auto'
                ? 'It goes automatically. Each job gets one email at most.'
                : 'The office reads it on the job, changes anything, and taps Send. Each job gets one email at most.'}
            </li>
            <li>Replies go to your firm’s email address.</li>
          </ul>
        </div>
      </div>
    </FormSheet>
  );
}
