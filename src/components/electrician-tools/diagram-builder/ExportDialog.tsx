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
import {
  generateFloorPlanPdf,
  FloorPlanPdfOptions,
  CableScheduleEntry,
} from '@/utils/floor-plan-pdf';
import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';
import { getSymbolSvgSync, loadSymbolSvg } from '@/components/electrician-tools/diagram-builder/symbols/svgLoader';

/**
 * Infer a sensible cable type from the circuit reference.
 * UK convention: lighting = 1.5mm² T&E, ring finals = 2.5mm² T&E,
 * cooker = 6mm² T&E, EV = 10mm² T&E, fire alarm = 1.5mm² FP200,
 * immersion = 2.5mm² T&E, AC = 2.5mm² T&E.
 */
function inferCableTypeFromCircuit(circuitRef?: string): string {
  if (!circuitRef) return '2.5mm² T&E';
  const prefix = circuitRef.toUpperCase().replace(/[0-9]/g, '');
  switch (prefix) {
    case 'L':
      return '1.5mm² T&E';
    case 'S':
      return '2.5mm² T&E';
    case 'C':
      return '6mm² T&E';
    case 'EV':
      return '10mm² T&E';
    case 'FA':
      return '1.5mm² FP200';
    case 'IH':
      return '2.5mm² T&E';
    case 'AC':
      return '2.5mm² T&E';
    default:
      return '2.5mm² T&E';
  }
}

/** Scale from DiagramCanvas — keep in sync. */
const PX_PER_METRE = 52;

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
  const [includeSignOff, setIncludeSignOff] = useState(false);
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

  /**
   * Build the Cable Schedule for the PDF. Each cable object holds two points
   * (source + target) and an optional circuitRef. We look up the source/target
   * symbols by proximity (their x/y matches the cable's first/last point since
   * cables are created at symbol centres) and label each end with the symbol's
   * human name from the registry.
   */
  const cableSchedule = useMemo<CableScheduleEntry[]>(() => {
    const cables = canvasObjects.filter(
      (obj) => obj.type === 'cable' && obj.points && obj.points.length >= 2,
    );
    if (cables.length === 0) return [];

    // Build a lookup of symbol name by id
    const symbolNameById = new Map<string, string>();
    canvasObjects
      .filter((obj) => obj.type === 'symbol' && obj.symbolId)
      .forEach((obj) => {
        const meta = symbolRegistry.find((s) => s.id === obj.symbolId);
        if (meta) symbolNameById.set(obj.id, meta.name);
      });

    // Helper — find the symbol whose centre is closest to a given point
    const nearestSymbolLabel = (pt: { x: number; y: number }): string => {
      let best: { id: string; dist: number } | null = null;
      for (const sym of canvasObjects) {
        if (sym.type !== 'symbol') continue;
        const d = Math.hypot(sym.x - pt.x, sym.y - pt.y);
        if (d < 40 && (!best || d < best.dist)) {
          best = { id: sym.id, dist: d };
        }
      }
      return best ? symbolNameById.get(best.id) || 'Symbol' : 'Point';
    };

    return cables.map((cable, idx) => {
      const pts = cable.points!;
      let totalPx = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        totalPx += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
      }
      return {
        ref: `C${idx + 1}`,
        circuitRef: cable.circuitRef,
        fromLabel: nearestSymbolLabel(pts[0]),
        toLabel: nearestSymbolLabel(pts[pts.length - 1]),
        cableType: inferCableTypeFromCircuit(cable.circuitRef),
        lengthMetres: totalPx / PX_PER_METRE,
      };
    });
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
        includeSignOff,
        usedSymbols,
        cables: cableSchedule,
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
      <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl overflow-hidden lg:left-0">
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

              <div className="flex items-center justify-between py-2">
                <Label htmlFor="includeSignOff" className="text-white text-sm cursor-pointer">
                  Add Client Sign-Off Page
                  <span className="ml-2 text-white/50 text-xs">
                    (print + sign)
                  </span>
                </Label>
                <Switch
                  id="includeSignOff"
                  checked={includeSignOff}
                  onCheckedChange={setIncludeSignOff}
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
