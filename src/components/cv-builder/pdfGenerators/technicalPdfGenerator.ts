/**
 * Technical Template PDF Generator
 *
 * Specialist-focused design with:
 * - Emerald/teal accent (#10b981)
 * - Prominent certifications section
 * - Skills grid with proficiency bars
 * - Technical credibility emphasis
 * - Clean, data-focused layout
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
  drawRect,
  drawLine,
  getFileName,
  splitToBulletPoints,
  addPageFooter,
  generateProfessionalTitle,
  categoriseCertifications,
  getSkillProficiency,
  calculateExperienceYears,
} from './shared';

const colors = TEMPLATE_COLORS.technical;

export const generateTechnicalPDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const { margin, contentWidth, pageWidth, pageHeight } = PDF_CONFIG;
  let y = margin;

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER - Clean technical style with accent bars
  // ═══════════════════════════════════════════════════════════════════════════

  // Top accent bar
  drawRect(pdf, 0, 0, pageWidth, 4, colors.primary);

  y = 18;

  // Name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  setColor(pdf, colors.text);
  pdf.text(cvData.personalInfo.fullName || 'Your Name', margin, y);

  // Years experience badge (prominent for technical CV)
  const yearsExp = calculateExperienceYears(cvData.experience);
  if (yearsExp > 0) {
    const badgeText = `${yearsExp}+ Years Experience`;
    const badgeWidth = pdf.getTextWidth(badgeText) + 10;
    drawRect(pdf, margin + contentWidth - badgeWidth, y - 7, badgeWidth, 10, colors.primary, 2);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    setColor(pdf, '#ffffff');
    pdf.text(badgeText, margin + contentWidth - badgeWidth + 5, y - 1);
  }

  y += 6;

  // Professional title
  const professionalTitle = generateProfessionalTitle(cvData);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  setColor(pdf, colors.secondary);
  pdf.text(professionalTitle, margin, y);
  y += 8;

  // Contact row - clean technical format
  pdf.setFontSize(9);
  setColor(pdf, colors.muted);

  const contactItems: string[] = [];
  if (cvData.personalInfo.email) contactItems.push(cvData.personalInfo.email);
  if (cvData.personalInfo.phone) contactItems.push(cvData.personalInfo.phone);
  if (cvData.personalInfo.address || cvData.personalInfo.postcode) {
    contactItems.push(
      [cvData.personalInfo.address, cvData.personalInfo.postcode].filter(Boolean).join(', ')
    );
  }

  if (contactItems.length > 0) {
    pdf.text(contactItems.join('  |  '), margin, y);
  }
  y += 10;

  // Divider
  drawLine(pdf, margin, y, contentWidth, colors.primary, 0.8);
  y += 12;

  // ═══════════════════════════════════════════════════════════════════════════
  // CERTIFICATIONS - Prominent position for technical CV
  // ═══════════════════════════════════════════════════════════════════════════

  const { essential: essentialCerts, additional: additionalCerts } =
    categoriseCertifications(cvData.certifications);

  if (essentialCerts.length > 0) {
    // Highlighted section header
    drawRect(pdf, margin, y - 3, contentWidth, 12, '#ecfdf5', 2);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    setColor(pdf, colors.primary);
    pdf.text('KEY CERTIFICATIONS & QUALIFICATIONS', margin + 4, y + 4);
    y += 16;

    // Certification grid (3 columns for compact display)
    const colWidth = (contentWidth - 8) / 3;
    let colX = margin;
    let colY = y;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);

    essentialCerts.forEach((cert, i) => {
      // Badge style certification
      drawRect(pdf, colX, colY - 4, colWidth - 4, 16, '#f0fdf4', 2);

      // Checkmark icon
      setColor(pdf, colors.primary, 'fill');
      pdf.circle(colX + 6, colY + 3, 3.5, 'F');
      setColor(pdf, '#ffffff');
      pdf.setFontSize(8);
      pdf.text('✓', colX + 4.5, colY + 5);

      // Cert name (truncate if needed)
      pdf.setFontSize(8);
      setColor(pdf, colors.text);
      const certLines = pdf.splitTextToSize(cert, colWidth - 18);
      pdf.text(certLines.slice(0, 2), colX + 13, colY + 2);

      // Move to next position
      if ((i + 1) % 3 === 0) {
        colX = margin;
        colY += 20;
      } else {
        colX += colWidth + 2;
      }
    });

    y = colY + (essentialCerts.length % 3 === 0 ? 0 : 20);
    y += 8;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SKILLS - Technical grid layout with proficiency bars
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.skills.length > 0) {
    y = checkPageBreak(pdf, y, 50);

    // Section header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('TECHNICAL SKILLS', margin, y);

    // Decorative element
    drawRect(pdf, margin + 45, y - 2, 10, 1.5, colors.primary);
    drawRect(pdf, margin + 57, y - 2, 5, 1.5, colors.secondary);
    y += 10;

    // Skills in 2-column grid with proficiency bars
    const halfWidth = (contentWidth - 12) / 2;
    let skillCol = 0;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);

    cvData.skills.forEach((skill, i) => {
      y = checkPageBreak(pdf, y, 12);

      const skillX = margin + (skillCol * (halfWidth + 12));

      // Skill name
      setColor(pdf, colors.text);
      pdf.text(skill, skillX, y);

      // Proficiency bar with intelligent calculation (NOT random)
      const proficiency = getSkillProficiency(skill);
      const barWidth = 35;
      const barY = y + 3;

      // Background bar
      drawRect(pdf, skillX, barY, barWidth, 2.5, '#e2e8f0');

      // Proficiency fill
      drawRect(pdf, skillX, barY, barWidth * proficiency, 2.5, colors.primary);

      // Percentage label
      pdf.setFontSize(7);
      setColor(pdf, colors.muted);
      pdf.text(`${Math.round(proficiency * 100)}%`, skillX + barWidth + 2, y + 3);

      // Move to next position
      skillCol++;
      if (skillCol >= 2) {
        skillCol = 0;
        y += 12;
      }
    });

    if (skillCol !== 0) y += 12;
    y += 10;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFESSIONAL SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.personalInfo.professionalSummary) {
    y = checkPageBreak(pdf, y, 45);

    // Section header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('PROFESSIONAL PROFILE', margin, y);
    drawRect(pdf, margin + 50, y - 2, 10, 1.5, colors.primary);
    y += 10;

    // Summary with left border accent
    drawRect(pdf, margin, y - 3, 2.5, 30, colors.accent);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    setColor(pdf, colors.text);
    y = addWrappedText(pdf, cvData.personalInfo.professionalSummary, margin + 7, y, contentWidth - 7, 5);
    y += 14;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WORK EXPERIENCE - Technical format with date column
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.experience.length > 0) {
    y = checkPageBreak(pdf, y, 55);

    // Section header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('WORK EXPERIENCE', margin, y);
    drawRect(pdf, margin + 45, y - 2, 10, 1.5, colors.primary);
    y += 12;

    cvData.experience.forEach((exp, index) => {
      y = checkPageBreak(pdf, y, 45);

      // Date range on left with accent
      const dateColWidth = 38;
      const contentX = margin + dateColWidth + 6;
      const expContentWidth = contentWidth - dateColWidth - 6;

      // Left accent bar
      drawRect(pdf, margin, y - 3, 2.5, 22, colors.accent);

      const dateRange = getDateRange(exp.startDate, exp.endDate, exp.current);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      setColor(pdf, colors.muted);
      const dateParts = dateRange.split(' - ');
      pdf.text(dateParts[0] || '', margin + 6, y);
      pdf.text(dateParts[1] || '', margin + 6, y + 5);

      // Job title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(pdf, colors.text);
      pdf.text(exp.jobTitle, contentX, y);

      // Company and location
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.secondary);
      const companyLine = exp.location ? `${exp.company}, ${exp.location}` : exp.company;
      pdf.text(companyLine, contentX, y + 6);

      y += 14;

      // Description bullets
      if (exp.description) {
        const bullets = splitToBulletPoints(exp.description);
        pdf.setFontSize(9);
        setColor(pdf, colors.text);

        bullets.forEach((bullet) => {
          y = checkPageBreak(pdf, y, 10);
          // Technical bullet style
          setColor(pdf, colors.primary);
          pdf.text('>', contentX, y);
          setColor(pdf, colors.text);
          y = addWrappedText(pdf, bullet, contentX + 5, y, expContentWidth - 5, 4.5);
          y += 2;
        });
      }

      y += 12;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION & TRAINING
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.education.length > 0) {
    y = checkPageBreak(pdf, y, 45);

    // Section header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    setColor(pdf, colors.primary);
    pdf.text('EDUCATION & TRAINING', margin, y);
    drawRect(pdf, margin + 52, y - 2, 10, 1.5, colors.primary);
    y += 12;

    cvData.education.forEach((edu, index) => {
      y = checkPageBreak(pdf, y, 28);

      // Row with subtle background
      drawRect(pdf, margin, y - 4, contentWidth, 22, '#f0fdf4', 2);

      // Qualification
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      setColor(pdf, colors.text);
      pdf.text(edu.qualification, margin + 5, y + 2);

      // Date badge - right aligned
      const dateRange = getDateRange(edu.startDate, edu.endDate, edu.current);
      pdf.setFontSize(8);
      setColor(pdf, colors.muted);
      pdf.text(dateRange, margin + contentWidth - 5, y + 2, { align: 'right' });

      // Institution, location, and grade
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.secondary);
      const institutionText = edu.grade
        ? `${edu.institution}${edu.location ? `, ${edu.location}` : ''} | Grade: ${edu.grade}`
        : `${edu.institution}${edu.location ? `, ${edu.location}` : ''}`;
      pdf.text(institutionText, margin + 5, y + 10);

      y += 26;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL CERTIFICATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  if (additionalCerts.length > 0) {
    y = checkPageBreak(pdf, y, 35);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    setColor(pdf, colors.muted);
    pdf.text('OTHER CERTIFICATIONS', margin, y);
    y += 10;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    setColor(pdf, colors.text);

    // Two-column layout for additional certs
    const halfWidth = (contentWidth - 10) / 2;
    let col = 0;

    additionalCerts.forEach((cert, i) => {
      y = checkPageBreak(pdf, y, 8);
      const xPos = margin + (col * (halfWidth + 10));

      setColor(pdf, colors.accent);
      pdf.text('>', xPos, y);
      setColor(pdf, colors.text);
      const certLines = pdf.splitTextToSize(cert, halfWidth - 8);
      pdf.text(certLines[0], xPos + 5, y);

      col++;
      if (col >= 2) {
        col = 0;
        y += 7;
      }
    });

    if (col !== 0) y += 7;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FOOTER - Bottom accent bar and page numbers
  // ═══════════════════════════════════════════════════════════════════════════

  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    // Bottom accent bar
    drawRect(pdf, 0, pageHeight - 4, pageWidth, 4, colors.primary);
    // Page number above the bar
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    setColor(pdf, colors.muted);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SAVE PDF
  // ═══════════════════════════════════════════════════════════════════════════

  const fileName = getFileName(cvData, 'Technical');
  pdf.save(fileName);
};
