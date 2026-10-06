/**
 * React Query hooks over the single credentials store (ELE-1950).
 * See src/services/credentialsService.ts for the model.
 *
 * Firm data shares the 'elec-id-profiles' cache with useElecIdProfiles (both
 * come from get_team_credentials), so one fetch feeds the Elec-ID section, the
 * competence matrix, Training and the expiry stats.
 */
import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import {
  addMyCredential,
  addTeamCredential,
  deleteMyCredential,
  deleteTeamCredential,
  fetchMyCredentials,
  setCredentialVerification,
  setEcsCardVerification,
  updateMyCredential,
  updateTeamCredential,
  type CredentialInput,
  type VerificationLevel,
} from '@/services/credentialsService';

export const MY_CREDENTIALS_KEY = ['my-credential-store'] as const;

/** Every cache that renders credentials. */
export function invalidateCredentialCaches(queryClient: QueryClient) {
  for (const key of [
    ['elec-id-profiles'],
    ['certifications'],
    ['trainingRecords'],
    ['team-credential-rows'],
    MY_CREDENTIALS_KEY,
    ['my-credentials'],
    ['elec-id-expiry-alerts'],
  ]) {
    queryClient.invalidateQueries({ queryKey: key as unknown as string[] });
  }
}

/* ── Worker ─────────────────────────────────────────────────────────────── */

export function useMyCredentialStore() {
  return useQuery({
    queryKey: MY_CREDENTIALS_KEY,
    queryFn: fetchMyCredentials,
    staleTime: 60 * 1000,
  });
}

export function useAddMyCredential() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ profileId, input }: { profileId: string; input: CredentialInput }) =>
      addMyCredential(profileId, input),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}

export function useUpdateMyCredential() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CredentialInput> }) =>
      updateMyCredential(id, input),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}

export function useDeleteMyCredential() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMyCredential(id),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}

/* ── Firm ───────────────────────────────────────────────────────────────── */

export function useAddTeamCredential() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ rosterId, input }: { rosterId: string; input: CredentialInput }) =>
      addTeamCredential(rosterId, input),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}

export function useUpdateTeamCredential() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CredentialInput> }) =>
      updateTeamCredential(id, input),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}

export function useDeleteTeamCredential() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTeamCredential(id),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}

export function useSetCredentialVerification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      level,
      method,
    }: {
      id: string;
      level: VerificationLevel;
      method: string | null;
    }) => setCredentialVerification(id, level, method),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}

export function useSetEcsCardVerification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      profileId,
      level,
      method,
    }: {
      profileId: string;
      level: VerificationLevel;
      method: string | null;
    }) => setEcsCardVerification(profileId, level, method),
    onSuccess: () => invalidateCredentialCaches(qc),
  });
}
