import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { leaveOutAppLearning, undoAppLearningDecision } from '@/hooks/useOtjSummary';

/**
 * A tutor judges app learning as well as approving it. Leaving a day out
 * records the tutor's decision and reason (the learner sees it) and takes the
 * time out of the count. Reasons follow the funding rules, paras 77–79.
 */
const QUICK_REASONS = [
  'Outside normal working hours, and not agreed or paid back',
  'Not relevant to this apprenticeship',
  'Already counted in a college session',
];

export function LeaveOutSheet({
  open,
  onOpenChange,
  userId,
  learnerName,
  dayLabel,
  minutesLabel,
  timeEntryIds,
  onDone,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  userId: string;
  learnerName: string;
  dayLabel: string;
  minutesLabel: string;
  timeEntryIds: string[];
  onDone: () => void;
}) {
  const { toast } = useToast();
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setReason('');
  }, [open]);

  const submit = async () => {
    if (saving || reason.trim().length < 5) return;
    setSaving(true);
    const res = await leaveOutAppLearning(userId, timeEntryIds, reason.trim());
    setSaving(false);
    if (res.error || !res.success) {
      toast({
        title: 'Not left out',
        description: res.error ?? 'Try again.',
        variant: 'destructive',
      });
      return;
    }
    const ids = res.entry_ids ?? [];
    toast({
      title: `${minutesLabel} left out`,
      description: `${learnerName} sees your reason on their hours page.`,
      duration: 8000,
      action: ids.length
        ? {
            label: 'Undo',
            onClick: () => {
              void undoAppLearningDecision(ids).then((ok) => {
                if (ok) onDone();
              });
            },
          }
        : undefined,
    });
    onDone();
    onOpenChange(false);
  };

  return (
    <FormSheet
      width="wide"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Leave out of the count"
      title={`${dayLabel} · ${minutesLabel}`}
      description={`This time stops counting towards ${learnerName}'s off-the-job hours. Your name and reason are recorded.`}
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={saving || reason.trim().length < 5}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : 'Leave out'}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {QUICK_REASONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setReason(r)}
              aria-pressed={reason === r}
              className={cn(
                'min-h-11 rounded-xl border px-3.5 py-2 text-left text-[13px] leading-snug touch-manipulation',
                reason === r
                  ? 'border-white bg-white font-semibold text-black'
                  : 'border-white/[0.14] text-white active:bg-white/[0.06]'
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <div>
          <label className={labelCn} htmlFor="leave-out-reason">
            Reason
          </label>
          <textarea
            id="leave-out-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={cn(textareaCn, 'w-full resize-none')}
          />
        </div>
      </div>
    </FormSheet>
  );
}
