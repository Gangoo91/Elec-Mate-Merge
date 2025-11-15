import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";

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
  // Helper: Get accessories by load type
  const getLoadTypeAccessories = (loadType: string): string[] => {
    const accessoriesMap: Record<string, string[]> = {
      'socket_ring': ['2-4x Twin socket outlets', '2-4x 25mm metal back boxes', 'Cable clips/cleats'],
      'lighting': ['4-6x Ceiling roses', '1-2x Light switches', '1-2x 25mm back boxes', 'Connector blocks'],
      'shower': ['1x 45A shower pull cord isolator', '1x 35mm deep back box', 'IP-rated cable glands'],
      'electric_shower': ['1x 45A shower pull cord isolator', '1x 35mm deep back box', 'IP-rated cable glands'],
      'cooker': ['1x 45A cooker control unit', '1x 35mm deep back box', 'Cooker connection plate'],
      'immersion': ['1x 20A DP switch with neon', '1x 25mm back box'],
      'ev_charger': ['1x EV charger unit (as specified)', 'Outdoor mounting kit', 'Earth rod kit (if TT system)'],
      'ev-charger': ['1x EV charger unit (as specified)', 'Outdoor mounting kit', 'Earth rod kit (if TT system)'],
      'smoke_alarms': ['3-5x Mains smoke alarms with battery backup', 'Interconnection cable'],
      'smoke-alarm': ['3-5x Mains smoke alarms with battery backup', 'Interconnection cable'],
      'outdoor_socket': ['1x IP66 weatherproof socket', '1x RCD socket/spur', 'Conduit/trunking for external run'],
      'outdoor': ['1x IP66 weatherproof socket', '1x RCD socket/spur', 'Conduit/trunking for external run'],
      'underfloor_heating': ['1x Thermostat and control unit', '1x 25mm back box', 'Floor sensor'],
    };
    
    const loadTypeKey = loadType.toLowerCase().replace(/\s+/g, '_');
    return accessoriesMap[loadTypeKey] || ['Accessories as per circuit specification', 'Conduit/trunking as required'];
  };

  // Helper: Check if there are special locations
  const hasSpecialLocations = (circuits: Circuit[]): boolean => {
    const specialLocationKeywords = [
      'bathroom', 'shower', 'bath', 'outdoor', 'garden', 'outside', 
      'swimming', 'pool', 'sauna', 'hot tub', 'ev charger', 'electric vehicle', 'ev-charger'
    ];
    
    return circuits.some(c => 
      specialLocationKeywords.some(keyword => 
        c.name.toLowerCase().includes(keyword) || 
        c.loadType.toLowerCase().includes(keyword)
      )
    );
  };

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
            <span className="text-gray-100">Total Load:</span>
            <span className="font-bold">{totalLoadKW}kW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-100">After Diversity:</span>
            <span className="font-bold">{(diversifiedLoad/1000).toFixed(1)}kW</span>
          </div>
          {diversityFactor && (
            <div className="flex justify-between col-span-2">
              <span className="text-gray-100">Diversity Factor:</span>
              <span className="font-bold">{(diversityFactor * 100).toFixed(0)}%</span>
            </div>
          )}
          <div className="flex justify-between col-span-2 pt-2 border-t">
            <span className="text-gray-100">Consumer Unit:</span>
            <span className="font-bold text-primary">{consumerUnitRequired}</span>
          </div>
        </div>
        
        {costEstimate && (
          <>
            <Separator className="my-3" />
            <div className="text-sm">
              <div className="font-semibold mb-2">Cost Estimate</div>
              <div className="space-y-1 text-gray-100">
                <div>Materials: {costEstimate.materialsRange}</div>
                <div>Labour: {costEstimate.labourRange}</div>
                <div className="font-bold text-foreground">Total: {costEstimate.totalRange}</div>
                <div className="text-xs mt-2">{costEstimate.notes}</div>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Materials List Card */}
      <Card className="p-5 bg-green-500/5 border-green-500/20">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-green-400">📦</span>
          Materials Required
        </h3>
        <div className="space-y-3">
          {circuits.map((circuit, index) => {
            const accessories = getLoadTypeAccessories(circuit.loadType);
            
            return (
              <div key={`materials-${index}`} className="border-b border-gray-700/30 last:border-0 pb-3 last:pb-0">
                <div className="text-sm font-semibold text-gray-100 mb-2">
                  <Badge variant="outline" className="mr-2">Way {index + 1}</Badge>
                  {circuit.name}
                </div>
                <ul className="text-xs text-gray-200 space-y-1 ml-6 list-disc">
                  {circuit.cableLength && (
                    <li>
                      <span className="font-medium">{circuit.cableLength}m</span> of {circuit.cableSize} {circuit.cableSpec}
                    </li>
                  )}
                  <li>1x {circuit.protection}</li>
                  {circuit.rcdRequirements && (
                    <li>1x {circuit.rcdRequirements.rating} ({circuit.rcdRequirements.reason})</li>
                  )}
                  {accessories.map((accessory, i) => (
                    <li key={i}>{accessory}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-700/30">
          <p className="text-xs text-gray-400 italic">
            Note: Quantities are estimates based on typical installations. Always verify requirements on-site before purchasing.
          </p>
        </div>
      </Card>

      {/* Individual Circuit Cards - EXACT MATCH TO SINGLE CIRCUIT */}
      {circuits.map((circuit, index) => (
        <Card key={`${circuit.id}-${index}`} className="p-5">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Way {index + 1}</h3>
                <p className="text-sm text-muted-foreground">{circuit.name}</p>
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

            {/* MCB Badge - prominent like single circuit */}
            <div className="flex justify-center">
              <Badge className="bg-yellow-200 text-yellow-900 hover:bg-yellow-300 font-bold px-4 py-1.5 text-base">
                MCB: {circuit.protection}
              </Badge>
            </div>

            {/* Parameters - Stacked 1/1/1/1 EXACTLY LIKE SINGLE CIRCUIT */}
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                <span className="text-sm text-gray-100">Load</span>
                <span className="font-bold text-primary">
                  {(circuit.load/1000).toFixed(1)}kW ({circuit.load}W)
                </span>
              </div>
              <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                <span className="text-sm text-gray-100">Cable Size</span>
                <span className="font-bold text-primary text-base">
                  {circuit.cableSize ?? 'TBD'}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({circuit.cableSpec})
                  </span>
                </span>
              </div>
              {circuit.cableLength && (
                <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                  <span className="text-sm text-gray-100">Distance</span>
                  <span className="font-bold text-primary">{circuit.cableLength}m</span>
                </div>
              )}
              <div className="flex justify-between p-3 bg-muted/30 rounded-md">
                <span className="text-sm text-gray-100">Protection</span>
                <span className="font-bold text-primary">{circuit.protection}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                  <span className="text-sm text-gray-100">Voltage Drop</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg ${circuit.calculations.voltageDrop.compliant ? 'text-green-500' : 'text-red-500'}`}>
                      {circuit.calculations.voltageDrop.percent.toFixed(1)}%
                    </span>
                    {circuit.calculations.voltageDrop.compliant && <span className="text-green-500">✓</span>}
                    {!circuit.calculations.voltageDrop.compliant && <span className="text-red-500">⚠</span>}
                  </div>
                </div>
              </div>

              {/* Earth Fault Loop Impedance - PROMINENT */}
              <div className="space-y-1">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md border border-gray-700/30">
                  <span className="text-sm text-gray-100">Earth Fault Loop (Zs)</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg ${
                      circuit.calculations.zs.compliant ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {circuit.calculations.zs.calculated.toFixed(2)}Ω
                    </span>
                    <span className="text-xs text-gray-300">
                      (Max: {circuit.calculations.zs.max.toFixed(2)}Ω)
                    </span>
                    {circuit.calculations.zs.compliant ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                </div>
                {circuit.calculations.zs.regulation && (
                  <div className="text-xs text-gray-300 ml-3">
                    BS 7671: {circuit.calculations.zs.regulation}
                  </div>
                )}
              </div>
            </div>

            {/* View Working Out - Collapsible calculations */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  View Working Out
                  <ChevronDown className="h-4 w-4 transition-transform" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t pt-3 mt-3 space-y-3">
                  <div>
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
                  
                  {/* Regulations Referenced - MOVED HERE from main view */}
                  {circuit.regulations && circuit.regulations.length > 0 && (
                    <div className="border-t pt-3">
                      <div className="text-sm font-semibold mb-2">BS 7671 References</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {circuit.regulations.slice(0, 5).map((reg, i) => (
                          <div key={i}>• {reg}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* RCD Requirements */}
            {circuit.rcdRequirements && (
              <div className="border-t pt-3">
                <div className="text-sm font-semibold mb-1">RCD Protection</div>
                <div className="text-xs text-muted-foreground">
                  {circuit.rcdRequirements.rating} - {circuit.rcdRequirements.reason}
                </div>
              </div>
            )}

          </div>
        </Card>
      ))}

      {/* Installation Guidance & Practical Tips */}
      <Card className="p-5 bg-amber-500/5 border-amber-500/20">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <span className="text-amber-400">⚠️</span>
          Installation Guidance & Practical Tips
        </h3>
        <div className="space-y-4 text-sm">
          {/* Safety First */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <div className="font-semibold text-red-400 mb-2 flex items-center gap-2">
              <span>🛑</span>
              Safety First - Before You Start
            </div>
            <ul className="text-xs text-gray-200 space-y-1 ml-6 list-disc">
              <li>Isolate supply at main switch and confirm dead with GS38 voltage indicator</li>
              <li>Lock off consumer unit and display warning notices</li>
              <li>Use permit to work system if working in commercial/industrial environments</li>
              <li>Never work on live circuits - isolation is mandatory</li>
            </ul>
          </div>

          {/* Cable Installation */}
          <div>
            <div className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <span>🔧</span>
              Cable Installation Best Practices
            </div>
            <ul className="text-xs text-gray-200 space-y-1 ml-6 list-disc">
              <li>Maintain minimum 50mm depth for buried cables in walls (Section 522.6.202)</li>
              <li>Use RCD protection or mechanical protection in zones where cables could be penetrated</li>
              <li>Keep cables vertical or horizontal in safe zones to reduce risk of accidental damage</li>
              <li>Don't exceed 40% fill ratio in conduit/trunking - allows easy cable pulling and heat dissipation</li>
              <li>Use proper cable supports every 300-400mm horizontally, 400-450mm vertically</li>
              <li>Label all cables at both ends with circuit number and destination</li>
            </ul>
          </div>

          {/* Testing Requirements */}
          <div>
            <div className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <span>🧪</span>
              Testing & Verification Requirements
            </div>
            <ul className="text-xs text-gray-200 space-y-1 ml-6 list-disc">
              <li><strong>Continuity of protective conductors:</strong> R1 + R2 test on all circuits</li>
              <li><strong>Insulation resistance:</strong> Minimum 1MΩ at 500V DC between conductors</li>
              <li><strong>Polarity:</strong> Verify at all socket outlets, switches, and accessories</li>
              <li><strong>Earth fault loop impedance (Zs):</strong> Must be lower than calculated maximum values above</li>
              <li><strong>RCD testing:</strong> Must trip within 300ms at 1x IΔn, and 40ms at 5x IΔn</li>
              <li><strong>Functional testing:</strong> Verify all circuits operate correctly under load</li>
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <div className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span>📋</span>
              Certification & Documentation
            </div>
            <ul className="text-xs text-gray-200 space-y-1 ml-6 list-disc">
              <li>Complete Minor Works Certificate for additions/alterations to existing installation</li>
              <li>Or Electrical Installation Certificate for new consumer unit or major works</li>
              <li>Provide Schedule of Test Results with actual measured values</li>
              <li>Update consumer unit circuit chart with clear circuit labels</li>
              <li>Notify Building Control if work falls under Part P Building Regulations (England/Wales)</li>
              <li>Provide customer with all certification and test results</li>
            </ul>
          </div>

          {/* Special Locations Warning */}
          {hasSpecialLocations(circuits) && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <div className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <span>⚠️</span>
                Special Locations Detected
              </div>
              <p className="text-xs text-gray-200">
                This installation includes circuits in special locations (bathrooms, outdoor areas, swimming pools, etc.). 
                These require additional requirements per <strong>BS 7671 Part 7</strong>:
              </p>
              <ul className="text-xs text-gray-200 space-y-1 ml-6 list-disc mt-2">
                <li>Enhanced IP ratings (IP44 minimum for bathroom zones, IP65+ for outdoor)</li>
                <li>30mA RCD protection mandatory</li>
                <li>Supplementary bonding may be required in bathroom zones 1 & 2</li>
                <li>Specific zone restrictions for socket outlets and switches</li>
                <li>Additional cable segregation and mechanical protection</li>
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
