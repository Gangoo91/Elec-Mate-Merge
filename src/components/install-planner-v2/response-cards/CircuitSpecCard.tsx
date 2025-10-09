import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle2, ChevronDown, AlertCircle, Edit3 } from "lucide-react";
import { useState } from "react";

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
  onEdit?: () => void;
}

export const CircuitSpecCard = ({ data, onEdit }: CircuitSpecCardProps) => {
  const [showCalculations, setShowCalculations] = useState(false);
  
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-blue-500/5 to-transparent hover:border-elec-yellow/30 transition-all">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
            📐 Circuit Design
          </Badge>
          {onEdit && (
            <Button size="sm" variant="ghost" onClick={onEdit} className="h-7 text-xs gap-1">
              <Edit3 className="h-3 w-3" />
              Edit
            </Button>
          )}
        </div>

        {/* Primary Spec - Always Visible */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-3 flex-wrap">
            <div>
              <p className="text-xs text-muted-foreground">Cable Size</p>
              <p className="text-2xl font-bold text-foreground">{data.cableSize}mm²</p>
            </div>
            <span className="text-2xl text-muted-foreground">+</span>
            <div>
              <p className="text-xs text-muted-foreground">Protection</p>
              <p className="text-xl font-bold text-foreground">{data.protectionDevice}</p>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            {data.voltageDrop?.compliant ? (
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
            )}
            <span className="text-sm text-foreground">
              BS 7671:2018 Compliant
            </span>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-muted/30 rounded p-2">
              <p className="text-xs text-muted-foreground">Voltage Drop</p>
              <p className="text-base font-semibold text-foreground">
                {data.voltageDrop?.percentage.toFixed(1)}%
                {data.voltageDrop?.compliant && (
                  <span className="text-green-400 ml-1">✓</span>
                )}
              </p>
            </div>
            <div className="bg-muted/30 rounded p-2">
              <p className="text-xs text-muted-foreground">Design Current</p>
              <p className="text-base font-semibold text-foreground">
                {data.designCurrent?.toFixed(1)}A
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Calculations */}
        <Collapsible open={showCalculations} onOpenChange={setShowCalculations}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-xs h-8"
            >
              <span>View Design Calculations</span>
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
                  <p>Actual: {data.voltageDrop.actual.toFixed(1)}V</p>
                  <p>Percentage: {data.voltageDrop.percentage.toFixed(2)}%</p>
                  <p>Max Permitted: {data.voltageDrop.limit}%</p>
                  <p className={data.voltageDrop.compliant ? "text-green-400" : "text-red-400"}>
                    {data.voltageDrop.compliant ? "✓ Within limits" : "✗ Exceeds limits"}
                  </p>
                </div>
              </div>
            )}

            {/* Earth Fault Protection */}
            {data.earthFault && (
              <div className="space-y-2 border-l-2 border-red-500/30 pl-3">
                <p className="text-xs font-semibold text-foreground">Earth Fault Protection</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Max Zs: {data.earthFault.maxZs}Ω</p>
                  {data.earthFault.actualZs && (
                    <p>Actual Zs: {data.earthFault.actualZs}Ω</p>
                  )}
                  {data.earthFault.r1r2 && (
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
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
