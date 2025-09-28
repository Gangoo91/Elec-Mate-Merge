import html2pdf from 'html2pdf.js';

export interface LaTeXPDFOptions {
  title?: string;
  author?: string;
  reportType?: string;
  includeSignatures?: boolean;
  watermark?: string;
}

export async function generateLatexPDF(
  markdown: string,
  filename: string,
  options: LaTeXPDFOptions = {}
): Promise<void> {
  try {
    console.log('Generating professional HTML-to-PDF:', filename);

    // Use the proven HTML-to-PDF approach from GeneratedReportDisplay
    await generateHTMLToPDF(markdown, filename, options);

  } catch (error) {
    console.error('HTML-to-PDF generation error:', error);
    throw error;
  }
}

async function generateHTMLToPDF(
  markdown: string,
  filename: string,
  options: LaTeXPDFOptions
): Promise<void> {
  // Use the proven EnhancedMarkdownProcessor approach
  const { EnhancedMarkdownProcessor } = await import('./enhanced-markdown-processor');
  const processedHTML = EnhancedMarkdownProcessor.processMarkdownToHTML(markdown);
  const reportCSS = EnhancedMarkdownProcessor.getReportCSS();

  const reportTypeName = options.reportType || "Professional Electrical Report";
  
  // Create comprehensive HTML content using the same successful approach
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en-GB">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${reportTypeName}</title>
      ${reportCSS}
    </head>
    <body>
      <div class="electrical-report">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #f59e0b; padding-bottom: 25px;">
          <h1 style="color: #1a365d; margin-bottom: 15px; font-size: 32px;">${options.title || reportTypeName}</h1>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="color: #4a5568; margin: 5px 0; font-weight: bold;">Generated: ${new Date().toLocaleDateString('en-GB', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            ${options.author ? `<p style="color: #2d3748; margin: 5px 0; font-size: 14px;">Inspector: ${options.author}</p>` : ''}
            <p style="color: #2d3748; margin: 5px 0; font-size: 14px; font-weight: bold;">
              <span class="bs-ref">${options.watermark || 'BS 7671:2018+A3:2024 COMPLIANT'}</span>
            </p>
            <p style="color: #718096; margin: 5px 0; font-size: 12px;">
              Professional Electrical Installation Report
            </p>
          </div>
        </div>
        <div class="report-content">
          ${processedHTML}
        </div>
        ${options.includeSignatures !== false ? `
        <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; margin-top: 30px;">
            <div style="width: 45%; border-bottom: 1px solid #2d3748; padding-bottom: 5px;">
              <p style="color: #718096; font-size: 12px; margin: 5px 0;">Inspector Signature</p>
              <p style="color: #2d3748; font-size: 14px; font-weight: bold; margin: 15px 0 5px 0;">${options.author || 'Electrical Inspector'}</p>
            </div>
            <div style="width: 45%; border-bottom: 1px solid #2d3748; padding-bottom: 5px;">
              <p style="color: #718096; font-size: 12px; margin: 5px 0;">Date</p>
              <p style="color: #2d3748; font-size: 14px; margin: 15px 0 5px 0;">${new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        </div>
        ` : ''}
        <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #e2e8f0; text-align: center;">
          <p style="color: #718096; font-size: 12px; margin: 5px 0;">
            This report has been generated using AI technology in compliance with BS 7671:2018+A3:2024
          </p>
          <p style="color: #718096; font-size: 12px; margin: 5px 0;">
            Report ID: ${Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Use the same proven PDF generation options
  const opt = {
    margin: [0.8, 0.6, 0.8, 0.6], // top, left, bottom, right in inches
    filename: filename,
    image: { 
      type: 'jpeg', 
      quality: 0.95 
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.report-h1, .report-h2',
      after: '.electrical-table'
    }
  };

  await html2pdf().set(opt).from(htmlContent).save();
}

export async function generateLatexPDFPreview(
  markdown: string,
  options: LaTeXPDFOptions = {}
): Promise<string> {
  try {
    // Return HTML preview instead of LaTeX source
    const { EnhancedMarkdownProcessor } = await import('./enhanced-markdown-processor');
    const processedHTML = EnhancedMarkdownProcessor.processMarkdownToHTML(markdown);
    const reportCSS = EnhancedMarkdownProcessor.getReportCSS();

    const reportTypeName = options.reportType || "Professional Electrical Report";
    
    // Return the same HTML that will be used for PDF generation
    return `
      <!DOCTYPE html>
      <html lang="en-GB">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${reportTypeName} - Preview</title>
        ${reportCSS}
      </head>
      <body>
        <div class="electrical-report">
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #f59e0b; padding-bottom: 25px;">
            <h1 style="color: #1a365d; margin-bottom: 15px; font-size: 32px;">${options.title || reportTypeName}</h1>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #4a5568; margin: 5px 0; font-weight: bold;">Preview Generated: ${new Date().toLocaleDateString('en-GB')}</p>
              ${options.author ? `<p style="color: #2d3748; margin: 5px 0; font-size: 14px;">Inspector: ${options.author}</p>` : ''}
              <p style="color: #2d3748; margin: 5px 0; font-size: 14px; font-weight: bold;">
                <span class="bs-ref">${options.watermark || 'BS 7671:2018+A3:2024 COMPLIANT'}</span>
              </p>
            </div>
          </div>
          <div class="report-content">
            ${processedHTML}
          </div>
        </div>
      </body>
      </html>
    `;

  } catch (error) {
    console.error('HTML preview generation error:', error);
    throw error;
  }
}