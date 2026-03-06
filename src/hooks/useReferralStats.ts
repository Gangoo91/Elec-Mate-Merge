/**
 * useReferralStats
 * Fetches referral dashboard data via the get_referral_stats RPC function.
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ReferralRecentItem {
  id: string;
  status: string;
  source: string;
  created_at: string;
  referred_name: string;
}

export interface ReferralStats {
  referral_code: string | null;
  referral_url: string;
  total_referrals: number;
  successful_referrals: number;
  credits_pence: number;
  credits_formatted: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  next_tier: string | null;
  referrals_to_next_tier: number;
  recent_referrals: ReferralRecentItem[];
}

export function useReferralStats() {
  const { user } = useAuth();

  return useQuery<ReferralStats>({
    queryKey: ['referral-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('get_referral_stats', {
        p_user_id: user.id,
      });

      if (error) throw error;
      return data as unknown as ReferralStats;
    },
    enabled: !!user?.id,
    staleTime: 30_000, // 30 seconds
    refetchOnWindowFocus: true,
  });
}
