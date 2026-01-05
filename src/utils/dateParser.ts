/**
 * Parse natural language dates for UK EICR voice input
 */

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

/**
 * Parse natural date string to ISO format (YYYY-MM-DD)
 * Handles: "4th October 2025", "04/10/2025", "4-10-2025", "today"
 */
export function parseNaturalDate(input: string): string {
  const cleaned = input.toLowerCase().trim();

  // Handle "today"
  if (cleaned === 'today') {
    return new Date().toISOString().split('T')[0];
  }

  // Try natural format: "4th October 2025" or "4 October 2025"
  const naturalMatch = cleaned.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(?:of\s+)?(\w+)\s+(\d{4})/);
  if (naturalMatch) {
    const day = parseInt(naturalMatch[1]);
    const monthName = naturalMatch[2];
    const year = parseInt(naturalMatch[3]);
    const month = MONTHS[monthName];

    if (month !== undefined && day >= 1 && day <= 31) {
      const date = new Date(year, month, day);
      return date.toISOString().split('T')[0];
    }
  }

  // Try UK format: DD/MM/YYYY or DD-MM-YYYY
  const ukMatch = cleaned.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (ukMatch) {
    const day = parseInt(ukMatch[1]);
    const month = parseInt(ukMatch[2]) - 1; // JS months are 0-indexed
    let year = parseInt(ukMatch[3]);
    
    // Handle 2-digit years
    if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }

    if (month >= 0 && month <= 11 && day >= 1 && day <= 31) {
      const date = new Date(year, month, day);
      return date.toISOString().split('T')[0];
    }
  }

  // Return original if can't parse
  return input;
}
