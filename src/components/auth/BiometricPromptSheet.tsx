/**
 * BiometricPromptSheet.tsx
 *
 * Bottom sheet shown after a successful email/password sign-in on native.
 * Asks the user whether they want to enable biometric login (Face ID / Touch ID / Fingerprint)
 * for faster sign-in next time.
 *
 * Volt sheet (2 Oct 2026): no icon on a tinted tile — a translucent volt box
 * goes muddy brown on this ground — just the question and the two buttons
 * from the certificate footer.
 */

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';

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
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-t border-elec-yellow/35 bg-background p-0"
      >
        <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
            Faster sign-in
          </p>
          <h2 className="mt-1.5 text-[22px] font-bold tracking-tight text-white">
            Use {biometricType} next time?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white">
            Sign in with a glance or a touch instead of typing your password. You can turn it off
            any time in Settings → Account.
          </p>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={onSkip} className={cn(buttonSecondaryCn, 'flex-1')}>
              Not now
            </button>
            <button type="button" onClick={onEnable} className={cn(buttonPrimaryCn, 'flex-[2]')}>
              Turn on {biometricType}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BiometricPromptSheet;
