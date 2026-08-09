import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Link2, MessageCircle, Check, Loader2, X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SafetyDocField } from '../common/SafetyDocField';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import { copyToClipboard } from '@/utils/clipboard';

interface BriefingShareSheetProps {
  briefingId: string;
  briefingName: string;
  onClose: () => void;
}

export function BriefingShareSheet({ briefingId, briefingName, onClose }: BriefingShareSheetProps) {
  const { toast } = useToast();
  const [signingUrl, setSigningUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  const getOrCreateToken = async (): Promise<string> => {
    // Check if a token already exists for this briefing
    const { data: existing } = await supabase
      .from('briefing_signing_tokens')
      .select('public_token')
      .eq('briefing_id', briefingId)
      .eq('is_active', true)
      .single();

    if (existing?.public_token) {
      return existing.public_token;
    }

    // Generate new token
    const token = crypto.randomUUID();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

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
    } catch (err: unknown) {
      toast({
        title: 'Error',
        description:
          err instanceof Error && err.message ? err.message : 'Failed to generate signing link',
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
      await copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Link copied', description: 'Signing link copied to clipboard' });
    } catch {
      // Fallback for older browsers
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

    const text = `Please sign this team briefing: "${briefingName}"\n\n${url}`;

    if (Capacitor.isNativePlatform()) {
      try {
        await Share.share({ title: `Sign Briefing: ${briefingName}`, text });
      } catch {
        // User cancelled
      }
    } else {
      await openExternalUrl(`https://wa.me/?text=${encodeURIComponent(text)}`);
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

      /*
       * Track who the link went to. The token used to be read off the
       * `signingUrl` STATE — which `generateLink()` had just set two lines
       * earlier in this same handler, so the closure still saw `null` and the
       * whole tracking block was skipped. Every first send, on every briefing,
       * recorded nothing; only a second send to a second address (by which time
       * a re-render had landed) ever wrote `email_sent_to`, and it wrote it
       * without the first recipient. Read the token off the local `url`.
       */
      const token = url.split('/').pop();
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
      // Fallback: open mailto
      const subject = encodeURIComponent(`Team Briefing: ${briefingName} - Please Sign`);
      const body = encodeURIComponent(
        `Hi,\n\nPlease sign the following team briefing: "${briefingName}"\n\nClick here to sign: ${url}\n\nThank you.`
      );
      openExternalUrl(`mailto:${emailTo}?subject=${subject}&body=${body}`);
      toast({ title: 'Email client opened', description: 'Send the signing link from your email' });
    } finally {
      setSendingEmail(false);
    }
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
        // User cancelled share — fine
      }
    } else {
      handleCopyLink();
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
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-[hsl(0_0%_8%)] rounded-t-2xl overflow-hidden safe-area-pb"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header — type, not an icon tile. The volt square with a share glyph
            in it said nothing the heading did not, and spent the accent before
            the primary action got to use it. */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-white">Send for signing</h3>
            <p className="mt-0.5 text-[12px] text-white">
              Workers sign on their own phone — no login needed
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white touch-manipulation hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[65vh] space-y-5 overflow-y-auto p-5">
          {/* One primary action. Three equal 80px tiles in three different
              accent colours (blue link, green WhatsApp, purple "More…") is
              three primaries, which is none — and copying the link is what
              almost everyone does. */}
          <button
            type="button"
            onClick={handleCopyLink}
            disabled={loading}
            className={cn(
              'flex h-14 w-full items-center justify-center gap-2 rounded-xl',
              'text-base font-semibold touch-manipulation',
              'transition-[filter,transform] duration-150 active:scale-[0.98] active:brightness-110',
              'disabled:opacity-60',
              copied ? 'bg-emerald-500 text-white' : 'bg-elec-yellow text-black'
            )}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Link2 className="h-5 w-5" />
            )}
            {copied ? 'Link copied' : 'Copy signing link'}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={loading}
              className={cn(
                'flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06]',
                'text-[14px] font-medium text-white touch-manipulation',
                'transition-[background-color,transform] duration-150 active:scale-[0.97] active:bg-white/[0.12]'
              )}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>

            <button
              type="button"
              onClick={handleNativeShare}
              disabled={loading}
              className={cn(
                'flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06]',
                'text-[14px] font-medium text-white touch-manipulation',
                'transition-[background-color,transform] duration-150 active:scale-[0.97] active:bg-white/[0.12]'
              )}
            >
              <ExternalLink className="h-4 w-4" />
              More
            </button>
          </div>

          {/* QR Code — show after link is generated */}
          <AnimatePresence>
            {signingUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2.5">
                  <h4 className="text-[12px] font-medium text-white">QR code</h4>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="p-4 bg-white rounded-xl">
                      <QRCodeSVG
                        id="share-qr-code"
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Send */}
          <div className="space-y-2.5 border-t border-white/[0.1] pt-4">
            <h4 className="text-[12px] font-medium text-white">Send by email</h4>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <SafetyDocField
                  label="Email address"
                  type="email"
                  placeholder="name@company.co.uk"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEmailSend()}
                />
              </div>
              <Button
                type="button"
                onClick={handleEmailSend}
                disabled={!emailTo.trim() || sendingEmail || loading}
                className="h-11 shrink-0 touch-manipulation border border-white/[0.14] bg-white/[0.06] px-5 font-medium text-white transition-[background-color,transform] hover:bg-white/[0.12] active:scale-[0.97] disabled:opacity-50"
              >
                {sendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
              </Button>
            </div>
          </div>

          {/* Generated link display */}
          <AnimatePresence>
            {signingUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="mb-1.5 text-[12px] font-medium text-white">Signing link</p>
                  {/* Full-opacity volt. `text-yellow-400/80` on this ground is a
                      muddy olive, and a URL is the one thing here that has to be
                      readable enough to check by eye. */}
                  <p className="break-all font-mono text-xs leading-relaxed text-elec-yellow">
                    {signingUrl}
                  </p>
                  <p className="mt-2 text-xs text-white">
                    Expires in 7 days. Anyone with this link can sign.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
