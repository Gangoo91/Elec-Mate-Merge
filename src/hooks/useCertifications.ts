import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getElecIdProfiles, type ElecIdProfile } from '@/services/elecIdService';
import type { VerificationLevel } from '@/services/credentialsService';
import { isHeld } from '@/services/credentialsService';

/**
 * A team member's credential, keyed by the firm's ROSTER row (employee_id).
 *
 * ELE-1950: this used to read employer_certifications (0 rows, now LEGACY).
 * It is now a view over THE credentials store — each person's Elec-ID
 * qualifications, resolved by get_team_credentials() — sharing the
 * 'elec-id-profiles' cache, so every consumer sees the same records.
 */
export interface Certification {
  id: string;
  employee_id: string;
  name: string;
  /** 'Valid' | 'Expired' | 'Pending' (planned training not yet done) */
  status: string;
  expiry_date: string | null;
  issue_date: string | null;
  issuing_body: string | null;
  certificate_number: string | null;
  document_url: string | null;
  created_at: string;
  updated_at: string;
  verification_level: VerificationLevel;
  category: string | null;
}

const today = () => new Date().toISOString().slice(0, 10);

export function profilesToCertifications(profiles: ElecIdProfile[]): Certification[] {
  const now = today();
  return profiles.flatMap((p) =>
    (p.qualifications ?? []).map((q) => ({
      id: q.id,
      employee_id: p.employee_id,
      name: q.qualification_name,
      status: !isHeld({ training_status: q.training_status ?? null })
        ? 'Pending'
        : q.expiry_date && q.expiry_date < now
          ? 'Expired'
          : 'Valid',
      expiry_date: q.expiry_date,
      issue_date: q.date_achieved,
      issuing_body: q.awarding_body,
      certificate_number: q.certificate_number,
      document_url: q.document_url ?? null,
      created_at: q.created_at,
      updated_at: q.created_at,
      verification_level: q.verification_level ?? 'self_declared',
      category: q.category,
    }))
  );
}

const byExpiry = (a: Certification, b: Certification) =>
  (a.expiry_date ?? '9999') < (b.expiry_date ?? '9999') ? -1 : 1;

const selectAll = (profiles: ElecIdProfile[]) => profilesToCertifications(profiles).sort(byExpiry);

export const useCertifications = () => {
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
    select: selectAll,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCertificationsByEmployee = (employeeId: string | undefined) => {
  const select = useCallback(
    (profiles: ElecIdProfile[]) =>
      profilesToCertifications(profiles.filter((p) => p.employee_id === employeeId)).sort(
        byExpiry
      ),
    [employeeId]
  );
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
    select,
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCertificationsByEmployees = (employeeIds: string[]) => {
  const idsKey = employeeIds.join(',');
  const select = useCallback(
    (profiles: ElecIdProfile[]) => {
      const ids = new Set(idsKey.split(','));
      return profilesToCertifications(profiles.filter((p) => ids.has(p.employee_id))).filter(
        (c) => c.status === 'Valid'
      );
    },
    [idsKey]
  );
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
    select,
    enabled: employeeIds.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
