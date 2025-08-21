
import jsPDF from 'jspdf';
import { CVData } from './types';
import { format } from 'date-fns';

export const generateCVPDF = async (cvData: CVData, theme: 'modern' | 'professional' | 'electrical' = 'electrical'): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Theme colors (RGB values for jsPDF)
  const themeColors = {
    electrical: { primary: [255, 204, 0], accent: [255, 235, 153], text: [51, 51, 51] },
    modern: { primary: [59, 130, 246], accent: [219, 234, 254], text: [51, 51, 51] },
    professional: { primary: [71, 85, 105], accent: [241, 245, 249], text: [51, 51, 51] }
  };
  
  const colors = themeColors[theme];

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, fontSize: number = 10, textMaxWidth: number = maxWidth): number => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, textMaxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * (fontSize * 0.35));
  };

  // Header with theme styling
  // Add colored header background
  pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
  pdf.rect(0, 0, pageWidth, 45, 'F');
  
  // Add accent line
  pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  pdf.rect(0, 0, pageWidth, 3, 'F');
  
  // Name
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  yPosition = addText(cvData.personalInfo.fullName || 'Your Name', margin, yPosition + 5, 22);
  
  // Professional title
  if (theme === 'electrical') {
    pdf.setFont('helvetica', 'normal');
    yPosition = addText('Electrical Professional', margin, yPosition + 2, 12);
  }
  
  yPosition += 5;
  
  // Contact info in styled boxes
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  const contactItems = [
    cvData.personalInfo.email,
    cvData.personalInfo.phone,
    [cvData.personalInfo.address, cvData.personalInfo.postcode].filter(Boolean).join(', ')
  ].filter(Boolean);
  
  if (contactItems.length > 0) {
    let xPos = margin;
    contactItems.forEach((item, index) => {
      const itemWidth = pdf.getTextWidth(item) + 6;
      // Contact box background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(xPos, yPosition - 2, itemWidth, 8, 'F');
      pdf.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.rect(xPos, yPosition - 2, itemWidth, 8, 'S');
      
      pdf.text(item, xPos + 3, yPosition + 3);
      xPos += itemWidth + 5;
    });
    yPosition += 12;
  }

  yPosition = Math.max(yPosition, 50); // Ensure we're past the header

  // Professional Summary with styling
  if (cvData.personalInfo.professionalSummary) {
    // Section header with accent line
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.rect(margin, yPosition - 1, 2, 8, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    yPosition = addText('Professional Summary', margin + 8, yPosition, 14);
    yPosition += 8;
    
    // Summary box
    pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    const summaryHeight = Math.ceil(pdf.splitTextToSize(cvData.personalInfo.professionalSummary, maxWidth - 10).length * 3.5) + 8;
    pdf.rect(margin, yPosition - 4, maxWidth, summaryHeight, 'F');
    
    // Accent border
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.rect(margin, yPosition - 4, 4, summaryHeight, 'F');
    
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    yPosition = addText(cvData.personalInfo.professionalSummary, margin + 8, yPosition, 11, maxWidth - 16);
    yPosition += 15;
  }

  // Work Experience with enhanced styling
  if (cvData.experience.length > 0) {
    // Section header with accent line
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.rect(margin, yPosition - 1, 2, 8, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    yPosition = addText('Work Experience', margin + 8, yPosition, 14);
    yPosition += 8;

    cvData.experience.forEach((exp, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      // Timeline dot
      pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.circle(margin + 3, yPosition + 3, 1.5, 'F');
      
      // Experience box background
      pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
      const expHeight = 25 + (exp.description ? Math.ceil(pdf.splitTextToSize(exp.description, maxWidth - 20).length * 3.5) : 0);
      pdf.rect(margin + 8, yPosition - 2, maxWidth - 8, expHeight, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      yPosition = addText(exp.jobTitle, margin + 12, yPosition + 2, 13);
      
      pdf.setFont('helvetica', 'bold');
      const companyLine = `${exp.company}${exp.location ? ` | ${exp.location}` : ''}`;
      yPosition = addText(companyLine, margin + 12, yPosition + 1, 11);
      
      // Date badge
      const dateRange = `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
      const dateWidth = pdf.getTextWidth(dateRange) + 6;
      pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.rect(pageWidth - margin - dateWidth, yPosition - 8, dateWidth, 8, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.text(dateRange, pageWidth - margin - dateWidth + 3, yPosition - 3);
      
      if (exp.description) {
        yPosition += 3;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        yPosition = addText(exp.description, margin + 12, yPosition, 10, maxWidth - 20);
      }
      
      yPosition += 12;
    });
  }

  // Education
  if (cvData.education.length > 0) {
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Education', margin, yPosition, 14);
    yPosition += 5;

    cvData.education.forEach((edu) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont('helvetica', 'bold');
      yPosition = addText(edu.qualification, margin, yPosition, 12);
      
      pdf.setFont('helvetica', 'normal');
      const institutionLine = `${edu.institution}${edu.location ? ` | ${edu.location}` : ''}`;
      yPosition = addText(institutionLine, margin, yPosition + 2, 10);
      
      const dateRange = `${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}`;
      pdf.setFontSize(9);
      pdf.text(dateRange, pageWidth - margin, yPosition - 3, { align: 'right' });
      
      if (edu.grade) {
        yPosition += 2;
        yPosition = addText(`Grade: ${edu.grade}`, margin + 5, yPosition, 9);
      }
      
      yPosition += 8;
    });
  }

  // Skills
  if (cvData.skills.length > 0) {
    if (yPosition > 230) {
      pdf.addPage();
      yPosition = margin;
    }

    // Section header with accent line
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.rect(margin, yPosition - 1, 2, 8, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    yPosition = addText('Technical Skills', margin + 8, yPosition, 14);
    yPosition += 8;
    
    // Skills in badge format
    pdf.setFont('helvetica', 'normal');
    let xPos = margin;
    cvData.skills.forEach((skill, index) => {
      const skillWidth = pdf.getTextWidth(skill) + 8;
      
      // Check if skill fits on current line
      if (xPos + skillWidth > pageWidth - margin) {
        xPos = margin;
        yPosition += 10;
      }
      
      // Skill badge
      pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.rect(xPos, yPosition - 3, skillWidth, 8, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.text(skill, xPos + 4, yPosition + 1);
      
      xPos += skillWidth + 5;
    });
    yPosition += 15;
  }

  // Certifications
  if (cvData.certifications.length > 0) {
    if (yPosition > 230) {
      pdf.addPage();
      yPosition = margin;
    }

    // Section header with accent line
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.rect(margin, yPosition - 1, 2, 8, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    yPosition = addText('Certifications', margin + 8, yPosition, 14);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    cvData.certifications.forEach((cert) => {
      // Certification with icon
      pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
      const certHeight = 10;
      pdf.rect(margin, yPosition - 2, maxWidth, certHeight, 'F');
      
      // Award icon (simple star)
      pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.circle(margin + 6, yPosition + 2, 2, 'F');
      
      pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      yPosition = addText(cert, margin + 12, yPosition, 10);
      yPosition += 4;
    });
  }

  // Save the PDF
  const fileName = `${cvData.personalInfo.fullName || 'CV'}_CV.pdf`.replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(fileName);
};
