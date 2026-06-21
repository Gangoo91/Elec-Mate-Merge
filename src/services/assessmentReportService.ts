import jsPDF from 'jspdf';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { getBrandColour, ensureSpace, addAccentBar } from '@/utils/pdfBrand';

interface AssessmentCriteria {
  id: string;
  category: string;
  criteria: string;
  weight: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'missing';
  feedback: string;
}

export const generateAssessmentReport = (
  criteria: AssessmentCriteria[],
  overallScore: number,
  brandColour?: string
) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  const brand = getBrandColour(brandColour);
  let yPosition = margin;

  // Brand accent strip
  addAccentBar(pdf, brand);

  // Header
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(brand[0], brand[1], brand[2]);
  pdf.text('Portfolio Quality Assessment Report', margin, yPosition);
  pdf.setTextColor(0, 0, 0);
  yPosition += 15;

  // Overall Score
  pdf.setFontSize(14);
  pdf.text(`Overall Score: ${overallScore}%`, margin, yPosition);
  yPosition += 10;

  // Score interpretation
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  let interpretation = '';
  if (overallScore >= 80) interpretation = 'Excellent - Ready for assessment';
  else if (overallScore >= 70) interpretation = 'Good - Minor improvements needed';
  else if (overallScore >= 60) interpretation = 'Satisfactory - Some work required';
  else interpretation = 'Needs significant improvement';

  pdf.text(`Assessment: ${interpretation}`, margin, yPosition);
  yPosition += 20;

  // Detailed breakdown
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(brand[0], brand[1], brand[2]);
  pdf.text('Detailed Assessment Breakdown:', margin, yPosition);
  pdf.setTextColor(0, 0, 0);
  yPosition += 15;

  criteria.forEach((item, index) => {
    // Measure this item's height (heading + 3 metadata lines + wrapped feedback)
    // and keep the whole block together so feedback can't orphan.
    const feedbackLines = pdf.splitTextToSize(
      `Feedback: ${item.feedback}`,
      pageWidth - 2 * margin - 5
    );
    const itemHeight = 8 + 6 * 3 + feedbackLines.length * 5 + 10;
    yPosition = ensureSpace(pdf, yPosition, itemHeight, { bottomMargin: 20, topAfterBreak: margin });

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${item.category}`, margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Criteria: ${item.criteria}`, margin + 5, yPosition);
    yPosition += 6;
    pdf.text(`Weight: ${item.weight}%`, margin + 5, yPosition);
    yPosition += 6;
    pdf.text(`Status: ${item.status.replace('-', ' ').toUpperCase()}`, margin + 5, yPosition);
    yPosition += 6;

    pdf.text(feedbackLines, margin + 5, yPosition);
    yPosition += feedbackLines.length * 5 + 10;
  });

  // Recommendations — keep heading and all items together so none orphan.
  const recommendations = [
    'Focus on areas with lower scores first',
    'Seek feedback from mentors and assessors',
    'Document improvements to show progression',
    'Regular self-assessment helps identify gaps early',
    'Use the interactive learning modules to improve skills',
  ];
  yPosition = ensureSpace(pdf, yPosition, 15 + recommendations.length * 6, {
    bottomMargin: 20,
    topAfterBreak: margin,
  });

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(brand[0], brand[1], brand[2]);
  pdf.text('Recommendations for Improvement:', margin, yPosition);
  pdf.setTextColor(0, 0, 0);
  yPosition += 15;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  recommendations.forEach((rec, index) => {
    pdf.text(`${index + 1}. ${rec}`, margin, yPosition);
    yPosition += 6;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  pdf.text(
    `Report generated on ${new Date().toLocaleDateString()}`,
    margin,
    pdf.internal.pageSize.height - 10
  );

  return pdf;
};

export const downloadAssessmentReport = async (
  criteria: AssessmentCriteria[],
  overallScore: number,
  brandColour?: string
) => {
  const pdf = generateAssessmentReport(criteria, overallScore, brandColour);
  await saveOrSharePdf(
    pdf,
    `Portfolio_Assessment_Report_${new Date().toISOString().split('T')[0]}.pdf`
  );
};
