import jsPDF from "jspdf";
import "jspdf-autotable";
import { RAMSData, RAMSReportOptions } from "@/types/rams";
import { format } from "date-fns";

export function generateRAMSPDF(data: RAMSData, options: RAMSReportOptions = {}) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPosition = 20;

  // Add header with company branding
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 193, 7); // elec-yellow
  doc.text("RISK ASSESSMENT & METHOD STATEMENT", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("BS 7671 18th Edition Compliant", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 20;

  // Project Information Table
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Project Information", 20, yPosition);
  yPosition += 5;

  const projectInfo = [
    ["Project Name:", data.projectName],
    ["Location:", data.location],
    ["Assessment Date:", format(new Date(data.date), "dd/MM/yyyy")],
    ["Assessor:", data.assessor],
    ["Generated:", format(new Date(), "dd/MM/yyyy HH:mm")]
  ];

  (doc as any).autoTable({
    startY: yPosition,
    body: projectInfo,
    theme: "plain",
    styles: {
      fontSize: 11,
      cellPadding: 3
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 40 },
      1: { cellWidth: pageWidth - 80 }
    },
    margin: { left: 20, right: 20 }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Work Activities Section
  if (data.activities.length > 0 && data.activities.some(activity => activity.trim())) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Work Activities", 20, yPosition);
    yPosition += 10;

    const activitiesData = data.activities
      .filter(activity => activity.trim())
      .map((activity, index) => [`${index + 1}.`, activity]);

    (doc as any).autoTable({
      startY: yPosition,
      body: activitiesData,
      theme: "striped",
      headStyles: {
        fillColor: [255, 193, 7],
        textColor: [33, 37, 41],
        fontStyle: "bold"
      },
      styles: {
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { cellWidth: pageWidth - 55 }
      },
      margin: { left: 20, right: 20 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }

  // Risk Assessment Summary
  if (data.risks.length > 0) {
    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Risk Assessment Summary", 20, yPosition);
    yPosition += 5;

    // Risk summary statistics
    const riskCounts = {
      low: data.risks.filter(r => r.riskRating <= 4).length,
      medium: data.risks.filter(r => r.riskRating > 4 && r.riskRating <= 9).length,
      high: data.risks.filter(r => r.riskRating > 9 && r.riskRating <= 16).length,
      veryHigh: data.risks.filter(r => r.riskRating > 16).length
    };

    const summaryData = [
      ["Total Risks Identified:", data.risks.length.toString()],
      ["Low Risk (1-4):", riskCounts.low.toString()],
      ["Medium Risk (5-9):", riskCounts.medium.toString()],
      ["High Risk (10-16):", riskCounts.high.toString()],
      ["Very High Risk (17-25):", riskCounts.veryHigh.toString()]
    ];

    (doc as any).autoTable({
      startY: yPosition,
      body: summaryData,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 3
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50 },
        1: { cellWidth: 30, halign: "center" }
      },
      margin: { left: 20, right: 20 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;

    // Detailed Risk Assessment Table
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Detailed Risk Assessment", 20, yPosition);
    yPosition += 10;

    const getRiskLevel = (rating: number) => {
      if (rating <= 4) return "Low";
      if (rating <= 9) return "Medium";
      if (rating <= 16) return "High";
      return "Very High";
    };

    const riskTableData = data.risks.map((risk, index) => [
      (index + 1).toString(),
      risk.hazard,
      risk.risk,
      risk.likelihood.toString(),
      risk.severity.toString(),
      `${risk.riskRating} (${getRiskLevel(risk.riskRating)})`,
      risk.controls || "No controls specified",
      `${risk.residualRisk} (${getRiskLevel(risk.residualRisk)})`
    ]);

    (doc as any).autoTable({
      startY: yPosition,
      head: [["#", "Hazard", "Risk/Consequence", "L", "S", "Initial Risk", "Control Measures", "Residual Risk"]],
      body: riskTableData,
      theme: "striped",
      headStyles: {
        fillColor: [255, 193, 7],
        textColor: [33, 37, 41],
        fontStyle: "bold",
        fontSize: 9
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 8, halign: "center" },
        4: { cellWidth: 8, halign: "center" },
        5: { cellWidth: 20, halign: "center" },
        6: { cellWidth: 35 },
        7: { cellWidth: 20, halign: "center" }
      },
      margin: { left: 20, right: 20 },
      didDrawPage: function (tableData) {
        // Add footer on each page
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `RAMS Document - ${data.projectName} - Generated ${format(new Date(), "dd/MM/yyyy")}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }
    });
  }

  // Sign-off section
  doc.addPage();
  yPosition = 20;
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Approval & Sign-off", 20, yPosition);
  yPosition += 20;

  const signOffData = [
    ["Prepared by:", data.assessor, "Signature:", "", "Date:", ""],
    ["Reviewed by:", "", "Signature:", "", "Date:", ""],
    ["Approved by:", "", "Signature:", "", "Date:", ""]
  ];

  (doc as any).autoTable({
    startY: yPosition,
    body: signOffData,
    theme: "plain",
    styles: {
      fontSize: 11,
      cellPadding: 8,
      minCellHeight: 20
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 25 },
      1: { cellWidth: 35 },
      2: { fontStyle: "bold", cellWidth: 20 },
      3: { cellWidth: 35 },
      4: { fontStyle: "bold", cellWidth: 15 },
      5: { cellWidth: 20 }
    },
    margin: { left: 20, right: 20 }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 20;

  // Important notes
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Important Notes:", 20, yPosition);
  yPosition += 10;

  const notes = [
    "• This RAMS document must be reviewed and understood by all personnel before work commences",
    "• All control measures must be implemented and maintained throughout the work activity",
    "• Any changes to work activities or conditions must trigger a review of this assessment",
    "• Report any incidents, near misses, or safety concerns immediately",
    "• This document complies with BS 7671 18th Edition requirements"
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  notes.forEach(note => {
    doc.text(note, 20, yPosition, { maxWidth: pageWidth - 40 });
    yPosition += 8;
  });

  // Save the PDF
  const fileName = `RAMS_${data.projectName.replace(/[^a-z0-9]/gi, '_')}_${format(new Date(), "yyyy-MM-dd")}.pdf`;
  doc.save(fileName);
}