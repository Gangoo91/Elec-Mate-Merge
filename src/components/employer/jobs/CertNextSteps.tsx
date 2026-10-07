/**
 * The chain reactions of a finished certificate (ELE-1832), on its sheet in
 * Jobs › Testing. Each is one tap and each is logged on the job:
 *
 *  - Send it to the customer: their client portal link (where the PDF is, once
 *    QS has signed it off), by WhatsApp, text, email or copy.
 *  - Book the next inspection: a repeat visit at the certificate's own
 *    interval, due on its re-test date (ELE-1821).
 *  - Raise a remedial quote: one line per open C1, C2 or FI observation.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, FileText, Send } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { greetingName } from '@/components/calendar/confirmationMessage';
import { useEnsurePortalLink, portalUrl } from '@/hooks/useCustomerPortal';
import { useFirmJobMessage, useLogCustomerContact, waLink, smsLink } from '@/hooks/useCustomerMessages';
import { MakeRecurringSheet } from '@/components/employer/jobs/MakeRecurringSheet';
import type { ContractFrequency } from '@/hooks/useMaintenanceContracts';
import type { JobCertificate } from '@/hooks/useJobCertificates';

const btn = cn(buttonSecondaryCn, 'inline-flex w-full items-center justify-start gap-2 px-4 text-left');

function typeLabel(t: string) {
  const v = (t || '').toLowerCase();
  if (v.startsWith('eicr')) return 'EICR';
  if (v.startsWith('eic')) return 'EIC';
  if (v.startsWith('minor')) return 'Minor Works certificate';
  return 'certificate';
}

/** The certificate's own interval, as a repeat frequency. */
function intervalOf(from: string | null, to: string | null): ContractFrequency {
  if (!from || !to) return 'five_yearly';
  const years = (new Date(to).getTime() - new Date(from).getTime()) / (365.25 * 86400e3);
  if (years <= 0.6) return 'six_monthly';
  if (years <= 1.5) return 'annually';
  if (years <= 2.5) return 'two_yearly';
  if (years <= 4) return 'three_yearly';
  return 'five_yearly';
}

export function CertNextSteps({ cert }: { cert: JobCertificate }) {
  const navigate = useNavigate();
  const { data: m } = useFirmJobMessage(cert.job_id);
  const ensure = useEnsurePortalLink(m?.customer_id);
  const log = useLogCustomerContact();
  const [sendOpen, setSendOpen] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [repeatOpen, setRepeatOpen] = useState(false);

  const signed = cert.qs?.status === 'approved';
  const done = cert.status === 'completed';
  const remedials = cert.remedials ?? [];
  const label = typeLabel(cert.report_type);

  const message = useMemo(() => {
    const who = greetingName(m?.client || cert.client_name);
    return [
      who ? `Hi ${who},` : 'Hi,',
      '',
      `Your ${label}${cert.installation_address ? ` for ${cert.installation_address}` : ''} is ready.${
        remedials.length ? ` It lists ${remedials.length} item${remedials.length === 1 ? '' : 's'} that need${remedials.length === 1 ? 's' : ''} attention, and we'll send you a quote for those.` : ''
      }`,
      '',
      `You can view and download it here: ${link ?? ''}`,
      '',
      m?.business_name ? `Thanks, ${m.business_name}` : 'Thanks',
    ].join('\n');
  }, [m, cert, label, remedials.length, link]);

  // Stable, or a background refetch would reset what the user typed in the sheet.
  const suggest = useMemo(
    () =>
      cert.next_inspection
        ? {
            frequency: intervalOf(cert.inspection_date, cert.next_inspection),
            nextDue: cert.next_inspection,
            title: `${label} re-test`,
          }
        : null,
    [cert.inspection_date, cert.next_inspection, label]
  );

  if (!done) return null;

  const openSend = async () => {
    if (!m?.customer_id) {
      toast.error('This job has no client record', {
        description: 'Open the job, Edit, and pick the client. Their portal is where the certificate lives.',
      });
      return;
    }
    try {
      const l = await ensure.mutateAsync(null);
      const token = l?.token;
      if (!token) throw new Error('No portal link');
      setLink(portalUrl(token));
      setSendOpen(true);
    } catch (e) {
      toast.error((e as Error).message || 'Could not make the portal link');
    }
  };

  const sent = (channel: 'whatsapp' | 'sms' | 'email' | 'copy') =>
    log.mutate({
      jobId: cert.job_id,
      kind: 'message',
      channel,
      text: `Sent the ${label}${cert.certificate_number ? ` ${cert.certificate_number}` : ''} (portal link)`,
    });

  const go = async (channel: 'whatsapp' | 'sms' | 'email') => {
    const phone = m?.client_phone ?? '';
    const url =
      channel === 'whatsapp'
        ? waLink(phone, message)
        : channel === 'sms'
          ? smsLink(phone, message)
          : `mailto:${m?.client_email ?? ''}?subject=${encodeURIComponent(`Your ${label}`)}&body=${encodeURIComponent(message)}`;
    await openExternalUrl(url);
    sent(channel);
    setSendOpen(false);
  };

  const remedialQuote = () => {
    try {
      sessionStorage.setItem(
        'employer-remedial-lines',
        JSON.stringify(
          remedials.map((o) => ({
            description: `${o.code}: ${o.description || o.item || 'Observation'}`.slice(0, 240),
            note: o.recommendation || undefined,
          }))
        )
      );
    } catch {
      /* the quote still opens, just without the lines */
    }
    const p = new URLSearchParams({
      section: 'quotes',
      new: 'quote',
      job: cert.job_id,
      lines: 'remedial',
      title: `Remedial work from ${label}${cert.certificate_number ? ` ${cert.certificate_number}` : ''}`,
    });
    if (m?.client || cert.client_name) p.set('client', (m?.client || cert.client_name) as string);
    if (cert.installation_address) p.set('address', cert.installation_address);
    if (m?.client_email) p.set('email', m.client_email);
    if (m?.client_phone) p.set('phone', m.client_phone);
    navigate(`/employer?${p.toString()}`);
  };

  return (
    <div data-help="testing.next-steps" className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4 space-y-3">
      <h3 className="text-[15px] font-semibold text-white">Next steps</h3>
      {!signed && cert.qs && (
        <p className="text-[13px] text-white">The customer can download it once the QS has signed it off.</p>
      )}
      <button type="button" className={btn} onClick={openSend} disabled={ensure.isPending || (!!cert.qs && !signed)}>
        <Send className="h-4 w-4 shrink-0 text-elec-yellow" />
        Send it to the customer
      </button>
      {cert.next_inspection && (
        <button type="button" className={btn} onClick={() => setRepeatOpen(true)}>
          <CalendarClock className="h-4 w-4 shrink-0 text-elec-yellow" />
          Book the next inspection ({new Date(`${cert.next_inspection}T12:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })})
        </button>
      )}
      {remedials.length > 0 && (
        <button type="button" className={btn} onClick={remedialQuote}>
          <FileText className="h-4 w-4 shrink-0 text-elec-yellow" />
          Quote for {remedials.length} remedial item{remedials.length === 1 ? '' : 's'}
          <span className="ml-auto text-[12px]">{Array.from(new Set(remedials.map((r) => r.code))).join(', ')}</span>
        </button>
      )}

      <FormSheet
        open={sendOpen}
        onOpenChange={setSendOpen}
        eyebrow="Certificate"
        title={`Send the ${label} to ${greetingName(m?.client || cert.client_name) || 'the customer'}`}
        description="Their client portal link, where they can view and download it. It opens your own WhatsApp, Messages or email."
        width="wide"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
          <pre className="whitespace-pre-wrap rounded-2xl border border-white/[0.12] border-l-[3px] border-l-elec-yellow bg-white/[0.04] px-4 py-3.5 font-sans text-[14px] leading-relaxed text-white">
            {message}
          </pre>
          <div className="grid grid-cols-2 content-start gap-2">
            <button type="button" className={cn(buttonSecondaryCn, 'px-3')} disabled={!m?.client_phone} onClick={() => go('whatsapp')}>
              WhatsApp
            </button>
            <button type="button" className={cn(buttonSecondaryCn, 'px-3')} disabled={!m?.client_phone} onClick={() => go('sms')}>
              Text
            </button>
            <button type="button" className={cn(buttonSecondaryCn, 'px-3')} disabled={!m?.client_email} onClick={() => go('email')}>
              Email
            </button>
            <button
              type="button"
              className={cn(buttonSecondaryCn, 'px-3')}
              onClick={async () => {
                if (await copyToClipboard(message)) {
                  sent('copy');
                  toast.success('Message copied');
                }
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </FormSheet>

      {cert.next_inspection && (
        <MakeRecurringSheet
          open={repeatOpen}
          onOpenChange={setRepeatOpen}
          job={{ id: cert.job_id, title: cert.job_title || label }}
          suggest={suggest}
        />
      )}
    </div>
  );
}
