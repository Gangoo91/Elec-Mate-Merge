import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  QrCode,
  Copy,
  Download,
  Share2,
  X,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateBriefingQRData } from "@/hooks/useBriefingSignatures";
import { type Briefing } from "@/hooks/useBriefings";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface BriefingQRCodeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: Briefing;
}

export function BriefingQRCode({
  open,
  onOpenChange,
  briefing,
}: BriefingQRCodeProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const signOffUrl = generateBriefingQRData(briefing.id);

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(signOffUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Sign-off link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  // Download QR code as image
  const handleDownloadQR = () => {
    const svg = document.getElementById("briefing-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `briefing-qr-${briefing.id.substring(0, 8)}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));

    toast({
      title: "QR code downloaded",
      description: "Save and print for site display.",
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
    window.open(signOffUrl, "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <QrCode className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">QR Attendance</SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Scan to sign off
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Briefing Info */}
            <div className="p-4 rounded-xl bg-muted/50 mb-6">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                {briefing.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {briefing.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(briefing.date), "dd MMM yyyy")}
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
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center mb-6">
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
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Team members can scan this code to sign off
              </p>
            </div>

            {/* Instructions */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
              <h4 className="font-medium text-foreground mb-2">How to use</h4>
              <ol className="text-sm text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">1</span>
                  Display or print this QR code at the briefing location
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">2</span>
                  Team members scan with their phone camera
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">3</span>
                  They sign with their finger on the sign-off page
                </li>
              </ol>
            </div>

            {/* Link Display */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Sign-off Link</p>
              <p className="text-sm text-foreground font-mono break-all">
                {signOffUrl}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border shrink-0 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="h-11"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadQR}
                className="h-11"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleShare}
                className="h-11"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleOpenLink}
                className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Page
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
