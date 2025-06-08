
import jsPDF from 'jspdf';

interface AssessmentCriteria {
  id: string;
  category: string;
  criteria: string;
  weight: number;
  status: "excellent" | "good" | "needs-improvement" | "missing";
  feedback: string;
}

export const generateAssessmentReport = (criteria: AssessmentCriteria[], overallScore: number) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let yPosition = margin;

  // Header
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("Portfolio Quality Assessment Report", margin, yPosition);
  yPosition += 15;

  // Overall Score
  pdf.setFontSize(14);
  pdf.text(`Overall Score: ${overallScore}%`, margin, yPosition);
  yPosition += 10;

  // Score interpretation
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  let interpretation = "";
  if (overallScore >= 80) interpretation = "Excellent - Ready for assessment";
  else if (overallScore >= 70) interpretation = "Good - Minor improvements needed";
  else if (overallScore >= 60) interpretation = "Satisfactory - Some work required";
  else interpretation = "Needs significant improvement";
  
  pdf.text(`Assessment: ${interpretation}`, margin, yPosition);
  yPosition += 20;

  // Detailed breakdown
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Detailed Assessment Breakdown:", margin, yPosition);
  yPosition += 15;

  criteria.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${index + 1}. ${item.category}`, margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Criteria: ${item.criteria}`, margin + 5, yPosition);
    yPosition += 6;
    pdf.text(`Weight: ${item.weight}%`, margin + 5, yPosition);
    yPosition += 6;
    pdf.text(`Status: ${item.status.replace("-", " ").toUpperCase()}`, margin + 5, yPosition);
    yPosition += 6;
    
    const feedbackLines = pdf.splitTextToSize(`Feedback: ${item.feedback}`, pageWidth - 2 * margin - 5);
    pdf.text(feedbackLines, margin + 5, yPosition);
    yPosition += feedbackLines.length * 5 + 10;
  });

  // Recommendations
  if (yPosition > 200) {
    pdf.addPage();
    yPosition = margin;
  }

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Recommendations for Improvement:", margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  const recommendations = [
    "Focus on areas with lower scores first",
    "Seek feedback from mentors and assessors",
    "Document improvements to show progression",
    "Regular self-assessment helps identify gaps early",
    "Use the interactive learning modules to improve skills"
  ];

  recommendations.forEach((rec, index) => {
    pdf.text(`${index + 1}. ${rec}`, margin, yPosition);
    yPosition += 6;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "italic");
  pdf.text(`Report generated on ${new Date().toLocaleDateString()}`, margin, pdf.internal.pageSize.height - 10);

  return pdf;
};

export const downloadAssessmentReport = (criteria: AssessmentCriteria[], overallScore: number) => {
  const pdf = generateAssessmentReport(criteria, overallScore);
  pdf.save(`Portfolio_Assessment_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};
