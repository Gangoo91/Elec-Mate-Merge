import { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { QRCodeSVG } from 'qrcode.react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Copy,
  Download,
  Share2,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
} from 'lucide-react';
import { generateBriefingQRData } from '@/hooks/useBriefingSignatures';
import { type Briefing } from '@/hooks/useBriefings';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  FormCard,
  PrimaryButton,
  SecondaryButton,
} from './editorial';

interface BriefingQRCodeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: Briefing;
}

export function BriefingQRCode({ open, onOpenChange, briefing }: BriefingQRCodeProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const signOffUrl = generateBriefingQRData(briefing.id);

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await copyToClipboard(signOffUrl);
      setCopied(true);
      toast({
        title: 'Link copied',
        description: 'Sign-off link copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy to clipboard.',
        variant: 'destructive',
      });
    }
  };

  // Download QR code as image
  const handleDownloadQR = () => {
    const svg = document.getElementById('briefing-qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `briefing-qr-${briefing.id.substring(0, 8)}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

    toast({
      title: 'QR code downloaded',
      description: 'Save and print for site display.',
    });
  };

  // Share using Web Share API
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Sign-off: ${briefing.title}`,
          text: `Scan to sign off on the briefing: ${briefing.title}`,
          url: signOffUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
  };

  // Open in new tab
  const handleOpenLink = () => {
    openExternalUrl(signOffUrl);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        <SheetShell
          eyebrow="QR attendance"
          title="Scan to sign off"
          description="Display this code at the briefing"
          footer={
            <>
              <SecondaryButton onClick={handleShare} fullWidth>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </SecondaryButton>
              <PrimaryButton onClick={handleOpenLink} fullWidth>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Page
              </PrimaryButton>
            </>
          }
        >
          {/* Briefing Info */}
          <FormCard eyebrow="Briefing">
            <h3 className="font-semibold text-white mb-2 line-clamp-2">{briefing.title}</h3>
            <div className="flex flex-wrap gap-2 text-xs text-white">
              {briefing.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(briefing.date), 'dd MMM yyyy')}
                </span>
              )}
              {briefing.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {briefing.location}
                </span>
              )}
              {briefing.attendee_count !== undefined && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {briefing.attendee_count} attendees
                </span>
              )}
            </div>
          </FormCard>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <QRCodeSVG
                id="briefing-qr-code"
                value={signOffUrl}
                size={200}
                level="H"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <p className="text-sm text-white mt-4 text-center">
              Team members can scan this code to sign off
            </p>
          </div>

          {/* Instructions */}
          <FormCard eyebrow="How to use">
            <ol className="text-sm text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">
                  1
                </span>
                Display or print this QR code at the briefing location
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">
                  2
                </span>
                Team members scan with their phone camera
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">
                  3
                </span>
                They sign with their finger on the sign-off page
              </li>
            </ol>
          </FormCard>

          {/* Link Display */}
          <FormCard eyebrow="Sign-off link">
            <p className="text-sm text-white font-mono break-all">{signOffUrl}</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <SecondaryButton onClick={handleCopyLink} fullWidth size="sm">
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Link'}
              </SecondaryButton>
              <SecondaryButton onClick={handleDownloadQR} fullWidth size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </SecondaryButton>
            </div>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
