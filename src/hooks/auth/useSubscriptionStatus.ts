
import { useState, useEffect } from 'react';
import { ProfileType } from './types';

export function useSubscriptionStatus(profile: ProfileType | null) {
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<Date | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (profile) {
      // Check trial status
      const createdAt = new Date(profile.created_at || new Date());
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial
      
      const now = new Date();
      const isActive = now < trialEndDate;
      const isUserSubscribed = profile.subscribed || false;
      
      setIsTrialActive(isActive && !isUserSubscribed);
      setTrialEndsAt(trialEndDate);
      setIsSubscribed(isUserSubscribed);
    } else {
      setIsTrialActive(false);
      setTrialEndsAt(null);
      setIsSubscribed(false);
    }
  }, [profile]);

  return {
    isTrialActive,
    trialEndsAt,
    isSubscribed,
  };
}
