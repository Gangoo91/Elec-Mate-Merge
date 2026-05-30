/**
 * RemoteSignShareSheet — shared bottom sheet for sending a remote sign-off link.
 * Used by any module wiring the generic remote-sign engine (useRemoteSignToken).
 */

import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Eyebrow, PrimaryButton, SecondaryButton } from '@/components/college/primitives';

export function RemoteSignShareSheet({
  open,
  onOpenChange,
  url,
  roleLabel = 'sign-off',
  expiryDays = 7,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  url: string;
  roleLabel?: string;
  expiryDays?: number;
}) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied');
    } catch {
      toast.error('Copy failed');
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Sign-off request', url });
      } catch {
        /* cancelled */
      }
    } else {
      copy();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
        <div className="bg-[hsl(0_0%_8%)] p-5 space-y-4">
          <div className="flex justify-center pt-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>
          <div>
            <Eyebrow>Remote sign-off</Eyebrow>
            <h3 className="mt-1 text-[18px] font-semibold text-white">Send for {roleLabel}</h3>
            <p className="mt-1 text-[12.5px] text-white/60">
              They open this on their phone, review the document and sign. The link expires in {expiryDays} days.
            </p>
          </div>
          <div className="px-3 py-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08] text-[12px] text-white/70 break-all">
            {url}
          </div>
          <div className="flex gap-2 pb-[env(safe-area-inset-bottom)]">
            <PrimaryButton fullWidth onClick={share}>
              Share link
            </PrimaryButton>
            <SecondaryButton onClick={copy}>Copy</SecondaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default RemoteSignShareSheet;
