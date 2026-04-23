import React, { useState, useRef, useEffect, useCallback } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { shareContent } from '@/utils/share';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import { Drawer } from 'vaul';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { QRCodeSVG } from 'qrcode.react';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import ElecIdWallet from './ElecIdWallet';
import {
  Eyebrow,
  ListCard,
  ListRow,
  SectionHeader,
  EmptyState,
} from '@/components/college/primitives';

interface ShareLink {
  id: string;
  url: string;
  expiresAt: string | null;
  sections: string[];
  createdAt: string;
  viewCount: number;
  shareToken: string;
}

const ElecIdShare = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [selectedExpiry, setSelectedExpiry] = useState('7d');
  const [selectedSections, setSelectedSections] = useState<string[]>([
    'basics',
    'qualifications',
    'experience',
  ]);
  const [isDownloadingQr, setIsDownloadingQr] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isDeletingLink, setIsDeletingLink] = useState(false);
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);

  const elecIdNumber = profile?.elec_id_number || 'EM-XXXXXX';
  const shareUrl = `https://elec-mate.com/verify/${elecIdNumber}`;

  const fetchShareLinks = useCallback(async () => {
    if (!profile?.id) {
      setIsLoadingLinks(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('employer_elec_id_share_links')
        .select('*')
        .eq('profile_id', profile.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedLinks: ShareLink[] = (data || []).map((link: any) => ({
        id: link.id,
        url: link.url,
        expiresAt: link.expires_at,
        sections: link.sections || ['basics'],
        createdAt: link.created_at,
        viewCount: link.view_count || 0,
        shareToken: link.share_token,
      }));

      setShareLinks(mappedLinks);
    } catch (error) {
      console.error('Error fetching share links:', error);
    } finally {
      setIsLoadingLinks(false);
    }
  }, [profile?.id]);

  useEffect(() => {
    fetchShareLinks();
  }, [fetchShareLinks]);

  const sectionOptions = [
    { id: 'basics', label: 'Basic info' },
    { id: 'qualifications', label: 'Qualifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
  ];

  const expiryOptions = [
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: 'never', label: 'Never expires' },
  ];

  const handleCopyLink = async (url: string) => {
    await copyToClipboard(url);
    addNotification({
      title: 'Link copied',
      message: 'Share link copied to clipboard',
      type: 'success',
    });
  };

  const handleCreateLink = async () => {
    if (!profile?.id) {
      addNotification({
        title: 'Error',
        message: 'Profile not found. Please try again.',
        type: 'error',
      });
      return;
    }

    setIsCreatingLink(true);
    try {
      const shareToken = crypto.randomUUID().replace(/-/g, '').substring(0, 12);
      const url = `https://elec-mate.com/share/${shareToken}`;

      let expiresAt: string | null = null;
      const now = new Date();
      switch (selectedExpiry) {
        case '24h':
          expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
          break;
        case '7d':
          expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case '30d':
          expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'never':
          expiresAt = null;
          break;
      }

      const { data, error } = await supabase
        .from('employer_elec_id_share_links')
        .insert({
          profile_id: profile.id,
          share_token: shareToken,
          url: url,
          expires_at: expiresAt,
          sections: selectedSections,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      const newLink: ShareLink = {
        id: data.id,
        url: data.url,
        expiresAt: data.expires_at,
        sections: data.sections,
        createdAt: data.created_at,
        viewCount: 0,
        shareToken: data.share_token,
      };

      setShareLinks((prev) => [newLink, ...prev]);

      addNotification({
        title: 'Link created',
        message: 'Your shareable link has been created',
        type: 'success',
      });
      setIsCreateLinkOpen(false);
    } catch (error: any) {
      console.error('Error creating share link:', error);
      addNotification({
        title: 'Error',
        message: error.message || 'Failed to create link. Please try again.',
        type: 'error',
      });
    } finally {
      setIsCreatingLink(false);
    }
  };

  const handleDownloadQr = async () => {
    setIsDownloadingQr(true);
    try {
      const svg = qrRef.current?.querySelector('svg');
      if (!svg) throw new Error('QR code not found');

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
        ctx.fillText(`ELEC-iD: ${elecIdNumber}`, canvas.width / 2, canvas.height - 60);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Scan to verify credentials', canvas.width / 2, canvas.height - 35);

        const link = document.createElement('a');
        link.download = `elec-id-${elecIdNumber}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        URL.revokeObjectURL(svgUrl);
        setIsDownloadingQr(false);
        addNotification({
          title: 'QR downloaded',
          message: 'Your QR code has been downloaded',
          type: 'success',
        });
      };
      img.src = svgUrl;
    } catch (error) {
      setIsDownloadingQr(false);
      addNotification({
        title: 'Download failed',
        message: 'Could not download QR code',
        type: 'info',
      });
    }
  };

  const handleShareQr = async () => {
    await shareContent({
      title: `ELEC-iD: ${elecIdNumber}`,
      text: 'Verify my electrical credentials',
      url: shareUrl,
      onFallback: () => handleCopyLink(shareUrl),
    });
  };

  const handleDeleteLink = async () => {
    if (!deleteConfirm.id) return;
    setIsDeletingLink(true);
    try {
      const { error } = await supabase
        .from('employer_elec_id_share_links')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', deleteConfirm.id);

      if (error) throw error;

      setShareLinks((prev) => prev.filter((link) => link.id !== deleteConfirm.id));

      addNotification({
        title: 'Link deleted',
        message: 'Share link has been removed',
        type: 'info',
      });
    } catch (error: any) {
      console.error('Error deleting share link:', error);
      addNotification({
        title: 'Error',
        message: error.message || 'Failed to delete link. Please try again.',
        type: 'error',
      });
    } finally {
      setIsDeletingLink(false);
      setDeleteConfirm({ open: false, id: null });
    }
  };

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((s) => s !== sectionId) : [...prev, sectionId]
    );
  };

  const getSectionLabel = (sectionId: string) =>
    sectionOptions.find((s) => s.id === sectionId)?.label || sectionId;

  const CreateLinkFormContent = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm text-white">Link expiry</Label>
        <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
          <SelectTrigger className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl text-white touch-manipulation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] z-[200]">
            {expiryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="py-3 touch-manipulation">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm text-white">Sections to include</Label>
        <div className="grid grid-cols-2 gap-2">
          {sectionOptions.map((section) => {
            const isSelected = selectedSections.includes(section.id);
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all touch-manipulation',
                  isSelected
                    ? 'bg-elec-yellow/10 border-elec-yellow/40'
                    : 'bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08]'
                )}
              >
                <div className={cn('text-sm font-medium', isSelected ? 'text-white' : 'text-white')}>
                  {section.label}
                </div>
                {isSelected && (
                  <p className="text-[11px] text-elec-yellow mt-1">Included</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const linkFooter = (
    <div className="flex gap-3">
      <button
        className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation disabled:opacity-60"
        onClick={() => setIsCreateLinkOpen(false)}
        disabled={isCreatingLink}
      >
        Cancel
      </button>
      <button
        className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-60"
        onClick={handleCreateLink}
        disabled={selectedSections.length === 0 || isCreatingLink}
      >
        {isCreatingLink ? 'Creating…' : 'Create link'}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Create-link sheet/dialog */}
      {isMobile ? (
        <Drawer.Root
          open={isCreateLinkOpen}
          onOpenChange={setIsCreateLinkOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[85vh] bg-[hsl(0_0%_12%)] rounded-t-2xl border-t border-white/[0.06]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
              </div>
              <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06]">
                <Drawer.Title className="text-lg font-semibold text-white">
                  Create share link
                </Drawer.Title>
                <button
                  onClick={() => setIsCreateLinkOpen(false)}
                  className="h-11 w-11 -mr-2 rounded-full text-white hover:bg-white/[0.04] touch-manipulation text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <CreateLinkFormContent />
              </div>
              <div className="p-5 border-t border-white/[0.06]">{linkFooter}</div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isCreateLinkOpen} onOpenChange={setIsCreateLinkOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Create share link</DialogTitle>
            </DialogHeader>
            <CreateLinkFormContent />
            <div className="pt-4">{linkFooter}</div>
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ open, id: open ? deleteConfirm.id : null })}
        title="Delete share link"
        description="Anyone with this link will no longer be able to view your profile."
        onConfirm={handleDeleteLink}
        isLoading={isDeletingLink}
      />

      {/* Phone Wallet */}
      <ElecIdWallet elecIdNumber={elecIdNumber} />

      {/* QR hero */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 sm:p-7"
      >
        <Eyebrow>Your public QR</Eyebrow>
        <div className="mt-4 flex flex-col items-center">
          <div
            ref={qrRef}
            className="w-48 h-48 bg-white rounded-2xl p-4 shadow-xl shadow-black/30 mb-4"
          >
            <QRCodeSVG
              value={shareUrl}
              size={160}
              bgColor="#ffffff"
              fgColor="#1a1a2e"
              level="H"
              includeMargin={false}
            />
          </div>

          <p className="text-lg font-semibold text-white font-mono tracking-wider">
            {elecIdNumber}
          </p>
          <p className="text-sm text-white mb-5">Scan to instantly verify your credentials</p>

          <button
            onClick={() => handleCopyLink(shareUrl)}
            className="w-full max-w-sm flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] touch-manipulation active:bg-white/[0.08] transition-all mb-4"
          >
            <span className="font-mono text-xs text-white flex-1 truncate text-left">
              {shareUrl}
            </span>
            <span className="text-xs font-medium text-elec-yellow shrink-0">Copy</span>
          </button>

          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            <button
              onClick={handleDownloadQr}
              disabled={isDownloadingQr}
              className="h-11 rounded-xl border border-white/[0.06] bg-white/[0.04] text-white font-medium touch-manipulation disabled:opacity-60"
            >
              {isDownloadingQr ? 'Downloading…' : 'Download'}
            </button>
            <button
              onClick={handleShareQr}
              className="h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
            >
              Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div>
        <SectionHeader eyebrow="Sharing tools" title="Quick actions" />
        <div className="mt-4">
          <ListCard>
            <ListRow
              accent="yellow"
              title="Create timed link"
              subtitle="Generate a link that expires after a set period"
              trailing={<span className="text-xs font-medium text-elec-yellow">Create →</span>}
              onClick={() => setIsCreateLinkOpen(true)}
            />
            <ListRow
              accent="blue"
              title="Copy public URL"
              subtitle="Always-on profile link"
              trailing={<span className="text-xs font-medium text-elec-yellow">Copy →</span>}
              onClick={() => handleCopyLink(shareUrl)}
            />
          </ListCard>
        </div>
      </div>

      {/* Active share links */}
      <div>
        <SectionHeader
          eyebrow="Active links"
          title="Share links"
          action="Create new"
          onAction={() => setIsCreateLinkOpen(true)}
        />
        <div className="mt-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {isLoadingLinks ? (
              [1, 2].map((i) => (
                <Skeleton key={i} className="h-24 rounded-2xl bg-white/[0.04]" />
              ))
            ) : shareLinks.length > 0 ? (
              shareLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.04 }}
                  className="p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-mono text-xs text-white truncate flex-1">
                      {link.url.split('/').pop()}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopyLink(link.url)}
                        className="h-11 px-3 rounded-lg hover:bg-white/[0.04] text-xs font-medium text-white touch-manipulation"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => openExternalUrl(link.url)}
                        className="h-11 px-3 rounded-lg hover:bg-white/[0.04] text-xs font-medium text-white touch-manipulation"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ open: true, id: link.id })}
                        className="h-11 px-3 rounded-lg hover:bg-red-500/10 text-xs font-medium text-red-400 touch-manipulation"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white">
                    <span>
                      {link.expiresAt
                        ? `Expires ${new Date(link.expiresAt).toLocaleDateString('en-GB')}`
                        : 'No expiry'}
                    </span>
                    <span className="tabular-nums">{link.viewCount} views</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {link.sections.map((section) => (
                      <span
                        key={section}
                        className="text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-400"
                      >
                        {getSectionLabel(section)}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <EmptyState
                title="No active links"
                description="Create a share link to give someone scoped access to your profile."
                action="Create share link"
                onAction={() => setIsCreateLinkOpen(true)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-2" />
        <div>
          <p className="font-medium text-white text-sm">Your data is protected</p>
          <p className="text-xs text-white">
            Only sections you choose will be visible to recipients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElecIdShare;
