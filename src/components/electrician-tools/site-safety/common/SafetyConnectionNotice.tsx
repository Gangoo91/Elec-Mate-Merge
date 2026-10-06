import { useEffect, useRef } from 'react';
import { useMutationState } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

/**
 * No signal on site is normal — plant rooms, basements, rural jobs.
 *
 * Site Safety saves go through React Query mutations, which by default HOLD a
 * save made offline and send it automatically when the connection returns
 * (provided the app stays open). That is the right behaviour, but it was
 * invisible: a "Saving…" button sat there with nothing said. This says, at the
 * top of every Site Safety screen, that there is no signal and how many saves
 * are waiting — and confirms when they have gone through.
 */
export function SafetyConnectionNotice({ online }: { online: boolean }) {
  const waiting = useMutationState({
    filters: { predicate: (m) => m.state.isPaused },
  }).length;

  // When the connection returns and held saves drain, say so once.
  const heldRef = useRef(0);
  useEffect(() => {
    if (!online && waiting > heldRef.current) heldRef.current = waiting;
    if (online && heldRef.current > 0 && waiting === 0) {
      const n = heldRef.current;
      heldRef.current = 0;
      toast({
        title: 'Back online',
        description:
          n === 1
            ? 'The save that was waiting has gone through.'
            : `${n} saves that were waiting have gone through.`,
      });
    }
  }, [online, waiting]);

  if (online && waiting === 0) return null;

  return (
    <div
      role="status"
      className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-orange-500/30 bg-orange-500/10 px-4 py-2.5 text-[12.5px] font-medium text-orange-300"
    >
      {online
        ? `Sending ${waiting} save${waiting === 1 ? '' : 's'} that waited for signal…`
        : waiting > 0
          ? `No signal. ${waiting} save${waiting === 1 ? ' is' : 's are'} waiting and will send when you are back online — keep the app open.`
          : 'No signal. Saves will wait and send when you are back online — keep the app open.'}
    </div>
  );
}
