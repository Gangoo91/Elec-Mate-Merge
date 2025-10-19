import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Power, Zap, FileText } from "lucide-react";
import { FullCircuitDesign } from "../types";

interface CircuitCardProps {
  circuit: FullCircuitDesign;
  circuitNumber: number;
  onEdit: () => void;
  onDelete: () => void;
  onGenerateSchematic?: () => void;
  loadingSchematic?: boolean;
  calculationResult?: {
    designCurrent: number;
    cableSize: number;
    protectionRating: number;
    zs: number;
    voltageDropPercent: number;
    compliant: boolean;
  };
}

export const CircuitCard = ({ 
  circuit, 
  circuitNumber, 
  onEdit, 
  onDelete,
  onGenerateSchematic,
  loadingSchematic,
  calculationResult 
}: CircuitCardProps) => {
  return (
    <Card className="bg-background hover:bg-accent/5 border-2 border-border hover:border-primary/40 transition-all hover:shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Large circuit number badge */}
          <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold text-primary">C{circuitNumber}</span>
          </div>
          
          {/* Circuit info */}
          <div className="flex-1 min-w-0 w-full sm:w-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">{circuit.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 capitalize">{circuit.loadType.replace('-', ' ')}</p>
            
            {/* Compact details grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Power className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground block">Load</span>
                  <span className="font-semibold">{circuit.loadPower}W</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground block">Length</span>
                  <span className="font-semibold">{circuit.cableLength}m</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Large, touch-friendly action buttons */}
          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <Button 
              size="lg" 
              variant="outline" 
              className="h-11 w-full sm:w-11 flex-1 sm:flex-initial hover:bg-primary/10 hover:text-primary hover:border-primary/50" 
              onClick={onEdit}
            >
              <Edit className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="sm:hidden ml-2">Edit</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-11 w-full sm:w-11 flex-1 sm:flex-initial text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50" 
              onClick={onDelete}
            >
              <Trash2 className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="sm:hidden ml-2">Delete</span>
            </Button>
          </div>
        </div>
        
        {/* Calculation results section */}
        {calculationResult && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-accent/30 rounded-lg p-2">
                <span className="text-xs text-muted-foreground block mb-1">Design Current</span>
                <p className="font-bold text-sm">{calculationResult.designCurrent.toFixed(1)}A</p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2">
                <span className="text-xs text-muted-foreground block mb-1">Cable Size</span>
                <p className="font-bold text-sm">{calculationResult.cableSize}mm²</p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2">
                <span className="text-xs text-muted-foreground block mb-1">Protection</span>
                <p className="font-bold text-sm">{calculationResult.protectionRating}A</p>
              </div>
              <div className="bg-accent/30 rounded-lg p-2">
                <span className="text-xs text-muted-foreground block mb-1">Zs</span>
                <p className="font-bold text-sm">{calculationResult.zs.toFixed(3)}Ω</p>
              </div>
            </div>
            
            <Badge 
              variant={calculationResult.compliant ? "default" : "destructive"}
              className="w-full justify-center h-8 text-sm"
            >
              {calculationResult.compliant ? "✓ BS 7671 Compliant" : "⚠ Non-Compliant - Review Required"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
