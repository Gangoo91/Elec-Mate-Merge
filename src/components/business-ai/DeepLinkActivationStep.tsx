import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Loader2, MessageCircle, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { buildActivationDeeplink, MATE_PHONE_DISPLAY } from '@/constants/mate';

interface WaCodeResponse {
  code?: string;
  deeplink?: string;
  expires_at?: string;
  expires_in_seconds?: number;
  reused?: boolean;
  already_active?: boolean;
  error?: string;
}

interface DeepLinkActivationStepProps {
  /** Called once profile.agent_status flips to 'active' (i.e. wa-onboarding finished). */
  onActivated: () => void;
}

const POLL_INTERVAL_MS = 3_000;

/**
 * Step 1 of the new WhatsApp-native onboarding wizard.
 *
 * Renders a one-tap WhatsApp button with the user's pre-generated activation
 * code, plus a QR code for desktop users. Polls the user's profile every 3s
 * for `agent_status === 'active'` (Supabase realtime is preferred but
 * polling is simpler and more reliable across networks).
 *
 * Reuses the existing `provision-business-ai` flow on the backend by way of
 * the new `/api/wa-onboarding` MCP endpoint; this step does not call
 * `provision-business-ai` directly.
 */
export function DeepLinkActivationStep({ onActivated }: DeepLinkActivationStepProps) {
  const { user, fetchProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [deeplink, setDeeplink] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const pollingRef = useRef<number | null>(null);

  const fetchCode = useCallback(
    async (regenerate: boolean) => {
      setError(null);
      if (regenerate) {
        setRegenerating(true);
      } else {
        setLoading(true);
      }

      try {
        const { data, error: fnErr } = await supabase.functions.invoke<WaCodeResponse>(
          'generate-wa-code',
          {
            body: regenerate ? { regenerate: true } : {},
          }
        );

        if (fnErr) throw new Error(fnErr.message);
        if (data?.error) throw new Error(data.error);

        if (data?.already_active) {
          // The user is already linked — the parent will swap to the dashboard
          // as soon as the next profile fetch lands.
          if (user && fetchProfile) {
            await fetchProfile(user.id);
          }
          onActivated();
          return;
        }

        if (!data?.code || !data.deeplink) {
          throw new Error('Activation link unavailable. Please try again.');
        }
        setCode(data.code);
        setDeeplink(data.deeplink);
        setExpiresAt(data.expires_at ?? null);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Could not get an activation link';
        setError(msg);
        toast({ title: 'Activation link unavailable', description: msg, variant: 'destructive' });
      } finally {
        setLoading(false);
        setRegenerating(false);
      }
    },
    [toast, user, fetchProfile, onActivated]
  );

  // Initial fetch
  useEffect(() => {
    fetchCode(false);
  }, [fetchCode]);

  // Poll for the agent being fully ready (status=active AND JWT minted).
  // verify-agent-active also auto-mints the JWT if the VPS flow left a gap,
  // so users never get stuck in the "WhatsApp linked but agent silent" state.
  useEffect(() => {
    if (!user) return;
    const tick = async () => {
      const { data, error: fnErr } = await supabase.functions.invoke<{
        ready?: boolean;
      }>('verify-agent-active', { body: {} });
      if (!fnErr && data?.ready) {
        if (fetchProfile) {
          await fetchProfile(user.id);
        }
        onActivated();
        if (pollingRef.current) {
          window.clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }
    };
    pollingRef.current = window.setInterval(tick, POLL_INTERVAL_MS);
    return () => {
      if (pollingRef.current) {
        window.clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [user, fetchProfile, onActivated]);

  // Update countdown clock once per second
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = useMemo(() => {
    if (!expiresAt) return null;
    const ms = new Date(expiresAt).getTime() - now;
    if (ms <= 0) return 'expired';
    const totalSec = Math.floor(ms / 1000);
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    if (mins > 0) return `${mins}m`;
    return `${totalSec}s`;
  }, [expiresAt, now]);

  const fallbackDeeplink = code ? buildActivationDeeplink(code) : null;
  const linkToOpen = deeplink ?? fallbackDeeplink;

  const handleTap = useCallback(() => {
    if (!linkToOpen) return;
    // window.open works in both Capacitor and web. Capacitor's external URL
    // helper is used elsewhere; window.open with target=_blank is fine for wa.me.
    window.open(linkToOpen, '_blank', 'noopener,noreferrer');
  }, [linkToOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]"
    >
      {/* Editorial gradient top accent — matches sales page language */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />

      <div className="p-6 sm:p-8 space-y-7">
        {/* Eyebrow */}
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
          Your activation code
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 text-amber-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white leading-relaxed">{error}</p>
            </div>
            <Button
              onClick={() => fetchCode(true)}
              disabled={regenerating}
              variant="outline"
              className="w-full h-11 touch-manipulation bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white rounded-xl"
            >
              {regenerating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Regenerating…
                </span>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try again
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            {/* Big WhatsApp button — green glow shadow */}
            <Button
              onClick={handleTap}
              disabled={!linkToOpen}
              className="w-full h-14 touch-manipulation bg-[#25D366] hover:bg-[#1ebe57] active:bg-[#1ba350] text-white font-semibold rounded-2xl text-base shadow-[0_20px_60px_-20px_rgba(37,211,102,0.55)] hover:shadow-[0_24px_70px_-18px_rgba(37,211,102,0.7)] transition-shadow"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Tap to activate Mate
              <ExternalLink className="h-4 w-4 ml-2 opacity-80" />
            </Button>

            <p className="text-sm text-center text-white/70 leading-relaxed">
              Opens WhatsApp with{' '}
              <span className="font-mono text-white bg-white/[0.06] border border-white/[0.08] rounded px-1.5 py-0.5">
                START {code}
              </span>{' '}
              already typed. Just hit send.
            </p>

            {/* QR fallback — its own subdued sub-card with eyebrow */}
            {linkToOpen && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 flex items-center gap-5">
                <div className="bg-white p-2.5 rounded-xl shrink-0">
                  <QRCodeSVG value={linkToOpen} size={108} level="M" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    Or scan
                  </div>
                  <p className="text-sm text-white leading-snug">
                    On a desktop? Scan with your phone — it'll open WhatsApp on the device that has
                    it.
                  </p>
                </div>
              </div>
            )}

            {/* Live waiting indicator */}
            <div className="flex items-center justify-center gap-2.5 text-sm text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-elec-yellow" />
              </span>
              <span>Waiting for your message…</span>
            </div>

            {/* Helpful meta — small footer row */}
            <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/[0.06]">
              <span className="font-mono">{MATE_PHONE_DISPLAY}</span>
              {remaining && <span>Code expires in {remaining}</span>}
            </div>

            {/* Regenerate */}
            <button
              type="button"
              onClick={() => fetchCode(true)}
              disabled={regenerating}
              className="w-full text-xs text-white/50 hover:text-white underline-offset-2 hover:underline touch-manipulation"
            >
              {regenerating ? 'Regenerating…' : 'Generate a new code'}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
