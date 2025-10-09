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
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">C{circuitNumber}</Badge>
            <CardTitle className="text-base">{circuit.name}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Power className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Load:</span>
            <span className="font-medium">{circuit.loadPower}W</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Length:</span>
            <span className="font-medium">{circuit.cableLength}m</span>
          </div>
        </div>

        {calculationResult && (
          <div className="pt-2 border-t border-border space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Design Current:</span>
                <p className="font-medium">{calculationResult.designCurrent.toFixed(1)}A</p>
              </div>
              <div>
                <span className="text-muted-foreground">Cable:</span>
                <p className="font-medium">{calculationResult.cableSize}mm²</p>
              </div>
              <div>
                <span className="text-muted-foreground">Protection:</span>
                <p className="font-medium">{calculationResult.protectionRating}A</p>
              </div>
              <div>
                <span className="text-muted-foreground">Zs:</span>
                <p className="font-medium">{calculationResult.zs.toFixed(3)}Ω</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge 
                variant={calculationResult.compliant ? "default" : "destructive"}
                className="flex-1 justify-center"
              >
                {calculationResult.compliant ? "✓ Compliant" : "⚠ Non-Compliant"}
              </Badge>
              {onGenerateSchematic && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onGenerateSchematic}
                  disabled={loadingSchematic}
                  className="flex-1"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  {loadingSchematic ? "Generating..." : "Wiring Schematic"}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
