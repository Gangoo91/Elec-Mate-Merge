import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
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
    includeCertifications: true,
    includeTraining: true,
    includeWorkHistory: true,
    includeSkills: true,
    includeContact: false,
  });
  const [recipientEmail, setRecipientEmail] = useState('');
  const [expiryDays, setExpiryDays] = useState('30');
  // Only trust a stored link that points at the live share system — legacy
  // rows carried dead-domain links
  const [shareLink, setShareLink] = useState<string | null>(
    profile.shareable_link?.includes('/share/') ? profile.shareable_link : null
  );
  // The link's persisted controls only change when a NEW link is generated —
  // flag when the on-screen settings have drifted from the active link
  const [settingsDirty, setSettingsDirty] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !shareLink && profile.id) {
      handleGenerateLink();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, profile.id]);

  // Persisted + enforced: the checkboxes map to the share row's sections
  // (the public /share view filters on them) and the expiry to expires_at
  const buildOptions = () => {
    const sections = ['basics'];
    if (shareSettings.includeCertifications) sections.push('qualifications');
    if (shareSettings.includeTraining) sections.push('training');
    if (shareSettings.includeWorkHistory) sections.push('experience');
    if (shareSettings.includeSkills) sections.push('skills');
    // 'basics' carries contact details on the public view — drop it when
    // contact is unticked (bio/ECS ride along; the view groups them)
    if (!shareSettings.includeContact) sections.splice(sections.indexOf('basics'), 1);
    return {
      sections,
      expiresInDays: expiryDays === 'never' ? null : parseInt(expiryDays, 10),
    };
  };

  const handleGenerateLink = async () => {
    try {
      const link = await generateLink.mutateAsync({ id: profile.id, options: buildOptions() });
      setShareLink(link);
      setSettingsDirty(false);
    } catch (error) {
      console.error('Error generating link:', error);
      toast({
        title: 'Error',
        description: 'Could not generate shareable link.',
        variant: 'destructive',
      });
    }
  };

  const displayLink =
    shareLink || `https://www.elec-mate.com/verify/${profile.elec_id_number}`;

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

  const handleDownloadQR = () => {
    try {
      const svg = qrRef.current?.querySelector('svg');
      if (!svg) throw new Error('QR code not ready');

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create canvas context');

      const padding = 40;
      const size = 400;
      canvas.width = size + padding * 2;
      canvas.height = size + padding * 2;
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
        ctx.fillText(`Elec-ID: ${profile.elec_id_number}`, canvas.width / 2, canvas.height - 60);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Scan to verify credentials', canvas.width / 2, canvas.height - 35);

        const link = document.createElement('a');
        link.download = `elec-id-${profile.elec_id_number}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        URL.revokeObjectURL(svgUrl);
        toast({ title: 'QR code downloaded' });
      };
      img.src = svgUrl;
    } catch {
      toast({
        title: 'Download failed',
        description: 'Could not download the QR code.',
        variant: 'destructive',
      });
    }
  };

  return (
    <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="text-white">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Share Elec-ID profile
          </ResponsiveFormModalTitle>
          <p className="text-[12.5px] text-white/70 text-left">
            Share {profile.employee?.name || 'this worker'}'s portable Elec-ID with employers or
            clients.
          </p>
        </ResponsiveFormModalHeader>

        <ResponsiveFormModalBody className="pb-6">
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
                {!generateLink.isPending && (!shareLink || settingsDirty) && (
                  <TextAction onClick={handleGenerateLink}>
                    {settingsDirty ? 'Apply settings — generate new link' : 'Generate new link'}
                  </TextAction>
                )}
              </div>
              <Field label="Link expires after">
                <select
                  className={selectTriggerClass + ' w-full'}
                  value={expiryDays}
                  onChange={(e) => {
                    setExpiryDays(e.target.value);
                    setSettingsDirty(true);
                  }}
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
                <div
                  ref={qrRef}
                  className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center mb-3"
                >
                  <QRCodeSVG
                    value={displayLink}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#1a1a2e"
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-[12px] text-white text-center">
                  Scan to view {profile.employee?.name?.split(' ')[0] || 'worker'}'s Elec-ID profile
                </p>
                <PrimaryButton onClick={handleDownloadQR} className="mt-3">
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
              includeContact: 'Contact details & bio',
            }).map(([key, label]) => (
              <label
                key={key}
                htmlFor={key}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] cursor-pointer hover:bg-[hsl(0_0%_11%)] transition-colors touch-manipulation"
              >
                <Checkbox
                  id={key}
                  checked={shareSettings[key as keyof typeof shareSettings]}
                  onCheckedChange={(checked) => {
                    setShareSettings((prev) => ({ ...prev, [key]: checked === true }));
                    setSettingsDirty(true);
                  }}
                  className={checkboxClass}
                />
                <span className="text-[12.5px] text-white">{label}</span>
              </label>
            ))}
          </div>
        </FormCard>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
};
