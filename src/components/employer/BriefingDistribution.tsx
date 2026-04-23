import { useState } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Share2,
  Copy,
  QrCode,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Loader2,
  Settings,
  AlertCircle,
} from 'lucide-react';
import { type Briefing } from '@/hooks/useBriefings';
import { generateBriefingQRData } from '@/hooks/useBriefingSignatures';
import {
  useSendToTeams,
  useCopyBriefingLink,
  useShareBriefing,
  useSaveTeamsWebhook,
  useTeamsWebhook,
} from '@/hooks/useBriefingDistribution';
import {
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from './editorial';

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
  const [webhookInput, setWebhookInput] = useState('');

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
      setWebhookInput('');
    }
  };

  const handleOpenLink = () => {
    openExternalUrl(signOffUrl);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        <SheetShell
          eyebrow="Distribute"
          title="Share Briefing"
          description={briefing.title}
        >
          {/* Link Display */}
          <FormCard eyebrow="Sign-off link">
            <p className="text-sm text-white font-mono break-all">{signOffUrl}</p>
          </FormCard>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className="h-16 flex flex-col items-center justify-center gap-1 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation text-white"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
              <span className="text-xs">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={onShowQR}
              className="h-16 flex flex-col items-center justify-center gap-1 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation text-white"
            >
              <QrCode className="h-5 w-5" />
              <span className="text-xs">QR Code</span>
            </button>

            <button
              onClick={handleShare}
              className="h-16 flex flex-col items-center justify-center gap-1 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation text-white"
            >
              <Share2 className="h-5 w-5" />
              <span className="text-xs">Share</span>
            </button>

            <button
              onClick={handleOpenLink}
              className="h-16 flex flex-col items-center justify-center gap-1 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation text-white"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="text-xs">Open Page</span>
            </button>
          </div>

          {/* Microsoft Teams */}
          <FormCard eyebrow="Microsoft Teams">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-white">Teams integration</span>
              </div>
              {savedWebhook && (
                <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
                  Connected
                </Badge>
              )}
            </div>

            {showWebhookConfig ? (
              <div className="space-y-3 mt-3">
                <Field
                  label="Teams Incoming Webhook URL"
                  hint="Create an Incoming Webhook connector in your Teams channel"
                >
                  <Input
                    value={webhookInput}
                    onChange={(e) => setWebhookInput(e.target.value)}
                    placeholder="https://outlook.office.com/webhook/..."
                    className={inputClass}
                  />
                </Field>
                <div className="flex gap-2">
                  <SecondaryButton
                    onClick={() => setShowWebhookConfig(false)}
                    fullWidth
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleSaveWebhook}
                    disabled={!webhookInput.trim() || saveWebhook.isPending}
                    fullWidth
                  >
                    {saveWebhook.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Save'
                    )}
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <div className="space-y-2 mt-3">
                {savedWebhook ? (
                  <PrimaryButton
                    onClick={handleSendToTeams}
                    disabled={sendToTeams.isPending}
                    fullWidth
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
                  </PrimaryButton>
                ) : (
                  <SecondaryButton
                    onClick={() => setShowWebhookConfig(true)}
                    fullWidth
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Teams Webhook
                  </SecondaryButton>
                )}

                {sendToTeams.isError && (
                  <div className="flex items-center gap-2 p-2 rounded bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                    <p className="text-xs text-red-400">{sendToTeams.error.message}</p>
                  </div>
                )}

                {sendToTeams.isSuccess && (
                  <div className="flex items-center gap-2 p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <p className="text-xs text-emerald-400">
                      Notification sent to Teams successfully!
                    </p>
                  </div>
                )}

                {savedWebhook && (
                  <button
                    onClick={() => setShowWebhookConfig(true)}
                    className="w-full h-10 text-xs text-white touch-manipulation flex items-center justify-center gap-1 hover:bg-white/[0.04] rounded-full"
                  >
                    <Settings className="h-3 w-3" />
                    Update Webhook URL
                  </button>
                )}
              </div>
            )}
          </FormCard>

          {/* Instructions */}
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-white">
              <strong className="text-white">How to distribute:</strong> Share the link or QR
              code with your team. They can scan it with their phone camera to sign off on the
              briefing instantly.
            </p>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
