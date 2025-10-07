import jsPDF from 'jspdf';
import 'jspdf-autotable';

export async function generateFallbackPDF(
  type: string,
  data: any,
  projectDetails: any
): Promise<string> {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(30, 58, 138);
  doc.text(getDocumentTitle(type), 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, 20, 30);
  doc.text(`Project: ${projectDetails.projectName || 'Untitled'}`, 20, 36);
  
  // Add content based on type
  let yPos = 50;
  
  switch (type) {
    case 'design_spec':
      yPos = addDesignSpecContent(doc, data, yPos);
      break;
    case 'quote':
      yPos = addQuoteContent(doc, data, yPos);
      break;
    case 'rams':
      yPos = addRAMSContent(doc, data, yPos);
      break;
  }
  
  // Add footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount} | Generated with Electrician's Toolkit`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  // Return as data URL
  return doc.output('dataurlstring');
}

function getDocumentTitle(type: string): string {
  const titles: Record<string, string> = {
    'design_spec': 'Design Specification',
    'quote': 'Client Quote',
    'rams': 'Risk Assessment & Method Statement',
    'checklist': 'Installation Checklist',
    'test_schedule': 'Test Schedule'
  };
  return titles[type] || 'Document';
}

function addDesignSpecContent(doc: jsPDF, data: any, startY: number): number {
  let y = startY;
  
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Design Parameters', 20, y);
  y += 10;
  
  doc.setFontSize(10);
  const params = [
    ['Voltage', `${data.voltage || 230}V`],
    ['Phases', data.phases || '1'],
    ['Total Load', `${data.totalLoad || 0}W`],
    ['Design Current', `${data.designCurrent || 0}A`]
  ];
  
  (doc as any).autoTable({
    startY: y,
    head: [['Parameter', 'Value']],
    body: params,
    theme: 'grid',
    headStyles: { fillColor: [30, 58, 138] }
  });
  
  return (doc as any).lastAutoTable.finalY + 20;
}

function addQuoteContent(doc: jsPDF, data: any, startY: number): number {
  let y = startY;
  
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Quote Summary', 20, y);
  y += 10;
  
  doc.setFontSize(10);
  doc.text(`Quote Number: ${data.quoteNumber || 'N/A'}`, 20, y);
  y += 6;
  doc.text(`Date: ${data.date || new Date().toLocaleDateString('en-GB')}`, 20, y);
  y += 10;
  
  const items = data.items || [{ description: 'Installation', quantity: 1, unitPrice: 0, total: 0 }];
  
  (doc as any).autoTable({
    startY: y,
    head: [['Description', 'Qty', 'Unit Price', 'Total']],
    body: items.map((item: any) => [
      item.description,
      item.quantity,
      `£${item.unitPrice}`,
      `£${item.total}`
    ]),
    foot: [[
      '', '', 'Total:',
      `£${data.total || 0}`
    ]],
    theme: 'grid',
    headStyles: { fillColor: [30, 58, 138] },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
  });
  
  return (doc as any).lastAutoTable.finalY + 20;
}

function addRAMSContent(doc: jsPDF, data: any, startY: number): number {
  let y = startY;
  
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Risk Assessment', 20, y);
  y += 10;
  
  doc.setFontSize(10);
  doc.text(`Assessor: ${data.assessor || 'N/A'}`, 20, y);
  y += 6;
  doc.text(`Date: ${data.date || new Date().toLocaleDateString('en-GB')}`, 20, y);
  y += 10;
  
  if (data.hazards && data.hazards.length > 0) {
    (doc as any).autoTable({
      startY: y,
      head: [['Hazard', 'Risk', 'Likelihood', 'Severity', 'Controls']],
      body: data.hazards.map((h: any) => [
        h.hazard,
        h.risk,
        h.likelihood,
        h.severity,
        h.controls
      ]),
      theme: 'grid',
      headStyles: { fillColor: [30, 58, 138] },
      columnStyles: {
        4: { cellWidth: 60 }
      }
    });
    
    y = (doc as any).lastAutoTable.finalY + 20;
  }
  
  return y;
}
