/**
 * CV PDF Generators - Template-specific PDF generation
 *
 * Each generator creates a uniquely styled PDF that matches
 * the visual template preview shown in the CV Builder.
 */

export { generateClassicPDF } from './classicPdfGenerator';
export { generateModernPDF } from './modernPdfGenerator';
export { generateCreativePDF } from './creativePdfGenerator';
export { generateTechnicalPDF } from './technicalPdfGenerator';
export { generateATSPDF } from './atsPdfGenerator';

export {
  PDF_CONFIG,
  TEMPLATE_COLORS,
  formatDate,
  getDateRange,
  checkPageBreak,
  addWrappedText,
  setColor,
  drawLine,
  drawRect,
  getFileName,
  formatSkills,
  calculateExperienceYears,
  formatContactLine,
  splitToBulletPoints,
  addPageFooter,
  getSkillProficiency,
  generateProfessionalTitle,
  formatContactItems,
  categoriseCertifications,
  addECSBadge,
  addProfessionalCardsSection,
  addKeyProjectsSection,
  addReferencesSection,
  addProfilePhoto,
  formatLinkedInUrl,
  getCVCompletenessScore,
  ECS_CARD_COLORS,
} from './shared';

export type { TemplateColorScheme } from './shared';

import { CVData, CVFormat } from '../types';
import { CVTemplateId } from '../premium/CVTemplateShowcase';
import { generateClassicPDF } from './classicPdfGenerator';
import { generateModernPDF } from './modernPdfGenerator';
import { generateCreativePDF } from './creativePdfGenerator';
import { generateTechnicalPDF } from './technicalPdfGenerator';
import { generateATSPDF } from './atsPdfGenerator';

/**
 * Template-based PDF generator dispatch
 * Calls the appropriate generator based on selected template
 */
export const generateCVPDFByTemplate = async (
  cvData: CVData,
  templateId: CVTemplateId
): Promise<void> => {
  const generators: Record<CVTemplateId, (data: CVData) => Promise<void>> = {
    classic: generateClassicPDF,
    modern: generateModernPDF,
    creative: generateCreativePDF,
    technical: generateTechnicalPDF,
  };

  const generator = generators[templateId];
  if (!generator) {
    throw new Error(`Unknown template: ${templateId}`);
  }

  await generator(cvData);
};

/**
 * Format-based PDF generator dispatch
 * Generates full, summary, or ATS-friendly versions
 */
export const generateCVPDFByFormat = async (
  cvData: CVData,
  templateId: CVTemplateId,
  format: CVFormat = 'full'
): Promise<void> => {
  switch (format) {
    case 'ats':
      // ATS format ignores template, uses plain text
      await generateATSPDF(cvData);
      break;

    case 'summary':
      // Summary uses the template but with reduced content
      // For now, we'll use the same generators but the templates
      // will handle displaying less content based on page constraints
      await generateCVPDFByTemplate(cvData, templateId);
      break;

    case 'full':
    default:
      await generateCVPDFByTemplate(cvData, templateId);
      break;
  }
};
