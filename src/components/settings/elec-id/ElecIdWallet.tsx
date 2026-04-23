/**
 * ElecIdWallet
 * Adds the user's Elec-ID to Apple Wallet (iOS) or Google Wallet (Android/web).
 *
 * Apple Wallet: fetches binary .pkpass from edge function → saves to device via
 *   Filesystem + Share (native) or blob download (web).
 * Google Wallet: fetches signed save URL → opens in browser/app.
 */

import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { openExternalUrl } from '@/utils/open-external-url';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ElecIdWalletProps {
  elecIdNumber: string;
}

const isIOS = Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios';
const isAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
const isNative = Capacitor.isNativePlatform();

// Official Apple Wallet badge SVG
const AppleWalletBadge = () => (
  <svg viewBox="0 0 119 40" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
    <defs>
      <linearGradient id="aws-grad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#3D3D3D"/>
        <stop offset="100%" stopColor="#000000"/>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect fill="url(#aws-grad)" width="119" height="40" rx="6"/>
      <rect stroke="#A6A6A6" strokeWidth=".5" x=".25" y=".25" width="118.5" height="39.5" rx="6"/>
      {/* Apple logo */}
      <path d="M16.5 10.3c.8-1 1.3-2.4 1.2-3.8-1.2.1-2.6.8-3.4 1.8-.8.9-1.4 2.3-1.2 3.6 1.3.1 2.6-.6 3.4-1.6z" fill="#FFF"/>
      <path d="M19.8 13.6c-.1 0-3-.2-3-3.4 0-2.9 2.5-3.4 2.6-3.4-.1-.3-2.2-3.8-5.2-3.8-1.5 0-2.5.7-3.4.7-.9 0-1.9-.7-3.1-.7C5.1 3 3 4.7 3 8.3c0 3.4 2.5 10.2 5.2 10.2 1 0 1.8-.6 2.9-.6 1 0 1.7.6 2.9.6 2.9 0 5.2-6.9 5.2-7 .1 0-.3-.2-.4.1z" fill="#FFF"/>
      {/* "Add to" text */}
      <text x="32" y="14" fontFamily="SF Pro Text, Helvetica Neue, sans-serif" fontSize="8" fill="#FFF" fontWeight="400">Add to</text>
      {/* "Apple Wallet" text */}
      <text x="32" y="27" fontFamily="SF Pro Display, Helvetica Neue, sans-serif" fontSize="13" fill="#FFF" fontWeight="600">Apple Wallet</text>
    </g>
  </svg>
);

// Official Google Wallet badge SVG
const GoogleWalletBadge = () => (
  <svg viewBox="0 0 200 56" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
    <rect width="200" height="56" rx="8" fill="#1a1a2e" stroke="#444" strokeWidth=".5"/>
    {/* Google "G" icon */}
    <g transform="translate(14, 14)">
      <circle cx="14" cy="14" r="14" fill="#fff"/>
      <path d="M20.64 14.2c0-.49-.04-.96-.12-1.42H14v2.69h3.72a3.19 3.19 0 01-1.38 2.09v1.74h2.23c1.3-1.2 2.07-2.97 2.07-5.1z" fill="#4285F4"/>
      <path d="M14 22c1.87 0 3.43-.62 4.57-1.68l-2.23-1.74c-.62.42-1.41.66-2.34.66-1.8 0-3.32-1.21-3.86-2.84H7.83v1.79A6.9 6.9 0 0014 22z" fill="#34A853"/>
      <path d="M10.14 16.4a4.15 4.15 0 010-2.66v-1.79H7.83a6.9 6.9 0 000 6.24l2.31-1.79z" fill="#FBBC05"/>
      <path d="M14 9.9c1.01 0 1.92.35 2.63 1.03l1.97-1.97A6.84 6.84 0 0014 7.1a6.9 6.9 0 00-6.17 3.85l2.31 1.79c.54-1.63 2.06-2.84 3.86-2.84z" fill="#EA4335"/>
    </g>
    <text x="40" y="24" fontFamily="Google Sans, Roboto, sans-serif" fontSize="11" fill="#9AA0A6" fontWeight="400">Add to</text>
    <text x="40" y="40" fontFamily="Google Sans, Roboto, sans-serif" fontSize="16" fill="#FFFFFF" fontWeight="500">Google Wallet</text>
  </svg>
);

export default function ElecIdWallet({ elecIdNumber }: ElecIdWalletProps) {
  const { toast } = useToast();
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // ─── Apple Wallet ────────────────────────────────────────────────────────
  const addToAppleWallet = async () => {
    setIsAppleLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not authenticated');

      const res = await supabase.functions.invoke('generate-apple-wallet-pass', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.error) throw new Error(res.error.message);

      // The response is a binary ArrayBuffer
      const arrayBuffer = res.data as ArrayBuffer;
      const filename = `elecid-${elecIdNumber}.pkpass`;

      if (isNative) {
        // Convert to base64 for Filesystem API
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        for (const b of bytes) binary += String.fromCharCode(b);
        const base64Data = btoa(binary);

        const saved = await Filesystem.writeFile({
          path: filename,
          data: base64Data,
          directory: Directory.Cache,
          recursive: true,
        });

        // Share sheet — iOS will detect .pkpass MIME type and offer "Add to Wallet"
        await Share.share({
          title: 'Add Elec-ID to Apple Wallet',
          files: [saved.uri],
          dialogTitle: 'Add to Apple Wallet',
        });
      } else {
        // Web: blob download — Safari will prompt "Add to Wallet"
        const blob = new Blob([arrayBuffer], { type: 'application/vnd.apple.pkpass' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);

        toast({ title: 'Pass downloaded', description: 'Open the .pkpass file to add it to Wallet' });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to generate pass';
      console.error('[ElecIdWallet] Apple error:', err);
      if (msg.includes('not configured') || msg.includes('503')) {
        toast({
          title: 'Apple Wallet coming soon',
          description: 'Pass signing certificates are being set up. Check back shortly.',
        });
      } else {
        toast({ title: 'Error', description: msg, variant: 'destructive' });
      }
    } finally {
      setIsAppleLoading(false);
    }
  };

  // ─── Google Wallet ───────────────────────────────────────────────────────
  const addToGoogleWallet = async () => {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-google-wallet-pass');
      if (error) throw new Error(error.message);

      const { saveUrl } = data as { saveUrl: string };
      if (!saveUrl) throw new Error('No save URL returned');

      await openExternalUrl(saveUrl);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to generate pass';
      console.error('[ElecIdWallet] Google error:', err);
      if (msg.includes('not configured') || msg.includes('503')) {
        toast({
          title: 'Google Wallet coming soon',
          description: 'Google Wallet integration is being finalised.',
        });
      } else {
        toast({ title: 'Error', description: msg, variant: 'destructive' });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Don't render on Android native — Google Wallet only (no Apple)
  // Don't render on iOS native — Apple Wallet only (no Google)
  // On web — show both

  const showApple = isIOS || !isNative;
  const showGoogle = isAndroid || !isNative;

  if (!showApple && !showGoogle) return null;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Add to Phone Wallet</h3>
      </div>

      <p className="text-sm text-white mb-5">
        One swipe from your lock screen — your verified Elec-ID always ready, even without internet.
      </p>

      <div className={`flex gap-3 ${showApple && showGoogle ? 'flex-col sm:flex-row' : ''}`}>
        {showApple && (
          <button
            onClick={addToAppleWallet}
            disabled={isAppleLoading}
            className="relative flex items-center justify-center touch-manipulation active:scale-95 transition-transform disabled:opacity-60"
            aria-label="Add to Apple Wallet"
          >
            {isAppleLoading ? (
              <div className="h-12 flex items-center gap-2 bg-black rounded-xl px-5 border border-white/20">
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span className="text-white text-sm">Generating…</span>
              </div>
            ) : (
              <AppleWalletBadge />
            )}
          </button>
        )}

        {showGoogle && (
          <button
            onClick={addToGoogleWallet}
            disabled={isGoogleLoading}
            className="relative flex items-center justify-center touch-manipulation active:scale-95 transition-transform disabled:opacity-60"
            aria-label="Add to Google Wallet"
          >
            {isGoogleLoading ? (
              <div className="h-12 flex items-center gap-2 bg-[#1a1a2e] rounded-xl px-5 border border-white/20">
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span className="text-white text-sm">Generating…</span>
              </div>
            ) : (
              <GoogleWalletBadge />
            )}
          </button>
        )}
      </div>

      <p className="text-xs text-white mt-4">
        Pass includes your name, verification tier, ECS card details and a QR code linking to your public profile.
      </p>
    </div>
  );
}
