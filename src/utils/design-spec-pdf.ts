import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface DesignSpecData {
  projectName: string;
  location: string;
  assessor: string;
  date: string;
  circuits: Array<{
    name: string;
    loadType: string;
    totalLoad: number;
    voltage: number;
    phases: string;
    cableLength: number;
    recommendedCableSize?: number;
    protectiveDevice?: string;
    voltageDrop?: number;
  }>;
  designerNotes?: string;
}

export function generateDesignSpecificationPDF(data: DesignSpecData): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Header
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ELECTRICAL DESIGN SPECIFICATION", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(10);
  doc.text("BS 7671:2018+A3:2024 Compliant", pageWidth / 2, 25, { align: "center" });
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
    ["Design Engineer", data.assessor],
    ["Design Date", format(new Date(data.date), "dd/MM/yyyy")],
    ["Document Reference", `DS-${data.projectName.replace(/\s+/g, '_')}-${format(new Date(), 'ddMMyyyy')}`]
  ];

  autoTable(doc, {
    startY: yPos,
    head: [["Field", "Details"]],
    body: projectInfo,
    theme: "striped",
    headStyles: { fillColor: [30, 64, 175] },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Circuit Design Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Circuit Design Summary", 15, yPos);
  yPos += 10;

  const circuitData = data.circuits.map((circuit, idx) => [
    `Circuit ${idx + 1}`,
    circuit.name,
    `${circuit.totalLoad}W`,
    circuit.recommendedCableSize ? `${circuit.recommendedCableSize}mm²` : 'TBC',
    circuit.protectiveDevice || 'TBC',
    circuit.voltageDrop ? `${circuit.voltageDrop.toFixed(2)}V (${((circuit.voltageDrop / circuit.voltage) * 100).toFixed(2)}%)` : 'TBC'
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["Circuit", "Description", "Load", "Cable Size", "Protection", "Voltage Drop"]],
    body: circuitData,
    theme: "grid",
    headStyles: { fillColor: [30, 64, 175], fontSize: 9 },
    styles: { fontSize: 8 },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Compliance Statement
  doc.setFillColor(34, 197, 94);
  doc.rect(15, yPos, pageWidth - 30, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Compliance Statement", pageWidth / 2, yPos + 10, { align: "center" });
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const complianceText = "This design complies with BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations), ensuring safe electrical installation in accordance with current UK standards.";
  const splitCompliance = doc.splitTextToSize(complianceText, pageWidth - 50);
  doc.text(splitCompliance, pageWidth / 2, yPos + 20, { align: "center" });

  yPos += 50;

  // Designer Notes
  if (data.designerNotes && yPos < doc.internal.pageSize.height - 40) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Designer Notes", 15, yPos);
    yPos += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const notesLines = doc.splitTextToSize(data.designerNotes, pageWidth - 30);
    doc.text(notesLines, 15, yPos);
  }

  // Footer
  const footerY = doc.internal.pageSize.height - 15;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Design Specification - Confidential", pageWidth / 2, footerY, { align: "center" });

  return doc;
}
