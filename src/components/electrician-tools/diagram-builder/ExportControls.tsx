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

      // Create high-resolution temporary canvas (3x for print quality)
      const scale = 3;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width * scale;
      tempCanvas.height = canvas.height * scale;
      const ctx = tempCanvas.getContext('2d');
      
      if (!ctx) return;
      
      // Scale context for high resolution
      ctx.scale(scale, scale);
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the original canvas
      ctx.drawImage(canvas, 0, 0);
      
      // Convert to blob and download with high quality
      tempCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `electrical-plan-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({ 
          title: "Exported successfully", 
          description: "High-resolution PNG saved (3x quality)",
          variant: "success" 
        });
      }, 'image/png', 1.0);
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
      
      // A3 landscape for professional architectural drawings
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Professional border
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

      // Professional title block (right side)
      const titleBlockX = pageWidth - 85;
      const titleBlockY = 10;
      const titleBlockWidth = 75;
      const titleBlockHeight = 50;

      // Title block border
      pdf.setLineWidth(0.75);
      pdf.rect(titleBlockX, titleBlockY, titleBlockWidth, titleBlockHeight);
      
      // Title block subdivisions
      pdf.setLineWidth(0.3);
      pdf.line(titleBlockX, titleBlockY + 12, titleBlockX + titleBlockWidth, titleBlockY + 12);
      pdf.line(titleBlockX, titleBlockY + 24, titleBlockX + titleBlockWidth, titleBlockY + 24);
      pdf.line(titleBlockX, titleBlockY + 36, titleBlockX + titleBlockWidth, titleBlockY + 36);
      
      pdf.line(titleBlockX + 25, titleBlockY + 12, titleBlockX + 25, titleBlockY + titleBlockHeight);

      // Title block text
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ELECTRICAL INSTALLATION', titleBlockX + 2, titleBlockY + 8);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Project:', titleBlockX + 2, titleBlockY + 18);
      pdf.text('Floor Plan', titleBlockX + 27, titleBlockY + 18);
      
      pdf.text('Drawing No:', titleBlockX + 2, titleBlockY + 30);
      pdf.text('E-001', titleBlockX + 27, titleBlockY + 30);
      
      pdf.text('Scale:', titleBlockX + 2, titleBlockY + 42);
      pdf.text('1:50', titleBlockX + 27, titleBlockY + 42);
      
      pdf.text('Date:', titleBlockX + 2, titleBlockY + 54);
      pdf.text(new Date().toLocaleDateString('en-GB'), titleBlockX + 27, titleBlockY + 54);

      // Add canvas image - high quality
      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgWidth = pageWidth - 100;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;
      const imgY = (pageHeight - imgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', 10, Math.max(imgY, 15), imgWidth, Math.min(imgHeight, pageHeight - 30), undefined, 'FAST');

      // BS 7671 Compliance footer
      pdf.setFontSize(8);
      pdf.setTextColor(80, 80, 80);
      pdf.text('Drawn in accordance with BS 7671:2018+A3:2024 (IEC 60364)', 10, pageHeight - 8);
      
      // Footer - right side
      pdf.text('Created with Electrician Tools - Professional Diagram Builder', pageWidth - 10, pageHeight - 8, { align: 'right' });

      pdf.save(`electrical-installation-${Date.now()}.pdf`);
      
      toast({ 
        title: "Exported successfully", 
        description: "Professional A3 PDF with BS 7671 title block",
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
