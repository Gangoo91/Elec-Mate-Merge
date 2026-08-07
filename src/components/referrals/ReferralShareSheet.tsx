/**
 * ReferralShareSheet
 * Reusable bottom sheet for sharing referral links.
 * Appears at viral trigger points (post-cert, post-quote, milestones, etc.)
 */

import React, { useRef, useCallback } from 'react';
import { Drawer } from 'vaul';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useReferralShare } from '@/hooks/useReferralShare';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Share2, Download, QrCode } from 'lucide-react';

// WhatsApp brand colour icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ReferralShareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headline?: string;
  subline?: string;
  context?: string;
}

const ReferralShareSheet: React.FC<ReferralShareSheetProps> = ({
  open,
  onOpenChange,
  headline = 'Refer a Mate',
  // Both sides are rewarded: the mate gets a 100%-off first month applied at
  // Stripe checkout (create-checkout), the referrer gets a balance credit.
  // ⚠️ Both mechanisms are Stripe-only — neither fires for App Store / Play
  // Store billing. See process-referral-reward.
  subline = 'Free month for them. Free month for you.',
  context = 'manual',
}) => {
  const { referralCode, referralUrl, shareViaWhatsApp, copyLink, shareNative, trackQrShare } =
    useReferralShare({ context });
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownloadQr = useCallback(async () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg || !referralUrl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 40;
    const size = 400;
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2 + 60;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, padding, padding, size, size);
      ctx.fillStyle = '#1a1a2e';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Try Elec-Mate Free', canvas.width / 2, canvas.height - 55);
      ctx.font = '14px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Scan for a free month', canvas.width / 2, canvas.height - 30);

      const link = document.createElement('a');
      link.download = `elec-mate-referral-${referralCode}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;

    await trackQrShare();
  }, [referralCode, referralUrl, trackQrShare]);

  if (!referralCode || !referralUrl) return null;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false} noBodyStyles>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        {/* Flush bottom sheet on phones; a centred, floating card from sm: up —
            it used to stretch the full width of a desktop window, which left the
            QR marooned in the middle of a very wide, very empty panel. */}
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92vh] w-full max-w-[460px] flex-col rounded-t-[20px] border-t border-white/[0.08] bg-background sm:bottom-5 sm:max-h-[86vh] sm:rounded-[22px] sm:border sm:shadow-2xl sm:shadow-black/60">
          {/* Drag handle — phones only; there's nothing to drag on desktop */}
          <div className="flex justify-center pb-1.5 pt-3 sm:hidden">
            <div className="h-1.5 w-12 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-5 pb-4 pt-2 sm:pt-5">
            <div className="min-w-0">
              <Drawer.Title className="text-[17px] font-semibold leading-snug text-white">
                {headline}
              </Drawer.Title>
              <p className="mt-1 text-[13px] leading-snug text-white">{subline}</p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full hover:bg-white/[0.08]"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {/* QR — yellow ring ties it to the campaign card */}
            <div className="flex flex-col items-center">
              <div
                ref={qrRef}
                className="rounded-2xl bg-white p-3 shadow-xl shadow-black/40 ring-2 ring-elec-yellow/70"
              >
                <QRCodeSVG
                  value={referralUrl}
                  size={132}
                  bgColor="#ffffff"
                  fgColor="#0A0A0A"
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <QrCode className="h-4 w-4 text-elec-yellow" />
                <span className="text-[15px] font-bold tracking-wide text-white">
                  {referralCode}
                </span>
              </div>
              <p className="mt-1 text-center text-[12px] leading-snug text-white">
                For business cards, van stickers or site boards
              </p>
            </div>

            {/* Share URL */}
            <button
              onClick={copyLink}
              className="mt-5 flex w-full touch-manipulation items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 transition-all active:scale-[0.99] active:bg-white/[0.08]"
            >
              <span className="flex-1 truncate text-left font-mono text-[12px] text-white">
                {referralUrl}
              </span>
              <Copy className="h-4 w-4 shrink-0 text-white" />
            </button>
          </div>

          {/* Action buttons — extra padding clears the iPhone home indicator */}
          <div className="space-y-3 border-t border-white/[0.06] bg-background/80 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] backdrop-blur-sm sm:pb-5">
            {/* Primary: WhatsApp */}
            <Button
              onClick={() => {
                shareViaWhatsApp();
                onOpenChange(false);
              }}
              className={cn(
                'w-full h-14 rounded-2xl text-[16px] font-semibold',
                'bg-[#25D366] hover:bg-[#25D366]/90 text-white',
                'shadow-lg shadow-[#25D366]/25 transition-all duration-200',
                'touch-manipulation active:scale-[0.98]'
              )}
            >
              <WhatsAppIcon />
              <span className="ml-2">Share via WhatsApp</span>
            </Button>

            {/* Secondary row */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={copyLink}
                className="h-12 touch-manipulation rounded-xl border-white/[0.15] bg-transparent text-white hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
              >
                <Copy className="h-4 w-4 mr-1.5" />
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadQr}
                className="h-12 touch-manipulation rounded-xl border-white/[0.15] bg-transparent text-white hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
              >
                <Download className="h-4 w-4 mr-1.5" />
                QR
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  shareNative();
                  onOpenChange(false);
                }}
                className="h-12 touch-manipulation rounded-xl border-white/[0.15] bg-transparent text-white hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
              >
                <Share2 className="h-4 w-4 mr-1.5" />
                Share
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ReferralShareSheet;
