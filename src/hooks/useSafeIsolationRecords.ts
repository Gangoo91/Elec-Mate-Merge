import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';

export interface VoltageReadings {
  ln: number | null;
  le: number | null;
  ne: number | null;
}

export interface IsolationStep {
  stepNumber: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  photoUrl?: string;
  notes?: string;
  voltageReadings?: VoltageReadings;
  lockOffNumber?: string;
  provingUnitSerial?: string;
}

export interface SafeIsolationRecord {
  id: string;
  user_id: string;
  rams_id: string | null;
  permit_id: string | null;
  site_address: string;
  circuit_description: string;
  distribution_board: string | null;
  isolation_device: string | null;
  lock_off_number: string | null;
  voltage_detector_serial: string | null;
  voltage_detector_calibration_date: string | null;
  proving_unit_used: boolean;
  steps: IsolationStep[];
  isolation_completed_at: string | null;
  isolator_name: string | null;
  isolator_signature: string | null;
  verifier_name: string | null;
  verifier_signature: string | null;
  re_energisation_at: string | null;
  re_energisation_by: string | null;
  status: 'in_progress' | 'isolated' | 're_energised' | 'cancelled';
  requires_approval: boolean;
  approval_status: 'not_required' | 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  approval_comments: string | null;
  approval_signature: string | null;
  created_at: string;
  updated_at: string;
}

const GS38_STEPS: Omit<IsolationStep, 'completed' | 'completedAt'>[] = [
  {
    stepNumber: 1,
    title: 'Identify Circuit',
    description:
      'Identify the circuit or equipment to be worked on. Confirm with drawings/schedules.',
  },
  {
    stepNumber: 2,
    title: 'Identify Isolation Point',
    description: 'Identify the means of disconnection — switch, fuse carrier, MCB, or isolator.',
  },
  {
    stepNumber: 3,
    title: 'Prove Voltage Indicator',
    description: 'Verify your voltage indicator works using a proving unit or known live source.',
  },
  {
    stepNumber: 4,
    title: 'Isolate Circuit',
    description: 'Disconnect the supply at the identified isolation point.',
  },
  {
    stepNumber: 5,
    title: 'Secure Isolation',
    description: 'Apply lock-off device and warning notice. Record lock-off number.',
  },
  {
    stepNumber: 6,
    title: 'Prove Dead',
    description:
      'Test between all conductors and between each conductor and earth at the point of work.',
  },
  {
    stepNumber: 7,
    title: 'Re-verify Indicator',
    description:
      'Re-test the voltage indicator against the proving unit to confirm it still works correctly.',
  },
  {
    stepNumber: 8,
    title: 'Begin Work',
    description: 'Circuit confirmed dead. Safe to commence work.',
  },
];

export function useSafeIsolationRecords() {
  return useQuery({
    queryKey: ['safe-isolation-records'],
    queryFn: async (): Promise<SafeIsolationRecord[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safe_isolation_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as SafeIsolationRecord[];
    },
    staleTime: 30_000,
  });
}

export function useCreateIsolationRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (record: {
      site_address: string;
      circuit_description: string;
      distribution_board?: string;
      voltage_detector_serial?: string;
      voltage_detector_calibration_date?: string;
      rams_id?: string;
      permit_id?: string;
      photos?: string[];
      isolator_name?: string;
      isolator_signature?: string;
      verifier_name?: string;
      verifier_signature?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const steps = GS38_STEPS.map((s) => ({
        ...s,
        completed: false,
      }));

      const { data, error } = await supabase
        .from('safe_isolation_records')
        .insert({
          user_id: user.id,
          ...record,
          steps,
          status: 'in_progress',
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as SafeIsolationRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['safe-isolation-records'],
      });
      toast({
        title: 'Isolation Record Created',
        description: 'GS38 safe isolation procedure started.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not create isolation record.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateIsolationRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SafeIsolationRecord> & { id: string }) => {
      const { data, error } = await supabase
        .from('safe_isolation_records')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['safe-isolation-records'],
      });
    },
  });
}

export { GS38_STEPS };

/** Default isolation timeout: 8 hours. */
export const ISOLATION_TIMEOUT_HOURS = 8;

/**
 * Get isolation duration info.
 */
export function getIsolationDuration(record: SafeIsolationRecord): {
  hoursElapsed: number;
  isExpiring: boolean;
  isExpired: boolean;
  label: string;
} {
  if (!record.isolation_completed_at || record.status !== 'isolated') {
    return { hoursElapsed: 0, isExpiring: false, isExpired: false, label: '' };
  }

  const completedAt = new Date(record.isolation_completed_at).getTime();
  const now = Date.now();
  const hoursElapsed = (now - completedAt) / 3600000;

  const isExpired = hoursElapsed >= ISOLATION_TIMEOUT_HOURS;
  const isExpiring = !isExpired && hoursElapsed >= ISOLATION_TIMEOUT_HOURS - 1;

  let label = '';
  if (isExpired) {
    label = `Isolation expired (${Math.round(hoursElapsed)}h elapsed — ${ISOLATION_TIMEOUT_HOURS}h limit)`;
  } else if (isExpiring) {
    const minutesLeft = Math.round((ISOLATION_TIMEOUT_HOURS - hoursElapsed) * 60);
    label = `Isolation expiring in ${minutesLeft} minute(s)`;
  } else {
    const remaining = ISOLATION_TIMEOUT_HOURS - hoursElapsed;
    label = `${remaining.toFixed(1)}h remaining`;
  }

  return { hoursElapsed, isExpiring, isExpired, label };
}

/**
 * Check both isolator and verifier signatures are present.
 */
export function hasRequiredSignatures(record: SafeIsolationRecord): boolean {
  return !!(
    record.isolator_name?.trim() &&
    record.isolator_signature?.trim() &&
    record.verifier_name?.trim() &&
    record.verifier_signature?.trim()
  );
}

/**
 * Hook that warns when active isolations are approaching/exceeding timeout.
 */
export function useIsolationExpiryCheck() {
  const { toast } = useToast();
  const { data: records = [] } = useSafeIsolationRecords();
  const warnedRecords = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkExpiry = () => {
      for (const record of records) {
        if (record.status !== 'isolated') continue;
        if (warnedRecords.current.has(record.id)) continue;

        const { isExpiring, isExpired } = getIsolationDuration(record);

        if (isExpired) {
          warnedRecords.current.add(record.id);
          toast({
            title: 'Isolation Expired',
            description: `"${record.circuit_description}" — isolation has exceeded ${ISOLATION_TIMEOUT_HOURS}h limit. Re-verify or re-energise.`,
            variant: 'destructive',
          });
        } else if (isExpiring) {
          warnedRecords.current.add(record.id);
          toast({
            title: 'Isolation Expiring Soon',
            description: `"${record.circuit_description}" — less than 1 hour remaining on isolation timeout.`,
            variant: 'destructive',
          });
        }
      }
    };

    checkExpiry();
    const interval = setInterval(checkExpiry, 60000);
    return () => clearInterval(interval);
  }, [records, toast]);
}
