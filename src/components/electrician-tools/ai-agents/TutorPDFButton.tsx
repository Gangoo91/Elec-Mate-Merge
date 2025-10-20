import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateLaTeXStylePDF } from "@/utils/professional-latex-style-pdf";

interface TutorPDFButtonProps {
  tutorPDFData: any;
  topic: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const TutorPDFButton = ({
  tutorPDFData,
  topic,
  variant = "default",
  size = "default",
  className = "",
}: TutorPDFButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `learning-report-${topic.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}-${timestamp}.pdf`;
      
      await generateLaTeXStylePDF(
        tutorPDFData,
        filename,
        {
          title: `Learning Report: ${topic}`,
          author: "Training Tutor AI Agent",
          subject: "Electrical Training & Educational Guidance",
          keywords: "education, training, BS 7671, exam preparation",
          includeTableOfContents: true,
          companyName: "Professional Electrical Training",
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
      {isGenerating ? "Generating PDF..." : "Download Learning Report PDF"}
    </Button>
  );
};

export default TutorPDFButton;
