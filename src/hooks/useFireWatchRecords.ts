import { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FireWatchChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface FireWatchRecord {
  id: string;
  permit_id: string | null;
  job_id: string | null;
  user_id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number;
  location: string | null;
  checklist: FireWatchChecklistItem[];
  completed_by: string | null;
  completed_signature: string | null;
  photos: string[] | null;
  status: 'active' | 'awaiting_follow_up' | 'completed' | 'extended';
  created_at: string;
  /**
   * HSG168 para 122 — the check due two hours after hot work ended, on top of
   * the hour of continuous watch. A watch now ends in 'awaiting_follow_up' and
   * only reaches 'completed' once this has been signed off.
   */
  follow_up_due_at: string | null;
  follow_up_completed_at: string | null;
  follow_up_by: string | null;
  follow_up_notes: string | null;
  follow_up_all_clear: boolean | null;
}

/** Hours after the end of hot work at which the second check falls due. */
export const FOLLOW_UP_AFTER_HOURS = 2;

/** A watch whose two-hour check is due now and has not been done. */
export function isFollowUpDue(r: FireWatchRecord, now: Date = new Date()): boolean {
  if (r.status !== 'awaiting_follow_up' || r.follow_up_completed_at) return false;
  return !!r.follow_up_due_at && new Date(r.follow_up_due_at) <= now;
}

export function useFireWatchRecords() {
  return useQuery({
    queryKey: ['fire-watch-records'],
    queryFn: async (): Promise<FireWatchRecord[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('fire_watch_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as FireWatchRecord[];
    },
    staleTime: 30_000,
  });
}

/** Bell notification type for the outstanding two-hour check. */
const FOLLOW_UP_NOTIFICATION_TYPE = 'fire_watch_follow_up';

/**
 * Surfaces fire watches whose HSG168 two-hour check has fallen due.
 *
 * The other safety modules do their expiry checking inside their own screen
 * (`usePermitExpiryCheck` lives in the permit module, `useIsolationExpiryCheck`
 * in the isolation one), which is fine when the thing being watched is on the
 * screen you are already looking at. It is exactly wrong here: the two-hour
 * check exists *because* everyone has left the area. Nobody is sitting in the
 * fire watch screen waiting for it.
 *
 * So this runs at the Site Safety hub, and — more importantly — writes a row
 * into `user_notifications`, which is the app's single bell. That means the
 * reminder survives the app being closed at the moment it fell due, and is
 * visible from anywhere in the app rather than only from this hub.
 *
 * One notification per record, ever: existing rows are read first and used to
 * skip records already notified, so re-mounting the hub cannot spam the bell.
 */
export function useFireWatchFollowUpCheck() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const notifiedThisSession = useRef<Set<string>>(new Set());

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: due } = await supabase
        .from('fire_watch_records')
        .select('id, location, follow_up_due_at')
        .eq('user_id', user.id)
        .eq('status', 'awaiting_follow_up')
        .is('follow_up_completed_at', null)
        .lte('follow_up_due_at', new Date().toISOString());

      if (!due?.length) return;

      // One read to find what the bell already knows about, rather than a
      // round trip per record.
      const { data: existing } = await supabase
        .from('user_notifications')
        .select('metadata')
        .eq('user_id', user.id)
        .eq('type', FOLLOW_UP_NOTIFICATION_TYPE);

      const alreadyNotified = new Set(
        (existing ?? [])
          .map((n) => (n.metadata as { record_id?: string } | null)?.record_id)
          .filter(Boolean) as string[]
      );

      const fresh = due.filter(
        (r) => !alreadyNotified.has(r.id) && !notifiedThisSession.current.has(r.id)
      );
      if (!fresh.length) return;

      fresh.forEach((r) => notifiedThisSession.current.add(r.id));

      const { error } = await supabase.from('user_notifications').insert(
        fresh.map((r) => ({
          user_id: user.id,
          type: FOLLOW_UP_NOTIFICATION_TYPE,
          title: 'Fire watch — two-hour check due',
          message: r.location
            ? `Re-inspect ${r.location}, including voids and the far side of any partition worked on.`
            : 'Re-inspect the hot work area, including voids and the far side of any partition worked on.',
          // Canonical hub path (ElectricianHubRoutes). /electrician-tools/
          // site-safety also resolves, but every other nav surface uses this
          // one. Verified in the router, not by fetching — the SPA answers 200
          // for any path.
          link: '/electrician/site-safety',
          metadata: { record_id: r.id, due_at: r.follow_up_due_at },
          is_read: false,
        }))
      );

      // The toast is not conditional on the bell write succeeding. Persisting
      // the notification is the nice-to-have; telling the person in front of
      // us that a hot work area is overdue a check is the point, and it should
      // not be lost because a row failed to insert.
      if (error) {
        console.error('Could not persist fire watch follow-up notification', error);
      } else {
        queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
      }

      toast({
        title:
          fresh.length === 1
            ? 'Fire watch — two-hour check due'
            : `${fresh.length} fire watches need their two-hour check`,
        description: 'HSG168 — re-inspect the area before the record can be closed.',
      });
    };

    check();
    // A watch started now falls due in two hours, so re-checking every five
    // minutes is ample and costs one small query.
    const t = setInterval(check, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, [queryClient, toast]);
}
