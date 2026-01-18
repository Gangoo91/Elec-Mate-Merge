/**
 * ATS-Friendly Template PDF Generator
 *
 * Plain text format optimised for Applicant Tracking Systems:
 * - No graphics, colours, or complex layouts
 * - Standard section headings
 * - Single column layout
 * - Clean, parseable text
 */

import jsPDF from 'jspdf';
import { CVData } from '../types';
import {
  PDF_CONFIG,
  getDateRange,
  checkPageBreak,
  addWrappedText,
  getFileName,
  splitToBulletPoints,
} from './shared';

export const generateATSPDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const { margin, contentWidth } = PDF_CONFIG;
  let y = margin;

  // Helper to add section header
  const addSectionHeader = (title: string) => {
    y = checkPageBreak(pdf, y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(title.toUpperCase(), margin, y);
    y += 2;
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(0, 0, 0);
    pdf.line(margin, y, margin + contentWidth, y);
    y += 6;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER - Name and Contact
  // ═══════════════════════════════════════════════════════════════════════════

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text(cvData.personalInfo.fullName || 'Your Name', margin, y);
  y += 8;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);

  if (cvData.personalInfo.email) {
    pdf.text(`Email: ${cvData.personalInfo.email}`, margin, y);
    y += 5;
  }
  if (cvData.personalInfo.phone) {
    pdf.text(`Phone: ${cvData.personalInfo.phone}`, margin, y);
    y += 5;
  }
  if (cvData.personalInfo.address || cvData.personalInfo.postcode) {
    const address = [cvData.personalInfo.address, cvData.personalInfo.postcode].filter(Boolean).join(', ');
    pdf.text(`Address: ${address}`, margin, y);
    y += 5;
  }
  if (cvData.personalInfo.linkedIn) {
    pdf.text(`LinkedIn: ${cvData.personalInfo.linkedIn}`, margin, y);
    y += 5;
  }

  y += 8;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFESSIONAL SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.personalInfo.professionalSummary) {
    addSectionHeader('Professional Summary');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    y = addWrappedText(pdf, cvData.personalInfo.professionalSummary, margin, y, contentWidth, 5);
    y += 10;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // KEY QUALIFICATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.certifications.length > 0) {
    addSectionHeader('Key Qualifications');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    cvData.certifications.forEach((cert) => {
      y = checkPageBreak(pdf, y, 8);
      pdf.text(`- ${cert}`, margin, y);
      y += 5;
    });

    y += 6;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFESSIONAL CARDS
  // ═══════════════════════════════════════════════════════════════════════════

  const hasCards = cvData.professionalCards.ecsCardType ||
                   cvData.professionalCards.cscsCardType ||
                   cvData.professionalCards.drivingLicence.length > 0;

  if (hasCards) {
    addSectionHeader('Professional Cards & Licences');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    if (cvData.professionalCards.ecsCardType) {
      pdf.text(`ECS Card: ${cvData.professionalCards.ecsCardType} Card`, margin, y);
      y += 5;
    }
    if (cvData.professionalCards.cscsCardType) {
      pdf.text(`CSCS Card: ${cvData.professionalCards.cscsCardType}`, margin, y);
      y += 5;
    }
    if (cvData.professionalCards.drivingLicence.length > 0) {
      pdf.text(`Driving Licences: ${cvData.professionalCards.drivingLicence.join(', ')}`, margin, y);
      y += 5;
    }

    y += 6;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WORK EXPERIENCE
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.experience.length > 0) {
    addSectionHeader('Work Experience');

    cvData.experience.forEach((exp) => {
      y = checkPageBreak(pdf, y, 30);

      // Job title and dates
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text(exp.jobTitle, margin, y);

      const dateRange = getDateRange(exp.startDate, exp.endDate, exp.current);
      pdf.setFont('helvetica', 'normal');
      pdf.text(dateRange, margin + contentWidth, y, { align: 'right' });
      y += 5;

      // Company
      pdf.setFontSize(10);
      const companyLine = exp.location ? `${exp.company}, ${exp.location}` : exp.company;
      pdf.text(companyLine, margin, y);
      y += 6;

      // Description
      if (exp.description) {
        const bullets = splitToBulletPoints(exp.description);
        bullets.forEach((bullet) => {
          y = checkPageBreak(pdf, y, 8);
          pdf.text(`- ${bullet}`, margin, y);
          y += 5;
        });
      }

      y += 6;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // KEY PROJECTS
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.keyProjects.length > 0) {
    addSectionHeader('Key Projects');

    cvData.keyProjects.forEach((project) => {
      y = checkPageBreak(pdf, y, 25);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text(project.title, margin, y);
      y += 5;

      pdf.setFont('helvetica', 'normal');
      const metaLine = [project.role, project.client, project.value].filter(Boolean).join(' | ');
      if (metaLine) {
        pdf.text(metaLine, margin, y);
        y += 5;
      }

      if (project.description) {
        y = addWrappedText(pdf, project.description, margin, y, contentWidth, 4.5);
      }

      y += 6;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.education.length > 0) {
    addSectionHeader('Education');

    cvData.education.forEach((edu) => {
      y = checkPageBreak(pdf, y, 20);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text(edu.qualification, margin, y);

      const dateRange = getDateRange(edu.startDate, edu.endDate, edu.current);
      pdf.setFont('helvetica', 'normal');
      pdf.text(dateRange, margin + contentWidth, y, { align: 'right' });
      y += 5;

      const institutionLine = edu.location ? `${edu.institution}, ${edu.location}` : edu.institution;
      pdf.text(institutionLine, margin, y);
      y += 4;

      if (edu.grade) {
        pdf.text(`Grade: ${edu.grade}`, margin, y);
        y += 4;
      }

      y += 4;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SKILLS
  // ═══════════════════════════════════════════════════════════════════════════

  if (cvData.skills.length > 0) {
    addSectionHeader('Technical Skills');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    const skillsText = cvData.skills.join(', ');
    y = addWrappedText(pdf, skillsText, margin, y, contentWidth, 5);
    y += 8;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════

  addSectionHeader('References');
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);

  if (cvData.references.length === 0) {
    pdf.text('Available on request', margin, y);
  } else {
    cvData.references.forEach((ref) => {
      y = checkPageBreak(pdf, y, 20);

      pdf.setFont('helvetica', 'bold');
      pdf.text(ref.name, margin, y);
      y += 5;

      pdf.setFont('helvetica', 'normal');
      pdf.text(`${ref.jobTitle}, ${ref.company}`, margin, y);
      y += 4;

      if (ref.relationship) {
        pdf.text(`Relationship: ${ref.relationship}`, margin, y);
        y += 4;
      }

      y += 4;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SAVE PDF
  // ═══════════════════════════════════════════════════════════════════════════

  const fileName = getFileName(cvData, 'ATS');
  pdf.save(fileName);
};
