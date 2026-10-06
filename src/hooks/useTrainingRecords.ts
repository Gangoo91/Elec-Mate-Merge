import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getElecIdProfiles, type ElecIdProfile } from '@/services/elecIdService';
import {
  addTeamCredential,
  deleteTeamCredential,
  updateTeamCredential,
  type CredentialInput,
  type VerificationLevel,
} from '@/services/credentialsService';
import { invalidateCredentialCaches } from '@/hooks/useCredentialStore';

/*
 * ELE-1950: training is part of each person's ONE credentials store (their
 * Elec-ID, category 'training'). training_records is [LEGACY — DO NOT USE].
 * Reads come from get_team_credentials (scoped to the firm the user acts for,
 * co-admins included); writes go through the team credential RPCs, which only
 * let the firm change items it recorded itself.
 */

export type TrainingType =
  'Induction' | 'Safety' | 'CPD' | 'Apprenticeship' | 'Certification' | 'Refresher';
export type TrainingStatus = 'Pending' | 'In Progress' | 'Completed' | 'Expired' | 'Failed';

export interface TrainingRecord {
  id: string;
  user_id: string;
  employee_id?: string;
  training_name: string;
  training_type?: TrainingType;
  provider?: string;
  description?: string;
  start_date?: string;
  completed_date?: string;
  expiry_date?: string;
  certificate_number?: string;
  certificate_url?: string;
  status: TrainingStatus;
  /** How it was checked — training is self-declared until someone checks it. */
  verification_level?: VerificationLevel;
  /** True when this firm recorded it (and so may edit or remove it). */
  recorded_by_firm?: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

export type CreateTrainingRecordInput = Omit<
  TrainingRecord,
  'id' | 'user_id' | 'created_at' | 'updated_at' | 'employee'
>;
export type UpdateTrainingRecordInput = Partial<CreateTrainingRecordInput>;

const DONE: TrainingStatus[] = ['Completed', 'Expired'];

function toTrainingRecords(profiles: ElecIdProfile[]): TrainingRecord[] {
  return profiles
    .flatMap((p) =>
      (p.qualifications ?? [])
        .filter((q) => q.category === 'training')
        .map(
          (q): TrainingRecord => ({
            id: q.id,
            user_id: q.added_by_employer_id ?? '',
            employee_id: p.employee_id,
            training_name: q.qualification_name,
            training_type: (q.training_type as TrainingType | null) ?? undefined,
            provider: q.awarding_body ?? undefined,
            start_date: q.start_date ?? undefined,
            completed_date: q.date_achieved ?? undefined,
            expiry_date: q.expiry_date ?? undefined,
            certificate_number: q.certificate_number ?? undefined,
            certificate_url: q.document_url ?? undefined,
            status: (q.training_status as TrainingStatus | null) ?? 'Completed',
            created_at: q.created_at,
            updated_at: q.created_at,
            verification_level: q.verification_level ?? 'self_declared',
            recorded_by_firm: Boolean(q.added_by_employer_id),
            employee: p.employee ? { id: p.employee_id, name: p.employee.name } : undefined,
          })
        )
    )
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

const selectTraining = (profiles: ElecIdProfile[]) => toTrainingRecords(profiles);

const toInput = (input: Partial<CreateTrainingRecordInput>): Partial<CredentialInput> => {
  const out: Partial<CredentialInput> = {};
  if (input.training_name !== undefined) out.qualification_name = input.training_name;
  if (input.training_type !== undefined) out.training_type = input.training_type ?? null;
  if (input.provider !== undefined) out.awarding_body = input.provider || null;
  if (input.start_date !== undefined) out.start_date = input.start_date || null;
  if (input.completed_date !== undefined) out.date_achieved = input.completed_date || null;
  if (input.expiry_date !== undefined) out.expiry_date = input.expiry_date || null;
  if (input.certificate_number !== undefined)
    out.certificate_number = input.certificate_number || null;
  if (input.certificate_url !== undefined) out.document_url = input.certificate_url || null;
  if (input.status !== undefined) out.training_status = input.status;
  return out;
};

// Fetch all training records for the firm's team
export function useTrainingRecords() {
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
    select: selectTraining,
  });
}

// Fetch training records by status
export function useTrainingRecordsByStatus(status: TrainingStatus) {
  const select = (profiles: ElecIdProfile[]) =>
    toTrainingRecords(profiles).filter((t) => t.status === status);
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
    select,
  });
}

// Fetch training records for a specific employee (roster row id)
export function useTrainingRecordsByEmployee(employeeId: string | undefined) {
  const select = (profiles: ElecIdProfile[]) =>
    toTrainingRecords(profiles.filter((p) => p.employee_id === employeeId));
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
    select,
    enabled: !!employeeId,
  });
}

// Get training statistics
export function useTrainingStats() {
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
    select: (profiles: ElecIdProfile[]) => {
      const data = toTrainingRecords(profiles);
      const today = new Date().toISOString().split('T')[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      return {
        total: data.length,
        completed: data.filter((t) => t.status === 'Completed').length,
        inProgress: data.filter((t) => t.status === 'In Progress').length,
        pending: data.filter((t) => t.status === 'Pending').length,
        expired: data.filter(
          (t) => t.status === 'Expired' || (t.expiry_date && t.expiry_date < today)
        ).length,
        expiringsSoon: data.filter(
          (t) => t.expiry_date && t.expiry_date >= today && t.expiry_date <= thirtyDaysFromNow
        ).length,
      };
    },
  });
}

// Create a training record on a team member's Elec-ID
export function useCreateTrainingRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateTrainingRecordInput): Promise<string> => {
      if (!input.employee_id) {
        throw new Error('Choose who the training is for. It is saved on their Elec-ID.');
      }
      return addTeamCredential(input.employee_id, {
        ...(toInput(input) as CredentialInput),
        qualification_name: input.training_name,
        category: 'training',
        training_status: input.status ?? 'Pending',
      });
    },
    onSuccess: () => {
      invalidateCredentialCaches(queryClient);
      toast({
        title: 'Training added',
        description: 'Saved on their Elec-ID as self-declared until someone checks the certificate.',
      });
    },
    onError: (error) => {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    },
  });
}

// Update a training record the firm recorded
export function useUpdateTrainingRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateTrainingRecordInput & { id: string }) => {
      await updateTeamCredential(id, toInput(input));
    },
    onSuccess: () => {
      invalidateCredentialCaches(queryClient);
      toast({ title: 'Training updated' });
    },
    onError: (error) => {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    },
  });
}

// Update training status
export function useUpdateTrainingStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      completed_date,
    }: {
      id: string;
      status: TrainingStatus;
      completed_date?: string;
    }): Promise<TrainingStatus> => {
      const patch: Partial<CredentialInput> = { training_status: status };
      if (DONE.includes(status)) {
        patch.date_achieved = completed_date ?? new Date().toISOString().split('T')[0];
      }
      await updateTeamCredential(id, patch);
      return status;
    },
    onSuccess: (status) => {
      invalidateCredentialCaches(queryClient);
      toast({ title: 'Status updated', description: `Training marked as ${status}.` });
    },
    onError: (error) => {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    },
  });
}

// Delete a training record the firm recorded
export function useDeleteTrainingRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await deleteTeamCredential(id);
    },
    onSuccess: () => {
      invalidateCredentialCaches(queryClient);
      toast({ title: 'Training removed', description: 'Taken off their Elec-ID.' });
    },
    onError: (error) => {
      toast({ title: 'Not removed', description: error.message, variant: 'destructive' });
    },
  });
}
