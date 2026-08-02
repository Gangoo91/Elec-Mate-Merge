import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useHaptic } from '@/hooks/useHaptic';

interface StartNewEICRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDuplicate?: () => void;
  hasUnsavedChanges: boolean;
}

/** Start-new decision sheet — shared by the MW / EIC / EICR shells.
 * Bottom sheet (not a centred modal) so it's reachable one-handed. */
const StartNewEICRDialog = ({
  isOpen,
  onClose,
  onConfirm,
  onDuplicate,
  hasUnsavedChanges,
}: StartNewEICRDialogProps) => {
  const haptic = useHaptic();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-white/[0.14] bg-background p-0"
      >
        <div className="px-4 pb-6 pt-4 sm:px-6">
          <SheetHeader className="text-left">
            <SheetTitle className="text-base font-bold text-white">
              Start a new report
            </SheetTitle>
          </SheetHeader>

          {hasUnsavedChanges && (
            <p className="mt-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-2.5 text-[13px] leading-relaxed text-orange-300">
              You have unsaved changes — they'll sync automatically, but check the
              save word in the header before you switch.
            </p>
          )}

          <div className="mt-4 space-y-2.5">
            {onDuplicate && (
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  onDuplicate();
                }}
                className="w-full rounded-xl border border-white/[0.12] bg-white/[0.06] p-4 text-left touch-manipulation transition-transform active:scale-[0.99]"
              >
                <span className="block text-sm font-semibold text-white">
                  Duplicate this report
                </span>
                <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white/85">
                  Keeps all data under a new certificate number — ideal for similar
                  properties or repeat inspections.
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                haptic.medium();
                onConfirm();
              }}
              className="w-full rounded-xl border border-white/[0.12] bg-white/[0.06] p-4 text-left touch-manipulation transition-transform active:scale-[0.99]"
            >
              <span className="block text-sm font-semibold text-white">Start fresh</span>
              <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white/85">
                Clears every field and begins a completely new report.
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white touch-manipulation transition-transform active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StartNewEICRDialog;
