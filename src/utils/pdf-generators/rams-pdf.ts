import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface RAMSData {
  projectName: string;
  location: string;
  assessor: string;
  assessmentDate: string;
  hazards: Array<{
    hazard: string;
    risk: string;
    controls: string[];
  }>;
  ppe: string[];
  emergencyProcedures?: string[];
}

export const generateRAMSPDF = (data: RAMSData): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Assessment & Method Statement', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Project Details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Project: ${data.projectName}`, 15, yPos);
  yPos += 7;
  doc.text(`Location: ${data.location}`, 15, yPos);
  yPos += 7;
  doc.text(`Assessor: ${data.assessor}`, 15, yPos);
  yPos += 7;
  doc.text(`Date: ${data.assessmentDate}`, 15, yPos);
  yPos += 12;

  // Hazards & Controls Table
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Identified Hazards & Control Measures', 15, yPos);
  yPos += 8;

  const hazardRows = data.hazards.map(h => [
    h.hazard,
    h.risk,
    h.controls.join('\n')
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Hazard', 'Risk Level', 'Control Measures']],
    body: hazardRows,
    theme: 'grid',
    headStyles: { fillColor: [255, 193, 7], textColor: [0, 0, 0] },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 30 },
      2: { cellWidth: 90 }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // PPE Requirements
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Required PPE', 15, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  data.ppe.forEach(item => {
    doc.text(`• ${item}`, 20, yPos);
    yPos += 6;
  });

  yPos += 8;

  // Emergency Procedures
  if (data.emergencyProcedures && data.emergencyProcedures.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Emergency Procedures', 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    data.emergencyProcedures.forEach(proc => {
      doc.text(`• ${proc}`, 20, yPos);
      yPos += 6;
    });
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text(
    `Generated: ${new Date().toLocaleString()} | BS 7671:2018+A3:2024 Compliant`,
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  return doc;
};
