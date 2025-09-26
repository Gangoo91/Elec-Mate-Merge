import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format as formatDate } from "date-fns";
import { RAMSData, RAMSReportOptions, RAMSRisk } from "@/types/rams";
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

// Dynamic variable substitution system
interface VariableContext {
  project_name: string;
  location: string;
  company_name: string;
  assessment_date: string;
  assessor: string;
  document_generated: string;
  total_risks: number;
  low_residual: number;
  medium_residual: number;
  high_residual: number;
  very_high_residual: number;
}

function createVariableContext(data: RAMSData, options: PDFOptions): VariableContext {
  const now = new Date();
  const riskCounts = calculateRiskCounts(data.risks);
  
  return {
    project_name: safeText(data.projectName) || "Not specified",
    location: safeText(data.location) || "Not specified", 
    company_name: safeText(options.companyName) || "Company Name",
    assessment_date: safeDate(data.date),
    assessor: safeText(data.assessor) || "Not specified",
    document_generated: formatDate(now, "dd/MM/yyyy 'at' HH:mm 'IST'"),
    total_risks: riskCounts.total,
    low_residual: riskCounts.low,
    medium_residual: riskCounts.medium,
    high_residual: riskCounts.high,
    very_high_residual: riskCounts.veryHigh
  };
}

function calculateRiskCounts(risks: RAMSRisk[]) {
  const counts = { total: 0, low: 0, medium: 0, high: 0, veryHigh: 0 };
  
  risks.forEach(risk => {
    counts.total++;
    const residualRisk = safeNumber(risk.residualRisk);
    if (residualRisk <= 4) counts.low++;
    else if (residualRisk <= 9) counts.medium++;
    else if (residualRisk <= 16) counts.high++;
    else counts.veryHigh++;
  });
  
  return counts;
}

function substituteVariables(text: string, context: VariableContext): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return context[key as keyof VariableContext]?.toString() || match;
  });
}

// Enhanced deduplication system
function deduplicateRisks(risks: RAMSRisk[]): RAMSRisk[] {
  const uniqueRisks = new Map<string, RAMSRisk>();
  
  risks.forEach(risk => {
    const key = `${safeText(risk.hazard)}-${safeText(risk.risk)}`.toLowerCase();
    if (!uniqueRisks.has(key)) {
      uniqueRisks.set(key, risk);
    }
  });
  
  return Array.from(uniqueRisks.values());
}

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
  private readonly MARGIN = 10; // 10mm margins for optimized space usage
  private readonly HEADER_HEIGHT = 35;
  private readonly FOOTER_HEIGHT = 20;
  private readonly PRIMARY_COLOR: [number, number, number] = [30, 64, 175]; // Professional blue #1e40af
  private readonly ACCENT_COLOR: [number, number, number] = [59, 130, 246]; // Lighter blue #3b82f6
  private readonly SUCCESS_COLOR: [number, number, number] = [34, 197, 94]; // Green
  private readonly WARNING_COLOR: [number, number, number] = [245, 158, 11]; // Amber
  private readonly DANGER_COLOR: [number, number, number] = [220, 38, 127]; // Rose
  private readonly LIGHT_GRAY: [number, number, number] = [248, 250, 252]; // Very light gray
  private readonly BORDER_GRAY: [number, number, number] = [226, 232, 240]; // Light border

  constructor() {
    this.doc = new jsPDF('landscape', 'mm', 'a4');
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
    // Professional footer design
    this.doc.setFillColor(...this.LIGHT_GRAY);
    this.doc.rect(0, this.pageHeight - this.FOOTER_HEIGHT, this.pageWidth, this.FOOTER_HEIGHT, 'F');
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 116, 139); // Slate gray
    
    // Left side: Document status
    const statusText = `CONFIDENTIAL - Generated: ${formatDate(new Date(), "dd/MM/yyyy HH:mm")}`;
    this.doc.text(statusText, this.MARGIN, this.pageHeight - 8);
    
    // Center: Company name
    this.doc.text("Health & Safety Risk Assessment", this.pageWidth / 2, this.pageHeight - 8, { align: "center" });
    
    // Right side: Page number
    this.doc.setFont("helvetica", "bold");
    this.doc.text(`Page ${this.currentPage}`, this.pageWidth - this.MARGIN, this.pageHeight - 8, { align: "right" });
    this.doc.setFont("helvetica", "normal");
  }

  // Enhanced page break with continuation headers
  private checkPageBreak(requiredSpace: number = 30, addContinuationHeader: boolean = false, sectionTitle?: string): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.FOOTER_HEIGHT - this.MARGIN) {
      this.addPageNumber();
      this.doc.addPage();
      this.currentPage++;
      this.yPosition = this.MARGIN + 5;
      this.addDocumentHeader();
      
      if (addContinuationHeader && sectionTitle) {
        this.doc.setTextColor(...this.PRIMARY_COLOR);
        this.doc.setFontSize(12);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(`${sectionTitle} (Continued)`, this.MARGIN, this.yPosition);
        this.yPosition += 15;
      }
      
      return true;
    }
    return false;
  }

  private addDocumentHeader(): void {
    // Only add subtle blue stripe without text header to keep pages clean
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, 3, 'F');
    
    this.yPosition = this.MARGIN + 5;
  }

  // Professional Title Page matching reference template
  private addTitlePage(data: RAMSData, options: PDFOptions, context: VariableContext): void {
    // Professional header with proper spacing
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(0, 0, this.pageWidth, 45, 'F');
    
    // Calculate dynamic widths based on company name length
    const companyNameLength = context.company_name.length;
    const companyBoxWidth = Math.max(80, Math.min(120, companyNameLength * 2.5 + 40));
    const rightSectionWidth = 140;
    const spaceBetween = 20;
    
    // Ensure right section doesn't overlap by calculating proper positioning
    const maxCompanyWidth = this.pageWidth - rightSectionWidth - spaceBetween - (2 * this.MARGIN);
    const finalCompanyWidth = Math.min(companyBoxWidth, maxCompanyWidth);
    
    // Company branding box - left side
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, 8, finalCompanyWidth, 25, 'F');
    
    // Company name - centered in box with proper font sizing
    this.doc.setTextColor(255, 255, 255);
    const fontSize = companyNameLength > 20 ? 10 : companyNameLength > 15 ? 12 : 14;
    this.doc.setFontSize(fontSize);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(context.company_name.toUpperCase(), this.MARGIN + (finalCompanyWidth / 2), 18, { align: "center" });
    this.doc.setFontSize(8);
    this.doc.text("RISK ASSESSMENT", this.MARGIN + (finalCompanyWidth / 2), 28, { align: "center" });

    // Right section - properly positioned to avoid overlap
    const rightAreaStartX = this.MARGIN + finalCompanyWidth + spaceBetween;
    const rightAreaCenterX = rightAreaStartX + (rightSectionWidth / 2);
    
    // Document title
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK ASSESSMENT", rightAreaCenterX, 15, { align: "center" });
    
    // Reference number
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const titleDocRef = `RAMS-Office_Electrical_Retrofit-21092025`;
    this.doc.text(`Ref: ${titleDocRef}`, rightAreaCenterX, 25, { align: "center" });
    
    // Authorization fields - properly spaced in right area
    this.doc.setFontSize(8);
    this.doc.text("Authorised By: _______________", rightAreaStartX, 35);
    this.doc.text(`Rev: 1.0`, rightAreaStartX + 90, 35);
    this.doc.text(`Date: ${context.assessment_date}`, rightAreaStartX + 110, 35);

    this.yPosition = 50;

    // Task Information Section matching template
    this.yPosition += 10;
    
    // Task Description Table
    const taskTableData = [
      ['TASK / LOCATION / EQUIPMENT DESCRIPTION'],
      [safeText(data.projectName) + ' - ' + safeText(data.location)]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: taskTableData,
      theme: 'grid',
      tableWidth: this.pageWidth - (2 * this.MARGIN),
      margin: { left: this.MARGIN, right: this.MARGIN },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'left'
      },
      styles: { 
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        fontSize: 9
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 5;

    // Assessed By and Date row
    const assessorTableData = [
      ['ASSESSED BY:', 'DATE:'],
      [safeText(data.assessor), context.assessment_date]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      body: assessorTableData,
      theme: 'grid',
      tableWidth: this.pageWidth - (2 * this.MARGIN),
      margin: { left: this.MARGIN, right: this.MARGIN },
      columnStyles: {
        0: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.7 },
        1: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.3 }
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'left'
      },
      styles: { 
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        fontSize: 9
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Clean purpose statement without colored background
    const purposeHeight = 50;
    this.doc.setDrawColor(200, 200, 200);
    this.doc.setLineWidth(1);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), purposeHeight);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("PURPOSE & COMPLIANCE", this.pageWidth / 2, this.yPosition + 12, { align: "center" });
    
    this.doc.setTextColor(51, 65, 85);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const purposeText = "This document identifies hazards and establishes control measures for electrical work activities, ensuring compliance with Health & Safety at Work Act 1974, CDM Regulations 2015, and BS 7671:2018+A2:2022.";
    
    const wrappedPurpose = this.doc.splitTextToSize(purposeText, this.pageWidth - (2 * this.MARGIN) - 12);
    wrappedPurpose.forEach((line: string, index: number) => {
      this.doc.text(line, this.pageWidth / 2, this.yPosition + 20 + (index * 4), { align: "center" });
    });

    // Clean compliance indicator with green bar only
    this.doc.setFillColor(...this.SUCCESS_COLOR);
    this.doc.rect(this.MARGIN + 10, this.yPosition + 38, this.pageWidth - (2 * this.MARGIN) - 20, 8, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("BS 7671:2018+A3:2024 COMPLIANT (Current as of September 2025)", this.pageWidth / 2, this.yPosition + 43, { align: "center" });

    // Document reference footer
    this.yPosition = this.pageHeight - 35;
    this.doc.setFillColor(...this.LIGHT_GRAY);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 15, 'F');
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 116, 139);
    const footerDocRef = `RAMS-Office_Electrical_Retrofit-21092025`;
    this.doc.text(`Document Reference: ${footerDocRef}`, this.pageWidth / 2, this.yPosition + 6, { align: "center" });
    this.doc.text("Version 1.0 - CONFIDENTIAL", this.pageWidth / 2, this.yPosition + 12, { align: "center" });

    this.addPageNumber();
  }

  // Project Information Section (Section 1)
  private addProjectInformation(data: RAMSData, context: VariableContext): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 10;
    this.addDocumentHeader();
    this.addTOCEntry("1. Project Information");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("1. PROJECT INFORMATION", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    // Project details table
    const projectData = [
      ["Project Name", safeText(data.projectName) || "Office Electrical Retrofit"],
      ["Client", context.company_name || "Client Name"],
      ["Location", safeText(data.location) || context.location],
      ["Assessment Date", safeDate(data.date)],
      ["Assessor", safeText(data.assessor) || context.assessor],
      ["Review Date", safeDate(data.date)],
      ["Document Reference", `RAMS-${safeText(data.projectName)?.replace(/\s+/g, '_') || 'Project'}-${formatDate(new Date(), 'ddMMyyyy')}`]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Field", "Details"]],
      body: projectData,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
        halign: "center",
        cellPadding: 6
      },
      styles: {
        fontSize: 9,
        cellPadding: 6,
        lineColor: [200, 200, 200],
        lineWidth: 0.5,
        valign: "middle"
      },
      tableWidth: this.pageWidth - (2 * this.MARGIN),
      margin: { left: this.MARGIN, right: this.MARGIN },
      columnStyles: {
        0: { halign: "left", cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.3, fontStyle: "bold" },
        1: { halign: "left", cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.7 }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Scope of work
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Scope of Work", this.MARGIN, this.yPosition);
    this.yPosition += 12;

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const scopeText = "This Risk Assessment and Method Statement (RAMS) covers electrical installation, testing, and certification work in compliance with BS 7671:2018+A2:2022 (18th Edition IET Wiring Regulations), Health & Safety at Work Act 1974, and CDM Regulations 2015.";
    
    const wrappedScope = this.doc.splitTextToSize(scopeText, this.pageWidth - (2 * this.MARGIN) - 12);
    wrappedScope.forEach((line: string, index: number) => {
      this.doc.text(line, this.MARGIN + 6, this.yPosition + (index * 4.5));
    });
    this.yPosition += wrappedScope.length * 4.5 + 10;

    this.addPageNumber();
  }

  // Work Activities Section
  private addWorkActivities(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(20);
    this.addTOCEntry("2. Work Activities");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("2. WORK ACTIVITIES", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    const activities = safeArrayFilter(data.activities);
    if (activities.length === 0) {
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(10);
      this.doc.text("No specific activities defined.", this.MARGIN, this.yPosition);
      this.yPosition += 15;
    } else {
      activities.forEach((activity, index) => {
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(11);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(`${index + 1}.`, this.MARGIN, this.yPosition);
        this.doc.setFont("helvetica", "normal");
        const wrappedActivity = this.doc.splitTextToSize(safeText(activity), this.pageWidth - 2 * this.MARGIN - 15);
        wrappedActivity.forEach((line: string, lineIndex: number) => {
          this.doc.text(line, this.MARGIN + 15, this.yPosition + (lineIndex * 5));
        });
        this.yPosition += Math.max(15, wrappedActivity.length * 5 + 5);
      });
    }

    this.addPageNumber();
  }

  // Risk Assessment Matrix (Section 3)
  private addRiskMatrix(): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 10;
    this.addDocumentHeader();
    this.addTOCEntry("3. Risk Assessment Matrix");

    // Ensure we have a new page for the matrix to prevent cropping
    this.checkPageBreak(140); // Reserve space for dramatically optimized matrix and legend

    this.yPosition += 20;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("3. RISK ASSESSMENT MATRIX", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    // Professional matrix table with optimized dimensions for landscape format
    const matrixHeaders = ["", "Very Low (1)", "Low (2)", "Medium (3)", "High (4)", "Very High (5)"];
    const matrixData = [
      ["Insignificant (1)", "1", "2", "3", "4", "5"],
      ["Minor (2)", "2", "4", "6", "8", "10"],
      ["Moderate (3)", "3", "6", "9", "12", "15"],
      ["Major (4)", "4", "8", "12", "16", "20"],
      ["Catastrophic (5)", "5", "10", "15", "20", "25"]
    ];

    // Calculate available width and optimize cell dimensions
    const availableWidth = this.pageWidth - (2 * this.MARGIN);
    const cellWidth = availableWidth / 6; // 6 columns total
    
    autoTable(this.doc, {
      startY: this.yPosition,
      head: [matrixHeaders],
      body: matrixData,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
        halign: "center",
        cellPadding: 6, // Increased padding
        minCellHeight: 12 // Increased height
      },
      styles: {
        fontSize: 10, // Increased font size
        halign: "center",
        valign: "middle",
        cellPadding: 6, // Increased padding
        minCellHeight: 12, // Increased height
        lineColor: [200, 200, 200],
        lineWidth: 0.8 // Slightly thicker borders
      },
      tableWidth: availableWidth,
      margin: { left: this.MARGIN, right: this.MARGIN },
      columnStyles: {
        0: { 
          halign: "left", 
          cellWidth: cellWidth * 1.3, // Wider first column for severity descriptions
          fontStyle: "bold",
          fillColor: [245, 245, 245] // Light gray background
        },
        1: { cellWidth: cellWidth * 0.9 },
        2: { cellWidth: cellWidth * 0.9 },
        3: { cellWidth: cellWidth * 0.9 },
        4: { cellWidth: cellWidth * 0.9 },
        5: { cellWidth: cellWidth * 0.9 }
      },
      didParseCell: (data: any) => {
        // Enhanced color coding with better visibility
        if (data.section === 'body' && data.column.index > 0) {
          const value = parseInt(data.cell.text[0]);
          if (value <= 4) {
            data.cell.styles.fillColor = [34, 197, 94]; // Green
            data.cell.styles.textColor = [255, 255, 255];
          } else if (value <= 9) {
            data.cell.styles.fillColor = [245, 158, 11]; // Yellow
            data.cell.styles.textColor = [0, 0, 0];
          } else if (value <= 16) {
            data.cell.styles.fillColor = [249, 115, 22]; // Orange
            data.cell.styles.textColor = [255, 255, 255];
          } else {
            data.cell.styles.fillColor = [220, 38, 127]; // Red
            data.cell.styles.textColor = [255, 255, 255];
          }
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fontSize = 11; // Larger font for numbers
        }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Compact legend with improved layout
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Risk Level Legend:", this.MARGIN, this.yPosition);
    this.yPosition += 8;

    // Horizontal legend layout for better space utilization
    const legendItems = [
      { level: "Low (1-4)", color: [34, 197, 94] },
      { level: "Medium (5-9)", color: [245, 158, 11] },
      { level: "High (10-16)", color: [249, 115, 22] },
      { level: "Very High (17-25)", color: [220, 38, 127] }
    ];

    const legendSpacing = (this.pageWidth - (2 * this.MARGIN)) / 4;
    legendItems.forEach((item, index) => {
      const x = this.MARGIN + (index * legendSpacing);
      
      // Color square
      this.doc.setFillColor(item.color[0], item.color[1], item.color[2]);
      this.doc.rect(x, this.yPosition, 6, 6, 'F');
      
      // Legend text
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(9);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(item.level, x + 8, this.yPosition + 4);
    });

    this.yPosition += 15;
    this.addPageNumber();
  }

  // Detailed Risk Assessment (Section 4)
  private addDetailedRiskAssessment(data: RAMSData): void {
    this.checkPageBreak(50);
    this.addTOCEntry("4. Detailed Risk Assessment");

    this.yPosition += 20;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("4. DETAILED RISK ASSESSMENT", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    const deduplicatedRisks = deduplicateRisks(data.risks);
    
    if (deduplicatedRisks.length === 0) {
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(10);
      this.doc.text("No risks have been identified for this assessment.", this.MARGIN, this.yPosition);
      return;
    }

    // Enhanced table headers with proper spacing and "Task" column
    const tableHeaders = [
      "No.", "Task", "Hazard", "Risk", "L", "S", "Risk\nRating", "Control Measures", 
      "Residual\nL", "Residual\nS", "Residual\nRating", "Level"
    ];

    const tableData: string[][] = [];
    deduplicatedRisks.forEach((risk, index) => {
      const likelihood = Math.max(1, Math.min(5, safeNumber(risk.likelihood)));
      const severity = Math.max(1, Math.min(5, safeNumber(risk.severity)));
      const initialRating = likelihood * severity;
      
      const residualLikelihood = Math.max(1, Math.min(5, safeNumber(risk.likelihood)));
      const residualSeverity = Math.max(1, Math.min(5, safeNumber(risk.severity)));
      const residualRating = safeNumber(risk.residualRisk) || residualLikelihood * residualSeverity;

      // Extract task from hazard or use a default task description
      const task = this.extractTaskFromHazard(safeText(risk.hazard));
      
      tableData.push([
        (index + 1).toString(),
        truncateText(task, 25),
        truncateText(safeText(risk.hazard), 30),
        truncateText(safeText(risk.risk), 35),
        likelihood.toString(),
        severity.toString(),
        initialRating.toString(),
        truncateText(safeText(risk.controls), 40),
        residualLikelihood.toString(),
        residualSeverity.toString(),
        residualRating.toString(),
        getRiskLevel(residualRating)
      ]);
    });

    // Smart table generation with continuation headers
    this.generateSmartRiskTable(tableHeaders, tableData);

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
  }

  // Enhanced table generation with smart page breaks and continuation headers
  private generateSmartRiskTable(headers: string[], data: string[][]): void {
    const itemsPerPage = 8; // Reduced to prevent awkward splits
    let currentPage = 0;
    
    for (let i = 0; i < data.length; i += itemsPerPage) {
      const pageData = data.slice(i, i + itemsPerPage);
      const isFirstPage = i === 0;
      const isLastPage = i + itemsPerPage >= data.length;
      
      if (!isFirstPage) {
        this.checkPageBreak(20, true, "4. DETAILED RISK ASSESSMENT");
      }

      autoTable(this.doc, {
        startY: this.yPosition,
        head: isFirstPage ? [headers] : [headers], // Always show headers for clarity
        body: pageData,
        theme: "grid",
        headStyles: {
          fillColor: this.PRIMARY_COLOR,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 8,
          halign: "center",
          cellPadding: 2,
          minCellHeight: 12
        },
        bodyStyles: {
          fontSize: 7,
          cellPadding: 2,
          valign: "top",
          lineColor: [200, 200, 200],
          lineWidth: 0.3
        },
        styles: {
          overflow: "linebreak",
          cellWidth: "wrap"
        },
        columnStyles: {
          0: { cellWidth: 8, halign: "center" }, // No.
          1: { cellWidth: 18 }, // Task
          2: { cellWidth: 18 }, // Hazard
          3: { cellWidth: 20 }, // Risk  
          4: { cellWidth: 6, halign: "center" }, // L
          5: { cellWidth: 6, halign: "center" }, // S
          6: { cellWidth: 10, halign: "center" }, // Risk Rating
          7: { cellWidth: 22 }, // Control Measures
          8: { cellWidth: 6, halign: "center" }, // Residual L
          9: { cellWidth: 6, halign: "center" }, // Residual S
          10: { cellWidth: 10, halign: "center" }, // Residual Rating
          11: { cellWidth: 12, halign: "center" } // Level
        },
        tableWidth: this.pageWidth - (2 * this.MARGIN),
        margin: { left: this.MARGIN, right: this.MARGIN },
        didDrawCell: (data) => {
          if (data.section === 'body' && data.column.index === 11) {
            const riskLevel = data.cell.text[0];
            const colors = {
              "Low": this.SUCCESS_COLOR,
              "Medium": this.WARNING_COLOR,
              "High": [255, 152, 0],
              "Very High": this.DANGER_COLOR
            };
            const color = colors[riskLevel as keyof typeof colors] || [128, 128, 128];
            this.doc.setFillColor(color[0], color[1], color[2]);
            this.doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          }
        },
        didDrawPage: (data) => {
          if (!isLastPage && data.cursor) {
            // Add "Continued on next page" indicator
            this.doc.setFontSize(8);
            this.doc.setTextColor(100, 116, 139);
            this.doc.text("Continued on next page...", this.pageWidth - this.MARGIN, data.cursor.y + 10, { align: "right" });
          }
        }
      });

      this.yPosition = (this.doc as any).lastAutoTable.finalY;
      
      if (!isLastPage) {
        this.checkPageBreak(10);
      }
    }
  }

  // Helper method to extract task from hazard description
  private extractTaskFromHazard(hazard: string): string {
    const hazardLower = hazard.toLowerCase();
    if (hazardLower.includes('electrical shock') || hazardLower.includes('electric')) return 'Electrical Work';
    if (hazardLower.includes('fall') || hazardLower.includes('height')) return 'Work at Height';
    if (hazardLower.includes('fire') || hazardLower.includes('burn')) return 'Hot Work';
    if (hazardLower.includes('manual handling') || hazardLower.includes('lifting')) return 'Manual Handling';
    if (hazardLower.includes('confined space')) return 'Confined Space Entry';
    if (hazardLower.includes('excavation') || hazardLower.includes('digging')) return 'Excavation Work';
    if (hazardLower.includes('chemical') || hazardLower.includes('substance')) return 'Chemical Handling';
    if (hazardLower.includes('noise') || hazardLower.includes('vibration')) return 'Equipment Operation';
    return 'General Work Activity';
  }

  // Critical Safety Requirements (Section 5)
  private addCriticalSafetyRequirements(data: RAMSData): void {
    this.checkPageBreak(50);
    this.addTOCEntry("5. Critical Safety Requirements");

    this.yPosition += 20;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("5. CRITICAL SAFETY REQUIREMENTS", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    // Key safety requirements
    const safetyRequirements = [
      {
        title: "Personal Protective Equipment (PPE)",
        items: [
          "Safety helmet to BS EN 397",
          "Safety footwear to BS EN ISO 20345",
          "High-visibility clothing to BS EN ISO 20471",
          "Insulated gloves for electrical work",
          "Eye protection where required"
        ]
      },
      {
        title: "Electrical Safety",
        items: [
          "All electrical work to be carried out by competent persons",
          "Isolation and lock-off procedures must be followed",
          "Test equipment must be calibrated and in-date",
          "Safe working practices as per BS 7671:2018",
          "Emergency procedures clearly communicated"
        ]
      },
      {
        title: "Emergency Procedures",
        items: [
          "First aid trained personnel on site",
          "Emergency contact numbers displayed",
          "Evacuation procedures understood by all",
          "Accident reporting procedures in place",
          "Emergency equipment readily available"
        ]
      }
    ];

    safetyRequirements.forEach((section, sectionIndex) => {
      this.checkPageBreak(25);
      
      this.doc.setTextColor(...this.PRIMARY_COLOR);
      this.doc.setFontSize(12);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(`${sectionIndex + 1}. ${section.title}`, this.MARGIN, this.yPosition);
      this.yPosition += 12;

      section.items.forEach((item, itemIndex) => {
        this.checkPageBreak(8);
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(9);
        this.doc.setFont("helvetica", "normal");
        this.doc.text(`• ${item}`, this.MARGIN + 10, this.yPosition);
        this.yPosition += 6;
      });

      this.yPosition += 8;
    });

    this.addPageNumber();
  }

  // Authorisation Section (Section 6)
  private addAuthorisation(data: RAMSData, options: PDFOptions): void {
    this.checkPageBreak(100);
    this.addTOCEntry("6. Authorisation");

    this.yPosition += 20;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("6. AUTHORISATION", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    // Authorization table
    const authData = [
      ["Role", "Name", "Signature", "Date"],
      [
        "Prepared by",
        options.signOff?.preparedBy?.name || "________________________",
        "________________________",
        options.signOff?.preparedBy?.date || safeDate(data.date)
      ],
      [
        "Reviewed by",
        options.signOff?.reviewedBy?.name || "________________________",
        "________________________",
        options.signOff?.reviewedBy?.date || "____________________"
      ],
      [
        "Approved by",
        options.signOff?.approvedBy?.name || "________________________",
        "________________________",
        options.signOff?.approvedBy?.date || "____________________"
      ]
    ];

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [authData[0]],
      body: authData.slice(1),
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 11,
        halign: "center",
        cellPadding: 8
      },
      styles: {
        fontSize: 10,
        cellPadding: 8,
        lineColor: [200, 200, 200],
        lineWidth: 0.5,
        minCellHeight: 15
      },
      tableWidth: this.pageWidth - (2 * this.MARGIN),
      margin: { left: this.MARGIN, right: this.MARGIN },
      columnStyles: {
        0: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.2, fontStyle: "bold" },
        1: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.3 },
        2: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.3 },
        3: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.2 }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;

    // Authorization statement
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const authStatement = "By signing above, you confirm that this Risk Assessment has been reviewed and approved for use. All personnel must read and understand this document before commencing work.";
    
    const wrappedAuth = this.doc.splitTextToSize(authStatement, this.pageWidth - (2 * this.MARGIN));
    wrappedAuth.forEach((line: string, index: number) => {
      this.doc.text(line, this.MARGIN, this.yPosition + (index * 4.5));
    });

    this.yPosition += wrappedAuth.length * 4.5 + 10;
    this.addPageNumber();
  }

  // Worker Sign-On Section (Section 7)
  private addWorkerSignOn(data: RAMSData): void {
    this.checkPageBreak(50);
    this.addTOCEntry("7. Worker Sign-On Record");

    this.yPosition += 20;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("7. WORKER SIGN-ON RECORD", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    // Instructions
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("All personnel must sign below to confirm they have read and understood this Risk Assessment:", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    // Sign-on table
    const signOnData = [];
    for (let i = 1; i <= 15; i++) {
      signOnData.push([
        i.toString(),
        "____________________________",
        "____________________________", 
        "__________________",
        "____________________________"
      ]);
    }

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["#", "Name (Print)", "Signature", "Date", "Company"]],
      body: signOnData,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
        halign: "center",
        cellPadding: 4
      },
      styles: {
        fontSize: 9,
        cellPadding: 4,
        lineColor: [200, 200, 200],
        lineWidth: 0.5,
        minCellHeight: 12
      },
      tableWidth: this.pageWidth - (2 * this.MARGIN),
      margin: { left: this.MARGIN, right: this.MARGIN },
      columnStyles: {
        0: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.08, halign: "center" },
        1: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.25 },
        2: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.25 },
        3: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.17 },
        4: { cellWidth: (this.pageWidth - (2 * this.MARGIN)) * 0.25 }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 10;
    this.addPageNumber();
  }

  // Generate the complete PDF
  public generatePDF(data: RAMSData, options: PDFOptions = {}): string {
    // Create variable context for dynamic substitution
    const context = createVariableContext(data, options);
    
    // Add all sections
    this.addTitlePage(data, options, context);
    this.addProjectInformation(data, context);
    this.addWorkActivities(data, context);
    this.addRiskMatrix();
    this.addDetailedRiskAssessment(data);
    this.addCriticalSafetyRequirements(data);
    this.addAuthorisation(data, options);
    this.addWorkerSignOn(data);

    return this.doc.output('datauristring');
  }
}

// Export functions
export function generateRAMSPDF(data: RAMSData, options: PDFOptions = {}): string {
  const generator = new ProfessionalRAMSPDFGenerator();
  return generator.generatePDF(data, options);
}

export function generateRAMSPDFPreview(data: RAMSData, options: PDFOptions = {}): Promise<string> {
  return new Promise((resolve) => {
    const generator = new ProfessionalRAMSPDFGenerator();
    const pdfDataUri = generator.generatePDF(data, options);
    resolve(pdfDataUri);
  });
}
