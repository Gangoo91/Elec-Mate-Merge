import { Download, FileImage, FileText } from 'lucide-react';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { Button } from '@/components/ui/button';
import { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RefObject } from 'react';

interface ExportControlsProps {
  canvasObjects: CanvasObject[];
  canvasRef?: RefObject<{ getCanvasElement: () => HTMLCanvasElement | null } | null>;
  /** When true, render as DropdownMenuItems instead of a standalone dropdown */
  asMenuItems?: boolean;
  /** Callback to open the PDF export dialog sheet instead of direct export */
  onOpenPdfDialog?: () => void;
}

const useExportActions = (canvasRef?: ExportControlsProps['canvasRef']) => {
  const exportToPNG = async () => {
    try {
      const canvas = canvasRef?.current?.getCanvasElement() ?? null;
      if (!canvas) {
        toast({ title: 'Export failed', description: 'Canvas not found', variant: 'destructive' });
        return;
      }

      const scale = 3;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width * scale;
      tempCanvas.height = canvas.height * scale;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(scale, scale);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvas, 0, 0);

      tempCanvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `electrical-plan-${Date.now()}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          toast({ title: 'Exported successfully', description: 'High-resolution PNG saved (3x quality)', variant: 'success' });
        },
        'image/png',
        1.0
      );
    } catch {
      toast({ title: 'Export failed', description: 'Failed to export diagram', variant: 'destructive' });
    }
  };

  const exportToPDF = async () => {
    try {
      const canvas = canvasRef?.current?.getCanvasElement() ?? null;
      if (!canvas) {
        toast({ title: 'Export failed', description: 'Canvas not found', variant: 'destructive' });
        return;
      }

      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a3' });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

      const titleBlockX = pageWidth - 85;
      const titleBlockY = 10;
      const titleBlockWidth = 75;
      const titleBlockHeight = 50;

      pdf.setLineWidth(0.75);
      pdf.rect(titleBlockX, titleBlockY, titleBlockWidth, titleBlockHeight);

      pdf.setLineWidth(0.3);
      pdf.line(titleBlockX, titleBlockY + 12, titleBlockX + titleBlockWidth, titleBlockY + 12);
      pdf.line(titleBlockX, titleBlockY + 24, titleBlockX + titleBlockWidth, titleBlockY + 24);
      pdf.line(titleBlockX, titleBlockY + 36, titleBlockX + titleBlockWidth, titleBlockY + 36);
      pdf.line(titleBlockX + 25, titleBlockY + 12, titleBlockX + 25, titleBlockY + titleBlockHeight);

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

      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgWidth = pageWidth - 100;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;
      const imgY = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', 10, Math.max(imgY, 15), imgWidth, Math.min(imgHeight, pageHeight - 30), undefined, 'FAST');

      pdf.setFontSize(8);
      pdf.setTextColor(80, 80, 80);
      pdf.text('Drawn in accordance with BS 7671:2018+A3:2024 (IEC 60364)', 10, pageHeight - 8);
      pdf.text('Created with Electrician Tools - Professional Diagram Builder', pageWidth - 10, pageHeight - 8, { align: 'right' });

      await saveOrSharePdf(pdf, `electrical-installation-${Date.now()}.pdf`);
      toast({ title: 'Exported successfully', description: 'Professional A3 PDF with BS 7671 title block', variant: 'success' });
    } catch {
      toast({ title: 'Export failed', description: 'Failed to export diagram as PDF', variant: 'destructive' });
    }
  };

  return { exportToPNG, exportToPDF };
};

export const ExportControls = ({ canvasObjects, canvasRef, asMenuItems, onOpenPdfDialog }: ExportControlsProps) => {
  const { exportToPNG, exportToPDF } = useExportActions(canvasRef);

  const handlePdfExport = onOpenPdfDialog ?? exportToPDF;

  // Render as DropdownMenuItems for embedding in parent menus
  if (asMenuItems) {
    return (
      <>
        <DropdownMenuItem onClick={exportToPNG} className="text-white hover:bg-white/10 touch-manipulation">
          <FileImage className="h-4 w-4 mr-2" />
          Export PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePdfExport} className="text-white hover:bg-white/10 touch-manipulation">
          <FileText className="h-4 w-4 mr-2" />
          Export PDF
        </DropdownMenuItem>
      </>
    );
  }

  // Standalone dropdown (fallback)
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
      <DropdownMenuContent align="end" className="bg-elec-card border-white/10">
        <DropdownMenuItem onClick={exportToPNG} className="text-white hover:bg-white/10">
          <FileImage className="h-4 w-4 mr-2" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePdfExport} className="text-white hover:bg-white/10">
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
