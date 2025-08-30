import html2pdf from 'html2pdf.js';

// Enhanced markdown processor for electrical reports
export const processElectricalMarkdown = (content: string): string => {
  let processedContent = content;

  // Process electrical badges and elements first
  processedContent = processedContent
    // BS 7671 compliance references
    .replace(/(\[BS 7671[^\]]*\])/g, '<span class="badge badge-bs7671">$1</span>')
    
    // Result badges
    .replace(/\b(PASS|SATISFACTORY)\b/g, '<span class="badge badge-success">$1</span>')
    .replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, '<span class="badge badge-error">$1</span>')
    
    // Code classifications
    .replace(/\b(C1)\b/g, '<span class="badge badge-c1">$1</span>')
    .replace(/\b(C2)\b/g, '<span class="badge badge-c2">$1</span>')
    .replace(/\b(C3)\b/g, '<span class="badge badge-c3">$1</span>')
    .replace(/\b(FI)\b/g, '<span class="badge badge-fi">$1</span>')
    
    // Measurements and values
    .replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)\b/g, '<span class="badge badge-measurement">$1$2</span>');

  // Process block-level elements
  const lines = processedContent.split('\n');
  const htmlLines: string[] = [];
  let inTable = false;
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    if (!line) {
      // Handle empty lines
      if (inList) {
        htmlLines.push(`</${listType}>`);
        inList = false;
      }
      if (inTable) {
        htmlLines.push('</table>');
        inTable = false;
      }
      htmlLines.push(''); // Preserve empty lines for paragraph separation
      continue;
    }

    // Process headings
    if (line.match(/^#{1,6}\s/)) {
      if (inList) {
        htmlLines.push(`</${listType}>`);
        inList = false;
      }
      if (inTable) {
        htmlLines.push('</table>');
        inTable = false;
      }
      
      const level = line.match(/^(#{1,6})/)?.[1].length || 1;
      const text = line.replace(/^#{1,6}\s*/, '');
      htmlLines.push(`<h${level}>${processInlineMarkdown(text)}</h${level}>`);
      continue;
    }

    // Process tables
    if (line.includes('|')) {
      if (!inTable) {
        htmlLines.push('<table>');
        inTable = true;
      }
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
      const isHeader = i === 0 || (lines[i-1] && !lines[i-1].includes('|'));
      const tag = isHeader ? 'th' : 'td';
      htmlLines.push('<tr>' + cells.map(cell => `<${tag}>${processInlineMarkdown(cell)}</${tag}>`).join('') + '</tr>');
      continue;
    } else if (inTable) {
      htmlLines.push('</table>');
      inTable = false;
    }

    // Process lists
    const listMatch = line.match(/^([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const newListType = listMatch[1].match(/\d+\./) ? 'ol' : 'ul';
      if (!inList || listType !== newListType) {
        if (inList) htmlLines.push(`</${listType}>`);
        htmlLines.push(`<${newListType}>`);
        inList = true;
        listType = newListType;
      }
      htmlLines.push(`<li>${processInlineMarkdown(listMatch[2])}</li>`);
      continue;
    } else if (inList) {
      htmlLines.push(`</${listType}>`);
      inList = false;
    }

    // Regular paragraph
    htmlLines.push(`<p>${processInlineMarkdown(line)}</p>`);
  }

  // Close any remaining open tags
  if (inList) htmlLines.push(`</${listType}>`);
  if (inTable) htmlLines.push('</table>');

  return htmlLines.join('\n');
};

// Process inline markdown elements
const processInlineMarkdown = (text: string): string => {
  return text
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>');
};

// Generate PDF using html2pdf.js (browser-compatible)
export const generateElectricalReportPDF = async (
  content: string, 
  reportType: string, 
  filename?: string
): Promise<void> => {
  try {
    // Process the markdown content
    const processedContent = processElectricalMarkdown(content);
    
    // Create the complete HTML document
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size: 11px;
              line-height: 1.5;
              color: #000;
              background: #fff;
              max-width: 100%;
              margin: 0;
              padding: 15mm;
              word-wrap: break-word;
              hyphens: auto;
              -webkit-hyphens: auto;
              -ms-hyphens: auto;
            }
            
            .report-header {
              text-align: center;
              margin-bottom: 25px;
              padding-bottom: 15px;
              border-bottom: 2px solid #DAA520;
              page-break-after: avoid;
            }
            
            .report-title {
              font-size: 20px;
              color: #DAA520;
              font-weight: bold;
              margin: 0 0 10px 0;
              page-break-after: avoid;
            }
            
            .report-meta {
              font-size: 10px;
              color: #666;
              margin-top: 10px;
            }
            
            h1, h2, h3, h4, h5, h6 {
              color: #DAA520;
              margin: 20px 0 12px 0;
              page-break-after: avoid;
              orphans: 3;
              widows: 3;
            }
            
            h1 { 
              font-size: 18px; 
              page-break-before: auto;
            }
            h2 { 
              font-size: 16px; 
              border-bottom: 1px solid #DAA520; 
              padding-bottom: 4px; 
              margin-top: 25px;
            }
            h3 { 
              font-size: 14px; 
              margin-top: 20px;
            }
            h4, h5, h6 { 
              font-size: 12px; 
              margin-top: 15px;
            }
            
            p { 
              margin: 10px 0; 
              text-align: justify; 
              orphans: 2;
              widows: 2;
              word-wrap: break-word;
              hyphens: auto;
              -webkit-hyphens: auto;
              -ms-hyphens: auto;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
              page-break-inside: avoid;
              font-size: 10px;
            }
            
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
              vertical-align: top;
              word-wrap: break-word;
              hyphens: auto;
              -webkit-hyphens: auto;
              -ms-hyphens: auto;
            }
            
            th {
              background-color: #DAA520;
              color: #000;
              font-weight: bold;
              font-size: 10px;
              page-break-after: avoid;
            }
            
            td { 
              font-size: 9px; 
            }
            
            .badge {
              display: inline-block;
              padding: 3px 6px;
              border-radius: 3px;
              font-size: 8px;
              font-weight: bold;
              white-space: nowrap;
              margin: 0 2px;
              page-break-inside: avoid;
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
              padding: 2px 4px;
              border-radius: 2px;
              font-family: 'Courier New', monospace;
              font-size: 9px;
              word-wrap: break-word;
            }
            
            ul, ol { 
              margin: 10px 0; 
              padding-left: 20px; 
              page-break-inside: avoid;
            }
            
            li { 
              margin: 4px 0; 
              orphans: 2;
              widows: 2;
            }
            
            .content {
              word-wrap: break-word;
              hyphens: auto;
              -webkit-hyphens: auto;
              -ms-hyphens: auto;
            }
            
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 9px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 15px;
              page-break-inside: avoid;
            }

            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }
              
              .report-header {
                page-break-after: avoid;
              }
              
              h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
              }
              
              table {
                page-break-inside: avoid;
              }
              
              .badge {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1 class="report-title">${reportType}</h1>
            <div class="report-meta">
              <strong>Generated:</strong> ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}<br>
              <strong>Compliant with:</strong> BS 7671:2018 (IET Wiring Regulations)
            </div>
          </div>
          
          <div class="content">
            ${processedContent}
          </div>
          
          <div class="footer">
            <small>This report was generated electronically and is valid without signature when printed.</small><br>
            <small>Generated by ElecConnect AI Report Writer</small>
          </div>
        </body>
      </html>
    `;

    // Configure PDF options for html2pdf
    const options = {
      margin: [15, 15, 15, 15], // 15mm margins in all directions
      filename: filename || `${reportType.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { 
        scale: 1.5,
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
        logging: false,
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true,
        precision: 2
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.report-header, h1, h2',
        after: '.footer',
        avoid: 'table, .badge, code'
      }
    };

    // Generate and download the PDF
    await html2pdf().set(options).from(htmlContent).save();
    
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};