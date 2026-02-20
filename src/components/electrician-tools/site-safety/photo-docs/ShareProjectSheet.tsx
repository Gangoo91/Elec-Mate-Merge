import { useState, useCallback, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SafetyPhoto } from '@/hooks/useSafetyPhotos';
import { usePhotoShare, PhotoShareLink } from '@/hooks/usePhotoShare';
import { PHOTO_TYPES } from '@/hooks/usePhotoProjects';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Mail,
  MessageCircle,
  Link2,
  Loader2,
  Send,
  Copy,
  Check,
  Share2,
  Shield,
  Clock,
  Eye,
  Ban,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

type ShareTab = 'email' | 'whatsapp' | 'link';

interface ShareProjectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectReference: string;
  projectId?: string;
  photos: SafetyPhoto[];
}

function normaliseUkPhone(phone: string): string {
  let cleaned = phone.replace(/\s+/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '+44' + cleaned.slice(1);
  }
  return cleaned;
}

export default function ShareProjectSheet({
  open,
  onOpenChange,
  projectReference,
  projectId,
  photos,
}: ShareProjectSheetProps) {
  // Tab state
  const [activeTab, setActiveTab] = useState<ShareTab>('email');

  // Photo type filter
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(['all']));

  // Email state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // WhatsApp state
  const [phoneNumber, setPhoneNumber] = useState('');

  // Link state
  const [linkStep, setLinkStep] = useState<'options' | 'created' | 'history'>('options');
  const [title, setTitle] = useState(projectReference);
  const [linkMessage, setLinkMessage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [requireSignature, setRequireSignature] = useState(false);
  const [expiryDays, setExpiryDays] = useState<number>(7);
  const [createdLink, setCreatedLink] = useState<PhotoShareLink | null>(null);
  const [copied, setCopied] = useState(false);

  const { createShare, isCreating, shareLinks, revokeShare, getShareUrl } = usePhotoShare();

  // Filter links for this project
  const projectLinks = shareLinks.filter(
    (l) => l.project_reference === projectReference && l.status !== 'revoked'
  );

  // Count photos by type
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: photos.length };
    for (const photo of photos) {
      const type = photo.photo_type || 'general';
      counts[type] = (counts[type] || 0) + 1;
    }
    return counts;
  }, [photos]);

  // Filter photos based on selected types
  const filteredPhotos = useMemo(() => {
    if (selectedTypes.has('all')) return photos;
    return photos.filter((p) => {
      const type = p.photo_type || 'general';
      return selectedTypes.has(type);
    });
  }, [photos, selectedTypes]);

  // Toggle photo type filter
  const toggleType = useCallback((typeValue: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (typeValue === 'all') {
        return new Set(['all']);
      }
      next.delete('all');
      if (next.has(typeValue)) {
        next.delete(typeValue);
      } else {
        next.add(typeValue);
      }
      if (next.size === 0) {
        return new Set(['all']);
      }
      return next;
    });
  }, []);

  // Email send handler
  const handleSendEmail = useCallback(async () => {
    if (!recipientEmail.trim()) {
      toast({ title: 'Please enter a recipient email', variant: 'destructive' });
      return;
    }
    if (filteredPhotos.length === 0) {
      toast({ title: 'No photos selected to send', variant: 'destructive' });
      return;
    }

    setIsSendingEmail(true);
    try {
      const photoIds = filteredPhotos.map((p) => p.id);
      const { error } = await supabase.functions.invoke('send-photos-resend', {
        body: {
          projectId: projectId || projectReference,
          photoIds,
          recipientEmail: recipientEmail.trim(),
          recipientName: '',
          message: emailMessage.trim() || undefined,
        },
      });

      if (error) throw error;

      toast({
        title: `${filteredPhotos.length} photo${filteredPhotos.length !== 1 ? 's' : ''} sent successfully`,
      });
      setRecipientEmail('');
      setEmailMessage('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Please try again';
      toast({
        title: 'Failed to send email',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  }, [recipientEmail, emailMessage, filteredPhotos, projectReference, projectId]);

  // WhatsApp handler
  const handleOpenWhatsApp = useCallback(async () => {
    if (!phoneNumber.trim()) {
      toast({ title: 'Please enter a phone number', variant: 'destructive' });
      return;
    }

    // Create a share link first so we have a URL to send
    try {
      const link = await createShare({
        projectReference,
        projectId,
        photos: filteredPhotos,
        title: title || projectReference,
        expiresInDays: 30,
      });

      if (link) {
        const shareUrl = getShareUrl(link.share_token);
        const normalisedPhone = normaliseUkPhone(phoneNumber.trim());
        const text = `Here are ${filteredPhotos.length} photos from ${projectReference}: ${shareUrl}`;
        const waUrl = `https://wa.me/${normalisedPhone.replace('+', '')}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
      }
    } catch {
      toast({
        title: 'Failed to create share link for WhatsApp',
        variant: 'destructive',
      });
    }
  }, [phoneNumber, projectReference, filteredPhotos, title, createShare, getShareUrl]);

  // Link create handler
  const handleCreateLink = useCallback(async () => {
    try {
      const link = await createShare({
        projectReference,
        projectId,
        photos: filteredPhotos,
        title: title || projectReference,
        message: linkMessage || undefined,
        companyName: companyName || undefined,
        requiresSignature: requireSignature,
        expiresInDays: expiryDays,
      });

      if (link) {
        setCreatedLink(link);
        setLinkStep('created');
        toast({ title: 'Share link created' });
      }
    } catch {
      // Error handled in hook
    }
  }, [
    projectReference,
    filteredPhotos,
    title,
    linkMessage,
    companyName,
    requireSignature,
    expiryDays,
    createShare,
  ]);

  const handleCopy = useCallback(
    async (token: string) => {
      const url = getShareUrl(token);
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast({ title: 'Link copied to clipboard' });
        setTimeout(() => setCopied(false), 2000);
      } catch {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    [getShareUrl]
  );

  const handleNativeShare = useCallback(
    async (token: string) => {
      const url = getShareUrl(token);
      if (navigator.share) {
        try {
          await navigator.share({
            title: title || projectReference,
            text: `View ${filteredPhotos.length} photos from ${projectReference}`,
            url,
          });
        } catch {
          // User cancelled
        }
      } else {
        handleCopy(token);
      }
    },
    [title, projectReference, filteredPhotos.length, getShareUrl, handleCopy]
  );

  const handleClose = useCallback(() => {
    setActiveTab('email');
    setSelectedTypes(new Set(['all']));
    setRecipientEmail('');
    setEmailMessage('');
    setPhoneNumber('');
    setLinkStep('options');
    setTitle(projectReference);
    setLinkMessage('');
    setCompanyName('');
    setRequireSignature(false);
    setExpiryDays(7);
    setCreatedLink(null);
    setCopied(false);
    onOpenChange(false);
  }, [projectReference, onOpenChange]);

  const tabs: { key: ShareTab; label: string; icon: typeof Mail }[] = [
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { key: 'link', label: 'Link', icon: Link2 },
  ];

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-elec-dark border-white/10"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex-shrink-0 px-4 pt-3 pb-2 border-b border-white/[0.06]">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-white">Share with Client</h2>
              {activeTab === 'link' && projectLinks.length > 0 && linkStep === 'options' && (
                <button
                  onClick={() => setLinkStep('history')}
                  className="text-xs text-elec-yellow font-medium touch-manipulation px-2 py-1 rounded-lg active:bg-white/5"
                >
                  {projectLinks.length} active link{projectLinks.length !== 1 ? 's' : ''}
                </button>
              )}
              {activeTab === 'link' && linkStep === 'history' && (
                <button
                  onClick={() => setLinkStep('options')}
                  className="text-xs text-elec-yellow font-medium touch-manipulation px-2 py-1 rounded-lg active:bg-white/5"
                >
                  New Link
                </button>
              )}
            </div>

            {/* Method tabs */}
            <div className="flex gap-2">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (key === 'link') setLinkStep('options');
                  }}
                  className={`flex-1 h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors touch-manipulation ${
                    activeTab === key
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/5 border border-transparent text-white active:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo type filter pills */}
          <div className="flex-shrink-0 px-4 py-3 border-b border-white/[0.06]">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              <button
                onClick={() => toggleType('all')}
                className={`flex-shrink-0 h-8 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors touch-manipulation ${
                  selectedTypes.has('all')
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/5 border border-transparent text-white active:bg-white/10'
                }`}
              >
                All
                <span className="text-[10px] opacity-80">({typeCounts['all'] || 0})</span>
              </button>
              {PHOTO_TYPES.map((type) => {
                const count = typeCounts[type.value] || 0;
                if (count === 0) return null;
                return (
                  <button
                    key={type.value}
                    onClick={() => toggleType(type.value)}
                    className={`flex-shrink-0 h-8 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors touch-manipulation ${
                      selectedTypes.has(type.value)
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/5 border border-transparent text-white active:bg-white/10'
                    }`}
                  >
                    {type.label}
                    <span className="text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide">
            {/* ===== EMAIL TAB ===== */}
            {activeTab === 'email' && (
              <div className="p-4 space-y-4">
                {/* Project info */}
                <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{projectReference}</p>
                    <p className="text-xs text-white">
                      {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} will be
                      sent
                    </p>
                  </div>
                </div>

                {/* Recipient email */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wide">
                    Recipient Email
                  </label>
                  <Input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="client@example.co.uk"
                    className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation text-white"
                  />
                </div>

                {/* Optional message */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wide">
                    Message (Optional)
                  </label>
                  <Textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Add a message to include with the photos..."
                    className="mt-1.5 min-h-[80px] bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation resize-none text-white"
                  />
                </div>
              </div>
            )}

            {/* ===== WHATSAPP TAB ===== */}
            {activeTab === 'whatsapp' && (
              <div className="p-4 space-y-4">
                {/* Project info */}
                <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{projectReference}</p>
                    <p className="text-xs text-white">
                      {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} will be
                      shared via link
                    </p>
                  </div>
                </div>

                {/* Phone number */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wide">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="07700 900000"
                    className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation text-white"
                  />
                  <p className="text-xs text-white mt-1.5">
                    UK numbers are automatically formatted (07... becomes +44...)
                  </p>
                </div>

                {/* Preview message */}
                <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <p className="text-xs font-medium text-white mb-1.5">Message Preview</p>
                  <p className="text-sm text-white">
                    Here are {filteredPhotos.length} photos from {projectReference}: [share link]
                  </p>
                </div>
              </div>
            )}

            {/* ===== LINK TAB ===== */}
            {activeTab === 'link' && (
              <>
                {/* Options step - create new share */}
                {linkStep === 'options' && (
                  <div className="p-4 space-y-4">
                    {/* Project info */}
                    <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-lg bg-elec-yellow flex items-center justify-center flex-shrink-0">
                        <Link2 className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {projectReference}
                        </p>
                        <p className="text-xs text-white">
                          {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} will
                          be shared
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="text-xs font-medium text-white uppercase tracking-wide">
                        Page Title
                      </label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project name or job reference..."
                        className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation text-white"
                      />
                    </div>

                    {/* Company name */}
                    <div>
                      <label className="text-xs font-medium text-white uppercase tracking-wide">
                        Your Company Name
                      </label>
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Your electrical company..."
                        className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation text-white"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-medium text-white uppercase tracking-wide">
                        Message for Client
                      </label>
                      <Textarea
                        value={linkMessage}
                        onChange={(e) => setLinkMessage(e.target.value)}
                        placeholder="Optional message to display on the shared page..."
                        className="mt-1.5 min-h-[80px] bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation resize-none text-white"
                      />
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-white uppercase tracking-wide">
                        Options
                      </label>

                      {/* Require signature */}
                      <button
                        onClick={() => setRequireSignature(!requireSignature)}
                        className="w-full flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] touch-manipulation active:bg-white/5"
                      >
                        <Shield
                          className={`h-5 w-5 ${requireSignature ? 'text-elec-yellow' : 'text-white'}`}
                        />
                        <div className="flex-1 text-left">
                          <p className="text-sm text-white">Require signature</p>
                          <p className="text-[10px] text-white">
                            Client must sign to confirm they've seen the photos
                          </p>
                        </div>
                        <div
                          className={`w-10 h-6 rounded-full transition-colors ${requireSignature ? 'bg-elec-yellow' : 'bg-white/10'}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform mt-0.5 ${requireSignature ? 'translate-x-4.5 ml-[18px]' : 'translate-x-0.5 ml-0.5'}`}
                          />
                        </div>
                      </button>

                      {/* Expiry */}
                      <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                        <Clock className="h-5 w-5 text-white" />
                        <div className="flex-1">
                          <p className="text-sm text-white">Link expires after</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[7, 30, 90].map((days) => (
                            <button
                              key={days}
                              onClick={() => setExpiryDays(days)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors touch-manipulation ${
                                expiryDays === days
                                  ? 'bg-elec-yellow text-black'
                                  : 'bg-white/10 text-white active:bg-white/15'
                              }`}
                            >
                              {days}d
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Created step - show link */}
                {linkStep === 'created' && createdLink && (
                  <div className="p-4 space-y-4">
                    <div className="text-center py-4">
                      <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                        <Check className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Link Created!</h3>
                      <p className="text-sm text-white mt-1">Share this link with your client</p>
                    </div>

                    {/* Link display */}
                    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                      <p className="text-xs text-white mb-1.5">Share URL</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs text-elec-yellow bg-white/5 rounded-lg px-3 py-2.5 truncate">
                          {getShareUrl(createdLink.share_token)}
                        </code>
                        <button
                          onClick={() => handleCopy(createdLink.share_token)}
                          className="p-2.5 rounded-lg bg-white/10 text-white touch-manipulation active:bg-white/15"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Quick info */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.06]">
                        <p className="text-lg font-bold text-elec-yellow">
                          {filteredPhotos.length}
                        </p>
                        <p className="text-[10px] text-white">Photos</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.06]">
                        <p className="text-lg font-bold text-elec-yellow">{expiryDays}d</p>
                        <p className="text-[10px] text-white">Expires</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.06]">
                        <p className="text-lg font-bold text-elec-yellow">
                          {requireSignature ? 'Yes' : 'No'}
                        </p>
                        <p className="text-[10px] text-white">Signature</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* History step - existing links */}
                {linkStep === 'history' && (
                  <div className="p-4 space-y-3">
                    {projectLinks.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-sm text-white">No active share links</p>
                      </div>
                    ) : (
                      projectLinks.map((link) => (
                        <div
                          key={link.id}
                          className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {link.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span
                                  className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                                    link.status === 'signed'
                                      ? 'bg-green-500/10 text-green-400'
                                      : link.status === 'active'
                                        ? 'bg-blue-500/10 text-blue-400'
                                        : 'bg-white/5 text-white'
                                  }`}
                                >
                                  {link.status === 'signed'
                                    ? 'Signed'
                                    : link.status === 'active'
                                      ? 'Active'
                                      : link.status}
                                </span>
                                {link.view_count > 0 && (
                                  <span className="flex items-center gap-0.5 text-[10px] text-white">
                                    <Eye className="h-2.5 w-2.5" />
                                    {link.view_count} views
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleCopy(link.share_token)}
                                className="p-2 rounded-lg active:bg-white/10 touch-manipulation"
                              >
                                <Copy className="h-4 w-4 text-white" />
                              </button>
                              <button
                                onClick={() => handleNativeShare(link.share_token)}
                                className="p-2 rounded-lg active:bg-white/10 touch-manipulation"
                              >
                                <Share2 className="h-4 w-4 text-white" />
                              </button>
                              <button
                                onClick={() => revokeShare(link.id)}
                                className="p-2 rounded-lg active:bg-red-500/10 touch-manipulation"
                              >
                                <Ban className="h-4 w-4 text-red-400/50" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-[10px] text-white">
                            <span>
                              Created{' '}
                              {formatDistanceToNow(new Date(link.created_at), { addSuffix: true })}
                            </span>
                            {link.expires_at && (
                              <span>Expires {format(new Date(link.expires_at), 'd MMM yyyy')}</span>
                            )}
                            <span>{(link.photos_data as unknown[])?.length || 0} photos</span>
                          </div>

                          {link.status === 'signed' && link.client_name && (
                            <div className="mt-2 p-2 bg-green-500/5 rounded-lg border border-green-500/10">
                              <p className="text-xs text-green-400">
                                Signed by {link.client_name} on{' '}
                                {format(new Date(link.signed_at!), 'd MMM yyyy, HH:mm')}
                              </p>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex-shrink-0 p-4 border-t border-white/[0.06]">
            {/* Email footer */}
            {activeTab === 'email' && (
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="flex-1 h-12 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={isSendingEmail || filteredPhotos.length === 0 || !recipientEmail.trim()}
                  className="flex-[2] h-12 rounded-xl bg-elec-yellow text-sm font-semibold text-black flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 disabled:opacity-50"
                >
                  {isSendingEmail ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>
                        Send {filteredPhotos.length} Photo{filteredPhotos.length !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* WhatsApp footer */}
            {activeTab === 'whatsapp' && (
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="flex-1 h-12 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOpenWhatsApp}
                  disabled={isCreating || filteredPhotos.length === 0 || !phoneNumber.trim()}
                  className="flex-[2] h-12 rounded-xl bg-[#25D366] text-sm font-semibold text-white flex items-center justify-center gap-2 touch-manipulation active:bg-[#20BD5A] disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating link...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4" />
                      <span>Open WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Link footer */}
            {activeTab === 'link' && linkStep === 'options' && (
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="flex-1 h-12 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateLink}
                  disabled={isCreating || filteredPhotos.length === 0}
                  className="flex-[2] h-12 rounded-xl bg-elec-yellow text-sm font-semibold text-black flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4" />
                      <span>Create Link</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'link' && linkStep === 'created' && createdLink && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleNativeShare(createdLink.share_token)}
                  className="flex-1 h-12 rounded-xl bg-white/10 text-sm font-medium text-white flex items-center justify-center gap-2 touch-manipulation active:bg-white/15"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 h-12 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:bg-yellow-400"
                >
                  Done
                </button>
              </div>
            )}

            {activeTab === 'link' && linkStep === 'history' && (
              <button
                onClick={() => setLinkStep('options')}
                className="w-full h-12 rounded-xl bg-elec-yellow text-sm font-semibold text-black flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400"
              >
                <Link2 className="h-4 w-4" />
                Create New Link
              </button>
            )}
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
