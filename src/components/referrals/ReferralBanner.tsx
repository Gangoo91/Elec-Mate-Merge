/**
 * ReferralBanner
 * Dashboard onboarding banner shown in the first 7 days after signup.
 * "Invite a mate — free month for both of you."
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gift, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ReferralShareSheet from './ReferralShareSheet';

const ReferralBanner: React.FC = () => {
  const { profile } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);

  // Only show in first 7 days
  if (dismissed) return null;

  const createdAt = profile?.created_at ? new Date(profile.created_at) : null;
  if (!createdAt) return null;

  const daysSinceSignup = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceSignup > 7) return null;

  // Check localStorage for dismissal
  const dismissKey = 'elec-mate-referral-banner-dismissed';
  if (typeof window !== 'undefined' && localStorage.getItem(dismissKey)) return null;

  const handleDismiss = () => {
    localStorage.setItem(dismissKey, 'true');
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
        className="relative p-4 rounded-2xl bg-gradient-to-r from-green-500/15 via-emerald-500/10 to-transparent border border-green-500/20 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-green-400" />

        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Gift className="h-5 w-5 text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Invite a mate</p>
            <p className="text-xs text-white truncate">Free month for both of you</p>
          </div>
          <Button
            onClick={() => setShareSheetOpen(true)}
            size="sm"
            className="bg-green-500 hover:bg-green-500/90 text-white font-semibold h-11 px-4 rounded-xl touch-manipulation active:scale-[0.97] flex-shrink-0"
          >
            Share
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg hover:bg-white/10 touch-manipulation absolute top-1 right-1"
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ReferralBanner;
