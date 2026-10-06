/**
 * WriteSheet — write one entry on the paperwork: pick from chips, or type a
 * figure. A bottom sheet, like the test-results box picker.
 *
 * AM2 plan, round 6 (6 Oct 2026): the circuit details and the certificate's
 * supply details are written by the learner in Practise and Assessment.
 */
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';

export interface WriteTarget {
  title: string;
  description?: string;
  value: string;
  options?: string[];
  unit?: string;
  /** A figure to type as well as (or instead of) chips. */
  numeric?: boolean;
  onWrite: (value: string) => void;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

export function WriteSheet({
  target,
  onClose,
}: {
  target: WriteTarget | null;
  onClose: () => void;
}) {
  const [typed, setTyped] = useState('');
  useEffect(() => setTyped(target?.value ?? ''), [target]);
  const write = (v: string) => {
    target?.onWrite(v);
    onClose();
  };
  return (
    <Sheet open={!!target} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl p-0">
        {target && (
          <div className="space-y-4 bg-[hsl(0_0%_13%)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
            <div>
              <SheetTitle className="text-[18px] font-bold text-white">{target.title}</SheetTitle>
              <SheetDescription className="text-[13px] text-white">
                {target.description ?? 'Write what goes in this box.'}
              </SheetDescription>
            </div>
            {target.options && (
              <div className="flex flex-wrap gap-2">
                {target.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => write(o)}
                    aria-pressed={target.value === o}
                    className={cn(
                      'min-h-[44px] rounded-xl border px-3.5 font-mono text-[14px] touch-manipulation',
                      target.value === o
                        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                    )}
                  >
                    {o}
                    {target.unit && o !== 'N/A' ? ` ${target.unit}` : ''}
                  </button>
                ))}
              </div>
            )}
            {target.numeric && (
              <form
                className="flex items-end gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  write(typed.trim());
                }}
              >
                <label className="min-w-0 flex-1">
                  <span className="mb-1 block text-[12px] font-medium text-white">
                    {target.options ? 'Or type it' : 'Type it'}
                    {target.unit ? ` (${target.unit})` : ''}
                  </span>
                  <input
                    inputMode="decimal"
                    autoFocus={!target.options}
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    className={inputCn}
                  />
                </label>
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-bold text-black touch-manipulation"
                >
                  Write it
                </button>
              </form>
            )}
            <button
              type="button"
              onClick={() => write('')}
              className="min-h-[44px] w-full rounded-xl border border-white/[0.18] px-4 text-left text-[13.5px] font-semibold text-white touch-manipulation"
            >
              Clear this box
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default WriteSheet;
