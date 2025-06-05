
import jsPDF from 'jspdf';
import { CVData } from './types';
import { format } from 'date-fns';

export const generateCVPDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

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
  const addText = (text: string, x: number, y: number, fontSize: number = 10, maxWidth: number = maxWidth): number => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * (fontSize * 0.35));
  };

  // Header
  pdf.setFont('helvetica', 'bold');
  yPosition = addText(cvData.personalInfo.fullName || 'Your Name', margin, yPosition, 20);
  
  // Contact info
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  const contactInfo = [
    cvData.personalInfo.email,
    cvData.personalInfo.phone,
    [cvData.personalInfo.address, cvData.personalInfo.postcode].filter(Boolean).join(', ')
  ].filter(Boolean).join(' | ');
  
  if (contactInfo) {
    yPosition = addText(contactInfo, margin, yPosition + 5, 10);
  }

  yPosition += 10;

  // Professional Summary
  if (cvData.personalInfo.professionalSummary) {
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Professional Summary', margin, yPosition, 14);
    yPosition += 5;
    
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(cvData.personalInfo.professionalSummary, margin, yPosition, 10);
    yPosition += 10;
  }

  // Work Experience
  if (cvData.experience.length > 0) {
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Work Experience', margin, yPosition, 14);
    yPosition += 5;

    cvData.experience.forEach((exp) => {
      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont('helvetica', 'bold');
      yPosition = addText(exp.jobTitle, margin, yPosition, 12);
      
      pdf.setFont('helvetica', 'normal');
      const companyLine = `${exp.company}${exp.location ? ` | ${exp.location}` : ''}`;
      yPosition = addText(companyLine, margin, yPosition + 2, 10);
      
      const dateRange = `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
      pdf.setFontSize(9);
      pdf.text(dateRange, pageWidth - margin, yPosition - 3, { align: 'right' });
      
      if (exp.description) {
        yPosition += 3;
        pdf.setFontSize(10);
        yPosition = addText(exp.description, margin + 5, yPosition, 10, maxWidth - 5);
      }
      
      yPosition += 8;
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

    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Skills', margin, yPosition, 14);
    yPosition += 5;
    
    pdf.setFont('helvetica', 'normal');
    const skillsText = cvData.skills.join(' • ');
    yPosition = addText(skillsText, margin, yPosition, 10);
    yPosition += 10;
  }

  // Certifications
  if (cvData.certifications.length > 0) {
    if (yPosition > 230) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Certifications', margin, yPosition, 14);
    yPosition += 5;
    
    pdf.setFont('helvetica', 'normal');
    cvData.certifications.forEach((cert) => {
      yPosition = addText(`• ${cert}`, margin, yPosition, 10);
      yPosition += 2;
    });
  }

  // Save the PDF
  const fileName = `${cvData.personalInfo.fullName || 'CV'}_CV.pdf`.replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(fileName);
};
