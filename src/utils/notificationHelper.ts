import { supabase } from '@/integrations/supabase/client';

// Part P notifiable work types under BS 7671 Building Regulations
const NOTIFIABLE_WORK_TYPES = [
  'new circuit',
  'consumer unit replacement',
  'addition to existing circuit in special location',
  'bathroom installation',
  'kitchen installation',
  'outdoor installation',
  'special location work',
];

const SPECIAL_LOCATIONS = [
  'bathroom',
  'shower room',
  'swimming pool',
  'sauna',
  'hot tub',
  'outdoor',
  'garden',
];

/**
 * Determine if electrical work is notifiable under Part P Building Regulations
 * Reference: BS 7671:2018+A2:2022 Regulation 514.12
 */
export const isNotifiableWork = (
  workType: string,
  location?: string,
  isNewCircuit?: boolean
): boolean => {
  const workTypeLower = workType.toLowerCase();
  const locationLower = location?.toLowerCase() || '';

  // Check if work type is explicitly notifiable
  if (NOTIFIABLE_WORK_TYPES.some((type) => workTypeLower.includes(type))) {
    return true;
  }

  // Check if location is a special location
  if (SPECIAL_LOCATIONS.some((loc) => locationLower.includes(loc))) {
    return true;
  }

  // New circuits are generally notifiable
  if (isNewCircuit) {
    return true;
  }

  return false;
};

/**
 * Calculate submission deadline (30 days from completion as per Building Regulations)
 */
export const calculateSubmissionDeadline = (completionDate: string | Date): string => {
  const date = new Date(completionDate);
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};

/**
 * Calculate days remaining until deadline
 */
export const getDaysUntilDeadline = (deadline: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Format deadline with context (e.g., "Due in 5 days", "Overdue by 3 days")
 */
export const formatDeadlineStatus = (deadline: string): string => {
  const daysRemaining = getDaysUntilDeadline(deadline);

  if (daysRemaining > 0) {
    return `Due in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`;
  } else if (daysRemaining === 0) {
    return 'Due today';
  } else {
    return `Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) === 1 ? '' : 's'}`;
  }
};

/**
 * Get deadline urgency level for styling
 */
export const getDeadlineUrgency = (deadline: string): 'safe' | 'warning' | 'urgent' | 'overdue' => {
  const daysRemaining = getDaysUntilDeadline(deadline);

  if (daysRemaining < 0) return 'overdue';
  if (daysRemaining <= 2) return 'urgent';
  if (daysRemaining <= 7) return 'warning';
  return 'safe';
};

/**
 * Determine Building Control authority from postcode
 */
export const getBuildingControlAuthority = async (postcode: string): Promise<string | null> => {
  if (!postcode) return null;

  // Extract postcode prefix (e.g., "SW1" from "SW1A 1AA")
  const prefix = postcode.trim().toUpperCase().split(' ')[0].replace(/[0-9]/g, '');

  try {
    const { data, error } = await supabase
      .from('building_control_authorities')
      .select('authority_name, postcode_prefixes')
      .contains('postcode_prefixes', [prefix])
      .limit(1)
      .single();

    if (error || !data) return null;
    return data.authority_name;
  } catch {
    return null;
  }
};

/**
 * Auto-create notification record from certificate data
 */
export const createNotificationFromCertificate = async (
  reportId: string,
  reportType: 'eicr' | 'eic' | 'minor-works' | 'solar-pv' | 'ev-charging',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any,
  userId: string
): Promise<{ success: boolean; notificationId?: string; error?: string }> => {
  try {
    // EIC, Solar PV and EV Charging are always notifiable — no condition needed
    const isAlwaysNotifiable =
      reportType === 'eic' || reportType === 'solar-pv' || reportType === 'ev-charging';

    // Minor Works: notifiable if user ticked the checkbox or auto-detected
    const isUserRequested = reportType === 'minor-works' && formData.partPNotification === true;

    const isAutoNotifiable = isNotifiableWork(
      formData.workType || formData.workDescription || formData.description || '',
      formData.installationAddress || formData.location || '',
      formData.isNewCircuit
    );

    if (!isAlwaysNotifiable && !isUserRequested && !isAutoNotifiable) {
      return {
        success: false,
        error: 'This work is not notifiable under Part P of the Building Regulations',
      };
    }

    // Deduplication: don't create a second notification for the same report
    const { data: existing } = await supabase
      .from('part_p_notifications')
      .select('id')
      .eq('report_id', reportId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      return { success: true, notificationId: existing.id };
    }

    const completionDate =
      formData.inspectionDate || formData.dateOfInspection || new Date().toISOString();
    const deadline = calculateSubmissionDeadline(completionDate);

    const notificationData = {
      user_id: userId,
      report_id: reportId,
      work_type: formData.workType || formData.workDescription || 'Electrical installation',
      notification_status: 'pending',
      building_control_authority: formData.buildingControlAuthority || null,
      submission_deadline: deadline,
      napit_submitted: false,
      niceic_submitted: false,
      local_authority_submitted: false,
    };

    const { data, error } = await supabase
      .from('part_p_notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true, notificationId: data.id };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Exception creating notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update notification status based on submission checkboxes
 */
export const updateNotificationStatus = (
  napitSubmitted: boolean,
  niceicSubmitted: boolean,
  localAuthoritySubmitted: boolean,
  currentStatus: string
): string => {
  const anySubmitted = napitSubmitted || niceicSubmitted || localAuthoritySubmitted;
  const allSubmitted = napitSubmitted && niceicSubmitted && localAuthoritySubmitted;

  if (allSubmitted) {
    return 'submitted';
  } else if (anySubmitted) {
    return 'in-progress';
  } else if (currentStatus === 'submitted' || currentStatus === 'in-progress') {
    return 'pending';
  }

  return currentStatus;
};
