import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RAMSData, RAMSRisk } from '@/types/rams';
import { MethodStatementData, MethodStep } from '@/types/method-statement';
import { safeText, safeDate, getRiskLevel, getRiskColor, safeNumber } from './rams-pdf-helpers';

interface CombinedRAMSOptions {
  companyName?: string;
  logoUrl?: string;
  documentReference?: string;
}

export async function generateCombinedRAMSPDF(
  ramsData: RAMSData,
  methodData: MethodStatementData,
  options: CombinedRAMSOptions = {}
): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  // Helper function to add page header
  const addPageHeader = () => {
    doc.setFillColor(255, 215, 0); // elec-yellow
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('RISK ASSESSMENT AND METHOD STATEMENT', pageWidth / 2, 12, { align: 'center' });
    
    if (options.companyName) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(safeText(options.companyName), pageWidth / 2, 19, { align: 'center' });
    }
    
    return 30;
  };

  // Helper function to check if new page needed
  const checkPageBreak = (spaceNeeded: number) => {
    if (yPos + spaceNeeded > pageHeight - margin) {
      doc.addPage();
      yPos = addPageHeader();
    }
  };

  // Page 1: Title and Project Details
  yPos = addPageHeader();

  // Document reference
  if (options.documentReference) {
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Ref: ${safeText(options.documentReference)}`, pageWidth - margin, yPos, { align: 'right' });
  }

  yPos += 15;

  // Project Information Section
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('PROJECT INFORMATION', margin + 3, yPos + 5.5);
  yPos += 12;

  const projectInfo = [
    ['Project Name:', safeText(ramsData.projectName)],
    ['Location:', safeText(ramsData.location)],
    ['Date:', safeDate(ramsData.date)],
    ['Assessor:', safeText(ramsData.assessor)],
    ['Contractor:', safeText(methodData.contractor)],
    ['Supervisor:', safeText(methodData.supervisor)],
    ['Work Type:', safeText(methodData.workType)],
    ['Duration:', safeText(methodData.duration)],
    ['Team Size:', safeText(methodData.teamSize)]
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  projectInfo.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin + 3, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + 45, yPos);
    yPos += 6;
  });

  yPos += 8;
  checkPageBreak(40);

  // SECTION 1: RISK ASSESSMENT
  doc.setFillColor(255, 215, 0);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('SECTION 1: RISK ASSESSMENT', margin + 3, yPos + 7);
  yPos += 15;

  // Risk Assessment Table
  const riskTableData = ramsData.risks.map((risk: RAMSRisk) => [
    safeText(risk.hazard),
    safeNumber(risk.likelihood).toString(),
    safeNumber(risk.severity).toString(),
    safeNumber(risk.riskRating).toString(),
    getRiskLevel(risk.riskRating),
    safeText(risk.controls),
    safeNumber(risk.residualRisk).toString()
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Hazard', 'L', 'S', 'Rating', 'Level', 'Control Measures', 'Residual']],
    body: riskTableData,
    theme: 'striped',
    headStyles: {
      fillColor: [50, 50, 50],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 8, halign: 'center' },
      2: { cellWidth: 8, halign: 'center' },
      3: { cellWidth: 12, halign: 'center' },
      4: { cellWidth: 18 },
      5: { cellWidth: 70 },
      6: { cellWidth: 15, halign: 'center' }
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 4) {
        const rating = parseInt(riskTableData[data.row.index][3]);
        const color = getRiskColor(rating);
        data.cell.styles.fillColor = color;
        data.cell.styles.textColor = [255, 255, 255];
        data.cell.styles.fontStyle = 'bold';
      }
    },
    margin: { left: margin, right: margin }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  checkPageBreak(40);

  // Risk Rating Key
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Rating Key:', margin, yPos);
  yPos += 5;

  const riskKey = [
    { level: 'Low', range: '1-4', color: [34, 197, 94] },
    { level: 'Medium', range: '5-9', color: [255, 193, 7] },
    { level: 'High', range: '10-16', color: [255, 152, 0] },
    { level: 'Very High', range: '17-25', color: [239, 68, 68] }
  ];

  doc.setFont('helvetica', 'normal');
  riskKey.forEach((item, idx) => {
    const xPos = margin + (idx * 42);
    doc.setFillColor(item.color[0], item.color[1], item.color[2]);
    doc.rect(xPos, yPos - 3, 6, 4, 'F');
    doc.text(`${item.level} (${item.range})`, xPos + 8, yPos);
  });

  yPos += 15;
  checkPageBreak(40);

  // SECTION 2: METHOD STATEMENT
  doc.setFillColor(255, 215, 0);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('SECTION 2: METHOD STATEMENT', margin + 3, yPos + 7);
  yPos += 15;

  // Work Description
  if (methodData.description) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Work Description:', margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(safeText(methodData.description), pageWidth - 2 * margin);
    doc.text(descLines, margin, yPos);
    yPos += descLines.length * 5 + 10;
  }

  checkPageBreak(40);

  // Method Steps Table
  const methodTableData = methodData.steps.map((step: MethodStep) => [
    step.stepNumber.toString(),
    safeText(step.title),
    safeText(step.description),
    step.safetyRequirements.join(', '),
    step.riskLevel.toUpperCase(),
    safeText(step.estimatedDuration)
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Step', 'Title', 'Description', 'Safety Requirements', 'Risk', 'Duration']],
    body: methodTableData,
    theme: 'striped',
    headStyles: {
      fillColor: [50, 50, 50],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 35 },
      2: { cellWidth: 55 },
      3: { cellWidth: 45 },
      4: { cellWidth: 15, halign: 'center' },
      5: { cellWidth: 18 }
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 4) {
        const riskLevel = methodData.steps[data.row.index].riskLevel;
        if (riskLevel === 'low') {
          data.cell.styles.fillColor = [34, 197, 94];
          data.cell.styles.textColor = [255, 255, 255];
        } else if (riskLevel === 'medium') {
          data.cell.styles.fillColor = [255, 193, 7];
          data.cell.styles.textColor = [20, 20, 20];
        } else if (riskLevel === 'high') {
          data.cell.styles.fillColor = [239, 68, 68];
          data.cell.styles.textColor = [255, 255, 255];
        }
        data.cell.styles.fontStyle = 'bold';
      }
    },
    margin: { left: margin, right: margin }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  checkPageBreak(40);

  // SECTION 3: SIGNATURES AND APPROVALS
  doc.setFillColor(255, 215, 0);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 3: APPROVALS', margin + 3, yPos + 7);
  yPos += 20;

  // Signature boxes
  const sigBoxWidth = (pageWidth - 3 * margin) / 2;
  
  // Prepared by
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Prepared by:', margin, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(safeText(ramsData.assessor), margin, yPos);
  yPos += 6;
  doc.line(margin, yPos, margin + sigBoxWidth - 5, yPos);
  doc.setFontSize(7);
  doc.text('Signature', margin, yPos + 4);
  doc.text(`Date: ${safeDate(ramsData.date)}`, margin + 40, yPos + 4);

  // Approved by
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Approved by:', margin + sigBoxWidth + 5, yPos - 12);
  yPos += -6;
  doc.setFont('helvetica', 'normal');
  doc.text(safeText(methodData.supervisor || 'Site Supervisor'), margin + sigBoxWidth + 5, yPos);
  yPos += 6;
  doc.line(margin + sigBoxWidth + 5, yPos, pageWidth - margin, yPos);
  doc.setFontSize(7);
  doc.text('Signature', margin + sigBoxWidth + 5, yPos + 4);
  doc.text(`Date: ${safeDate(new Date())}`, margin + sigBoxWidth + 45, yPos + 4);

  yPos += 15;
  checkPageBreak(30);

  // Footer with compliance notice
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  const footerText = 'This RAMS document complies with CDM Regulations 2015, Health & Safety at Work Act 1974, and BS 7671:2018 (18th Edition).';
  const footerLines = doc.splitTextToSize(footerText, pageWidth - 2 * margin);
  doc.text(footerLines, pageWidth / 2, pageHeight - 15, { align: 'center' });

  // Add page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  }

  // Save the PDF
  const fileName = `Combined_RAMS_${safeText(ramsData.projectName).replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
  doc.save(fileName);
}
