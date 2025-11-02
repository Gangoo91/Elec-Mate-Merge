import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CanvasObject } from "@/pages/electrician-tools/ai-tools/DiagramBuilderPage";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportControlsProps {
  canvasObjects: CanvasObject[];
}

export const ExportControls = ({ canvasObjects }: ExportControlsProps) => {
  
  const exportToPNG = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        toast({ 
          title: "Export failed", 
          description: "Canvas not found",
          variant: "destructive" 
        });
        return;
      }

      // Create a temporary canvas with white background
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext('2d');
      
      if (!ctx) return;
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw the original canvas
      ctx.drawImage(canvas, 0, 0);
      
      // Convert to blob and download
      tempCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `floor-plan-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({ 
          title: "Exported successfully", 
          description: "Your diagram has been saved as PNG",
          variant: "success" 
        });
      });
    } catch (error) {
      toast({ 
        title: "Export failed", 
        description: "Failed to export diagram",
        variant: "destructive" 
      });
    }
  };

  const exportToPDF = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        toast({ 
          title: "Export failed", 
          description: "Canvas not found",
          variant: "destructive" 
        });
        return;
      }

      const { jsPDF } = await import('jspdf');
      
      // A4 landscape dimensions in mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add title block
      pdf.setFillColor(26, 31, 46); // elec-dark
      pdf.rect(0, 0, pageWidth, 25, 'F');
      
      pdf.setTextColor(251, 191, 36); // elec-yellow
      pdf.setFontSize(18);
      pdf.text('Electrical Installation Diagram', 10, 12);
      
      pdf.setFontSize(10);
      pdf.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 10, 20);
      pdf.text(`Scale: 1:50`, pageWidth - 40, 20);

      // Add canvas image
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;
      
      pdf.addImage(imgData, 'PNG', 10, 30, imgWidth, Math.min(imgHeight, pageHeight - 40));

      // Add footer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Created with Electrician Tools - Floor Plan Builder', pageWidth / 2, pageHeight - 5, { align: 'center' });

      pdf.save(`floor-plan-${Date.now()}.pdf`);
      
      toast({ 
        title: "Exported successfully", 
        description: "Your diagram has been saved as PDF with title block",
        variant: "success" 
      });
    } catch (error) {
      toast({ 
        title: "Export failed", 
        description: "Failed to export diagram as PDF",
        variant: "destructive" 
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
        >
          <Download className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-elec-card border-elec-yellow/20">
        <DropdownMenuItem 
          onClick={exportToPNG}
          className="text-elec-light hover:bg-elec-yellow/10"
        >
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={exportToPDF}
          className="text-elec-light hover:bg-elec-yellow/10"
        >
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
