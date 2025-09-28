import mdToPdf from 'md-to-pdf';

export interface PDFGenerationOptions {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  includeTableOfContents?: boolean;
  fontFamily?: 'serif' | 'sans-serif';
  fontSize?: number;
  watermark?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

const generateProfessionalCSS = (options: PDFGenerationOptions = {}) => {
  const {
    fontFamily = 'serif',
    fontSize = 11,
    companyName = 'Professional Electrical Services',
    companyAddress = '',
    companyPhone = '',
    companyEmail = ''
  } = options;

  return `
    @page {
      margin: 20mm;
      size: A4;
      @top-center {
        content: "${options.title || 'Electrical Certificate'}";
        font-family: ${fontFamily === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif'};
        font-size: 10pt;
        color: #333;
      }
      @bottom-center {
        content: "Page " counter(page) " of " counter(pages);
        font-family: ${fontFamily === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif'};
        font-size: 9pt;
        color: #666;
      }
    }

    body {
      font-family: ${fontFamily === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif'};
      font-size: ${fontSize}pt;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }

    .certificate-header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #2563eb;
    }

    .company-info {
      margin-bottom: 15px;
    }

    .company-name {
      font-size: 18pt;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 5px;
    }

    .company-details {
      font-size: 10pt;
      color: #666;
      line-height: 1.4;
    }

    .certificate-title {
      font-size: 16pt;
      font-weight: bold;
      margin: 15px 0 10px 0;
      color: #1e40af;
    }

    .compliance-text {
      font-size: 10pt;
      color: #059669;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .document-details {
      font-size: 9pt;
      color: #666;
      margin-top: 10px;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #1e40af;
      margin-top: 25px;
      margin-bottom: 15px;
      font-weight: bold;
    }

    h1 { font-size: 16pt; }
    h2 { font-size: 14pt; }
    h3 { font-size: 12pt; }
    h4 { font-size: 11pt; }

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
      border: 1px solid #d1d5db;
      padding: 8px 12px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f3f4f6;
      font-weight: bold;
      color: #374151;
    }

    tr:nth-child(even) {
      background-color: #f9fafb;
    }

    .signature-section {
      margin-top: 40px;
      page-break-inside: avoid;
    }

    .signature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 20px;
    }

    .signature-box {
      border: 1px solid #d1d5db;
      padding: 15px;
      min-height: 100px;
    }

    .signature-label {
      font-weight: bold;
      margin-bottom: 10px;
      color: #374151;
    }

    .signature-line {
      border-bottom: 1px solid #6b7280;
      margin: 40px 0 10px 0;
      height: 1px;
    }

    .signature-details {
      font-size: 9pt;
      color: #6b7280;
      margin-top: 5px;
    }

    ul, ol {
      margin: 10px 0;
      padding-left: 20px;
    }

    li {
      margin: 5px 0;
    }

    .page-break {
      page-break-before: always;
    }

    .no-break {
      page-break-inside: avoid;
    }

    strong, b {
      font-weight: bold;
      color: #1f2937;
    }

    em, i {
      font-style: italic;
    }

    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 48pt;
      color: rgba(156, 163, 175, 0.3);
      z-index: -1;
      pointer-events: none;
    }
  `;
};

const preprocessMarkdown = (markdown: string, options: PDFGenerationOptions = {}): string => {
  const {
    title = 'Electrical Certificate',
    companyName = 'Professional Electrical Services',
    companyAddress = '',
    companyPhone = '',
    companyEmail = ''
  } = options;

  // Create professional header
  const headerSection = `
<div class="certificate-header">
  <div class="company-info">
    <div class="company-name">${companyName}</div>
    <div class="company-details">
      ${companyAddress ? `${companyAddress}<br>` : ''}
      ${companyPhone ? `Tel: ${companyPhone}` : ''}${companyPhone && companyEmail ? ' | ' : ''}${companyEmail ? `Email: ${companyEmail}` : ''}
    </div>
  </div>
  <div class="certificate-title">${title}</div>
  <div class="compliance-text">BS 7671:2018+A3:2024 Compliant</div>
  <div class="document-details">
    Document Generated: ${new Date().toLocaleDateString('en-GB')} | Reference: ${Date.now().toString().slice(-6)}
  </div>
</div>

${options.watermark ? `<div class="watermark">${options.watermark}</div>` : ''}
`;

  // Clean and process the markdown
  let processedMarkdown = markdown
    // Decode HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Ensure proper table formatting
    .replace(/\|([^|\n]+)\|/g, (match, content) => {
      return `|${content.trim()}|`;
    })
    // Add page breaks before major sections
    .replace(/^# /gm, '\n<div class="page-break"></div>\n\n# ')
    // Wrap tables in no-break divs
    .replace(/(\|[^|\n]+\|[\s\S]*?\|[^|\n]+\|)/g, '<div class="no-break">$1</div>');

  // Add signature section
  const signatureSection = `

---

<div class="signature-section">

## Document Signatures

<div class="signature-grid">
  <div class="signature-box">
    <div class="signature-label">Inspector/Tester</div>
    <div class="signature-line"></div>
    <div class="signature-details">
      Name: _________________________<br>
      Date: _________________________<br>
      Qualification: _________________
    </div>
  </div>
  
  <div class="signature-box">
    <div class="signature-label">Client Representative</div>
    <div class="signature-line"></div>
    <div class="signature-details">
      Name: _________________________<br>
      Date: _________________________<br>
      Position: _____________________
    </div>
  </div>
</div>

</div>
`;

  return headerSection + processedMarkdown + signatureSection;
};

export const generateMdToPDF = async (
  markdown: string,
  filename: string,
  options: PDFGenerationOptions = {}
): Promise<void> => {
  try {
    const processedMarkdown = preprocessMarkdown(markdown, options);
    const css = generateProfessionalCSS(options);

    const pdfOptions = {
      dest: filename,
      pdf_options: {
        format: 'A4' as const,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
            ${options.title || 'Electrical Certificate'}
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 9px; width: 100%; text-align: center; color: #666;">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </div>
        `
      },
      stylesheet: [css],
      body_class: ['professional-certificate'],
      marked_options: {
        gfm: true,
        breaks: true,
        tables: true
      }
    };

    const pdf = await mdToPdf({ content: processedMarkdown }, pdfOptions);
    
    if (pdf.content) {
      // Create blob and trigger download
      const blob = new Blob([pdf.content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      throw new Error('PDF generation failed - no content returned');
    }

  } catch (error) {
    console.error('MD-to-PDF generation error:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Export for backward compatibility
export const generateLaTeXStylePDF = generateMdToPDF;