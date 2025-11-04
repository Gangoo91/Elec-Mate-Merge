import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { InstallationDesign, CircuitDesign } from "@/types/installation-design";

// Calculate expected R1+R2 value
function calculateR1R2(liveSize: number, cpcSize: number, length: number): string {
  const resistance = {
    1.5: 12.10, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83,
    16: 1.15, 25: 0.727, 35: 0.524, 50: 0.387, 70: 0.268,
    95: 0.193, 120: 0.153, 150: 0.124, 185: 0.0991, 240: 0.0754
  };
  
  const r1 = (resistance[liveSize as keyof typeof resistance] || 0) * (length / 1000);
  const r2 = (resistance[cpcSize as keyof typeof resistance] || 0) * (length / 1000);
  const r1r2At20C = r1 + r2;
  const r1r2At70C = r1r2At20C * 1.2;
  
  return `${r1r2At70C.toFixed(3)}Ω`;
}

export function generateDesignSpecificationPDF(design: InstallationDesign): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Helper function to add header
  const addHeader = (pageNum: number, totalPages: number) => {
    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("CIRCUIT DESIGN SPECIFICATION", pageWidth / 2, 12, { align: "center" });
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("BS 7671:2018+A3:2024 Compliant", pageWidth / 2, 20, { align: "center" });
    doc.text(design.projectName, pageWidth / 2, 27, { align: "center" });
    
    doc.setFontSize(7);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 15, 32, { align: "right" });
  };

  // Helper function to add footer
  const addFooter = () => {
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, 15, pageHeight - 10);
    doc.text("Confidential - For Client Use Only", pageWidth / 2, pageHeight - 10, { align: "center" });
  };

  // Calculate total pages (1 cover + 1 overview + 2 per circuit + 1 compliance)
  const totalPages = 3 + (design.circuits.length * 2);
  let currentPage = 1;

  // PAGE 1: Cover Page
  addHeader(currentPage, totalPages);
  
  let yPos = 55;
  
  doc.setFillColor(240, 240, 245);
  doc.rect(15, yPos, pageWidth - 30, 60, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PROJECT INFORMATION", pageWidth / 2, yPos + 12, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Project: ${design.projectName}`, 25, yPos + 25);
  doc.text(`Location: ${design.location}`, 25, yPos + 35);
  doc.text(`Client: ${design.clientName || 'N/A'}`, 25, yPos + 45);
  doc.text(`Designer: ${design.electricianName || 'N/A'}`, 25, yPos + 55);
  
  yPos += 75;
  
  // Installation Summary
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("INSTALLATION SUMMARY", 15, yPos);
  yPos += 10;
  
  const summaryData = [
    ["Installation Type", design.installationType.toUpperCase()],
    ["Total Connected Load", `${design.totalLoad.toFixed(0)}W`],
    ["Diversity Applied", design.diversityApplied ? "Yes" : "No"],
    ["Diversified Load", design.diversityApplied ? `${(design.totalLoad * (design.diversityFactor || 0.8)).toFixed(0)}W` : "N/A"],
    ["Supply Voltage", `${design.consumerUnit.incomingSupply.voltage}V`],
    ["Supply Type", design.consumerUnit.incomingSupply.phases === 'single' ? "Single Phase" : "Three Phase"],
    ["Earthing System", design.consumerUnit.incomingSupply.earthingSystem],
    ["Ze (External)", `${design.consumerUnit.incomingSupply.Ze}Ω`],
    ["PSCC", `${design.consumerUnit.incomingSupply.incomingPFC}kA`],
    ["Main Switch Rating", `${design.consumerUnit.mainSwitchRating}A`],
    ["Number of Circuits", design.circuits.length.toString()]
  ];
  
  autoTable(doc, {
    startY: yPos,
    body: summaryData,
    theme: "striped",
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 70 }, 1: { cellWidth: 'auto' } },
    margin: { left: 15, right: 15 },
  });
  
  addFooter();

  // PAGE 2: Circuit Overview
  doc.addPage();
  currentPage++;
  addHeader(currentPage, totalPages);
  
  yPos = 45;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("CIRCUIT OVERVIEW", 15, yPos);
  yPos += 8;
  
  const circuitOverview = design.circuits.map((circuit, idx) => [
    (idx + 1).toString(),
    circuit.name,
    `${circuit.loadPower ?? 0}W`,
    `${circuit.cableSize ?? 'N/A'}mm²`,
    `${circuit.protectionDevice?.type ?? 'MCB'} ${circuit.protectionDevice?.rating ?? 'N/A'}A ${circuit.protectionDevice?.curve ?? 'B'}`,
    `${circuit.calculations?.voltageDrop?.volts?.toFixed(2) ?? '0.00'}V (${circuit.calculations?.voltageDrop?.percent?.toFixed(2) ?? '0.00'}%)`
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [["#", "Circuit Name", "Load", "Cable", "Protection", "Voltage Drop"]],
    body: circuitOverview,
    theme: "grid",
    headStyles: { fillColor: [30, 64, 175], fontSize: 8 },
    styles: { fontSize: 7 },
    margin: { left: 15, right: 15 },
  });
  
  addFooter();

  // CIRCUIT DETAIL PAGES (2 pages per circuit)
  design.circuits.forEach((circuit, idx) => {
    // Page 1 of circuit: Specifications
    doc.addPage();
    currentPage++;
    addHeader(currentPage, totalPages);
    
    yPos = 45;
    
    // Circuit Header
    doc.setFillColor(30, 64, 175);
    doc.rect(15, yPos, pageWidth - 30, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`CIRCUIT ${idx + 1}: ${circuit.name.toUpperCase()}`, 20, yPos + 8);
    
    yPos += 20;
    
    // Circuit Specifications
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Circuit Specifications", 15, yPos);
    yPos += 8;
    
    const circuitSpecs = [
      ["Load Type", circuit.loadType],
      ["Load Power", `${circuit.loadPower}W`],
      ["Design Current (Ib)", `${circuit.calculations.Ib.toFixed(2)}A`],
      ["Voltage", `${circuit.voltage}V ${circuit.phases === 'single' ? 'Single Phase' : 'Three Phase'}`],
      ["Cable Length", `${circuit.cableLength}m`],
      ["Installation Method", circuit.installationMethod]
    ];
    
    autoTable(doc, {
      startY: yPos,
      body: circuitSpecs,
      theme: "plain",
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 }, 1: { cellWidth: 'auto' } },
      margin: { left: 15, right: 15 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Cable & Protection
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Cable & Protection Details", 15, yPos);
    yPos += 8;
    
    const cableProtection = [
      ["Cable Size (Live)", `${circuit.cableSize ?? 'N/A'}mm²`],
      ["CPC Size", `${circuit.cpcSize ?? 'N/A'}mm²`],
      ["Cable Type", circuit.cableType || `${circuit.cableSize ?? 'N/A'}/${circuit.cpcSize ?? 'N/A'}mm² T&E`],
      ["Protection Device", `${circuit.protectionDevice?.type ?? 'MCB'}`],
      ["Rating (In)", `${circuit.protectionDevice?.rating ?? 'N/A'}A`],
      ["Type Curve", `Type ${circuit.protectionDevice?.curve ?? 'B'}`],
      ["Breaking Capacity", `${circuit.protectionDevice?.kaRating ?? 6}kA`],
      ["RCD Protected", circuit.rcdProtected ? "Yes (30mA)" : "No"],
      ["AFDD Required", circuit.afddRequired ? "Yes" : "No"]
    ];
    
    autoTable(doc, {
      startY: yPos,
      body: cableProtection,
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 }, 1: { cellWidth: 'auto' } },
      margin: { left: 15, right: 15 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Design Calculations
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Design Calculations (BS 7671 Compliance)", 15, yPos);
    yPos += 8;
    
    const calculations = [
      ["Ib (Design Current)", `${circuit.calculations.Ib.toFixed(2)}A`],
      ["In (Nominal Rating)", `${circuit.calculations.In}A`],
      ["Iz (Tabulated Capacity)", `${circuit.calculations.Iz.toFixed(2)}A`],
      ["Derated Capacity", `${circuit.calculations.deratedCapacity.toFixed(2)}A`],
      ["Safety Margin", `${circuit.calculations.safetyMargin.toFixed(1)}%`],
      ["Voltage Drop", `${circuit.calculations.voltageDrop.volts.toFixed(2)}V (${circuit.calculations.voltageDrop.percent.toFixed(2)}%)`],
      ["Voltage Drop Limit", `${circuit.calculations.voltageDrop.limit}%`],
      ["Compliant", circuit.calculations.voltageDrop.compliant ? "✓ YES" : "✗ NO"],
      ["Zs (Calculated)", `${circuit.calculations.zs.toFixed(3)}Ω`],
      ["Max Zs Permitted", `${circuit.calculations.maxZs.toFixed(3)}Ω`],
      ["Expected R1+R2", calculateR1R2(circuit.cableSize, circuit.cpcSize, circuit.cableLength)]
    ];
    
    autoTable(doc, {
      startY: yPos,
      body: calculations,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 65 }, 1: { cellWidth: 'auto' } },
      margin: { left: 15, right: 15 },
    });
    
    addFooter();
    
    // Page 2 of circuit: Justifications & Notes
    doc.addPage();
    currentPage++;
    addHeader(currentPage, totalPages);
    
    yPos = 45;
    
    // Circuit Header
    doc.setFillColor(30, 64, 175);
    doc.rect(15, yPos, pageWidth - 30, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`CIRCUIT ${idx + 1}: ${circuit.name.toUpperCase()} (CONTINUED)`, 20, yPos + 8);
    
    yPos += 20;
    
    // Design Justifications
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Design Justifications", 15, yPos);
    yPos += 8;
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Cable Size Selection:", 15, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    const cableSizeLines = doc.splitTextToSize(circuit.justifications.cableSize, pageWidth - 30);
    doc.text(cableSizeLines, 15, yPos);
    yPos += (cableSizeLines.length * 5) + 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("Protection Selection:", 15, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    const protectionLines = doc.splitTextToSize(circuit.justifications.protection, pageWidth - 30);
    doc.text(protectionLines, 15, yPos);
    yPos += (protectionLines.length * 5) + 5;
    
    if (circuit.justifications.rcd) {
      doc.setFont("helvetica", "bold");
      doc.text("RCD Protection:", 15, yPos);
      yPos += 5;
      doc.setFont("helvetica", "normal");
      const rcdLines = doc.splitTextToSize(circuit.justifications.rcd, pageWidth - 30);
      doc.text(rcdLines, 15, yPos);
      yPos += (rcdLines.length * 5) + 5;
    }
    
    // Warnings
    if (circuit.warnings && circuit.warnings.length > 0) {
      yPos += 5;
      doc.setFillColor(255, 243, 224);
      doc.rect(15, yPos - 3, pageWidth - 30, 10 + (circuit.warnings.length * 6), 'F');
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(150, 100, 0);
      doc.text("⚠ IMPORTANT NOTES:", 20, yPos + 3);
      yPos += 8;
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      circuit.warnings.forEach(warning => {
        doc.text(`• ${warning}`, 20, yPos);
        yPos += 6;
      });
      
      doc.setTextColor(0, 0, 0);
      yPos += 5;
    }
    
    addFooter();
  });

  // FINAL PAGE: Compliance Statement
  doc.addPage();
  currentPage++;
  addHeader(currentPage, totalPages);
  
  yPos = 55;
  
  doc.setFillColor(34, 197, 94);
  doc.rect(15, yPos, pageWidth - 30, 50, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("COMPLIANCE STATEMENT", pageWidth / 2, yPos + 12, { align: "center" });
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const complianceText = "This electrical installation design has been prepared in accordance with BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations). All circuit designs comply with current UK electrical safety standards and regulations. Installation must be carried out by a competent person and tested in accordance with BS 7671 requirements.";
  const splitCompliance = doc.splitTextToSize(complianceText, pageWidth - 50);
  doc.text(splitCompliance, pageWidth / 2, yPos + 22, { align: "center" });
  
  yPos += 65;
  
  // Designer Authorization
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Designer Authorization", 15, yPos);
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Designed By: ${design.electricianName || '___________________________'}`, 15, yPos);
  yPos += 10;
  doc.text(`Signature: ___________________________`, 15, yPos);
  yPos += 10;
  doc.text(`Date: ${format(new Date(), "dd/MM/yyyy")}`, 15, yPos);
  
  yPos += 20;
  
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Document Reference: DS-${design.projectName.replace(/\s+/g, '_')}-${format(new Date(), 'ddMMyyyy-HHmm')}`, 15, yPos);
  
  addFooter();

  return doc;
}
