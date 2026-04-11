/**
 * ReferralsTab
 * Settings tab showing referral dashboard: link, QR, stats, tier progress, history.
 */

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useReferralShare } from '@/hooks/useReferralShare';
import { useReferralStats, type ReferralStats } from '@/hooks/useReferralStats';
import { QRCodeSVG } from 'qrcode.react';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';
import {
  Copy,
  Share2,
  Download,
  QrCode,
  Users,
  TrendingUp,
  Gift,
  Crown,
  ChevronRight,
  Clock,
} from 'lucide-react';

// WhatsApp brand icon (inline SVG)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TIER_CONFIG: Record<
  string,
  { label: string; colour: string; bg: string; border: string; threshold: number }
> = {
  bronze: {
    label: 'Bronze',
    colour: 'text-amber-600',
    bg: 'bg-amber-600/15',
    border: 'border-amber-600/30',
    threshold: 0,
  },
  silver: {
    label: 'Silver',
    colour: 'text-gray-300',
    bg: 'bg-gray-300/15',
    border: 'border-gray-300/30',
    threshold: 3,
  },
  gold: {
    label: 'Gold',
    colour: 'text-elec-yellow',
    bg: 'bg-elec-yellow/15',
    border: 'border-elec-yellow/30',
    threshold: 5,
  },
  platinum: {
    label: 'Platinum',
    colour: 'text-cyan-300',
    bg: 'bg-cyan-300/15',
    border: 'border-cyan-300/30',
    threshold: 10,
  },
};

const STATUS_LABELS: Record<string, { label: string; colour: string }> = {
  pending: { label: 'Pending', colour: 'text-white bg-white/10' },
  signed_up: { label: 'Signed Up', colour: 'text-blue-400 bg-blue-400/10' },
  subscribed: { label: 'Subscribed', colour: 'text-green-400 bg-green-400/10' },
  rewarded: { label: 'Rewarded', colour: 'text-elec-yellow bg-elec-yellow/10' },
  expired: { label: 'Expired', colour: 'text-red-400 bg-red-400/10' },
};

const ReferralsTab: React.FC = () => {
  const { referralCode, referralUrl, shareViaWhatsApp, copyLink, shareNative, trackQrShare } =
    useReferralShare({ context: 'settings' });
  const { data: stats, isLoading } = useReferralStats();
  const qrRef = useRef<HTMLDivElement>(null);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);

  const handleDownloadQr = useCallback(async () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg || !referralUrl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 40;
    const size = 400;
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2 + 60;

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
      ctx.fillText('Try Elec-Mate Free', canvas.width / 2, canvas.height - 55);
      ctx.font = '14px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText(`Use code: ${referralCode}`, canvas.width / 2, canvas.height - 30);

      const link = document.createElement('a');
      link.download = `elec-mate-referral-${referralCode}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;

    await trackQrShare();
  }, [referralCode, referralUrl, trackQrShare]);

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-64 rounded-2xl bg-white/[0.06]" />
        <Skeleton className="h-20 rounded-2xl bg-white/[0.06]" />
        <Skeleton className="h-40 rounded-2xl bg-white/[0.06]" />
      </div>
    );
  }

  const tier = stats?.tier || 'bronze';
  const tierConfig = TIER_CONFIG[tier];
  const nextTierConfig = stats?.next_tier ? TIER_CONFIG[stats.next_tier] : null;
  const successfulReferrals = stats?.successful_referrals || 0;
  const nextTierThreshold = nextTierConfig?.threshold || 10;
  const progressPercent = nextTierConfig
    ? Math.min(100, (successfulReferrals / nextTierThreshold) * 100)
    : 100;

  return (
    <div className="space-y-5">
      <ReferralShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        context="settings"
      />

      {/* Hero Card — QR + Link + Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-6"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 bg-elec-yellow" />

        <div className="relative flex flex-col items-center">
          {/* QR */}
          <div
            ref={qrRef}
            className="w-44 h-44 bg-white rounded-2xl p-3 shadow-xl shadow-black/30 mb-4"
          >
            {referralUrl && (
              <QRCodeSVG
                value={referralUrl}
                size={152}
                bgColor="#ffffff"
                fgColor="#1a1a2e"
                level="H"
                includeMargin={false}
              />
            )}
          </div>

          {/* Code */}
          <div className="flex items-center gap-2 mb-1">
            <QrCode className="h-5 w-5 text-elec-yellow" />
            <span className="text-lg font-bold text-white">{referralCode || '...'}</span>
          </div>
          <p className="text-sm text-white mb-4 text-center">
            Share with your mates — free month for both of you
          </p>

          {/* Copy URL */}
          <button
            onClick={copyLink}
            className="w-full max-w-sm flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] active:scale-[0.99] transition-all mb-4"
          >
            <span className="font-mono text-xs text-white flex-1 truncate text-left">
              {referralUrl || 'Loading...'}
            </span>
            <Copy className="h-4 w-4 text-white flex-shrink-0" />
          </button>

          {/* Primary CTA */}
          <Button
            onClick={shareViaWhatsApp}
            className={cn(
              'w-full max-w-sm h-14 rounded-2xl text-[16px] font-semibold',
              'bg-[#25D366] hover:bg-[#25D366]/90 text-white',
              'shadow-lg shadow-[#25D366]/25',
              'touch-manipulation active:scale-[0.98]'
            )}
          >
            <WhatsAppIcon />
            <span className="ml-2">Share via WhatsApp</span>
          </Button>

          {/* Secondary actions */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-sm mt-3">
            <Button
              variant="outline"
              onClick={copyLink}
              className="h-12 rounded-xl border-white/[0.15] touch-manipulation active:scale-[0.97]"
            >
              <Copy className="h-4 w-4 mr-1.5" />
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadQr}
              className="h-12 rounded-xl border-white/[0.15] touch-manipulation active:scale-[0.97]"
            >
              <Download className="h-4 w-4 mr-1.5" />
              QR
            </Button>
            <Button
              variant="outline"
              onClick={shareNative}
              className="h-12 rounded-xl border-white/[0.15] touch-manipulation active:scale-[0.97]"
            >
              <Share2 className="h-4 w-4 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-3 gap-3"
      >
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
          <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{stats?.total_referrals || 0}</p>
          <p className="text-[11px] text-white">Referrals</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
          <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{successfulReferrals}</p>
          <p className="text-[11px] text-white">Subscribed</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
          <Gift className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{stats?.credits_formatted || '£0.00'}</p>
          <p className="text-[11px] text-white">Earned</p>
        </div>
      </motion.div>

      {/* Referral Reward */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl border border-elec-yellow/20 bg-elec-yellow/5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-bold text-elec-yellow">
            Your Reward
          </span>
        </div>

        <div className="text-xs text-white space-y-1">
          {successfulReferrals >= 1 ? (
            <p className="text-elec-yellow font-semibold">Free month claimed — nice one! Keep sharing to help your mates.</p>
          ) : (
            <p>Get <span className="text-elec-yellow font-semibold">1 free month</span> when a mate signs up and subscribes with your link.</p>
          )}
        </div>
      </motion.div>

      {/* Referral History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 px-1">
          <Users className="h-4 w-4 text-elec-yellow" />
          <h4 className="font-medium text-white">Referral History</h4>
        </div>

        {stats?.recent_referrals && stats.recent_referrals.length > 0 ? (
          stats.recent_referrals.map((ref) => {
            const statusInfo = STATUS_LABELS[ref.status] || STATUS_LABELS.pending;
            return (
              <div
                key={ref.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{ref.referred_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-white" />
                    <span className="text-xs text-white">
                      {new Date(ref.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-xs text-white capitalize">{ref.source}</span>
                  </div>
                </div>
                <span
                  className={cn(
                    'text-[11px] font-semibold px-2 py-1 rounded-full flex-shrink-0',
                    statusInfo.colour
                  )}
                >
                  {statusInfo.label}
                </span>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center">
            <Users className="h-10 w-10 text-white mx-auto mb-2" />
            <p className="text-sm text-white mb-1">No referrals yet</p>
            <p className="text-xs text-white">Share your link to start earning free months</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReferralsTab;
