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

interface SignOff {
  preparedBy?: { name: string; date: string; signatureDataUrl?: string };
  reviewedBy?: { name: string; date: string; signatureDataUrl?: string };
  approvedBy?: { name: string; date: string; signatureDataUrl?: string };
}

interface PDFOptions extends RAMSReportOptions {
  signOff?: SignOff;
}

class RAMSPDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private yPosition: number;
  private readonly MARGIN = 20;
  private readonly HEADER_HEIGHT = 40;
  private readonly FOOTER_HEIGHT = 20;

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
    this.yPosition = this.MARGIN;
  }

  private addHeader(data: RAMSData, options: PDFOptions): void {
    // Professional HSE-style header with enhanced design
    this.doc.setDrawColor(41, 128, 185);
    this.doc.setLineWidth(3);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40);
    
    // Header background
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40, 'F');
    
    // Redraw border
    this.doc.setDrawColor(41, 128, 185);
    this.doc.setLineWidth(2);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40);
    
    // Main title
    this.doc.setFontSize(22);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(41, 128, 185);
    this.doc.text("HEALTH & SAFETY", this.pageWidth / 2, this.yPosition + 15, { align: "center" });
    this.doc.text("RISK ASSESSMENT", this.pageWidth / 2, this.yPosition + 28, { align: "center" });
    
    this.yPosition += 50;
    
    // Company name if provided
    if (options.companyName) {
      this.doc.setFontSize(14);
      this.doc.setFont("helvetica", "bold");
      this.doc.setTextColor(0, 0, 0);
      this.doc.text(safeText(options.companyName), this.pageWidth / 2, this.yPosition, { align: "center" });
      this.yPosition += 15;
    }
  }

  private addFooter(data: RAMSData, pageNumber?: number): void {
    const footerY = this.pageHeight - 15;
    this.doc.setFontSize(8);
    this.doc.setTextColor(100);
    this.doc.setFont("helvetica", "normal");
    
    // Document info
    const footerText = `RAMS Document - ${truncateText(data.projectName, 30)} - Generated ${safeDatetime(new Date())}`;
    this.doc.text(footerText, this.pageWidth / 2, footerY, { align: "center" });
    
    // Page number if provided
    if (pageNumber) {
      this.doc.text(`Page ${pageNumber}`, this.pageWidth - this.MARGIN, footerY, { align: "right" });
    }
  }

  private checkPageBreak(requiredSpace: number = 30): void {
    if (this.yPosition + requiredSpace > this.pageHeight - this.FOOTER_HEIGHT - this.MARGIN) {
      this.doc.addPage();
      this.yPosition = this.MARGIN;
    }
  }

  private addPurposeStatement(): void {
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Purpose of this Assessment", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const purposeLines = [
      "This Health & Safety Risk Assessment identifies potential hazards and risks associated with electrical work activities.",
      "It establishes appropriate control measures to ensure the safety of all personnel and the public, ensuring compliance",
      "with the Health and Safety at Work Act 1974, CDM Regulations 2015, and BS 7671:2018+A2:2022 (18th Edition)."
    ];

    purposeLines.forEach(line => {
      const splitLines = this.doc.splitTextToSize(line, this.pageWidth - (2 * this.MARGIN));
      splitLines.forEach((splitLine: string) => {
        this.doc.text(splitLine, this.MARGIN, this.yPosition);
        this.yPosition += 5;
      });
    });

    this.yPosition += 10;
  }

  private addProjectInfo(data: RAMSData): void {
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Project Information", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    const projectInfo = [
      ["Project Name:", safeText(data.projectName) || "Not specified"],
      ["Location:", safeText(data.location) || "Not specified"],
      ["Assessment Date:", safeDate(data.date)],
      ["Assessor:", safeText(data.assessor) || "Not specified"],
      ["Document Generated:", safeDatetime(new Date())]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: projectInfo,
      theme: "plain",
      styles: {
        fontSize: 11,
        cellPadding: 4,
        lineColor: [220, 220, 220],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 45, fillColor: [248, 250, 252] },
        1: { cellWidth: this.pageWidth - 85 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
  }

  private addActivities(data: RAMSData): void {
    const activities = safeArrayFilter(data.activities).filter(activity => safeText(activity));
    
    if (activities.length === 0) return;

    this.checkPageBreak(50);
    
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Work Activities", this.MARGIN, this.yPosition);
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
        lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center", fontStyle: "bold" },
        1: { cellWidth: this.pageWidth - 55 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
  }

  private addRiskSummary(data: RAMSData): void {
    const risks = safeArrayFilter(data.risks);
    
    if (risks.length === 0) return;

    this.checkPageBreak(80);
    
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Risk Assessment Summary", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    // Calculate risk statistics based on RESIDUAL risks
    const residualRiskCounts = {
      low: risks.filter(r => safeNumber(r.residualRisk) <= 4).length,
      medium: risks.filter(r => safeNumber(r.residualRisk) > 4 && safeNumber(r.residualRisk) <= 9).length,
      high: risks.filter(r => safeNumber(r.residualRisk) > 9 && safeNumber(r.residualRisk) <= 16).length,
      veryHigh: risks.filter(r => safeNumber(r.residualRisk) > 16).length
    };

    const summaryData = [
      ["Total Risks Identified:", risks.length.toString()],
      ["Low Residual Risk (1-4):", residualRiskCounts.low.toString()],
      ["Medium Residual Risk (5-9):", residualRiskCounts.medium.toString()],
      ["High Residual Risk (10-16):", residualRiskCounts.high.toString()],
      ["Very High Residual Risk (17-25):", residualRiskCounts.veryHigh.toString()]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: summaryData,
      theme: "plain",
      styles: {
        fontSize: 11,
        cellPadding: 4,
        lineColor: [220, 220, 220],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 55, fillColor: [248, 250, 252] },
        1: { cellWidth: 25, halign: "center", fontStyle: "bold" }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
  }

  private addDetailedRisks(data: RAMSData): void {
    const risks = safeArrayFilter(data.risks);
    
    if (risks.length === 0) return;

    // Add new page in landscape orientation for risks table
    this.doc.addPage('a4', 'landscape');
    this.yPosition = this.MARGIN;
    
    // Update page dimensions for landscape
    const landscapeWidth = this.doc.internal.pageSize.getHeight();
    const landscapeHeight = this.doc.internal.pageSize.getWidth();
    
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Detailed Risk Assessment", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    // Add risk matrix legend
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Risk Rating: L = Likelihood (1-5), S = Severity (1-5), Risk = L × S", this.MARGIN, this.yPosition);
    this.yPosition += 10;

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
        `${riskRating}\n${getRiskLevel(riskRating)}`,
        safeText(risk.controls) || "No specific controls identified",
        `${residualRisk}\n${getRiskLevel(residualRisk)}`,
        safeText(risk.furtherAction) || "None required",
        safeText(risk.responsible) || "Site Supervisor",
        safeText(risk.actionBy) || "N/A"
      ];
    });

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Ref", "Hazard", "Risk/Harm", "L", "S", "Initial Risk\nRating", "Existing Controls", "Residual Risk\nRating", "Further Action\nRequired", "Person\nResponsible", "Action By\n(Date)"]],
      body: riskTableData,
      theme: "grid",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center",
        valign: "middle"
      },
      styles: {
        fontSize: 8,
        cellPadding: 4,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        overflow: 'linebreak',
        valign: 'top'
      },
      columnStyles: {
        0: { cellWidth: 20, halign: "center", fontStyle: "bold", fillColor: [245, 245, 245] },
        1: { cellWidth: 60 },
        2: { cellWidth: 60 },
        3: { cellWidth: 15, halign: "center" },
        4: { cellWidth: 15, halign: "center" },
        5: { cellWidth: 35, halign: "center", fontSize: 7 },
        6: { cellWidth: 90 },
        7: { cellWidth: 35, halign: "center", fontSize: 7 },
        8: { cellWidth: 70 },
        9: { cellWidth: 50 },
        10: { cellWidth: 40 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN },
      didDrawCell: (data) => {
        // Add risk level colour coding for risk rating cells
        if (data.column.index === 5 || data.column.index === 7) {
          const cellText = data.cell.text[0];
          const riskRating = parseInt(cellText.split('\n')[0]);
          if (riskRating) {
            const [r, g, b] = getRiskColor(riskRating);
            // Apply lighter background colour for risk levels
            const lightR = Math.min(255, r + 150);
            const lightG = Math.min(255, g + 150);
            const lightB = Math.min(255, b + 150);
            
            data.cell.styles.fillColor = [lightR, lightG, lightB];
          }
        }
      }
    });

    // Add footer to landscape page
    this.addFooter(data);
    
    // Return to portrait for subsequent pages
    this.doc.addPage('a4', 'portrait');
    this.yPosition = this.MARGIN;
  }

  private addSignatures(data: RAMSData, options: PDFOptions): void {
    if (!options.signOff || !options.includeSignatures) return;

    this.checkPageBreak(120);
    
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Assessment Approval", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    const signOffSections = [
      { title: "Prepared by:", data: options.signOff.preparedBy },
      { title: "Reviewed by:", data: options.signOff.reviewedBy },
      { title: "Approved by:", data: options.signOff.approvedBy }
    ].filter(section => section.data?.name);

    if (signOffSections.length === 0) return;

    // Create signature table with all signatures in one row
    const tableData = signOffSections.map(section => [
      section.title,
      section.data?.signatureDataUrl ? 'SIGNED' : 'PENDING',
      safeText(section.data?.name),
      safeDate(section.data?.date)
    ]);

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Role", "Signature", "Name", "Date"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
        halign: "center"
      },
      styles: {
        fontSize: 9,
        cellPadding: 8,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: "bold" },
        1: { cellWidth: 30, halign: "center" },
        2: { cellWidth: 50 },
        3: { cellWidth: 30, halign: "center" }
      },
      margin: { left: this.MARGIN, right: this.MARGIN },
      didDrawCell: (data) => {
        // Add actual signature images in the signature column
        if (data.column.index === 1 && data.row.index >= 0) {
          const sectionData = signOffSections[data.row.index]?.data;
          if (sectionData?.signatureDataUrl) {
            try {
              // Synchronously add signature image
              this.doc.addImage(
                sectionData.signatureDataUrl, 
                'PNG', 
                data.cell.x + 2, 
                data.cell.y + 2, 
                data.cell.width - 4, 
                data.cell.height - 4
              );
            } catch (error) {
              console.warn('Could not add signature image:', error);
            }
          }
        }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
  }

  private addImportantNotes(): void {
    this.checkPageBreak(50);
    
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Important Safety Information", this.MARGIN, this.yPosition);
    this.yPosition += 10;

    const notes = [
      "This assessment must be reviewed and understood by all personnel before work commences",
      "All control measures must be implemented and maintained throughout the work activity", 
      "Any changes to work activities or site conditions must trigger a review of this assessment",
      "Report any incidents, near misses, or safety concerns immediately to the site supervisor",
      "Personal Protective Equipment (PPE) must be worn as specified in the control measures",
      "All electrical work must be carried out by competent, qualified electricians only"
    ];

    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(9);
    this.doc.setTextColor(0, 0, 0);
    
    notes.forEach(note => {
      const splitLines = this.doc.splitTextToSize(`• ${note}`, this.pageWidth - (2 * this.MARGIN));
      splitLines.forEach((line: string) => {
        this.doc.text(line, this.MARGIN, this.yPosition);
        this.yPosition += 5;
      });
      this.yPosition += 2;
    });
  }

  public generatePDF(data: RAMSData, options: PDFOptions = {}): jsPDF {
    try {
      // Validate essential data
      if (!data.projectName?.trim()) {
        data.projectName = "Unnamed Project";
      }
      if (!data.assessor?.trim()) {
        data.assessor = "Not specified";
      }

      // Add all sections
      this.addHeader(data, options);
      this.addPurposeStatement();
      this.addProjectInfo(data);
      this.addActivities(data);
      this.addRiskSummary(data);
      this.addDetailedRisks(data);
      this.addSignatures(data, options);
      this.addImportantNotes();

      // Add footer to all pages
      const totalPages = this.doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        this.doc.setPage(i);
        this.addFooter(data, i);
      }

      return this.doc;
      
    } catch (error) {
      console.error('Error generating RAMS PDF:', error);
      throw new Error('Failed to generate PDF. Please check your data and try again.');
    }
  }
}

// Export functions for compatibility
export function generateRAMSPDF(data: RAMSData, options: PDFOptions = {}): void {
  try {
    const generator = new RAMSPDFGenerator();
    const doc = generator.generatePDF(data, options);
    
    const fileName = `RAMS_${safeFileName(data.projectName)}_${safeDate(new Date()).replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Error saving RAMS PDF:', error);
    throw error;
  }
}

export function generateRAMSPDFPreview(data: RAMSData, options: PDFOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const generator = new RAMSPDFGenerator();
      const doc = generator.generatePDF(data, options);
      
      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      resolve(blobUrl);
    } catch (error) {
      console.error('Error generating RAMS PDF preview:', error);
      reject(error);
    }
  });
}