/**
 * Certificate Logging Service
 *
 * Logs completed certificates to Elec-ID work history for verified tracking.
 * This provides a verified record of work completed for QA and portfolio purposes.
 */

import { supabase } from "@/integrations/supabase/client";

// Helper to send push notification (fire and forget)
const sendPushNotification = async (
  userId: string,
  title: string,
  body: string,
  type: 'job' | 'team' | 'college' | 'peer',
  data?: Record<string, unknown>
) => {
  try {
    await supabase.functions.invoke('send-push-notification', {
      body: { userId, title, body, type, data },
    });
  } catch (error) {
    console.error('Push notification error:', error);
  }
};

export type CertificateType = 'EICR' | 'EIC' | 'Minor Works' | 'PAT';
export type CertificateOutcome =
  | 'satisfactory'
  | 'unsatisfactory'
  | 'further_investigation'
  | 'pass'
  | 'fail'
  | 'N/A';

export interface CertificateLogEntry {
  certificate_type: CertificateType;
  property_address: string;
  outcome: CertificateOutcome;
  observations_count: number;
  c1_count: number;
  c2_count: number;
  c3_count: number;
  fi_count: number;
  date_completed: string;
  certificate_ref?: string;
  client_name?: string;
}

export interface WorkHistoryEntry {
  id: string;
  profile_id: string;
  entry_type: string;
  title: string;
  description: string;
  metadata: {
    certificate_type: CertificateType;
    outcome: CertificateOutcome;
    observations: number;
    c1: number;
    c2: number;
    c3: number;
    fi: number;
    certificate_ref?: string;
    client_name?: string;
  };
  date_recorded: string;
  created_at: string;
}

/**
 * Log a completed certificate to Elec-ID work history
 */
export async function logCertificateToElecId(
  userId: string,
  entry: CertificateLogEntry
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if user has an activated Elec-ID profile
    const { data: elecIdProfile, error: profileError } = await supabase
      .from('employer_elec_id_profiles')
      .select('id, activated, opt_out')
      .eq('employee_id', userId)
      .maybeSingle();

    if (profileError) {
      console.error('Error fetching Elec-ID profile:', profileError);
      return { success: false, error: 'Failed to fetch Elec-ID profile' };
    }

    // Don't log if user doesn't have Elec-ID or has opted out
    if (!elecIdProfile || !elecIdProfile.activated || elecIdProfile.opt_out) {
      return { success: true }; // Silent success - no Elec-ID to log to
    }

    // Create the work history entry
    const workHistoryEntry = {
      profile_id: elecIdProfile.id,
      entry_type: 'certificate',
      title: formatTitle(entry.certificate_type, entry.outcome),
      description: entry.property_address,
      metadata: {
        certificate_type: entry.certificate_type,
        outcome: entry.outcome,
        observations: entry.observations_count,
        c1: entry.c1_count,
        c2: entry.c2_count,
        c3: entry.c3_count,
        fi: entry.fi_count,
        certificate_ref: entry.certificate_ref,
        client_name: entry.client_name,
      },
      date_recorded: entry.date_completed,
    };

    const { error: insertError } = await supabase
      .from('elec_id_work_history')
      .insert(workHistoryEntry);

    if (insertError) {
      console.error('Error logging certificate to work history:', insertError);
      return { success: false, error: 'Failed to log certificate' };
    }

    // Send notification about certificate being logged
    sendCertificateNotification(userId, entry).catch(console.error);

    return { success: true };
  } catch (error) {
    console.error('Error in logCertificateToElecId:', error);
    return { success: false, error: 'Unexpected error logging certificate' };
  }
}

/**
 * Format the title for the work history entry
 */
function formatTitle(type: CertificateType, outcome: CertificateOutcome): string {
  const outcomeLabel = formatOutcome(outcome);
  return `${type} - ${outcomeLabel}`;
}

/**
 * Format outcome for display
 */
export function formatOutcome(outcome: CertificateOutcome): string {
  switch (outcome) {
    case 'satisfactory':
      return 'Satisfactory';
    case 'unsatisfactory':
      return 'Unsatisfactory';
    case 'further_investigation':
      return 'Further Investigation Required';
    case 'pass':
      return 'Pass';
    case 'fail':
      return 'Fail';
    case 'N/A':
      return 'N/A';
    default:
      return outcome;
  }
}

/**
 * Get outcome color classes for display
 */
export function getOutcomeColors(outcome: CertificateOutcome): {
  bg: string;
  text: string;
  border: string;
} {
  switch (outcome) {
    case 'satisfactory':
    case 'pass':
      return {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/40',
      };
    case 'unsatisfactory':
    case 'fail':
      return {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/40',
      };
    case 'further_investigation':
      return {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
      };
    default:
      return {
        bg: 'bg-muted/50',
        text: 'text-muted-foreground',
        border: 'border-border',
      };
  }
}

/**
 * Get certificate type icon class
 */
export function getCertificateTypeIcon(type: CertificateType): string {
  switch (type) {
    case 'EICR':
      return 'FileCheck';
    case 'EIC':
      return 'ClipboardCheck';
    case 'Minor Works':
      return 'Wrench';
    case 'PAT':
      return 'Plug';
    default:
      return 'FileText';
  }
}

/**
 * Helper to extract certificate log data from an EICR report
 */
export function extractEICRLogData(report: any): CertificateLogEntry {
  const observations = report.observations || [];

  return {
    certificate_type: 'EICR',
    property_address: formatAddress(report),
    outcome: mapEICROutcome(report.overallAssessment),
    observations_count: observations.length,
    c1_count: observations.filter((o: any) => o.code === 'C1').length,
    c2_count: observations.filter((o: any) => o.code === 'C2').length,
    c3_count: observations.filter((o: any) => o.code === 'C3').length,
    fi_count: observations.filter((o: any) => o.code === 'FI').length,
    date_completed: new Date().toISOString(),
    certificate_ref: report.certificateRef || report.serialNumber,
    client_name: report.clientName,
  };
}

/**
 * Helper to extract certificate log data from an EIC report
 */
export function extractEICLogData(report: any): CertificateLogEntry {
  return {
    certificate_type: 'EIC',
    property_address: formatAddress(report),
    outcome: 'pass', // EIC doesn't have the same outcome system
    observations_count: 0,
    c1_count: 0,
    c2_count: 0,
    c3_count: 0,
    fi_count: 0,
    date_completed: new Date().toISOString(),
    certificate_ref: report.certificateRef || report.serialNumber,
    client_name: report.clientName,
  };
}

/**
 * Helper to extract certificate log data from a Minor Works report
 */
export function extractMinorWorksLogData(report: any): CertificateLogEntry {
  return {
    certificate_type: 'Minor Works',
    property_address: formatAddress(report),
    outcome: 'pass',
    observations_count: 0,
    c1_count: 0,
    c2_count: 0,
    c3_count: 0,
    fi_count: 0,
    date_completed: new Date().toISOString(),
    certificate_ref: report.certificateRef || report.serialNumber,
    client_name: report.clientName,
  };
}

function formatAddress(report: any): string {
  const parts = [
    report.address1,
    report.address2,
    report.town || report.city,
    report.postcode,
  ].filter(Boolean);

  return parts.join(', ');
}

function mapEICROutcome(assessment: string): CertificateOutcome {
  if (!assessment) return 'N/A';

  const lower = assessment.toLowerCase();
  if (lower.includes('satisfactory') && !lower.includes('un')) {
    return 'satisfactory';
  }
  if (lower.includes('unsatisfactory')) {
    return 'unsatisfactory';
  }
  if (lower.includes('further') || lower.includes('investigation')) {
    return 'further_investigation';
  }
  return 'N/A';
}

/**
 * Send notification about certificate being logged
 * Includes reminder about expiry date based on certificate type
 */
async function sendCertificateNotification(userId: string, entry: CertificateLogEntry) {
  try {
    const outcomeEmoji = entry.outcome === 'satisfactory' || entry.outcome === 'pass' ? '✅' : '⚠️';
    const title = `${outcomeEmoji} ${entry.certificate_type} Logged`;

    // Calculate expiry based on certificate type
    const expiryYears = getCertificateValidityYears(entry.certificate_type);
    const expiryDate = new Date(entry.date_completed);
    expiryDate.setFullYear(expiryDate.getFullYear() + expiryYears);

    const expiryStr = expiryDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const body = `${entry.certificate_type} at ${entry.property_address.substring(0, 30)}... Due for renewal: ${expiryStr}`;

    await sendPushNotification(userId, title, body, 'job', {
      certificateId: entry.certificate_ref,
      certificateType: entry.certificate_type,
      expiryDate: expiryDate.toISOString(),
    });
  } catch (error) {
    console.error('Error sending certificate notification:', error);
  }
}

/**
 * Get validity period in years for different certificate types
 */
function getCertificateValidityYears(type: CertificateType): number {
  switch (type) {
    case 'EICR':
      return 5; // Domestic: 10 years, Commercial: 5 years - using conservative
    case 'EIC':
      return 10; // Valid for life of installation, but recommend check in 10
    case 'Minor Works':
      return 10; // Part of installation, same as EIC
    case 'PAT':
      return 1; // Annual testing typical
    default:
      return 5;
  }
}
