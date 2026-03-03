import React from 'react';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { BusinessAISalesView } from './BusinessAISalesView';
import { BusinessAIOnboardingView } from './BusinessAIOnboardingView';
import { BusinessAIDashboardView } from './BusinessAIDashboardView';

export default function BusinessAIPage() {
  const { state } = useBusinessAIProfile();

  switch (state) {
    case 'sales':
      return <BusinessAISalesView />;
    case 'onboarding':
      return <BusinessAIOnboardingView />;
    case 'active':
      return <BusinessAIDashboardView />;
  }
}
