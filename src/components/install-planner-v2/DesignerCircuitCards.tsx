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
            <div className="space-y-3">
              <h4 className="text-xl sm:text-2xl font-bold text-foreground text-center">{circuit.name}</h4>
              
              <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">MCB Rating</p>
                  <p className="text-3xl sm:text-4xl font-bold text-elec-yellow">{circuit.protection}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Cable Size</p>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground">{circuit.cableSize}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Load: {circuit.load}W ({(circuit.load/1000).toFixed(1)}kW)
              </p>
            </div>
          </CardHeader>
          
          <Collapsible open={expandedCircuits.has(circuit.id)}>
            <div className="px-4 sm:px-6 pb-3">
              <CollapsibleTrigger 
                onClick={() => toggleCircuit(circuit.id)}
                asChild
              >
                <button className="w-full px-4 py-2 flex items-center justify-center gap-2 border border-elec-yellow/30 rounded-lg hover:bg-elec-yellow/10 transition-colors min-h-[44px]">
                  <span className="text-sm font-medium">
                    View Working Out
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedCircuits.has(circuit.id) ? 'rotate-180' : ''}`} />
                </button>
              </CollapsibleTrigger>
            </div>
            
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