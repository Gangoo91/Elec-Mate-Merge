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

// Interface definitions
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

interface SignOff {
  preparedBy?: { name: string; date: string; signatureDataUrl?: string };
  reviewedBy?: { name: string; date: string; signatureDataUrl?: string };
  approvedBy?: { name: string; date: string; signatureDataUrl?: string };
}

interface PDFOptions extends RAMSReportOptions {
  signOff?: SignOff;
}

// Simple jsPDF-based generator for clean, structured PDFs
export function generateRAMSPDF(data: RAMSData, options: PDFOptions = {}): string {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const context = createVariableContext(data, options);
  
  // Generate clean HTML content for PDF conversion
  const htmlContent = generateCleanHTML(data, options, context);
  const fileName = safeFileName(data.projectName);
  
  // Create a temporary container for rendering
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '794px'; // A4 width in pixels at 96 DPI
  document.body.appendChild(container);
  
  // Enhanced HTML to PDF conversion with optimized settings
  import('html2pdf.js').then((html2pdf) => {
    const opt = {
      margin: [8, 8, 8, 8],
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        putOnlyUsedFonts: true,
        floatPrecision: 16
      }
    };
    
    html2pdf.default().from(container).set(opt).save().then(() => {
      document.body.removeChild(container);
    });
  });
  
  return 'PDF generation initiated';
}

export function generateRAMSPDFPreview(data: RAMSData, options: PDFOptions = {}): Promise<string> {
  return new Promise((resolve) => {
    const context = createVariableContext(data, options);
    const htmlContent = generateCleanHTML(data, options, context);
    resolve(htmlContent);
  });
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
    document_generated: formatDate(now, "dd/MM/yyyy 'at' HH:mm"),
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

function extractMethodStatements(risks: RAMSRisk[]): string[] {
  const methods = new Set<string>();
  
  risks.forEach(risk => {
    const controls = safeText(risk.controls);
    if (controls) {
      if (controls.toLowerCase().includes('isolat')) methods.add('Isolate power supply and implement lock-off procedures');
      if (controls.toLowerCase().includes('ppe')) methods.add('Wear appropriate PPE including insulated gloves and safety boots');
      if (controls.toLowerCase().includes('supervis')) methods.add('Work under competent person supervision at all times');
      if (controls.toLowerCase().includes('test')) methods.add('Test circuits before and after work using approved equipment');
      if (controls.toLowerCase().includes('harness')) methods.add('Use safety harnesses and fall protection equipment');
    }
  });
  
  return Array.from(methods);
}

function generateCleanHTML(data: RAMSData, options: PDFOptions, context: VariableContext): string {
  const uniqueRisks = deduplicateRisks(data.risks);
  const methodStatements = extractMethodStatements(data.risks);
  
  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        font-size: 9px;
        line-height: 1.3;
        color: #374151;
        background: white;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
      
      .page {
        width: 210mm;
        min-height: 297mm;
        padding: 10mm;
        margin: 0 auto;
        background: white;
        page-break-after: always;
      }
      
      .header {
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        color: white;
        padding: 8px 12px;
        text-align: center;
        margin-bottom: 12mm;
        border-radius: 3px;
        position: relative;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .header h1 {
        font-size: 15px;
        font-weight: 700;
        margin: 0;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.1);
      }
      
      .logo-placeholder {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 45px;
        height: 28px;
        background: rgba(255,255,255,0.15);
        border: 1px dashed rgba(255,255,255,0.4);
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6px;
        text-align: center;
        font-weight: 500;
      }
      
      .purpose {
        background: #f8fafc;
        padding: 8px;
        border-left: 3px solid #3b82f6;
        margin-bottom: 10mm;
        border-radius: 0 2px 2px 0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      
      .purpose p {
        margin: 0;
        font-size: 8px;
        line-height: 1.4;
        color: #475569;
        font-weight: 400;
      }
      
      .project-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8mm;
        margin-bottom: 10mm;
        background: #f1f5f9;
        padding: 8mm;
        border-radius: 3px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      
      .info-item {
        margin-bottom: 4px;
        display: flex;
        align-items: baseline;
      }
      
      .info-label {
        font-weight: 600;
        color: #1e40af;
        font-size: 8px;
        min-width: 45mm;
        flex-shrink: 0;
      }
      
      .info-value {
        color: #334155;
        font-size: 8px;
        font-weight: 500;
        flex: 1;
      }
      
      .section {
        margin-bottom: 8mm;
        break-inside: avoid;
      }
      
      .section-title {
        font-size: 11px;
        font-weight: 700;
        color: #1e40af;
        margin-bottom: 6px;
        padding-bottom: 2px;
        border-bottom: 1px solid #e2e8f0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .risk-matrix {
        margin: 8px 0;
        text-align: center;
        break-inside: avoid;
      }
      
      .matrix-table {
        margin: 0 auto 8px auto;
        border-collapse: collapse;
        font-size: 7px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .matrix-table th,
      .matrix-table td {
        border: 1px solid #374151;
        width: 18px;
        height: 18px;
        text-align: center;
        vertical-align: middle;
        font-weight: 600;
      }
      
      .matrix-table th {
        background: #374151;
        color: white;
        font-size: 6px;
        font-weight: 700;
      }
      
      .matrix-legend {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 6px;
        font-size: 7px;
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        gap: 3px;
      }
      
      .legend-color {
        width: 10px;
        height: 10px;
        border: 1px solid #374151;
        border-radius: 1px;
      }
      
      .activities-list {
        background: #f8fafc;
        padding: 6mm;
        border-radius: 3px;
        margin-bottom: 8mm;
        border: 1px solid #e2e8f0;
      }
      
      .activities-list ol {
        margin: 0;
        padding-left: 12px;
        counter-reset: activity-counter;
      }
      
      .activities-list li {
        margin-bottom: 3px;
        font-size: 8px;
        line-height: 1.4;
        counter-increment: activity-counter;
        position: relative;
        font-weight: 400;
      }
      
      .risk-summary {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 4mm;
        margin-bottom: 8mm;
      }
      
      .summary-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 3px;
        padding: 4mm;
        text-align: center;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      
      .summary-label {
        font-size: 6px;
        color: #64748b;
        margin-bottom: 2px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }
      
      .summary-value {
        font-size: 12px;
        font-weight: 700;
        color: #1e40af;
      }
      
      .risks-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 8mm;
        font-size: 7px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        break-inside: avoid;
      }
      
      .risks-table th,
      .risks-table td {
        border: 1px solid #374151;
        padding: 2px;
        text-align: left;
        vertical-align: top;
      }
      
      .risks-table th {
        background: #374151;
        color: white;
        font-weight: 700;
        text-align: center;
        font-size: 6px;
        padding: 3px 2px;
        text-transform: uppercase;
        letter-spacing: 0.2px;
      }
      
      .risks-table td {
        line-height: 1.2;
        font-weight: 400;
      }
      
      .risk-ref {
        text-align: center;
        font-weight: 700;
        background: #f1f5f9;
        width: 8mm;
        font-size: 7px;
      }
      
      .risk-rating {
        text-align: center;
        font-weight: 700;
        width: 12mm;
        font-size: 6px;
      }
      
      .method-statement {
        background: #fef3c7;
        border: 1px solid #f59e0b;
        border-radius: 3px;
        padding: 6mm;
        margin-bottom: 8mm;
        break-inside: avoid;
      }
      
      .method-statement h3 {
        color: #92400e;
        font-size: 10px;
        margin-bottom: 4px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }
      
      .method-statement ol {
        margin: 0;
        padding-left: 12px;
      }
      
      .method-statement li {
        font-size: 8px;
        line-height: 1.4;
        margin-bottom: 2px;
        font-weight: 400;
      }
      
      .safety-info {
        background: #fef2f2;
        border: 1px solid #ef4444;
        border-radius: 3px;
        padding: 6mm;
        margin-bottom: 8mm;
        break-inside: avoid;
      }
      
      .safety-info h3 {
        color: #dc2626;
        font-size: 10px;
        margin-bottom: 4px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }
      
      .safety-info ul {
        margin: 0;
        padding-left: 12px;
      }
      
      .safety-info li {
        font-size: 8px;
        line-height: 1.4;
        margin-bottom: 2px;
        font-weight: 400;
      }
      
      .approvals {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6mm;
        margin-bottom: 8mm;
        break-inside: avoid;
      }
      
      .approval-box {
        border: 1px solid #e2e8f0;
        border-radius: 3px;
        padding: 6mm;
        background: #fafafa;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      
      .approval-title {
        font-weight: 700;
        color: #1e40af;
        font-size: 8px;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }
      
      .approval-field {
        margin-bottom: 3px;
        font-size: 7px;
        display: flex;
        justify-content: space-between;
      }
      
      .approval-label {
        color: #64748b;
        font-weight: 500;
      }
      
      .approval-value {
        font-weight: 600;
        color: #334155;
      }
      
      .signature-line {
        border-bottom: 1px solid #94a3b8;
        height: 12px;
        margin-top: 3px;
      }
      
      .footer {
        position: fixed;
        bottom: 5mm;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 6px;
        color: #64748b;
        padding: 2px 10mm;
        border-top: 1px solid #e2e8f0;
        background: white;
        font-weight: 500;
      }
      
      .warning-icon {
        color: #f59e0b;
        font-weight: 700;
        margin-right: 2px;
        font-size: 8px;
      }
      
      @media print {
        .page {
          margin: 0;
          padding: 8mm;
          box-shadow: none;
        }
        
        .footer {
          position: fixed;
          bottom: 0;
        }
        
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      }
      
      /* Risk level colors with enhanced contrast */
      .risk-low { 
        background: linear-gradient(135deg, #22c55e, #16a34a) !important; 
        color: white !important; 
        font-weight: 700 !important;
      }
      .risk-medium { 
        background: linear-gradient(135deg, #fbbf24, #f59e0b) !important; 
        color: #1f2937 !important; 
        font-weight: 700 !important;
      }
      .risk-high { 
        background: linear-gradient(135deg, #f97316, #ea580c) !important; 
        color: white !important; 
        font-weight: 700 !important;
      }
      .risk-very-high { 
        background: linear-gradient(135deg, #ef4444, #dc2626) !important; 
        color: white !important; 
        font-weight: 700 !important;
      }
      
      /* Matrix colors with gradients */
      .matrix-1, .matrix-2, .matrix-3, .matrix-4 { 
        background: linear-gradient(135deg, #22c55e, #16a34a); 
        color: white; 
      }
      .matrix-5, .matrix-6, .matrix-7, .matrix-8, .matrix-9 { 
        background: linear-gradient(135deg, #fbbf24, #f59e0b); 
        color: #1f2937; 
      }
      .matrix-10, .matrix-11, .matrix-12, .matrix-13, .matrix-14, .matrix-15, .matrix-16 { 
        background: linear-gradient(135deg, #f97316, #ea580c); 
        color: white; 
      }
      .matrix-17, .matrix-18, .matrix-19, .matrix-20, .matrix-21, .matrix-22, .matrix-23, .matrix-24, .matrix-25 { 
        background: linear-gradient(135deg, #ef4444, #dc2626); 
        color: white; 
      }

      /* Column width optimizations */
      .col-ref { width: 8mm; }
      .col-hazard { width: 28mm; }
      .col-risk { width: 28mm; }
      .col-l { width: 6mm; }
      .col-s { width: 6mm; }
      .col-initial { width: 15mm; }
      .col-controls { width: 40mm; }
      .col-residual { width: 15mm; }
      .col-action { width: 25mm; }
      .col-responsible { width: 20mm; }
    </style>
  `;

  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>RAMS Document - ${context.project_name}</title>
      ${styles}
    </head>
    <body>
      <div class="page">
        <!-- Header Section -->
        <div class="header">
          <h1>HEALTH &amp; SAFETY RISK ASSESSMENT</h1>
          <div class="logo-placeholder">{company_logo}</div>
        </div>

        <!-- Purpose Statement -->
        <div class="purpose">
          <p>This Health &amp; Safety Risk Assessment identifies hazards and risks associated with electrical work activities. It establishes control measures for safety, ensuring compliance with Health &amp; Safety at Work Act 1974, CDM Regulations 2015, and BS 7671:2018+A2:2022 (18th Edition).</p>
        </div>

        <!-- Project Information -->
        <div class="project-info">
          <div>
            <div class="info-item">
              <span class="info-label">Project Name:</span>
              <span class="info-value">${context.project_name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Location:</span>
              <span class="info-value">${context.location}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Assessment Date:</span>
              <span class="info-value">${context.assessment_date}</span>
            </div>
          </div>
          <div>
            <div class="info-item">
              <span class="info-label">Assessor:</span>
              <span class="info-value">${context.assessor}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Document Generated:</span>
              <span class="info-value">${context.document_generated}</span>
            </div>
          </div>
        </div>

        <!-- Risk Matrix -->
        <div class="section">
          <h2 class="section-title">Risk Assessment Matrix</h2>
          <div class="risk-matrix">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th></th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                ${[5,4,3,2,1].map(likelihood => `
                  <tr>
                    <th>${likelihood}</th>
                    ${[1,2,3,4,5].map(severity => {
                      const rating = likelihood * severity;
                      return `<td class="matrix-${rating}">${rating}</td>`;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="matrix-legend">
              <div class="legend-item">
                <div class="legend-color" style="background: #22c55e;"></div>
                <span>Low (1-4)</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background: #fbbf24;"></div>
                <span>Medium (5-9)</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background: #f97316;"></div>
                <span>High (10-16)</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background: #ef4444;"></div>
                <span>Very High (17-25)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Work Activities -->
        ${data.activities && data.activities.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Work Activities</h2>
          <div class="activities-list">
            <ol>
              ${data.activities.map(activity => `
                <li>${safeText(activity)}</li>
              `).join('')}
            </ol>
          </div>
        </div>
        ` : ''}

        <!-- Risk Summary -->
        <div class="section">
          <h2 class="section-title">Risk Summary</h2>
          <div class="risk-summary">
            <div class="summary-card">
              <div class="summary-label">Total Risks</div>
              <div class="summary-value">${context.total_risks}</div>
            </div>
            <div class="summary-card">
              <div class="summary-label">Low Residual</div>
              <div class="summary-value">${context.low_residual}</div>
            </div>
            <div class="summary-card">
              <div class="summary-label">Medium</div>
              <div class="summary-value">${context.medium_residual}</div>
            </div>
            <div class="summary-card">
              <div class="summary-label">High</div>
              <div class="summary-value">${context.high_residual}</div>
            </div>
            <div class="summary-card">
              <div class="summary-label">Very High</div>
              <div class="summary-value">${context.very_high_residual}</div>
            </div>
          </div>
        </div>

        <!-- Detailed Risk Assessment -->
        ${uniqueRisks.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Detailed Risk Assessment</h2>
          <table class="risks-table">
            <thead>
              <tr>
                <th class="col-ref">Ref</th>
                <th class="col-hazard">Hazard</th>
                <th class="col-risk">Risk/Harm</th>
                <th class="col-l">L</th>
                <th class="col-s">S</th>
                <th class="col-initial">Initial</th>
                <th class="col-controls">Control Measures</th>
                <th class="col-residual">Residual</th>
                <th class="col-action">Further Action</th>
                <th class="col-responsible">Responsible</th>
              </tr>
            </thead>
            <tbody>
              ${uniqueRisks.map((risk, index) => `
                <tr>
                  <td class="risk-ref">${index + 1}</td>
                  <td>${safeText(risk.hazard)}</td>
                  <td>${safeText(risk.risk)}</td>
                  <td class="risk-rating">${safeNumber(risk.likelihood)}</td>
                  <td class="risk-rating">${safeNumber(risk.severity)}</td>
                  <td class="risk-rating risk-${getRiskLevel(risk.riskRating).toLowerCase().replace(' ', '-')}">${safeNumber(risk.riskRating)}</td>
                  <td>${safeText(risk.controls)}</td>
                  <td class="risk-rating risk-${getRiskLevel(risk.residualRisk).toLowerCase().replace(' ', '-')}">${safeNumber(risk.residualRisk)}</td>
                  <td>${safeText(risk.furtherAction) || 'None required'}</td>
                  <td>${safeText(risk.responsible) || 'Site Supervisor'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ` : ''}

        <!-- Method Statement -->
        ${methodStatements.length > 0 ? `
        <div class="method-statement">
          <h3>⚡ Method Statement</h3>
          <ol>
            ${methodStatements.map(statement => `
              <li>${statement}</li>
            `).join('')}
          </ol>
        </div>
        ` : ''}

        <!-- Safety Information -->
        <div class="safety-info">
          <h3>⚠️ Critical Safety Information</h3>
          <ul>
            <li><span class="warning-icon">⚠️</span>All personnel must be competent and trained for electrical work</li>
            <li><span class="warning-icon">⚠️</span>Isolate and lock-off power supplies before commencing work</li>
            <li><span class="warning-icon">⚠️</span>Use appropriate PPE including insulated gloves and safety boots</li>
            <li><span class="warning-icon">⚠️</span>Test circuits before and after work using approved test equipment</li>
            <li><span class="warning-icon">⚠️</span>Maintain safe working distances from live conductors</li>
            <li><span class="warning-icon">⚠️</span>Have emergency procedures and first aid readily available</li>
          </ul>
        </div>

        <!-- Approvals Section -->
        <div class="section">
          <h2 class="section-title">Authorisation &amp; Sign-off</h2>
          <div class="approvals">
            <div class="approval-box">
              <div class="approval-title">Prepared By</div>
              <div class="approval-field">
                <span class="approval-label">Name:</span>
                <span class="approval-value">${options.signOff?.preparedBy?.name || context.assessor}</span>
              </div>
              <div class="approval-field">
                <span class="approval-label">Date:</span>
                <span class="approval-value">${options.signOff?.preparedBy?.date || context.assessment_date}</span>
              </div>
              <div class="signature-line"></div>
            </div>
            <div class="approval-box">
              <div class="approval-title">Reviewed By</div>
              <div class="approval-field">
                <span class="approval-label">Name:</span>
                <span class="approval-value">${options.signOff?.reviewedBy?.name || 'Pending'}</span>
              </div>
              <div class="approval-field">
                <span class="approval-label">Date:</span>
                <span class="approval-value">${options.signOff?.reviewedBy?.date || 'Pending'}</span>
              </div>
              <div class="signature-line"></div>
            </div>
            <div class="approval-box">
              <div class="approval-title">Approved By</div>
              <div class="approval-field">
                <span class="approval-label">Name:</span>
                <span class="approval-value">${options.signOff?.approvedBy?.name || 'Pending'}</span>
              </div>
              <div class="approval-field">
                <span class="approval-label">Date:</span>
                <span class="approval-value">${options.signOff?.approvedBy?.date || 'Pending'}</span>
              </div>
              <div class="signature-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Footer -->
      <div class="footer">
        RAMS Document - ${context.project_name} - Generated ${context.document_generated} | v1.0 - CONFIDENTIAL
      </div>
    </body>
    </html>
  `;

  return content;
}