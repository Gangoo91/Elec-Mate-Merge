import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap, FileText, Download } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WiringSchematicPreview } from "./WiringSchematicPreview";

interface Circuit {
  id: string;
  name: string;
  loadType?: string;
  totalLoad?: number;
  cableSize?: string;
  protection?: string;
  voltage?: number;
  phases?: string;
  cableLength?: number;
}

interface CircuitSummaryCardProps {
  circuit: Circuit;
  onGenerateSchematic: (circuitId: string) => void;
  schematic?: any;
  isLoading: boolean;
}

export const CircuitSummaryCard = ({ 
  circuit, 
  onGenerateSchematic, 
  schematic, 
  isLoading 
}: CircuitSummaryCardProps) => {
  const [showSchematicDialog, setShowSchematicDialog] = useState(false);

  return (
    <>
      <Card className="p-4 space-y-3 bg-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{circuit.name}</h3>
            <p className="text-sm text-foreground/70 mt-1">
              {circuit.totalLoad ? `${circuit.totalLoad}W` : 'Power TBC'} • 
              {circuit.cableSize ? ` ${circuit.cableSize}mm²` : ' Cable TBC'} • 
              {circuit.cableLength ? ` ${circuit.cableLength}m` : ' Length TBC'}
            </p>
          </div>
          {circuit.protection && (
            <Badge variant="secondary" className="ml-2 flex-shrink-0">
              {circuit.protection}
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded bg-elec-dark/50 border border-elec-yellow/10">
            <div className="text-foreground/60">Voltage</div>
            <div className="font-semibold text-foreground">{circuit.voltage || 230}V {circuit.phases === 'three' ? '3φ' : '1φ'}</div>
          </div>
          <div className="p-2 rounded bg-elec-dark/50 border border-elec-yellow/10">
            <div className="text-foreground/60">Type</div>
            <div className="font-semibold text-foreground capitalize">{circuit.loadType || 'General'}</div>
          </div>
        </div>

        {schematic ? (
          <div className="space-y-2">
            <Button 
              onClick={() => setShowSchematicDialog(true)}
              variant="outline" 
              className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Wiring Schematic
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => onGenerateSchematic(circuit.id)}
            disabled={isLoading}
            variant="default"
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Schematic...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Wiring Schematic
              </>
            )}
          </Button>
        )}
      </Card>

      {/* Schematic Preview Dialog */}
      {schematic && (
        <Dialog open={showSchematicDialog} onOpenChange={setShowSchematicDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-elec-card">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Wiring Schematic - {circuit.name}
              </DialogTitle>
            </DialogHeader>
            <WiringSchematicPreview schematic={schematic} circuitName={circuit.name} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
