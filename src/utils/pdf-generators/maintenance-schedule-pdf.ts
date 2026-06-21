import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getBrandColour, ensureSpace, addAccentBar, readableTextOn } from '@/utils/pdfBrand';

/** Read the finalY of the most recently drawn autoTable (typed accessor). */
const lastTableFinalY = (doc: jsPDF): number =>
  (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 0;

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

export interface MaintenanceSchedulePDFOptions {
  /** Optional company brand colour (hex) for the header/accent. Falls back to Elec-Mate navy. */
  brandColour?: string;
}

export const generateMaintenanceSchedulePDF = (
  data: MaintenanceScheduleData,
  options: MaintenanceSchedulePDFOptions = {}
): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const brand = getBrandColour(options.brandColour);
  const headText = readableTextOn(brand);
  let yPos = 20;

  // Brand accent strip
  addAccentBar(doc, brand);

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

  const taskRows = data.tasks.map((task) => [
    task.equipment,
    task.task,
    task.frequency,
    task.lastCompleted || 'N/A',
    task.nextDue,
    task.responsible,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Equipment', 'Task', 'Frequency', 'Last Done', 'Next Due', 'Responsible']],
    body: taskRows,
    theme: 'grid',
    headStyles: { fillColor: brand, textColor: headText },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 50 },
      2: { cellWidth: 25 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 },
    },
  });

  yPos = lastTableFinalY(doc) + 12;

  // Keep the heading with its table (widow/orphan guard)
  yPos = ensureSpace(doc, yPos, 24, { bottomMargin: 25, topAfterBreak: 20 });

  // Inspection Intervals
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Periodic Inspection Requirements', 15, yPos);
  yPos += 8;

  const inspectionRows = data.inspectionIntervals.map((i) => [
    i.inspectionType,
    i.interval,
    i.nextDue,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Inspection Type', 'Interval', 'Next Due']],
    body: inspectionRows,
    theme: 'grid',
    headStyles: { fillColor: brand, textColor: headText },
    styles: { fontSize: 9, cellPadding: 3 },
  });

  yPos = lastTableFinalY(doc) + 12;

  // Notes
  if (data.notes) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(data.notes, pageWidth - 30);
    // Reserve room for the heading + every wrapped line so the block isn't orphaned/clipped
    const notesNeeded = 7 + splitNotes.length * 5 + 5;
    yPos = ensureSpace(doc, yPos, notesNeeded, { bottomMargin: 25, topAfterBreak: 20 });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Notes', 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(splitNotes, 15, yPos);
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text(
    `Generated: ${new Date().toLocaleString()} | BS 7671:2018+A4:2026 Compliant`,
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  return doc;
};
