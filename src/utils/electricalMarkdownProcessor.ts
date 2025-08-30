import html2pdf from 'html2pdf.js';

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
    .replace(/\b(C2)\b/g, '<span class="badge badge-c2">$1</span>')
    .replace(/\b(C3)\b/g, '<span class="badge badge-c3">$1</span>')
    .replace(/\b(FI)\b/g, '<span class="badge badge-fi">$1</span>')
    
    // Measurements and values
    .replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)\b/g, '<span class="badge badge-measurement">$1$2</span>')
    
    // Convert markdown to HTML
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/# (.*)/g, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    
    // Convert tables
    .replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map(cell => cell.trim()).filter(cell => cell);
      return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
    })
    
    // Convert lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$1</li>')
    
    // Convert line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();

  return processedContent;
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
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size: 11px;
              line-height: 1.4;
              color: #000;
              background: #fff;
              max-width: 100%;
              margin: 0;
              padding: 20px;
            }
            
            .report-header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 2px solid #DAA520;
            }
            
            .report-title {
              font-size: 20px;
              color: #DAA520;
              font-weight: bold;
              margin: 0;
            }
            
            .report-meta {
              font-size: 10px;
              color: #666;
              margin-top: 10px;
            }
            
            h1, h2, h3, h4, h5, h6 {
              color: #DAA520;
              margin-top: 20px;
              margin-bottom: 10px;
            }
            
            h1 { font-size: 18px; }
            h2 { font-size: 16px; border-bottom: 1px solid #DAA520; padding-bottom: 4px; }
            h3 { font-size: 14px; }
            h4, h5, h6 { font-size: 12px; }
            
            p { margin: 8px 0; text-align: justify; }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
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
            
            td { font-size: 9px; }
            
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
            
            ul, ol { margin: 8px 0; padding-left: 20px; }
            li { margin: 3px 0; }
            
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 9px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 10px;
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
            <p>${processedContent}</p>
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
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: filename || `${reportType.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true 
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Generate and download the PDF
    await html2pdf().set(options).from(htmlContent).save();
    
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};