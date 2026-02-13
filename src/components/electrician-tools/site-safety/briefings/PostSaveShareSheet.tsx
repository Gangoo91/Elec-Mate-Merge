import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  Share2,
  Link2,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Loader2,
  X,
  ExternalLink,
  QrCode,
  CheckCircle,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { IOSInput } from '@/components/ui/ios-input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PostSaveShareSheetProps {
  briefingId: string;
  briefingName: string;
  attendeeCount: number;
  onClose: () => void;
}

export function PostSaveShareSheet({
  briefingId,
  briefingName,
  attendeeCount,
  onClose,
}: PostSaveShareSheetProps) {
  const { toast } = useToast();
  const [signingUrl, setSigningUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Auto-generate the signing link on mount
  useEffect(() => {
    generateLink();
  }, []);

  const getOrCreateToken = async (): Promise<string> => {
    const { data: existing } = await supabase
      .from('briefing_signing_tokens')
      .select('public_token')
      .eq('briefing_id', briefingId)
      .eq('is_active', true)
      .single();

    if (existing?.public_token) {
      return existing.public_token;
    }

    const token = crypto.randomUUID();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const { error } = await supabase.from('briefing_signing_tokens').insert({
      briefing_id: briefingId,
      public_token: token,
      created_by_user_id: user.id,
      expires_at: expiresAt.toISOString(),
    });

    if (error) throw error;
    return token;
  };

  const generateLink = async () => {
    if (signingUrl) return signingUrl;

    setLoading(true);
    try {
      const token = await getOrCreateToken();
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/briefing-sign/${token}`;
      setSigningUrl(url);
      return url;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to generate signing link',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    const url = await generateLink();
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Link copied', description: 'Signing link copied to clipboard' });
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
  };

  const handleWhatsApp = async () => {
    const url = await generateLink();
    if (!url) return;

    const message = encodeURIComponent(
      `Please sign this team briefing: "${briefingName}"\n\n${url}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleNativeShare = async () => {
    const url = await generateLink();
    if (!url) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Sign Briefing: ${briefingName}`,
          text: `Please sign this team briefing: "${briefingName}"`,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const handleEmailSend = async () => {
    if (!emailTo.trim()) return;

    const url = await generateLink();
    if (!url) return;

    setSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke('send-briefing-signing-link', {
        body: {
          briefingId,
          recipientEmail: emailTo.trim(),
          signingUrl: url,
        },
      });

      if (error) throw error;

      const token = signingUrl?.split('/').pop();
      if (token) {
        const { data: tokenRow } = await supabase
          .from('briefing_signing_tokens')
          .select('email_sent_to')
          .eq('public_token', token)
          .single();

        const existing: string[] = tokenRow?.email_sent_to || [];
        const updated = [...new Set([...existing, emailTo.trim()])];

        await supabase
          .from('briefing_signing_tokens')
          .update({
            email_sent_to: updated,
            email_sent_at: new Date().toISOString(),
          })
          .eq('public_token', token);
      }

      toast({ title: 'Email sent', description: `Signing link sent to ${emailTo}` });
      setEmailTo('');
    } catch {
      const subject = encodeURIComponent(`Team Briefing: ${briefingName} - Please Sign`);
      const body = encodeURIComponent(
        `Hi,\n\nPlease sign the following team briefing: "${briefingName}"\n\nClick here to sign: ${url}\n\nThank you.`
      );
      window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`, '_self');
      toast({ title: 'Email client opened', description: 'Send the signing link from your email' });
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 max-h-[90vh] bg-[#111827] rounded-t-2xl overflow-hidden safe-area-pb"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="overflow-y-auto max-h-[80vh]">
          {/* Success Header */}
          <div className="px-5 pt-4 pb-5 text-center border-b border-white/10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.15 }}
              className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-bold text-white mb-1"
            >
              Briefing Saved
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-white"
            >
              {briefingName}
            </motion.p>
          </div>

          {/* Share for Signing */}
          <div className="p-5 space-y-5">
            {/* Attendee count prompt */}
            {attendeeCount > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Users className="h-5 w-5 text-amber-400 shrink-0" />
                <p className="text-sm text-amber-300">
                  <span className="font-semibold">{attendeeCount} {attendeeCount === 1 ? 'person needs' : 'people need'}</span> to sign this briefing
                </p>
              </div>
            )}

            {/* Share heading */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Share2 className="h-4 w-4 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Share for Signing</h3>
                <p className="text-xs text-white">Workers sign remotely — no login needed</p>
              </div>
            </div>

            {/* Copy Link — primary action */}
            <Button
              type="button"
              onClick={handleCopyLink}
              disabled={loading}
              className={cn(
                'w-full h-14 rounded-xl font-semibold text-base touch-manipulation',
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
              )}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : copied ? (
                <Check className="h-5 w-5 mr-2" />
              ) : (
                <Link2 className="h-5 w-5 mr-2" />
              )}
              {copied ? 'Link Copied!' : 'Copy Signing Link'}
            </Button>

            {/* Secondary share buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={loading}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                  'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] active:scale-[0.97]',
                  'touch-manipulation min-h-[80px]'
                )}
              >
                <MessageCircle className="h-5 w-5 text-green-400" />
                <span className="text-xs font-medium text-white">WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                disabled={loading}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                  'touch-manipulation min-h-[80px]',
                  showQR
                    ? 'bg-elec-yellow/10 border-elec-yellow/30'
                    : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] active:scale-[0.97]'
                )}
              >
                <QrCode className="h-5 w-5 text-yellow-400" />
                <span className="text-xs font-medium text-white">QR Code</span>
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                disabled={loading}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                  'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] active:scale-[0.97]',
                  'touch-manipulation min-h-[80px]'
                )}
              >
                <ExternalLink className="h-5 w-5 text-purple-400" />
                <span className="text-xs font-medium text-white">More...</span>
              </button>
            </div>

            {/* QR Code toggle */}
            <AnimatePresence>
              {showQR && signingUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="p-4 bg-white rounded-xl">
                      <QRCodeSVG
                        value={signingUrl}
                        size={160}
                        level="H"
                        includeMargin={false}
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                    <p className="text-xs text-white mt-3 text-center">
                      Show this on your phone for workers to scan on site
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Send */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Send via Email
                </span>
              </div>
              <div className="flex gap-2">
                <IOSInput
                  type="email"
                  placeholder="Enter email address"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEmailSend()}
                  icon={<Mail className="h-5 w-5" />}
                />
                <Button
                  type="button"
                  onClick={handleEmailSend}
                  disabled={!emailTo.trim() || sendingEmail || loading}
                  className="h-[50px] px-5 bg-yellow-500 text-black hover:bg-yellow-400 font-semibold shrink-0 touch-manipulation"
                >
                  {sendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
                </Button>
              </div>
            </div>

            {/* Skip / Close */}
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="w-full h-12 text-white hover:text-white touch-manipulation"
            >
              Skip — I'll share later
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
