import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface MaintenanceScheduleData {
  projectName: string;
  installationAddress: string;
  preparedBy: string;
  preparedDate: string;
  tasks: Array<{
    equipment: string;
    task: string;
    frequency: string;
    lastCompleted?: string;
    nextDue: string;
    responsible: string;
  }>;
  inspectionIntervals: Array<{
    inspectionType: string;
    interval: string;
    nextDue: string;
  }>;
  notes?: string;
}

export const generateMaintenanceSchedulePDF = (data: MaintenanceScheduleData): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Maintenance Schedule', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Project Details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Project: ${data.projectName}`, 15, yPos);
  yPos += 7;
  doc.text(`Installation: ${data.installationAddress}`, 15, yPos);
  yPos += 7;
  doc.text(`Prepared By: ${data.preparedBy}`, 15, yPos);
  yPos += 7;
  doc.text(`Date: ${data.preparedDate}`, 15, yPos);
  yPos += 12;

  // Maintenance Tasks
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Scheduled Maintenance Tasks', 15, yPos);
  yPos += 8;

  const taskRows = data.tasks.map(task => [
    task.equipment,
    task.task,
    task.frequency,
    task.lastCompleted || 'N/A',
    task.nextDue,
    task.responsible
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Equipment', 'Task', 'Frequency', 'Last Done', 'Next Due', 'Responsible']],
    body: taskRows,
    theme: 'grid',
    headStyles: { fillColor: [6, 182, 212], textColor: [255, 255, 255] },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 50 },
      2: { cellWidth: 25 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Check if new page needed
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }

  // Inspection Intervals
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Periodic Inspection Requirements', 15, yPos);
  yPos += 8;

  const inspectionRows = data.inspectionIntervals.map(i => [
    i.inspectionType,
    i.interval,
    i.nextDue
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Inspection Type', 'Interval', 'Next Due']],
    body: inspectionRows,
    theme: 'grid',
    headStyles: { fillColor: [6, 182, 212], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 3 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Notes
  if (data.notes) {
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Notes', 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
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
