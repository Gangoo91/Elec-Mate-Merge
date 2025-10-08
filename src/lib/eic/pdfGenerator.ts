// EIC PDF Generator
// Generates Electrical Installation Certificate - Schedule of Test Results
// BS 7671:2018+A3:2024 compliant format

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EICScheduleOfTests } from '@/types/eic-integration';

export async function generateEICPDF(schedule: EICScheduleOfTests): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Page dimensions
  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 10;

  // Header Section
  pdf.setFillColor(59, 130, 246); // Blue header
  pdf.rect(0, 0, pageWidth, 35, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Electrical Installation Certificate', pageWidth / 2, 15, { align: 'center' });

  pdf.setFontSize(14);
  pdf.text('Schedule of Test Results', pageWidth / 2, 25, { align: 'center' });

  // Installation Details Section
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  let yPos = 45;

  pdf.text(`Installation Address: ${schedule.installationAddress}`, margin, yPos);
  yPos += 6;
  pdf.text(`Designer: ${schedule.designerName}`, margin, yPos);
  yPos += 6;
  pdf.text(
    `Design Date: ${new Date(schedule.designDate).toLocaleDateString('en-GB')}`,
    margin,
    yPos
  );
  yPos += 6;
  pdf.text(`Installation ID: ${schedule.installationId}`, margin, yPos);

  yPos += 10;

  // Test Results Table
  const tableHeaders = [
    ['Cct', 'Type', 'Description', 'Ref', 'Live\n(mm²)', 'CPC\n(mm²)', 'MCB', 'R1+R2\n(Ω)', 'Insulation\n(MΩ)', 'Zs\n(Ω)', 'Max Zs\n(Ω)', 'RCD\n(mA)']
  ];

  const tableData = schedule.circuits.map(circuit => [
    circuit.circuitNumber,
    circuit.phaseType === 'single' ? '1φ' : '3φ',
    circuit.circuitDescription,
    circuit.referenceMethod,
    circuit.liveSize,
    circuit.cpcSize,
    `${circuit.protectiveDeviceCurve || ''}${circuit.protectiveDeviceRating}`,
    circuit.r1r2 || 'N/A',
    circuit.insulationResistance || 'N/A',
    circuit.zs || 'N/A',
    circuit.maxZs || 'N/A',
    circuit.rcdRating || 'N/A'
  ]);

  autoTable(pdf, {
    head: tableHeaders,
    body: tableData,
    startY: yPos,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 1.5,
      halign: 'center',
      valign: 'middle'
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    columnStyles: {
      0: { cellWidth: 12 }, // Cct
      1: { cellWidth: 12 }, // Type
      2: { cellWidth: 50 }, // Description
      3: { cellWidth: 12 }, // Ref
      4: { cellWidth: 15 }, // Live
      5: { cellWidth: 15 }, // CPC
      6: { cellWidth: 18 }, // MCB
      7: { cellWidth: 20 }, // R1+R2
      8: { cellWidth: 22 }, // Insulation
      9: { cellWidth: 18 }, // Zs
      10: { cellWidth: 18 }, // Max Zs
      11: { cellWidth: 18 }  // RCD
    },
    margin: { left: margin, right: margin }
  });

  // Footer Section
  const finalY = (pdf as any).lastAutoTable.finalY + 10;

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Testing Standards:', margin, finalY);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.text('Tested in accordance with BS 7671:2018+A3:2024', margin, finalY + 5);
  pdf.text('Part 6 - Inspection and Testing', margin, finalY + 10);

  // Signature Section
  const sigStartY = finalY + 20;
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Tested by:', margin, sigStartY);
  
  pdf.setFont('helvetica', 'normal');
  pdf.line(margin + 30, sigStartY, margin + 100, sigStartY);
  pdf.text('Name:', margin + 30, sigStartY + 5);
  
  pdf.line(margin + 140, sigStartY, margin + 210, sigStartY);
  pdf.text('Signature:', margin + 140, sigStartY + 5);
  
  pdf.line(margin + 220, sigStartY, margin + 270, sigStartY);
  pdf.text('Date:', margin + 220, sigStartY + 5);

  // Page number
  pdf.setFontSize(8);
  pdf.setTextColor(100);
  pdf.text(
    `Page 1 - Generated ${new Date().toLocaleDateString('en-GB')}`,
    pageWidth / 2,
    pageHeight - 5,
    { align: 'center' }
  );

  // Certificate number
  pdf.text(
    `Cert: ${schedule.installationId}`,
    pageWidth - margin,
    pageHeight - 5,
    { align: 'right' }
  );

  return pdf.output('blob');
}

/**
 * Generate and download EIC PDF
 */
export async function downloadEICPDF(
  schedule: EICScheduleOfTests,
  filename?: string
): Promise<void> {
  const pdfBlob = await generateEICPDF(schedule);
  const url = URL.createObjectURL(pdfBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `EIC_Schedule_${schedule.installationId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
