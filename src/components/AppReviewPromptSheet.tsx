/**
 * AppReviewPromptSheet.tsx
 *
 * Bottom sheet shown after positive moments on native (cert generated, quote sent).
 * Asks nicely before triggering the native App Store / Google Play review dialog.
 * Styled to match BiometricPromptSheet.
 */

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface AppReviewPromptSheetProps {
  open: boolean;
  onRate: () => void;
  onDismiss: () => void;
}

const AppReviewPromptSheet = ({ open, onRate, onDismiss }: AppReviewPromptSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onDismiss()}>
      <SheetContent side="bottom" className="rounded-t-2xl p-0 border-t border-white/10">
        <div className="flex flex-col items-center px-6 pt-8 pb-10 gap-5">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-elec-yellow/15 flex items-center justify-center">
            <Star className="h-8 w-8 text-elec-yellow fill-elec-yellow/30" />
          </div>

          {/* Title + description */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-white">Enjoying Elec-Mate?</h2>
            <p className="text-[15px] text-white leading-relaxed max-w-[300px]">
              It would mean the world to us if you could spare 30 seconds to leave a rating. It
              helps other electricians and apprentices find us.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3 mt-1">
            <Button
              onClick={onRate}
              className="w-full h-13 rounded-2xl text-[16px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation"
            >
              Sure, happy to
            </Button>
            <Button
              variant="outline"
              onClick={onDismiss}
              className="w-full h-13 rounded-2xl text-[15px] font-medium bg-transparent border-2 border-white/10 text-white hover:bg-white/5 touch-manipulation"
            >
              Not Now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppReviewPromptSheet;
