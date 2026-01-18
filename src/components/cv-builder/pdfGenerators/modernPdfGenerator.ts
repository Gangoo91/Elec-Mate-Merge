/**
 * Modern Template PDF Generator
 *
 * Clean minimalist design with:
 * - Amber accent (#f59e0b)
 * - Left sidebar for contact/skills/photo
 * - Two-column layout
 * - Bold section headers
 * - Professional visual hierarchy
 * - ECS Card in sidebar
 * - Key Projects section
 * - References
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
  generateProfessionalTitle,
  categoriseCertifications,
  getSkillProficiency,
  addProfilePhoto,
  addECSBadge,
  addKeyProjectsSection,
  addReferencesSection,
  formatLinkedInUrl,
} from './shared';

const colors = TEMPLATE_COLORS.modern;

// Layout constants for two-column design
const SIDEBAR_WIDTH = 58;
const MAIN_START = 72;

export const generateModernPDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const { margin, pageWidth, pageHeight } = PDF_CONFIG;
  const mainWidth = pageWidth - MAIN_START - margin;
  let y = margin;
  let sidebarY = margin;

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR BACKGROUND
  // ═══════════════════════════════════════════════════════════════════════════

  // Draw sidebar background
  drawRect(pdf, 0, 0, SIDEBAR_WIDTH + margin, pageHeight, '#f8fafc');

  // Accent bar at top of sidebar (taller if photo)
  const accentBarHeight = cvData.personalInfo.photoUrl ? 75 : 50;
  drawRect(pdf, 0, 0, SIDEBAR_WIDTH + margin, accentBarHeight, colors.primary);

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR - PHOTO (in accent bar)
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.personalInfo.photoUrl) {
    const photoSize = 28;
    const photoX = margin + (SIDEBAR_WIDTH - photoSize) / 2;
    await addProfilePhoto(pdf, cvData.personalInfo.photoUrl, photoX, sidebarY + 2, photoSize);
    sidebarY += photoSize + 6;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR - NAME (in accent bar)
  // ═══════════════════════════════════════════════════════════════════════════

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  setColor(pdf, '#ffffff');
  const nameParts = (cvData.personalInfo.fullName || 'Your Name').split(' ');
  pdf.text(nameParts[0] || '', margin, sidebarY + (cvData.personalInfo.photoUrl ? 8 : 14));
  if (nameParts.length > 1) {
    pdf.text(nameParts.slice(1).join(' '), margin, sidebarY + (cvData.personalInfo.photoUrl ? 15 : 22));
  }

  // Professional title in accent bar
  const professionalTitle = generateProfessionalTitle(cvData);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  setColor(pdf, '#ffffff', 'text');
  const titleLines = pdf.splitTextToSize(professionalTitle, SIDEBAR_WIDTH);
  pdf.text(titleLines, margin, sidebarY + (cvData.personalInfo.photoUrl ? 22 : 32));

  sidebarY = accentBarHeight + 8;

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR - ECS CARD BADGE
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.professionalCards.ecsCardType) {
    sidebarY = addECSBadge(
      pdf,
      cvData.professionalCards.ecsCardType,
      cvData.professionalCards.ecsExpiry,
      margin,
      sidebarY,
      SIDEBAR_WIDTH
    );
    sidebarY += 4;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR - CONTACT
  // ═══════════════════════════════════════════════════════════════════════════

  // Section title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  setColor(pdf, colors.primary);
  pdf.text('CONTACT', margin, sidebarY);
  sidebarY += 7;

  // Contact details
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  setColor(pdf, colors.text);

  if (cvData.personalInfo.email) {
    pdf.text(cvData.personalInfo.email, margin, sidebarY);
    sidebarY += 5;
  }
  if (cvData.personalInfo.phone) {
    pdf.text(cvData.personalInfo.phone, margin, sidebarY);
    sidebarY += 5;
  }
  if (cvData.personalInfo.address || cvData.personalInfo.postcode) {
    const location = [cvData.personalInfo.address, cvData.personalInfo.postcode]
      .filter(Boolean)
      .join(', ');
    const locationLines = pdf.splitTextToSize(location, SIDEBAR_WIDTH);
    pdf.text(locationLines, margin, sidebarY);
    sidebarY += locationLines.length * 4 + 2;
  }

  // LinkedIn and portfolio
  if (cvData.personalInfo.linkedIn) {
    setColor(pdf, colors.secondary);
    pdf.setFontSize(7);
    const linkedInDisplay = formatLinkedInUrl(cvData.personalInfo.linkedIn);
    const linkedInLines = pdf.splitTextToSize(linkedInDisplay, SIDEBAR_WIDTH);
    pdf.text(linkedInLines, margin, sidebarY);
    sidebarY += linkedInLines.length * 3.5 + 2;
  }

  sidebarY += 10;

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR - DRIVING LICENCES
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.professionalCards.drivingLicence.length > 0 && sidebarY < 140) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    setColor(pdf, colors.primary);
    pdf.text('LICENCES', margin, sidebarY);
    sidebarY += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    setColor(pdf, colors.text);

    cvData.professionalCards.drivingLicence.slice(0, 5).forEach((licence) => {
      if (sidebarY > 160) return;
      const licenceLines = pdf.splitTextToSize(`• ${licence}`, SIDEBAR_WIDTH);
      pdf.text(licenceLines, margin, sidebarY);
      sidebarY += licenceLines.length * 3.5 + 1;
    });

    sidebarY += 8;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR - SKILLS with proficiency bars
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.skills.length > 0) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    setColor(pdf, colors.primary);
    pdf.text('SKILLS', margin, sidebarY);
    sidebarY += 7;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    setColor(pdf, colors.text);

    cvData.skills.slice(0, 8).forEach((skill) => {
      if (sidebarY > 220) return;

      // Skill name
      const skillLines = pdf.splitTextToSize(skill, SIDEBAR_WIDTH - 5);
      pdf.text(skillLines, margin, sidebarY);
      sidebarY += skillLines.length * 4;

      // Proficiency bar with intelligent calculation
      const proficiency = getSkillProficiency(skill);
      drawRect(pdf, margin, sidebarY, SIDEBAR_WIDTH - 5, 2.5, '#e2e8f0');
      drawRect(pdf, margin, sidebarY, (SIDEBAR_WIDTH - 5) * proficiency, 2.5, colors.primary);
      sidebarY += 7;
    });

    sidebarY += 8;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR - CERTIFICATIONS (categorised)
  // ═══════════════════════════════════════════════════════════════════════════

  const { essential: essentialCerts, additional: additionalCerts } =
    categoriseCertifications(cvData.certifications);

  if (essentialCerts.length > 0 && sidebarY < 200) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    setColor(pdf, colors.primary);
    pdf.text('KEY CERTS', margin, sidebarY);
    sidebarY += 7;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    setColor(pdf, colors.text);

    essentialCerts.slice(0, 4).forEach((cert) => {
      if (sidebarY > 255) return;

      // Draw small accent dot
      setColor(pdf, colors.primary, 'fill');
      pdf.circle(margin + 1.5, sidebarY - 1, 1, 'F');

      const certLines = pdf.splitTextToSize(cert, SIDEBAR_WIDTH - 8);
      setColor(pdf, colors.text);
      pdf.text(certLines, margin + 5, sidebarY);
      sidebarY += certLines.length * 4 + 3;
    });

    sidebarY += 6;
  }

  if (additionalCerts.length > 0 && sidebarY < 250) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    setColor(pdf, colors.muted);
    pdf.text('OTHER CERTS', margin, sidebarY);
    sidebarY += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);

    additionalCerts.slice(0, 3).forEach((cert) => {
      if (sidebarY > 275) return;
      const certLines = pdf.splitTextToSize(cert, SIDEBAR_WIDTH - 3);
      setColor(pdf, colors.muted);
      pdf.text(certLines, margin, sidebarY);
      sidebarY += certLines.length * 3.5 + 2;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN CONTENT - PROFESSIONAL SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.personalInfo.professionalSummary) {
    // Section header with accent line
    drawRect(pdf, MAIN_START, y, 3, 14, colors.primary);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    setColor(pdf, colors.text);
    pdf.text('Profile', MAIN_START + 7, y + 9);
    y += 18;

    // Summary text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    setColor(pdf, colors.text);
    y = addWrappedText(pdf, cvData.personalInfo.professionalSummary, MAIN_START, y, mainWidth, 5);
    y += 14;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN CONTENT - WORK EXPERIENCE
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.experience.length > 0) {
    y = checkPageBreak(pdf, y, 50);

    // Section header with accent line
    drawRect(pdf, MAIN_START, y, 3, 14, colors.primary);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    setColor(pdf, colors.text);
    pdf.text('Experience', MAIN_START + 7, y + 9);
    y += 20;

    cvData.experience.forEach((exp, index) => {
      y = checkPageBreak(pdf, y, 40);

      // Job title - bold and prominent
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(pdf, colors.text);
      pdf.text(exp.jobTitle, MAIN_START, y);
      y += 5;

      // Company | Location | Date range
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.primary);
      const dateRange = getDateRange(exp.startDate, exp.endDate, exp.current);
      const companyDate = `${exp.company}${exp.location ? `, ${exp.location}` : ''} | ${dateRange}`;
      pdf.text(companyDate, MAIN_START, y);
      y += 7;

      // Description bullets
      if (exp.description) {
        const bullets = splitToBulletPoints(exp.description);
        pdf.setFontSize(9);
        setColor(pdf, colors.text);

        bullets.forEach((bullet) => {
          y = checkPageBreak(pdf, y, 10);
          setColor(pdf, colors.primary, 'fill');
          pdf.circle(MAIN_START + 2, y - 1, 0.8, 'F');
          y = addWrappedText(pdf, bullet, MAIN_START + 6, y, mainWidth - 6, 4.5);
          y += 2;
        });
      }

      if (index < cvData.experience.length - 1) {
        y += 10;
      }
    });

    y += 12;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN CONTENT - KEY PROJECTS
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.keyProjects.length > 0) {
    y = checkPageBreak(pdf, y, 50);

    // Section header with accent line
    drawRect(pdf, MAIN_START, y, 3, 14, colors.primary);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    setColor(pdf, colors.text);
    pdf.text('Key Projects', MAIN_START + 7, y + 9);
    y += 20;

    cvData.keyProjects.forEach((project, index) => {
      y = checkPageBreak(pdf, y, 30);

      // Project title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      setColor(pdf, colors.text);
      pdf.text(project.title, MAIN_START, y);

      // Value if present (right-aligned)
      if (project.value) {
        setColor(pdf, colors.primary);
        pdf.text(project.value, MAIN_START + mainWidth, y, { align: 'right' });
      }
      y += 5;

      // Role and client
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.primary);
      const metaLine = [project.role, project.client].filter(Boolean).join(' | ');
      if (metaLine) {
        pdf.text(metaLine, MAIN_START, y);
        y += 5;
      }

      // Description
      if (project.description) {
        setColor(pdf, colors.text);
        y = addWrappedText(pdf, project.description, MAIN_START, y, mainWidth, 4.5);
      }

      if (index < cvData.keyProjects.length - 1) {
        y += 8;
      }
    });

    y += 12;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN CONTENT - EDUCATION
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.education.length > 0) {
    y = checkPageBreak(pdf, y, 45);

    // Section header with accent line
    drawRect(pdf, MAIN_START, y, 3, 14, colors.primary);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    setColor(pdf, colors.text);
    pdf.text('Education', MAIN_START + 7, y + 9);
    y += 20;

    cvData.education.forEach((edu, index) => {
      y = checkPageBreak(pdf, y, 25);

      // Qualification
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(pdf, colors.text);
      pdf.text(edu.qualification, MAIN_START, y);
      y += 5;

      // Institution | Location | Date range
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.primary);
      const dateRange = getDateRange(edu.startDate, edu.endDate, edu.current);
      const institutionDate = `${edu.institution}${edu.location ? `, ${edu.location}` : ''} | ${dateRange}`;
      pdf.text(institutionDate, MAIN_START, y);
      y += 5;

      // Grade
      if (edu.grade) {
        setColor(pdf, colors.muted);
        pdf.text(`Grade: ${edu.grade}`, MAIN_START, y);
        y += 5;
      }

      if (index < cvData.education.length - 1) {
        y += 7;
      }
    });

    y += 12;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN CONTENT - REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════

  y = checkPageBreak(pdf, y, 35);

  // Section header with accent line
  drawRect(pdf, MAIN_START, y, 3, 14, colors.primary);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  setColor(pdf, colors.text);
  pdf.text('References', MAIN_START + 7, y + 9);
  y += 20;

  if (cvData.references.length === 0) {
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    setColor(pdf, colors.muted);
    pdf.text('Available on request', MAIN_START, y);
  } else {
    cvData.references.slice(0, 2).forEach((ref, index) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      setColor(pdf, colors.text);
      pdf.text(ref.name, MAIN_START, y);
      y += 4;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      setColor(pdf, colors.muted);
      pdf.text(`${ref.jobTitle}, ${ref.company}`, MAIN_START, y);
      y += 4;

      if (ref.relationship) {
        pdf.setFontSize(8);
        pdf.text(ref.relationship, MAIN_START, y);
        y += 4;
      }

      if (index < cvData.references.length - 1 && index < 1) {
        y += 6;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE FOOTER
  // ═══════════════════════════════════════════════════════════════════════════

  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    // Custom footer position for modern template (right side only)
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    setColor(pdf, colors.muted);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SAVE PDF
  // ═══════════════════════════════════════════════════════════════════════════

  const fileName = getFileName(cvData, 'Modern');
  pdf.save(fileName);
};
