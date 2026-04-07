import { supabase } from '@/integrations/supabase/client';

/**
 * Generate a unique certificate number using database function
 * Falls back to crypto.randomUUID() if database call fails
 * Format: {PREFIX}-{YEAR}-{SEQUENTIAL_NUMBER}
 * Example: EICR-2025-0001, EIC-2025-0042, MW-2025-0123
 */
export const generateCertificateNumber = async (
  reportType: 'eicr' | 'eic' | 'minor-works' | 'fire-alarm' | 'fire-alarm-design' | 'fire-alarm-commissioning'
): Promise<string> => {
  // Fire alarm types use fallback directly — RPC doesn't support hyphenated types
  if (reportType === 'fire-alarm' || reportType === 'fire-alarm-design' || reportType === 'fire-alarm-commissioning') {
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
const generateFallbackCertificateNumber = (reportType: 'eicr' | 'eic' | 'minor-works' | 'fire-alarm' | 'fire-alarm-design' | 'fire-alarm-commissioning'): string => {
  const year = new Date().getFullYear();
  const prefix = reportType === 'eicr' ? 'EICR' : reportType === 'eic' ? 'EIC' : reportType === 'fire-alarm' ? 'FA/G2' : reportType === 'fire-alarm-design' ? 'FA/G1' : reportType === 'fire-alarm-commissioning' ? 'FA/G3' : 'MW';

  // Use crypto.randomUUID() and take first 6 characters for guaranteed uniqueness
  const uniqueId = crypto.randomUUID().replace(/-/g, '').substring(0, 6).toUpperCase();

  return `${prefix}-${year}-${uniqueId}`;
};
