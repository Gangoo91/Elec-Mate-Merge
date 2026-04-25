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
    <section className="relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/40 to-transparent" />

      <div className="grid gap-8 px-6 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        {/* ── Left: header + preview pass ───────────────────────────────── */}
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
            Phone Wallet
          </div>
          <h3 className="mt-3 text-[22px] sm:text-[26px] font-semibold leading-[1.15] tracking-tight text-white">
            Carry your Elec-ID
            <br className="hidden sm:block" />
            on your lock screen.
          </h3>
          <p className="mt-3 text-[13px] leading-relaxed text-white max-w-sm">
            One swipe. Works offline. Auto-updates when your ECS card or verification tier changes.
          </p>

          {/* Mini pass preview */}
          <div className="mt-6 relative rounded-2xl bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] border border-white/[0.1] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] max-w-[320px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent" />
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
                  Elec-ID
                </div>
                <div className="mt-1 text-[11px] text-white/50">Verified Electrician</div>
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                Elec-Mate
              </div>
            </div>
            <div className="mt-8 text-[20px] font-semibold tracking-tight text-white break-all">
              {elecIdNumber}
            </div>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div className="text-[10px] uppercase tracking-[0.15em] text-white">Tap to verify</div>
              <div className="h-10 w-10 rounded-md bg-white/[0.04] border border-white/[0.08] grid grid-cols-4 grid-rows-4 gap-px p-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[1px] ${
                      [0, 2, 5, 6, 7, 9, 10, 13, 15].includes(i) ? 'bg-white/70' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: benefits + actions ─────────────────────────────────── */}
        <div className="min-w-0 flex flex-col">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
            What's included
          </div>
          <ul className="mt-4 space-y-3.5">
            {[
              'Name, role and verification tier',
              'ECS card number and expiry',
              'Live QR to your public verification page',
              'Automatic updates — never expires while active',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[13px] leading-snug text-white">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-elec-yellow" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white mb-3">
              Add to device
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {showApple && (
                <button
                  onClick={addToAppleWallet}
                  disabled={isAppleLoading}
                  aria-label="Add to Apple Wallet"
                  className="inline-flex items-center justify-center touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-60"
                >
                  {isAppleLoading ? (
                    <div className="flex h-[48px] items-center gap-2 rounded-xl bg-black px-5 border border-white/20">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span className="text-[13px] font-medium text-white">Generating pass…</span>
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
                  aria-label="Add to Google Wallet"
                  className="inline-flex items-center justify-center touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-60"
                >
                  {isGoogleLoading ? (
                    <div className="flex h-[48px] items-center gap-2 rounded-xl bg-[#1a1a2e] px-5 border border-white/20">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span className="text-[13px] font-medium text-white">Generating pass…</span>
                    </div>
                  ) : (
                    <GoogleWalletBadge />
                  )}
                </button>
              )}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-white/50">
              You can remove the pass anytime from the wallet app. Re-add it here if you ever need it back.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
