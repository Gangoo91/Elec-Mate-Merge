import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface InstallationMethodData {
  projectName: string;
  circuitType: string;
  installer: string;
  installationDate: string;
  steps: Array<{
    sequence: number;
    task: string;
    duration: string;
    tools: string[];
    notes?: string;
  }>;
  materials: Array<{
    item: string;
    quantity: string;
    specification: string;
  }>;
  safetyNotes?: string[];
}

export const generateInstallationMethodPDF = (data: InstallationMethodData): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Installation Method Statement', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Project Details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Project: ${data.projectName}`, 15, yPos);
  yPos += 7;
  doc.text(`Circuit Type: ${data.circuitType}`, 15, yPos);
  yPos += 7;
  doc.text(`Installer: ${data.installer}`, 15, yPos);
  yPos += 7;
  doc.text(`Date: ${data.installationDate}`, 15, yPos);
  yPos += 12;

  // Installation Steps
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Installation Sequence', 15, yPos);
  yPos += 8;

  const stepsRows = data.steps.map(step => [
    step.sequence.toString(),
    step.task,
    step.duration,
    step.tools.join(', '),
    step.notes || '-'
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Step', 'Task', 'Duration', 'Tools Required', 'Notes']],
    body: stepsRows,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 60 },
      2: { cellWidth: 25 },
      3: { cellWidth: 50 },
      4: { cellWidth: 40 }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Check if new page needed
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }

  // Materials List
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Required Materials', 15, yPos);
  yPos += 8;

  const materialRows = data.materials.map(m => [
    m.item,
    m.quantity,
    m.specification
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Item', 'Quantity', 'Specification']],
    body: materialRows,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 3 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Safety Notes
  if (data.safetyNotes && data.safetyNotes.length > 0) {
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Safety Considerations', 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    data.safetyNotes.forEach(note => {
      doc.text(`• ${note}`, 20, yPos);
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
