import { CircuitDesign, InstallationDesign } from '@/types/installation-design';
import { Drawer } from 'vaul';
import { X, Calculator, Cable, TrendingDown, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CircuitWorkingsSheetProps {
  circuit: CircuitDesign;
  design: InstallationDesign;
  isOpen: boolean;
  onClose: () => void;
}

const fmt = (n: unknown, dp = 1, fallback = '—') => 
  (typeof n === 'number' && !isNaN(n) ? n.toFixed(dp) : fallback);

export const CircuitWorkingsSheet = ({ circuit, design, isOpen, onClose }: CircuitWorkingsSheetProps) => {
  if (!circuit) return null;

  const calculations = circuit.calculations;
  const supplyVoltage = design.consumerUnit?.incomingSupply?.voltage || 230;

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Drawer.Content className="bg-card fixed bottom-0 left-0 right-0 max-h-[90vh] rounded-t-2xl z-50 border-t-4 border-elec-yellow flex flex-col">
          {/* Handle */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-elec-light/30 mt-4" />
          
          {/* Header */}
          <div className="p-6 pb-4 border-b border-elec-yellow/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-elec-yellow/20 rounded-lg">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-elec-light">Calculation Workings</h2>
                  <p className="text-sm text-elec-light/60">Way {circuit.circuitNumber}: {circuit.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-elec-light/10 rounded-lg transition-colors touch-manipulation"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-elec-light" />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            
            {/* Design Current (Ib) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-semibold text-elec-light">Design Current (Ib)</h3>
              </div>
              <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20 space-y-2">
                <div className="text-xs font-mono text-elec-light/70">
                  Ib = Power ÷ Voltage
                </div>
                <div className="text-sm font-mono text-elec-light">
                  Ib = {circuit.loadPower}W ÷ {supplyVoltage}V
                </div>
                <div className="text-base font-bold text-elec-yellow">
                  Ib = {fmt(calculations?.Ib, 1)}A
                </div>
              </div>
            </div>

            {/* Cable Sizing (Ib ≤ In ≤ Iz) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cable className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-semibold text-elec-light">Cable Sizing (BS 7671 Reg 433.1.1)</h3>
              </div>
              <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20 space-y-3">
                <div className="text-xs font-mono text-elec-light/70">
                  Ib ≤ In ≤ Iz (Design current ≤ Protection rating ≤ Cable capacity)
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-elec-dark/80 rounded">
                    <div className="text-xs text-elec-light/60">Ib</div>
                    <div className="text-sm font-bold text-elec-light">{fmt(calculations?.Ib, 1)}A</div>
                  </div>
                  <div className="p-2 bg-elec-yellow/20 rounded">
                    <div className="text-xs text-elec-light/60">In</div>
                    <div className="text-sm font-bold text-elec-yellow">{calculations?.In || circuit.protectionDevice?.rating || '—'}A</div>
                  </div>
                  <div className="p-2 bg-elec-dark/80 rounded">
                    <div className="text-xs text-elec-light/60">Iz</div>
                    <div className="text-sm font-bold text-elec-light">{fmt(calculations?.Iz, 1)}A</div>
                  </div>
                </div>

                {circuit.deratingFactors && (
                  <>
                    <div className="pt-2 border-t border-elec-yellow/10">
                      <p className="text-xs text-elec-light/70 mb-2">Derating Factors Applied:</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-elec-light/60">Ambient temp (Ca)</span>
                          <span className="font-mono text-elec-light">{circuit.deratingFactors.Ca}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-elec-light/60">Grouping (Cg)</span>
                          <span className="font-mono text-elec-light">{circuit.deratingFactors.Cg}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-elec-light/60">Insulation (Ci)</span>
                          <span className="font-mono text-elec-light">{circuit.deratingFactors.Ci}</span>
                        </div>
                        <div className="flex justify-between text-xs pt-1 border-t border-elec-yellow/10">
                          <span className="text-elec-light font-semibold">Overall factor</span>
                          <span className="font-mono text-elec-yellow font-bold">{circuit.deratingFactors.overall}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-elec-light/60 leading-relaxed">
                      {circuit.deratingFactors.explanation}
                    </div>
                    <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/70">
                      {circuit.deratingFactors.tableReferences}
                    </Badge>
                  </>
                )}

                <div className="pt-2 border-t border-elec-yellow/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-elec-light/60">Safety Margin</span>
                    <span className="text-sm font-bold text-green-400">
                      {fmt(calculations?.safetyMargin, 1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voltage Drop */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-semibold text-elec-light">Voltage Drop (BS 7671 Reg 525)</h3>
              </div>
              <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20 space-y-3">
                <div className="text-xs font-mono text-elec-light/70">
                  Vd = (mV/A/m) × Ib × L ÷ 1000
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-elec-light/60">Cable size</span>
                    <span className="font-mono text-elec-light">{circuit.cableSize}mm²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-elec-light/60">Design current (Ib)</span>
                    <span className="font-mono text-elec-light">{fmt(calculations?.Ib, 1)}A</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-elec-light/60">Cable length (L)</span>
                    <span className="font-mono text-elec-light">{circuit.cableLength}m</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-elec-yellow/10">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs text-elec-light/60">Voltage drop</span>
                    <span className="text-lg font-bold text-elec-yellow">
                      {fmt(calculations?.voltageDrop?.volts, 1)}V ({fmt(calculations?.voltageDrop?.percent, 2)}%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-elec-light/60">Maximum permitted</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-elec-light/80">
                        {calculations?.voltageDrop?.limit}%
                      </span>
                      {calculations?.voltageDrop?.compliant ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          ✓ Compliant
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          ✗ Exceeds limit
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Earth Fault Loop Impedance */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-elec-yellow/5 p-2 rounded-md -mx-2">
                <Shield className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-base sm:text-lg font-semibold text-elec-light">Earth Fault Loop (BS 7671 Reg 411.4.4)</h3>
              </div>
              <div className="bg-elec-dark/80 rounded-lg p-3 border border-elec-yellow/30 space-y-2">
                <div className="text-sm sm:text-base font-mono text-white/90 text-center">
                  Zs = Ze + (R1 + R2){circuit.loadType.includes('ring') ? ' ÷ 4' : ''}
                </div>
              </div>
              <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">External impedance (Ze)</span>
                    <span className="font-mono text-elec-light">{design.consumerUnit.incomingSupply.Ze}Ω</span>
                  </div>
                  {circuit.expectedTestResults?.r1r2 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Cable impedance (R1+R2){circuit.loadType.includes('ring') ? ' ÷ 4' : ''}</span>
                      <span className="font-mono text-elec-light">{circuit.expectedTestResults.r1r2.at20C}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-elec-yellow/10">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-white/90">Calculated Zs</span>
                    <span className="text-xl font-bold text-elec-yellow">
                      {fmt(calculations?.zs, 2)}Ω
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/90">Maximum Zs ({calculations?.In || circuit.protectionDevice?.rating || '—'}A Type {circuit.protectionDevice?.curve || '—'})</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/90">
                        {fmt(calculations?.maxZs, 2)}Ω
                      </span>
                      {(calculations?.zs ?? 0) <= (calculations?.maxZs ?? 999) ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-sm px-3 py-1">
                          ✓ Compliant
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/30 text-red-100 border-red-500/50 animate-pulse text-sm px-3 py-1">
                          ✗ Exceeds limit
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {(calculations?.zs ?? 0) > (calculations?.maxZs ?? 999) && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-xs text-red-200 leading-relaxed">
                      ⚠️ <strong>Non-Compliant:</strong> Zs exceeds maximum for safe disconnection in 0.4s (socket circuits).
                      {circuit.loadType.includes('ring') && (
                        <span className="block mt-1">
                          For ring finals, check if calculation used divide-by-4 rule (parallel paths).
                        </span>
                      )}
                    </p>
                  </div>
                )}

                <div className="text-xs text-white/80 leading-relaxed pt-2 border-t border-elec-yellow/10">
                  Maximum disconnection time: 0.4s for socket circuits, 5s for fixed equipment per BS 7671 Table 41.1
                </div>
              </div>
            </div>

            {/* References */}
            <div className="space-y-2 pb-6">
              <h3 className="text-xs font-semibold text-elec-light/60">BS 7671 References</h3>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/70 w-full justify-start">
                  Table 4D5 - Current-carrying capacity
                </Badge>
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/70 w-full justify-start">
                  Appendix 4 - Voltage drop tables
                </Badge>
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/70 w-full justify-start">
                  Regulation 411.4.4 - Earth fault protection
                </Badge>
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/70 w-full justify-start">
                  Regulation 433.1.1 - Cable selection
                </Badge>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
