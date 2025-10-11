import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CheckCircle2, AlertCircle, Calculator, Zap, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Circuit {
  id: string;
  name: string;
  loadType: string;
  load: number;
  cableSize: string;
  cableLength?: number;
  cableSpec?: string;
  protection: string;
  calculations?: {
    Ib: number;
    In: number;
    Iz: number;
    IzTabulated?: number;
    equation?: string;
    tableRef?: string;
    correctionFactors?: {
      Ca: number;
      Cg: number;
    };
    voltageDrop?: {
      volts: number;
      percent: number;
      max?: number;
      compliant: boolean;
    };
    zs?: {
      calculated: number;
      max: number;
      regulation?: string;
      compliant: boolean;
    };
  };
  rcdRequirements?: {
    rating: string;
    reason: string;
  };
  regulations?: string[];
  complianceStatus?: 'pass' | 'review' | 'fail';
}

interface MultiCircuitRendererProps {
  data: {
    circuits: Circuit[];
    totalLoad?: number;
    totalLoadKW?: number;
    diversityFactor?: number;
    diversifiedLoad?: number;
    consumerUnitRequired?: string;
    costEstimate?: {
      materialsRange?: string;
      labourRange?: string;
      totalRange?: string;
      notes?: string;
    };
  };
  // PHASE 4: Enhanced metadata
  foundRegulations?: any[];
  ragMetadata?: {
    totalRAGCalls: number;
    regulationCount: number;
    searchMethod: string;
    responseTime?: number;
  };
  agentChain?: string[];
}

export const MultiCircuitRenderer = ({ data, foundRegulations, ragMetadata, agentChain }: MultiCircuitRendererProps) => {
  const [expandedCircuits, setExpandedCircuits] = useState<Set<string>>(new Set());

  const toggleCircuit = (circuitId: string) => {
    setExpandedCircuits(prev => {
      const next = new Set(prev);
      if (next.has(circuitId)) {
        next.delete(circuitId);
      } else {
        next.add(circuitId);
      }
      return next;
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'review':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'fail':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Project Overview Card */}
      <Card className="p-4 border-elec-yellow/30 bg-elec-dark/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Multi-Circuit Installation Design
            </h3>
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow">
              {data.circuits?.length || 0} Circuits
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {data.totalLoadKW && (
              <div>
                <p className="text-muted-foreground text-xs">Total Load</p>
                <p className="font-semibold text-foreground">{data.totalLoadKW}kW</p>
              </div>
            )}
            {data.diversifiedLoad && (
              <div>
                <p className="text-muted-foreground text-xs">After Diversity</p>
                <p className="font-semibold text-foreground">{(data.diversifiedLoad/1000).toFixed(1)}kW</p>
              </div>
            )}
            {data.diversityFactor && (
              <div>
                <p className="text-muted-foreground text-xs">Diversity Factor</p>
                <p className="font-semibold text-foreground">{(data.diversityFactor * 100).toFixed(0)}%</p>
              </div>
            )}
            {data.consumerUnitRequired && (
              <div className="col-span-2 sm:col-span-1">
                <p className="text-muted-foreground text-xs">Consumer Unit</p>
                <p className="font-semibold text-foreground text-xs">{data.consumerUnitRequired}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Circuit Cards */}
      <div className="space-y-3">
        {data.circuits?.map((circuit) => (
          <Card key={circuit.id} className="border-border/30 bg-card/50 overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => toggleCircuit(circuit.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(circuit.complianceStatus)}
                    <h4 className="font-semibold text-foreground truncate">{circuit.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{circuit.load}W ({(circuit.load/1000).toFixed(1)}kW)</span>
                    <span>•</span>
                    <span>{circuit.cableSize}</span>
                    <span>•</span>
                    <span>{circuit.protection}</span>
                    {circuit.rcdRequirements && (
                      <>
                        <span>•</span>
                        <span className="text-elec-yellow">{circuit.rcdRequirements.rating} RCD</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${expandedCircuits.has(circuit.id) ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Expanded Calculations */}
            {expandedCircuits.has(circuit.id) && circuit.calculations && (
              <div className="border-t border-border/30 p-4 space-y-4 bg-muted/10">
                {/* Cable Specification */}
                {circuit.cableSpec && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Cable Specification</p>
                    <p className="text-sm text-foreground">{circuit.cableSpec}</p>
                    {circuit.cableLength && (
                      <p className="text-xs text-muted-foreground mt-0.5">Length: {circuit.cableLength}m</p>
                    )}
                  </div>
                )}

                {/* Calculations Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-elec-yellow" />
                    <p className="text-xs font-semibold text-elec-yellow uppercase">Design Calculations</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="bg-muted/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Design Current (Ib)</p>
                      <p className="font-semibold text-foreground">{circuit.calculations.Ib}A</p>
                    </div>
                    <div className="bg-muted/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Protection (In)</p>
                      <p className="font-semibold text-foreground">{circuit.calculations.In}A</p>
                    </div>
                    <div className="bg-muted/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Cable Capacity (Iz)</p>
                      <p className="font-semibold text-foreground">{circuit.calculations.Iz}A</p>
                    </div>
                  </div>

                  {circuit.calculations.equation && (
                    <div className="px-3 py-2 bg-elec-yellow/10 border-l-2 border-elec-yellow rounded-r">
                      <p className="text-xs font-mono text-foreground">{circuit.calculations.equation}</p>
                      {circuit.calculations.tableRef && (
                        <p className="text-xs text-muted-foreground mt-1">Reference: {circuit.calculations.tableRef}</p>
                      )}
                    </div>
                  )}

                  {/* Voltage Drop */}
                  {circuit.calculations.voltageDrop && (
                    <div className={`px-3 py-2 border-l-2 rounded-r ${circuit.calculations.voltageDrop.compliant ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
                      <p className="text-xs font-semibold">Voltage Drop</p>
                      <p className="text-sm">
                        {circuit.calculations.voltageDrop.volts}V ({circuit.calculations.voltageDrop.percent}%)
                        {circuit.calculations.voltageDrop.max && ` - Max: ${circuit.calculations.voltageDrop.max}%`}
                      </p>
                      <p className={`text-xs ${circuit.calculations.voltageDrop.compliant ? 'text-green-500' : 'text-red-500'}`}>
                        {circuit.calculations.voltageDrop.compliant ? '✓ Within limits' : '✗ Exceeds limits'}
                      </p>
                    </div>
                  )}

                  {/* Earth Fault Loop Impedance */}
                  {circuit.calculations.zs && (
                    <div className={`px-3 py-2 border-l-2 rounded-r ${circuit.calculations.zs.compliant ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
                      <p className="text-xs font-semibold">Earth Fault Loop Impedance (Zs)</p>
                      <p className="text-sm">
                        Calculated: {circuit.calculations.zs.calculated}Ω - Max: {circuit.calculations.zs.max}Ω
                      </p>
                      {circuit.calculations.zs.regulation && (
                        <p className="text-xs text-muted-foreground">{circuit.calculations.zs.regulation}</p>
                      )}
                      <p className={`text-xs ${circuit.calculations.zs.compliant ? 'text-green-500' : 'text-red-500'}`}>
                        {circuit.calculations.zs.compliant ? '✓ Compliant' : '✗ Non-compliant'}
                      </p>
                    </div>
                  )}
                </div>

                {/* RCD Requirements */}
                {circuit.rcdRequirements && (
                  <div className="flex items-start gap-2 px-3 py-2 bg-elec-yellow/10 border-l-2 border-elec-yellow rounded-r">
                    <Shield className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-elec-yellow">RCD Protection Required</p>
                      <p className="text-sm text-foreground">{circuit.rcdRequirements.rating} - {circuit.rcdRequirements.reason}</p>
                    </div>
                  </div>
                )}

                {/* Regulations */}
                {circuit.regulations && circuit.regulations.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground">Regulations Applied</p>
                    {circuit.regulations.map((reg, idx) => (
                      <p key={idx} className="text-xs text-foreground pl-3 border-l-2 border-muted">
                        {reg}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Cost Estimate */}
      {data.costEstimate && (
        <Card className="p-4 border-elec-yellow/30 bg-card/50">
          <h4 className="text-sm font-semibold text-elec-yellow mb-3">Cost Estimate</h4>
          <div className="space-y-2 text-sm">
            {data.costEstimate.materialsRange && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Materials</span>
                <span className="font-semibold text-foreground">{data.costEstimate.materialsRange}</span>
              </div>
            )}
            {data.costEstimate.labourRange && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Labour</span>
                <span className="font-semibold text-foreground">{data.costEstimate.labourRange}</span>
              </div>
            )}
            {data.costEstimate.totalRange && (
              <>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total (ex. VAT)</span>
                  <span className="font-bold text-elec-yellow">{data.costEstimate.totalRange}</span>
                </div>
              </>
            )}
            {data.costEstimate.notes && (
              <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/30">
                {data.costEstimate.notes}
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
