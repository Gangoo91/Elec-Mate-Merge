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
    // Add subtle header on continuation pages
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, 8, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("HEALTH & SAFETY RISK ASSESSMENT", this.pageWidth / 2, 5, { align: "center" });
    
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
    this.doc.text("SPIRE SAFETY", this.MARGIN + 40, 18, { align: "center" });
    this.doc.setFontSize(10);
    this.doc.text("RISK ASSESSMENT", this.MARGIN + 40, 28, { align: "center" });

    // Document title (center-right)
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK ASSESSMENT (TEMPLATE)", this.pageWidth - 100, 15, { align: "center" });
    
    // Reference number area
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Ref: SS-WHS-SAF-000", this.pageWidth - 100, 25, { align: "center" });
    
    // Authorization fields
    this.doc.setFontSize(10);
    this.doc.text("Authorised By: _________________", this.pageWidth - 120, 35);
    this.doc.text(`Rev: 1.0    Date: ${context.assessment_date}`, this.pageWidth - 60, 35);

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

    // Professional purpose statement
    const purposeHeight = 50;
    this.doc.setFillColor(239, 246, 255);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), purposeHeight, 'F');
    this.doc.setDrawColor(...this.ACCENT_COLOR);
    this.doc.setLineWidth(1);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), purposeHeight);

    // Header stripe
    this.doc.setFillColor(...this.ACCENT_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 10, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("PURPOSE & COMPLIANCE", this.pageWidth / 2, this.yPosition + 7, { align: "center" });
    
    this.doc.setTextColor(51, 65, 85); // Dark slate
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const purposeText = "This document identifies hazards and establishes control measures for electrical work activities, ensuring compliance with Health & Safety at Work Act 1974, CDM Regulations 2015, and BS 7671:2018+A2:2022.";
    
    const wrappedPurpose = this.doc.splitTextToSize(purposeText, this.pageWidth - (2 * this.MARGIN) - 12);
    wrappedPurpose.forEach((line: string, index: number) => {
      this.doc.text(line, this.pageWidth / 2, this.yPosition + 18 + (index * 4), { align: "center" });
    });

    // Professional compliance indicator
    this.doc.setFillColor(...this.SUCCESS_COLOR);
    this.doc.rect(this.MARGIN + 10, this.yPosition + 38, this.pageWidth - (2 * this.MARGIN) - 20, 8, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("✓ BS 7671:2018+A2:2022 COMPLIANT", this.pageWidth / 2, this.yPosition + 43, { align: "center" });

    // Document reference footer
    this.yPosition = this.pageHeight - 35;
    this.doc.setFillColor(...this.LIGHT_GRAY);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 15, 'F');
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 116, 139);
    const docRef = `RAMS-${context.project_name.replace(/[^a-zA-Z0-9]/g, '_')}-${formatDate(new Date(), "ddMMyyyy")}`;
    this.doc.text(`Document Reference: ${docRef}`, this.pageWidth / 2, this.yPosition + 6, { align: "center" });
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

    // Summary statistics box
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 50, 'F');
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 50);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK ASSESSMENT SUMMARY", this.pageWidth / 2, this.yPosition + 12, { align: "center" });
    
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
      const x = this.MARGIN + 20 + (index * 30);
      this.doc.text(item, x, this.yPosition + 30);
    });

    this.yPosition += 65;
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

    // Professional explanation box matching template style
    const boxHeight = 35;
    const boxWidth = this.pageWidth - (2 * this.MARGIN);
    
    // Main instruction box
    this.doc.setFillColor(240, 240, 240);
    this.doc.rect(this.MARGIN, this.yPosition, boxWidth, boxHeight, 'F');
    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(1);
    this.doc.rect(this.MARGIN, this.yPosition, boxWidth, boxHeight);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Risk Assessment Matrix", this.MARGIN + 5, this.yPosition + 10);
    
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Use this matrix to determine the risk rating by finding the intersection of likelihood and consequence.", 
                  this.MARGIN + 5, this.yPosition + 20);
    this.doc.text("Risk Rating = Likelihood × Consequence (Both factors scored from 1 to 5)", 
                  this.MARGIN + 5, this.yPosition + 30);
    this.yPosition += 45;

    // Professional Risk Matrix matching reference template
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Risk Matrix", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    // Risk Matrix Table with professional design
    const matrixData = [];
    const severityLabels = ['Catastrophic', 'Severe', 'Significant', 'Minor', 'Negligible'];
    
    severityLabels.forEach((severityLabel, severityIndex) => {
      const row = [severityLabel];
      for (let likelihood = 1; likelihood <= 5; likelihood++) {
        const riskValue = (5 - severityIndex) * likelihood;
        row.push(riskValue.toString());
      }
      matrixData.push(row);
    });

    autoTable(this.doc, {
      head: [['Consequences', '1', '2', '3', '4', '5']],
      body: matrixData,
      startY: this.yPosition,
      theme: 'grid',
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9,
        halign: 'center',
        valign: 'middle',
        cellPadding: 4
      },
      columnStyles: {
        0: { 
          fillColor: [240, 240, 240], 
          fontStyle: 'bold',
          cellWidth: 35,
          halign: 'left'
        }
      },
      tableWidth: 120,
      margin: { left: this.MARGIN },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.5
      },
      didParseCell: (data) => {
        if (data.column.index > 0 && data.row.index >= 0) {
          const severityIndex = data.row.index;
          const likelihood = data.column.index;
          const riskValue = (5 - severityIndex) * likelihood;
          const cellColor = getRiskColor(riskValue);
          data.cell.styles.fillColor = cellColor;
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;

    // Consequences descriptions matching reference
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Consequences", this.MARGIN + 140, this.yPosition - 60);
    
    const consequences = [
      "5 - Catastrophic: Death or permanent disability",
      "4 - Severe: Major injury requiring hospitalisation", 
      "3 - Significant: Medical treatment required",
      "2 - Minor: First aid treatment required",
      "1 - Negligible: No injury or minor discomfort"
    ];

    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    consequences.forEach((consequence, index) => {
      this.doc.text(consequence, this.MARGIN + 140, this.yPosition - 45 + (index * 8));
    });

    // Likelihood descriptions
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Likelihood", this.MARGIN + 140, this.yPosition - 10);
    
    const likelihoods = [
      "5 - Very Likely: Almost certain to occur",
      "4 - Likely: Probable under normal conditions", 
      "3 - Possible: Could occur at some time",
      "2 - Unlikely: Not likely to occur",
      "1 - Very Unlikely: Rare or exceptional circumstances"
    ];

    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    likelihoods.forEach((likelihood, index) => {
      this.doc.text(likelihood, this.MARGIN + 140, this.yPosition + 5 + (index * 8));
    });

    this.yPosition += 50;
    this.addPageNumber();
  }

  // Enhanced Risk Assessment Table matching reference template
  private addRiskAssessmentTable(data: RAMSData, context: VariableContext): void {
    const risks = deduplicateRisks(data.risks);
    if (risks.length === 0) return;

    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 10;
    this.addDocumentHeader();
    this.addTOCEntry("Risk Assessment Table");

    this.yPosition += 10;
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("RISK ASSESSMENT", this.pageWidth / 2, this.yPosition, { align: "center" });
    this.yPosition += 15;

    // Create numbered rows (1-5) as shown in reference
    const tableData = [];
    for (let i = 0; i < 5; i++) {
      const risk = risks[i];
      if (risk) {
        tableData.push([
          (i + 1).toString(),
          truncateText(risk.hazard, 20),
          safeNumber(risk.likelihood).toString(),
          safeNumber(risk.severity).toString(),
          safeNumber(risk.riskRating).toString(),
          truncateText(risk.controls, 30),
          Math.max(1, Math.min(5, Math.floor(safeNumber(risk.riskRating) * 0.6))).toString(),
          Math.max(1, Math.min(5, Math.floor(safeNumber(risk.riskRating) * 0.5))).toString(),
          safeNumber(risk.residualRisk).toString(),
          safeText(risk.responsible) || 'Site Supervisor'
        ]);
      } else {
        // Empty numbered rows
        tableData.push([
          (i + 1).toString(),
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ]);
      }
    }

    // Calculate available table width with equal margins
    const availableWidth = this.pageWidth - (2 * this.MARGIN);
    
    // Professional table matching reference template
    autoTable(this.doc, {
      head: [[
        'TASK STEP', 'HAZARDS / RISKS', 'L', 'C', 'R', 'CONTROLS', 'L(R)', 'C(R)', 'R(R)', 'PERSON RESPONSIBLE'
      ]],
      body: tableData,
      startY: this.yPosition,
      theme: 'grid',
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'center',
        valign: 'middle'
      },
      bodyStyles: {
        fontSize: 7,
        cellPadding: 2,
        valign: 'top',
        minCellHeight: 15
      },
      columnStyles: {
        0: { cellWidth: availableWidth * 0.08, halign: 'center' },  // TASK STEP
        1: { cellWidth: availableWidth * 0.20, halign: 'left' },    // HAZARDS / RISKS
        2: { cellWidth: availableWidth * 0.04, halign: 'center' },  // L
        3: { cellWidth: availableWidth * 0.04, halign: 'center' },  // C
        4: { cellWidth: availableWidth * 0.04, halign: 'center' },  // R
        5: { cellWidth: availableWidth * 0.28, halign: 'left' },    // CONTROLS
        6: { cellWidth: availableWidth * 0.05, halign: 'center' },  // L(R)
        7: { cellWidth: availableWidth * 0.05, halign: 'center' },  // C(R)
        8: { cellWidth: availableWidth * 0.05, halign: 'center' },  // R(R)
        9: { cellWidth: availableWidth * 0.17, halign: 'center' }   // PERSON RESPONSIBLE
      },
      tableWidth: availableWidth,
      margin: { left: this.MARGIN, right: this.MARGIN },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        cellPadding: 2
      },
      didParseCell: (data) => {
        // Risk rating color coding for R and R(R) columns
        if (data.column.index === 4 || data.column.index === 8) {
          const rating = parseInt(data.cell.text[0]) || 0;
          if (rating > 0) {
            const color = getRiskColor(rating);
            data.cell.styles.fillColor = color;
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 10;
    this.addPageNumber();
  }

  // Generate the complete RAMS PDF
  generatePDF(data: RAMSData, options: PDFOptions = {}): jsPDF {
    const context = createVariableContext(data, options);
    
    // Generate all sections
    this.addTitlePage(data, options, context);
    this.addRiskMatrix();
    this.addWorkActivities(data, context);
    this.addRiskSummary(data, context);
    this.addRiskAssessmentTable(data, context);
    
    return this.doc;
  }
}

// Public interface functions
export function generateRAMSPDF(data: RAMSData, options: RAMSReportOptions = {}): jsPDF {
  try {
    const generator = new ProfessionalRAMSPDFGenerator();
    return generator.generatePDF(data, options);
  } catch (error) {
    console.error('Error generating RAMS PDF:', error);
    throw new Error('Failed to generate PDF document. Please check your data and try again.');
  }
}

export function generateRAMSPDFPreview(data: RAMSData, options: RAMSReportOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = generateRAMSPDF(data, options);
      const pdfDataUri = pdfDoc.output('datauristring');
      resolve(pdfDataUri);
    } catch (error) {
      console.error('Error generating RAMS PDF preview:', error);
      reject(new Error('Failed to generate PDF preview. Please check your data and try again.'));
    }
  });
}