import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  Copy,
  X,
  QrCode,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Loader2,
  Settings,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Briefing } from "@/hooks/useBriefings";
import { generateBriefingQRData } from "@/hooks/useBriefingSignatures";
import {
  useSendToTeams,
  useCopyBriefingLink,
  useShareBriefing,
  useSaveTeamsWebhook,
  useTeamsWebhook,
} from "@/hooks/useBriefingDistribution";

interface BriefingDistributionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: Briefing;
  onShowQR?: () => void;
}

export function BriefingDistribution({
  open,
  onOpenChange,
  briefing,
  onShowQR,
}: BriefingDistributionProps) {
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);
  const [webhookInput, setWebhookInput] = useState("");

  const signOffUrl = generateBriefingQRData(briefing.id);

  const { copyLink, copied } = useCopyBriefingLink();
  const { share } = useShareBriefing();
  const sendToTeams = useSendToTeams();
  const saveWebhook = useSaveTeamsWebhook();
  const { data: savedWebhook } = useTeamsWebhook();

  const handleCopy = () => copyLink(briefing.id);
  const handleShare = () => share(briefing);

  const handleSendToTeams = () => {
    if (!savedWebhook) {
      setShowWebhookConfig(true);
      return;
    }
    sendToTeams.mutate({ briefing, webhookUrl: savedWebhook });
  };

  const handleSaveWebhook = () => {
    if (webhookInput.trim()) {
      saveWebhook.mutate(webhookInput.trim());
      setShowWebhookConfig(false);
      setWebhookInput("");
    }
  };

  const handleOpenLink = () => {
    window.open(signOffUrl, "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl p-0">
        <div className="flex flex-col">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10">
                  <Share2 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">Share Briefing</SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {briefing.title}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0 touch-manipulation"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Link Display */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Sign-off Link</p>
              <p className="text-sm text-foreground font-mono break-all">
                {signOffUrl}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="h-14 flex flex-col items-center justify-center gap-1 touch-manipulation"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                <span className="text-xs">{copied ? "Copied!" : "Copy Link"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={onShowQR}
                className="h-14 flex flex-col items-center justify-center gap-1 touch-manipulation"
              >
                <QrCode className="h-5 w-5" />
                <span className="text-xs">QR Code</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="h-14 flex flex-col items-center justify-center gap-1 touch-manipulation"
              >
                <Share2 className="h-5 w-5" />
                <span className="text-xs">Share</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleOpenLink}
                className="h-14 flex flex-col items-center justify-center gap-1 touch-manipulation"
              >
                <ExternalLink className="h-5 w-5" />
                <span className="text-xs">Open Page</span>
              </Button>
            </div>

            {/* Microsoft Teams */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Microsoft Teams</span>
                </div>
                {savedWebhook && (
                  <Badge variant="outline" className="text-xs text-green-400 border-green-500/30">
                    Connected
                  </Badge>
                )}
              </div>

              {showWebhookConfig ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Teams Incoming Webhook URL
                    </Label>
                    <Input
                      value={webhookInput}
                      onChange={(e) => setWebhookInput(e.target.value)}
                      placeholder="https://outlook.office.com/webhook/..."
                      className="h-11 mt-1 text-sm touch-manipulation"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Create an Incoming Webhook connector in your Teams channel
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowWebhookConfig(false)}
                      className="flex-1 h-11 touch-manipulation"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveWebhook}
                      disabled={!webhookInput.trim() || saveWebhook.isPending}
                      className="flex-1 h-11 touch-manipulation"
                    >
                      {saveWebhook.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedWebhook ? (
                    <Button
                      onClick={handleSendToTeams}
                      disabled={sendToTeams.isPending}
                      className="w-full h-11 bg-purple-600 hover:bg-purple-700"
                    >
                      {sendToTeams.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send to Teams Channel
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setShowWebhookConfig(true)}
                      className="w-full h-11"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Teams Webhook
                    </Button>
                  )}

                  {sendToTeams.isError && (
                    <div className="flex items-center gap-2 p-2 rounded bg-red-500/10 border border-red-500/20">
                      <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                      <p className="text-xs text-red-400">
                        {sendToTeams.error.message}
                      </p>
                    </div>
                  )}

                  {sendToTeams.isSuccess && (
                    <div className="flex items-center gap-2 p-2 rounded bg-green-500/10 border border-green-500/20">
                      <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                      <p className="text-xs text-green-400">
                        Notification sent to Teams successfully!
                      </p>
                    </div>
                  )}

                  {savedWebhook && (
                    <Button
                      variant="ghost"
                      onClick={() => setShowWebhookConfig(true)}
                      className="w-full h-11 text-xs text-muted-foreground touch-manipulation"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Update Webhook URL
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">How to distribute:</strong> Share the link or
                QR code with your team. They can scan it with their phone camera to sign off on the
                briefing instantly.
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
