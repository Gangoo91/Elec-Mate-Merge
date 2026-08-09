import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Link2, MessageCircle, Check, Loader2, ExternalLink, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SafetyDocField } from '../common/SafetyDocField';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import { copyToClipboard } from '@/utils/clipboard';

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

      /*
       * Off the local `url`, not the `signingUrl` state. `generateLink()` sets
       * that state inside this same handler, so the closure still held `null`
       * and the `email_sent_to` audit was silently skipped on every first send.
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
        className="safe-area-pb absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-hidden rounded-t-2xl bg-[hsl(0_0%_8%)]"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="max-h-[78vh] overflow-y-auto">
          {/* Confirmation reads in type. A 64px emerald disc with a tick in it
              is the standard "AI made this" success graphic, and it pushed the
              one thing the user came here to do below the fold on a small
              phone. */}
          <div className="border-b border-white/10 px-5 pb-5 pt-4">
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[20px] font-bold leading-tight tracking-tight text-white"
            >
              Briefing saved
            </motion.h2>
            <p className="mt-1 text-[14px] text-white">{briefingName}</p>
            {attendeeCount > 0 && (
              /* Neutral surface, coloured text — the app's status-pill rule.
                 An amber wash behind an amber sentence is the treatment
                 reserved for a selected control or a safety verdict. */
              <p className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[12px] font-medium text-amber-400">
                {attendeeCount} {attendeeCount === 1 ? 'person still needs' : 'people still need'}{' '}
                to sign
              </p>
            )}
          </div>

          {/* Share for Signing */}
          <div className="p-5 space-y-5">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Send for signing</h3>
              <p className="mt-0.5 text-[12px] text-white">
                Workers sign on their own phone — no login needed
              </p>
            </div>

            {/* Copy Link — primary action */}
            <Button
              type="button"
              onClick={handleCopyLink}
              disabled={loading}
              className={cn(
                'h-14 w-full rounded-xl text-base font-semibold touch-manipulation',
                'transition-[filter,transform] duration-150 active:scale-[0.98] active:brightness-110',
                'disabled:opacity-60',
                copied ? 'bg-emerald-500 text-white' : 'bg-elec-yellow text-black'
              )}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : copied ? (
                <Check className="mr-2 h-5 w-5" />
              ) : (
                <Link2 className="mr-2 h-5 w-5" />
              )}
              {copied ? 'Link copied' : 'Copy signing link'}
            </Button>

            {/* Secondary share — one row, one weight, no three-colour icon set. */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={loading}
                className={cn(
                  'flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06]',
                  'text-[13px] font-medium text-white touch-manipulation',
                  'transition-[background-color,transform] duration-150 active:scale-[0.97] active:bg-white/[0.12]'
                )}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>

              <button
                type="button"
                aria-pressed={showQR}
                onClick={() => setShowQR(!showQR)}
                disabled={loading}
                className={cn(
                  'flex h-11 items-center justify-center gap-1.5 rounded-xl border',
                  'text-[13px] font-medium touch-manipulation',
                  'transition-[background-color,transform] duration-150 active:scale-[0.97]',
                  showQR
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : 'border-white/[0.14] bg-white/[0.06] text-white active:bg-white/[0.12]'
                )}
              >
                <QrCode className="h-4 w-4" />
                QR code
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                disabled={loading}
                className={cn(
                  'flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06]',
                  'text-[13px] font-medium text-white touch-manipulation',
                  'transition-[background-color,transform] duration-150 active:scale-[0.97] active:bg-white/[0.12]'
                )}
              >
                <ExternalLink className="h-4 w-4" />
                More
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

            {/* Skip / Close */}
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-11 w-full touch-manipulation text-[14px] font-medium text-white hover:bg-white/[0.08] hover:text-white"
            >
              Skip — I'll share later
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
