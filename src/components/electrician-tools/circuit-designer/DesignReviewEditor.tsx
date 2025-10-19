import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InstallationDesign, CircuitDesign } from '@/types/installation-design';
import { CheckCircle2, AlertTriangle, Download, Share2, Zap, Cable, Shield, TrendingDown } from 'lucide-react';
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { generateEICSchedule } from '@/lib/eic/scheduleGenerator';
import { toast } from 'sonner';

interface DesignReviewEditorProps {
  design: InstallationDesign;
  onReset: () => void;
}

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
                <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="font-medium">{currentCircuit.loadPower}W ({(currentCircuit.loadPower / 1000).toFixed(1)}kW)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Design Current (Ib):</span>
                    <span className="font-medium">{currentCircuit.calculations.Ib.toFixed(1)}A</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phases:</span>
                    <span className="font-medium capitalize">{currentCircuit.phases}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Cable className="h-4 w-4 text-primary" />
                  Cable Specification
                </div>
                <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Live Conductor:</span>
                    <span className="font-medium">{currentCircuit.cableSize}mm²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPC:</span>
                    <span className="font-medium">{currentCircuit.cpcSize}mm²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Length:</span>
                    <span className="font-medium">{currentCircuit.cableLength}m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium">{currentCircuit.installationMethod}</span>
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
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
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
                    {currentCircuit.calculations.voltageDrop.percent.toFixed(2)}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentCircuit.calculations.voltageDrop.volts.toFixed(2)}V (Max: 3%)
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
                  <p className="text-lg font-bold">{currentCircuit.calculations.zs.toFixed(3)}Ω</p>
                  <p className="text-xs text-muted-foreground">
                    Max: {currentCircuit.calculations.maxZs.toFixed(3)}Ω
                  </p>
                </div>
              </div>
            </div>

            {/* Justifications */}
            <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold">Design Justification</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium mb-1">Cable Sizing:</p>
                  <p className="text-muted-foreground">{currentCircuit.justifications.cableSize}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Protection:</p>
                  <p className="text-muted-foreground">{currentCircuit.justifications.protection}</p>
                </div>
                {currentCircuit.justifications.rcd && (
                  <div>
                    <p className="font-medium mb-1">RCD Protection:</p>
                    <p className="text-muted-foreground">{currentCircuit.justifications.rcd}</p>
                  </div>
                )}
              </div>
            </div>

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

      {/* Materials & Costs */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Materials List</h3>
        <div className="space-y-2">
          {design.materials.map((material, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{material.name}</p>
                <p className="text-sm text-muted-foreground">{material.specification}</p>
              </div>
              <span className="font-medium">{material.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Estimated Total</span>
            <span>£{design.costEstimate.total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

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
