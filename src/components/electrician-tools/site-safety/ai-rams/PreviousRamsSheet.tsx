import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useRecentGeneratedRams } from '@/hooks/useRecentGeneratedRams';

/**
 * Pick an earlier RAMS to start from. The copy is a new record for this job;
 * the original is untouched. Lists finished RAMS only — a half-generated one
 * is no starting point.
 */
export function PreviousRamsSheet({
  open,
  onOpenChange,
  onPick,
  busy,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (id: string) => void;
  busy?: boolean;
}) {
  const { data = [], isLoading } = useRecentGeneratedRams(20);
  // Complete only: a partial RAMS is missing half its content, and a copy
  // would hide that gap behind a clean "Draft".
  const finished = data.filter((r) => r.status === 'complete');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex h-full flex-col bg-background">
          <div className="border-b border-white/[0.08] px-4 pb-3 pt-5">
            <h2 className="text-[17px] font-semibold text-white">Start from a previous RAMS</h2>
            <p className="mt-1 text-[12.5px] leading-snug text-white">
              Copies its hazards and method into a new RAMS for this job. The site address and
              emergency contacts are cleared so you set them for this site, then review it before
              issuing.
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <p className="p-6 text-center text-[13px] text-white">Loading your RAMS…</p>
            ) : finished.length === 0 ? (
              <p className="p-6 text-center text-[13px] text-white">
                No finished RAMS yet. Generate one and it will appear here next time.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.08]">
                {finished.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => onPick(r.id)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-3 px-4 py-3 text-left touch-manipulation active:bg-white/[0.06] disabled:opacity-60"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-semibold text-white">
                          {r.title}
                        </span>
                        <span className="block text-[12px] text-white">
                          {new Date(r.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                          {r.issuedVersion ? ` · issued v${r.issuedVersion}` : ' · not issued'}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">
                        {busy ? 'Copying…' : 'Use'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
