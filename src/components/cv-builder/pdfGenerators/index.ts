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
} from './shared';

export type { TemplateColorScheme } from './shared';

import { CVData } from '../types';
import { CVTemplateId } from '../premium/CVTemplateShowcase';
import { generateClassicPDF } from './classicPdfGenerator';
import { generateModernPDF } from './modernPdfGenerator';
import { generateCreativePDF } from './creativePdfGenerator';
import { generateTechnicalPDF } from './technicalPdfGenerator';

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
