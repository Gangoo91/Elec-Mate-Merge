/**
 * Creative Template PDF Generator
 *
 * Stand-out design with:
 * - Purple/pink gradient accents
 * - Visual skill tags with proficiency
 * - Unique timeline-style sections
 * - Bold, eye-catching header
 * - Professional yet distinctive
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
  getFileName,
  splitToBulletPoints,
  addPageFooter,
  generateProfessionalTitle,
  categoriseCertifications,
  getSkillProficiency,
} from './shared';

const colors = TEMPLATE_COLORS.creative;

export const generateCreativePDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const { margin, contentWidth, pageWidth, pageHeight } = PDF_CONFIG;
  let y = margin;

  // ═══════════════════════════════════════════════════════════════════════════
  // GRADIENT HEADER
  // ═══════════════════════════════════════════════════════════════════════════

  // Simulated gradient header (purple to pink)
  const headerHeight = 55;
  const gradientSteps = 25;
  const stepWidth = pageWidth / gradientSteps;

  for (let i = 0; i < gradientSteps; i++) {
    // Interpolate between purple (#9333ea) and pink (#ec4899)
    const ratio = i / gradientSteps;
    const r = Math.round(147 + (236 - 147) * ratio);
    const g = Math.round(51 + (72 - 51) * ratio);
    const b = Math.round(234 + (153 - 234) * ratio);
    pdf.setFillColor(r, g, b);
    pdf.rect(i * stepWidth, 0, stepWidth + 1, headerHeight, 'F');
  }

  // Name - centered in header, large and bold
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(30);
  setColor(pdf, '#ffffff');
  const name = cvData.personalInfo.fullName || 'Your Name';
  pdf.text(name, pageWidth / 2, 24, { align: 'center' });

  // Professional title - centered below name
  const professionalTitle = generateProfessionalTitle(cvData);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.text(professionalTitle, pageWidth / 2, 34, { align: 'center' });

  // Contact info - centered at bottom of header
  pdf.setFontSize(9);
  const contactParts = [
    cvData.personalInfo.email,
    cvData.personalInfo.phone,
    [cvData.personalInfo.address, cvData.personalInfo.postcode].filter(Boolean).join(', '),
  ].filter(Boolean);
  if (contactParts.length > 0) {
    pdf.text(contactParts.join('  |  '), pageWidth / 2, 46, { align: 'center' });
  }

  y = headerHeight + 15;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFESSIONAL SUMMARY - Highlighted box
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.personalInfo.professionalSummary) {
    y = checkPageBreak(pdf, y, 50);

    // Light purple background box
    const summaryLines = pdf.splitTextToSize(cvData.personalInfo.professionalSummary, contentWidth - 20);
    const boxHeight = summaryLines.length * 5 + 18;

    drawRect(pdf, margin, y, contentWidth, boxHeight, '#faf5ff', 4);

    // Left accent bar
    drawRect(pdf, margin, y, 4, boxHeight, colors.primary, 2);

    // Section label
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    setColor(pdf, colors.primary);
    pdf.text('About Me', margin + 12, y + 10);

    // Summary text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    setColor(pdf, colors.text);
    pdf.text(summaryLines, margin + 12, y + 18);

    y += boxHeight + 14;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SKILLS - Visual tags with proficiency indicators
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.skills.length > 0) {
    y = checkPageBreak(pdf, y, 45);

    // Section heading with decorative underline
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    setColor(pdf, colors.primary);
    pdf.text('Skills & Expertise', margin, y);

    // Decorative gradient underline
    drawRect(pdf, margin, y + 2, 30, 2, colors.primary);
    drawRect(pdf, margin + 32, y + 2, 15, 2, colors.secondary);
    y += 14;

    // Skills as coloured tags
    let tagX = margin;
    let tagY = y;
    const tagHeight = 8;
    const tagPadding = 5;
    const tagGap = 4;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);

    cvData.skills.forEach((skill) => {
      const textWidth = pdf.getTextWidth(skill);
      const tagWidth = textWidth + tagPadding * 2;

      // Check if tag fits on current line
      if (tagX + tagWidth > margin + contentWidth) {
        tagX = margin;
        tagY += tagHeight + tagGap;
      }

      // Get proficiency for colour intensity
      const proficiency = getSkillProficiency(skill);
      const alpha = Math.round(proficiency * 255);

      // Draw tag background (purple tint based on proficiency)
      drawRect(pdf, tagX, tagY - 5.5, tagWidth, tagHeight, '#f3e8ff', 3);

      // Draw proficiency indicator line at bottom
      const lineWidth = tagWidth * proficiency;
      drawRect(pdf, tagX, tagY + 1.5, lineWidth, 1, colors.primary);

      // Draw tag text
      setColor(pdf, colors.primary);
      pdf.text(skill, tagX + tagPadding, tagY);

      tagX += tagWidth + tagGap;
    });

    y = tagY + tagHeight + 16;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // KEY CERTIFICATIONS - Badge style at top
  // ═══════════════════════════════════════════════════════════════════════════

  const { essential: essentialCerts, additional: additionalCerts } =
    categoriseCertifications(cvData.certifications);

  if (essentialCerts.length > 0) {
    y = checkPageBreak(pdf, y, 30);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    setColor(pdf, colors.primary);
    pdf.text('Key Qualifications', margin, y);
    y += 10;

    // Badges in a row
    let badgeX = margin;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);

    essentialCerts.slice(0, 4).forEach((cert) => {
      const certWidth = Math.min(pdf.getTextWidth(cert) + 12, 60);

      if (badgeX + certWidth > margin + contentWidth) {
        badgeX = margin;
        y += 12;
      }

      // Badge background
      drawRect(pdf, badgeX, y - 5, certWidth, 9, '#f3e8ff', 2);

      // Checkmark circle
      setColor(pdf, colors.primary, 'fill');
      pdf.circle(badgeX + 5, y - 0.5, 2.5, 'F');
      setColor(pdf, '#ffffff');
      pdf.setFontSize(6);
      pdf.text('✓', badgeX + 3.7, y + 0.8);

      // Cert text
      pdf.setFontSize(8);
      setColor(pdf, colors.text);
      const truncatedCert = cert.length > 20 ? cert.substring(0, 18) + '...' : cert;
      pdf.text(truncatedCert, badgeX + 10, y);

      badgeX += certWidth + 5;
    });

    y += 16;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WORK EXPERIENCE - Timeline style
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.experience.length > 0) {
    y = checkPageBreak(pdf, y, 55);

    // Section heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    setColor(pdf, colors.primary);
    pdf.text('Work Experience', margin, y);
    drawRect(pdf, margin, y + 2, 30, 2, colors.primary);
    drawRect(pdf, margin + 32, y + 2, 15, 2, colors.secondary);
    y += 16;

    cvData.experience.forEach((exp, index) => {
      y = checkPageBreak(pdf, y, 45);

      // Timeline dot
      setColor(pdf, colors.primary, 'fill');
      pdf.circle(margin + 4, y + 2, 3, 'F');

      // Timeline line (if not last item)
      if (index < cvData.experience.length - 1) {
        setColor(pdf, '#e9d5ff', 'draw');
        pdf.setLineWidth(1);
        pdf.line(margin + 4, y + 7, margin + 4, y + 45);
      }

      // Content (offset from timeline)
      const contentX = margin + 14;
      const contentMaxWidth = contentWidth - 14;

      // Job title - bold
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(pdf, colors.text);
      pdf.text(exp.jobTitle, contentX, y + 3);

      // Company and location
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.secondary);
      const companyLine = exp.location ? `${exp.company}, ${exp.location}` : exp.company;
      pdf.text(companyLine, contentX, y + 9);

      // Date badge
      const dateRange = getDateRange(exp.startDate, exp.endDate, exp.current);
      pdf.setFontSize(8);
      setColor(pdf, colors.muted);
      pdf.text(dateRange, contentX, y + 15);

      y += 20;

      // Description bullets
      if (exp.description) {
        const bullets = splitToBulletPoints(exp.description);
        pdf.setFontSize(9);
        setColor(pdf, colors.text);

        bullets.forEach((bullet) => {
          y = checkPageBreak(pdf, y, 10);
          // Small decorative bullet
          setColor(pdf, colors.accent, 'fill');
          pdf.circle(contentX + 1.5, y - 1, 0.8, 'F');
          y = addWrappedText(pdf, bullet, contentX + 5, y, contentMaxWidth - 5, 4.5);
          y += 2;
        });
      }

      y += 12;
    });

    y += 5;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION - Card style
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.education.length > 0) {
    y = checkPageBreak(pdf, y, 50);

    // Section heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    setColor(pdf, colors.primary);
    pdf.text('Education', margin, y);
    drawRect(pdf, margin, y + 2, 30, 2, colors.primary);
    drawRect(pdf, margin + 32, y + 2, 15, 2, colors.secondary);
    y += 16;

    cvData.education.forEach((edu, index) => {
      y = checkPageBreak(pdf, y, 32);

      // Card background
      drawRect(pdf, margin, y - 4, contentWidth, 26, '#fdf4ff', 3);

      // Qualification
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(pdf, colors.text);
      pdf.text(edu.qualification, margin + 6, y + 3);

      // Institution and location
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.secondary);
      const institutionLine = edu.location ? `${edu.institution}, ${edu.location}` : edu.institution;
      pdf.text(institutionLine, margin + 6, y + 10);

      // Date and grade
      const dateRange = getDateRange(edu.startDate, edu.endDate, edu.current);
      pdf.setFontSize(8);
      setColor(pdf, colors.muted);
      const details = edu.grade ? `${dateRange} | Grade: ${edu.grade}` : dateRange;
      pdf.text(details, margin + 6, y + 16);

      y += 30;
    });

    y += 5;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL CERTIFICATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  if (additionalCerts.length > 0) {
    y = checkPageBreak(pdf, y, 35);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    setColor(pdf, colors.muted);
    pdf.text('Other Certifications', margin, y);
    y += 10;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    setColor(pdf, colors.text);

    // Simple list
    additionalCerts.forEach((cert) => {
      y = checkPageBreak(pdf, y, 8);
      setColor(pdf, colors.accent, 'fill');
      pdf.circle(margin + 2, y - 1, 0.8, 'F');
      setColor(pdf, colors.text);
      y = addWrappedText(pdf, cert, margin + 6, y, contentWidth - 6, 5);
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

  const fileName = getFileName(cvData, 'Creative');
  pdf.save(fileName);
};
