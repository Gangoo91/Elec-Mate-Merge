import React from 'react';
import { BusinessAISalesView } from './BusinessAISalesView';

// Locked to the sales/signup view until Mate goes live publicly.
//
// Everything below is built and ready to go — uncomment when launching:
//
//   import { BusinessAIOnboardingView } from './BusinessAIOnboardingView';
//   import { BusinessAIDashboardView } from './BusinessAIDashboardView';
//   import { useBusinessAIProfile } from './useBusinessAIProfile';
//
//   export default function BusinessAIPage() {
//     const { state } = useBusinessAIProfile();
//     if (state === 'active') return <BusinessAIDashboardView />;
//     if (state === 'onboarding') return <BusinessAIOnboardingView />;
//     return <BusinessAISalesView />;
//   }
//
// Beta users (9 manually-provisioned) can still find their Mate dashboard
// via Settings → Mate. The sidebar entry continues to route here, which
// shows the sales view to everyone — including subscribers — for now.
export default function BusinessAIPage() {
  return <BusinessAISalesView />;
}
