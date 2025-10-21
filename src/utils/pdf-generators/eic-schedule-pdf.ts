import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface EICScheduleData {
  projectName: string;
  installationAddress: string;
  inspector: string;
  inspectionDate: string;
  circuits: Array<{
    circuitNumber: number;
    circuitDescription: string;
    type: string;
    rating: string;
    testResults: {
      insulation: string;
      continuity: string;
      rcd: string;
      zs: string;
    };
    result: 'Pass' | 'Fail';
  }>;
  overallResult: 'Pass' | 'Fail';
  notes?: string;
}

export const generateEICSchedulePDF = (data: EICScheduleData): jsPDF => {
  const doc = new jsPDF('landscape');
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Electrical Installation Certificate - Test Results Schedule', pageWidth / 2, yPos, { align: 'center' });
  yPos += 12;

  // Project Details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Project: ${data.projectName}`, 15, yPos);
  yPos += 6;
  doc.text(`Installation Address: ${data.installationAddress}`, 15, yPos);
  yPos += 6;
  doc.text(`Inspector: ${data.inspector}`, 15, yPos);
  yPos += 6;
  doc.text(`Inspection Date: ${data.inspectionDate}`, 15, yPos);
  yPos += 10;

  // Test Results Table
  const testRows = data.circuits.map(c => [
    c.circuitNumber.toString(),
    c.circuitDescription,
    c.type,
    c.rating,
    c.testResults.insulation,
    c.testResults.continuity,
    c.testResults.rcd,
    c.testResults.zs,
    c.result
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [[
      'Cct',
      'Description',
      'Type',
      'Rating',
      'Insulation (MΩ)',
      'Continuity (Ω)',
      'RCD (ms)',
      'Zs (Ω)',
      'Result'
    ]],
    body: testRows,
    theme: 'grid',
    headStyles: { fillColor: [147, 51, 234], textColor: [255, 255, 255], fontSize: 9 },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 60 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
      6: { cellWidth: 25 },
      7: { cellWidth: 25 },
      8: { cellWidth: 20, fontStyle: 'bold' }
    },
    didParseCell: (data) => {
      if (data.column.index === 8 && data.cell.text[0] === 'Pass') {
        data.cell.styles.textColor = [0, 128, 0];
      } else if (data.column.index === 8 && data.cell.text[0] === 'Fail') {
        data.cell.styles.textColor = [255, 0, 0];
      }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Overall Result
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  if (data.overallResult === 'Pass') {
    doc.setTextColor(0, 128, 0);
  } else {
    doc.setTextColor(255, 0, 0);
  }
  doc.text(`Overall Result: ${data.overallResult}`, 15, yPos);
  doc.setTextColor(0, 0, 0);
  yPos += 10;

  // Notes
  if (data.notes) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Notes:', 15, yPos);
    yPos += 6;
    const splitNotes = doc.splitTextToSize(data.notes, pageWidth - 30);
    doc.text(splitNotes, 15, yPos);
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
