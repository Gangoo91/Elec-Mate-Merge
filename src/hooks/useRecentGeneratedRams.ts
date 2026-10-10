import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  applySafetyScope,
  safetyScopeKey,
  useSafetyScope,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';

/**
 * The user's most recent AI-generated RAMS, newest first.
 *
 * A generated RAMS lives in `rams_generation_jobs` and only reaches the
 * Documents list (`rams_documents`) once a PDF is exported. Until then the only
 * way back to it was a job it happened to be linked to — so a RAMS generated
 * and reviewed but not yet issued was effectively lost. This surfaces it on the
 * Site Safety front page, opening the results page where it can be edited.
 */
export interface RecentGeneratedRams {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  projectId: string | null;
  /** The firm job it was generated for (Employer Hub), if any. */
  employerJobId: string | null;
  /** Filed (issued) version in Site Safety, if it has been exported. */
  issuedVersion: number | null;
}

export function useRecentGeneratedRams(limit = 3) {
  // Personal: the user's own. Employer Hub: the firm's (employer_id).
  const scope = useSafetyScope();
  return useQuery({
    queryKey: ['recent-generated-rams', limit, ...safetyScopeKey(scope)],
    queryFn: async (): Promise<RecentGeneratedRams[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      // Widened to string: the literal JSON-path select sends the generated
      // types into infinite instantiation (TS2589).
      const cols: string =
        'id, status, created_at, project_id, employer_job_id, job_description, project_name:rams_data->>projectName';
      const { data, error } = await applySafetyScope(
        supabase.from('rams_generation_jobs').select(cols),
        scope,
        user.id
      )
        .in('status', ['complete', 'partial', 'pending', 'processing'])
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      type Row = {
        id: string;
        status: string;
        created_at: string;
        project_id: string | null;
        employer_job_id: string | null;
        job_description: string | null;
        project_name: string | null;
      };
      const rows = (data ?? []) as unknown as Row[];
      // Which of these have been issued? The generation row does not know —
      // filing happens in rams_documents, keyed by the generation job id.
      const issued = new Map<string, number>();
      if (rows.length) {
        const { data: docs } = await applySafetyScope(
          supabase.from('rams_documents').select('version, ai_generation_metadata'),
          scope,
          user.id
        ).in(
          'ai_generation_metadata->>generation_job_id',
          rows.map((r) => r.id)
        );
        for (const d of (docs ?? []) as {
          version: number | null;
          ai_generation_metadata: unknown;
        }[]) {
          const g = (d.ai_generation_metadata as { generation_job_id?: string } | null)
            ?.generation_job_id;
          if (g) issued.set(g, Math.max(issued.get(g) ?? 0, d.version ?? 1));
        }
      }
      return rows.map((r) => {
        const name = String(r.project_name ?? '').trim();
        const fallback = String(r.job_description ?? '').trim();
        return {
          id: r.id,
          title:
            name ||
            (fallback ? (fallback.length > 60 ? `${fallback.slice(0, 57)}…` : fallback) : 'RAMS'),
          status: r.status,
          createdAt: r.created_at,
          projectId: r.project_id ?? null,
          employerJobId: r.employer_job_id ?? null,
          issuedVersion: issued.get(r.id) ?? null,
        };
      });
    },
    staleTime: 30_000,
  });
}
