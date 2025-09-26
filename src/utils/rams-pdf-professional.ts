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

// Method statement extraction
function extractMethodStatements(risks: RAMSRisk[]): string[] {
  const methods = new Set<string>();
  
  risks.forEach(risk => {
    const controls = safeText(risk.controls);
    if (controls) {
      // Extract key method statements from controls
      if (controls.toLowerCase().includes('isolat')) methods.add('Isolate power supply and lock-off');
      if (controls.toLowerCase().includes('ppe')) methods.add('Wear appropriate PPE including insulated gloves and safety boots');
      if (controls.toLowerCase().includes('supervis')) methods.add('Work under competent person supervision');
      if (controls.toLowerCase().includes('test')) methods.add('Test circuits before and after work');
      if (controls.toLowerCase().includes('harness')) methods.add('Use safety harnesses and fall protection equipment');
      if (controls.toLowerCase().includes('ventilat')) methods.add('Ensure adequate ventilation in work areas');
    }
  });
  
  return Array.from(methods);
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

  private checkPageBreak(requiredSpace: number = 30): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.FOOTER_HEIGHT - this.MARGIN) {
      this.addPageNumber();
      this.doc.addPage();
      this.currentPage++;
      this.yPosition = this.MARGIN + 5;
      this.addDocumentHeader();
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


  // Professional Risk Assessment Matrix
  private addRiskMatrix(): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 10;
    this.addDocumentHeader();
    this.addTOCEntry("3. Risk Assessment Matrix");

    // Ensure we have a new page for the matrix to prevent cropping
    this.checkPageBreak(140); // Reserve space for dramatically optimized matrix and legend
    
    this.yPosition += 12;
    // Section title
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("3. RISK ASSESSMENT MATRIX", this.MARGIN, this.yPosition);
    this.yPosition += 20;

    // Ultra-compact explanation box for landscape A4
    const boxHeight = 16;
    const boxWidth = this.pageWidth - (2 * this.MARGIN);
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, boxWidth, boxHeight, 'F');
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.setLineWidth(1);
    this.doc.rect(this.MARGIN, this.yPosition, boxWidth, boxHeight);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Risk Assessment Formula", this.pageWidth / 2, this.yPosition + 8, { align: "center" });
    
    this.doc.setTextColor(55, 65, 81);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Risk Rating = Likelihood × Consequence (Both factors scored from 1 to 5)", this.pageWidth / 2, this.yPosition + 13, { align: "center" });
    this.yPosition += 24;

    // Matrix dimensions - dramatically optimized for landscape A4 compliance
    const cellWidth = 20; // Reduced dramatically for landscape fit
    const cellHeight = 14; // Reduced dramatically for landscape fit
    const headerHeight = 12; // Reduced dramatically
    const rowHeaderWidth = 55; // Reduced for landscape fit
    const matrixWidth = rowHeaderWidth + (cellWidth * 5);
    const leftMarginForText = 20; // Compact space for vertical LIKELIHOOD text
    const matrixStartX = this.MARGIN + leftMarginForText;
    const matrixStartY = this.yPosition;

    // Top-left corner cell with "Risk Matrix" label
    this.doc.setFillColor(70, 130, 180); // Dark blue
    this.doc.rect(matrixStartX, matrixStartY, rowHeaderWidth, headerHeight, 'F');
    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(1);
    this.doc.rect(matrixStartX, matrixStartY, rowHeaderWidth, headerHeight);
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(7);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Risk Matrix", matrixStartX + rowHeaderWidth/2, matrixStartY + 7, { align: "center" });
    
    // Top header - "CONSEQUENCES" 
    this.doc.setFillColor(70, 130, 180); // Dark blue
    this.doc.rect(matrixStartX + rowHeaderWidth, matrixStartY, cellWidth * 5, headerHeight, 'F');
    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(1);
    this.doc.rect(matrixStartX + rowHeaderWidth, matrixStartY, cellWidth * 5, headerHeight);
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("CONSEQUENCES", matrixStartX + rowHeaderWidth + (cellWidth * 2.5), matrixStartY + 7, { align: "center" });

    // Consequence headers with numbers and descriptions
    const consequenceData = [
      { num: "1", name: "Negligible", desc: "Minimal injuries / no injuries" },
      { num: "2", name: "Minor", desc: "Minor injuries / first aid" },
      { num: "3", name: "Significant", desc: "Moderate injuries / medical treatment" },
      { num: "4", name: "Severe", desc: "Serious injuries / hospitalisation" },
      { num: "5", name: "Catastrophic", desc: "Death / permanent impairment" }
    ];

    consequenceData.forEach((item, index) => {
      const x = matrixStartX + rowHeaderWidth + (index * cellWidth);
      
      this.doc.setFillColor(100, 149, 237); // Lighter blue
      this.doc.rect(x, matrixStartY + headerHeight, cellWidth, cellHeight, 'F');
      this.doc.setDrawColor(0, 0, 0);
      this.doc.setLineWidth(1);
      this.doc.rect(x, matrixStartY + headerHeight, cellWidth, cellHeight);
      
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFontSize(6);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(item.num, x + cellWidth/2, matrixStartY + headerHeight + 4, { align: "center" });
      this.doc.text(item.name, x + cellWidth/2, matrixStartY + headerHeight + 8, { align: "center" });
      
      this.doc.setFontSize(4);
      this.doc.setFont("helvetica", "normal");
      // Ultra-compact text wrapping for descriptions
      const words = item.desc.split(' ');
      const maxWidth = cellWidth - 1;
      let currentLine = '';
      let lines: string[] = [];
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = this.doc.getTextWidth(testLine);
        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      
      lines.forEach((line, lineIndex) => {
        this.doc.text(line, x + cellWidth/2, matrixStartY + headerHeight + 11 + (lineIndex * 2), { align: "center" });
      });
    });

    // Likelihood rows with descriptions
    const likelihoodData = [
      { num: "5", name: "Certain", desc: "100% likely / almost 100% likely" },
      { num: "4", name: "Likely", desc: "Will probably happen / is likely to happen" },
      { num: "3", name: "Possible", desc: "Could happen or plausible" },
      { num: "2", name: "Unlikely", desc: "Improbable but could happen / not expected" },
      { num: "1", name: "Very Unlikely", desc: "Rare / not expected but remotely possible" }
    ];

    likelihoodData.forEach((item, index) => {
      const rowY = matrixStartY + headerHeight + cellHeight + (index * cellHeight);
      
      // Row header with likelihood level and description
      this.doc.setFillColor(100, 149, 237); // Lighter blue
      this.doc.rect(matrixStartX, rowY, rowHeaderWidth, cellHeight, 'F');
      this.doc.setDrawColor(0, 0, 0);
      this.doc.setLineWidth(1);
      this.doc.rect(matrixStartX, rowY, rowHeaderWidth, cellHeight);
      
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFontSize(6);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(`${item.num} ${item.name}`, matrixStartX + rowHeaderWidth/2, rowY + 4, { align: "center" });
      
      this.doc.setFontSize(4);
      this.doc.setFont("helvetica", "normal");
      // Ultra-compact text wrapping for descriptions
      const words = item.desc.split(' ');
      const maxWidth = rowHeaderWidth - 1;
      let currentLine = '';
      let lines: string[] = [];
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = this.doc.getTextWidth(testLine);
        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      
      lines.forEach((line, lineIndex) => {
        this.doc.text(line, matrixStartX + rowHeaderWidth/2, rowY + 8 + (lineIndex * 2), { align: "center" });
      });

      // Risk cells for this row - exact match to reference image
      for (let consequence = 1; consequence <= 5; consequence++) {
        const cellX = matrixStartX + rowHeaderWidth + ((consequence - 1) * cellWidth);
        const riskRating = parseInt(item.num) * consequence;
        
        // Get risk level and color exactly matching the reference image
        let riskLevel: string;
        let cellColor: [number, number, number];
        
        // Exact color matching from reference image
        if (riskRating <= 4) {
          riskLevel = "Low";
          cellColor = [123, 201, 111]; // Green from image
        } else if (riskRating <= 9) {
          riskLevel = "Moderate";
          cellColor = [255, 235, 59]; // Yellow from image
        } else if (riskRating <= 15) {
          riskLevel = "High";
          cellColor = [255, 165, 0]; // Orange from image
        } else {
          riskLevel = "Catastrophic";
          cellColor = [244, 67, 54]; // Red from image
        }
        
        this.doc.setFillColor(...cellColor);
        this.doc.rect(cellX, rowY, cellWidth, cellHeight, 'F');
        this.doc.setDrawColor(0, 0, 0);
        this.doc.setLineWidth(1);
        this.doc.rect(cellX, rowY, cellWidth, cellHeight);
        
        // Risk level text and number exactly matching reference - compact
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(5);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(riskLevel, cellX + cellWidth/2, rowY + 6, { align: "center" });
        
        this.doc.setFontSize(7);
        this.doc.text(`(${riskRating})`, cellX + cellWidth/2, rowY + 11, { align: "center" });
      }
    });

    // Add vertical "LIKELIHOOD" text on the left with ultra-compact spacing
    this.doc.setTextColor(70, 130, 180);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    
    // Ultra-compact vertical text spacing for "LIKELIHOOD" - positioned safely within margins
    const likelihoodText = "LIKELIHOOD";
    const letterSpacing = 6; // Dramatically reduced spacing
    const textStartY = matrixStartY + headerHeight + cellHeight + (cellHeight * 2.5) - (likelihoodText.length * letterSpacing / 2);
    const textX = this.MARGIN + 10; // Safe distance from page edge
    
    for (let i = 0; i < likelihoodText.length; i++) {
      this.doc.text(likelihoodText[i], textX, textStartY + (i * letterSpacing), { align: "center" });
    }

    this.yPosition = matrixStartY + headerHeight + cellHeight + (cellHeight * 5) + 8;

    // Check if we need a page break before the legend
    this.checkPageBreak(80);
    
    // Professional legend with complete data
    const legendY = this.yPosition;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(13);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK LEVEL INTERPRETATION", this.pageWidth / 2, legendY, { align: "center" });

    const legendData = [
      { range: "1-4", level: "LOW RISK", color: [34, 197, 94], action: "Monitor and review periodically. Standard precautions apply." },
      { range: "5-9", level: "MEDIUM RISK", color: [245, 158, 11], action: "Implement specific controls and monitor regularly. Risk assessment required." },
      { range: "10-16", level: "HIGH RISK", color: [249, 115, 22], action: "Immediate controls required. Work must not proceed without approval." },
      { range: "17-25", level: "VERY HIGH RISK", color: [220, 38, 127], action: "Work prohibited. Alternative methods must be found." }
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
      tableWidth: 'auto',
      columnStyles: {
        0: { halign: "center", fontStyle: "bold", cellWidth: 25 },
        1: { halign: "center", fontStyle: "bold", cellWidth: 35 },
        2: { cellWidth: 'auto' }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    // Update position after the legend table to manage spacing
    this.yPosition = (this.doc as any).lastAutoTable.finalY + 10;
    this.addPageNumber();
  }

  // Enhanced Detailed Risk Assessment
  private addDetailedRiskAssessment(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(45);
    this.addTOCEntry("5. Detailed Risk Assessment");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("5. DETAILED RISK ASSESSMENT", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    const deduplicatedRisks = deduplicateRisks(data.risks);
    
    if (deduplicatedRisks.length === 0) {
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(10);
      this.doc.text("No risks have been identified for this assessment.", this.MARGIN, this.yPosition);
      return;
    }

    // Professional risk table with improved readability and no aggressive truncation
    const riskTableData = deduplicatedRisks.map((risk, index) => [
      (index + 1).toString(),
      safeText(risk.hazard), // Remove truncation for hazard
      safeText(risk.risk), // Remove truncation for who might be harmed
      safeNumber(risk.likelihood).toString(),
      safeNumber(risk.severity).toString(),
      `${safeNumber(risk.riskRating)}`,
      getRiskLevel(risk.riskRating),
      safeText(risk.controls), // Remove truncation for control measures
      `${safeNumber(risk.residualRisk)}`,
      getRiskLevel(risk.residualRisk)
    ]);

    // Calculate available table width with equal margins
    const availableWidth = this.pageWidth - (2 * this.MARGIN);
    
    // Enhanced professional table for landscape format with improved dimensions
    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Ref", "Hazard Identified", "Who Might Be Harmed", "L", "S", "Initial Risk", "Risk Level", "Control Measures / Precautions", "Residual Risk", "Final Level"]],
      body: riskTableData,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9, // Increased from 8
        halign: "center",
        cellPadding: 4, // Increased from 3
        minCellHeight: 15 // Increased from 12
      },
      styles: {
        fontSize: 8, // Increased from 7
        cellPadding: 4, // Increased from 3
        lineColor: [200, 200, 200],
        lineWidth: 0.5,
        valign: "top", // Changed from middle to top for better text alignment
        minCellHeight: 15, // Increased from 10
        overflow: 'linebreak'
      },
      tableWidth: availableWidth,
      margin: { left: this.MARGIN, right: this.MARGIN },
      tableLineColor: [200, 200, 200],
      tableLineWidth: 0.5,
      columnStyles: {
        0: { halign: "center", cellWidth: availableWidth * 0.04, fontStyle: "bold" }, // 4% - Ref
        1: { cellWidth: availableWidth * 0.17, valign: "top" }, // 17% - Hazard
        2: { cellWidth: availableWidth * 0.14, valign: "top" }, // 14% - Who might be harmed
        3: { halign: "center", cellWidth: availableWidth * 0.04, fontStyle: "bold" }, // 4% - L
        4: { halign: "center", cellWidth: availableWidth * 0.04, fontStyle: "bold" }, // 4% - S
        5: { halign: "center", cellWidth: availableWidth * 0.06, fontStyle: "bold" }, // 6% - Initial Risk
        6: { halign: "center", cellWidth: availableWidth * 0.09, fontStyle: "bold" }, // 9% - Risk Level
        7: { cellWidth: availableWidth * 0.26, valign: "top" }, // 26% - Control Measures
        8: { halign: "center", cellWidth: availableWidth * 0.06, fontStyle: "bold" }, // 6% - Residual Risk
        9: { halign: "center", cellWidth: availableWidth * 0.10, fontStyle: "bold" } // 10% - Final Level
      },
      didParseCell: (data: any) => {
        // Enhanced color coding for risk levels with better contrast
        if (data.column.index === 6 || data.column.index === 9) {
          const level = data.cell.text[0];
          if (level === "Low") {
            data.cell.styles.fillColor = [34, 197, 94];
            data.cell.styles.textColor = [255, 255, 255];
          } else if (level === "Medium") {
            data.cell.styles.fillColor = [245, 158, 11];
            data.cell.styles.textColor = [0, 0, 0];
          } else if (level === "High") {
            data.cell.styles.fillColor = [249, 115, 22];
            data.cell.styles.textColor = [255, 255, 255];
          } else if (level === "Very High") {
            data.cell.styles.fillColor = [220, 38, 127];
            data.cell.styles.textColor = [255, 255, 255];
          }
          
          if (data.cell.styles.fillColor) {
            data.cell.styles.fontStyle = "bold";
          }
        }

        // Highlight initial and residual risk numbers
        if (data.column.index === 5 || data.column.index === 8) {
          const riskValue = parseInt(data.cell.text[0]);
          if (riskValue <= 4) {
            data.cell.styles.fillColor = [34, 197, 94];
            data.cell.styles.textColor = [255, 255, 255];
          } else if (riskValue <= 9) {
            data.cell.styles.fillColor = [245, 158, 11];
            data.cell.styles.textColor = [0, 0, 0];
          } else if (riskValue <= 16) {
            data.cell.styles.fillColor = [249, 115, 22];
            data.cell.styles.textColor = [255, 255, 255];
          } else {
            data.cell.styles.fillColor = [220, 38, 127];
            data.cell.styles.textColor = [255, 255, 255];
          }
        }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;
    this.addPageNumber();
  }

  // Professional Safety Requirements Section  
  private addSafetyInformation(context: VariableContext): void {
    this.checkPageBreak(60);
    this.addTOCEntry("4. Critical Safety Requirements");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("4. CRITICAL SAFETY REQUIREMENTS", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    // Professional warning box
    this.doc.setFillColor(254, 242, 242);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 35, 'F');
    this.doc.setDrawColor(220, 38, 127);
    this.doc.setLineWidth(2);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 35);

    this.doc.setFillColor(220, 38, 127);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 8, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("⚠ MANDATORY SAFETY REQUIREMENTS", this.pageWidth / 2, this.yPosition + 6, { align: "center" });

    this.doc.setTextColor(51, 65, 85);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const warningText = "These requirements are mandatory for all electrical work. Failure to comply may result in serious injury or death and could constitute a criminal offence under health and safety legislation.";
    const wrappedWarning = this.doc.splitTextToSize(warningText, this.pageWidth - (2 * this.MARGIN) - 12);
    wrappedWarning.forEach((line: string, index: number) => {
      this.doc.text(line, this.pageWidth / 2, this.yPosition + 14 + (index * 4), { align: "center" });
    });

    this.yPosition += 45;

    const safetyPoints = [
      "All personnel must be competent and appropriately trained for electrical work",
      "Isolate and securely lock-off all relevant power supplies before work commences",
      "Use appropriate PPE including insulated gloves, safety footwear, and eye protection",
      "Test all circuits dead using properly calibrated voltage detection equipment",
      "Maintain safe working distances from live conductors as per BS 7671:2018+A2:2022",
      "Have emergency procedures and first aid readily available",
      "Report any unsafe conditions immediately to supervision",
      "Follow permit to work procedures where applicable"
    ];

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");

    safetyPoints.forEach((point, index) => {
      // Use proper bullet character with consistent spacing
      const bulletPoint = `• ${point}`;
      const wrappedPoint = this.doc.splitTextToSize(bulletPoint, this.pageWidth - (2 * this.MARGIN) - 20);
      
      wrappedPoint.forEach((line: string, lineIndex: number) => {
        // Proper indentation with hanging indent for wrapped text
        const xPosition = lineIndex === 0 ? this.MARGIN + 8 : this.MARGIN + 12;
        this.doc.text(line, xPosition, this.yPosition + (lineIndex * 4.5));
      });
      
      this.yPosition += Math.max(8, wrappedPoint.length * 4 + 2);
    });

    this.yPosition += 8; // Optimized section spacing

    this.addPageNumber();
  }

  // Enhanced Approvals Section
  private addEnhancedApprovals(signOff?: SignOff, context?: VariableContext): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN;
    this.addTOCEntry("5. Authorisation & Sign-off");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("5. AUTHORISATION & SIGN-OFF", this.MARGIN, this.yPosition);
    this.yPosition += 25;

    const signatureBoxHeight = 50;
    const signatureBoxWidth = (this.pageWidth - (4 * this.MARGIN)) / 3;

    // Three-tier approval system
    const approvals = [
      { title: "PREPARED BY", data: signOff?.preparedBy, color: [34, 197, 94] as [number, number, number] },
      { title: "REVIEWED BY", data: signOff?.reviewedBy, color: [255, 193, 7] as [number, number, number] },
      { title: "APPROVED BY", data: signOff?.approvedBy, color: [239, 68, 68] as [number, number, number] }
    ];

    approvals.forEach((approval, index) => {
      const x = this.MARGIN + (index * (signatureBoxWidth + this.MARGIN));
      
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(12);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(approval.title, x, this.yPosition);
      
      this.doc.setDrawColor(0, 0, 0);
      this.doc.setLineWidth(1);
      this.doc.rect(x, this.yPosition + 5, signatureBoxWidth, signatureBoxHeight);
      
      if (approval.data) {
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(9);
        this.doc.setFont("helvetica", "normal");
        this.doc.text(`Name: ${approval.data.name}`, x + 5, this.yPosition + signatureBoxHeight - 18);
        this.doc.text(`Date: ${approval.data.date}`, x + 5, this.yPosition + signatureBoxHeight - 8);
        
        // Render actual signature if available
        if (approval.data.signatureDataUrl) {
          try {
            this.doc.addImage(
              approval.data.signatureDataUrl,
              'PNG',
              x + 5,
              this.yPosition + 15,
              40,
              8
            );
          } catch (error) {
            // Fallback if signature fails to render
            this.doc.setFontSize(8);
            this.doc.setTextColor(100, 100, 100);
            this.doc.text("Digital Signature", x + 5, this.yPosition + 25);
          }
        } else {
          // Show placeholder text when no signature
          this.doc.setFontSize(8);
          this.doc.setTextColor(100, 100, 100);
          this.doc.text("Awaiting Signature", x + 5, this.yPosition + 25);
        }
      }
    });

    this.yPosition += signatureBoxHeight + 20;

    // Document control information
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 32, 'F');
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 32);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DOCUMENT CONTROL", this.pageWidth / 2, this.yPosition + 7, { align: "center" });

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    const docInfo = [
      `Document: RAMS-${safeText(context?.project_name).replace(/\s+/g, '_')}-${formatDate(new Date(), "ddMMyyyy")}`,
      `Version: v1.0`,
      `Generated: ${context?.document_generated || safeDatetime(new Date())}`,
      `Status: CONFIDENTIAL`
    ];

    docInfo.forEach((info, index) => {
      this.doc.text(info, this.pageWidth / 2, this.yPosition + 14 + (index * 4), { align: "center" });
    });

    this.addPageNumber();
  }

  // Enhanced footer for all pages
  private addEnhancedFooter(context: VariableContext, pageNum: number): void {
    // Footer is now removed as requested
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
    this.yPosition += 8;

    // Add a line under the title
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.setLineWidth(1);
    this.doc.line(this.MARGIN, this.yPosition, this.pageWidth - this.MARGIN, this.yPosition);
    this.yPosition += 10;

    const tocData = this.toc.map(item => [item.title, item.page.toString()]);

    autoTable(this.doc, {
      startY: this.yPosition,
      body: tocData,
      theme: "grid",
      tableWidth: 'auto',
      styles: {
        fontSize: 11,
        cellPadding: 6,
        lineColor: [200, 200, 200],
        lineWidth: 0.5
      },
      columnStyles: {
        0: { fontStyle: "normal", cellWidth: 'auto' },
        1: { halign: "right", fontStyle: "bold", cellWidth: 20 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.addPageNumber();
  }

  // Sign-On Sheet Section
  private addSignOnSheet(context?: VariableContext): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN;
    this.addTOCEntry("6. Worker Sign-On Sheet");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("6. WORKER SIGN-ON SHEET", this.MARGIN, this.yPosition);

    this.yPosition += 16;
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "normal");
    
    const instructionText = "All workers must sign below to confirm they have read and understood this risk assessment and method statement, and acknowledge the hazards identified.";
    const wrappedInstruction = this.doc.splitTextToSize(instructionText, this.pageWidth - 2 * this.MARGIN);
    this.doc.text(wrappedInstruction, this.MARGIN, this.yPosition);
    this.yPosition += wrappedInstruction.length * 6 + 10;

    // Create sign-on table
    const signOnData = [];
    
    // Add 6 empty rows for manual sign-on
    for (let i = 0; i < 6; i++) {
      signOnData.push(['', '', '', '']);
    }

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [['Name', 'Signature', 'Occupation', 'Date']],
      body: signOnData,
      theme: 'grid',
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle'
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 4,
        halign: 'left',
        valign: 'middle',
        minCellHeight: 16
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Name
        1: { cellWidth: 'auto' }, // Signature  
        2: { cellWidth: 'auto' }, // Occupation
        3: { cellWidth: 'auto' }  // Date
      },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        cellPadding: 4
      },
      margin: { left: this.MARGIN, right: this.MARGIN },
      tableWidth: 'auto'
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 16;

    // Add note about record keeping
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "italic");
    this.doc.setTextColor(80, 80, 80);
    const noteText = "Note: This sign-on sheet must be retained as part of the project safety records for audit purposes.";
    const wrappedNote = this.doc.splitTextToSize(noteText, this.pageWidth - 2 * this.MARGIN);
    this.doc.text(wrappedNote, this.MARGIN, this.yPosition);

    this.addPageNumber();
  }

  // Main generation method
  public generatePDF(data: RAMSData, options: PDFOptions = {}): string {
    // Create variable context for dynamic substitution
    const context = createVariableContext(data, options);
    
    // Add sections in order (TOC entries will be populated)
    this.addTitlePage(data, options, context);
    this.addProjectInformation(data, context);
    this.addWorkActivities(data, context);
    this.addRiskMatrix();
    this.addDetailedRiskAssessment(data, context);
    this.addSafetyInformation(context);
    this.addEnhancedApprovals(options.signOff, context);
    this.addSignOnSheet(context);

    // Add enhanced footer to all pages
    for (let i = 1; i <= this.currentPage; i++) {
      this.doc.setPage(i);
      this.addEnhancedFooter(context, i);
    }

    // Generate table of contents after all sections are added
    this.addTableOfContents();

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