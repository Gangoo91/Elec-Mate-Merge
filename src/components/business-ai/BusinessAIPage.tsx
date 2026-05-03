import React from 'react';
import { BusinessAISalesView } from './BusinessAISalesView';
import { BusinessAIOnboardingView } from './BusinessAIOnboardingView';
import { BusinessAIDashboardView } from './BusinessAIDashboardView';
import { useBusinessAIProfile } from './useBusinessAIProfile';

export default function BusinessAIPage() {
  const { state } = useBusinessAIProfile();
  if (state === 'active') return <BusinessAIDashboardView />;
  if (state === 'onboarding') return <BusinessAIOnboardingView />;
  return <BusinessAISalesView />;
}
