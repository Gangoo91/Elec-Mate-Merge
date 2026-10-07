/**
 * "Copy last week" (ELE-1820). Anyone still on an open job on last Friday
 * stays on it this week, Monday to Friday. Shows exactly who and what before
 * anything is written; the workers hear about it in the normal batched push.
 */
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Avatar,
  LoadingState,
} from '@/components/employer/editorial';
import { useCopyWeek, dispatchErrorMessage } from '@/hooks/useDispatchBoard';
import { addDaysYmd, initialsOf, rangeLabel } from './dispatchModel';

interface CopyWeekSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Monday of the week being filled. */
  weekStart: string;
}

export function CopyWeekSheet({ open, onOpenChange, weekStart }: CopyWeekSheetProps) {
  const preview = useCopyWeek();
  const apply = useCopyWeek();

  useEffect(() => {
    if (open) preview.mutate({ weekStart, apply: false });
    // Fetch the preview each time the sheet opens for a week.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, weekStart]);

  const rows = preview.data ?? [];
  const friday = addDaysYmd(weekStart, 4);

  const run = async () => {
    try {
      const done = await apply.mutateAsync({ weekStart, apply: true });
      toast.success(`${done.length} ${done.length === 1 ? 'booking' : 'bookings'} carried into this week`, {
        description: 'Everyone affected gets one push in about a minute.',
      });
      onOpenChange(false);
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          eyebrow="Diary"
          title="Copy last week"
          description={`Anyone still on a job at the end of last week stays on it until ${rangeLabel(friday)}. Finished, cancelled and on-hold jobs are left alone.`}
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
              <PrimaryButton
                onClick={run}
                disabled={rows.length === 0 || apply.isPending || preview.isPending}
                className="flex-1"
              >
                {apply.isPending
                  ? 'Copying…'
                  : rows.length
                    ? `Copy ${rows.length} ${rows.length === 1 ? 'booking' : 'bookings'}`
                    : 'Nothing to copy'}
              </PrimaryButton>
            </>
          }
        >
          {preview.isPending ? (
            <LoadingState />
          ) : preview.isError ? (
            <p className="text-[13px] text-white">{dispatchErrorMessage(preview.error)}</p>
          ) : rows.length === 0 ? (
            <p className="text-[13px] text-white leading-relaxed">
              Nobody was on an open job last Friday, so there is nothing to carry over. Book this
              week from the board instead.
            </p>
          ) : (
            <div className="-mx-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {rows.map((r) => (
                <div key={r.assignment_id} className="px-5 py-3 flex items-center gap-3 min-h-[60px]">
                  <Avatar initials={initialsOf(r.name)} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium text-white truncate">{r.name}</div>
                    <div className="text-[12px] text-white truncate">
                      Stays on {r.job_title} until {rangeLabel(r.new_end)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
