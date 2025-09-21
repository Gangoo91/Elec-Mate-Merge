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
    // Professional header matching template
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(0, 0, this.pageWidth, 45, 'F');
    
    // Company branding area (SPIRE SAFETY style)
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, 8, 80, 25, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(context.company_name.toUpperCase(), this.MARGIN + 40, 18, { align: "center" });
    this.doc.setFontSize(10);
    this.doc.text("RISK ASSESSMENT", this.MARGIN + 40, 28, { align: "center" });

    // Document title (center-right)
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK ASSESSMENT", this.pageWidth - 95, 15, { align: "center" });
    
    // Reference number area - standardized format
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "normal");
    const titleDocRef = `RAMS-Office_Electrical_Retrofit-21092025`;
    this.doc.text(`Ref: ${titleDocRef}`, this.pageWidth - 95, 25, { align: "center" });
    
    // Authorization fields
    this.doc.setFontSize(10);
    this.doc.text("Authorised By: _________________", this.pageWidth - 115, 35);
    this.doc.text(`Rev: 1.0    Date: ${context.assessment_date}`, this.pageWidth - 55, 35);

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
    this.doc.text("✓ BS 7671:2018+A3:2024 COMPLIANT", this.pageWidth / 2, this.yPosition + 43, { align: "center" });

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

  // Work Activities Section  
  private addWorkActivities(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(20);
    this.addTOCEntry("3. Work Activities");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("3. WORK ACTIVITIES", this.MARGIN, this.yPosition);
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

  // Risk Summary Section
  private addRiskSummary(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(80);
    this.addTOCEntry("4. Risk Summary");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("4. RISK SUMMARY", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    // Clean summary statistics without blue border
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK ASSESSMENT SUMMARY", this.MARGIN, this.yPosition);
    this.yPosition += 10;
    
    const summaryData = [
      `Total Risks: ${context.total_risks}`,
      `Low Residual: ${context.low_residual}`,
      `Medium: ${context.medium_residual}`,
      `High: ${context.high_residual}`,
      `Very High: ${context.very_high_residual}`
    ];

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    summaryData.forEach((item, index) => {
      const x = this.MARGIN + (index * 45);
      this.doc.text(item, x, this.yPosition);
    });

    this.yPosition += 25;
    this.addPageNumber();
  }

  // Professional Risk Assessment Matrix
  private addRiskMatrix(): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 10;
    this.addDocumentHeader();
    this.addTOCEntry("2. Risk Assessment Matrix");

    this.yPosition += 16;
    // Section title
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("2. RISK ASSESSMENT MATRIX", this.MARGIN, this.yPosition);
    this.yPosition += 25;

    // Professional explanation box
    const boxHeight = 28;
    const boxWidth = this.pageWidth - (2 * this.MARGIN);
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, boxWidth, boxHeight, 'F');
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.setLineWidth(1);
    this.doc.rect(this.MARGIN, this.yPosition, boxWidth, boxHeight);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Risk Assessment Formula", this.pageWidth / 2, this.yPosition + 12, { align: "center" });
    
    this.doc.setTextColor(55, 65, 81);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Risk Rating = Likelihood × Consequence (Both factors scored from 1 to 5)", this.pageWidth / 2, this.yPosition + 22, { align: "center" });
    this.yPosition += 45;

    // Matrix dimensions - wider layout to match image exactly with more left margin
    const cellWidth = 32;
    const cellHeight = 40;
    const headerHeight = 20;
    const rowHeaderWidth = 75;
    const matrixWidth = rowHeaderWidth + (cellWidth * 5);
    const leftMarginForText = 35; // Extra space for vertical LIKELIHOOD text
    const matrixStartX = this.MARGIN + leftMarginForText;
    const matrixStartY = this.yPosition;

    // Top-left corner cell with "Risk Matrix" label
    this.doc.setFillColor(70, 130, 180); // Dark blue
    this.doc.rect(matrixStartX, matrixStartY, rowHeaderWidth, headerHeight, 'F');
    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(1);
    this.doc.rect(matrixStartX, matrixStartY, rowHeaderWidth, headerHeight);
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Risk Matrix", matrixStartX + rowHeaderWidth/2, matrixStartY + 12, { align: "center" });
    
    // Top header - "CONSEQUENCES" 
    this.doc.setFillColor(70, 130, 180); // Dark blue
    this.doc.rect(matrixStartX + rowHeaderWidth, matrixStartY, cellWidth * 5, headerHeight, 'F');
    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(1);
    this.doc.rect(matrixStartX + rowHeaderWidth, matrixStartY, cellWidth * 5, headerHeight);
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("CONSEQUENCES", matrixStartX + rowHeaderWidth + (cellWidth * 2.5), matrixStartY + 12, { align: "center" });

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
      this.doc.setFontSize(9);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(item.num, x + cellWidth/2, matrixStartY + headerHeight + 8, { align: "center" });
      this.doc.text(item.name, x + cellWidth/2, matrixStartY + headerHeight + 16, { align: "center" });
      
      this.doc.setFontSize(7);
      this.doc.setFont("helvetica", "normal");
      // Simple text wrapping for descriptions
      const words = item.desc.split(' ');
      const maxWidth = cellWidth - 4;
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
        this.doc.text(line, x + cellWidth/2, matrixStartY + headerHeight + 24 + (lineIndex * 4), { align: "center" });
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
      this.doc.setFontSize(9);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(`${item.num} ${item.name}`, matrixStartX + rowHeaderWidth/2, rowY + 8, { align: "center" });
      
      this.doc.setFontSize(7);
      this.doc.setFont("helvetica", "normal");
      // Simple text wrapping for descriptions
      const words = item.desc.split(' ');
      const maxWidth = rowHeaderWidth - 4;
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
        this.doc.text(line, matrixStartX + rowHeaderWidth/2, rowY + 16 + (lineIndex * 4), { align: "center" });
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
        
        // Risk level text and number exactly matching reference
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(8);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(riskLevel, cellX + cellWidth/2, rowY + 15, { align: "center" });
        
        this.doc.setFontSize(14);
        this.doc.text(`(${riskRating})`, cellX + cellWidth/2, rowY + 26, { align: "center" });
      }
    });

    // Add vertical "LIKELIHOOD" text on the left with proper spacing
    this.doc.setTextColor(70, 130, 180);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    
    // Simple vertical text spacing for "LIKELIHOOD" - positioned safely within margins
    const likelihoodText = "LIKELIHOOD";
    const letterSpacing = 12;
    const textStartY = matrixStartY + headerHeight + cellHeight + (cellHeight * 2.5) - (likelihoodText.length * letterSpacing / 2);
    const textX = this.MARGIN + 15; // Safe distance from page edge
    
    for (let i = 0; i < likelihoodText.length; i++) {
      this.doc.text(likelihoodText[i], textX, textStartY + (i * letterSpacing), { align: "center" });
    }

    this.yPosition = matrixStartY + headerHeight + cellHeight + (cellHeight * 5) + 20;

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

    // Professional risk table with optimized landscape layout that fits page width
    const riskTableData = deduplicatedRisks.map((risk, index) => [
      (index + 1).toString(),
      truncateText(safeText(risk.hazard), 30),
      truncateText(safeText(risk.risk), 25),
      safeNumber(risk.likelihood).toString(),
      safeNumber(risk.severity).toString(),
      `${safeNumber(risk.riskRating)}`,
      getRiskLevel(risk.riskRating),
      truncateText(safeText(risk.controls), 50),
      `${safeNumber(risk.residualRisk)}`,
      getRiskLevel(risk.residualRisk)
    ]);

    // Calculate available table width (page width minus equal margins)
    const availableWidth = this.pageWidth - (2 * this.MARGIN);
    
    // Enhanced professional table for landscape format with proper fit and equal margins
    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Ref", "Hazard Identified", "Who Might Be Harmed", "L", "S", "Initial Risk", "Risk Level", "Control Measures / Precautions", "Residual Risk", "Final Level"]],
      body: riskTableData,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8,
        halign: "center",
        cellPadding: 3,
        minCellHeight: 12
      },
      styles: {
        fontSize: 7,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.5,
        valign: "middle",
        minCellHeight: 10,
        overflow: 'linebreak'
      },
      tableWidth: availableWidth,
      margin: { left: this.MARGIN, right: this.MARGIN },
      tableLineColor: [200, 200, 200],
      tableLineWidth: 0.5,
      columnStyles: {
        0: { halign: "center", cellWidth: availableWidth * 0.05, fontStyle: "bold" }, // 5% - Ref
        1: { cellWidth: availableWidth * 0.17, valign: "top" }, // 17% - Hazard
        2: { cellWidth: availableWidth * 0.14, valign: "top" }, // 14% - Who might be harmed
        3: { halign: "center", cellWidth: availableWidth * 0.04, fontStyle: "bold" }, // 4% - L
        4: { halign: "center", cellWidth: availableWidth * 0.04, fontStyle: "bold" }, // 4% - S
        5: { halign: "center", cellWidth: availableWidth * 0.07, fontStyle: "bold" }, // 7% - Initial Risk
        6: { halign: "center", cellWidth: availableWidth * 0.11, fontStyle: "bold" }, // 11% - Risk Level
        7: { cellWidth: availableWidth * 0.26, valign: "top" }, // 26% - Control Measures
        8: { halign: "center", cellWidth: availableWidth * 0.07, fontStyle: "bold" }, // 7% - Residual Risk
        9: { halign: "center", cellWidth: availableWidth * 0.11, fontStyle: "bold" } // 11% - Final Level (total: 100%)
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

  // Professional Method Statement Section
  private addMethodStatement(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(50);
    this.addTOCEntry("6. Method Statement");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("6. METHOD STATEMENT", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    // Professional section header
    this.doc.setFillColor(...this.LIGHT_GRAY);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 12, 'F');
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("SAFE WORK PROCEDURES", this.pageWidth / 2, this.yPosition + 8, { align: "center" });
    this.yPosition += 18;

    const methodStatements = extractMethodStatements(data.risks);

    // Professional method list
    if (methodStatements.length === 0) {
      const defaultMethods = [
        "Isolate and lock-off electrical supply before commencing work",
        "Test circuits dead using approved voltage indicators",
        "Wear appropriate PPE including insulated gloves and safety footwear",
        "Maintain safe working distances from live conductors",
        "Use properly rated tools and equipment for electrical work",
        "Implement appropriate barriers and warning signs"
      ];
      
      defaultMethods.forEach((method, index) => {
        this.checkPageBreak(8);
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(10);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(`${index + 1}.`, this.MARGIN + 5, this.yPosition);
        this.doc.setFont("helvetica", "normal");
        const wrappedMethod = this.doc.splitTextToSize(method, this.pageWidth - 2 * this.MARGIN - 20);
        wrappedMethod.forEach((line: string, lineIndex: number) => {
          this.doc.text(line, this.MARGIN + 18, this.yPosition + (lineIndex * 5));
        });
        this.yPosition += Math.max(6, wrappedMethod.length * 4 + 2);
      });
    } else {
      methodStatements.forEach((statement, index) => {
        this.checkPageBreak(8);
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(10);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(`${index + 1}.`, this.MARGIN + 5, this.yPosition);
        this.doc.setFont("helvetica", "normal");
        const wrappedStatement = this.doc.splitTextToSize(statement, this.pageWidth - 2 * this.MARGIN - 20);
        wrappedStatement.forEach((line: string, lineIndex: number) => {
          this.doc.text(line, this.MARGIN + 18, this.yPosition + (lineIndex * 5));
        });
        this.yPosition += Math.max(6, wrappedStatement.length * 4 + 2);
      });
    }

    this.yPosition += 4;
    this.addPageNumber();
  }

  // Professional Safety Requirements Section  
  private addSafetyInformation(context: VariableContext): void {
    this.checkPageBreak(60);
    this.addTOCEntry("7. Critical Safety Requirements");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("7. CRITICAL SAFETY REQUIREMENTS", this.MARGIN, this.yPosition);
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
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("8. Authorisation & Sign-off");

    this.yPosition += 16;
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("8. AUTHORISATION & SIGN-OFF", this.MARGIN, this.yPosition);
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
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 30, 'F');
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 30);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DOCUMENT CONTROL", this.pageWidth / 2, this.yPosition + 8, { align: "center" });

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const docInfo = [
      `Document: RAMS-Office_Electrical_Retrofit-21092025`,
      `Version: v1.0`,
      `Generated: ${context?.document_generated || safeDatetime(new Date())}`,
      `Status: CONFIDENTIAL`
    ];

    docInfo.forEach((info, index) => {
      this.doc.text(info, this.pageWidth / 2, this.yPosition + 15 + (index * 3.5), { align: "center" });
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

  // Main generation method
  public generatePDF(data: RAMSData, options: PDFOptions = {}): string {
    // Create variable context for dynamic substitution
    const context = createVariableContext(data, options);
    
    // Add sections in order (TOC entries will be populated)
    this.addTitlePage(data, options, context);
    this.addRiskMatrix();
    this.addWorkActivities(data, context);
    this.addRiskSummary(data, context);
    this.addDetailedRiskAssessment(data, context);
    this.addMethodStatement(data, context);
    this.addSafetyInformation(context);
    this.addEnhancedApprovals(options.signOff, context);

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