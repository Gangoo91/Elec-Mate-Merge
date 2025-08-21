
import jsPDF from 'jspdf';
import { CVData } from './types';
import { format } from 'date-fns';

export const generateCVPDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 25;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;
  
  // Set cream background color
  pdf.setFillColor(248, 246, 243); // cv-cream equivalent
  pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');

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

  // Helper function to add bullet points
  const addBulletPoints = (text: string, x: number, y: number, fontSize: number = 10): number => {
    const sentences = text.split(/[.\n]+/).filter(item => item.trim().length > 0);
    let currentY = y;
    
    sentences.forEach((sentence) => {
      const trimmed = sentence.trim();
      if (trimmed) {
        pdf.setTextColor(218, 165, 32); // Gold color for bullets
        pdf.text('•', x, currentY);
        pdf.setTextColor(76, 49, 30); // Brown text color
        const lines = pdf.splitTextToSize(trimmed, maxWidth - 10);
        pdf.text(lines, x + 5, currentY);
        currentY += lines.length * (fontSize * 0.35) + 2;
      }
    });
    
    return currentY;
  };

  // Header with professional styling
  pdf.setTextColor(76, 49, 30); // Brown color
  pdf.setFont('times', 'bold');
  yPosition = addText(cvData.personalInfo.fullName || 'Your Name', margin, yPosition, 24);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  yPosition = addText('Qualified Electrician', margin, yPosition + 3, 12);
  
  // Header border line
  pdf.setLineWidth(1);
  pdf.setDrawColor(76, 49, 30);
  pdf.line(margin, yPosition + 5, pageWidth - margin, yPosition + 5);
  yPosition += 15;
  
  // Contact info (positioned at top right)
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(76, 49, 30);
  let contactY = margin;
  
  if (cvData.personalInfo.email) {
    pdf.text(cvData.personalInfo.email, pageWidth - margin, contactY, { align: 'right' });
    contactY += 4;
  }
  if (cvData.personalInfo.phone) {
    pdf.text(cvData.personalInfo.phone, pageWidth - margin, contactY, { align: 'right' });
    contactY += 4;
  }
  if (cvData.personalInfo.address || cvData.personalInfo.postcode) {
    const address = [cvData.personalInfo.address, cvData.personalInfo.postcode].filter(Boolean).join(', ');
    pdf.text(address, pageWidth - margin, contactY, { align: 'right' });
  }

  // Personal Profile
  if (cvData.personalInfo.professionalSummary) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(76, 49, 30);
    yPosition = addText('PERSONAL PROFILE', margin, yPosition, 10);
    
    // Section underline
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(220, 211, 196);
    pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    yPosition = addBulletPoints(cvData.personalInfo.professionalSummary, margin, yPosition, 9);
    yPosition += 10;
  }

  // Work Experience
  if (cvData.experience.length > 0) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(76, 49, 30);
    yPosition = addText('WORK EXPERIENCE', margin, yPosition, 10);
    
    // Section underline
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(220, 211, 196);
    pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
    yPosition += 8;

    cvData.experience.forEach((exp) => {
      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(76, 49, 30);
      yPosition = addText(exp.jobTitle, margin, yPosition, 11);
      
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(exp.company, margin, yPosition + 2, 10);
      
      if (exp.location) {
        pdf.setFontSize(9);
        pdf.setTextColor(115, 87, 70);
        yPosition = addText(exp.location, margin, yPosition + 1, 9);
      }
      
      const dateRange = `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
      pdf.setFontSize(9);
      pdf.setTextColor(115, 87, 70);
      pdf.text(dateRange, pageWidth - margin, yPosition - 8, { align: 'right' });
      
      if (exp.description) {
        yPosition += 3;
        yPosition = addBulletPoints(exp.description, margin + 5, yPosition, 9);
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
