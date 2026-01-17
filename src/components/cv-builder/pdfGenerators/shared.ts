/**
 * Shared PDF generation utilities for CV templates
 */

import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { CVData, WorkExperience, Education } from '../types';

// PDF dimensions and constants
export const PDF_CONFIG = {
  pageWidth: 210, // A4 width in mm
  pageHeight: 297, // A4 height in mm
  margin: 15,
  contentWidth: 180, // pageWidth - (margin * 2)
  lineHeight: 5,
  sectionGap: 12,
  itemGap: 8,
};

// Template colour palettes
export const TEMPLATE_COLORS = {
  classic: {
    primary: '#1e3a5f', // Navy blue
    secondary: '#334155', // Slate
    accent: '#475569',
    text: '#1f2937',
    muted: '#6b7280',
    divider: '#cbd5e1',
  },
  modern: {
    primary: '#f59e0b', // Amber
    secondary: '#2563eb', // Blue
    accent: '#1d4ed8',
    text: '#1f2937',
    muted: '#6b7280',
    divider: '#dbeafe',
  },
  creative: {
    primary: '#9333ea', // Purple
    secondary: '#ec4899', // Pink
    accent: '#a855f7',
    text: '#1f2937',
    muted: '#6b7280',
    divider: '#f3e8ff',
  },
  technical: {
    primary: '#10b981', // Emerald
    secondary: '#0d9488', // Teal
    accent: '#059669',
    text: '#1f2937',
    muted: '#6b7280',
    divider: '#d1fae5',
  },
};

export type TemplateColorScheme = typeof TEMPLATE_COLORS.classic;

/**
 * Format a date string (YYYY-MM) to a readable format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString + '-01');
    return format(date, 'MMM yyyy');
  } catch {
    return dateString;
  }
};

/**
 * Get date range string for experience/education
 */
export const getDateRange = (
  startDate: string,
  endDate: string,
  current: boolean
): string => {
  const start = formatDate(startDate);
  const end = current ? 'Present' : formatDate(endDate);
  return `${start} - ${end}`;
};

/**
 * Check if we need a new page and add one if necessary
 */
export const checkPageBreak = (
  pdf: jsPDF,
  yPosition: number,
  requiredSpace: number = 40
): number => {
  const { pageHeight, margin } = PDF_CONFIG;
  if (yPosition + requiredSpace > pageHeight - margin) {
    pdf.addPage();
    return margin;
  }
  return yPosition;
};

/**
 * Add wrapped text and return new Y position
 */
export const addWrappedText = (
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number = PDF_CONFIG.lineHeight
): number => {
  const lines = pdf.splitTextToSize(text, maxWidth);
  pdf.text(lines, x, y);
  return y + lines.length * lineHeight;
};

/**
 * Set hex colour for PDF (converts hex to RGB)
 */
export const setColor = (pdf: jsPDF, hexColor: string, type: 'fill' | 'draw' | 'text' = 'text'): void => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  switch (type) {
    case 'fill':
      pdf.setFillColor(r, g, b);
      break;
    case 'draw':
      pdf.setDrawColor(r, g, b);
      break;
    case 'text':
      pdf.setTextColor(r, g, b);
      break;
  }
};

/**
 * Draw a horizontal line
 */
export const drawLine = (
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  color: string = '#cbd5e1',
  thickness: number = 0.3
): void => {
  setColor(pdf, color, 'draw');
  pdf.setLineWidth(thickness);
  pdf.line(x, y, x + width, y);
};

/**
 * Draw a filled rectangle
 */
export const drawRect = (
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  radius: number = 0
): void => {
  setColor(pdf, color, 'fill');
  if (radius > 0) {
    pdf.roundedRect(x, y, width, height, radius, radius, 'F');
  } else {
    pdf.rect(x, y, width, height, 'F');
  }
};

/**
 * Get the file name for the CV
 */
export const getFileName = (cvData: CVData, templateName: string): string => {
  const name = cvData.personalInfo.fullName || 'CV';
  const safeName = name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  return `${safeName}_${templateName}_CV.pdf`;
};

/**
 * Format skills for display
 */
export const formatSkills = (skills: string[]): string => {
  return skills.join(' • ');
};

/**
 * Calculate years of experience from work history
 */
export const calculateExperienceYears = (experience: WorkExperience[]): number => {
  if (experience.length === 0) return 0;

  let totalMonths = 0;
  experience.forEach((exp) => {
    if (!exp.startDate) return;

    const start = new Date(exp.startDate + '-01');
    const end = exp.current
      ? new Date()
      : exp.endDate
      ? new Date(exp.endDate + '-01')
      : new Date();

    const months = (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    totalMonths += Math.max(0, months);
  });

  return Math.round(totalMonths / 12);
};

/**
 * Common contact info formatter
 */
export const formatContactLine = (cvData: CVData): string => {
  const parts = [
    cvData.personalInfo.email,
    cvData.personalInfo.phone,
    [cvData.personalInfo.address, cvData.personalInfo.postcode]
      .filter(Boolean)
      .join(', '),
  ].filter(Boolean);

  return parts.join(' | ');
};

/**
 * Split experience description into bullet points
 */
export const splitToBulletPoints = (description: string): string[] => {
  if (!description) return [];

  // Check if already has bullet points or newlines
  if (description.includes('•') || description.includes('-') || description.includes('\n')) {
    return description
      .split(/[•\-\n]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item) => item.length > 5); // Filter out very short fragments
  }

  // Split by sentences if no bullets
  return description
    .split(/[.!?]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => item.length > 10)
    .slice(0, 5); // Max 5 bullet points
};

/**
 * Add page footer with page numbers
 */
export const addPageFooter = (
  pdf: jsPDF,
  pageNum: number,
  totalPages: number,
  color: string = '#9ca3af'
): void => {
  const { pageWidth, pageHeight, margin } = PDF_CONFIG;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  setColor(pdf, color);

  // Page number - right aligned
  pdf.text(
    `Page ${pageNum} of ${totalPages}`,
    pageWidth - margin,
    pageHeight - 8,
    { align: 'right' }
  );

  // Generated date - left aligned
  const today = format(new Date(), 'dd MMM yyyy');
  pdf.text(`Generated ${today}`, margin, pageHeight - 8);
};

/**
 * Get skill proficiency based on skill type (for consistent visualization)
 * Electrician-specific skills get higher proficiency
 */
export const getSkillProficiency = (skill: string): number => {
  const coreSkills = [
    '18th edition', 'bs 7671', 'testing', 'inspection', 'installation',
    'wiring', 'fault finding', 'pat testing', 'commercial', 'domestic',
    'industrial', 'maintenance', 'repairs', 'rewiring', 'consumer unit',
    'distribution board', 'three phase', '3 phase', 'single phase',
    'lighting', 'power', 'fire alarm', 'emergency lighting', 'data cabling',
  ];

  const advancedSkills = [
    'solar', 'pv', 'ev charging', 'heat pump', 'smart home', 'automation',
    'plc', 'bms', 'hvac', 'high voltage', 'hv', 'generator', 'ups',
  ];

  const skillLower = skill.toLowerCase();

  // Core electrical skills - high proficiency
  if (coreSkills.some(core => skillLower.includes(core))) {
    return 0.85 + Math.random() * 0.15; // 85-100%
  }

  // Advanced/specialist skills - medium-high proficiency
  if (advancedSkills.some(adv => skillLower.includes(adv))) {
    return 0.70 + Math.random() * 0.20; // 70-90%
  }

  // Other skills - medium proficiency
  return 0.60 + Math.random() * 0.25; // 60-85%
};

/**
 * Professional title generator based on experience
 */
export const generateProfessionalTitle = (cvData: CVData): string => {
  const yearsExp = calculateExperienceYears(cvData.experience);
  const hasCertifications = cvData.certifications.length > 0;
  const skills = cvData.skills.map(s => s.toLowerCase());

  // Check for specialisations
  const isCommercial = skills.some(s => s.includes('commercial'));
  const isIndustrial = skills.some(s => s.includes('industrial'));
  const isSolar = skills.some(s => s.includes('solar') || s.includes('pv'));
  const isEV = skills.some(s => s.includes('ev') || s.includes('charging'));

  let title = '';

  if (yearsExp >= 10) {
    title = 'Senior ';
  } else if (yearsExp >= 5) {
    title = 'Experienced ';
  } else if (yearsExp >= 2) {
    title = 'Qualified ';
  }

  if (isIndustrial) {
    title += 'Industrial Electrician';
  } else if (isCommercial) {
    title += 'Commercial Electrician';
  } else if (isSolar) {
    title += 'Electrician & Solar PV Installer';
  } else if (isEV) {
    title += 'Electrician & EV Specialist';
  } else {
    title += 'Electrician';
  }

  return title;
};

/**
 * Format contact information with proper separators (ATS-friendly)
 */
export const formatContactItems = (cvData: CVData): { icon: string; text: string }[] => {
  const items: { icon: string; text: string }[] = [];

  if (cvData.personalInfo.email) {
    items.push({ icon: 'E:', text: cvData.personalInfo.email });
  }
  if (cvData.personalInfo.phone) {
    items.push({ icon: 'T:', text: cvData.personalInfo.phone });
  }
  if (cvData.personalInfo.address || cvData.personalInfo.postcode) {
    const location = [cvData.personalInfo.address, cvData.personalInfo.postcode]
      .filter(Boolean)
      .join(', ');
    items.push({ icon: 'A:', text: location });
  }

  return items;
};

/**
 * Highlight key electrical qualifications in certifications
 */
export const categoriseCertifications = (certifications: string[]): {
  essential: string[];
  additional: string[];
} => {
  const essentialKeywords = [
    '18th', 'bs 7671', '2391', '2360', '2365', 'jib', 'ecs', 'gold card',
    'am2', 'level 3', 'nvq', 'city & guilds', 'city and guilds',
  ];

  const essential: string[] = [];
  const additional: string[] = [];

  certifications.forEach(cert => {
    const certLower = cert.toLowerCase();
    if (essentialKeywords.some(keyword => certLower.includes(keyword))) {
      essential.push(cert);
    } else {
      additional.push(cert);
    }
  });

  return { essential, additional };
};
