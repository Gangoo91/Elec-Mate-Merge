/**
 * Worker Tools › Confirm apprentice hours.
 *
 * For the people who see the work happen: the apprentice's named workplace
 * supervisor and the team's Supervisors, Project Managers and Apprentice
 * Co-ordinators (Andrew, 6 Oct). Same confirm / send-back as the office's
 * Employer Hub inbox — the server decides who may (can_confirm_otj_for), so
 * this page lists only entries this person can act on. College verification
 * is separate and untouched.
 */
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Check, Loader2, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  useEmployerOtjAttestations,
  useDecideOtjAttestation,
  OTJ_ACTIVITY_LABEL,
  type PendingOtjAttestation,
} from '@/hooks/useEmployerOtjAttestations';
import {
  ListCard,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { WT_APPRENTICE_HOURS_HELP } from '@/components/worker-tools/help/worker-help-2';

const hours = (mins: number) => {
  const h = mins / 60;
  return `${Number.isInteger(h) ? h : h.toFixed(1)} hour${h === 1 ? '' : 's'}`;
};

function EntryCard({ entry, highlighted }: { entry: PendingOtjAttestation; highlighted: boolean }) {
  const decide = useDecideOtjAttestation();
  const [sendingBack, setSendingBack] = useState(false);
  const [reason, setReason] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighted) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlighted]);

  const first = entry.apprenticeName.split(' ')[0] || entry.apprenticeName;
  const busy = decide.isPending;

  const confirm = async () => {
    try {
      await decide.mutateAsync({ entryId: entry.entryId, decision: 'attest' });
      toast.success(
        `Confirmed — ${first}'s ${hours(entry.durationMinutes)} now count as workplace-confirmed`
      );
    } catch (e) {
      toast.error((e as Error).message || 'Could not confirm');
    }
  };

  const sendBack = async () => {
    try {
      await decide.mutateAsync({
        entryId: entry.entryId,
        decision: 'send_back',
        comment: reason.trim(),
      });
      toast.success(`Sent back to ${first} with your note`);
    } catch (e) {
      toast.error((e as Error).message || 'Could not send back');
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        '-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 space-y-3',
        highlighted ? 'border-elec-yellow' : 'border-white/[0.14]'
      )}
    >
      <div>
        <p className="text-[12px] font-medium text-white">
          {entry.apprenticeName} ·{' '}
          {entry.activityDate ? format(parseISO(entry.activityDate), 'EEE d MMM') : ''}
        </p>
        <p className="mt-1 text-[16px] font-semibold text-white">{entry.title}</p>
        <p className="mt-0.5 text-[13px] text-white">
          {hours(entry.durationMinutes)}
          {entry.activityType
            ? ` · ${OTJ_ACTIVITY_LABEL[entry.activityType] ?? entry.activityType}`
            : ''}
        </p>
        {entry.description && (
          <p className="mt-2 text-[14px] text-white leading-relaxed whitespace-pre-wrap">
            {entry.description}
          </p>
        )}
      </div>

      {sendingBack ? (
        <div className="space-y-2">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder={`What does ${first} need to change?`}
            className={textareaClass}
          />
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton onClick={() => setSendingBack(false)} disabled={busy}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={sendBack} disabled={busy || reason.trim().length < 5}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send back'}
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <SecondaryButton
            data-help="wt-otj.send-back"
            onClick={() => setSendingBack(true)}
            disabled={busy}
          >
            <Undo2 className="h-4 w-4 mr-1.5" />
            Send back
          </SecondaryButton>
          <PrimaryButton data-help="wt-otj.confirm" onClick={confirm} disabled={busy}>
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Check className="h-4 w-4 mr-1.5" />
                Confirm
              </>
            )}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

export default function ApprenticeHoursPage() {
  const { data: entries = [], isLoading } = useEmployerOtjAttestations();
  const [searchParams] = useSearchParams();
  const entryParam = searchParams.get('entry');

  return (
    <WorkerToolPage
      eyebrow="Apprentices"
      title="Confirm apprentice hours"
      description="Confirm the off-the-job training you saw happen, or send it back with what needs changing. Their college checks it separately."
      help={WT_APPRENTICE_HOURS_HELP}
    >
      {isLoading ? (
        <LoadingState className="py-10" />
      ) : entries.length === 0 ? (
        <ListCard>
          <EmptyState
            title="Nothing to confirm"
            description="When an apprentice you supervise logs training hours, they appear here and you get a notification."
          />
        </ListCard>
      ) : (
        <div className="space-y-4">
          {entries.map((e) => (
            <EntryCard key={e.entryId} entry={e} highlighted={e.entryId === entryParam} />
          ))}
        </div>
      )}
    </WorkerToolPage>
  );
}
