import React from 'react';
import { BusinessAISalesView } from './BusinessAISalesView';

// During active beta, the sales view is shown to EVERYONE — including already-
// connected users. Once Mate goes GA we can re-enable the state switch:
//   import { useBusinessAIProfile } from './useBusinessAIProfile';
//   import { BusinessAIOnboardingView } from './BusinessAIOnboardingView';
//   import { BusinessAIDashboardView } from './BusinessAIDashboardView';
export default function BusinessAIPage() {
  return <BusinessAISalesView />;
}
