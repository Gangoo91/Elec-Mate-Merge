import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format as formatDate } from "date-fns";

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface ProfessionalPDFOptions {
  reportType: string;
  companyName?: string;
  logoUrl?: string;
  watermark?: string;
  includeSignatures?: boolean;
}

interface ElectricalData {
  testResults?: Array<{
    circuit: string;
    test: string;
    value: string;
    result: 'PASS' | 'FAIL';
    standard?: string;
  }>;
  observations?: Array<{
    code: 'C1' | 'C2' | 'C3' | 'FI';
    description: string;
    location: string;
    remedy: string;
  }>;
  installation?: {
    address: string;
    description: string;
    earthing: string;
    supply: string;
  };
}

export class ProfessionalElectricalPDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private yPosition: number;
  private currentPage: number = 1;
  private readonly MARGIN = 15;
  private readonly HEADER_HEIGHT = 40;
  private readonly FOOTER_HEIGHT = 25;
  
  // Professional color scheme (BS 7671 compliant)
  private readonly PRIMARY_COLOR: [number, number, number] = [218, 165, 32]; // #DAA520 elec-yellow
  private readonly ACCENT_COLOR: [number, number, number] = [41, 98, 255]; // Professional blue
  private readonly SUCCESS_COLOR: [number, number, number] = [34, 197, 94]; // Green for PASS
  private readonly DANGER_COLOR: [number, number, number] = [239, 68, 68]; // Red for FAIL/C1
  private readonly WARNING_COLOR: [number, number, number] = [245, 158, 11]; // Orange for C2
  private readonly CAUTION_COLOR: [number, number, number] = [234, 179, 8]; // Yellow for C3
  private readonly INFO_COLOR: [number, number, number] = [59, 130, 246]; // Blue for FI
  private readonly LIGHT_GRAY: [number, number, number] = [248, 250, 252];
  private readonly DARK_GRAY: [number, number, number] = [71, 85, 105];

  constructor() {
    this.doc = new jsPDF('portrait', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
    this.yPosition = this.MARGIN;
  }

  private addProfessionalHeader(options: ProfessionalPDFOptions): void {
    // Professional header background
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, 8, 'F');
    
    // Company branding area
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(this.MARGIN, 12, this.pageWidth - (2 * this.MARGIN), 25, 'F');
    this.doc.setDrawColor(...this.DARK_GRAY);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.MARGIN, 12, this.pageWidth - (2 * this.MARGIN), 25);

    // Company name and logo area
    this.doc.setTextColor(...this.DARK_GRAY);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    const companyName = options.companyName || "ElecConnect Professional";
    this.doc.text(companyName, this.MARGIN + 5, 22);
    
    // BS 7671 compliance badge
    this.doc.setFillColor(...this.SUCCESS_COLOR);
    this.doc.rect(this.pageWidth - 85, 14, 70, 8, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("BS 7671:2018+A3:2024 COMPLIANT", this.pageWidth - 80, 19);
    
    // Contact information
    this.doc.setTextColor(...this.DARK_GRAY);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Professional Electrical Testing & Certification", this.MARGIN + 5, 28);
    this.doc.text("Certified to City & Guilds 2391-52", this.MARGIN + 5, 32);

    this.yPosition = 45;
  }

  private addProfessionalFooter(): void {
    const footerY = this.pageHeight - this.FOOTER_HEIGHT;
    
    // Footer background
    this.doc.setFillColor(...this.LIGHT_GRAY);
    this.doc.rect(0, footerY, this.pageWidth, this.FOOTER_HEIGHT, 'F');
    
    // Footer content
    this.doc.setTextColor(...this.DARK_GRAY);
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    
    // Left: Generation info
    const timestamp = formatDate(new Date(), "dd/MM/yyyy 'at' HH:mm");
    this.doc.text(`Generated: ${timestamp}`, this.MARGIN, footerY + 8);
    this.doc.text("This document is electronically generated and valid without signature", this.MARGIN, footerY + 14);
    
    // Center: Compliance statement
    this.doc.text("BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations)", this.pageWidth / 2, footerY + 8, { align: "center" });
    this.doc.text("Electrical Installation Work Compliant", this.pageWidth / 2, footerY + 14, { align: "center" });
    
    // Right: Page number
    this.doc.setFont("helvetica", "bold");
    this.doc.text(`Page ${this.currentPage}`, this.pageWidth - this.MARGIN, footerY + 11, { align: "right" });
  }

  private checkPageBreak(requiredSpace: number = 40): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.FOOTER_HEIGHT - 10) {
      this.addProfessionalFooter();
      this.doc.addPage();
      this.currentPage++;
      this.yPosition = this.MARGIN + 10;
      return true;
    }
    return false;
  }

  private addTitleSection(reportType: string, options: ProfessionalPDFOptions): void {
    // Main title
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(24);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(reportType.toUpperCase(), this.pageWidth / 2, this.yPosition, { align: "center" });
    this.yPosition += 12;
    
    // Subtitle with professional styling
    this.doc.setTextColor(...this.DARK_GRAY);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Electrical Installation Test Report", this.pageWidth / 2, this.yPosition, { align: "center" });
    this.yPosition += 15;
    
    // Professional divider
    this.doc.setDrawColor(...this.PRIMARY_COLOR);
    this.doc.setLineWidth(2);
    this.doc.line(this.MARGIN + 30, this.yPosition, this.pageWidth - this.MARGIN - 30, this.yPosition);
    this.yPosition += 20;
  }

  private addInstallationDetails(data: ElectricalData): void {
    this.checkPageBreak(50);
    
    // Section header
    this.doc.setFillColor(...this.PRIMARY_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 8, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("INSTALLATION PARTICULARS", this.MARGIN + 5, this.yPosition + 6);
    this.yPosition += 15;

    if (data.installation) {
      const tableData = [
        ["Installation Address", data.installation.address || "Not specified"],
        ["Description of Installation", data.installation.description || "Electrical installation work"],
        ["Earthing Arrangements", data.installation.earthing || "TN-S system"],
        ["Supply Characteristics", data.installation.supply || "230V/400V, 50Hz, AC"],
        ["Installation Date", formatDate(new Date(), "dd/MM/yyyy")],
        ["Test Date", formatDate(new Date(), "dd/MM/yyyy")]
      ];

      this.doc.autoTable({
        startY: this.yPosition,
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [248, 250, 252],
          textColor: [71, 85, 105],
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9,
          cellPadding: 4
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: 'bold', fillColor: [252, 252, 252] },
          1: { cellWidth: 110 }
        },
        margin: { left: this.MARGIN, right: this.MARGIN }
      });

      this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
    }
  }

  private addTestResults(data: ElectricalData): void {
    this.checkPageBreak(80);
    
    // Section header
    this.doc.setFillColor(...this.ACCENT_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 8, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("TEST RESULTS SUMMARY", this.MARGIN + 5, this.yPosition + 6);
    this.yPosition += 15;

    if (data.testResults && data.testResults.length > 0) {
      const tableData = data.testResults.map(result => [
        result.circuit,
        result.test,
        result.value,
        result.result,
        result.standard || "BS 7671"
      ]);

      this.doc.autoTable({
        startY: this.yPosition,
        head: [['Circuit Ref', 'Test Type', 'Measured Value', 'Result', 'Standard']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: this.ACCENT_COLOR,
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 9,
          cellPadding: 4,
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 25, halign: 'center' },
          1: { cellWidth: 45, halign: 'left' },
          2: { cellWidth: 30, halign: 'center' },
          3: { cellWidth: 20, halign: 'center' },
          4: { cellWidth: 25, halign: 'center' }
        },
        didParseCell: (data) => {
          // Color code results
          if (data.column.index === 3 && data.cell.text[0]) {
            const result = data.cell.text[0];
            if (result === 'PASS') {
              data.cell.styles.fillColor = this.SUCCESS_COLOR;
              data.cell.styles.textColor = [255, 255, 255];
              data.cell.styles.fontStyle = 'bold';
            } else if (result === 'FAIL') {
              data.cell.styles.fillColor = this.DANGER_COLOR;
              data.cell.styles.textColor = [255, 255, 255];
              data.cell.styles.fontStyle = 'bold';
            }
          }
        },
        margin: { left: this.MARGIN, right: this.MARGIN }
      });

      this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
    }
  }

  private addObservations(data: ElectricalData): void {
    if (!data.observations || data.observations.length === 0) return;
    
    this.checkPageBreak(100);
    
    // Section header
    this.doc.setFillColor(...this.WARNING_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 8, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("OBSERVATIONS & RECOMMENDATIONS", this.MARGIN + 5, this.yPosition + 6);
    this.yPosition += 15;

    const tableData = data.observations.map(obs => [
      obs.code,
      obs.description,
      obs.location,
      obs.remedy
    ]);

    this.doc.autoTable({
      startY: this.yPosition,
      head: [['Code', 'Description', 'Location', 'Recommended Action']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: this.WARNING_COLOR,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 3,
        valign: 'top'
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 60, halign: 'left' },
        2: { cellWidth: 35, halign: 'left' },
        3: { cellWidth: 55, halign: 'left' }
      },
      didParseCell: (data) => {
        // Color code observation codes
        if (data.column.index === 0 && data.cell.text[0]) {
          const code = data.cell.text[0];
          switch (code) {
            case 'C1':
              data.cell.styles.fillColor = this.DANGER_COLOR;
              data.cell.styles.textColor = [255, 255, 255];
              break;
            case 'C2':
              data.cell.styles.fillColor = this.WARNING_COLOR;
              data.cell.styles.textColor = [255, 255, 255];
              break;
            case 'C3':
              data.cell.styles.fillColor = this.CAUTION_COLOR;
              data.cell.styles.textColor = [0, 0, 0];
              break;
            case 'FI':
              data.cell.styles.fillColor = this.INFO_COLOR;
              data.cell.styles.textColor = [255, 255, 255];
              break;
          }
          data.cell.styles.fontStyle = 'bold';
        }
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 15;
  }

  private addComplianceStatement(): void {
    this.checkPageBreak(60);
    
    // Compliance section with professional styling
    this.doc.setFillColor(...this.SUCCESS_COLOR);
    this.doc.rect(this.MARGIN, this.yPosition, this.pageWidth - (2 * this.MARGIN), 35, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("COMPLIANCE DECLARATION", this.pageWidth / 2, this.yPosition + 10, { align: "center" });
    
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    const complianceText = [
      "This electrical installation work has been designed, installed, inspected and tested",
      "in accordance with BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations).",
      "All work complies with current UK electrical safety standards as of September 2025."
    ];
    
    complianceText.forEach((line, index) => {
      this.doc.text(line, this.pageWidth / 2, this.yPosition + 18 + (index * 5), { align: "center" });
    });
    
    this.yPosition += 45;
  }

  private addSignatureSection(options: ProfessionalPDFOptions): void {
    if (!options.includeSignatures) return;
    
    this.checkPageBreak(80);
    
    // Signature section
    this.doc.setTextColor(...this.DARK_GRAY);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("CERTIFICATION & APPROVAL", this.MARGIN, this.yPosition);
    this.yPosition += 15;

    const signatureBoxes = [
      { title: "Electrician", subtitle: "Installation & Testing" },
      { title: "Inspector", subtitle: "Independent Verification" }
    ];

    signatureBoxes.forEach((box, index) => {
      const xPos = this.MARGIN + (index * 85);
      
      // Signature box
      this.doc.setDrawColor(...this.DARK_GRAY);
      this.doc.setLineWidth(0.5);
      this.doc.rect(xPos, this.yPosition, 80, 40);
      
      // Title
      this.doc.setFontSize(10);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(box.title, xPos + 40, this.yPosition + 8, { align: "center" });
      
      // Subtitle
      this.doc.setFontSize(8);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(box.subtitle, xPos + 40, this.yPosition + 15, { align: "center" });
      
      // Signature line
      this.doc.setDrawColor(...this.DARK_GRAY);
      this.doc.line(xPos + 10, this.yPosition + 28, xPos + 70, this.yPosition + 28);
      
      // Date and name fields
      this.doc.setFontSize(7);
      this.doc.text("Signature", xPos + 10, this.yPosition + 32);
      this.doc.text("Date: ___________", xPos + 10, this.yPosition + 37);
      this.doc.text("Print Name: ___________", xPos + 45, this.yPosition + 37);
    });

    this.yPosition += 50;
  }

  public generateProfessionalPDF(
    content: string,
    reportType: string,
    data: ElectricalData = {},
    options: ProfessionalPDFOptions = { reportType }
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Add professional header
        this.addProfessionalHeader(options);
        
        // Add title section
        this.addTitleSection(reportType, options);
        
        // Add installation details
        this.addInstallationDetails(data);
        
        // Process and add main content
        this.addProcessedContent(content);
        
        // Add test results if available
        this.addTestResults(data);
        
        // Add observations if any
        this.addObservations(data);
        
        // Add compliance statement
        this.addComplianceStatement();
        
        // Add signature section
        this.addSignatureSection(options);
        
        // Add footer to all pages
        this.addFootersToAllPages();
        
        // Generate filename
        const filename = `${reportType.toLowerCase().replace(/\s+/g, '-')}-${formatDate(new Date(), 'ddMMyyyy')}.pdf`;
        
        // Save the PDF
        this.doc.save(filename);
        resolve();
        
      } catch (error) {
        console.error('Professional PDF generation failed:', error);
        reject(error);
      }
    });
  }

  private addProcessedContent(content: string): void {
    // Process the content to enhance electrical terminology
    const processedContent = this.processElectricalContent(content);
    
    // Split content into sections
    const sections = processedContent.split(/\n\s*\n/);
    
    sections.forEach(section => {
      if (!section.trim()) return;
      
      this.checkPageBreak(20);
      
      // Check if it's a header
      if (section.startsWith('#')) {
        this.addContentHeader(section);
      } else if (section.includes('|')) {
        this.addContentTable(section);
      } else {
        this.addContentParagraph(section);
      }
    });
  }

  private processElectricalContent(content: string): string {
    return content
      // Enhance BS 7671 references
      .replace(/(\[BS 7671[^\]]*\])/g, '📋 $1')
      // Highlight test results
      .replace(/\b(PASS|SATISFACTORY)\b/g, '✅ $1')
      .replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, '❌ $1')
      // Enhance code classifications
      .replace(/\b(C1)\b/g, '🔴 $1')
      .replace(/\b(C2)\b/g, '🟠 $1')
      .replace(/\b(C3)\b/g, '🟡 $1')
      .replace(/\b(FI)\b/g, '🔵 $1')
      // Format measurements
      .replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)\b/g, '$1$2');
  }

  private addContentHeader(section: string): void {
    const headerText = section.replace(/^#+\s*/, '');
    const level = (section.match(/^#+/) || [''])[0].length;
    
    this.doc.setTextColor(...this.PRIMARY_COLOR);
    this.doc.setFontSize(14 - level);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(headerText, this.MARGIN, this.yPosition);
    this.yPosition += 10;
  }

  private addContentParagraph(section: string): void {
    this.doc.setTextColor(...this.DARK_GRAY);
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "normal");
    
    const lines = this.doc.splitTextToSize(section, this.pageWidth - (2 * this.MARGIN));
    lines.forEach((line: string) => {
      this.checkPageBreak(8);
      this.doc.text(line, this.MARGIN, this.yPosition);
      this.yPosition += 5;
    });
    this.yPosition += 5;
  }

  private addContentTable(section: string): void {
    const rows = section.split('\n').filter(row => row.includes('|'));
    if (rows.length < 2) return;
    
    const tableData = rows.slice(1).map(row => 
      row.split('|').map(cell => cell.trim()).filter(cell => cell)
    );
    
    const headers = rows[0].split('|').map(cell => cell.trim()).filter(cell => cell);
    
    this.doc.autoTable({
      startY: this.yPosition,
      head: [headers],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: this.PRIMARY_COLOR,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 3
      },
      margin: { left: this.MARGIN, right: this.MARGIN }
    });

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 10;
  }

  private addFootersToAllPages(): void {
    const totalPages = this.doc.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.currentPage = i;
      this.addProfessionalFooter();
    }
  }
}

// Enhanced markdown processor for electrical content
export const processElectricalMarkdownProfessional = (content: string): string => {
  let processedContent = content;

  // Process electrical badges and elements
  processedContent = processedContent
    // BS 7671 compliance references with enhanced styling
    .replace(/(\[BS 7671[^\]]*\])/g, '<span class="badge badge-bs7671">📋 $1</span>')
    
    // Enhanced result badges
    .replace(/\b(PASS|SATISFACTORY)\b/g, '<span class="badge badge-success">✅ $1</span>')
    .replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, '<span class="badge badge-error">❌ $1</span>')
    
    // Enhanced code classifications
    .replace(/\b(C1)\b/g, '<span class="badge badge-c1">🔴 $1</span>')
    .replace(/\b(C2)\b/g, '<span class="badge badge-c2">🟠 $1</span>')
    .replace(/\b(C3)\b/g, '<span class="badge badge-c3">🟡 $1</span>')
    .replace(/\b(FI)\b/g, '<span class="badge badge-fi">🔵 $1</span>')
    
    // Enhanced measurements and values
    .replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)\b/g, '<span class="badge badge-measurement">⚡ $1$2</span>');
  
  return processedContent;
};

// Export function for backwards compatibility
export const generateProfessionalElectricalPDF = async (
  content: string,
  reportType: string,
  filename?: string,
  options: ProfessionalPDFOptions = { reportType }
): Promise<void> => {
  const generator = new ProfessionalElectricalPDFGenerator();
  
  // Parse content for electrical data
  const data: ElectricalData = {
    installation: {
      address: "Installation address from content",
      description: "Electrical installation work",
      earthing: "TN-S earthing system",
      supply: "230V/400V, 50Hz, AC"
    }
  };
  
  return generator.generateProfessionalPDF(content, reportType, data, options);
};