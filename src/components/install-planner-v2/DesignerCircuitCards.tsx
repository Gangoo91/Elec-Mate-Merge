import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Circuit {
  id: string;
  name: string;
  loadType: string;
  load: number;
  cableSize: string;
  protection: string;
  calculations: {
    Ib: number;
    In: number;
    Iz: number;
    voltageDrop: { volts: number; percent: number; compliant: boolean };
    zs: { calculated: number; max: number; compliant: boolean };
  };
  compliance: string;
}

export const DesignerCircuitCards = ({ circuits }: { circuits: Circuit[] }) => {
  const [expandedCircuits, setExpandedCircuits] = useState<Set<string>>(new Set());

  const toggleCircuit = (id: string) => {
    setExpandedCircuits(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {circuits.map(circuit => (
        <Card key={circuit.id} className="border-blue-500/20 bg-card/40">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-foreground">{circuit.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Load: {circuit.load}W ({(circuit.load/1000).toFixed(1)}kW)
                </p>
              </div>
              <div className="flex flex-row sm:flex-col gap-2 flex-wrap">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30 text-xs sm:text-sm">
                  {circuit.protection}
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 text-xs sm:text-sm">
                  {circuit.cableSize}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <Collapsible open={expandedCircuits.has(circuit.id)}>
            <CollapsibleTrigger 
              onClick={() => toggleCircuit(circuit.id)}
              className="w-full px-4 sm:px-6 py-2 flex items-center justify-between hover:bg-muted/50 transition-colors min-h-[44px]"
            >
              <span className="text-sm font-medium text-muted-foreground">
                View Calculations
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedCircuits.has(circuit.id) ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent className="space-y-3 pt-3 px-4 sm:px-6">
                {/* Current Ratings */}
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Ib (Design)</p>
                    <p className="font-semibold text-foreground">{circuit.calculations.Ib}A</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">In (MCB)</p>
                    <p className="font-semibold text-foreground">{circuit.calculations.In}A</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Iz (Cable)</p>
                    <p className="font-semibold text-foreground">{circuit.calculations.Iz}A</p>
                  </div>
                </div>

                {/* Voltage Drop */}
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Voltage Drop</p>
                    <p className="text-xs text-muted-foreground">
                      {circuit.calculations.voltageDrop.volts}V ({circuit.calculations.voltageDrop.percent}%)
                    </p>
                  </div>
                  {circuit.calculations.voltageDrop.compliant ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Compliant
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Exceeds Limit
                    </Badge>
                  )}
                </div>

                {/* Earth Fault Loop */}
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Earth Fault Loop (Zs)</p>
                    <p className="text-xs text-muted-foreground">
                      {circuit.calculations.zs.calculated}Ω (max {circuit.calculations.zs.max}Ω)
                    </p>
                  </div>
                  {circuit.calculations.zs.compliant ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Compliant
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Exceeds Max
                    </Badge>
                  )}
                </div>

                {/* Compliance Note */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {circuit.compliance}
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
};