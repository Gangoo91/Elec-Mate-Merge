import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';

export interface AccidentRecord {
  id: string;
  user_id: string;
  injured_name: string;
  injured_role: string | null;
  injured_employer: string | null;
  injured_address: string | null;
  incident_date: string;
  incident_time: string | null;
  location: string;
  location_detail: string | null;
  injury_type: string;
  body_part: string;
  severity: 'minor' | 'moderate' | 'major' | 'fatal';
  injury_description: string | null;
  incident_description: string;
  activity_at_time: string | null;
  cause: string | null;
  witnesses: string | null;
  first_aid_given: boolean;
  first_aid_details: string | null;
  first_aider_name: string | null;
  hospital_visit: boolean;
  hospital_name: string | null;
  time_off_work: boolean;
  days_off: number;
  return_date: string | null;
  reported_to: string | null;
  reported_date: string | null;
  is_riddor_reportable: boolean;
  riddor_category: string | null;
  riddor_reference: string | null;
  riddor_reported: boolean;
  riddor_deadline: string | null;
  riddor_reported_date: string | null;
  recorded_by: string;
  additional_notes: string | null;
  corrective_actions: string | null;
  reporter_signature: string | null;
  pdf_url: string | null;
  photos: string[] | null;
  incident_number: string | null;
  is_archived: boolean;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateAccidentRecordInput = Omit<
  AccidentRecord,
  | 'id'
  | 'user_id'
  | 'created_at'
  | 'updated_at'
  | 'pdf_url'
  | 'photos'
  | 'reporter_signature'
  | 'incident_number'
  | 'is_archived'
  | 'archived_at'
> & {
  photos?: string[];
  reporter_signature?: string;
};

export function useAccidentRecords() {
  return useQuery({
    queryKey: ['accident-records'],
    queryFn: async (): Promise<AccidentRecord[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('accident_records')
        .select('*')
        .eq('user_id', user.id)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data as AccidentRecord[];
    },
  });
}

export function useCreateAccidentRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateAccidentRecordInput): Promise<AccidentRecord> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('accident_records')
        .insert({ ...input, user_id: user.id })
        .select('*')
        .single();

      if (error) throw error;
      return data as AccidentRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['accident-records'] });
      if (data.is_riddor_reportable) {
        toast({
          title: 'RIDDOR: Review required',
          description: 'This incident may be reportable — review the RIDDOR guidance.',
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Record saved', description: 'Accident record has been saved.' });
      }
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteAccidentRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('accident_records').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accident-records'] });
      toast({ title: 'Record deleted', description: 'Accident record has been removed.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

export function useRIDDORRecords() {
  return useQuery({
    queryKey: ['accident-records', 'riddor'],
    queryFn: async (): Promise<AccidentRecord[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('accident_records')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_riddor_reportable', true)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data as AccidentRecord[];
    },
  });
}

/**
 * Calculate RIDDOR reporting deadline based on incident type.
 * - Fatal/specified injuries: immediately (deadline = incident_date)
 * - Over 7 days incapacitation: 15 days from incident
 * - Dangerous occurrences: 10 days from incident
 */
export function calculateRIDDORDeadline(record: Partial<AccidentRecord>): string | null {
  if (!record.incident_date) return null;

  const incidentDate = new Date(record.incident_date);

  // Fatal — immediate reporting by phone
  if (record.severity === 'fatal') {
    return incidentDate.toISOString().split('T')[0];
  }

  // Major/specified injuries — immediate reporting
  if (record.severity === 'major') {
    return incidentDate.toISOString().split('T')[0];
  }

  // Over 7 days incapacitation — 15 days from incident
  if (record.time_off_work && record.days_off && record.days_off >= 7) {
    const deadline = new Date(incidentDate);
    deadline.setDate(deadline.getDate() + 15);
    return deadline.toISOString().split('T')[0];
  }

  // Electric shock causing loss of consciousness or requiring hospital
  // (refined check — not ALL electric shocks are RIDDOR-reportable)
  if (record.injury_type === 'electric-shock' && record.hospital_visit) {
    const deadline = new Date(incidentDate);
    deadline.setDate(deadline.getDate() + 10);
    return deadline.toISOString().split('T')[0];
  }

  return null;
}

/**
 * Get RIDDOR deadline status for display.
 */
export function getRIDDORDeadlineStatus(record: AccidentRecord): {
  status: 'reported' | 'immediate' | 'due_soon' | 'overdue' | 'pending' | 'not_applicable';
  daysRemaining: number | null;
  label: string;
} {
  if (!record.is_riddor_reportable) {
    return { status: 'not_applicable', daysRemaining: null, label: 'Not Reportable' };
  }

  if (record.riddor_reported || record.riddor_reported_date) {
    return { status: 'reported', daysRemaining: null, label: 'Reported' };
  }

  const deadline = record.riddor_deadline || calculateRIDDORDeadline(record);
  if (!deadline) {
    return { status: 'pending', daysRemaining: null, label: 'Review Required' };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const daysRemaining = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Fatal/major = immediate
  if (record.severity === 'fatal' || record.severity === 'major') {
    if (daysRemaining < 0) {
      return {
        status: 'overdue',
        daysRemaining,
        label: `Overdue by ${Math.abs(daysRemaining)} day(s)`,
      };
    }
    return { status: 'immediate', daysRemaining: 0, label: 'Report Immediately' };
  }

  if (daysRemaining < 0) {
    return {
      status: 'overdue',
      daysRemaining,
      label: `Overdue by ${Math.abs(daysRemaining)} day(s)`,
    };
  }

  if (daysRemaining <= 3) {
    return { status: 'due_soon', daysRemaining, label: `${daysRemaining} day(s) remaining` };
  }

  return { status: 'pending', daysRemaining, label: `${daysRemaining} day(s) remaining` };
}

/**
 * Hook that checks for approaching/overdue RIDDOR deadlines and shows toast warnings.
 * Run this in the accident book component.
 */
export function useRIDDORDeadlineCheck() {
  const { toast } = useToast();
  const { data: riddorRecords = [] } = useRIDDORRecords();
  const warnedRecords = useRef<Set<string>>(new Set());

  useEffect(() => {
    for (const record of riddorRecords) {
      if (record.riddor_reported || record.riddor_reported_date) continue;
      if (warnedRecords.current.has(record.id)) continue;

      const deadlineStatus = getRIDDORDeadlineStatus(record);

      if (deadlineStatus.status === 'immediate') {
        warnedRecords.current.add(record.id);
        toast({
          title: 'RIDDOR: Immediate Report Required',
          description: `"${record.injured_name}" — ${record.severity === 'fatal' ? 'Fatal injury' : 'Major/specified injury'}. Report immediately by phone: 0345 300 9923`,
          variant: 'destructive',
        });
      } else if (deadlineStatus.status === 'overdue') {
        warnedRecords.current.add(record.id);
        toast({
          title: 'RIDDOR: Deadline Overdue',
          description: `"${record.injured_name}" — report is ${deadlineStatus.label}. Report now at hse.gov.uk/riddor`,
          variant: 'destructive',
        });
      } else if (deadlineStatus.status === 'due_soon') {
        warnedRecords.current.add(record.id);
        toast({
          title: 'RIDDOR: Deadline Approaching',
          description: `"${record.injured_name}" — ${deadlineStatus.label} to report.`,
          variant: 'destructive',
        });
      }
    }
  }, [riddorRecords, toast]);
}

/**
 * Trigger server-side archival of accident records older than 3 years.
 * Call on component mount to ensure archival flags are current.
 */
export function useArchiveOldRecords() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const archive = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.rpc('archive_old_accident_records', {
        target_user_id: user.id,
      });

      // If any records were archived, refresh the list
      if (data && data > 0) {
        queryClient.invalidateQueries({ queryKey: ['accident-records'] });
      }
    };

    archive();
  }, [queryClient]);
}
