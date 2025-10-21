import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface PXPData {
  projectName: string;
  projectManager: string;
  startDate: string;
  endDate: string;
  phases: Array<{
    phase: string;
    tasks: string[];
    duration: string;
    resources: string[];
    dependencies?: string;
  }>;
  resources: {
    materials: Array<{ item: string; cost: number }>;
    labour: Array<{ role: string; hours: number; rate: number }>;
    totalCost: number;
  };
  risks: Array<{
    risk: string;
    mitigation: string;
    severity: 'Low' | 'Medium' | 'High';
  }>;
  milestones: Array<{
    milestone: string;
    targetDate: string;
    status: 'Pending' | 'In Progress' | 'Complete';
  }>;
  referencedDocuments: string[];
  notes?: string;
}

export const generateProjectExecutionPlanPDF = (data: PXPData): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Title Page
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Project Execution Plan', pageWidth / 2, 60, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(data.projectName, pageWidth / 2, 80, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Project Manager: ${data.projectManager}`, pageWidth / 2, 100, { align: 'center' });
  doc.text(`Period: ${data.startDate} to ${data.endDate}`, pageWidth / 2, 110, { align: 'center' });

  // Page 2 - Project Phases
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Project Phases & Timeline', 15, yPos);
  yPos += 10;

  data.phases.forEach((phase, idx) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Phase ${idx + 1}: ${phase.phase}`, 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Duration: ${phase.duration}`, 20, yPos);
    yPos += 6;
    
    if (phase.dependencies) {
      doc.text(`Dependencies: ${phase.dependencies}`, 20, yPos);
      yPos += 6;
    }

    doc.text('Tasks:', 20, yPos);
    yPos += 5;
    phase.tasks.forEach(task => {
      doc.text(`• ${task}`, 25, yPos);
      yPos += 5;
    });
    yPos += 3;

    doc.text('Resources:', 20, yPos);
    yPos += 5;
    phase.resources.forEach(resource => {
      doc.text(`• ${resource}`, 25, yPos);
      yPos += 5;
    });
    yPos += 8;
  });

  // Resource Allocation
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Resource Allocation', 15, yPos);
  yPos += 10;

  // Materials
  doc.setFontSize(14);
  doc.text('Materials Budget', 15, yPos);
  yPos += 8;

  const materialRows = data.resources.materials.map(m => [
    m.item,
    `£${m.cost.toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Item', 'Cost']],
    body: materialRows,
    theme: 'grid',
    headStyles: { fillColor: [236, 72, 153], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 3 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Labour
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Labour Allocation', 15, yPos);
  yPos += 8;

  const labourRows = data.resources.labour.map(l => [
    l.role,
    l.hours.toString(),
    `£${l.rate.toFixed(2)}`,
    `£${(l.hours * l.rate).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Role', 'Hours', 'Rate/Hour', 'Total']],
    body: labourRows,
    theme: 'grid',
    headStyles: { fillColor: [236, 72, 153], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 3 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 8;

  // Total Cost
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Project Cost: £${data.resources.totalCost.toFixed(2)}`, 15, yPos);

  // Risk Register
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.text('Risk Register', 15, yPos);
  yPos += 10;

  const riskRows = data.risks.map(r => [
    r.risk,
    r.severity,
    r.mitigation
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Risk', 'Severity', 'Mitigation']],
    body: riskRows,
    theme: 'grid',
    headStyles: { fillColor: [255, 165, 0], textColor: [0, 0, 0] },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 30 },
      2: { cellWidth: 90 }
    },
    didParseCell: (data) => {
      if (data.column.index === 1) {
        if (data.cell.text[0] === 'High') {
          data.cell.styles.textColor = [255, 0, 0];
          data.cell.styles.fontStyle = 'bold';
        } else if (data.cell.text[0] === 'Medium') {
          data.cell.styles.textColor = [255, 165, 0];
        }
      }
    }
  });

  // Milestones
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Project Milestones', 15, yPos);
  yPos += 10;

  const milestoneRows = data.milestones.map(m => [
    m.milestone,
    m.targetDate,
    m.status
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Milestone', 'Target Date', 'Status']],
    body: milestoneRows,
    theme: 'grid',
    headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 3 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Referenced Documents
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Referenced Documentation', 15, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  data.referencedDocuments.forEach(docRef => {
    doc.text(`• ${docRef}`, 20, yPos);
    yPos += 6;
  });

  // Notes
  if (data.notes) {
    yPos += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Notes', 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(data.notes, pageWidth - 30);
    doc.text(splitNotes, 15, yPos);
  }

  // Footer on all pages
  const pageCount = doc.internal.pages.length - 1; // Subtract 1 for the 0 index page
  const pageHeight = doc.internal.pageSize.getHeight();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text(
      `Page ${i} of ${pageCount} | Generated: ${new Date().toLocaleString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  return doc;
};
