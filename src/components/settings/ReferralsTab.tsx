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
import { useReferralStats } from '@/hooks/useReferralStats';
import { QRCodeSVG } from 'qrcode.react';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';
import {
  ListCard,
  ListRow,
  StatStrip,
  SectionHeader,
  Eyebrow,
  EmptyState,
  TextAction,
  containerVariants,
  itemVariants,
  toneText,
  type Tone,
} from '@/components/college/primitives';

const WhatsAppBrand = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TIER_CONFIG: Record<string, { label: string; tone: Tone; threshold: number }> = {
  bronze: { label: 'Bronze', tone: 'amber', threshold: 0 },
  silver: { label: 'Silver', tone: 'blue', threshold: 3 },
  gold: { label: 'Gold', tone: 'yellow', threshold: 5 },
  platinum: { label: 'Platinum', tone: 'cyan', threshold: 10 },
};

const STATUS_LABELS: Record<string, { label: string; tone: Tone }> = {
  pending: { label: 'Pending', tone: 'amber' },
  signed_up: { label: 'Signed Up', tone: 'blue' },
  subscribed: { label: 'Subscribed', tone: 'green' },
  rewarded: { label: 'Rewarded', tone: 'yellow' },
  expired: { label: 'Expired', tone: 'red' },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <ReferralShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        context="settings"
      />

      {/* ── HERO — QR + Link + CTAs ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="01" title="Share your link" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-70" />
          <div className="p-6 sm:p-8 flex flex-col items-center">
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

            <div className="flex items-center gap-2 mb-1">
              <Eyebrow>Referral Code</Eyebrow>
              <span className="text-lg font-semibold text-white tabular-nums tracking-tight">
                {referralCode || '…'}
              </span>
            </div>
            <p className="text-[13px] text-white mb-5 text-center max-w-sm leading-relaxed">
              Share with your mates — free month for both of you.
            </p>

            <button
              onClick={copyLink}
              className="w-full max-w-sm flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a] border border-white/[0.08] touch-manipulation hover:bg-white/[0.04] transition-colors mb-4"
            >
              <span className="font-mono text-[11px] text-white flex-1 truncate text-left">
                {referralUrl || 'Loading…'}
              </span>
              <span className="text-[12px] font-medium text-elec-yellow/90 shrink-0">
                Copy
              </span>
            </button>

            <Button
              onClick={shareViaWhatsApp}
              className={cn(
                'w-full max-w-sm h-12 rounded-full text-[14px] font-semibold',
                'bg-[#25D366] hover:bg-[#25D366]/90 text-white',
                'touch-manipulation'
              )}
            >
              <WhatsAppBrand />
              <span className="ml-2">Share via WhatsApp</span>
            </Button>

            <div className="grid grid-cols-3 gap-2 w-full max-w-sm mt-3">
              <Button
                variant="outline"
                onClick={copyLink}
                className="h-11 rounded-full border-white/[0.08] bg-transparent hover:bg-white/[0.04] touch-manipulation text-white"
              >
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadQr}
                className="h-11 rounded-full border-white/[0.08] bg-transparent hover:bg-white/[0.04] touch-manipulation text-white"
              >
                QR
              </Button>
              <Button
                variant="outline"
                onClick={shareNative}
                className="h-11 rounded-full border-white/[0.08] bg-transparent hover:bg-white/[0.04] touch-manipulation text-white"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── STATS ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="02" title="Your Referrals" />
        <StatStrip
          columns={3}
          stats={[
            { value: stats?.total_referrals || 0, label: 'Referrals', tone: 'blue' },
            { value: successfulReferrals, label: 'Subscribed', tone: 'green' },
            {
              value: stats?.credits_formatted || '£0.00',
              label: 'Earned',
              tone: 'yellow',
            },
          ]}
        />
      </motion.section>

      {/* ── TIER REWARD ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="03" title="Your Reward" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={cn(
                'text-[11px] font-medium uppercase tracking-[0.15em]',
                toneText[tierConfig?.tone ?? 'amber']
              )}
            >
              {tierConfig?.label ?? 'Bronze'}
            </span>
            {nextTierConfig && (
              <span className="text-[11.5px] text-white/65">
                Next: {nextTierConfig.label} at {nextTierConfig.threshold} subs
              </span>
            )}
          </div>

          <div className="text-[13px] text-white leading-relaxed">
            {successfulReferrals >= 1 ? (
              <span className="text-elec-yellow font-medium">
                Free month claimed — nice one. Keep sharing to help your mates.
              </span>
            ) : (
              <>
                Get <span className="text-elec-yellow font-medium">1 free month</span> when a mate
                signs up and subscribes with your link.
              </>
            )}
          </div>

          {nextTierConfig && (
            <div className="mt-4">
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-elec-yellow transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-white/65 tabular-nums">
                <span>
                  {successfulReferrals} of {nextTierThreshold}
                </span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* ── HISTORY ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="04" title="Referral History" />
        {stats?.recent_referrals && stats.recent_referrals.length > 0 ? (
          <ListCard>
            {stats.recent_referrals.map((ref) => {
              const statusInfo = STATUS_LABELS[ref.status] || STATUS_LABELS.pending;
              return (
                <ListRow
                  key={ref.id}
                  title={ref.referred_name}
                  subtitle={`${new Date(ref.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })} · ${ref.source}`}
                  trailing={
                    <span
                      className={cn(
                        'text-[10px] font-medium uppercase tracking-[0.15em]',
                        toneText[statusInfo.tone]
                      )}
                    >
                      {statusInfo.label}
                    </span>
                  }
                />
              );
            })}
          </ListCard>
        ) : (
          <EmptyState
            title="No referrals yet"
            description="Share your link to start earning free months."
            action="Share now"
            onAction={shareNative}
          />
        )}
      </motion.section>

      {/* Share sheet trigger (surface a TextAction in case users want more formats) */}
      <div className="text-center">
        <TextAction onClick={() => setShareSheetOpen(true)}>More share options →</TextAction>
      </div>
    </motion.div>
  );
};

export default ReferralsTab;
