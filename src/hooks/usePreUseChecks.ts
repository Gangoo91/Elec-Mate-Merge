import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CheckItem {
  id: string;
  label: string;
  result: 'pass' | 'fail' | 'na';
  section?: string;
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

export interface CheckTemplate {
  id: string;
  label: string;
  section?: string;
}

export const CHECK_TEMPLATES: Record<string, CheckTemplate[]> = {
  // LOLER 1998 + BS EN 131 + INDG 455
  ladder: [
    // Structure & Condition
    { id: 'l1', label: 'Stiles straight and undamaged — no bends, cracks or dents', section: 'Structure & Condition' },
    { id: 'l2', label: 'Rungs secure, evenly spaced and free from damage', section: 'Structure & Condition' },
    { id: 'l3', label: 'No cracks, splits, corrosion or excessive wear', section: 'Structure & Condition' },
    { id: 'l4', label: 'Locking mechanisms/hinges working correctly (stepladders)', section: 'Structure & Condition' },
    { id: 'l5', label: 'Extension mechanisms and locks functional (extending ladders)', section: 'Structure & Condition' },
    { id: 'l6', label: 'Not warped, twisted or distorted from heat/weather damage', section: 'Structure & Condition' },
    // Safety Features
    { id: 'l7', label: 'Feet/shoes present, in good condition and anti-slip', section: 'Safety Features' },
    { id: 'l8', label: 'Anti-slip devices at base functioning', section: 'Safety Features' },
    { id: 'l9', label: 'Tie-off point or stabiliser present for use above 3m', section: 'Safety Features' },
    // Compliance & Suitability
    { id: 'l10', label: 'Labels/rating plate visible — duty rating and classification legible', section: 'Compliance' },
    { id: 'l11', label: 'Inspection sticker/tag present and within date', section: 'Compliance' },
    { id: 'l12', label: 'Maximum safe working load not exceeded', section: 'Compliance' },
    { id: 'l13', label: 'Appropriate ladder type for the task (not used as scaffold substitute)', section: 'Compliance' },
    { id: 'l14', label: 'Clean and free from oil, grease or other contaminants', section: 'Compliance' },
    { id: 'l15', label: 'Correct angle of use — 75° (1-in-4 rule) for leaning ladders', section: 'Compliance' },
  ],
  // WAHR 2005 Reg 12 + NASC SG4:15 + TG20:13
  scaffold: [
    // Foundation & Base
    { id: 's1', label: 'Base plates secure on firm, level ground', section: 'Foundation & Base' },
    { id: 's2', label: 'Sole boards in place where required', section: 'Foundation & Base' },
    { id: 's3', label: 'Standards plumb and properly braced', section: 'Foundation & Base' },
    // Structure
    { id: 's4', label: 'Ledger and transom connections secure and tight', section: 'Structure' },
    { id: 's5', label: 'Couplers tight — no slipping or rotation', section: 'Structure' },
    { id: 's6', label: 'Ties/anchors at correct intervals (max 4m vertical, 6m horizontal)', section: 'Structure' },
    { id: 's7', label: 'Erected to TG20 compliance or has specific design drawing', section: 'Structure' },
    // Platform & Edge Protection
    { id: 's8', label: 'Platforms fully boarded with no gaps >25mm', section: 'Platform & Edge Protection' },
    { id: 's9', label: 'Handrails fitted at correct height (950mm minimum)', section: 'Platform & Edge Protection' },
    { id: 's10', label: 'Mid-rails fitted', section: 'Platform & Edge Protection' },
    { id: 's11', label: 'Toe boards fitted (minimum 150mm height)', section: 'Platform & Edge Protection' },
    { id: 's12', label: 'Brick guards fitted where materials stored on platform', section: 'Platform & Edge Protection' },
    { id: 's13', label: 'Gap between scaffold and building <300mm (or edge protected)', section: 'Platform & Edge Protection' },
    // Access
    { id: 's14', label: 'Safe access provided — internal ladder or stairway', section: 'Access' },
    { id: 's15', label: 'Access ladders properly secured and extending 1m above platform', section: 'Access' },
    { id: 's16', label: 'Loading bay properly constructed with gate', section: 'Access' },
    // Documentation & Compliance
    { id: 's17', label: 'Scaffold tag present, signed and within 7-day inspection date', section: 'Documentation' },
    { id: 's18', label: 'Scaffold inspection register present on site', section: 'Documentation' },
    { id: 's19', label: 'Inspected by CISRS competent person', section: 'Documentation' },
    { id: 's20', label: '"Do Not Use" signage procedure in place if failed', section: 'Documentation' },
  ],
  // PUWER 1998 + Electricity at Work Regulations 1989 + IET Code of Practice
  power_tool: [
    // Physical Condition
    { id: 'pt1', label: 'Casing undamaged — no cracks, holes or missing parts', section: 'Physical Condition' },
    { id: 'pt2', label: 'Cable/flex in good condition — no cuts, fraying or exposed conductors', section: 'Physical Condition' },
    { id: 'pt3', label: 'Plug pins not bent, loose or damaged', section: 'Physical Condition' },
    { id: 'pt4', label: 'Cable entry to tool and plug secure — no strain on connections', section: 'Physical Condition' },
    { id: 'pt5', label: 'Ventilation openings clear and unobstructed', section: 'Physical Condition' },
    // Safety Features
    { id: 'pt6', label: 'Guards and safety features operational and correctly fitted', section: 'Safety Features' },
    { id: 'pt7', label: 'Emergency stop/trigger lock-off functioning', section: 'Safety Features' },
    { id: 'pt8', label: 'Correct accessories and consumables fitted (blades, discs, bits)', section: 'Safety Features' },
    { id: 'pt9', label: 'Correct RPM rating of accessories for the tool', section: 'Safety Features' },
    { id: 'pt10', label: 'Dust extraction fitted where required (COSHH)', section: 'Safety Features' },
    // Electrical Safety & Compliance
    { id: 'pt11', label: 'PAT test label present and in date', section: 'Electrical Safety' },
    { id: 'pt12', label: 'Correct voltage for site use (110V CTE or battery preferred)', section: 'Electrical Safety' },
    { id: 'pt13', label: 'RCD protection in use if 230V on site', section: 'Electrical Safety' },
    { id: 'pt14', label: 'Operator trained and competent to use this specific tool', section: 'Electrical Safety' },
  ],
  // GS38 4th Ed + BS EN 61010 + BS 7671 Chapter 64
  test_instrument: [
    // Calibration & Certification
    { id: 'ti1', label: 'Calibration sticker present and within date', section: 'Calibration' },
    { id: 'ti2', label: 'Calibration certificate available if requested', section: 'Calibration' },
    { id: 'ti3', label: 'Self-test/zero check performed successfully', section: 'Calibration' },
    // Physical Condition
    { id: 'ti4', label: 'Instrument case undamaged — no cracks or exposed internals', section: 'Physical Condition' },
    { id: 'ti5', label: 'Display clear, readable and all segments functional', section: 'Physical Condition' },
    { id: 'ti6', label: 'Battery level adequate for intended tests', section: 'Physical Condition' },
    { id: 'ti7', label: 'Selector switch/buttons functioning correctly', section: 'Physical Condition' },
    // GS38 Test Lead Compliance
    { id: 'ti8', label: 'Test leads GS38 compliant — finger guards and shrouded', section: 'GS38 Compliance' },
    { id: 'ti9', label: 'Probes shrouded with maximum 4mm exposed tip (2mm for voltage detection)', section: 'GS38 Compliance' },
    { id: 'ti10', label: 'Lead fuses present and correct rating (typically 500mA HRC)', section: 'GS38 Compliance' },
    { id: 'ti11', label: 'Leads undamaged — no cracking, fraying or exposed conductors', section: 'GS38 Compliance' },
    { id: 'ti12', label: 'CAT rating appropriate for intended use (CAT III/IV for distribution)', section: 'GS38 Compliance' },
    // Functional Checks
    { id: 'ti13', label: 'Continuity range functional — test leads <1Ω resistance', section: 'Functional Checks' },
    { id: 'ti14', label: 'Insulation resistance range functional and correct test voltage available', section: 'Functional Checks' },
  ],
  // LOLER 1998 + PUWER 1998 + PASMA guidance + IPAF
  access_equipment: [
    // Structure & Condition
    { id: 'ae1', label: 'Structure sound — no visible damage, bends or corrosion', section: 'Structure & Condition' },
    { id: 'ae2', label: 'All components present — no missing braces, frames or rungs', section: 'Structure & Condition' },
    { id: 'ae3', label: 'Locking pins and clips secure and undamaged', section: 'Structure & Condition' },
    // Stability
    { id: 'ae4', label: 'On firm, level ground (spirit level check)', section: 'Stability' },
    { id: 'ae5', label: 'Castors/wheels in locked position', section: 'Stability' },
    { id: 'ae6', label: 'Outriggers/stabilisers correctly deployed and secured', section: 'Stability' },
    { id: 'ae7', label: 'Correct height-to-base ratio maintained (3:1 indoor, 2.5:1 outdoor)', section: 'Stability' },
    { id: 'ae8', label: 'Clear of overhead obstructions and power lines', section: 'Stability' },
    // Platform & Edge Protection
    { id: 'ae9', label: 'Guardrails fitted on all open sides', section: 'Platform & Safety' },
    { id: 'ae10', label: 'Platform secure and fully boarded', section: 'Platform & Safety' },
    { id: 'ae11', label: 'Trap door platforms closed when platform in use', section: 'Platform & Safety' },
    { id: 'ae12', label: 'Not overloaded — within duty rating for persons and materials', section: 'Platform & Safety' },
    // Compliance & Documentation
    { id: 'ae13', label: 'Erected by PASMA trained person (card verified)', section: 'Compliance' },
    { id: 'ae14', label: 'Erected per manufacturer instruction manual', section: 'Compliance' },
    { id: 'ae15', label: 'Inspection tag current and within date', section: 'Compliance' },
    { id: 'ae16', label: 'Wind speed acceptable (<17mph / 7.7m/s for standard towers)', section: 'Compliance' },
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
