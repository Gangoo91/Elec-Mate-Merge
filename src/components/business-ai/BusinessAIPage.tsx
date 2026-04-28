import React from 'react';
import { BusinessAISalesView } from './BusinessAISalesView';
import { BusinessAIOnboardingView } from './BusinessAIOnboardingView';
import { BusinessAIDashboardView } from './BusinessAIDashboardView';
import { useBusinessAIProfile } from './useBusinessAIProfile';

/**
 * Routes between three views based on the user's Business AI state:
 *   - sales      → not subscribed yet (or no profile yet)
 *   - onboarding → subscribed (business_ai_enabled=true) but agent not yet active
 *   - active     → agent_status='active', show the dashboard
 *
 * Until 2026-04-28 this page was hard-locked on the sales view because the
 * SMS OTP flow was broken. The new WhatsApp deep-link flow makes self-serve
 * activation possible, so subscribed users now land on the onboarding wizard
 * automatically.
 */
export default function BusinessAIPage() {
  const { state } = useBusinessAIProfile();

  if (state === 'active') return <BusinessAIDashboardView />;
  if (state === 'onboarding') return <BusinessAIOnboardingView />;
  return <BusinessAISalesView />;
}
