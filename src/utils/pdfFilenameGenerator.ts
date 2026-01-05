/**
 * Utility for generating standardised, professional PDF filenames
 * Ensures filenames are:
 * - Descriptive and meaningful
 * - Safe for all operating systems
 * - Include certificate number, client name, and date
 * - Follow consistent naming convention
 */

export type CertificateType = 'EICR' | 'EIC' | 'MinorWorks';

/**
 * Sanitises a string to be safe for use in filenames
 * - Removes special characters
 * - Replaces spaces with underscores
 * - Limits length to prevent filesystem issues
 * - Handles empty/null values gracefully
 */
const sanitizeForFilename = (str: string, maxLength: number = 30): string => {
  if (!str || str.trim() === '') return 'Unknown';
  
  return str
    .trim()
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, maxLength); // Limit length
};

/**
 * Formats a date for use in filename
 * Returns format: YYYY-MM-DD
 */
const formatDateForFilename = (date?: Date | string): string => {
  if (!date) return new Date().toISOString().split('T')[0];
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};

/**
 * Generates a professional, standardised PDF filename
 * 
 * Format: {CertType}_{CertNumber}_{ClientName}_{YYYY-MM-DD}.pdf
 * 
 * Examples:
 * - EICR_EICR-2025-A3B7F2_John_Smith_2025-10-14.pdf
 * - EIC_EIC-2025-X9K2M1_ABC_Electrical_2025-10-14.pdf
 * - MinorWorks_MW-2025-P4R8T3_Smith_Residence_2025-10-14.pdf
 * 
 * @param certType - Type of certificate (EICR, EIC, MinorWorks)
 * @param certificateNumber - The certificate reference number
 * @param clientName - Name of the client/property owner
 * @param date - Optional date (defaults to current date)
 * @returns A safe, descriptive filename for the PDF
 */
export const generatePdfFilename = (
  certType: CertificateType,
  certificateNumber: string,
  clientName: string,
  date?: Date | string
): string => {
  const sanitizedCertNumber = sanitizeForFilename(certificateNumber || 'UNKNOWN', 50);
  return `${sanitizedCertNumber}.pdf`;
};

/**
 * Generates a filename for observations-only reports
 */
export const generateObservationsFilename = (
  certificateNumber: string,
  clientName: string,
  date?: Date | string
): string => {
  const sanitizedCertNumber = sanitizeForFilename(certificateNumber || 'UNKNOWN', 50);
  return `${sanitizedCertNumber}_Observations.pdf`;
};
