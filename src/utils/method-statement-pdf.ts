import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format as formatDate } from "date-fns";
import { MethodStatementData, MethodStep } from "@/types/method-statement";
import { 
  safeText, 
  safeNumber, 
  safeDate, 
  safeDatetime,
  safeFileName,
  safeArrayFilter
} from "./rams-pdf-helpers";

interface PDFOptions {
  companyName?: string;
  companyLogo?: string;
  includeSignatures?: boolean;
  watermark?: string;
}

class MethodStatementPDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private yPosition: number;
  private currentPage: number = 1;
  private readonly MARGIN = 15;
  private readonly HEADER_HEIGHT = 40;
  private readonly FOOTER_HEIGHT = 25;
  private readonly PRIMARY_COLOR: [number, number, number] = [30, 64, 175]; // Professional blue
  private readonly ACCENT_COLOR: [number, number, number] = [59, 130, 246]; // Lighter blue
  private readonly SUCCESS_COLOR: [number, number, number] = [34, 197, 94]; // Green
  private readonly WARNING_COLOR: [number, number, number] = [245, 158, 11]; // Amber
  private readonly DANGER_COLOR: [number, number, number] = [220, 38, 127]; // Rose
  private readonly LIGHT_GRAY: [number, number, number] = [248, 250, 252];

  constructor() {
    this.doc = new jsPDF('portrait', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
    this.yPosition = this.MARGIN;
  }

  private addPageNumber(): void {
    this.doc.setFillColor(...this.LIGHT_GRAY);
    this.doc.rect(0, this.pageHeight - this.FOOTER_HEIGHT, this.pageWidth, this.FOOTER_HEIGHT, 'F');
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 116, 139);
    
    const statusText = `Generated: ${formatDate(new Date(), "dd/MM/yyyy HH:mm")}`;
    this.doc.text(statusText, this.MARGIN, this.pageHeight - 8);
    
    this.doc.text("METHOD STATEMENT", this.pageWidth / 2, this.pageHeight - 8, { align: "center" });
    
    this.doc.setFont("helvetica", "bold");
    this.doc.text(`Page ${this.currentPage}`, this.pageWidth - this.MARGIN, this.pageHeight - 8, { align: "right" });
    this.doc.setFont("helvetica", "normal");
  }

  private checkPageBreak(requiredSpace: number = 30): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.FOOTER_HEIGHT - this.MARGIN) {
      this.addPageNumber();
      this.doc.addPage();
      this.currentPage++;
      this.yPosition = this.MARGIN + 10;
      this.addDocumentHeader();
      return true;
    }
    return false;
  }

  private addDocumentHeader(): void {
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, 3, 'F');
    this.yPosition = this.MARGIN + 5;
  }

  private addTitlePage(data: MethodStatementData, options: PDFOptions): void {
    // Header with company branding
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(0, 0, this.pageWidth, 50, 'F');
    
    // Company section
    const companyName = options.companyName || "Your Company";
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, 8, 120, 25, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(companyName.toUpperCase(), this.MARGIN + 60, 18, { align: "center" });
    this.doc.setFontSize(8);
    this.doc.text("METHOD STATEMENT", this.MARGIN + 60, 28, { align: "center" });

    // Document title section
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("METHOD STATEMENT", this.pageWidth / 2, 60, { align: "center" });
    
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(safeText(data.jobTitle), this.pageWidth / 2, 75, { align: "center" });

    // Document info
    this.yPosition = 90;
    const docInfo = [
      ["Job Title", safeText(data.jobTitle)],
      ["Location", safeText(data.location)],
      ["Contractor", safeText(data.contractor)],
      ["Supervisor", safeText(data.supervisor)],
      ["Work Type", safeText(data.workType)],
      ["Duration", safeText(data.duration)],
      ["Team Size", safeText(data.teamSize)],
      ["Overall Risk Level", safeText(data.overallRiskLevel).toUpperCase()],
      ["Review Date", safeDate(data.reviewDate)],
      ["Document Created", safeDatetime(new Date())]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Field", "Details"]],
      body: docInfo,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 11,
        halign: "center"
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
        lineColor: [200, 200, 200],
        lineWidth: 0.5
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 60 },
        1: { cellWidth: 120 }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Purpose statement
    this.doc.setDrawColor(200, 200, 200);
    this.doc.setLineWidth(1);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("PURPOSE", this.pageWidth / 2, this.yPosition + 12, { align: "center" });
    
    this.doc.setTextColor(51, 65, 85);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const purposeText = "This Method Statement provides detailed procedures for safe execution of work activities, ensuring compliance with Health & Safety regulations and industry best practices.";
    
    const wrappedPurpose = this.doc.splitTextToSize(purposeText, this.pageWidth - (2 * this.MARGIN) - 10);
    wrappedPurpose.forEach((line: string, index: number) => {
      this.doc.text(line, this.pageWidth / 2, this.yPosition + 22 + (index * 4), { align: "center" });
    });

    // Compliance indicator
    this.doc.setFillColor(...this.SUCCESS_COLOR);
    this.doc.rect(this.MARGIN + 10, this.yPosition + 32, this.pageWidth - (2 * this.MARGIN) - 20, 6, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("BS 7671:2018+A3:2024 COMPLIANT", this.pageWidth / 2, this.yPosition + 36, { align: "center" });

    this.addPageNumber();
  }

  private addJobDescription(data: MethodStatementData): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 15;
    this.addDocumentHeader();

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("JOB DESCRIPTION", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    // Description box
    const description = safeText(data.description) || "No description provided";
    this.doc.setDrawColor(200, 200, 200);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 50);
    
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const wrappedDesc = this.doc.splitTextToSize(description, this.pageWidth - (2 * this.MARGIN) - 10);
    wrappedDesc.forEach((line: string, index: number) => {
      this.doc.text(line, this.MARGIN + 5, this.yPosition + 10 + (index * 5));
    });

    this.yPosition += 60;

    // Work summary
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("WORK SUMMARY", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    const summaryData = [
      ["Total Method Steps", data.steps.length.toString()],
      ["High Risk Steps", data.steps.filter(step => step.riskLevel === 'high').length.toString()],
      ["Medium Risk Steps", data.steps.filter(step => step.riskLevel === 'medium').length.toString()],
      ["Low Risk Steps", data.steps.filter(step => step.riskLevel === 'low').length.toString()],
      ["Overall Risk Assessment", safeText(data.overallRiskLevel).toUpperCase()]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: summaryData,
      theme: "striped",
      styles: {
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 80 },
        1: { cellWidth: 100 }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 10;
    this.addPageNumber();
  }

  private addMethodSteps(data: MethodStatementData): void {
    this.checkPageBreak(30);
    
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("METHOD STEPS", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    data.steps.forEach((step, index) => {
      this.checkPageBreak(80);

      // Step header
      const riskColor = this.getRiskColor(step.riskLevel);
      this.doc.setFillColor(...riskColor);
      this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 12, 'F');
      
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFontSize(12);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(`STEP ${step.stepNumber}: ${safeText(step.title)}`, this.MARGIN + 5, this.yPosition + 8);
      
      // Risk level badge
      this.doc.text(`RISK: ${step.riskLevel.toUpperCase()}`, this.pageWidth - this.MARGIN - 5, this.yPosition + 8, { align: "right" });
      
      this.yPosition += 20;

      // Step details table
      const stepData = [
        ["Description", safeText(step.description)],
        ["Duration", safeText(step.estimatedDuration)],
        ["Risk Level", step.riskLevel.toUpperCase()],
        ["Safety Requirements", step.safetyRequirements.join(", ")],
        ["Equipment Needed", step.equipmentNeeded.join(", ")],
        ["Required Qualifications", step.qualifications.join(", ")]
      ];

      if (step.dependencies && step.dependencies.length > 0) {
        stepData.push(["Dependencies", step.dependencies.join(", ")]);
      }

      if (step.notes) {
        stepData.push(["Notes", safeText(step.notes)]);
      }

      autoTable(this.doc, {
        startY: this.yPosition,
        body: stepData,
        theme: "grid",
        styles: {
          fontSize: 9,
          cellPadding: 3,
          lineColor: [200, 200, 200],
          lineWidth: 0.5
        },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 40, fillColor: [245, 245, 245] },
          1: { cellWidth: 140 }
        }
      });

      this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
    });

    this.addPageNumber();
  }

  private getRiskColor(riskLevel: string): [number, number, number] {
    switch (riskLevel) {
      case 'low': return this.SUCCESS_COLOR;
      case 'medium': return this.WARNING_COLOR;
      case 'high': return this.DANGER_COLOR;
      default: return [128, 128, 128];
    }
  }

  private addSafetyRequirements(data: MethodStatementData): void {
    this.checkPageBreak(30);
    
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("SAFETY REQUIREMENTS SUMMARY", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    // Collect all unique safety requirements
    const allSafetyReqs = new Set<string>();
    data.steps.forEach(step => {
      step.safetyRequirements.forEach(req => allSafetyReqs.add(req));
    });

    const safetyData = Array.from(allSafetyReqs).map((req, index) => [
      `${index + 1}`,
      req
    ]);

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["#", "Safety Requirement"]],
      body: safetyData,
      theme: "striped",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold"
      },
      styles: {
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { cellWidth: 165 }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;
    this.addPageNumber();
  }

  private addEquipmentList(data: MethodStatementData): void {
    this.checkPageBreak(30);
    
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("EQUIPMENT & MATERIALS", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    // Collect all unique equipment
    const allEquipment = new Set<string>();
    data.steps.forEach(step => {
      step.equipmentNeeded.forEach(eq => allEquipment.add(eq));
    });

    const equipmentData = Array.from(allEquipment).map((item, index) => [
      `${index + 1}`,
      item,
      "Required" // Status column
    ]);

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["#", "Equipment/Material", "Status"]],
      body: equipmentData,
      theme: "striped",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold"
      },
      styles: {
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { cellWidth: 120 },
        2: { cellWidth: 45, halign: "center" }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;
    this.addPageNumber();
  }

  private addSignOffSection(data: MethodStatementData): void {
    this.checkPageBreak(80);
    
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("APPROVAL & SIGN-OFF", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    const signOffData = [
      ["Prepared By", "", "Date", ""],
      [safeText(data.supervisor), "", safeDate(new Date()), ""],
      ["", "", "", ""],
      ["Reviewed By", "", "Date", ""],
      [safeText(data.approvedBy) || "To be confirmed", "", safeDate(data.reviewDate), ""],
      ["", "", "", ""],
      ["Site Manager Approval", "", "Date", ""],
      ["", "", "", ""]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: signOffData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 8,
        lineColor: [0, 0, 0],
        lineWidth: 0.5
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { fontStyle: "bold", cellWidth: 30 },
        3: { cellWidth: 50 }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Compliance statement
    this.doc.setFillColor(...this.LIGHT_GRAY);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 25, 'F');
    
    this.doc.setTextColor(51, 65, 85);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const complianceText = "This Method Statement has been prepared in accordance with the Health & Safety at Work Act 1974, CDM Regulations 2015, and BS 7671:2018+A3:2024. All personnel must read and understand this document before commencing work.";
    
    const wrappedCompliance = this.doc.splitTextToSize(complianceText, this.pageWidth - (2 * this.MARGIN) - 10);
    wrappedCompliance.forEach((line: string, index: number) => {
      this.doc.text(line, this.MARGIN + 5, this.yPosition + 8 + (index * 4));
    });

    this.addPageNumber();
  }

  public generate(data: MethodStatementData, options: PDFOptions = {}): Uint8Array {
    // Generate the complete PDF
    this.addTitlePage(data, options);
    this.addJobDescription(data);
    this.addMethodSteps(data);
    this.addSafetyRequirements(data);
    this.addEquipmentList(data);
    this.addSignOffSection(data);

    return this.doc.output('arraybuffer') as Uint8Array;
  }
}

// Export functions
export function generateMethodStatementPDF(
  data: MethodStatementData, 
  options: PDFOptions = {}
): Uint8Array {
  const generator = new MethodStatementPDFGenerator();
  return generator.generate(data, options);
}

export function generateMethodStatementPDFPreview(
  data: MethodStatementData, 
  options: PDFOptions = {}
): string {
  const generator = new MethodStatementPDFGenerator();
  const pdfData = generator.generate(data, options);
  return URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
}

export function downloadMethodStatementPDF(
  data: MethodStatementData, 
  options: PDFOptions = {}
): void {
  const generator = new MethodStatementPDFGenerator();
  const pdfData = generator.generate(data, options);
  
  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFileName(data.jobTitle)}_Method_Statement_${formatDate(new Date(), 'ddMMyyyy')}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}