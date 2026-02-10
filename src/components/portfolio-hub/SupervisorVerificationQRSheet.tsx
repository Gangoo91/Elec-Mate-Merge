/**
 * SupervisorVerificationQRSheet
 *
 * 85vh bottom sheet showing QR code and link for supervisor verification.
 * Pattern copied from BriefingQRCode.tsx.
 */

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  Copy,
  Download,
  Share2,
  X,
  Calendar,
  ExternalLink,
  CheckCircle,
  User,
  Clock,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { SupervisorVerification } from '@/hooks/portfolio/useSupervisorVerification';

interface SupervisorVerificationQRSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verification: SupervisorVerification | null;
  verificationUrl: string;
  evidenceTitle?: string;
}

export function SupervisorVerificationQRSheet({
  open,
  onOpenChange,
  verification,
  verificationUrl,
  evidenceTitle,
}: SupervisorVerificationQRSheetProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const isVerified = !!verification?.verified_at;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopied(true);
      toast({
        title: 'Link copied',
        description: 'Verification link copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('verification-qr-code');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const img = new Image();
    const svgBlob = new Blob([new XMLSerializer().serializeToString(svg)], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 400);
      ctx.drawImage(img, 0, 0, 400, 400);
      URL.revokeObjectURL(url);

      const link = document.createElement('a');
      link.download = `verification-qr-${verification?.verification_token || 'code'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = url;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Verify My Evidence — Elec-Mate',
          text: `Please verify my portfolio evidence: ${evidenceTitle || 'Evidence'}`,
          url: verificationUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopyLink();
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `Please verify my evidence — ${evidenceTitle || 'Portfolio Evidence'}`
    );
    const body = encodeURIComponent(
      `Hi,\n\nCould you please verify the following portfolio evidence for me?\n\n${verificationUrl}\n\nIt only takes 15 seconds — no account needed.\n\nThank you!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi! Could you please verify my portfolio evidence? It only takes 15 seconds, no account needed:\n\n${verificationUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                Supervisor Verification
              </SheetTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-muted touch-manipulation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {/* Evidence title */}
            {evidenceTitle && (
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <p className="text-xs text-white/40 mb-1">Evidence</p>
                <p className="text-sm font-medium text-foreground">
                  {evidenceTitle}
                </p>
                {verification && (
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Expires{' '}
                      {new Date(verification.expires_at).toLocaleDateString(
                        'en-GB',
                        { day: 'numeric', month: 'short' }
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      Views: {verification.view_count}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Verified status */}
            {isVerified ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">
                    Verified by {verification?.supervisor_name}
                  </p>
                  {verification?.supervisor_company && (
                    <p className="text-xs text-white/40 mt-0.5">
                      {verification.supervisor_company}
                    </p>
                  )}
                  <p className="text-xs text-white/30 mt-1">
                    {verification?.verified_at &&
                      new Date(verification.verified_at).toLocaleDateString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                  </p>
                </div>
                {verification?.feedback_text && (
                  <div className="p-3 rounded-lg bg-white/5 text-sm text-white/70 text-left">
                    "{verification.feedback_text}"
                  </div>
                )}
                {verification?.verification_hash && (
                  <p className="text-[9px] text-white/20 font-mono break-all">
                    Hash: {verification.verification_hash}
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="bg-white rounded-2xl p-4">
                    <QRCodeSVG
                      id="verification-qr-code"
                      value={verificationUrl}
                      size={200}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>

                {/* Link display */}
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                  <p className="text-xs text-white/40 mb-1">
                    Verification Link
                  </p>
                  <p className="text-xs text-white/60 font-mono break-all">
                    {verificationUrl}
                  </p>
                </div>

                {/* Instructions */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    How It Works
                  </p>
                  <div className="space-y-2">
                    {[
                      'Show your supervisor the QR code or send the link',
                      'They review the evidence — no account needed',
                      'They confirm, sign, and submit in 15 seconds',
                      'You receive a tamper-evident verified badge',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-white/60">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer actions */}
          {!isVerified && (
            <div className="px-5 py-4 border-t border-border space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="h-11 touch-manipulation"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 mr-1.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1.5" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmail}
                  className="h-11 touch-manipulation"
                >
                  <Mail className="h-4 w-4 mr-1.5" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWhatsApp}
                  className="h-11 touch-manipulation"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  WhatsApp
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadQR}
                  className="h-11 touch-manipulation"
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  QR
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="h-11 touch-manipulation"
                >
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 touch-manipulation text-white/60"
                  onClick={() => window.open(verificationUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1.5" />
                  Open
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SupervisorVerificationQRSheet;
