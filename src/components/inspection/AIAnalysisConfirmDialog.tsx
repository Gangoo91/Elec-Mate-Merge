import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useHaptic } from '@/hooks/useHaptic';

interface AIAnalysisConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  photoUrl: string;
  /** Passed by galleries for future context display; not rendered here yet. */
  inspectorContext: {
    classification?: string;
    itemLocation?: string;
    description?: string;
  };
}

const AIAnalysisConfirmDialog: React.FC<AIAnalysisConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  photoUrl,
}) => {
  const haptic = useHaptic();

  const handleConfirm = () => {
    haptic.light();
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-background border-white/[0.14] rounded-t-2xl"
      >
        <SheetHeader>
          <SheetTitle className="text-white text-left">AI quality assurance</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4">
          <p className="text-[12px] text-white/85">Get a second opinion on this observation</p>

          {/* Photo preview */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.12]">
            <img src={photoUrl} alt="Observation photo" className="h-full w-full object-cover" />
          </div>

          {/* Disclaimer — quiet neutral surface, no icon */}
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <p className="text-[12px] leading-relaxed text-white/85">
              AI provides a second opinion based on visible evidence and BS 7671:2018+A4:2026
              regulations. The final classification decision remains with the inspector.
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onOpenChange(false);
              }}
              className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="h-12 flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
            >
              Analyse
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIAnalysisConfirmDialog;
