import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';

interface PDFDownloadButtonProps {
  report: string;
  template: string;
  reportTypeName: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  report,
  template,
  reportTypeName,
  variant = "outline",
  size = "sm",
  className = ""
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      const filename = `${reportTypeName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Use enhanced markdown processor
      const { EnhancedMarkdownProcessor } = await import('@/utils/enhanced-markdown-processor');
      const processedHTML = EnhancedMarkdownProcessor.processMarkdownToHTML(report);
      const reportCSS = EnhancedMarkdownProcessor.getReportCSS();

      // Create comprehensive HTML content with professional styling
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
              <h1 style="color: #1a365d; margin-bottom: 15px; font-size: 32px;">${reportTypeName}</h1>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #4a5568; margin: 5px 0; font-weight: bold;">Generated: ${new Date().toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p style="color: #2d3748; margin: 5px 0; font-size: 14px; font-weight: bold;">
                  <span class="bs-ref">BS 7671:2018+A3:2024 COMPLIANT</span>
                </p>
                <p style="color: #718096; margin: 5px 0; font-size: 12px;">
                  Professional Electrical Installation Report
                </p>
              </div>
            </div>
            <div class="report-content">
              ${processedHTML}
            </div>
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

      // Enhanced PDF generation options
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
          before: '.page-break-before',
          after: '.page-break-after'
        }
      };

      // Create a temporary element for PDF generation
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.top = '-9999px';
      document.body.appendChild(element);

      try {
        await html2pdf().set(opt).from(element).save();
        
        toast({
          title: "Professional PDF Generated", 
          description: `${reportTypeName} has been downloaded successfully.`,
        });
      } finally {
        // Clean up
        document.body.removeChild(element);
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the professional PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={isGenerating}
      className={`border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm ${className}`}
    >
      <Download className="h-4 w-4 mr-2" />
      <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
    </Button>
  );
};

export default PDFDownloadButton;