import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CheckItem {
  id: string;
  label: string;
  result: 'pass' | 'fail' | 'na';
  notes?: string;
  photoUrl?: string;
}

export interface PreUseCheck {
  id: string;
  user_id: string;
  equipment_id: string | null;
  equipment_type: string;
  equipment_description: string | null;
  check_date: string;
  site_address: string | null;
  items: CheckItem[];
  overall_result: 'pass' | 'fail' | 'na';
  checked_by: string | null;
  signature: string | null;
  actions_required: string | null;
  requires_approval: boolean;
  approval_status: 'not_required' | 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  approval_comments: string | null;
  approval_signature: string | null;
  created_at: string;
}

export const CHECK_TEMPLATES: Record<string, Omit<CheckItem, 'result'>[]> = {
  ladder: [
    { id: 'l1', label: 'Stiles straight and undamaged' },
    { id: 'l2', label: 'Rungs secure and free from damage' },
    { id: 'l3', label: 'Feet/shoes present and in good condition' },
    { id: 'l4', label: 'Locking mechanisms working' },
    { id: 'l5', label: 'No cracks, splits, or corrosion' },
    { id: 'l6', label: 'Labels/rating plate visible' },
    { id: 'l7', label: 'Clean and free from oil/grease' },
  ],
  scaffold: [
    { id: 's1', label: 'Base plates secure on firm ground' },
    { id: 's2', label: 'Standards plumb and braced' },
    { id: 's3', label: 'Handrails at correct height (950mm)' },
    { id: 's4', label: 'Toe boards fitted' },
    { id: 's5', label: 'Platforms fully boarded' },
    { id: 's6', label: 'Scaffold tag present and in date' },
    { id: 's7', label: 'Safe access (ladder/stairway)' },
  ],
  power_tool: [
    { id: 'pt1', label: 'Casing undamaged' },
    { id: 'pt2', label: 'Cable/flex in good condition' },
    { id: 'pt3', label: 'Plug pins not bent or loose' },
    { id: 'pt4', label: 'PAT test label in date' },
    { id: 'pt5', label: 'Guards and safety features operational' },
    { id: 'pt6', label: 'Ventilation clear' },
    { id: 'pt7', label: 'Correct accessories fitted' },
  ],
  test_instrument: [
    { id: 'ti1', label: 'Calibration sticker in date' },
    { id: 'ti2', label: 'Case undamaged' },
    { id: 'ti3', label: 'Test leads GS38 compliant' },
    { id: 'ti4', label: 'Probes shrouded (max 4mm exposed)' },
    { id: 'ti5', label: 'Fuses correct rating' },
    { id: 'ti6', label: 'Battery level adequate' },
    { id: 'ti7', label: 'Display clear and readable' },
  ],
  access_equipment: [
    { id: 'ae1', label: 'Structure sound — no visible damage' },
    { id: 'ae2', label: 'Wheels locked (if applicable)' },
    { id: 'ae3', label: 'Guardrails fitted' },
    { id: 'ae4', label: 'Platform secure' },
    { id: 'ae5', label: 'Outriggers deployed (if applicable)' },
    { id: 'ae6', label: 'Inspection tag current' },
  ],
};

// ─── Regulation References ───

export interface RegulationRef {
  name: string;
  shortName: string;
  description: string;
  /** Statutory inspection interval in days (if applicable). */
  statutoryIntervalDays?: number;
}

export const REGULATION_REFS: Record<string, RegulationRef> = {
  ladder: {
    name: 'LOLER 1998 (Lifting Operations and Lifting Equipment Regulations)',
    shortName: 'LOLER 1998',
    description:
      'Ladders must be visually inspected before each use. Fixed ladders and those used as a workplace require formal 6-monthly thorough examination under Regulation 9.',
    statutoryIntervalDays: 183,
  },
  scaffold: {
    name: 'Work at Height Regulations 2005',
    shortName: 'WAHR 2005',
    description:
      'Scaffold must be inspected before first use, after any alteration, and at intervals not exceeding 7 days (Regulation 12). A written inspection report is required.',
    statutoryIntervalDays: 7,
  },
  power_tool: {
    name: 'PUWER 1998 (Provision and Use of Work Equipment Regulations)',
    shortName: 'PUWER 1998',
    description:
      'Power tools must be maintained in efficient working order (Regulation 5). Visual check before each use; PAT testing at intervals appropriate to risk.',
  },
  test_instrument: {
    name: 'GS38 (HSE Guidance Sheet 38, 4th Edition)',
    shortName: 'GS38',
    description:
      'Test instruments must have GS38-compliant leads (max 4mm exposed tips, shrouded probes), correct fuses, and current calibration certificate.',
  },
  access_equipment: {
    name: 'LOLER 1998 / Work at Height Regulations 2005',
    shortName: 'LOLER 1998',
    description:
      'Mobile access equipment (towers, MEWPs) requires 6-monthly thorough examination under LOLER Regulation 9. Pre-use visual inspection before each use.',
    statutoryIntervalDays: 183,
  },
};

/**
 * Check if a statutory inspection is due or overdue for given equipment.
 * Returns null if no statutory interval applies.
 */
export function getStatutoryInspectionStatus(
  equipmentType: string,
  lastInspection: string | null
): {
  status: 'ok' | 'due_soon' | 'overdue' | 'unknown';
  daysUntilDue: number | null;
  label: string;
} | null {
  const reg = REGULATION_REFS[equipmentType];
  if (!reg?.statutoryIntervalDays) return null;

  if (!lastInspection) {
    return {
      status: 'unknown',
      daysUntilDue: null,
      label: `${reg.shortName}: No inspection recorded`,
    };
  }

  const lastDate = new Date(lastInspection);
  lastDate.setHours(0, 0, 0, 0);
  const dueDate = new Date(lastDate);
  dueDate.setDate(dueDate.getDate() + reg.statutoryIntervalDays);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilDue < 0) {
    return {
      status: 'overdue',
      daysUntilDue,
      label: `${reg.shortName}: Inspection overdue by ${Math.abs(daysUntilDue)} day(s)`,
    };
  }

  if (daysUntilDue <= 14) {
    return {
      status: 'due_soon',
      daysUntilDue,
      label: `${reg.shortName}: Inspection due in ${daysUntilDue} day(s)`,
    };
  }

  return {
    status: 'ok',
    daysUntilDue,
    label: `${reg.shortName}: Next inspection in ${daysUntilDue} day(s)`,
  };
}

export function usePreUseChecks() {
  return useQuery({
    queryKey: ['pre-use-checks'],
    queryFn: async (): Promise<PreUseCheck[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pre_use_checks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as PreUseCheck[];
    },
    staleTime: 30_000,
  });
}

export function useCreatePreUseCheck() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (check: {
      equipment_type: string;
      equipment_description?: string;
      equipment_id?: string;
      site_address?: string;
      items: CheckItem[];
      overall_result: 'pass' | 'fail' | 'na';
      checked_by?: string;
      signature?: string;
      actions_required?: string;
      photos?: string[];
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pre_use_checks')
        .insert({
          user_id: user.id,
          ...check,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pre-use-checks'] });
      toast({
        title: 'Check Recorded',
        description: 'Pre-use equipment check has been saved.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not save check.',
        variant: 'destructive',
      });
    },
  });
}
