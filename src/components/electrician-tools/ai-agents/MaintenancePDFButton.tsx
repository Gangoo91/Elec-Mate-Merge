import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateLaTeXStylePDF } from "@/utils/professional-latex-style-pdf";

interface MaintenancePDFButtonProps {
  maintenancePDFData: any;
  equipmentType: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const MaintenancePDFButton = ({
  maintenancePDFData,
  equipmentType,
  variant = "default",
  size = "default",
  className = "",
}: MaintenancePDFButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `maintenance-instruction-${equipmentType.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`;
      
      await generateLaTeXStylePDF(
        maintenancePDFData,
        filename,
        {
          title: `Maintenance Instruction: ${equipmentType}`,
          author: "Maintenance Specialist AI Agent",
          subject: "Equipment Maintenance & Testing Procedure",
          keywords: "maintenance, testing, BS 7671, electrical",
          includeTableOfContents: true,
          companyName: "Professional Electrical Services",
        }
      );
      
      toast.success("PDF generated successfully", {
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
      disabled={isGenerating}
      variant={variant}
      size={size}
      className={className}
    >
      <Download className="h-4 w-4 mr-2" />
      {isGenerating ? "Generating PDF..." : "Download Maintenance PDF"}
    </Button>
  );
};

export default MaintenancePDFButton;
