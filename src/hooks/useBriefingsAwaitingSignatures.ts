import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { briefingRegister } from '@/components/electrician-tools/site-safety/briefings/briefingSignOffs';

/**
 * Briefings from the last 30 days where someone listed has not acknowledged
 * yet — counted the same way the briefing list counts (link, in-person and
 * in-app sign-offs). Feeds "Needs you" on the Site Safety front page.
 */
export function useBriefingsAwaitingSignatures() {
  return useQuery({
    queryKey: ['briefings-awaiting-signatures'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { count: 0, outstanding: 0 };
      const since = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('team_briefings')
        .select('attendees, attendee_signatures, status')
        .eq('user_id', user.id)
        .neq('status', 'cancelled')
        .gte('briefing_date', since);
      if (error) throw error;
      let count = 0;
      let outstanding = 0;
      for (const b of data ?? []) {
        const r = briefingRegister(b);
        if (r.total > r.signed) {
          count += 1;
          outstanding += r.total - r.signed;
        }
      }
      return { count, outstanding };
    },
    staleTime: 30_000,
  });
}
