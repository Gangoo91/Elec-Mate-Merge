/**
 * ReferralBanner
 * Dashboard onboarding banner shown in the first 7 days after signup.
 * "Invite a mate — free month for both of you."
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import ReferralShareSheet from './ReferralShareSheet';

const DISMISS_KEY = 'elec-mate-referral-banner-dismissed';

const ReferralBanner: React.FC = () => {
  const { profile } = useAuth();
  const [dismissed, setDismissed] = useState(
    () => typeof window !== 'undefined' && storageGetSync(DISMISS_KEY) === 'true'
  );
  const [shareSheetOpen, setShareSheetOpen] = useState(false);

  if (dismissed) return null;

  const createdAt = profile?.created_at ? new Date(profile.created_at) : null;
  if (!createdAt) return null;

  const daysSinceSignup = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceSignup > 7) return null;

  const handleDismiss = () => {
    storageSetSync(DISMISS_KEY, 'true');
    setDismissed(true);
  };

  return (
    <>
      <ReferralShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        headline="Invite a Mate"
        subline="Free month for them. Free month for you."
        context="dashboard_banner"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6"
      >
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-3 h-8 touch-manipulation rounded-xl border border-white/[0.12] bg-black/40 px-3 text-[12px] font-medium text-white transition-colors hover:bg-black/70 hover:text-yellow-400"
          aria-label="Dismiss"
        >
          Dismiss
        </button>

        <div className="flex flex-col gap-4 pr-20 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pr-24">
          <h2 className="text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[1.5rem]">
            Invite a mate.{' '}
            <span className="text-yellow-400">First month free.</span>
          </h2>
          <button
            type="button"
            onClick={() => setShareSheetOpen(true)}
            className="inline-flex h-11 flex-shrink-0 touch-manipulation items-center justify-center rounded-2xl bg-yellow-500 px-5 text-[14px] font-semibold text-black transition-colors hover:bg-yellow-400"
          >
            Share
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ReferralBanner;
