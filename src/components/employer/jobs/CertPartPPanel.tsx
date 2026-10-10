/**
 * Part P on a certificate's sheet in Jobs › Testing (ELE-2084).
 *
 * The office sees and manages the Part P notification of every certificate
 * on its jobs; the electrician who made it can mark it submitted too (from
 * here or their own Notifications page, both write the same row). Notifiable
 * work in a dwelling is notified through the competent person scheme within
 * 30 days of completion (Building Regulations 2010, regulation 20(3)).
 */
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import { formatUKDate } from '@/utils/collegeHelpers';
import { PrimaryButton, SecondaryButton, inputClass } from '@/components/employer/editorial';
import { StatusPill, type PillTone } from '@/components/employer/pageParts/PageParts';
import {
  PART_P_LABEL,
  uploadSchemeCertificate,
  useSetCertPartP,
  type FirmPartPRow,
  type PartPState,
} from '@/hooks/useFirmPartP';

const MAX_BYTES = 15 * 1024 * 1024; // the scheme-certificates bucket limit

export const partPTone = (s: PartPState): PillTone =>
  s === 'overdue' ? 'red' : s === 'needed' ? 'volt' : s === 'submitted' ? 'green' : 'neutral';

const daysTo = (iso: string) => {
  const a = new Date();
  a.setHours(0, 0, 0, 0);
  const b = new Date(`${iso.slice(0, 10)}T00:00:00`);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
};

/** "Notify by 3 Nov (in 12 days)" / "Was due 3 Nov" / "Notified 1 Nov, ref NAP123". */
export function partPLine(row: FirmPartPRow): string {
  const n = row.notification;
  if (row.state === 'submitted') {
    const when = n?.submitted_at ? ` ${formatUKDate(n.submitted_at)}` : '';
    return `Notified${when}${n?.reference ? `, ref ${n.reference}` : ', no scheme reference yet'}.`;
  }
  if (row.state === 'not_required') return 'Not notifiable work.';
  if (row.state === 'not_yet') return 'The certificate is not finished yet.';
  if (row.state === 'unknown')
    return 'The certificate does not say whether the work is notifiable.';
  if (!row.deadline) return 'Notify the scheme within 30 days of completion.';
  const d = daysTo(row.deadline);
  if (d < 0)
    return `Was due ${formatUKDate(row.deadline)}, ${-d} ${d === -1 ? 'day' : 'days'} late.`;
  if (d === 0) return 'Notify the scheme today.';
  return `Notify the scheme by ${formatUKDate(row.deadline)} (in ${d} ${d === 1 ? 'day' : 'days'}).`;
}

export function CertPartPPanel({
  row,
  className,
}: {
  row: FirmPartPRow | undefined;
  className?: string;
}) {
  const set = useSetCertPartP();
  const fileRef = useRef<HTMLInputElement>(null);
  const [reference, setReference] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setReference(row?.notification?.reference ?? '');
  }, [row?.report_uuid, row?.notification?.reference]);

  if (!row) return null;
  const n = row.notification;
  const run = async (input: Parameters<typeof set.mutateAsync>[0], done: string) => {
    try {
      await set.mutateAsync(input);
      toast({ title: done });
    } catch (e) {
      toast({
        title: 'Could not save it',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > MAX_BYTES) {
      toast({
        title: 'That file is too large',
        description: 'Keep it under 15MB.',
        variant: 'destructive',
      });
      return;
    }
    setBusy(true);
    try {
      const url = await uploadSchemeCertificate(row.report_id, file);
      await set.mutateAsync({
        reportUuid: row.report_uuid,
        certificateUrl: url,
        certificateName: file.name,
      });
      toast({ title: 'Scheme certificate attached' });
    } catch (err) {
      toast({
        title: 'Could not attach it',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const open = row.state === 'needed' || row.state === 'overdue' || row.state === 'unknown';
  const refChanged = reference.trim() !== (n?.reference ?? '');

  return (
    <div className={cn('space-y-3', className)} data-help="testing.partp">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-white">Part P</h3>
        <StatusPill tone={partPTone(row.state)}>{PART_P_LABEL[row.state]}</StatusPill>
      </div>
      <p className={cn('text-[13px] text-white', row.state === 'overdue' && 'font-semibold')}>
        {partPLine(row)}
      </p>

      {row.state !== 'not_required' && row.state !== 'not_yet' && (
        <div className="space-y-1.5">
          <label
            className="block text-[12px] font-medium text-white"
            htmlFor={`pp-ref-${row.report_uuid}`}
          >
            Scheme notification reference
          </label>
          <div className="flex items-center gap-2">
            <input
              id={`pp-ref-${row.report_uuid}`}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. the scheme's job number"
              className={cn(inputClass, 'min-w-0 flex-1')}
            />
            {refChanged && (
              <SecondaryButton
                disabled={set.isPending}
                onClick={() =>
                  run(
                    { reportUuid: row.report_uuid, reference: reference.trim() },
                    'Reference saved'
                  )
                }
              >
                Save
              </SecondaryButton>
            )}
          </div>
        </div>
      )}

      {n?.certificate_url ? (
        <SecondaryButton fullWidth onClick={() => openExternalUrl(n.certificate_url!)}>
          <ExternalLink className="mr-2 h-4 w-4" />
          {n.certificate_name ? `Open ${n.certificate_name}` : 'Open the scheme certificate'}
        </SecondaryButton>
      ) : (
        row.state === 'submitted' && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={pick}
            />
            <SecondaryButton fullWidth disabled={busy} onClick={() => fileRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              {busy ? 'Attaching' : 'Attach the scheme certificate'}
            </SecondaryButton>
          </>
        )
      )}

      {open && (
        <div className="flex flex-col gap-2">
          <PrimaryButton
            fullWidth
            disabled={set.isPending}
            onClick={() =>
              run(
                {
                  reportUuid: row.report_uuid,
                  action: 'submitted',
                  ...(refChanged ? { reference: reference.trim() } : {}),
                },
                'Marked as notified'
              )
            }
          >
            Mark notified to the scheme
          </PrimaryButton>
          <SecondaryButton
            fullWidth
            disabled={set.isPending}
            onClick={() =>
              run({ reportUuid: row.report_uuid, action: 'not_required' }, 'Marked not notifiable')
            }
          >
            Not notifiable work
          </SecondaryButton>
        </div>
      )}
      {(row.state === 'submitted' || (row.state === 'not_required' && n)) && (
        <button
          type="button"
          disabled={set.isPending}
          onClick={() => run({ reportUuid: row.report_uuid, action: 'reopen' }, 'Reopened')}
          className="h-11 px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
        >
          Reopen
        </button>
      )}
      <p className="text-[12px] text-white">
        In England and Wales, notifiable work in a home is notified within 30 days of completion
        (NAPIT asks for 21). The electrician sees the same status on their certificate.
      </p>
    </div>
  );
}
