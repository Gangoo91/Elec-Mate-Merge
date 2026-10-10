import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { OTJ_ACTIVITY_LABEL as SHARED_OTJ_ACTIVITY_LABEL } from '@/data/otjActivityTypes';

/* ==========================================================================
   useEmployerOtjAttestations — the employer's in-app inbox of off-the-job
   training entries their apprentices have logged and are waiting for a
   workplace attestation. Until now the only route was the public
   /attest-ojt/<id> link the apprentice shared by WhatsApp; the hub never
   showed what was waiting.

   Authority is kept explicit: an employer attestation flips the entry to
   verification_status 'verified_by_employer' (source_kind 'employer_attested').
   It is NOT college verification ('verified', a tutor/assessor decision) and
   NOT an IQA sample. Both RPCs are SECURITY DEFINER and scoped to apprentices
   on the caller's ACTIVE roster (my_employer_scope), so a co-admin can act too.
   ========================================================================== */

export interface PendingOtjAttestation {
  entryId: string;
  studentUserId: string;
  employeeId: string;
  apprenticeName: string;
  activityDate: string;
  activityType: string;
  title: string;
  description: string | null;
  durationMinutes: number;
  sourceKind: string;
  evidenceUrls: string[];
  createdAt: string;
}

export const OTJ_ATTESTATIONS_KEY = ['employer-otj-attestations'] as const;

export function useEmployerOtjAttestations(enabled = true) {
  return useQuery<PendingOtjAttestation[]>({
    queryKey: OTJ_ATTESTATIONS_KEY,
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_employer_pending_otj_attestations');
      if (error) throw error;
      const rows = (data ?? []) as Array<Record<string, unknown>>;
      return rows.map((r) => ({
        entryId: String(r.entry_id),
        studentUserId: String(r.student_user_id),
        employeeId: String(r.employee_id),
        apprenticeName: (r.apprentice_name as string) || 'Apprentice',
        activityDate: String(r.activity_date),
        activityType: (r.activity_type as string) || 'other',
        title: (r.title as string) || 'Off-the-job training',
        description: (r.description as string) ?? null,
        durationMinutes: Number(r.duration_minutes ?? 0),
        sourceKind: (r.source_kind as string) || 'apprentice_submitted',
        evidenceUrls: Array.isArray(r.evidence_urls) ? (r.evidence_urls as string[]) : [],
        createdAt: String(r.created_at),
      }));
    },
    staleTime: 60_000,
  });
}

export type OtjDecision = 'attest' | 'send_back';

export function useDecideOtjAttestation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entryId,
      decision,
      comment,
    }: {
      entryId: string;
      decision: OtjDecision;
      comment?: string;
    }) => {
      // p_comment defaults to NULL in SQL, so leaving it out sends no comment.
      const { data, error } = await supabase.rpc('attest_otj_as_employer', {
        p_entry_id: entryId,
        p_decision: decision,
        p_comment: comment || undefined,
      });
      if (error) throw error;
      const result = (data ?? {}) as { success?: boolean; error?: string; status?: string };
      if (!result.success) throw new Error(result.error || 'Could not record the decision');
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OTJ_ATTESTATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ['apprentice-progress'] });
    },
  });
}

/** Human label for college_otj_entries.activity_type. */
export const OTJ_ACTIVITY_LABEL: Record<string, string> = SHARED_OTJ_ACTIVITY_LABEL;
