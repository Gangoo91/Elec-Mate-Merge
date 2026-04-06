/**
 * ExportDialog — bottom sheet that collects title block info
 * before generating a professional floor plan PDF.
 */

import { useState, RefObject, useMemo } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { generateFloorPlanPdf, FloorPlanPdfOptions } from '@/utils/floor-plan-pdf';
import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';
import { getSymbolSvgSync, loadSymbolSvg } from '@/components/electrician-tools/diagram-builder/symbols/svgLoader';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canvasRef: RefObject<{ getCanvasElement: () => HTMLCanvasElement | null } | null>;
  canvasObjects: CanvasObject[];
}

export const ExportDialog = ({
  open,
  onOpenChange,
  canvasRef,
  canvasObjects,
}: ExportDialogProps) => {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [drawingNumber, setDrawingNumber] = useState('EL-001');
  const [paperSize, setPaperSize] = useState<'a3' | 'a4'>('a3');
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [includeLegend, setIncludeLegend] = useState(true);
  const [includeTitleBlock, setIncludeTitleBlock] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Count used symbols from canvas objects
  const usedSymbolCounts = useMemo(() => {
    const counts = new Map<string, number>();
    canvasObjects
      .filter((obj) => obj.type === 'symbol' && obj.symbolId)
      .forEach((obj) => {
        const id = obj.symbolId!;
        counts.set(id, (counts.get(id) || 0) + 1);
      });
    return counts;
  }, [canvasObjects]);

  const handleGenerate = async () => {
    const canvas = canvasRef?.current?.getCanvasElement() ?? null;
    if (!canvas) {
      toast({ title: 'Export failed', description: 'Canvas not found', variant: 'destructive' });
      return;
    }

    setGenerating(true);

    try {
      // Build used symbols list with SVG data
      const usedSymbols: FloorPlanPdfOptions['usedSymbols'] = [];
      for (const [symbolId, count] of usedSymbolCounts.entries()) {
        const regEntry = symbolRegistry.find((s) => s.id === symbolId);
        if (!regEntry) continue;

        // Try sync cache first, then async load
        let svgXml = getSymbolSvgSync(symbolId);
        if (!svgXml) {
          svgXml = await loadSymbolSvg(symbolId);
        }

        usedSymbols.push({
          id: symbolId,
          name: regEntry.name,
          category: regEntry.category,
          count,
          svgXml: svgXml || '',
        });
      }

      // Sort by category then name
      usedSymbols.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

      await generateFloorPlanPdf({
        canvasElement: canvas,
        projectName,
        clientName,
        propertyAddress,
        drawingNumber,
        drawnBy: '', // Could be populated from user profile in future
        paperSize,
        orientation,
        includeLegend,
        includeTitleBlock,
        usedSymbols,
        scale: '1:50',
      });

      toast({
        title: 'PDF generated',
        description: `Professional ${paperSize.toUpperCase()} ${orientation} floor plan exported`,
        variant: 'success',
      });
      onOpenChange(false);
    } catch (err) {
      console.error('PDF generation failed:', err);
      toast({
        title: 'Export failed',
        description: 'Failed to generate floor plan PDF',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="px-5 pt-4 pb-3 border-b border-white/10 shrink-0">
            <SheetTitle className="text-white text-lg font-semibold">
              Export Floor Plan PDF
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {/* Project details */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                Project Details
              </h3>

              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-white text-sm">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Kitchen Rewire"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-white text-sm">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. J. Smith"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyAddress" className="text-white text-sm">
                  Property Address
                </Label>
                <Input
                  id="propertyAddress"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  placeholder="e.g. 14 High Street, London"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="drawingNumber" className="text-white text-sm">
                  Drawing Number
                </Label>
                <Input
                  id="drawingNumber"
                  value={drawingNumber}
                  onChange={(e) => setDrawingNumber(e.target.value)}
                  placeholder="EL-001"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Page settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Page Settings
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-white text-sm">Paper Size</Label>
                  <Select value={paperSize} onValueChange={(v) => setPaperSize(v as 'a3' | 'a4')}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="a3">A3</SelectItem>
                      <SelectItem value="a4">A4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm">Orientation</Label>
                  <Select value={orientation} onValueChange={(v) => setOrientation(v as 'landscape' | 'portrait')}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="landscape">Landscape</SelectItem>
                      <SelectItem value="portrait">Portrait</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Options
              </h3>

              <div className="flex items-center justify-between py-2">
                <Label htmlFor="includeLegend" className="text-white text-sm cursor-pointer">
                  Include Symbol Legend
                  {usedSymbolCounts.size > 0 && (
                    <span className="ml-2 text-white/50 text-xs">
                      ({usedSymbolCounts.size} symbol{usedSymbolCounts.size !== 1 ? 's' : ''})
                    </span>
                  )}
                </Label>
                <Switch
                  id="includeLegend"
                  checked={includeLegend}
                  onCheckedChange={setIncludeLegend}
                  className="touch-manipulation"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <Label htmlFor="includeTitleBlock" className="text-white text-sm cursor-pointer">
                  Include Title Block
                </Label>
                <Switch
                  id="includeTitleBlock"
                  checked={includeTitleBlock}
                  onCheckedChange={setIncludeTitleBlock}
                  className="touch-manipulation"
                />
              </div>
            </div>
          </div>

          {/* Generate button */}
          <div className="px-5 py-4 border-t border-white/10 shrink-0">
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full h-12 bg-elec-yellow text-black font-semibold text-base hover:bg-elec-yellow/90 touch-manipulation"
            >
              {generating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating PDF…
                </>
              ) : (
                <>
                  <FileDown className="h-5 w-5 mr-2" />
                  Generate PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
