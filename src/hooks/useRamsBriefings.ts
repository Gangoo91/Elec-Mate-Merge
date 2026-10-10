import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { briefingRegister } from '@/components/electrician-tools/site-safety/briefings/briefingSignOffs';
import {
  applySafetyScope,
  safetyScopeKey,
  useSafetyScope,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';

/**
 * The briefings given on one generated RAMS, and whether each was given on the
 * version now on file.
 *
 * A briefing built from a RAMS records the generation job and the filed
 * version it covered (team_briefings.dynamic_fields). When the RAMS is
 * re-issued, briefings on the earlier version no longer match what is on file:
 * the people who signed them acknowledged a different document. This surfaces
 * that, so the user can brief again — it never changes the old acknowledgements.
 */
export interface RamsBriefingRow {
  id: string;
  name: string;
  date: string;
  version: number | null;
  signed: number;
  total: number;
  /** Given on an earlier version than the one now filed. */
  outdated: boolean;
}

export function useRamsBriefings(generationJobId: string | undefined) {
  const scope = useSafetyScope();
  return useQuery({
    queryKey: ['rams-briefings', generationJobId, ...safetyScopeKey(scope)],
    enabled: !!generationJobId,
    queryFn: async (): Promise<{
      filedVersion: number | null;
      /** When the filed version was written — a review after this is not issued yet. */
      filedAt: string | null;
      briefings: RamsBriefingRow[];
    }> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { filedVersion: null, filedAt: null, briefings: [] };
      const cols: string =
        'id, briefing_name, briefing_date, attendees, attendee_signatures, dynamic_fields';
      // Scoped explicitly, never by RLS alone: the person's own RAMS and
      // briefings, or in the Employer Hub the firm's (employer_id).
      const [{ data: doc }, { data: rows, error }] = await Promise.all([
        applySafetyScope(
          supabase
            .from('rams_documents')
            .select('version, updated_at')
            .eq('ai_generation_metadata->>generation_job_id', generationJobId as string),
          scope,
          user.id
        )
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        applySafetyScope(supabase.from('team_briefings').select(cols), scope, user.id)
          .eq('dynamic_fields->>rams_generation_job_id', generationJobId as string)
          .neq('status', 'cancelled')
          .order('briefing_date', { ascending: false }),
      ]);
      if (error) throw error;
      const filedVersion = (doc as { version?: number } | null)?.version ?? null;
      const filedAt = (doc as { updated_at?: string } | null)?.updated_at ?? null;
      type Row = {
        id: string;
        briefing_name: string;
        briefing_date: string;
        attendees: unknown;
        attendee_signatures: unknown;
        dynamic_fields: { rams_version?: number | null } | null;
      };
      const briefings = ((rows ?? []) as unknown as Row[]).map((b) => {
        const reg = briefingRegister(b);
        const version = b.dynamic_fields?.rams_version ?? null;
        return {
          id: b.id,
          name: b.briefing_name,
          date: b.briefing_date,
          version,
          signed: reg.signed,
          total: reg.total,
          // A briefing given before anything was filed covers what became
          // version 1; it is only out of date once a later version exists.
          outdated:
            filedVersion != null && (version == null ? filedVersion > 1 : version < filedVersion),
        };
      });
      return { filedVersion, filedAt, briefings };
    },
    staleTime: 15_000,
  });
}
