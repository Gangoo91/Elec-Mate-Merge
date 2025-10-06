import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface TestScheduleData {
  projectName: string;
  location: string;
  date: string;
  circuits: Array<{
    name: string;
    voltage: number;
    expectedR1R2?: number;
    expectedZs?: number;
    protectiveDevice?: string;
  }>;
}

export function generateTestSchedulePDF(data: TestScheduleData): jsPDF {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Header
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("TEST SCHEDULE TEMPLATE", pageWidth / 2, 12, { align: "center" });
  
  doc.setFontSize(9);
  doc.text("BS 7671:2018+A3:2024 Chapter 61 - Initial Verification", pageWidth / 2, 20, { align: "center" });
  doc.text(`Project: ${data.projectName} | ${data.location}`, pageWidth / 2, 27, { align: "center" });

  yPos = 45;

  // Instructions
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Complete all tests in accordance with BS 7671 Section 61. Record actual readings and tick Pass/Fail.", 15, yPos);
  yPos += 12;

  // Test Results Table
  const testHeaders = [
    ["Circuit", "Continuity\nR1+R2 (Ω)", "Expected\nR1+R2 (Ω)", "Insulation\nResistance (MΩ)", "Earth Fault\nLoop Zs (Ω)", "Expected\nZs (Ω)", "RCD\nTrip Time (ms)", "Polarity", "Pass/Fail"]
  ];

  const testRows = data.circuits.map(circuit => [
    circuit.name,
    "", // R1+R2 actual
    circuit.expectedR1R2 ? circuit.expectedR1R2.toFixed(3) : "TBC",
    "", // Insulation resistance
    "", // Zs actual
    circuit.expectedZs ? circuit.expectedZs.toFixed(3) : "TBC",
    "", // RCD trip time
    "", // Polarity
    "" // Pass/Fail
  ]);

  autoTable(doc, {
    startY: yPos,
    head: testHeaders,
    body: testRows,
    theme: "grid",
    headStyles: { 
      fillColor: [30, 64, 175],
      fontSize: 8,
      halign: 'center',
      valign: 'middle'
    },
    styles: { 
      fontSize: 8,
      cellPadding: 3,
      halign: 'center',
      minCellHeight: 10
    },
    margin: { left: 15, right: 15 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 'auto' },
      6: { cellWidth: 'auto' },
      7: { cellWidth: 'auto' },
      8: { cellWidth: 'auto' }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Test Criteria
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Test Acceptance Criteria (BS 7671:2018+A3:2024)", 15, yPos);
  yPos += 8;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  
  const criteria = [
    "• Continuity (R1+R2): Must be within 5% of calculated value",
    "• Insulation Resistance: Minimum 1.0 MΩ (preferably >2 MΩ)",
    "• Earth Fault Loop Impedance (Zs): Must not exceed values in BS 7671 Appendix 3",
    "• RCD Trip Time: 30mA RCD must trip within 40ms at 5x rated current (150mA)",
    "• Polarity: Live conductors connected to fuses/MCBs, correct polarity at all outlets"
  ];

  criteria.forEach(item => {
    doc.text(item, 15, yPos);
    yPos += 5;
  });

  yPos += 10;

  // Test Equipment Section
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Test Equipment Used", 15, yPos);
  yPos += 8;

  const equipmentTable = [
    ["Multifunction Tester:", "Model: ________________", "Serial No: ________________", "Calibration Date: ________________"],
    ["Earth Loop Tester:", "Model: ________________", "Serial No: ________________", "Calibration Date: ________________"],
    ["RCD Tester:", "Model: ________________", "Serial No: ________________", "Calibration Date: ________________"]
  ];

  autoTable(doc, {
    startY: yPos,
    body: equipmentTable,
    theme: "grid",
    styles: { fontSize: 8, cellPadding: 3 },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Sign-off
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Testing Completed By", 15, yPos);
  yPos += 10;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Name: _________________________________", 15, yPos);
  doc.text("Qualification: _________________________________", 160, yPos);
  yPos += 10;

  doc.text("Signature: _________________________________", 15, yPos);
  doc.text("Date: _________________________________", 160, yPos);

  // Footer
  const footerY = doc.internal.pageSize.height - 15;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Test Schedule - BS 7671 Chapter 61 Compliance", pageWidth / 2, footerY, { align: "center" });

  return doc;
}
