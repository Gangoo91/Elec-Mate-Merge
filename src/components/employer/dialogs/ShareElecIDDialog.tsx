import { useState, useEffect } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useGenerateShareableLink } from '@/hooks/useElecId';
import { ElecIdProfile } from '@/services/elecIdService';
import { QrCode, Link2, Copy, Mail, Shield, Eye, Loader2 } from 'lucide-react';
import {
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  TextAction,
  fieldLabelClass,
  inputClass,
  selectTriggerClass,
  checkboxClass,
} from '@/components/employer/editorial';

interface ShareElecIDDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ElecIdProfile;
}

export const ShareElecIDDialog = ({ open, onOpenChange, profile }: ShareElecIDDialogProps) => {
  const generateLink = useGenerateShareableLink();
  const [shareSettings, setShareSettings] = useState({
    includePhoto: true,
    includeCertifications: true,
    includeTraining: true,
    includeWorkHistory: true,
    includeSkills: true,
    includeContact: false,
  });
  const [recipientEmail, setRecipientEmail] = useState('');
  const [expiryDays, setExpiryDays] = useState('30');
  const [shareLink, setShareLink] = useState<string | null>(profile.shareable_link || null);

  useEffect(() => {
    if (open && !shareLink && profile.id) {
      handleGenerateLink();
    }
  }, [open, profile.id]);

  const handleGenerateLink = async () => {
    try {
      const link = await generateLink.mutateAsync(profile.id);
      setShareLink(link);
    } catch (error) {
      console.error('Error generating link:', error);
      toast({
        title: 'Error',
        description: 'Could not generate shareable link.',
        variant: 'destructive',
      });
    }
  };

  const displayLink = shareLink || `https://elec-id.app/profile/${profile.elec_id_number}`;

  const handleCopyLink = async () => {
    await copyToClipboard(displayLink);
    toast({
      title: 'Link Copied',
      description: 'Share link has been copied to clipboard.',
    });
  };

  const handleSendEmail = () => {
    if (!recipientEmail) {
      toast({
        title: 'Email Required',
        description: 'Please enter a recipient email address.',
        variant: 'destructive',
      });
      return;
    }

    const subject = encodeURIComponent(`Elec-ID Profile: ${profile.employee?.name || 'Worker'}`);
    const body = encodeURIComponent(
      `Please find the Elec-ID credentials for ${profile.employee?.name || 'the worker'}:\n\n${displayLink}`
    );
    openExternalUrl(`mailto:${recipientEmail}?subject=${subject}&body=${body}`);

    toast({
      title: 'Profile Shared',
      description: `Opening email to share with ${recipientEmail}`,
    });
    setRecipientEmail('');
  };

  const handleGenerateQR = () => {
    toast({
      title: 'QR Code Generated',
      description: 'Scan this code to view the Elec-ID profile.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto p-6 bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Share Elec-ID profile
          </DialogTitle>
          <DialogDescription className="text-white">
            Share {profile.employee?.name || 'this worker'}'s portable Elec-ID with employers or
            clients.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="mt-2">
          <TabsList className="w-full bg-[hsl(0_0%_12%)] border border-white/[0.06]">
            <TabsTrigger
              value="link"
              className="flex-1 gap-1.5 h-10 text-[12.5px] data-[state=active]:bg-elec-yellow data-[state=active]:text-black touch-manipulation"
            >
              <Link2 className="h-4 w-4" />
              Link
            </TabsTrigger>
            <TabsTrigger
              value="qr"
              className="flex-1 gap-1.5 h-10 text-[12.5px] data-[state=active]:bg-elec-yellow data-[state=active]:text-black touch-manipulation"
            >
              <QrCode className="h-4 w-4" />
              QR code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4 space-y-3">
            <FormCard eyebrow="Shareable link">
              <div className="space-y-1.5">
                <label className={fieldLabelClass}>URL</label>
                <div className="flex gap-2">
                  <Input value={displayLink} readOnly className={`${inputClass} font-mono text-[11px]`} />
                  <SecondaryButton onClick={handleCopyLink} className="shrink-0 w-11 p-0">
                    <Copy className="h-4 w-4" />
                  </SecondaryButton>
                </div>
                {generateLink.isPending && (
                  <p className="text-[11px] text-white flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Generating shareable link...
                  </p>
                )}
                {!shareLink && !generateLink.isPending && (
                  <TextAction onClick={handleGenerateLink}>Generate new link</TextAction>
                )}
              </div>
              <Field label="Link expires after">
                <select
                  className={selectTriggerClass + ' w-full'}
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(e.target.value)}
                >
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                  <option value="never">Never</option>
                </select>
              </Field>
            </FormCard>

            <FormCard eyebrow="Send via email">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="employer@company.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className={inputClass}
                />
                <PrimaryButton onClick={handleSendEmail} className="shrink-0">
                  <Mail className="h-4 w-4 mr-1.5" />
                  Send
                </PrimaryButton>
              </div>
            </FormCard>
          </TabsContent>

          <TabsContent value="qr" className="mt-4">
            <FormCard eyebrow="QR code">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-[hsl(0_0%_9%)] rounded-xl border-2 border-dashed border-elec-yellow/30 flex items-center justify-center mb-3">
                  <div className="text-center">
                    <QrCode className="h-24 w-24 text-elec-yellow/50 mx-auto" />
                    <p className="mt-2 text-[11px] text-white">QR code preview</p>
                  </div>
                </div>
                <p className="text-[12px] text-white text-center">
                  Scan to view {profile.employee?.name?.split(' ')[0] || 'worker'}'s Elec-ID profile
                </p>
                <PrimaryButton onClick={handleGenerateQR} className="mt-3">
                  <QrCode className="h-4 w-4 mr-1.5" />
                  Download QR code
                </PrimaryButton>
              </div>
            </FormCard>
          </TabsContent>
        </Tabs>

        <FormCard eyebrow="What to include">
          <p className="text-[12px] text-white flex items-center gap-2">
            <Eye className="h-4 w-4 text-elec-yellow" />
            Select details visible to recipients
          </p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries({
              includeCertifications: 'Certifications',
              includeTraining: 'Training records',
              includeWorkHistory: 'Work history',
              includeSkills: 'Skills & specialisms',
              includeContact: 'Contact details',
            }).map(([key, label]) => (
              <label
                key={key}
                htmlFor={key}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] cursor-pointer hover:bg-[hsl(0_0%_11%)] transition-colors touch-manipulation"
              >
                <Checkbox
                  id={key}
                  checked={shareSettings[key as keyof typeof shareSettings]}
                  onCheckedChange={(checked) =>
                    setShareSettings((prev) => ({ ...prev, [key]: checked }))
                  }
                  className={checkboxClass}
                />
                <span className="text-[12.5px] text-white">{label}</span>
              </label>
            ))}
          </div>
        </FormCard>
      </DialogContent>
    </Dialog>
  );
};
