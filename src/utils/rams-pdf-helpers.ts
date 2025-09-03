import { format, isValid, parseISO } from "date-fns";

/**
 * Safe helper functions for PDF generation to prevent crashes from imperfect data
 */

export const safeText = (text: string | undefined | null): string => {
  return text?.toString().trim() || '';
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