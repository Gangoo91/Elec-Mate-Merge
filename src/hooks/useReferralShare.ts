/**
 * useReferralShare
 * Handles referral sharing via WhatsApp, copy link, QR, and native share.
 * Tracks share events for analytics.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';

export type ShareChannel = 'whatsapp' | 'copy_link' | 'qr' | 'native_share' | 'email';

interface ReferralShareOptions {
  context?: string; // e.g. 'post_certificate', 'settings', 'milestone'
}

const SHARE_MESSAGE = (code: string, src: string) =>
  `Alright mate, check out Elec-Mate — does all your certs, quotes, invoices, and even has an AI agent for regs and admin.\n\nI use it daily. Sign up with my link and your first month's free:\nhttps://elec-mate.com/auth/signup?ref=${code}&src=${src}\n\nProper game changer for the paperwork.`;

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function useReferralShare(options: ReferralShareOptions = {}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's referral code
  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const fetchCode = async () => {
      const { data, error } = await supabase
        .from('referral_codes')
        .select('code')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (!error && data?.code) {
        setReferralCode(data.code);
      }
      setIsLoading(false);
    };

    fetchCode();
  }, [user?.id]);

  const referralUrl = referralCode ? `https://elec-mate.com/auth/signup?ref=${referralCode}` : null;

  // Track share event
  const trackShare = useCallback(
    async (channel: ShareChannel) => {
      if (!user?.id || !referralCode) return;

      try {
        await supabase.from('referral_share_events').insert({
          user_id: user.id,
          channel,
          context: options.context || 'manual',
          referral_code: referralCode,
        });
      } catch (err) {
        console.warn('Failed to track share event:', err);
      }
    },
    [user?.id, referralCode, options.context]
  );

  // Share via WhatsApp
  const shareViaWhatsApp = useCallback(async () => {
    if (!referralCode) return;

    const message = SHARE_MESSAGE(referralCode, 'whatsapp');
    const url = buildWhatsAppUrl(message);
    openExternalUrl(url);

    await trackShare('whatsapp');

    toast({
      title: 'Opening WhatsApp',
      description: 'Share your referral link with your mates.',
    });
  }, [referralCode, trackShare, toast]);

  // Copy link to clipboard
  const copyLink = useCallback(async () => {
    if (!referralUrl) return;

    try {
      await copyToClipboard(referralUrl);
      await trackShare('copy_link');

      toast({
        title: 'Link Copied',
        description: 'Referral link copied to clipboard.',
      });
    } catch {
      toast({
        title: 'Copy Failed',
        description: 'Could not copy link. Please try again.',
        variant: 'destructive',
      });
    }
  }, [referralUrl, trackShare, toast]);

  // Native share (Capacitor / Web Share API)
  const shareNative = useCallback(async () => {
    if (!referralCode || !referralUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Try Elec-Mate — Free Month',
          text: SHARE_MESSAGE(referralCode, 'native_share'),
          url: referralUrl,
        });
        await trackShare('native_share');
      } else {
        // Fallback to copy
        await copyLink();
      }
    } catch (err) {
      // User cancelled share — not an error
      if ((err as Error)?.name !== 'AbortError') {
        console.warn('Native share failed:', err);
        await copyLink();
      }
    }
  }, [referralCode, referralUrl, trackShare, copyLink]);

  // Track QR share (QR is rendered in component, this just tracks the event)
  const trackQrShare = useCallback(async () => {
    await trackShare('qr');
  }, [trackShare]);

  return {
    referralCode,
    referralUrl,
    isLoading,
    shareViaWhatsApp,
    copyLink,
    shareNative,
    trackQrShare,
  };
}
