import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { BusinessAISalesView } from './BusinessAISalesView';
import { BusinessAIOnboardingView } from './BusinessAIOnboardingView';
import { BusinessAIDashboardView } from './BusinessAIDashboardView';

export default function BusinessAIPage() {
  const { isLoading } = useAuth();
  const { state } = useBusinessAIProfile();

  // Wait for profile to load before rendering — prevents flash of SalesView
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-amber-400 animate-spin" />
      </div>
    );
  }

  switch (state) {
    case 'sales':
      return <BusinessAISalesView />;
    case 'onboarding':
      return <BusinessAIOnboardingView />;
    case 'active':
      return <BusinessAIDashboardView />;
  }
}
