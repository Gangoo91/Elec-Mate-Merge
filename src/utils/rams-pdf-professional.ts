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
    // Company logo if provided
    if (options.logoUrl) {
      try {
        // Note: In real implementation, you'd need to load and add the image
        // For now, we'll add a placeholder space
        this.yPosition += 15;
      } catch (error) {
        console.warn('Could not load company logo:', error);
      }
    }

    // Main title
    this.doc.setFontSize(24);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(41, 128, 185); // Professional blue
    this.doc.text("RISK ASSESSMENT & METHOD STATEMENT", this.pageWidth / 2, this.yPosition, { align: "center" });
    
    this.yPosition += 15;
    
    // Company name if provided
    if (options.companyName) {
      this.doc.setFontSize(16);
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(safeText(options.companyName), this.pageWidth / 2, this.yPosition, { align: "center" });
      this.yPosition += 12;
    }
    
    this.yPosition += 10;
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
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Purpose of this Assessment", this.MARGIN, this.yPosition);
    this.yPosition += 10;

    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "normal");
    const purposeText = [
      "This Risk Assessment and Method Statement (RAMS) has been prepared to identify potential hazards",
      "and risks associated with the electrical work activities, and to establish appropriate control measures",
      "to ensure the safety of all personnel, visitors, and the public. This document ensures compliance",
      "with health and safety regulations and best practices for safe working procedures."
    ];

    purposeText.forEach(line => {
      this.doc.text(line, this.MARGIN, this.yPosition, { maxWidth: this.pageWidth - (2 * this.MARGIN) });
      this.yPosition += 6;
    });

    this.yPosition += 15;
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

    this.checkPageBreak(60);
    
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Detailed Risk Assessment", this.MARGIN, this.yPosition);
    this.yPosition += 12;

    const riskTableData = risks.map((risk, index) => {
      const likelihood = safeNumber(risk.likelihood);
      const severity = safeNumber(risk.severity);
      const riskRating = calculateRiskRating(likelihood, severity);
      const residualRisk = safeNumber(risk.residualRisk);

      return [
        (index + 1).toString(),
        truncateText(risk.hazard, 30),
        truncateText(risk.risk, 30),
        likelihood.toString(),
        severity.toString(),
        `${riskRating} (${getRiskLevel(riskRating)})`,
        truncateText(risk.controls || "No specific controls identified", 45),
        `${residualRisk} (${getRiskLevel(residualRisk)})`
      ];
    });

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["#", "Hazard", "Risk/Consequence", "L", "S", "Initial Risk", "Control Measures/Mitigation", "Residual Risk"]],
      body: riskTableData,
      theme: "striped",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center"
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      styles: {
        fontSize: 8,
        cellPadding: 4,
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
        overflow: 'linebreak',
        valign: 'top'
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center", fontStyle: "bold" },
        1: { cellWidth: 28 },
        2: { cellWidth: 28 },
        3: { cellWidth: 8, halign: "center" },
        4: { cellWidth: 8, halign: "center" },
        5: { cellWidth: 24, halign: "center", fontSize: 7 },
        6: { cellWidth: 42 },
        7: { cellWidth: 22, halign: "center", fontSize: 7 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN },
        didDrawPage: (tableData) => {
          this.addFooter(data, this.doc.getNumberOfPages());
        }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
  }

  private addSignatures(data: RAMSData, options: PDFOptions): void {
    if (!options.signOff || !options.includeSignatures) return;

    this.doc.addPage();
    this.yPosition = this.MARGIN + 20;
    
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Document Approval & Sign-off", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    const signOffSections = [
      { title: "Prepared by:", data: options.signOff.preparedBy },
      { title: "Reviewed by:", data: options.signOff.reviewedBy },
      { title: "Approved by:", data: options.signOff.approvedBy }
    ];

    signOffSections.forEach((section, index) => {
      if (!section.data?.name) return;

      this.checkPageBreak(100);

      // Section title
      this.doc.setFontSize(14);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(section.title, this.MARGIN, this.yPosition);
      this.yPosition += 15;

      // Create signature box
      const boxWidth = 160;
      const boxHeight = 60;
      
      // Draw signature box
      this.doc.setDrawColor(200, 200, 200);
      this.doc.setLineWidth(0.5);
      this.doc.rect(this.MARGIN, this.yPosition, boxWidth, boxHeight);

      // Add signature if available
      if (section.data.signatureDataUrl) {
        try {
          // Convert base64 to image and add to PDF
          const img = new Image();
          img.onload = () => {
            this.doc.addImage(section.data.signatureDataUrl, 'PNG', 
              this.MARGIN + 5, this.yPosition + 5, boxWidth - 10, boxHeight - 10);
          };
          img.src = section.data.signatureDataUrl;
          
          this.doc.setFontSize(8);
          this.doc.setTextColor(100, 100, 100);
          this.doc.text("Digitally Signed", this.MARGIN + 5, this.yPosition + boxHeight - 5);
        } catch (error) {
          console.warn('Could not add signature image:', error);
          this.doc.setFontSize(10);
          this.doc.setTextColor(150, 150, 150);
          this.doc.text("Digital Signature Present", this.MARGIN + 5, this.yPosition + 30);
        }
      } else {
        // Placeholder text
        this.doc.setFontSize(10);
        this.doc.setTextColor(150, 150, 150);
        this.doc.text("Signature", this.MARGIN + 5, this.yPosition + 30);
      }

      // Add name and date below signature box
      this.yPosition += boxHeight + 10;
      
      this.doc.setFontSize(11);
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(`Name: ${safeText(section.data.name)}`, this.MARGIN, this.yPosition);
      
      if (section.data.date) {
        this.doc.text(`Date: ${safeDate(section.data.date)}`, this.MARGIN + 80, this.yPosition);
      }
      
      this.yPosition += 30;
    });

    // Add validation statement
    this.yPosition += 10;
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Declaration:", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    const declarations = [
      "I confirm that this Risk Assessment and Method Statement has been reviewed and approved.",
      "All personnel involved in this work have been briefed on the identified risks and control measures.",
      "This assessment is suitable and sufficient for the work activities described.",
      "This document complies with current Health & Safety regulations and industry best practices."
    ];

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    declarations.forEach(declaration => {
      this.doc.text(`• ${declaration}`, this.MARGIN, this.yPosition, { maxWidth: this.pageWidth - 40 });
      this.yPosition += 6;
    });
  }

  private addImportantNotes(): void {
    this.checkPageBreak(60);
    
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(220, 38, 127); // Important notice color
    this.doc.text("Important Safety Information", this.MARGIN, this.yPosition);
    this.yPosition += 12;

    const notes = [
      "This RAMS document must be reviewed and understood by all personnel before work commences",
      "All control measures must be implemented and maintained throughout the work activity",
      "Any changes to work activities or site conditions must trigger a review of this assessment",
      "Report any incidents, near misses, or safety concerns immediately to the site supervisor",
      "This document complies with BS 7671 18th Edition requirements and current CDM regulations",
      "Personal Protective Equipment (PPE) must be worn as specified in the control measures",
      "All electrical work must be carried out by competent, qualified electricians only"
    ];

    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(10);
    this.doc.setTextColor(0, 0, 0);
    
    notes.forEach(note => {
      this.doc.text(`• ${note}`, this.MARGIN, this.yPosition, { maxWidth: this.pageWidth - 40 });
      this.yPosition += 8;
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