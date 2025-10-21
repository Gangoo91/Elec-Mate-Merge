import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export interface RiskAssessmentData {
  projectName: string;
  location: string;
  assessor: string;
  date: string;
  projectType: 'domestic' | 'commercial' | 'industrial';
  hazards: Array<{
    hazard: string;
    risk: string;
    likelihood: number;
    severity: number;
    riskRating: number;
    controls: string;
    residualRisk: number;
    responsible: string;
  }>;
  requiredPPE: string[];
  emergencyProcedures: string[];
  notes?: string;
}

export const generateRiskAssessmentPDF = (data: RiskAssessmentData): jsPDF => {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFillColor(251, 146, 60);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("RISK ASSESSMENT", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(10);
  doc.text(`${data.projectType.toUpperCase()} PROJECT`, pageWidth / 2, 25, { align: "center" });
  doc.text(`Document Generated: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, pageWidth / 2, 32, { align: "center" });

  yPos = 50;

  // Project Information
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Project Information", 15, yPos);
  yPos += 10;

  const projectInfo = [
    ["Project Name", data.projectName],
    ["Location", data.location],
    ["Risk Assessor", data.assessor],
    ["Assessment Date", format(new Date(data.date), "dd/MM/yyyy")],
    ["Document Reference", `RA-${data.projectName.replace(/\s+/g, '_')}-${format(new Date(), 'ddMMyyyy')}`]
  ];

  autoTable(doc, {
    startY: yPos,
    head: [["Field", "Details"]],
    body: projectInfo,
    theme: "striped",
    headStyles: { fillColor: [251, 146, 60] },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Risk Matrix
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Hazard & Risk Assessment", 15, yPos);
  yPos += 10;

  const riskData = data.hazards.map((h) => [
    h.hazard,
    h.risk,
    h.likelihood.toString(),
    h.severity.toString(),
    h.riskRating.toString(),
    h.controls,
    h.residualRisk.toString(),
    h.responsible
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["Hazard", "Risk", "L", "S", "Rating", "Control Measures", "Residual", "Responsible"]],
    body: riskData,
    theme: "grid",
    headStyles: { fillColor: [251, 146, 60], fontSize: 8 },
    styles: { fontSize: 7, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 35 },
      2: { cellWidth: 10 },
      3: { cellWidth: 10 },
      4: { cellWidth: 15 },
      5: { cellWidth: 80 },
      6: { cellWidth: 15 },
      7: { cellWidth: 30 }
    },
    didParseCell: (data) => {
      // Colour code risk ratings
      if (data.column.index === 4 || data.column.index === 6) {
        const value = parseInt(data.cell.text[0] || '0');
        if (value >= 15) {
          data.cell.styles.textColor = [220, 38, 38]; // Red
          data.cell.styles.fontStyle = 'bold';
        } else if (value >= 8) {
          data.cell.styles.textColor = [234, 179, 8]; // Amber
          data.cell.styles.fontStyle = 'bold';
        } else {
          data.cell.styles.textColor = [34, 197, 94]; // Green
        }
      }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // PPE Requirements
  if (data.requiredPPE && data.requiredPPE.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Required Personal Protective Equipment (PPE)", 15, yPos);
    yPos += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    data.requiredPPE.forEach(ppe => {
      doc.text(`• ${ppe}`, 20, yPos);
      yPos += 5;
    });
    yPos += 5;
  }

  // Emergency Procedures
  if (data.emergencyProcedures && data.emergencyProcedures.length > 0) {
    if (yPos > doc.internal.pageSize.height - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Emergency Procedures", 15, yPos);
    yPos += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    data.emergencyProcedures.forEach(proc => {
      const lines = doc.splitTextToSize(proc, pageWidth - 40);
      doc.text(`• ${lines[0]}`, 20, yPos);
      yPos += 5;
      for (let i = 1; i < lines.length; i++) {
        doc.text(lines[i], 23, yPos);
        yPos += 5;
      }
    });
    yPos += 5;
  }

  // Notes
  if (data.notes) {
    if (yPos > doc.internal.pageSize.height - 40) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Additional Notes", 15, yPos);
    yPos += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const notesLines = doc.splitTextToSize(data.notes, pageWidth - 30);
    doc.text(notesLines, 15, yPos);
  }

  // Compliance Statement
  const footerY = doc.internal.pageSize.height - 30;
  doc.setFillColor(34, 197, 94);
  doc.rect(15, footerY - 10, pageWidth - 30, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("BS 7671:2018+A3:2024 Compliant", pageWidth / 2, footerY - 2, { align: "center" });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("This risk assessment follows HSE guidance and electrical safety regulations", pageWidth / 2, footerY + 4, { align: "center" });

  // Footer
  const bottomY = doc.internal.pageSize.height - 10;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Risk Assessment - Confidential", pageWidth / 2, bottomY, { align: "center" });

  return doc;
};
