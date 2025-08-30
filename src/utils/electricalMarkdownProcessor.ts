import { mdToPdf } from 'md-to-pdf';

// Enhanced markdown processor for electrical reports
export const processElectricalMarkdown = (content: string): string => {
  let processedContent = content;

  // Process electrical badges and elements
  processedContent = processedContent
    // BS 7671 compliance references
    .replace(/(\[BS 7671[^\]]*\])/g, '<span class="badge badge-bs7671">$1</span>')
    
    // Result badges
    .replace(/\b(PASS|SATISFACTORY)\b/g, '<span class="badge badge-success">$1</span>')
    .replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, '<span class="badge badge-error">$1</span>')
    
    // Code classifications
    .replace(/\b(C1)\b/g, '<span class="badge badge-c1">$1</span>')
    .replace(/\b(C2)\b/g, '<span class="badge badge-c2">$2</span>')
    .replace(/\b(C3)\b/g, '<span class="badge badge-c3">$3</span>')
    .replace(/\b(FI)\b/g, '<span class="badge badge-fi">$1</span>')
    
    // Measurements and values
    .replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)\b/g, '<span class="badge badge-measurement">$1$2</span>')
    
    // Clean up markdown formatting issues
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();

  return processedContent;
};

// CSS styles for electrical report PDF
export const getElectricalReportCSS = (): string => {
  return `
    @page {
      margin: 20mm;
      size: A4;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #000;
      background: #fff;
      max-width: 100%;
    }
    
    h1, h2, h3, h4, h5, h6 {
      color: #DAA520;
      margin-top: 20px;
      margin-bottom: 10px;
      page-break-after: avoid;
    }
    
    h1 {
      font-size: 20px;
      border-bottom: 2px solid #DAA520;
      padding-bottom: 8px;
      text-align: center;
    }
    
    h2 {
      font-size: 16px;
      border-bottom: 1px solid #DAA520;
      padding-bottom: 4px;
    }
    
    h3 {
      font-size: 14px;
    }
    
    h4, h5, h6 {
      font-size: 12px;
    }
    
    p {
      margin: 8px 0;
      text-align: justify;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      page-break-inside: avoid;
    }
    
    th, td {
      border: 1px solid #000;
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }
    
    th {
      background-color: #DAA520;
      color: #000;
      font-weight: bold;
      font-size: 10px;
    }
    
    td {
      font-size: 9px;
    }
    
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 8px;
      font-weight: bold;
      white-space: nowrap;
      margin: 0 2px;
    }
    
    .badge-bs7671 {
      background-color: #FFD700;
      color: #000;
      border: 1px solid #DAA520;
    }
    
    .badge-success {
      background-color: #4CAF50;
      color: #fff;
    }
    
    .badge-error {
      background-color: #F44336;
      color: #fff;
    }
    
    .badge-c1 {
      background-color: #F44336;
      color: #fff;
    }
    
    .badge-c2 {
      background-color: #FF9800;
      color: #fff;
    }
    
    .badge-c3 {
      background-color: #FFC107;
      color: #000;
    }
    
    .badge-fi {
      background-color: #2196F3;
      color: #fff;
    }
    
    .badge-measurement {
      background-color: #FFEB3B;
      color: #000;
      border: 1px solid #FBC02D;
    }
    
    code {
      background-color: #f5f5f5;
      padding: 1px 3px;
      border-radius: 2px;
      font-family: 'Courier New', monospace;
      font-size: 9px;
    }
    
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 9px;
    }
    
    blockquote {
      border-left: 3px solid #DAA520;
      padding-left: 15px;
      margin: 10px 0;
      color: #666;
      font-style: italic;
    }
    
    ul, ol {
      margin: 8px 0;
      padding-left: 20px;
    }
    
    li {
      margin: 3px 0;
    }
    
    hr {
      border: none;
      border-top: 1px solid #DAA520;
      margin: 15px 0;
    }
    
    .report-header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #DAA520;
    }
    
    .report-meta {
      font-size: 10px;
      color: #666;
      text-align: center;
      margin-bottom: 20px;
    }
    
    @media print {
      .no-print {
        display: none !important;
      }
      
      body {
        margin: 0;
      }
      
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
      }
      
      table, figure {
        page-break-inside: avoid;
      }
      
      p, li {
        orphans: 3;
        widows: 3;
      }
    }
  `;
};

// Generate PDF using md-to-pdf
export const generateElectricalReportPDF = async (
  content: string, 
  reportType: string, 
  filename?: string
): Promise<void> => {
  try {
    // Process the markdown content
    const processedContent = processElectricalMarkdown(content);
    
    // Create the complete markdown document
    const fullMarkdown = `
# ${reportType}

<div class="report-meta">
<strong>Generated:</strong> ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}<br>
<strong>Compliant with:</strong> BS 7671:2018 (IET Wiring Regulations)
</div>

---

${processedContent}

---

<div class="report-meta">
<small>This report was generated electronically and is valid without signature when printed.</small>
</div>
    `;

    // Configure PDF options - correct md-to-pdf format
    const pdfOptions = {
      dest: filename || 'electrical-report.pdf',
      css: getElectricalReportCSS(),
      body_class: ['electrical-report'],
      marked_options: {
        headerIds: false,
        mangle: false
      },
      pdf_options: {
        format: 'A4' as const,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        },
        printBackground: true,
        preferCSSPageSize: true
      }
    };

    // Generate the PDF
    const pdf = await mdToPdf({ content: fullMarkdown }, pdfOptions);
    
    if (pdf && pdf.content) {
      // Create blob and download
      const blob = new Blob([pdf.content], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `${reportType.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};