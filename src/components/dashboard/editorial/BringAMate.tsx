/**
 * BringAMate — editorial replacement for the standalone ReferralBanner.
 *
 * Shows only in the first 7 days after signup (same window as the original
 * banner) and only until dismissed. Opens the existing `ReferralShareSheet`
 * so all the share / link / Stripe-coupon plumbing carries over unchanged.
 *
 * Composes from college editorial primitives so the section looks like the
 * other numbered blocks on the dashboard. Auto-hides after week 1 and
 * after dismissal.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';

const DISMISS_KEY = 'elec-mate-referral-banner-dismissed';
const SHOW_DAYS = 7;

interface BringAMateProps {
  number?: string;
  label?: string;
}

export function BringAMate({ number = '05', label = 'BRING A MATE' }: BringAMateProps) {
  const { profile } = useAuth();
  const [dismissed, setDismissed] = useState(
    () => typeof window !== 'undefined' && storageGetSync(DISMISS_KEY) === 'true'
  );
  const [shareSheetOpen, setShareSheetOpen] = useState(false);

  if (dismissed) return null;

  const createdAt = profile?.created_at ? new Date(profile.created_at) : null;
  if (!createdAt) return null;

  const daysSinceSignup = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceSignup > SHOW_DAYS) return null;

  const handleDismiss = () => {
    storageSetSync(DISMISS_KEY, 'true');
    setDismissed(true);
  };

  return (
    <>
      <ReferralShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        headline="Bring a Mate"
        subline="Free month for them. Free month for you."
        context="dashboard_editorial_bring_a_mate"
      />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <Eyebrow>
            {number} · {label}
          </Eyebrow>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-[11px] font-medium text-white/50 hover:text-white transition-colors touch-manipulation inline-flex items-center gap-1"
            aria-label="Dismiss referral section"
          >
            <X className="h-3 w-3" />
            Dismiss
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
          <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold tracking-tight leading-[1.1] text-white">
                A free month for them.
                <br />
                <span className="text-elec-yellow">A free month for you.</span>
              </h3>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-white/65 max-w-md">
                Send a sparky a link. When they sign up they get a free month, and so do you. Most
                of our best users come from a recommendation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShareSheetOpen(true)}
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full border border-elec-yellow/30 bg-elec-yellow/15 hover:bg-elec-yellow/25 text-[13px] font-semibold text-elec-yellow transition-colors touch-manipulation self-start sm:self-end"
            >
              <span>Get your link</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}

export default BringAMate;
