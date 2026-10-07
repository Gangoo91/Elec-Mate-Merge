import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';

/**
 * ELE-1951 — who was invited to the team and never joined.
 *
 * employer_team_invites holds one row per invite email (send-team-welcome
 * mints a fresh token each time and revokes the previous one), so the rows for
 * a person ARE their send history: first sent, last sent, how many.
 */

export interface InviteHistory {
  employeeId: string;
  firstSentAt: string;
  lastSentAt: string;
  sends: number;
  /** The live link, if the latest invite is still pending and in date. */
  liveToken: string | null;
  expiresAt: string | null;
  expired: boolean;
}

const INVITES_KEY = ['team-invite-history'];

export const inviteLink = (token: string) => `https://elec-mate.com/team/accept/${token}`;

export function useTeamInviteHistory() {
  const { user } = useAuth();
  return useQuery({
    queryKey: [...INVITES_KEY, user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<Map<string, InviteHistory>> => {
      const firm = (await getActingEmployerId(user!.id)) ?? user!.id;
      const { data, error } = await supabase
        .from('employer_team_invites' as never)
        .select('employee_id, status, created_at, expires_at, token')
        .eq('employer_id', firm)
        .order('created_at', { ascending: true });
      if (error) throw error;
      const rows =
        (data as unknown as Array<{
          employee_id: string | null;
          status: string;
          created_at: string;
          expires_at: string | null;
          token: string;
        }>) ?? [];
      const map = new Map<string, InviteHistory>();
      const now = Date.now();
      for (const r of rows) {
        if (!r.employee_id) continue;
        const prev = map.get(r.employee_id);
        const isLive =
          r.status === 'pending' && (!r.expires_at || new Date(r.expires_at).getTime() > now);
        map.set(r.employee_id, {
          employeeId: r.employee_id,
          firstSentAt: prev?.firstSentAt ?? r.created_at,
          lastSentAt: r.created_at,
          sends: (prev?.sends ?? 0) + 1,
          liveToken: isLive ? r.token : null,
          expiresAt: r.expires_at,
          expired: r.status === 'pending' && !isLive,
        });
      }
      return map;
    },
  });
}

/**
 * Chase = re-send the invite email. chase_team_invite() is the gate (owner or
 * manager of the firm; 24h between sends; at most 3 chases) and records the
 * chase; send-team-welcome then re-mints the token and sends the email.
 */
export function useChaseTeamInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (employeeId: string) => {
      const { error: gateError } = await supabase.rpc('chase_team_invite' as never, {
        p_employee_id: employeeId,
      } as never);
      if (gateError) throw new Error(gateError.message);
      const { data, error } = await supabase.functions.invoke('send-team-welcome', {
        body: { employeeId },
      });
      if (error) {
        throw new Error('The email did not go. Try again in a minute.');
      }
      if ((data as { success?: boolean } | null)?.success === false) {
        throw new Error(
          (data as { error?: string }).error || 'The email did not go. Try again in a minute.'
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: INVITES_KEY });
      queryClient.invalidateQueries({ queryKey: ['employer-employees'] });
    },
  });
}
