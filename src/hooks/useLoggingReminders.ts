/**
 * useLoggingReminders — one switch for the "log your hours / add evidence /
 * keep your streak" nagging (ELE-1804).
 *
 * Andy (HMO Electrical, apprentice plan, working electrician): "I want to turn
 * all the prompts, to log data, off. I'd like to reduce what I see until I
 * choose to see it." An audit on 4 Oct 2026 found 26 such prompts in-app and
 * almost none could be turned off.
 *
 * Scope Andrew chose ("the nagging only"): this hides REMINDERS and WARNINGS —
 * behind-on-hours banners, streak chips, "needs you" lists, pace warnings, AI
 * "log this" tips, the weekly recap pop-up. It does NOT hide the plain buttons
 * people tap themselves (Log hours, Add evidence), the figures inside pages
 * they choose to open, or messages from a tutor.
 *
 * Stored in `user_settings` (key `hide_logging_reminders`, owner-only RLS), so
 * it is per user and follows them to every device. Turning it on also switches
 * off the `apprentice` push category, so the hours-behind push stays silent if
 * that cron is ever re-enabled.
 */

import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const KEY = 'hide_logging_reminders';

export function useLoggingReminders() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ['logging-reminders', user?.id];

  const { data: hidden = false } = useQuery({
    queryKey,
    queryFn: async (): Promise<boolean> => {
      if (!user?.id) return false;
      const { data, error } = await supabase
        .from('user_settings')
        .select('value')
        .eq('user_id', user.id)
        .eq('key', KEY)
        .maybeSingle();
      // A failed read shows the reminders — the default, never a blank screen.
      if (error || !data) return false;
      return data.value === true;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const setHidden = useCallback(
    async (next: boolean) => {
      if (!user?.id) return;
      const previous = hidden;
      queryClient.setQueryData(queryKey, next);
      const now = new Date().toISOString();
      const [setting, push] = await Promise.all([
        supabase
          .from('user_settings')
          .upsert({ user_id: user.id, key: KEY, value: next, updated_at: now }, { onConflict: 'user_id,key' }),
        // Same row shape the Notifications tab writes (usePushNotifications).
        supabase
          .from('notification_preferences')
          .upsert(
            { user_id: user.id, category: 'apprentice', enabled: !next, updated_at: now },
            { onConflict: 'user_id,category' }
          ),
      ]);
      if (setting.error) {
        console.error('[logging-reminders] save failed', setting.error);
        queryClient.setQueryData(queryKey, previous);
        throw setting.error;
      }
      if (push.error) console.error('[logging-reminders] push preference not saved', push.error);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user?.id, hidden, queryClient]
  );

  return { hidden, setHidden };
}
