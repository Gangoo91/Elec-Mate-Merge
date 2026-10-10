/**
 * What the firm is still waiting on people to sign (ELE-1944, ELE-1946):
 * recent toolbox talks with names missing from the register, and published
 * policies with people yet to acknowledge them, plus policies due for review.
 * Feeds the Overview's To do list.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { briefingRegister } from '@/components/electrician-tools/site-safety/briefings/briefingSignOffs';

export interface TalkAttention {
  id: string;
  name: string;
  date: string;
  signed: number;
  total: number;
  missing: string[];
}

export interface PolicyStatus {
  id: string;
  name: string;
  status: string | null;
  review_date: string | null;
  published_version: number | null;
  published_at: string | null;
  updated_at: string | null;
  team: number;
  acknowledged: number;
}

export interface FirmSignoffAttention {
  talks: TalkAttention[];
  policies: PolicyStatus[];
}

export function useFirmPolicyStatus(enabled = true) {
  return useQuery({
    queryKey: ['firm-policy-status'],
    enabled,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<PolicyStatus[]> => {
      const { data, error } = await supabase.rpc('get_firm_policy_status' as never);
      if (error) throw error;
      return (data as unknown as PolicyStatus[]) ?? [];
    },
  });
}

export function useFirmSignoffAttention(firmId: string | null | undefined) {
  return useQuery({
    queryKey: ['firm-signoff-attention', firmId],
    enabled: !!firmId,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<FirmSignoffAttention> => {
      const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const today = new Date().toISOString().slice(0, 10);
      const [{ data: rows, error }, policies] = await Promise.all([
        supabase
          .from('team_briefings')
          .select('id, briefing_name, briefing_date, status, attendees, attendee_signatures')
          .eq('employer_id' as never, firmId as string)
          .neq('status', 'cancelled')
          .gte('briefing_date', since)
          .lte('briefing_date', today)
          .order('briefing_date', { ascending: false })
          .limit(30),
        supabase.rpc('get_firm_policy_status' as never),
      ]);
      if (error) throw error;
      const talks: TalkAttention[] = [];
      for (const r of (rows ?? []) as unknown as Array<{
        id: string;
        briefing_name: string | null;
        briefing_date: string;
        attendees: unknown;
        attendee_signatures: unknown;
      }>) {
        const reg = briefingRegister(r);
        if (reg.total === 0 || reg.signed >= reg.total) continue;
        talks.push({
          id: r.id,
          name: r.briefing_name || 'Toolbox talk',
          date: r.briefing_date,
          signed: reg.signed,
          total: reg.total,
          missing: reg.rows.filter((x) => !x.acknowledged).map((x) => x.name),
        });
      }
      return {
        talks,
        policies: policies.error ? [] : ((policies.data as unknown as PolicyStatus[]) ?? []),
      };
    },
  });
}
