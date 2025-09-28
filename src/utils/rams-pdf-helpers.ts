import { format, isValid, parseISO } from "date-fns";

/**
 * Safe helper functions for PDF generation to prevent crashes from imperfect data
 */

export const safeText = (text: string | undefined | null): string => {
  if (!text) return '';
  
  let cleanText = text.toString().trim();
  
  // Comprehensive HTML entity decoding with enhanced electrical symbols
  const entityMap: Record<string, string> = {
    // Standard HTML entities
    '&#x26;': '&',
    '&#x27;': "'",
    '&#x22;': '"',
    '&#x2A;': '*',
    '&#x2B;': '+',
    '&#x2D;': '-',
    '&#x2F;': '/',
    '&#x3A;': ':',
    '&#x3B;': ';',
    '&#x3C;': '<',
    '&#x3D;': '=',
    '&#x3E;': '>',
    '&#x3F;': '?',
    '&#x40;': '@',
    '&#39;': "'",
    '&#34;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&pound;': '£',
    '&deg;': '°',
    '&plusmn;': '±',
    '&times;': '×',
    '&divide;': '÷',
    // Enhanced electrical and technical symbols for BS 7671 compliance
    '&Omega;': 'Ω',
    '&omega;': 'ω',
    '&mu;': 'μ',
    '&alpha;': 'α',
    '&beta;': 'β',
    '&gamma;': 'γ',
    '&delta;': 'δ',
    '&theta;': 'θ',
    '&phi;': 'φ',
    '&ge;': '≥',
    '&le;': '≤',
    '&ne;': '≠',
    '&approx;': '≈',
    '&infin;': '∞',
    '&radic;': '√',
    '&sup2;': '²',
    '&sup3;': '³',
    '&frac12;': '½',
    '&frac14;': '¼',
    '&frac34;': '¾',
    // Common electrical unicode codes
    '&#8486;': 'Ω',  // Ohm symbol
    '&#8804;': '≤',  // Less than or equal
    '&#8805;': '≥',  // Greater than or equal
    '&#177;': '±',   // Plus-minus
    '&#181;': 'μ',   // Micro
    '&#8730;': '√',  // Square root
    '&#8734;': '∞',  // Infinity
    '&#8776;': '≈',  // Approximately equal
    // Broken encoding fixes
    'Î©': 'Ω',
    'âˆž': '∞',
    'â‰¥': '≥',
    'â‰¤': '≤',
    'Â±': '±',
    'Âµ': 'μ'
  };
  
  // Apply all entity replacements
  Object.entries(entityMap).forEach(([entity, replacement]) => {
    cleanText = cleanText.replace(new RegExp(entity, 'g'), replacement);
  });
  
  // Handle numeric character references
  cleanText = cleanText.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  // Handle hexadecimal character references  
  cleanText = cleanText.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return cleanText;
};

export const safeNumber = (num: number | string | undefined | null): number => {
  if (typeof num === 'number' && !isNaN(num)) return num;
  if (typeof num === 'string') {
    const parsed = parseFloat(num);
    return !isNaN(parsed) ? parsed : 0;
  }
  return 0;
};

export const safeDate = (dateInput: string | Date | undefined | null): string => {
  if (!dateInput) return format(new Date(), "dd/MM/yyyy");
  
  try {
    let date: Date;
    
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      // Try parsing ISO string first, then fallback to Date constructor
      date = isValid(parseISO(dateInput)) ? parseISO(dateInput) : new Date(dateInput);
    } else {
      date = new Date();
    }
    
    return isValid(date) ? format(date, "dd/MM/yyyy") : format(new Date(), "dd/MM/yyyy");
  } catch (error) {
    console.warn('Invalid date provided to safeDate:', dateInput);
    return format(new Date(), "dd/MM/yyyy");
  }
};

export const safeDatetime = (dateInput: string | Date | undefined | null): string => {
  if (!dateInput) return format(new Date(), "dd/MM/yyyy HH:mm");
  
  try {
    let date: Date;
    
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      date = isValid(parseISO(dateInput)) ? parseISO(dateInput) : new Date(dateInput);
    } else {
      date = new Date();
    }
    
    return isValid(date) ? format(date, "dd/MM/yyyy HH:mm") : format(new Date(), "dd/MM/yyyy HH:mm");
  } catch (error) {
    console.warn('Invalid date provided to safeDatetime:', dateInput);
    return format(new Date(), "dd/MM/yyyy HH:mm");
  }
};

export const getRiskLevel = (rating: number): string => {
  const safeRating = safeNumber(rating);
  if (safeRating <= 4) return "Low";
  if (safeRating <= 9) return "Medium";
  if (safeRating <= 16) return "High";
  return "Very High";
};

export const getRiskColor = (rating: number): [number, number, number] => {
  const safeRating = safeNumber(rating);
  if (safeRating <= 4) return [34, 197, 94]; // green
  if (safeRating <= 9) return [255, 193, 7]; // yellow
  if (safeRating <= 16) return [255, 152, 0]; // orange
  return [239, 68, 68]; // red
};

export const calculateRiskRating = (likelihood: number | string | undefined, severity: number | string | undefined): number => {
  const safeLikelihood = Math.max(1, Math.min(5, safeNumber(likelihood)));
  const safeSeverity = Math.max(1, Math.min(5, safeNumber(severity)));
  return safeLikelihood * safeSeverity;
};

export const safeFileName = (projectName: string | undefined | null): string => {
  const safeName = safeText(projectName) || 'RAMS_Document';
  return safeName.replace(/[^a-z0-9_-]/gi, '_').substring(0, 50);
};

export const safeArrayFilter = <T>(array: T[] | undefined | null): T[] => {
  return Array.isArray(array) ? array.filter(Boolean) : [];
};

export const truncateText = (text: string | undefined | null, maxLength: number = 50): string => {
  const safeStr = safeText(text);
  return safeStr.length > maxLength ? safeStr.substring(0, maxLength - 3) + '...' : safeStr;
};