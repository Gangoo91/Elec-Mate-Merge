import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useMyEmployerLink — the apprentice's (or any worker's) view of the company
   they are linked to through employer_employees.user_id. Server-side RPC
   (get_my_employer_link, SECURITY DEFINER) so the worker can see the company
   name and who their supervisors are without a read policy on the employer's
   company_profiles row. Null when not linked to any active roster.
   ========================================================================== */

export interface MyEmployerLink {
  employeeId: string;
  employerId: string;
  companyName: string;
  teamRole: string | null;
  linkedSince: string | null;
  /** isMine marks the apprentice's own named supervisor (listed first). */
  supervisors: { name: string; teamRole: string | null; isMine: boolean }[];
  /** Off-the-job entries this apprentice logged that still await workplace attestation. */
  pendingAttestations: number;
  /** Hours already attested by the employer (verified_by_employer). */
  employerAttestedHours: number;
}

export function useMyEmployerLink(enabled = true) {
  return useQuery<MyEmployerLink | null>({
    queryKey: ['my-employer-link'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_my_employer_link' as never);
      if (error) throw error;
      if (!data) return null;
      const r = data as Record<string, unknown>;
      const sups = Array.isArray(r.supervisors) ? (r.supervisors as Record<string, unknown>[]) : [];
      return {
        employeeId: String(r.employee_id),
        employerId: String(r.employer_id),
        companyName: (r.company_name as string) || 'Your employer',
        teamRole: (r.team_role as string) ?? null,
        linkedSince: (r.linked_since as string) ?? null,
        supervisors: sups.map((s) => ({
          name: String(s.name ?? ''),
          teamRole: (s.team_role as string) ?? null,
          isMine: s.is_mine === true,
        })),
        pendingAttestations: Number(r.pending_attestations ?? 0),
        employerAttestedHours: Number(r.employer_attested_hours ?? 0),
      };
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
