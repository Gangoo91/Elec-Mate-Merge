/**
 * PDF Font utilities for Unicode support
 *
 * jsPDF's default fonts (Helvetica, Times, Courier) only support Windows-1252 encoding.
 * To use symbols like Ω, ², ° we need to embed a Unicode-compatible font.
 */

import jsPDF from 'jspdf';

// Cache for loaded fonts
let robotoLoaded = false;
let robotoBase64: string | null = null;

/**
 * Fetches Roboto font from Google Fonts CDN and converts to base64
 */
const fetchRobotoFont = async (): Promise<string> => {
  if (robotoBase64) return robotoBase64;

  try {
    // Fetch Roboto Regular from Google Fonts
    const response = await fetch(
      'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch font');
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    robotoBase64 = base64;
    return base64;
  } catch (error) {
    console.warn('Failed to load Roboto font, falling back to Helvetica:', error);
    throw error;
  }
};

/**
 * Adds Roboto font to jsPDF instance for Unicode support
 * Call this before using Unicode characters like Ω, ², °
 */
export const addUnicodeFont = async (pdf: jsPDF): Promise<boolean> => {
  if (robotoLoaded && robotoBase64) {
    // Font already loaded in this session, just add to this PDF instance
    try {
      pdf.addFileToVFS('Roboto-Regular.ttf', robotoBase64);
      pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
      return true;
    } catch {
      return false;
    }
  }

  try {
    const base64 = await fetchRobotoFont();
    pdf.addFileToVFS('Roboto-Regular.ttf', base64);
    pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    robotoLoaded = true;
    return true;
  } catch {
    return false;
  }
};

/**
 * Sets the font to Roboto (Unicode) if available, otherwise Helvetica
 */
export const setUnicodeFont = (pdf: jsPDF, style: 'normal' | 'bold' = 'normal'): void => {
  try {
    pdf.setFont('Roboto', style);
  } catch {
    // Fallback to Helvetica if Roboto not available
    pdf.setFont('helvetica', style);
  }
};

/**
 * Electrical symbols that require Unicode font support
 */
export const ELECTRICAL_SYMBOLS = {
  OHM: 'Ω',           // Ohm symbol (U+03A9)
  SQUARED: '²',       // Superscript 2 (U+00B2) - for mm²
  CUBED: '³',         // Superscript 3 (U+00B3) - for m³
  DEGREE: '°',        // Degree symbol (U+00B0) - for °C
  PLUS_MINUS: '±',    // Plus-minus (U+00B1)
  MICRO: 'μ',         // Micro symbol (U+03BC) - for μF
  CHECKMARK: '✓',     // Checkmark (U+2713)
  CROSS: '✗',         // Cross (U+2717)
} as const;

/**
 * Format mm² with proper superscript (requires Unicode font)
 */
export const formatSquareUnit = (value: string | number, unit: string = 'mm'): string => {
  return `${value}${unit}²`;
};

/**
 * Format ohms with proper symbol (requires Unicode font)
 */
export const formatOhms = (value: string | number): string => {
  return `${value}Ω`;
};

/**
 * Format temperature with degree symbol (requires Unicode font)
 */
export const formatTemperature = (value: string | number, unit: string = 'C'): string => {
  return `${value}°${unit}`;
};
