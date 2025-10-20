import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateLaTeXStylePDF } from "@/utils/professional-latex-style-pdf";

interface MaintenanceSignatures {
  technician: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
  supervisor: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
}

interface MaintenancePDFButtonProps {
  maintenancePDFData: any;
  equipmentType: string;
  signatures?: MaintenanceSignatures;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const MaintenancePDFButton = ({
  maintenancePDFData,
  equipmentType,
  signatures,
  disabled = false,
  variant = "default",
  size = "default",
  className = "",
}: MaintenancePDFButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (disabled) {
      toast.error('Signatures Required', {
        description: 'Please complete both technician and supervisor signatures before downloading'
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `maintenance-instruction-${equipmentType.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`;
      
      // Append signature metadata to PDF content if provided
      let enhancedContent = maintenancePDFData;
      if (signatures) {
        enhancedContent += `\n\n## Sign-Off & Completion\n\n`;
        enhancedContent += `**Work Completed By (Technician)**\n`;
        enhancedContent += `- Name: ${signatures.technician.name}\n`;
        enhancedContent += `- Date: ${signatures.technician.date}\n`;
        enhancedContent += `- Signature captured: ${new Date().toLocaleString('en-GB')}\n\n`;
        
        enhancedContent += `**Verified & Approved By (Supervisor/AP)**\n`;
        enhancedContent += `- Name: ${signatures.supervisor.name}\n`;
        enhancedContent += `- Date: ${signatures.supervisor.date}\n`;
        enhancedContent += `- Signature captured: ${new Date().toLocaleString('en-GB')}\n`;
      }
      
      await generateLaTeXStylePDF(
        enhancedContent,
        filename,
        {
          title: `Maintenance Instruction: ${equipmentType}`,
          author: signatures?.technician.name || "Maintenance Specialist AI Agent",
          subject: "Equipment Maintenance & Testing Procedure",
          keywords: "maintenance, testing, BS 7671, electrical, signed",
          includeTableOfContents: true,
          companyName: "Professional Electrical Services",
          includeSignatures: true
        }
      );
      
      toast.success("Signed PDF generated successfully", {
        description: `Downloaded as ${filename}`
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating || disabled}
      variant={variant}
      size={size}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Download Maintenance PDF
        </>
      )}
    </Button>
  );
};

export default MaintenancePDFButton;
