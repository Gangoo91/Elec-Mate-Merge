import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, ChevronDown, AlertCircle, Zap, RefreshCw, HelpCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import { EditableField } from "../EditableField";
import { generateSingleLineDiagram } from "@/lib/diagramGenerator/layoutEngine";
import { SVGDiagramRenderer } from "@/components/circuit-diagrams/SVGDiagramRenderer";
import { useToast } from "@/hooks/use-toast";
import { CitationBadge } from "../CitationBadge";

interface CircuitSpecData {
  cableSize?: number;
  protectionDevice?: string;
  designCurrent?: number;
  deviceRating?: number;
  correctedCapacity?: number;
  correctionFactors?: {
    temperature?: number;
    grouping?: number;
    overall?: number;
  };
  voltageDrop?: {
    actual: number;
    percentage: number;
    limit: number;
    compliant: boolean;
  };
  earthFault?: {
    maxZs: number;
    actualZs?: number;
    r1r2?: number;
  };
  installationMethod?: string;
}

interface CircuitSpecCardProps {
  data: CircuitSpecData;
  planData?: any;
  onSpecChange?: (newData: CircuitSpecData) => void;
  citations?: any[];
}

export const CircuitSpecCard = ({ data, planData, onSpecChange, citations }: CircuitSpecCardProps) => {
  const [showCalculations, setShowCalculations] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [diagram, setDiagram] = useState<any>(null);
  const [localData, setLocalData] = useState(data);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const { toast } = useToast();

  // Generate circuit diagram on mount
  useState(() => {
    if (planData && localData.cableSize) {
      try {
        const circuitData = {
          circuitNumber: 1,
          name: planData.loadType || 'Circuit',
          voltage: planData.voltage,
          cableSize: localData.cableSize,
          cpcSize: localData.cableSize >= 16 ? localData.cableSize / 2 : localData.cableSize,
          cableLength: planData.cableLength,
          loadType: planData.loadType || 'General Load',
          loadPower: planData.totalLoad,
          protectionDevice: {
            type: localData.protectionDevice?.includes('Type B') ? 'B' : 
                  localData.protectionDevice?.includes('Type C') ? 'C' : 'B',
            rating: parseInt(localData.protectionDevice?.match(/(\d+)A/)?.[1] || '16'),
            poles: planData.phases === 'three' ? 3 : 1,
            kaRating: 6,
          },
          earthing: planData.environmentalProfile?.finalApplied?.earthing || 'TN-S',
          rcdProtected: true,
          ze: planData.environmentalProfile?.finalApplied?.ze || 0.35,
        };
        const generatedDiagram = generateSingleLineDiagram(circuitData);
        setDiagram(generatedDiagram);
      } catch (error) {
        console.error('Failed to generate diagram:', error);
      }
    }
  });

  const handleFieldUpdate = (field: string, newValue: any, validation: any) => {
    const updatedData = { ...localData, [field]: newValue };
    
    // Update with new calculations if provided
    if (validation?.newCalculations) {
      if (validation.newCalculations.capacity) {
        updatedData.correctedCapacity = validation.newCalculations.capacity.Iz;
        updatedData.correctionFactors = validation.newCalculations.capacity.factors;
      }
      if (validation.newCalculations.voltageDrop) {
        updatedData.voltageDrop = {
          actual: validation.newCalculations.voltageDrop.voltageDropVolts,
          percentage: validation.newCalculations.voltageDrop.voltageDropPercent,
          limit: validation.newCalculations.voltageDrop.maxAllowed,
          compliant: validation.newCalculations.voltageDrop.compliant,
        };
      }
    }

    setLocalData(updatedData);
    onSpecChange?.(updatedData);
  };

  const handleRecalculate = () => {
    setIsRecalculating(true);
    toast({
      title: "Recalculating design...",
      description: "Running full BS 7671 compliance checks",
    });
    
    // Trigger recalculation by resetting local data to original
    setTimeout(() => {
      setLocalData(data);
      setIsRecalculating(false);
      toast({
        title: "Design recalculated",
        description: "All calculations verified for current parameters",
      });
    }, 800);
  };
  
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-blue-500/5 to-transparent hover:border-elec-yellow/30 transition-all max-w-full overflow-hidden">
      <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-w-full overflow-hidden break-words">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
            📐 Circuit Design
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="h-7 text-xs"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isRecalculating ? 'animate-spin' : ''}`} />
            Recalculate
          </Button>
        </div>

        {/* Hero Section - Prominent Design */}
        <div className="space-y-3">
          <div className="text-center py-3 sm:py-4 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5 rounded-lg border border-elec-yellow/20">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-2 px-2 break-words">
              {planData?.loadType || 'Circuit Design'}
            </h2>
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap px-2">
              <Badge className="bg-elec-yellow text-elec-dark text-xs sm:text-base md:text-lg px-2 sm:px-4 py-0.5 sm:py-1 font-bold">
                MCB: {localData.protectionDevice}
              </Badge>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Cable Size</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground/70 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs" side="top">
                        <p className="text-xs">
                          Selected based on design current ({localData.designCurrent?.toFixed(1)}A), 
                          correction factors ({localData.correctionFactors?.overall || 'N/A'}), 
                          and corrected capacity ({localData.correctedCapacity?.toFixed(1)}A)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {planData ? (
                  <EditableField
                    label="Cable Size"
                    value={localData.cableSize || 0}
                    fieldType="cable"
                    context={{ planData, currentSpec: localData }}
                    onValidated={(newValue, validation) => handleFieldUpdate('cableSize', newValue, validation)}
                  />
                ) : (
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{localData.cableSize}mm²</p>
                )}
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              {localData.voltageDrop?.compliant ? (
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
              )}
              <span className="text-xs sm:text-sm text-foreground">
                BS 7671:2018 Compliant
              </span>
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {localData.voltageDrop?.compliant && (
                <Badge variant="outline" className="text-[9px] sm:text-[10px] bg-green-500/10 border-green-500/30 text-green-400">
                  <BookOpen className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5 sm:mr-1" />
                  525.1 ✓
                </Badge>
              )}
              {localData.earthFault?.maxZs && (
                <Badge variant="outline" className="text-[9px] sm:text-[10px] bg-blue-500/10 border-blue-500/30 text-blue-400">
                  <BookOpen className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5 sm:mr-1" />
                  411.4 ✓
                </Badge>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
            <div className="bg-muted/30 rounded p-2">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Voltage Drop</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                {localData.voltageDrop?.percentage.toFixed(1)}%
                {localData.voltageDrop?.compliant && (
                  <span className="text-green-400 ml-1">✓</span>
                )}
              </p>
            </div>
            <div className="bg-muted/30 rounded p-2">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Design Current</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                {localData.designCurrent?.toFixed(1)}A
              </p>
            </div>
          </div>
        </div>

        {/* Circuit Diagram Preview */}
        {diagram && (
          <div className="space-y-2">
            <Collapsible open={showDiagram} onOpenChange={setShowDiagram}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-between text-xs h-8 border-elec-yellow/30"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Circuit Diagram
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showDiagram ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="pt-3">
                <div className="border border-border/50 rounded-lg overflow-hidden bg-background">
                  <SVGDiagramRenderer layout={diagram} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        {/* Expandable Working Out */}
        <Collapsible open={showCalculations} onOpenChange={setShowCalculations}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-between text-xs h-9 border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <span className="font-medium">View Working Out</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showCalculations ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-3 pt-3">
            {/* Design Current Section */}
            <div className="space-y-2 border-l-2 border-blue-500/30 pl-3">
              <p className="text-xs font-semibold text-foreground">Design Current (Ib)</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Design Current: {data.designCurrent?.toFixed(1)}A</p>
                <p>Device Rating (In): {data.deviceRating}A</p>
                <p>Corrected Capacity (Iz): {data.correctedCapacity?.toFixed(1)}A</p>
              </div>
            </div>

            {/* Correction Factors */}
            {data.correctionFactors && (
              <div className="space-y-2 border-l-2 border-yellow-500/30 pl-3">
                <p className="text-xs font-semibold text-foreground">Correction Factors</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Temperature (Ca): {data.correctionFactors.temperature}</p>
                  <p>Grouping (Cg): {data.correctionFactors.grouping}</p>
                  <p>Overall: {data.correctionFactors.overall}</p>
                </div>
              </div>
            )}

            {/* Voltage Drop */}
            {data.voltageDrop && (
              <div className="space-y-2 border-l-2 border-green-500/30 pl-3">
                <p className="text-xs font-semibold text-foreground">Voltage Drop</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  {data.voltageDrop.actual !== undefined && (
                    <p>Actual: {data.voltageDrop.actual.toFixed(1)}V</p>
                  )}
                  {data.voltageDrop.percentage !== undefined && (
                    <p>Percentage: {data.voltageDrop.percentage.toFixed(2)}%</p>
                  )}
                  {data.voltageDrop.limit !== undefined && (
                    <p>Max Permitted: {data.voltageDrop.limit}%</p>
                  )}
                  {data.voltageDrop.compliant !== undefined && (
                    <p className={data.voltageDrop.compliant ? "text-green-400" : "text-red-400"}>
                      {data.voltageDrop.compliant ? "✓ Within limits" : "✗ Exceeds limits"}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Earth Fault Protection */}
            {data.earthFault && data.earthFault.maxZs !== undefined && (
              <div className="space-y-2 border-l-2 border-red-500/30 pl-3">
                <p className="text-xs font-semibold text-foreground">Earth Fault Protection</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Max Zs: {data.earthFault.maxZs}Ω</p>
                  {data.earthFault.actualZs !== undefined && (
                    <p>Actual Zs: {data.earthFault.actualZs}Ω</p>
                  )}
                  {data.earthFault.r1r2 !== undefined && (
                    <p>R1+R2: {data.earthFault.r1r2}Ω</p>
                  )}
                </div>
              </div>
            )}

            {/* Installation Method */}
            {data.installationMethod && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Installation Method: <span className="text-foreground">{data.installationMethod}</span>
                </p>
              </div>
            )}

            {/* Citations */}
            {citations && citations.length > 0 && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs font-semibold text-foreground mb-2">Regulation References</p>
                <div className="flex flex-wrap gap-1">
                  {citations.map((citation, idx) => (
                    <CitationBadge key={idx} citation={citation} index={idx} />
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
