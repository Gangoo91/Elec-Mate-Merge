import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface EICData {
  projectName: string;
  location: string;
  clientName: string;
}

export function generateEICTemplatePDF(data: EICData): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Header
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("ELECTRICAL INSTALLATION CERTIFICATE", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(9);
  doc.text("BS 7671:2018+A3:2024 (18th Edition)", pageWidth / 2, 25, { align: "center" });
  doc.text("This certificate is to be completed by a qualified electrician", pageWidth / 2, 32, { align: "center" });

  yPos = 50;

  // Client Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT DETAILS", 15, yPos);
  yPos += 8;

  const clientDetails = [
    ["Client Name:", data.clientName || "_______________________________________"],
    ["Installation Address:", data.location || "_______________________________________"],
    ["", "_______________________________________"],
    ["Postcode:", "_______________________________________"]
  ];

  autoTable(doc, {
    startY: yPos,
    body: clientDetails,
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 130 }
    },
    margin: { left: 15 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Design Section
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("DESIGN", 15, yPos);
  yPos += 8;

  const designFields = [
    ["I/We being the person(s) responsible for the design of the electrical installation certify that the design work has been carried out in accordance with BS 7671:2018+A3:2024."],
    [""],
    ["Designer Name:", "_______________________________________", "Qualification:", "_______________________"],
    ["Signature:", "_______________________________________", "Date:", "_______________________"]
  ];

  autoTable(doc, {
    startY: yPos,
    body: designFields,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: 15, right: 15 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Construction Section
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CONSTRUCTION", 15, yPos);
  yPos += 8;

  const constructionFields = [
    ["I/We being the person(s) responsible for the construction of the electrical installation certify that the installation has been carried out in accordance with BS 7671:2018+A3:2024."],
    [""],
    ["Installer Name:", "_______________________________________", "Qualification:", "_______________________"],
    ["Signature:", "_______________________________________", "Date:", "_______________________"]
  ];

  autoTable(doc, {
    startY: yPos,
    body: constructionFields,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: 15, right: 15 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Inspection & Testing Section
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("INSPECTION & TESTING", 15, yPos);
  yPos += 8;

  const inspectionFields = [
    ["I/We being the person(s) responsible for the inspection & testing of the electrical installation certify that the installation has been inspected and tested in accordance with BS 7671:2018+A3:2024."],
    [""],
    ["Inspector Name:", "_______________________________________", "Qualification:", "_______________________"],
    ["Signature:", "_______________________________________", "Date:", "_______________________"]
  ];

  autoTable(doc, {
    startY: yPos,
    body: inspectionFields,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: 15, right: 15 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Schedule of Test Results Reference
  doc.setFillColor(248, 250, 252);
  doc.rect(15, yPos, pageWidth - 30, 25, 'F');
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 64, 175);
  doc.text("SCHEDULE OF TEST RESULTS", pageWidth / 2, yPos + 8, { align: "center" });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("Please attach the completed Schedule of Test Results to this certificate.", pageWidth / 2, yPos + 15, { align: "center" });
  doc.text("See Test Schedule Template document for recording actual test values.", pageWidth / 2, yPos + 20, { align: "center" });

  // Footer
  const footerY = doc.internal.pageSize.height - 20;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Electrical Installation Certificate - Template", pageWidth / 2, footerY, { align: "center" });
  doc.text("This is a template document. All sections must be completed by qualified personnel.", pageWidth / 2, footerY + 5, { align: "center" });

  return doc;
}
