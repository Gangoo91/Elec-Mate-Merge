/**
 * BiometricPromptSheet.tsx
 *
 * Bottom sheet shown after a successful email/password sign-in on native.
 * Asks the user whether they want to enable biometric login (Face ID / Touch ID / Fingerprint)
 * for faster sign-in next time.
 */

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';

interface BiometricPromptSheetProps {
  open: boolean;
  biometricType: string; // "Face ID" | "Touch ID" | "Fingerprint" etc.
  onEnable: () => void;
  onSkip: () => void;
}

const BiometricPromptSheet = ({
  open,
  biometricType,
  onEnable,
  onSkip,
}: BiometricPromptSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onSkip()}>
      <SheetContent side="bottom" className="rounded-t-2xl p-0 border-t border-white/10">
        <div className="flex flex-col items-center px-6 pt-8 pb-10 gap-5">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-elec-yellow/15 flex items-center justify-center">
            <Fingerprint className="h-8 w-8 text-elec-yellow" />
          </div>

          {/* Title + description */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-white">Enable {biometricType}?</h2>
            <p className="text-[15px] text-white leading-relaxed max-w-[280px]">
              Sign in faster next time without typing your password.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3 mt-1">
            <Button
              onClick={onEnable}
              className="w-full h-13 rounded-2xl text-[16px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation"
            >
              Enable {biometricType}
            </Button>
            <Button
              variant="outline"
              onClick={onSkip}
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

export default BiometricPromptSheet;
