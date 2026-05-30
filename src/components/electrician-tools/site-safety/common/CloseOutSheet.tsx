/**
 * CloseOutSheet — generic type-aware close-out ceremony.
 *
 * Shared across Site Safety modules that "close" a record (permits, isolation
 * re-energisation, fire watch, etc.). Pass the checklist items + a closer name;
 * the primary action is blocked until every item is ticked and a name is entered.
 * Manages its own tick state, reset each time it opens.
 */

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Eyebrow, Field, PrimaryButton, SecondaryButton, inputClass } from '@/components/college/primitives';

interface CloseOutSheetProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  items: string[];
  closerName: string;
  onCloserNameChange: (v: string) => void;
  onConfirm: () => void;
  isPending?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  nameLabel?: string;
}

export function CloseOutSheet({
  open,
  onOpenChange,
  items,
  closerName,
  onCloserNameChange,
  onConfirm,
  isPending,
  eyebrow = 'Close-out',
  title = 'Confirm the area is safe',
  description = 'Tick each item before closing this record.',
  confirmLabel = 'Close record',
  nameLabel = 'Closed by',
}: CloseOutSheetProps) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  // Reset ticks each time the sheet opens.
  useEffect(() => {
    if (open) setChecks({});
  }, [open]);

  const allChecked = items.every((i) => checks[i]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[88vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
        <div className="bg-[hsl(0_0%_8%)] p-5 space-y-4 overflow-y-auto">
          <div className="flex justify-center pt-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h3 className="mt-1 text-[18px] font-semibold text-white">{title}</h3>
            <p className="mt-1 text-[12.5px] text-white/60">{description}</p>
          </div>
          <div className="space-y-2">
            {items.map((item) => {
              const checked = !!checks[item];
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setChecks((c) => ({ ...c, [item]: !c[item] }))}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation transition-colors',
                    checked ? 'bg-emerald-500/[0.06] border-emerald-500/25' : 'bg-[hsl(0_0%_10%)] border-white/[0.08]'
                  )}
                >
                  <span
                    className={cn(
                      'h-5 w-5 rounded-full border flex items-center justify-center shrink-0 text-[11px] leading-none',
                      checked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/25 text-transparent'
                    )}
                  >
                    ✓
                  </span>
                  <span className="text-[12.5px] text-white/90">{item}</span>
                </button>
              );
            })}
          </div>
          <Field label={nameLabel}>
            <input
              value={closerName}
              onChange={(e) => onCloserNameChange(e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </Field>
          <div className="flex gap-2 pb-[env(safe-area-inset-bottom)]">
            <PrimaryButton fullWidth disabled={isPending || !closerName.trim() || !allChecked} onClick={onConfirm}>
              {isPending ? 'Closing…' : confirmLabel}
            </PrimaryButton>
            <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CloseOutSheet;
