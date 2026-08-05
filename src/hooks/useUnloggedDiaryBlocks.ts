import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * ELE-1472 — diary entries for a project that have finished but have not been
 * logged as time yet.
 *
 * Shared by the nudge on the project page (which needs the count) and the
 * sheet that logs them (which needs the rows). One definition of "unlogged"
 * so the badge can never promise days the sheet then doesn't offer.
 */

export interface DiaryBlock {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  all_day: boolean;
  location: string | null;
  notes: string | null;
  project_id: string | null;
}

/** How far back to offer diary blocks. Long enough to catch up after a week
 *  on site, short enough that the list stays a list. */
export const DIARY_LOOKBACK_DAYS = 60;

export function useUnloggedDiaryBlocks(projectId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ['project-diary-blocks', projectId],
    enabled: !!projectId && enabled,
    queryFn: async (): Promise<DiaryBlock[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !projectId) return [];

      const since = new Date();
      since.setDate(since.getDate() - DIARY_LOOKBACK_DAYS);

      // Only blocks that have finished. You cannot have worked a day that has
      // not happened yet, and offering to log one invites a wrong invoice.
      const { data: events, error } = await supabase
        .from('calendar_events')
        .select('id, title, start_at, end_at, all_day, location, notes, project_id')
        .eq('user_id', user.id)
        .gte('start_at', since.toISOString())
        .lte('end_at', new Date().toISOString())
        .order('start_at', { ascending: false });

      if (error) throw error;

      // Blocks already on this project, plus blocks attributed to nothing yet.
      // Requiring them to be tagged first would just move the second step the
      // ticket exists to remove. Logging attributes them.
      const candidates = ((events ?? []) as unknown as DiaryBlock[]).filter(
        (e) => e.project_id === projectId || e.project_id == null
      );
      if (candidates.length === 0) return [];

      // Drop anything already logged. The unique index on
      // time_sessions.calendar_event_id would reject a repeat anyway; this
      // keeps it out of the list so it never looks available in the first place.
      // types.ts predates migration 20260805150000, so it does not know
      // time_sessions.calendar_event_id exists. Left untyped the generated
      // types make this filter resolve to a SelectQueryError and blow the
      // instantiation depth limit. Narrow to the one shape we read, at the
      // boundary. Remove when types.ts is regenerated.
      const loggedRows = (await supabase
        .from('time_sessions')
        .select('calendar_event_id')
        .eq('user_id', user.id)
        .in('calendar_event_id' as never, candidates.map((c) => c.id) as never)) as unknown as {
        data: { calendar_event_id: string | null }[] | null;
      };

      const loggedSet = new Set(
        (loggedRows.data ?? [])
          .map((r) => r.calendar_event_id)
          .filter(Boolean) as string[]
      );

      return candidates.filter((c) => !loggedSet.has(c.id));
    },
  });
}
