import { safeText } from './rams-pdf-helpers';

/**
 * Enhanced markdown processor specifically designed for professional electrical reports
 * Converts markdown to well-structured HTML with electrical industry appropriate styling
 */
export class EnhancedMarkdownProcessor {
  
  static processMarkdownToHTML(content: string): string {
    if (!content) return '';
    
    let html = safeText(content);
    
    // Process safety classifications with colour coding
    html = html.replace(/\*\*(C1|DANGER|IMMEDIATE)\*\*/gi, '<span class="safety-c1"><strong>$1</strong></span>');
    html = html.replace(/\*\*(C2|URGENT|POTENTIALLY DANGEROUS)\*\*/gi, '<span class="safety-c2"><strong>$1</strong></span>');
    html = html.replace(/\*\*(C3|IMPROVEMENT)\*\*/gi, '<span class="safety-c3"><strong>$1</strong></span>');
    html = html.replace(/\*\*(PASS|SATISFACTORY)\*\*/gi, '<span class="result-pass"><strong>$1</strong></span>');
    html = html.replace(/\*\*(FAIL|UNSATISFACTORY)\*\*/gi, '<span class="result-fail"><strong>$1</strong></span>');
    
    // Process regulation references
    html = html.replace(/Regulation\s+(\d+\.\d+\.\d+)/gi, '<span class="regulation-ref">Regulation $1</span>');
    html = html.replace(/BS\s+7671[:\s]*(\d{4})?/gi, '<span class="bs-ref">BS 7671:2018+A3:2024</span>');
    
    // Process headers with proper hierarchy
    html = html.replace(/^### (.*$)/gim, '<h3 class="report-h3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="report-h2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="report-h1">$1</h1>');
    
    // Process bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Process blockquotes for safety notices
    html = html.replace(/^> (.*$)/gim, '<blockquote class="safety-notice">$1</blockquote>');
    
    // Process code blocks for technical specifications
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="technical-spec"><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code class="inline-tech">$1</code>');
    
    // Process tables with enhanced styling
    html = this.processTables(html);
    
    // Process lists
    html = this.processLists(html);
    
    // Convert line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Wrap in paragraphs
    html = `<p>${html}</p>`;
    
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><br><\/p>/g, '');
    
    return html;
  }
  
  private static processTables(html: string): string {
    const tableRegex = /(\|.*\|\n)+/g;
    
    return html.replace(tableRegex, (match) => {
      const rows = match.trim().split('\n');
      if (rows.length < 2) return match;
      
      let tableHTML = '<table class="electrical-table">';
      
      // Process header row
      const headerCells = rows[0].split('|').map(cell => cell.trim()).filter(cell => cell);
      tableHTML += '<thead><tr>';
      headerCells.forEach(cell => {
        tableHTML += `<th>${cell}</th>`;
      });
      tableHTML += '</tr></thead>';
      
      // Skip separator row (row 1) and process data rows
      tableHTML += '<tbody>';
      for (let i = 2; i < rows.length; i++) {
        const cells = rows[i].split('|').map(cell => cell.trim()).filter(cell => cell);
        if (cells.length > 0) {
          tableHTML += '<tr>';
          cells.forEach(cell => {
            // Apply special styling to certain cell contents
            let cellContent = cell;
            if (cell.match(/^(PASS|SATISFACTORY)$/i)) {
              cellContent = `<span class="result-pass">${cell}</span>`;
            } else if (cell.match(/^(FAIL|UNSATISFACTORY)$/i)) {
              cellContent = `<span class="result-fail">${cell}</span>`;
            } else if (cell.match(/^(C1|C2|C3)$/i)) {
              cellContent = `<span class="safety-${cell.toLowerCase()}">${cell}</span>`;
            }
            tableHTML += `<td>${cellContent}</td>`;
          });
          tableHTML += '</tr>';
        }
      }
      tableHTML += '</tbody></table>';
      
      return tableHTML;
    });
  }
  
  private static processLists(html: string): string {
    // Process unordered lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    
    // Wrap consecutive list items in ul tags
    html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
      return `<ul class="electrical-list">${match}</ul>`;
    });
    
    return html;
  }
  
  static getReportCSS(): string {
    return `
      <style>
        .electrical-report {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #2c3e50;
          max-width: 800px;
          margin: 0 auto;
          padding: 30px;
          background: #ffffff;
        }
        
        .report-h1 {
          color: #1a365d;
          border-bottom: 3px solid #f59e0b;
          padding-bottom: 10px;
          margin: 30px 0 20px 0;
          font-size: 28px;
          font-weight: bold;
          text-align: center;
        }
        
        .report-h2 {
          color: #2d3748;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 8px;
          margin: 25px 0 15px 0;
          font-size: 22px;
          font-weight: bold;
        }
        
        .report-h3 {
          color: #4a5568;
          margin: 20px 0 10px 0;
          font-size: 18px;
          font-weight: semibold;
        }
        
        .electrical-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 14px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .electrical-table th {
          background-color: #f8fafc;
          border: 1px solid #cbd5e0;
          padding: 12px 8px;
          text-align: left;
          font-weight: bold;
          color: #2d3748;
        }
        
        .electrical-table td {
          border: 1px solid #e2e8f0;
          padding: 10px 8px;
          text-align: left;
        }
        
        .electrical-table tr:nth-child(even) {
          background-color: #f8fafc;
        }
        
        .safety-c1 {
          background-color: #fed7d7;
          color: #c53030;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #fc8181;
          font-weight: bold;
        }
        
        .safety-c2 {
          background-color: #fef5e7;
          color: #d69e2e;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #f6e05e;
          font-weight: bold;
        }
        
        .safety-c3 {
          background-color: #e6fffa;
          color: #319795;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #81e6d9;
          font-weight: bold;
        }
        
        .result-pass {
          background-color: #f0fff4;
          color: #38a169;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .result-fail {
          background-color: #fed7d7;
          color: #c53030;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .regulation-ref {
          background-color: #edf2f7;
          color: #4a5568;
          padding: 1px 4px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9em;
        }
        
        .bs-ref {
          background-color: #e6fffa;
          color: #2d3748;
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: bold;
          font-size: 0.9em;
        }
        
        .safety-notice {
          background-color: #fff5f5;
          border-left: 4px solid #f56565;
          padding: 15px 20px;
          margin: 20px 0;
          font-style: italic;
          color: #2d3748;
        }
        
        .technical-spec {
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 15px;
          margin: 15px 0;
          font-family: 'Courier New', monospace;
          overflow-x: auto;
        }
        
        .inline-tech {
          background-color: #edf2f7;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9em;
        }
        
        .electrical-list {
          margin: 15px 0;
          padding-left: 25px;
        }
        
        .electrical-list li {
          margin: 8px 0;
          color: #4a5568;
        }
        
        p {
          margin: 12px 0;
          color: #4a5568;
        }
        
        strong {
          color: #2d3748;
        }
        
        @media print {
          .electrical-report {
            margin: 0;
            padding: 20px;
          }
          
          .report-h1 {
            page-break-after: avoid;
          }
          
          .electrical-table {
            page-break-inside: avoid;
          }
        }
      </style>
    `;
  }
}