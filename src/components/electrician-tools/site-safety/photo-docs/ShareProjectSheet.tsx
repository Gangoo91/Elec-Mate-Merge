import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Link2,
  Copy,
  Check,
  Share2,
  Clock,
  Shield,
  Loader2,
  Eye,
  ExternalLink,
  X,
  Ban,
  Send,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { usePhotoShare, PhotoShareLink } from '@/hooks/usePhotoShare';
import { SafetyPhoto } from '@/hooks/useSafetyPhotos';
import { toast } from '@/hooks/use-toast';
import { format, formatDistanceToNow } from 'date-fns';

interface ShareProjectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectReference: string;
  photos: SafetyPhoto[];
}

export default function ShareProjectSheet({
  open,
  onOpenChange,
  projectReference,
  photos,
}: ShareProjectSheetProps) {
  const [step, setStep] = useState<'options' | 'created' | 'history'>('options');
  const [title, setTitle] = useState(projectReference);
  const [message, setMessage] = useState('');
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

  const handleCreate = useCallback(async () => {
    try {
      const link = await createShare({
        projectReference,
        photos,
        title: title || projectReference,
        message: message || undefined,
        companyName: companyName || undefined,
        requiresSignature: requireSignature,
        expiresInDays: expiryDays,
      });

      if (link) {
        setCreatedLink(link);
        setStep('created');
        toast({ title: 'Share link created' });
      }
    } catch {
      // Error handled in hook
    }
  }, [
    projectReference,
    photos,
    title,
    message,
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
        // Fallback
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
            text: message || `View ${photos.length} photos from ${projectReference}`,
            url,
          });
        } catch {
          // User cancelled
        }
      } else {
        handleCopy(token);
      }
    },
    [title, message, projectReference, photos.length, getShareUrl, handleCopy]
  );

  const handleClose = useCallback(() => {
    setStep('options');
    setTitle(projectReference);
    setMessage('');
    setCompanyName('');
    setRequireSignature(false);
    setExpiryDays(7);
    setCreatedLink(null);
    setCopied(false);
    onOpenChange(false);
  }, [projectReference, onOpenChange]);

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
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Share with Client</h2>
              {projectLinks.length > 0 && step === 'options' && (
                <button
                  onClick={() => setStep('history')}
                  className="text-xs text-elec-yellow font-medium touch-manipulation px-2 py-1 rounded-lg active:bg-white/5"
                >
                  {projectLinks.length} active link{projectLinks.length !== 1 ? 's' : ''}
                </button>
              )}
              {step === 'history' && (
                <button
                  onClick={() => setStep('options')}
                  className="text-xs text-elec-yellow font-medium touch-manipulation px-2 py-1 rounded-lg active:bg-white/5"
                >
                  New Link
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide">
            {/* Options step - create new share */}
            {step === 'options' && (
              <div className="p-4 space-y-4">
                {/* Project info */}
                <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <Link2 className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{projectReference}</p>
                    <p className="text-xs text-white/50">{photos.length} photos will be shared</p>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                    Page Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project name or job reference..."
                    className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation"
                  />
                </div>

                {/* Company name */}
                <div>
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                    Your Company Name
                  </label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your electrical company..."
                    className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                    Message for Client
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Optional message to display on the shared page..."
                    className="mt-1.5 min-h-[80px] bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation resize-none"
                  />
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                    Options
                  </label>

                  {/* Require signature */}
                  <button
                    onClick={() => setRequireSignature(!requireSignature)}
                    className="w-full flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] touch-manipulation active:bg-white/5"
                  >
                    <Shield
                      className={`h-5 w-5 ${requireSignature ? 'text-elec-yellow' : 'text-white/40'}`}
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm text-white">Require signature</p>
                      <p className="text-[10px] text-white/40">
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
                    <Clock className="h-5 w-5 text-white/40" />
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
                              : 'bg-white/10 text-white/60 active:bg-white/15'
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
            {step === 'created' && createdLink && (
              <div className="p-4 space-y-4">
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                    <Check className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Link Created!</h3>
                  <p className="text-sm text-white/50 mt-1">Share this link with your client</p>
                </div>

                {/* Link display */}
                <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <p className="text-xs text-white/40 mb-1.5">Share URL</p>
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
                    <p className="text-lg font-bold text-elec-yellow">{photos.length}</p>
                    <p className="text-[10px] text-white/40">Photos</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.06]">
                    <p className="text-lg font-bold text-elec-yellow">{expiryDays}d</p>
                    <p className="text-[10px] text-white/40">Expires</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.06]">
                    <p className="text-lg font-bold text-elec-yellow">
                      {requireSignature ? 'Yes' : 'No'}
                    </p>
                    <p className="text-[10px] text-white/40">Signature</p>
                  </div>
                </div>
              </div>
            )}

            {/* History step - existing links */}
            {step === 'history' && (
              <div className="p-4 space-y-3">
                {projectLinks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-white/50">No active share links</p>
                  </div>
                ) : (
                  projectLinks.map((link) => (
                    <div
                      key={link.id}
                      className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{link.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                                link.status === 'signed'
                                  ? 'bg-green-500/10 text-green-400'
                                  : link.status === 'active'
                                    ? 'bg-blue-500/10 text-blue-400'
                                    : 'bg-white/5 text-white/40'
                              }`}
                            >
                              {link.status === 'signed'
                                ? 'Signed'
                                : link.status === 'active'
                                  ? 'Active'
                                  : link.status}
                            </span>
                            {link.view_count > 0 && (
                              <span className="flex items-center gap-0.5 text-[10px] text-white/40">
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
                            <Copy className="h-4 w-4 text-white/50" />
                          </button>
                          <button
                            onClick={() => handleNativeShare(link.share_token)}
                            className="p-2 rounded-lg active:bg-white/10 touch-manipulation"
                          >
                            <Share2 className="h-4 w-4 text-white/50" />
                          </button>
                          <button
                            onClick={() => revokeShare(link.id)}
                            className="p-2 rounded-lg active:bg-red-500/10 touch-manipulation"
                          >
                            <Ban className="h-4 w-4 text-red-400/50" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] text-white/30">
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
          </div>

          {/* Footer actions */}
          <div className="flex-shrink-0 p-4 border-t border-white/[0.06]">
            {step === 'options' && (
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="flex-1 h-12 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isCreating || photos.length === 0}
                  className="flex-[2] h-12 rounded-xl bg-elec-yellow text-sm font-semibold text-black flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Create Link</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 'created' && createdLink && (
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

            {step === 'history' && (
              <button
                onClick={() => setStep('options')}
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
