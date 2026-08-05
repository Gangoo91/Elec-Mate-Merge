import { supabase } from '@/integrations/supabase/client';

/**
 * Generate a unique certificate number using database function
 * Falls back to crypto.randomUUID() if database call fails
 * Format: {PREFIX}-{YEAR}-{SEQUENTIAL_NUMBER}
 * Example: EICR-2025-0001, EIC-2025-0042, MW-2025-0123
 */
/**
 * Report types the `generate_certificate_number` RPC can actually handle.
 *
 * ELE-1443 — the RPC maps ONLY these three to a prefix (everything else falls
 * through to 'CERT') and interpolates the raw type into a sequence name:
 *
 *   certificate_seq_ev-charging_2026   →  syntax error at or near "-"
 *
 * So an unlisted type either errors outright or silently produces
 * "CERT-2026-0001". Anything not named here MUST use the local fallback.
 * Verified against pg_get_functiondef 2026-08-05.
 */
const RPC_SUPPORTED_TYPES = ['eicr', 'eic', 'minor-works'] as const;

export const generateCertificateNumber = async (reportType: string): Promise<string> => {
  if (!(RPC_SUPPORTED_TYPES as readonly string[]).includes(reportType)) {
    return generateFallbackCertificateNumber(reportType);
  }

  try {
    const { data, error } = await supabase.rpc('generate_certificate_number', {
      p_report_type: reportType,
    });

    if (error) {
      console.error('Error generating certificate number from database:', error);
      // Fallback to UUID-based unique number
      return generateFallbackCertificateNumber(reportType);
    }

    return data as string;
  } catch (error) {
    console.error('Exception generating certificate number:', error);
    return generateFallbackCertificateNumber(reportType);
  }
};

/**
 * Fallback method using crypto.randomUUID() for guaranteed uniqueness
 * Only used if database function fails
 */
const generateFallbackCertificateNumber = (reportType: string): string => {
  const year = new Date().getFullYear();
  const prefixMap: Record<string, string> = {
    eicr: 'EICR',
    eic: 'EIC',
    'minor-works': 'MW',
    'fire-alarm': 'FA/G2',
    'fire-alarm-design': 'FA/G1',
    'fire-alarm-commissioning': 'FA/G3',
    'fire-alarm-inspection': 'FA/G6',
    'fire-alarm-modification': 'FA/G7',
    // ELE-1443 — specialist certs whose live prefix does NOT match
    // reportType.toUpperCase(). Verified against certificate_number on real
    // rows 2026-08-05. The rest (EV-CHARGING, EMERGENCY-LIGHTING, SOLAR-PV,
    // BESS, PAT-TESTING, TESTING-ONLY) already match the uppercase fallback,
    // so they are deliberately absent rather than forgotten.
    'g98-commissioning': 'G98',
    'g99-commissioning': 'G99',
    'smoke-co-alarm': 'SMOKE-CO',
  };
  const prefix = prefixMap[reportType] || reportType.toUpperCase();

  // Use crypto.randomUUID() and take first 6 characters for guaranteed uniqueness
  const uniqueId = crypto.randomUUID().replace(/-/g, '').substring(0, 6).toUpperCase();

  return `${prefix}-${year}-${uniqueId}`;
};
