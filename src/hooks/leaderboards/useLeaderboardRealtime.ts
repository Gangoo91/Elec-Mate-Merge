
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useLeaderboardRealtime(onDataChange: () => void) {
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    // Set up realtime subscription
    const userActivityChannel = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_activity'
      }, () => {
        onDataChange();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_stats'
      }, () => {
        onDataChange();
      })
      .subscribe();

    setSubscription(userActivityChannel);

    return () => {
      if (subscription) {
        supabase.removeChannel(userActivityChannel);
      }
    };
  }, [onDataChange]);

  return subscription;
}
