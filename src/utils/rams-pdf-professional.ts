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
  private readonly MARGIN = 10; // 1cm margins for corporate look
  private readonly HEADER_HEIGHT = 30;
  private readonly FOOTER_HEIGHT = 15;
  private readonly PRIMARY_COLOR: [number, number, number] = [41, 128, 185]; // Professional blue #2980B9
  private readonly ACCENT_COLOR: [number, number, number] = [52, 152, 219];
  private readonly SUCCESS_COLOR: [number, number, number] = [34, 197, 94]; // Green
  private readonly WARNING_COLOR: [number, number, number] = [255, 193, 7]; // Yellow
  private readonly DANGER_COLOR: [number, number, number] = [239, 68, 68]; // Red

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
    // Corporate footer with centered layout
    this.doc.setFontSize(8);
    this.doc.setTextColor(128, 128, 128);
    
    // Left side: Generated info
    const generatedText = `Generated: ${formatDate(new Date(), "dd/MM/yyyy HH:mm")} CONFIDENTIAL`;
    this.doc.text(generatedText, this.MARGIN, this.pageHeight - 8);
    
    // Right side: Page number
    this.doc.text(`Page ${this.currentPage}`, this.pageWidth - this.MARGIN, this.pageHeight - 8, { align: "right" });
  }

  private checkPageBreak(requiredSpace: number = 45): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.FOOTER_HEIGHT - this.MARGIN) {
      this.addPageNumber();
      this.doc.addPage();
      this.currentPage++;
      this.yPosition = this.MARGIN + 10; // Better page utilization
      return true;
    }
    return false;
  }

  // Corporate Title Page with Logo Integration
  private addTitlePage(data: RAMSData, options: PDFOptions, context: VariableContext): void {
    // Sleek blue header with proper proportions
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, 50, 'F');
    
    // Professional logo placeholder - top-left positioning
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(this.MARGIN, 8, 40, 25, 'F');
    this.doc.setDrawColor(180, 180, 180);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.MARGIN, 8, 40, 25);
    this.doc.setTextColor(120, 120, 120);
    this.doc.setFontSize(7);
    this.doc.text("COMPANY", this.MARGIN + 20, 19, { align: "center" });
    this.doc.text("LOGO", this.MARGIN + 20, 24, { align: "center" });

    // Bold, centered title - Arial Black style
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("HEALTH & SAFETY RISK ASSESSMENT", this.pageWidth / 2, 22, { align: "center" });
    
    // BS 7671 compliance subtitle
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("BS 7671:2018+A2:2022 (18th Edition) Compliant", this.pageWidth / 2, 35, { align: "center" });

    this.yPosition = 45;

    // Company name - sleek corporate styling
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(context.company_name, this.pageWidth / 2, this.yPosition, { align: "center" });
    this.yPosition += 14;

    // Optimized project information box - tighter spacing
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.setLineWidth(1.5);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 60);
    
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 60, 'F');
    
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 60);

    // Streamlined project details - optimized spacing
    const projectDetails = [
      { label: "Project Name:", value: context.project_name },
      { label: "Location:", value: context.location },
      { label: "Assessment Date:", value: context.assessment_date },
      { label: "Assessor:", value: context.assessor },
      { label: "Document Generated:", value: context.document_generated }
    ];

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(9);
    
    projectDetails.forEach((detail, index) => {
      const y = this.yPosition + 8 + (index * 9);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(detail.label, this.MARGIN + 6, y);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(detail.value, this.MARGIN + 50, y);
    });

    this.yPosition += 50;

    // Compact purpose statement
    this.doc.setFillColor(240, 248, 255);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 45, 'F');
    this.doc.setDrawColor(...this.ACCENT_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 45);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("PURPOSE & COMPLIANCE", this.pageWidth / 2, this.yPosition + 8, { align: "center" });
    
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    const purposeText = "This Health & Safety Risk Assessment identifies hazards and risks associated with electrical work activities. It establishes control measures for safety, ensuring compliance with Health & Safety at Work Act 1974, CDM Regulations 2015, and BS 7671:2018+A2:2022 (18th Edition).";
    
    const wrappedPurpose = this.doc.splitTextToSize(purposeText, this.pageWidth - (2 * this.MARGIN) - 16);
    wrappedPurpose.forEach((line: string, index: number) => {
      this.doc.text(line, this.pageWidth / 2, this.yPosition + 16 + (index * 3.5), { align: "center" });
    });

    this.doc.setFontSize(7);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("⚠️ BS 7671:2018+A2:2022 COMPLIANT ⚠️", this.pageWidth / 2, this.yPosition + 38, { align: "center" });

    // Corporate footer with document reference
    this.yPosition = this.pageHeight - 25;
    this.doc.setFontSize(7);
    this.doc.setTextColor(100, 100, 100);
    const docRef = `RAMS-${context.project_name.replace(/[^a-zA-Z0-9]/g, '_')}-${formatDate(new Date(), "ddMMyyyy")}`;
    this.doc.text(`Document Reference: ${docRef}`, this.pageWidth / 2, this.yPosition, { align: "center" });
    this.doc.text("v1.0 - CONFIDENTIAL", this.pageWidth / 2, this.yPosition + 8, { align: "center" });

    this.addPageNumber();
  }

  // Work Activities Section  
  private addWorkActivities(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(45);
    this.addTOCEntry("3. Work Activities");

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

  // Enhanced Risk Assessment Matrix
  private addRiskMatrix(): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("2. Risk Assessment Matrix");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("2. RISK ASSESSMENT MATRIX", this.MARGIN, this.yPosition);
    this.yPosition += 16;

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
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.addPageNumber();
  }

  // Enhanced Detailed Risk Assessment
  private addDetailedRiskAssessment(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(45);
    this.addTOCEntry("5. Detailed Risk Assessment");

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

    // Enhanced risk table with full borders
    const riskTableData = deduplicatedRisks.map((risk, index) => [
      (index + 1).toString(),
      safeText(risk.hazard),
      safeText(risk.risk),
      safeNumber(risk.likelihood).toString(),
      safeNumber(risk.severity).toString(),
      `${safeNumber(risk.riskRating)} ${getRiskLevel(risk.riskRating)}`,
      safeText(risk.controls),
      `${safeNumber(risk.residualRisk)} ${getRiskLevel(risk.residualRisk)}`,
      safeText(risk.furtherAction) || "None required",
      safeText(risk.responsible) || "Site Supervisor"
    ]);

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Ref", "Hazard", "Risk/Harm", "L", "S", "Initial", "Controls", "Residual", "Action", "Responsible"]],
      body: riskTableData,
      theme: "grid",
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8,
        halign: "center",
        cellPadding: 3
      },
      styles: {
        fontSize: 9,
        cellPadding: 5,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        valign: "top"
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 12 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { halign: "center", cellWidth: 8 },
        4: { halign: "center", cellWidth: 8 },
        5: { halign: "center", cellWidth: 18 },
        6: { cellWidth: 35 },
        7: { halign: "center", cellWidth: 18 },
        8: { cellWidth: 25 },
        9: { cellWidth: 20 }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 20;
    this.addPageNumber();
  }

  // Method Statement Section
  private addMethodStatement(data: RAMSData, context: VariableContext): void {
    this.checkPageBreak(45);
    this.addTOCEntry("6. Method Statement");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("6. METHOD STATEMENT", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    const methodStatements = extractMethodStatements(data.risks);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Safe work procedures extracted from control measures:", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    if (methodStatements.length === 0) {
      this.doc.text("Standard electrical safety procedures apply.", this.MARGIN, this.yPosition);
      this.yPosition += 10;
    } else {
      methodStatements.forEach((statement, index) => {
        this.doc.setFont("helvetica", "bold");
        this.doc.text(`${index + 1}.`, this.MARGIN, this.yPosition);
        this.doc.setFont("helvetica", "normal");
        const wrappedStatement = this.doc.splitTextToSize(statement, this.pageWidth - 2 * this.MARGIN - 15);
        wrappedStatement.forEach((line: string, lineIndex: number) => {
          this.doc.text(line, this.MARGIN + 15, this.yPosition + (lineIndex * 5));
        });
        this.yPosition += Math.max(15, wrappedStatement.length * 5 + 5);
      });
    }

    this.addPageNumber();
  }

  // Critical Safety Requirements Section
  private addSafetyInformation(context: VariableContext): void {
    this.checkPageBreak(100);
    this.addTOCEntry("7. Critical Safety Requirements");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("7. CRITICAL SAFETY REQUIREMENTS", this.MARGIN, this.yPosition);
    this.yPosition += 16;

    const safetyPoints = [
      "All personnel must be competent and trained for electrical work",
      "Isolate and lock-off power supplies before commencing work",
      "Use appropriate PPE including insulated gloves and safety boots",
      "Test circuits before and after work using approved test equipment",
      "Maintain safe working distances from live conductors",
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
      
      this.yPosition += Math.max(10, wrappedPoint.length * 4.5 + 3);
    });

    this.yPosition += 12; // Optimized section spacing

    this.addPageNumber();
  }

  // Enhanced Approvals Section
  private addEnhancedApprovals(signOff?: SignOff, context?: VariableContext): void {
    this.doc.addPage();
    this.currentPage++;
    this.yPosition = this.MARGIN + 20;
    this.addTOCEntry("8. Authorisation & Sign-off");

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("8. AUTHORISATION & SIGN-OFF", this.MARGIN, this.yPosition);
    this.yPosition += 25;

    const signatureBoxHeight = 60;
    const signatureBoxWidth = (this.pageWidth - (4 * this.MARGIN)) / 3;

    // Three-tier approval system
    const approvals = [
      { title: "PREPARED BY", data: signOff?.preparedBy, color: [34, 197, 94] as [number, number, number] },
      { title: "REVIEWED BY", data: signOff?.reviewedBy, color: [255, 193, 7] as [number, number, number] },
      { title: "APPROVED BY", data: signOff?.approvedBy, color: [239, 68, 68] as [number, number, number] }
    ];

    approvals.forEach((approval, index) => {
      const x = this.MARGIN + (index * (signatureBoxWidth + this.MARGIN));
      
      this.doc.setTextColor(...approval.color);
      this.doc.setFontSize(12);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(approval.title, x, this.yPosition);
      
      this.doc.setDrawColor(...approval.color);
      this.doc.setLineWidth(2);
      this.doc.rect(x, this.yPosition + 5, signatureBoxWidth, signatureBoxHeight);
      
      if (approval.data) {
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFontSize(9);
        this.doc.setFont("helvetica", "normal");
        this.doc.text(`Name: ${approval.data.name}`, x + 5, this.yPosition + signatureBoxHeight - 15);
        this.doc.text(`Date: ${approval.data.date}`, x + 5, this.yPosition + signatureBoxHeight - 5);
        
        // Render actual signature if available
        if (approval.data.signatureDataUrl) {
          try {
            this.doc.addImage(
              approval.data.signatureDataUrl,
              'PNG',
              x + 5,
              this.yPosition + 15,
              40,
              15
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

    this.yPosition += signatureBoxHeight + 30;

    // Document control information
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40, 'F');
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 40);

    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DOCUMENT CONTROL", this.pageWidth / 2, this.yPosition + 12, { align: "center" });

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    const docInfo = [
      `Document: RAMS-${context?.project_name || 'Document'}`,
      `Version: v1.0`,
      `Generated: ${context?.document_generated || safeDatetime(new Date())}`,
      `Status: CONFIDENTIAL`
    ];

    docInfo.forEach((info, index) => {
      this.doc.text(info, this.pageWidth / 2, this.yPosition + 20 + (index * 4), { align: "center" });
    });

    this.addPageNumber();
  }

  // Enhanced footer for all pages
  private addEnhancedFooter(context: VariableContext, pageNum: number): void {
    this.doc.setFontSize(8);
    this.doc.setTextColor(100);
    this.doc.text(
      `RAMS Document - ${context.project_name} - Generated ${context.document_generated} Page ${pageNum}`,
      this.pageWidth / 2,
      this.pageHeight - 10,
      { align: "center" }
    );
    this.doc.text("v1.0 - CONFIDENTIAL", this.pageWidth - this.MARGIN, this.pageHeight - 10, { align: "right" });
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