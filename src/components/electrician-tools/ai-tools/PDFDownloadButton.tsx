import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateLaTeXStylePDF } from '@/utils/professional-latex-style-pdf';

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
      
      await generateLaTeXStylePDF(
        report,
        filename,
        {
          title: reportTypeName,
          author: "Electrical Inspector",
          subject: `${reportTypeName} - BS 7671:2018+A3:2024 Compliant`,
          keywords: "electrical, inspection, testing, BS7671, compliance",
          includeTableOfContents: true,
          fontFamily: 'serif',
          fontSize: 11,
          companyName: "Professional Electrical Services"
        }
      );
      
      toast({
        title: "Professional PDF Generated", 
        description: `${reportTypeName} has been generated with professional LaTeX-style formatting and BS 7671 compliance.`,
      });
    } catch (error) {
      console.error('Enhanced PDF generation error:', error);
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