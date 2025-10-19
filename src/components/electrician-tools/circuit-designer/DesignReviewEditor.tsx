import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InstallationDesign, CircuitDesign } from '@/types/installation-design';
import { 
  CheckCircle2, AlertTriangle, Download, Zap, Cable, Shield, 
  TrendingDown, Percent, Gauge, Wrench, MapPin, ClipboardCheck, FileText
} from 'lucide-react';
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { generateEICSchedule } from '@/lib/eic/scheduleGenerator';
import { toast } from 'sonner';

interface DesignReviewEditorProps {
  design: InstallationDesign;
  onReset: () => void;
}

// Safe number formatter - prevents null.toFixed() crashes
const fmt = (n: unknown, dp = 1, fallback = '—') => 
  (typeof n === 'number' && !isNaN(n) ? n.toFixed(dp) : fallback);

export const DesignReviewEditor = ({ design, onReset }: DesignReviewEditorProps) => {
  const [selectedCircuit, setSelectedCircuit] = useState(0);

  const allCompliant = design.circuits.every(c => 
    c.calculations.voltageDrop.compliant && 
    c.calculations.zs < c.calculations.maxZs
  );

  const handleExportPDF = async () => {
    try {
      const schedule = generateEICSchedule(
        {
          installationId: `DESIGN-${Date.now()}`,
          circuits: design.circuits.map((c, idx) => ({
            circuitNumber: idx + 1,
            name: c.name,
            loadType: c.loadType,
            phases: c.phases,
            cableSize: c.cableSize,
            cpcSize: c.cpcSize,
            cableLength: c.cableLength,
            protectionDevice: c.protectionDevice,
            rcdProtected: c.rcdProtected,
            afddRequired: c.afddRequired,
            calculationResults: {
              zs: c.calculations.zs,
              maxZs: c.calculations.maxZs,
              installationMethod: c.installationMethod
            }
          })),
          consumerUnit: design.consumerUnit
        },
        {
          projectName: design.projectName,
          leadElectrician: design.electricianName
        },
        {
          propertyAddress: design.location
        }
      );

      await downloadEICPDF(schedule, `${design.projectName.replace(/\s+/g, '_')}_Design.pdf`);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    }
  };

  const currentCircuit = design.circuits[selectedCircuit];

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{design.projectName}</h2>
            <p className="text-muted-foreground">{design.location}</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${allCompliant ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>
            {allCompliant ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            <span className="font-semibold">{allCompliant ? 'All Compliant' : 'Issues Found'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Load</p>
            <p className="text-lg font-bold">{design.totalLoad / 1000}kW</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">After Diversity</p>
            <p className="text-lg font-bold">
              {design.diversityApplied && design.diversityFactor 
                ? `${((design.totalLoad * design.diversityFactor) / 1000).toFixed(1)}kW`
                : `${design.totalLoad / 1000}kW`}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Circuits</p>
            <p className="text-lg font-bold">{design.circuits.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Consumer Unit</p>
            <p className="text-lg font-bold">{design.consumerUnit.mainSwitchRating}A</p>
          </div>
        </div>
      </Card>

      {/* Circuit Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {design.circuits.map((circuit, idx) => (
          <Button
            key={idx}
            variant={selectedCircuit === idx ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCircuit(idx)}
            className="flex-shrink-0"
          >
            C{circuit.circuitNumber}
          </Button>
        ))}
      </div>

      {/* Circuit Detail Card */}
      {currentCircuit && (
        <Card className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                  C{currentCircuit.circuitNumber}
                </span>
                {currentCircuit.name}
              </h3>
              <p className="text-muted-foreground capitalize">{currentCircuit.loadType}</p>
            </div>

            {/* Load & Cable */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="h-4 w-4 text-primary" />
                  Load Details
                </div>
                <div className="bg-card/50 p-3 rounded-lg space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Power:</span>
                    <span className="font-medium text-white">{currentCircuit.loadPower}W ({(currentCircuit.loadPower / 1000).toFixed(1)}kW)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Design Current (Ib):</span>
                    <span className="font-medium text-white">{fmt(currentCircuit.calculations?.Ib, 1)}A</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Phases:</span>
                    <span className="font-medium text-white capitalize">{currentCircuit.phases}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Cable className="h-4 w-4 text-primary" />
                  Cable Specification
                </div>
                <div className="bg-card/50 p-3 rounded-lg space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Live Conductor:</span>
                    <span className="font-medium text-white">{currentCircuit.cableSize}mm²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">CPC:</span>
                    <span className="font-medium text-white">{currentCircuit.cpcSize}mm²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Length:</span>
                    <span className="font-medium text-white">{currentCircuit.cableLength}m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Method:</span>
                    <span className="font-medium text-white">{currentCircuit.installationMethod}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Protection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-primary" />
                Protection Device
              </div>
              <div className="bg-card/50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">
                    {currentCircuit.protectionDevice.rating}A Type {currentCircuit.protectionDevice.curve} {currentCircuit.protectionDevice.type}
                  </span>
                  {currentCircuit.rcdProtected && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">RCD Protected</span>
                  )}
                </div>
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <TrendingDown className="h-4 w-4 text-primary" />
                Compliance Checks
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${currentCircuit.calculations.voltageDrop.compliant ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Voltage Drop</span>
                    {currentCircuit.calculations.voltageDrop.compliant ? 
                      <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <p className="text-lg font-bold">
                    {fmt(currentCircuit.calculations?.voltageDrop?.percent, 2)}%
                  </p>
                  <p className="text-xs text-white/60">
                    {fmt(currentCircuit.calculations?.voltageDrop?.volts, 2)}V (Max: {currentCircuit.calculations?.voltageDrop?.limit || 3}%)
                  </p>
                </div>

                <div className={`p-3 rounded-lg ${currentCircuit.calculations.zs < currentCircuit.calculations.maxZs ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Earth Fault Loop (Zs)</span>
                    {currentCircuit.calculations.zs < currentCircuit.calculations.maxZs ? 
                      <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <p className="text-lg font-bold">{fmt(currentCircuit.calculations?.zs, 3)}Ω</p>
                  <p className="text-xs text-white/60">
                    Max: {fmt(currentCircuit.calculations?.maxZs, 3)}Ω
                  </p>
                </div>
              </div>
            </div>

            {/* Justifications */}
            <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
              <h4 className="font-semibold text-white">Design Justification</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Cable Sizing:</p>
                  <p className="text-white/70">{currentCircuit.justifications.cableSize}</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Protection:</p>
                  <p className="text-white/70">{currentCircuit.justifications.protection}</p>
                </div>
                {currentCircuit.justifications.rcd && (
                  <div>
                    <p className="font-medium text-white mb-1">RCD Protection:</p>
                    <p className="text-white/70">{currentCircuit.justifications.rcd}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 1. Diversity Breakdown */}
            {currentCircuit.diversityFactor !== undefined && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Percent className="h-4 w-4 text-primary" />
                    Diversity Applied
                  </h4>
                  <Badge variant="secondary">{(currentCircuit.diversityFactor * 100).toFixed(0)}%</Badge>
                </div>
                <p className="text-sm text-white/70">{currentCircuit.diversityJustification}</p>
              </div>
            )}

            {/* 2. Fault Current Analysis */}
            {currentCircuit.faultCurrentAnalysis && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Fault Current Analysis</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-white/60 mb-1">PSCC at Circuit</p>
                    <p className="text-lg font-bold text-white">{currentCircuit.faultCurrentAnalysis.psccAtCircuit.toFixed(2)}kA</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-1">Device Breaking Capacity</p>
                    <p className="text-lg font-bold text-white">{currentCircuit.faultCurrentAnalysis.deviceBreakingCapacity}kA</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded ${currentCircuit.faultCurrentAnalysis.compliant ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                  {currentCircuit.faultCurrentAnalysis.compliant ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <span className="text-sm font-medium">{currentCircuit.faultCurrentAnalysis.marginOfSafety}</span>
                </div>
                <p className="text-xs text-white/60">{currentCircuit.faultCurrentAnalysis.regulation}</p>
              </div>
            )}

            {/* 3. Earthing & Bonding Requirements */}
            {currentCircuit.earthingRequirements && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Earthing & Bonding</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/60">CPC Size</p>
                    <p className="font-medium text-white">{currentCircuit.earthingRequirements.cpcSize}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Supplementary Bonding</p>
                    <p className="font-medium text-white">{currentCircuit.earthingRequirements.supplementaryBonding ? 'Required' : 'Not Required'}</p>
                  </div>
                  {currentCircuit.earthingRequirements.bondingConductorSize && (
                    <div className="md:col-span-2">
                      <p className="text-white/60">Bonding Conductor Size</p>
                      <p className="font-medium text-white">{currentCircuit.earthingRequirements.bondingConductorSize}</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-white/70">{currentCircuit.earthingRequirements.justification}</p>
                <Badge variant="outline" className="text-xs">{currentCircuit.earthingRequirements.regulation}</Badge>
              </div>
            )}

            {/* 4. Cable Derating Factors Breakdown */}
            {currentCircuit.deratingFactors && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Derating Factors</h4>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-white/60">Ca</p>
                    <p className="text-lg font-bold text-white">{currentCircuit.deratingFactors.Ca.toFixed(2)}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-white/60">Cg</p>
                    <p className="text-lg font-bold text-white">{currentCircuit.deratingFactors.Cg.toFixed(2)}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-white/60">Ci</p>
                    <p className="text-lg font-bold text-white">{currentCircuit.deratingFactors.Ci.toFixed(2)}</p>
                  </div>
                  <div className="bg-primary/5 p-2 rounded border border-primary/30">
                    <p className="text-xs text-white/60">Overall</p>
                    <p className="text-lg font-bold text-primary">{currentCircuit.deratingFactors.overall.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-sm text-white/70">{currentCircuit.deratingFactors.explanation}</p>
                <p className="text-xs text-white/60">{currentCircuit.deratingFactors.tableReferences}</p>
              </div>
            )}

            {/* 5. Installation Method Guidance */}
            {currentCircuit.installationGuidance && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Installation Guidance</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <Badge variant="secondary" className="mb-2">{currentCircuit.installationGuidance.referenceMethod}</Badge>
                    <p className="text-sm text-white/70">{currentCircuit.installationGuidance.description}</p>
                  </div>
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-1">Clip Spacing</p>
                    <p className="text-sm font-medium text-white">{currentCircuit.installationGuidance.clipSpacing}</p>
                  </div>
                  {currentCircuit.installationGuidance.practicalTips.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Practical Tips:</p>
                      <ul className="space-y-1">
                        {currentCircuit.installationGuidance.practicalTips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs">{currentCircuit.installationGuidance.regulation}</Badge>
                </div>
              </div>
            )}

            {/* 6. Special Location Compliance */}
            {currentCircuit.specialLocationCompliance?.isSpecialLocation && (
              <div className="space-y-3 bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-600" />
                  <h4 className="font-semibold text-amber-600">Special Location Requirements</h4>
                </div>
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-700">
                  {currentCircuit.specialLocationCompliance.locationType}
                </Badge>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Requirements:</p>
                  <ul className="space-y-1">
                    {currentCircuit.specialLocationCompliance.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {currentCircuit.specialLocationCompliance.zonesApplicable && (
                  <p className="text-sm text-white/70">{currentCircuit.specialLocationCompliance.zonesApplicable}</p>
                )}
                <Badge variant="outline" className="text-xs border-amber-500/30">{currentCircuit.specialLocationCompliance.regulation}</Badge>
              </div>
            )}

            {/* 7. Expected Test Results */}
            {currentCircuit.expectedTestResults && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-white">Expected Test Results</h4>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    EIC Schedule Preview
                  </Badge>
                </div>
                <div className="grid gap-3">
                  {/* R1+R2 */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-2">R1+R2 (Earth Continuity)</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">At 20°C:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.r1r2.at20C}</p>
                      </div>
                      <div>
                        <p className="text-white/60">At 70°C:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.r1r2.at70C}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mt-2">{currentCircuit.expectedTestResults.r1r2.calculation}</p>
                  </div>

                  {/* Zs */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-2">Earth Fault Loop Impedance (Zs)</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">Calculated:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.zs.calculated}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Max Permitted:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.zs.maxPermitted}</p>
                      </div>
                    </div>
                    <div className={`mt-2 flex items-center gap-2 text-xs ${currentCircuit.expectedTestResults.zs.compliant ? 'text-green-600' : 'text-red-600'}`}>
                      {currentCircuit.expectedTestResults.zs.compliant ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      <span>{currentCircuit.expectedTestResults.zs.compliant ? 'Compliant' : 'Non-compliant'}</span>
                    </div>
                  </div>

                  {/* Insulation Resistance */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-2">Insulation Resistance</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">Test Voltage:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.insulationResistance.testVoltage}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Min Required:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.insulationResistance.minResistance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Polarity */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-1">Polarity</p>
                    <p className="text-sm font-medium text-white">{currentCircuit.expectedTestResults.polarity}</p>
                  </div>

                  {/* RCD Test */}
                  {currentCircuit.rcdProtected && currentCircuit.expectedTestResults.rcdTest && (
                    <div className="bg-primary/5 p-3 rounded">
                      <p className="text-xs text-white/60 mb-2">RCD Trip Times</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-white/60">At 1× IΔn:</p>
                          <p className="font-medium text-white">{currentCircuit.expectedTestResults.rcdTest.at1x}</p>
                        </div>
                        <div>
                          <p className="text-white/60">At 5× IΔn:</p>
                          <p className="font-medium text-white">{currentCircuit.expectedTestResults.rcdTest.at5x}</p>
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-2">{currentCircuit.expectedTestResults.rcdTest.regulation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Warnings */}
            {currentCircuit.warnings.length > 0 && (
              <div className="space-y-2 bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Notes & Warnings
                </h4>
                <ul className="space-y-1">
                  {currentCircuit.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">• {warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}


      {/* Actions */}
      <div className="flex gap-3">
        <Button size="lg" onClick={handleExportPDF} className="flex-1">
          <Download className="h-5 w-5 mr-2" />
          Export PDF
        </Button>
        <Button size="lg" variant="outline" onClick={onReset}>
          New Design
        </Button>
      </div>
    </div>
  );
};
