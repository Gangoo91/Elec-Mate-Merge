import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Circuit {
  id: string;
  name: string;
  loadType: string;
  load: number;
  cableSize: string;
  cableSpec: string;
  cableLength?: number;
  protection: string;
  calculations: {
    Ib: number;
    In: number;
    Iz: number;
    IzTabulated?: number;
    equation?: string;
    tableRef?: string;
    correctionFactors?: { Ca: number; Cg: number };
    voltageDrop: { volts: number; percent: number; compliant: boolean; max?: number };
    zs: { calculated: number; max: number; compliant: boolean; regulation?: string };
  };
  rcdRequirements?: {
    rating: string;
    reason: string;
  };
  regulations?: string[];
  complianceStatus: 'pass' | 'fail' | 'warning';
}

interface MultiCircuitResultsDisplayProps {
  circuits: Circuit[];
  totalLoad: number;
  totalLoadKW: number;
  diversityFactor?: number;
  diversifiedLoad: number;
  consumerUnitRequired: string;
  costEstimate?: {
    materialsRange: string;
    labourRange: string;
    totalRange: string;
    notes: string;
  };
}

export const MultiCircuitResultsDisplay = ({
  circuits,
  totalLoad,
  totalLoadKW,
  diversityFactor,
  diversifiedLoad,
  consumerUnitRequired,
  costEstimate
}: MultiCircuitResultsDisplayProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Summary Card */}
      <Card className="p-5 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-primary">⚡</span>
          Installation Summary
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Load:</span>
            <span className="font-bold">{totalLoadKW}kW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">After Diversity:</span>
            <span className="font-bold">{(diversifiedLoad/1000).toFixed(1)}kW</span>
          </div>
          {diversityFactor && (
            <div className="flex justify-between col-span-2">
              <span className="text-muted-foreground">Diversity Factor:</span>
              <span className="font-bold">{(diversityFactor * 100).toFixed(0)}%</span>
            </div>
          )}
          <div className="flex justify-between col-span-2 pt-2 border-t">
            <span className="text-muted-foreground">Consumer Unit:</span>
            <span className="font-bold text-primary">{consumerUnitRequired}</span>
          </div>
        </div>
        
        {costEstimate && (
          <>
            <Separator className="my-3" />
            <div className="text-sm">
              <div className="font-semibold mb-2">Cost Estimate</div>
              <div className="space-y-1 text-muted-foreground">
                <div>Materials: {costEstimate.materialsRange}</div>
                <div>Labour: {costEstimate.labourRange}</div>
                <div className="font-bold text-foreground">Total: {costEstimate.totalRange}</div>
                <div className="text-xs mt-2">{costEstimate.notes}</div>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Individual Circuit Cards - EXACT MATCH TO SINGLE CIRCUIT */}
      {circuits.map((circuit, index) => (
        <Card key={circuit.id} className="p-5">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{circuit.name}</h3>
                <p className="text-sm text-muted-foreground">Circuit {index + 1}</p>
              </div>
              <Badge 
                className={
                  circuit.complianceStatus === 'pass' 
                    ? 'bg-green-500/20 text-green-700 border-green-500/30' 
                    : circuit.complianceStatus === 'warning'
                    ? 'bg-amber-500/20 text-amber-700 border-amber-500/30'
                    : 'bg-red-500/20 text-red-700 border-red-500/30'
                }
              >
                {circuit.complianceStatus === 'pass' && '✓ BS 7671 Compliant'}
                {circuit.complianceStatus === 'warning' && '⚠ Review Required'}
                {circuit.complianceStatus === 'fail' && '✗ Non-Compliant'}
              </Badge>
            </div>

            {/* Parameters - Stacked 1/1/1/1 EXACTLY LIKE SINGLE CIRCUIT */}
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                <span className="text-sm text-muted-foreground">Load</span>
                <span className="font-bold text-primary">
                  {(circuit.load/1000).toFixed(1)}kW ({circuit.load}W)
                </span>
              </div>
              <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                <span className="text-sm text-muted-foreground">Cable</span>
                <span className="font-bold text-primary">{circuit.cableSpec}</span>
              </div>
              {circuit.cableLength && (
                <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                  <span className="text-sm text-muted-foreground">Distance</span>
                  <span className="font-bold text-primary">{circuit.cableLength}m</span>
                </div>
              )}
              <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                <span className="text-sm text-muted-foreground">Protection</span>
                <span className="font-bold text-primary">{circuit.protection}</span>
              </div>
              <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                <span className="text-sm text-muted-foreground">Voltage Drop</span>
                <span className={`font-bold ${circuit.calculations.voltageDrop.compliant ? 'text-primary' : 'text-red-500'}`}>
                  {circuit.calculations.voltageDrop.percent.toFixed(2)}%
                  {!circuit.calculations.voltageDrop.compliant && ' ⚠ EXCEEDS LIMIT'}
                </span>
              </div>
            </div>

            {/* Calculations Section */}
            <div className="border-t pt-3">
              <div className="text-sm font-semibold mb-2">Calculations</div>
              <div className="font-mono text-sm text-muted-foreground space-y-1">
                <div>Ib: {circuit.calculations.Ib}A | In: {circuit.calculations.In}A | Iz: {circuit.calculations.Iz}A</div>
                {circuit.calculations.equation && (
                  <div className="text-xs">{circuit.calculations.equation}</div>
                )}
                {circuit.calculations.tableRef && (
                  <div className="text-xs">Reference: {circuit.calculations.tableRef}</div>
                )}
              </div>
              
              {/* Voltage Drop Detail */}
              <div className="mt-2 text-xs text-muted-foreground">
                Voltage Drop: {circuit.calculations.voltageDrop.volts.toFixed(2)}V 
                ({circuit.calculations.voltageDrop.percent.toFixed(2)}%)
                {circuit.calculations.voltageDrop.max && ` - Max: ${circuit.calculations.voltageDrop.max}%`}
              </div>
              
              {/* Zs Detail */}
              <div className="mt-1 text-xs text-muted-foreground">
                Earth Fault Loop (Zs): {circuit.calculations.zs.calculated.toFixed(2)}Ω 
                (Max: {circuit.calculations.zs.max.toFixed(2)}Ω)
                {circuit.calculations.zs.regulation && ` - ${circuit.calculations.zs.regulation}`}
                {circuit.calculations.zs.compliant ? ' ✓' : ' ✗'}
              </div>
            </div>

            {/* RCD Requirements */}
            {circuit.rcdRequirements && (
              <div className="border-t pt-3">
                <div className="text-sm font-semibold mb-1">RCD Protection</div>
                <div className="text-xs text-muted-foreground">
                  {circuit.rcdRequirements.rating} - {circuit.rcdRequirements.reason}
                </div>
              </div>
            )}

            {/* Regulations Referenced */}
            {circuit.regulations && circuit.regulations.length > 0 && (
              <div className="border-t pt-3">
                <div className="text-sm font-semibold mb-2">Regulations</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  {circuit.regulations.slice(0, 3).map((reg, i) => (
                    <div key={i}>• {reg}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
