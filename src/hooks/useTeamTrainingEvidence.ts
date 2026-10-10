/**
 * useTeamTrainingEvidence (ELE-1834): training evidence for each person on the
 * firm's roster, beside their credentials.
 *
 *  - Briefings and toolbox talks they signed (Site Safety's team briefings and
 *    the older employer briefing store, read only).
 *  - An apprentice's off-the-job hours: workplace-attested and college-verified
 *    kept apart, plus how many entries are still waiting for the firm.
 *
 * This is CPD and training evidence. It never makes a credential held, so the
 * matrix shows it in its own place and never turns a credential column green.
 * Source: get_team_training_evidence() (SECURITY DEFINER, firm managers only).
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SignedBriefing {
  title: string;
  date: string | null;
  /** "Signed", "Signed by link" or "Marked present" */
  how: string;
}

export interface TrainingEvidence {
  employeeId: string;
  briefingsSigned: number;
  lastBriefingOn: string | null;
  recentBriefings: SignedBriefing[];
  otjAttestedMinutes: number;
  otjCollegeVerifiedMinutes: number;
  otjWaiting: number;
  otjLastAttestedAt: string | null;
  otjAttestedByType: Record<string, number>;
}

export const TEAM_TRAINING_EVIDENCE_KEY = ['team-training-evidence'] as const;

export function useTeamTrainingEvidence(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    queryKey: [...TEAM_TRAINING_EVIDENCE_KEY, user?.id],
    enabled: enabled && !!user?.id,
    staleTime: 60_000,
    queryFn: async (): Promise<Map<string, TrainingEvidence>> => {
      const { data, error } = await supabase.rpc('get_team_training_evidence' as never);
      if (error) throw error;
      const rows = (Array.isArray(data) ? data : []) as Array<Record<string, unknown>>;
      const map = new Map<string, TrainingEvidence>();
      for (const r of rows) {
        const id = String(r.employee_id);
        map.set(id, {
          employeeId: id,
          briefingsSigned: Number(r.briefings_signed ?? 0),
          lastBriefingOn: (r.last_briefing_on as string) ?? null,
          recentBriefings: Array.isArray(r.recent_briefings)
            ? (r.recent_briefings as SignedBriefing[])
            : [],
          otjAttestedMinutes: Number(r.otj_attested_minutes ?? 0),
          otjCollegeVerifiedMinutes: Number(r.otj_college_verified_minutes ?? 0),
          otjWaiting: Number(r.otj_waiting ?? 0),
          otjLastAttestedAt: (r.otj_last_attested_at as string) ?? null,
          otjAttestedByType:
            r.otj_attested_by_type && typeof r.otj_attested_by_type === 'object'
              ? (r.otj_attested_by_type as Record<string, number>)
              : {},
        });
      }
      return map;
    },
  });
}

/** "12.5h" from minutes, one decimal place, no trailing ".0". */
export const hoursLabel = (minutes: number): string => `${Math.round((minutes / 60) * 10) / 10}h`;

/** One plain line for a person's training evidence, or null when there is none. */
export function trainingEvidenceLine(
  e:
    | Pick<
        TrainingEvidence,
        'briefingsSigned' | 'otjAttestedMinutes' | 'otjCollegeVerifiedMinutes' | 'otjWaiting'
      >
    | undefined
    | null
): string | null {
  if (!e) return null;
  const parts: string[] = [];
  if (e.briefingsSigned > 0) {
    parts.push(`${e.briefingsSigned} ${e.briefingsSigned === 1 ? 'briefing' : 'briefings'} signed`);
  }
  if (e.otjAttestedMinutes > 0) parts.push(`${hoursLabel(e.otjAttestedMinutes)} training attested`);
  if (e.otjCollegeVerifiedMinutes > 0) {
    parts.push(`${hoursLabel(e.otjCollegeVerifiedMinutes)} college verified`);
  }
  if (e.otjWaiting > 0) parts.push(`${e.otjWaiting} waiting for you`);
  return parts.length ? parts.join(' · ') : null;
}
