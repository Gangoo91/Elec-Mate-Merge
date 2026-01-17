/**
 * Classic Template PDF Generator
 *
 * Traditional professional layout with:
 * - Navy blue accents (#1e3a5f)
 * - Clean section dividers
 * - Traditional single-column layout
 * - Clear visual hierarchy
 * - ATS-optimised formatting
 */

import jsPDF from 'jspdf';
import { CVData } from '../types';
import {
  PDF_CONFIG,
  TEMPLATE_COLORS,
  getDateRange,
  checkPageBreak,
  addWrappedText,
  setColor,
  drawLine,
  drawRect,
  getFileName,
  splitToBulletPoints,
  addPageFooter,
  generateProfessionalTitle,
  categoriseCertifications,
  calculateExperienceYears,
} from './shared';

const colors = TEMPLATE_COLORS.classic;

export const generateClassicPDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const { margin, contentWidth, pageHeight } = PDF_CONFIG;
  let y = margin;

  // Track pages for footer
  let currentPage = 1;

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  // Accent bar at top
  drawRect(pdf, 0, 0, 210, 2, colors.primary);

  y = margin + 5;

  // Name - large, navy blue
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(26);
  setColor(pdf, colors.primary);
  pdf.text(cvData.personalInfo.fullName || 'Your Name', margin, y);
  y += 8;

  // Professional title (auto-generated based on experience)
  const professionalTitle = generateProfessionalTitle(cvData);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  setColor(pdf, colors.secondary);
  pdf.text(professionalTitle, margin, y);
  y += 10;

  // Contact information - clean row format
  pdf.setFontSize(10);
  setColor(pdf, colors.muted);

  const contactParts: string[] = [];
  if (cvData.personalInfo.email) contactParts.push(cvData.personalInfo.email);
  if (cvData.personalInfo.phone) contactParts.push(cvData.personalInfo.phone);
  if (cvData.personalInfo.address || cvData.personalInfo.postcode) {
    contactParts.push(
      [cvData.personalInfo.address, cvData.personalInfo.postcode].filter(Boolean).join(', ')
    );
  }

  if (contactParts.length > 0) {
    pdf.text(contactParts.join('  |  '), margin, y);
    y += 8;
  }

  // Header divider line
  drawLine(pdf, margin, y, contentWidth, colors.primary, 1);
  y += 12;

  // ═══════════════════════════════════════════════════════════════════════════
  // KEY QUALIFICATIONS (Essential certifications at top for electricians)
  // ═══════════════════════════════════════════════════════════════════════════

  const { essential: essentialCerts, additional: additionalCerts } =
    categoriseCertifications(cvData.certifications);

  if (essentialCerts.length > 0) {
    // Highlight box for key qualifications
    const boxHeight = 12;
    drawRect(pdf, margin, y - 2, contentWidth, boxHeight, '#f1f5f9', 2);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    setColor(pdf, colors.primary);
    pdf.text('KEY QUALIFICATIONS:', margin + 4, y + 4);

    pdf.setFont('helvetica', 'normal');
    setColor(pdf, colors.text);
    const certsText = essentialCerts.slice(0, 4).join('  •  ');
    pdf.text(certsText, margin + 45, y + 4);

    y += boxHeight + 8;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFESSIONAL SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.personalInfo.professionalSummary) {
    y = checkPageBreak(pdf, y, 45);

    // Section heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('PROFESSIONAL SUMMARY', margin, y);
    y += 7;

    // Summary text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    setColor(pdf, colors.text);
    y = addWrappedText(pdf, cvData.personalInfo.professionalSummary, margin, y, contentWidth, 5);
    y += 10;

    // Subtle divider
    drawLine(pdf, margin, y, contentWidth, colors.divider, 0.5);
    y += 10;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WORK EXPERIENCE
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.experience.length > 0) {
    y = checkPageBreak(pdf, y, 50);

    // Section heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('WORK EXPERIENCE', margin, y);
    y += 9;

    cvData.experience.forEach((exp, index) => {
      y = checkPageBreak(pdf, y, 40);

      // Job title - bold, larger
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(pdf, colors.text);
      pdf.text(exp.jobTitle, margin, y);

      // Date range - right aligned
      const dateRange = getDateRange(exp.startDate, exp.endDate, exp.current);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.muted);
      pdf.text(dateRange, margin + contentWidth, y, { align: 'right' });
      y += 5;

      // Company and location - styled differently
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      setColor(pdf, colors.secondary);
      const companyLine = exp.location ? `${exp.company}, ${exp.location}` : exp.company;
      pdf.text(companyLine, margin, y);
      y += 6;

      // Description as bullet points
      if (exp.description) {
        const bullets = splitToBulletPoints(exp.description);
        pdf.setFontSize(9);
        setColor(pdf, colors.text);

        bullets.forEach((bullet) => {
          y = checkPageBreak(pdf, y, 10);
          pdf.text('•', margin + 2, y);
          y = addWrappedText(pdf, bullet, margin + 7, y, contentWidth - 7, 4.5);
          y += 2;
        });
      }

      // Space between entries
      if (index < cvData.experience.length - 1) {
        y += 8;
      }
    });

    y += 8;
    drawLine(pdf, margin, y, contentWidth, colors.divider, 0.5);
    y += 10;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION & QUALIFICATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.education.length > 0) {
    y = checkPageBreak(pdf, y, 45);

    // Section heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('EDUCATION & QUALIFICATIONS', margin, y);
    y += 9;

    cvData.education.forEach((edu, index) => {
      y = checkPageBreak(pdf, y, 25);

      // Qualification - bold
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(pdf, colors.text);
      pdf.text(edu.qualification, margin, y);

      // Date range - right aligned
      const dateRange = getDateRange(edu.startDate, edu.endDate, edu.current);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.muted);
      pdf.text(dateRange, margin + contentWidth, y, { align: 'right' });
      y += 5;

      // Institution and location
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      setColor(pdf, colors.secondary);
      const institutionLine = edu.location ? `${edu.institution}, ${edu.location}` : edu.institution;
      pdf.text(institutionLine, margin, y);
      y += 4;

      // Grade if present
      if (edu.grade) {
        pdf.setFontSize(9);
        setColor(pdf, colors.muted);
        pdf.text(`Grade: ${edu.grade}`, margin, y);
        y += 4;
      }

      // Space between entries
      if (index < cvData.education.length - 1) {
        y += 6;
      }
    });

    y += 8;
    drawLine(pdf, margin, y, contentWidth, colors.divider, 0.5);
    y += 10;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SKILLS
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.skills.length > 0) {
    y = checkPageBreak(pdf, y, 35);

    // Section heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('TECHNICAL SKILLS', margin, y);
    y += 9;

    // Skills in a clean grid format (2 columns)
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    setColor(pdf, colors.text);

    const halfWidth = (contentWidth - 10) / 2;
    let col = 0;

    cvData.skills.forEach((skill, i) => {
      const xPos = margin + (col * (halfWidth + 10));

      // Bullet point
      pdf.text('•', xPos, y);
      pdf.text(skill, xPos + 5, y);

      col++;
      if (col >= 2) {
        col = 0;
        y += 6;
      }
    });

    if (col !== 0) y += 6;
    y += 8;
    drawLine(pdf, margin, y, contentWidth, colors.divider, 0.5);
    y += 10;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL CERTIFICATIONS (if not already shown at top)
  // ═══════════════════════════════════════════════════════════════════════════

  if (additionalCerts.length > 0) {
    y = checkPageBreak(pdf, y, 30);

    // Section heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('ADDITIONAL CERTIFICATIONS', margin, y);
    y += 9;

    // Certifications as bullet list
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    setColor(pdf, colors.text);

    additionalCerts.forEach((cert) => {
      y = checkPageBreak(pdf, y, 8);
      pdf.text('•', margin + 2, y);
      y = addWrappedText(pdf, cert, margin + 7, y, contentWidth - 7, 5);
      y += 3;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE FOOTER
  // ═══════════════════════════════════════════════════════════════════════════

  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    addPageFooter(pdf, i, totalPages, colors.muted);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SAVE PDF
  // ═══════════════════════════════════════════════════════════════════════════

  const fileName = getFileName(cvData, 'Classic');
  pdf.save(fileName);
};
