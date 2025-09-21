import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RAMSData, RAMSReportOptions } from "@/types/rams";
import { 
  safeText, 
  safeNumber, 
  safeDate, 
  safeDatetime,
  getRiskLevel, 
  getRiskColor,
  calculateRiskRating,
  safeFileName,
  safeArrayFilter,
  truncateText
} from "./rams-pdf-helpers";
import { hazardCategories, riskConsequences } from "@/data/hazards";

interface SignOff {
  preparedBy?: { name: string; date: string; signatureDataUrl?: string };
  reviewedBy?: { name: string; date: string; signatureDataUrl?: string };
  approvedBy?: { name: string; date: string; signatureDataUrl?: string };
}

interface PDFOptions extends RAMSReportOptions {
  signOff?: SignOff;
}

interface TOCItem {
  title: string;
  page: number;
}

class ProfessionalRAMSPDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private yPosition: number;
  private currentPage: number = 1;
  private toc: TOCItem[] = [];
  private readonly MARGIN = 20;
  private readonly HEADER_HEIGHT = 40;
  private readonly FOOTER_HEIGHT = 20;
  private readonly PRIMARY_COLOR = [41, 128, 185] as [number, number, number];
  private readonly ACCENT_COLOR = [52, 152, 219] as [number, number, number];

  constructor() {
    this.doc = new jsPDF('portrait', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
    this.yPosition = this.MARGIN;
  }

  private updatePageMetrics(): void {
    const pageInfo = this.doc.internal.pageSize;
    this.pageWidth = pageInfo.getWidth();
    this.pageHeight = pageInfo.getHeight();
  }

  private addTOCEntry(title: string): void {
    this.toc.push({ title, page: this.currentPage });
  }

  private addPageNumber(): void {
    this.doc.setFontSize(9);
    this.doc.setTextColor(100);
    this.doc.text(`Page ${this.currentPage}`, this.pageWidth - this.MARGIN, this.pageHeight - 10, { align: "right" });
  }

  private checkPageBreak(requiredSpace: number = 30): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.FOOTER_HEIGHT - this.MARGIN) {
      this.addPageNumber();
      this.doc.addPage();
      this.currentPage++;
      this.yPosition = this.MARGIN + 20; // Leave space for page header
      return true;
    }
    return false;
  }

  // Title Page
  private addTitlePage(data: RAMSData, options: PDFOptions): void {
    // Professional header banner
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, 60, 'F');
    
    // Company logo space (if provided)
    if (options.logoUrl) {
      // Logo would be placed here - placeholder for now
      this.doc.setFillColor(255, 255, 255);
      this.doc.rect(this.MARGIN, 15, 40, 30, 'F');
      this.doc.setTextColor(100);
      this.doc.setFontSize(8);
      this.doc.text("LOGO", this.MARGIN + 20, 32, { align: "center" });
    }

    // Main title
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("HEALTH & SAFETY", this.pageWidth / 2, 25, { align: "center" });
    this.doc.text("RISK ASSESSMENT", this.pageWidth / 2, 38, { align: "center" });
    
    // Subtitle
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("In accordance with BS 7671:2018+A2:2022 (18th Edition)", this.pageWidth / 2, 50, { align: "center" });

    this.yPosition = 80;

    // Company name
    if (options.companyName) {
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(16);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(safeText(options.companyName), this.pageWidth / 2, this.yPosition, { align: "center" });
      this.yPosition += 20;
    }

    // Project information box
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.setLineWidth(2);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 80);
    
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 80, 'F');
    
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 80);

    // Project details
    const projectDetails = [
      { label: "Project Name:", value: safeText(data.projectName) || "Not specified" },
      { label: "Location:", value: safeText(data.location) || "Not specified" },
      { label: "Assessment Date:", value: safeDate(data.date) },
      { label: "Prepared By:", value: safeText(data.assessor) || "Not specified" },
      { label: "Document Reference:", value: `RAMS-${safeFileName(data.projectName)}-${format(new Date(), 'yyyyMMdd')}` }
    ];

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(11);
    
    projectDetails.forEach((detail, index) => {
      const y = this.yPosition + 15 + (index * 12);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(detail.label, this.MARGIN + 10, y);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(detail.value, this.MARGIN + 60, y);
    });

    this.yPosition += 100;

    // Compliance statement
    this.doc.setFillColor(240, 248, 255);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40, 'F');
    this.doc.setDrawColor(...this.ACCENT_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Regulatory Compliance", this.pageWidth / 2, this.yPosition + 12, { align: "center" });
    
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const complianceText = [
      "This assessment complies with:",
      "• Health and Safety at Work etc. Act 1974",
      "• Construction (Design and Management) Regulations 2015",
      "• BS 7671:2018+A2:2022 Requirements for Electrical Installations"
    ];
    
    complianceText.forEach((line, index) => {
      this.doc.text(line, this.pageWidth / 2, this.yPosition + 20 + (index * 4), { align: "center" });
    });

    // Document control footer
    this.yPosition = this.pageHeight - 40;
    this.doc.setFontSize(8);
    this.doc.setTextColor(100);
    this.doc.text(`Generated: ${safeDatetime(new Date())}`, this.MARGIN, this.yPosition);
    this.doc.text("CONFIDENTIAL", this.pageWidth - this.MARGIN, this.yPosition, { align: "right" });

    this.addPageNumber();
  }

  // Table of Contents
  private addTableOfContents(): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 20;

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("TABLE OF CONTENTS", this.pageWidth / 2, this.yPosition, { align: "center" });
    this.yPosition += 20;

    // Add a line under the title
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.setLineWidth(1);
    this.doc.line(this.MARGIN, this.yPosition, this.pageWidth - this.MARGIN, this.yPosition);
    this.yPosition += 15;

    const tocData = this.toc.map(item => [item.title, item.page.toString()]);

    autoTable(this.doc, {
      startY: this.yPosition,
      body: tocData,
      theme: "plain",
      styles: {
        fontSize: 11,
        cellPadding: 6,
        lineColor: [220, 220, 220],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { fontStyle: "normal", cellWidth: this.pageWidth - 60 },
        1: { halign: "right", fontStyle: "bold", cellWidth: 20 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN },
      didDrawCell: (data) => {
        if (data.column.index === 0) {
          // Add dots between title and page number
          const startX = data.cell.x + data.cell.width - 10;
          const endX = data.cell.x + data.cell.width;
          const y = data.cell.y + data.cell.height / 2;
          
          this.doc.setTextColor(150);
          this.doc.setFontSize(8);
          for (let x = startX; x < endX; x += 3) {
            this.doc.text(".", x, y);
          }
        }
      }
    });

    this.addPageNumber();
  }

  // Introduction Section
  private addIntroduction(data: RAMSData): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("1. Introduction");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("1. INTRODUCTION", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    // Purpose section
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("1.1 Purpose", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const purposeText = [
      "This Health & Safety Risk Assessment has been prepared to identify and evaluate potential hazards and risks",
      "associated with electrical installation and maintenance work. The assessment establishes appropriate control",
      "measures to ensure the safety of all personnel, the public, and to protect property.",
      "",
      "This document ensures compliance with current UK legislation and industry best practices, including:",
      "• Health and Safety at Work etc. Act 1974",
      "• Management of Health and Safety at Work Regulations 1999",
      "• Construction (Design and Management) Regulations 2015",
      "• BS 7671:2018+A2:2022 Requirements for Electrical Installations (18th Edition)"
    ];

    purposeText.forEach(line => {
      if (line === "") {
        this.yPosition += 5;
      } else {
        const wrappedLines = this.doc.splitTextToSize(line, this.pageWidth - (2 * this.MARGIN));
        wrappedLines.forEach((wrappedLine: string) => {
          this.doc.text(wrappedLine, this.MARGIN, this.yPosition);
          this.yPosition += 5;
        });
      }
    });

    this.yPosition += 10;

    // Scope section
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("1.2 Scope of Work", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const scopeText = [
      `Project: ${safeText(data.projectName)}`,
      `Location: ${safeText(data.location)}`,
      `Assessment Date: ${safeDate(data.date)}`,
      "",
      "This assessment covers all electrical work activities planned for this project, including associated",
      "hazards and risks. The assessment will be reviewed and updated as work progresses and conditions change."
    ];

    scopeText.forEach(line => {
      if (line === "") {
        this.yPosition += 5;
      } else {
        const wrappedLines = this.doc.splitTextToSize(line, this.pageWidth - (2 * this.MARGIN));
        wrappedLines.forEach((wrappedLine: string) => {
          this.doc.text(wrappedLine, this.MARGIN, this.yPosition);
          this.yPosition += 5;
        });
      }
    });

    this.yPosition += 10;

    // Methodology section
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("1.3 Risk Assessment Methodology", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const methodText = [
      "This assessment uses a systematic 5×5 risk matrix approach in accordance with HSE guidance.",
      "Risk ratings are calculated by multiplying Likelihood × Severity, both scored 1-5:",
      "",
      "• Low Risk (1-4): Monitor and review periodically",
      "• Medium Risk (5-9): Implement controls and monitor regularly", 
      "• High Risk (10-16): Immediate action required",
      "• Very High Risk (17-25): Stop work until adequate controls implemented",
      "",
      "All risks follow the ALARP (As Low As Reasonably Practicable) principle."
    ];

    methodText.forEach(line => {
      if (line === "") {
        this.yPosition += 5;
      } else {
        const wrappedLines = this.doc.splitTextToSize(line, this.pageWidth - (2 * this.MARGIN));
        wrappedLines.forEach((wrappedLine: string) => {
          this.doc.text(wrappedLine, this.MARGIN, this.yPosition);
          this.yPosition += 5;
        });
      }
    });

    this.addPageNumber();
  }

  // Risk Assessment Matrix (Full Page)
  private addRiskMatrix(): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("2. Risk Assessment Matrix");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("2. RISK ASSESSMENT MATRIX", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    // Matrix explanation
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Risk Rating = Likelihood × Severity (Both scored 1-5)", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    // Draw the enhanced 5x5 matrix
    const cellSize = 30;
    const matrixStartX = (this.pageWidth - (cellSize * 5)) / 2;
    const matrixStartY = this.yPosition;

    // Matrix title
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("SEVERITY →", matrixStartX + (cellSize * 2.5), matrixStartY - 20, { align: "center" });
    
    // Likelihood label (vertical)
    this.doc.text("LIKELIHOOD ↓", matrixStartX - 30, matrixStartY + (cellSize * 2.5), { align: "center", angle: 90 });

    // Severity scale labels
    const severityLabels = ["Insignificant", "Minor", "Moderate", "Major", "Catastrophic"];
    severityLabels.forEach((label, index) => {
      this.doc.setFontSize(8);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(label, matrixStartX + (index * cellSize) + cellSize/2, matrixStartY - 8, { align: "center" });
      this.doc.text((index + 1).toString(), matrixStartX + (index * cellSize) + cellSize/2, matrixStartY - 2, { align: "center" });
    });

    // Likelihood scale labels
    const likelihoodLabels = ["Very Unlikely", "Unlikely", "Possible", "Likely", "Very Likely"];
    likelihoodLabels.forEach((label, index) => {
      this.doc.setFontSize(8);
      this.doc.setFont("helvetica", "bold");
      const y = matrixStartY + ((4 - index) * cellSize) + cellSize/2;
      this.doc.text((index + 1).toString(), matrixStartX - 15, y + 2, { align: "center" });
      this.doc.text(label, matrixStartX - 25, y + 2, { align: "right" });
    });

    // Draw matrix cells
    for (let likelihood = 1; likelihood <= 5; likelihood++) {
      for (let severity = 1; severity <= 5; severity++) {
        const x = matrixStartX + (severity - 1) * cellSize;
        const y = matrixStartY + (5 - likelihood) * cellSize;
        const riskRating = likelihood * severity;
        const [r, g, b] = getRiskColor(riskRating);
        
        // Fill cell with risk color
        this.doc.setFillColor(r, g, b);
        this.doc.rect(x, y, cellSize, cellSize, 'F');
        
        // Cell border
        this.doc.setDrawColor(0, 0, 0);
        this.doc.setLineWidth(1);
        this.doc.rect(x, y, cellSize, cellSize);
        
        // Risk rating number
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(14);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(riskRating.toString(), x + cellSize/2, y + cellSize/2 + 2, { align: "center" });
      }
    }

    // Enhanced legend
    const legendY = matrixStartY + (cellSize * 5) + 30;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK LEVEL INTERPRETATION", this.pageWidth / 2, legendY, { align: "center" });

    const legendData = [
      { range: "1-4", level: "LOW RISK", color: [34, 197, 94], action: "Monitor and review periodically. Standard precautions apply." },
      { range: "5-9", level: "MEDIUM RISK", color: [255, 193, 7], action: "Implement specific controls and monitor regularly. Risk assessment required." },
      { range: "10-16", level: "HIGH RISK", color: [255, 152, 0], action: "Immediate action required. Detailed control measures must be implemented." },
      { range: "17-25", level: "VERY HIGH RISK", color: [239, 68, 68], action: "STOP WORK. Do not proceed until adequate controls are in place." }
    ];

    autoTable(this.doc, {
      startY: legendY + 10,
      head: [["Risk Rating", "Risk Level", "Required Action"]],
      body: legendData.map(item => [
        item.range,
        item.level,
        item.action
      ]),
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
        halign: "center"
      },
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "middle"
      },
      columnStyles: {
        0: { halign: "center", fontStyle: "bold", cellWidth: 25 },
        1: { halign: "center", fontStyle: "bold", cellWidth: 35 },
        2: { cellWidth: this.pageWidth - 80 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN },
      didDrawCell: (data) => {
        if (data.column.index === 1 && data.section === 'body') {
          const item = legendData[data.row.index];
          this.doc.setFillColor(item.color[0], item.color[1], item.color[2]);
          this.doc.rect(data.cell.x + 2, data.cell.y + 2, 8, data.cell.height - 4, 'F');
        }
      }
    });

    this.addPageNumber();
  }

  // Project Information Section
  private addProjectInformation(data: RAMSData): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("3. Project Information");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("3. PROJECT INFORMATION", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    const projectInfo = [
      ["Project Name:", safeText(data.projectName) || "Not specified"],
      ["Location:", safeText(data.location) || "Not specified"],
      ["Assessment Date:", safeDate(data.date)],
      ["Prepared By:", safeText(data.assessor) || "Not specified"],
      ["Review Date:", safeDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000))], // 1 year from now
      ["Document Status:", "CONTROLLED COPY"],
      ["Distribution:", "Site Management, Safety Officer, Project Team"]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: projectInfo,
      theme: "striped",
      alternateRowStyles: { fillColor: [248, 250, 252] },
      styles: {
        fontSize: 11,
        cellPadding: 6,
        lineColor: [220, 220, 220],
        lineWidth: 0.5
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50, fillColor: [240, 248, 255] },
        1: { cellWidth: this.pageWidth - 90 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Work Activities
    const activities = safeArrayFilter(data.activities).filter(activity => safeText(activity));
    
    if (activities.length > 0) {
      this.checkPageBreak(50);
      
      this.doc.setTextColor(...this.PRIMARY_COLOR);
      this.doc.setFontSize(14);
      this.doc.setFont("helvetica", "bold");
      this.doc.text("3.1 Planned Work Activities", this.MARGIN, this.yPosition);
      this.yPosition += 10;

      const activitiesData = activities.map((activity, index) => [
        `${index + 1}.`, 
        safeText(activity)
      ]);

      autoTable(this.doc, {
        startY: this.yPosition,
        body: activitiesData,
        theme: "striped",
        alternateRowStyles: { fillColor: [248, 250, 252] },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          lineColor: [220, 220, 220],
          lineWidth: 0.5
        },
        columnStyles: {
          0: { cellWidth: 15, halign: "center", fontStyle: "bold", fillColor: [240, 248, 255] },
          1: { cellWidth: this.pageWidth - 55 }
        },
        margin: { left: this.MARGIN, right: this.MARGIN }
      });

      this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
    }

    this.addPageNumber();
  }

  // Comprehensive Risk Assessment Table (Landscape)
  private addDetailedRiskAssessment(data: RAMSData): void {
    const risks = safeArrayFilter(data.risks);
    if (risks.length === 0) return;

    this.doc.addPage('a4', 'landscape');
    this.updatePageMetrics();
    this.currentPage++;
    this.yPosition = this.MARGIN + 15;
    this.addTOCEntry("4. Detailed Risk Assessment");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("4. DETAILED RISK ASSESSMENT", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    const availableWidth = this.pageWidth - (2 * this.MARGIN);
    
    const riskTableData = risks.map((risk, index) => {
      const likelihood = safeNumber(risk.likelihood);
      const severity = safeNumber(risk.severity);
      const riskRating = calculateRiskRating(likelihood, severity);
      const residualRisk = safeNumber(risk.residualRisk);

      return [
        (index + 1).toString(),
        safeText(risk.hazard),
        safeText(risk.risk),
        likelihood.toString(),
        severity.toString(),
        `${riskRating}\n(${getRiskLevel(riskRating)})`,
        safeText(risk.controls) || "Standard safety procedures apply",
        `${residualRisk}\n(${getRiskLevel(residualRisk)})`,
        safeText(risk.furtherAction) || "Monitor effectiveness of controls",
        `${safeText(risk.responsible) || "Site Supervisor"}\n${safeText(risk.actionBy) || "Ongoing"}`
      ];
    });

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Ref", "Hazard Identified", "Potential Consequence", "L", "S", "Initial Risk", "Existing Control Measures", "Residual Risk", "Additional Actions Required", "Responsibility / Timescale"]],
      body: riskTableData,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center",
        valign: "middle",
        lineWidth: 1,
        lineColor: [255, 255, 255]
      },
      styles: {
        fontSize: 8,
        cellPadding: 4,
        lineColor: [200, 200, 200],
        lineWidth: 0.5,
        overflow: 'linebreak',
        valign: 'top',
        minCellHeight: 15
      },
      columnStyles: {
        0: { cellWidth: availableWidth * 0.04, halign: "center", fontStyle: "bold", fillColor: [245, 245, 245] },
        1: { cellWidth: availableWidth * 0.16, fontStyle: "bold" },
        2: { cellWidth: availableWidth * 0.18 },
        3: { cellWidth: availableWidth * 0.03, halign: "center", fontStyle: "bold" },
        4: { cellWidth: availableWidth * 0.03, halign: "center", fontStyle: "bold" },
        5: { cellWidth: availableWidth * 0.08, halign: "center", fontSize: 7, fontStyle: "bold" },
        6: { cellWidth: availableWidth * 0.24 },
        7: { cellWidth: availableWidth * 0.08, halign: "center", fontSize: 7, fontStyle: "bold" },
        8: { cellWidth: availableWidth * 0.08 },
        9: { cellWidth: availableWidth * 0.08, fontSize: 7 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN },
      showHead: 'everyPage',
      didDrawCell: (data) => {
        if (data.column.index === 5 || data.column.index === 7) {
          const cellText = data.cell.text[0];
          if (cellText) {
            const riskNumber = parseInt(cellText.split('\n')[0]);
            if (!isNaN(riskNumber)) {
              const [r, g, b] = getRiskColor(riskNumber);
              this.doc.setFillColor(r + 40, g + 40, b + 40);
              this.doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
            }
          }
        }
      }
    });

    this.addPageNumber();

    // Switch back to portrait for subsequent pages
    this.doc.addPage('a4', 'portrait');
    this.updatePageMetrics();
    this.currentPage++;
  }

  // Emergency Procedures & Additional Information
  private addAdditionalSections(data: RAMSData): void {
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("5. Emergency Procedures & Additional Information");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("5. EMERGENCY PROCEDURES & ADDITIONAL INFORMATION", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    // Emergency contacts
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("5.1 Emergency Contacts", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    const emergencyData = [
      ["Emergency Services", "999"],
      ["Site Manager", "Contact details to be confirmed"],
      ["Health & Safety Officer", "Contact details to be confirmed"],
      ["First Aid", "Location and contact to be confirmed"],
      ["Incident Reporting", "As per company procedures"]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: emergencyData,
      theme: "striped",
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 60, fillColor: [240, 248, 255] },
        1: { cellWidth: this.pageWidth - 100 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Competency requirements
    this.checkPageBreak(50);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("5.2 Competency Requirements", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const competencyText = [
      "All personnel undertaking electrical work must:",
      "• Hold appropriate electrical qualifications (18th Edition, AM2, etc.)",
      "• Be competent and experienced in the type of work being undertaken",
      "• Have received appropriate health and safety training",
      "• Be familiar with this risk assessment and control measures",
      "• Follow all company safety procedures and guidelines"
    ];

    competencyText.forEach(line => {
      this.doc.text(line, this.MARGIN, this.yPosition);
      this.yPosition += 6;
    });

    this.yPosition += 10;

    // Review and monitoring
    this.checkPageBreak(30);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("5.3 Review and Monitoring", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const reviewText = [
      "This risk assessment will be reviewed:",
      "• When work conditions change significantly",
      "• Following any incidents or near misses",
      "• At least annually or as required by legislation",
      "• When new hazards are identified",
      "",
      "All personnel are responsible for monitoring the effectiveness of control measures",
      "and reporting any concerns to site management."
    ];

    reviewText.forEach(line => {
      if (line === "") {
        this.yPosition += 3;
      } else {
        this.doc.text(line, this.MARGIN, this.yPosition);
        this.yPosition += 6;
      }
    });

    this.addPageNumber();
  }

  // Signatures page
  private addSignatures(signOff?: SignOff): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("6. Authorisation & Sign-off");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("6. AUTHORISATION & SIGN-OFF", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    const signatureBoxHeight = 50;
    const signatureBoxWidth = (this.pageWidth - (3 * this.MARGIN)) / 2;

    // Prepared by
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("PREPARED BY:", this.MARGIN, this.yPosition);
    
    this.doc.setDrawColor(100);
    this.doc.rect(this.MARGIN, this.yPosition + 5, signatureBoxWidth, signatureBoxHeight);
    
    if (signOff?.preparedBy) {
      this.doc.setFontSize(10);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(`Name: ${signOff.preparedBy.name}`, this.MARGIN + 5, this.yPosition + signatureBoxHeight - 15);
      this.doc.text(`Date: ${signOff.preparedBy.date}`, this.MARGIN + 5, this.yPosition + signatureBoxHeight - 5);
    }

    // Reviewed by
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("REVIEWED BY:", this.pageWidth / 2 + 10, this.yPosition);
    
    this.doc.rect(this.pageWidth / 2 + 10, this.yPosition + 5, signatureBoxWidth, signatureBoxHeight);
    
    if (signOff?.reviewedBy) {
      this.doc.setFontSize(10);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(`Name: ${signOff.reviewedBy.name}`, this.pageWidth / 2 + 15, this.yPosition + signatureBoxHeight - 15);
      this.doc.text(`Date: ${signOff.reviewedBy.date}`, this.pageWidth / 2 + 15, this.yPosition + signatureBoxHeight - 5);
    }

    this.yPosition += signatureBoxHeight + 30;

    // Approved by (full width)
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("APPROVED BY (AUTHORISED PERSON):", this.MARGIN, this.yPosition);
    
    this.doc.rect(this.MARGIN, this.yPosition + 5, this.pageWidth - (2 * this.MARGIN), signatureBoxHeight);
    
    if (signOff?.approvedBy) {
      this.doc.setFontSize(10);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(`Name: ${signOff.approvedBy.name}`, this.MARGIN + 5, this.yPosition + signatureBoxHeight - 15);
      this.doc.text(`Date: ${signOff.approvedBy.date}`, this.MARGIN + 5, this.yPosition + signatureBoxHeight - 5);
    }

    this.addPageNumber();
  }

  // Main generation method
  public generatePDF(data: RAMSData, options: PDFOptions = {}): string {
    // Add sections in order (TOC entries will be populated)
    this.addTitlePage(data, options);
    this.addIntroduction(data);
    this.addRiskMatrix();
    this.addProjectInformation(data);
    this.addDetailedRiskAssessment(data);
    this.addAdditionalSections(data);
    this.addSignatures(options.signOff);

    // Generate and insert TOC
    this.addTableOfContents();

    // Set metadata
    this.doc.setProperties({
      title: `Risk Assessment - ${safeText(data.projectName)}`,
      subject: 'Health & Safety Risk Assessment',
      author: safeText(data.assessor),
      creator: 'Professional RAMS Generator',
      keywords: 'risk assessment, health safety, electrical, BS7671'
    });

    return this.doc.output('datauristring');
  }
}

// Export functions for compatibility
export const generateRAMSPDF = (data: RAMSData, options: PDFOptions = {}): Blob => {
  const generator = new ProfessionalRAMSPDFGenerator();
  const pdfDataUri = generator.generatePDF(data, options);
  const byteCharacters = atob(pdfDataUri.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'application/pdf' });
};

export const generateRAMSPDFPreview = (data: RAMSData, options: PDFOptions = {}): string => {
  const generator = new ProfessionalRAMSPDFGenerator();
  return generator.generatePDF(data, options);
};

function format(date: Date, formatStr: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return formatStr
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day);
}