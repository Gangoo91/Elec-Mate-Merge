import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InstallPlanDataV2, FullCircuitDesign } from "./types";
import { useState } from "react";
import { Plus, FileText, Image, Download, Layout } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateConsumerUnitDiagram } from "@/lib/diagramGenerator/layoutEngine";
import { CircuitCard } from "./multi-circuit/CircuitCard";
import { CircuitFormDialog } from "./multi-circuit/CircuitFormDialog";
import { SystemSummary } from "./multi-circuit/SystemSummary";
import { LoadBalancingView } from "./multi-circuit/LoadBalancingView";
import { calculateSimplifiedCableSize } from "@/lib/calculators/engines/simplifiedCableSizingEngine";
import { balanceThreePhaseLoad } from "@/lib/calculators/engines/loadBalancingEngine";
import { generateEICSchedule } from "@/lib/eic/scheduleGenerator";
import { generateSingleLineDiagram } from "@/lib/diagramGenerator/layoutEngine";
import { SVGDiagramRenderer } from "../circuit-diagrams/SVGDiagramRenderer";
import { TestingDocumentation } from "./TestingDocumentation";

interface MultiCircuitModeProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  onReset: () => void;
}

export const MultiCircuitMode = ({ planData, updatePlanData, onReset }: MultiCircuitModeProps) => {
  const [circuits, setCircuits] = useState<FullCircuitDesign[]>([]);
  const [editingCircuit, setEditingCircuit] = useState<FullCircuitDesign | undefined>();
  const [formOpen, setFormOpen] = useState(false);
  const [mainSwitchRating, setMainSwitchRating] = useState(100);
  const [earthingSystem, setEarthingSystem] = useState<'TN-S' | 'TN-C-S' | 'TT'>('TN-C-S');
  const [ze, setZe] = useState(0.35);
  const [showDiagram, setShowDiagram] = useState(false);
  const [showTesting, setShowTesting] = useState(false);
  const [schematicData, setSchematicData] = useState<any>(null);
  const [loadingSchematic, setLoadingSchematic] = useState(false);
  const [selectedCircuitForSchematic, setSelectedCircuitForSchematic] = useState<number | null>(null);
  const [showSchematicDialog, setShowSchematicDialog] = useState(false);

  const handleAddCircuit = () => {
    setEditingCircuit(undefined);
    setFormOpen(true);
  };

  const handleEditCircuit = (circuit: FullCircuitDesign) => {
    setEditingCircuit(circuit);
    setFormOpen(true);
  };

  const handleSaveCircuit = (circuitData: Partial<FullCircuitDesign>) => {
    if (editingCircuit) {
      setCircuits(circuits.map(c => 
        c.circuitNumber === editingCircuit.circuitNumber 
          ? { ...editingCircuit, ...circuitData } 
          : c
      ));
    } else {
      const newCircuit: FullCircuitDesign = {
        circuitNumber: circuits.length + 1,
        name: circuitData.name || "New Circuit",
        loadType: circuitData.loadType || "socket",
        phases: circuitData.phases || "single",
        loadPower: circuitData.loadPower || 0,
        designCurrent: (circuitData.loadPower || 0) / 230,
        voltage: 230,
        cableSize: 2.5,
        cpcSize: 1.5,
        cableLength: circuitData.cableLength || 0,
        installationMethod: circuitData.installationMethod || "clipped-direct",
        protectionDevice: circuitData.protectionDevice || { type: "MCB", curve: "B", rating: 0, kaRating: 6 },
        rcdProtected: circuitData.rcdProtected || false,
        calculationResults: {
          zs: 0,
          maxZs: 1.44,
          installationMethod: circuitData.installationMethod || "clipped-direct"
        }
      };
      setCircuits([...circuits, newCircuit]);
    }
  };

  const handleDeleteCircuit = (circuitNumber: number) => {
    setCircuits(circuits.filter(c => c.circuitNumber !== circuitNumber));
  };

  const handleGenerateSchematic = async (circuit: FullCircuitDesign) => {
    // Feature moved to Visual Analysis mode
    toast({
      title: "Feature Moved",
      description: "Use 'Visual Analysis > Wiring Instructions' for component wiring guidance",
      variant: "default"
    });
  };

  // Calculate circuit results using proper BS 7671 engines
  const circuitResults = circuits.map(circuit => {
    const designCurrent = circuit.loadPower / 230;
    const cableCalc = calculateSimplifiedCableSize({
      current: designCurrent,
      installationType: circuit.installationMethod || "clipped-direct",
      ambientTemp: 30,
      groupingCircuits: circuits.length,
      length: circuit.cableLength,
      voltage: 230,
      cableType: "pvc-single",
      voltageDropLimit: circuit.loadType === 'lighting' ? 3 : 5
    });

    const protectionRating = Math.ceil(designCurrent / 6) * 6;
    const zs = ze + (0.018 * circuit.cableLength / 1000);

    return {
      circuitNumber: circuit.circuitNumber,
      designCurrent,
      cableSize: cableCalc?.recommendedSize || 2.5,
      protectionRating,
      zs,
      voltageDropPercent: cableCalc?.voltageDropPercent || 0,
      compliant: (cableCalc?.compliant && zs < 1.44) || false,
      deratedCapacity: cableCalc?.deratedCapacity || 0,
      safetyMargin: cableCalc?.safetyMargin || 0
    };
  });

  // System calculations
  const totalLoad = circuits.reduce((sum, c) => sum + c.loadPower, 0);
  const diversityFactor = 0.6 + (0.4 / Math.sqrt(circuits.length || 1));
  const diversifiedLoad = totalLoad * diversityFactor;
  const utilization = (diversifiedLoad / 230 / mainSwitchRating) * 100;
  const compliantCircuits = circuitResults.filter(r => r.compliant).length;

  const warnings: string[] = [];
  if (utilization > 80) warnings.push("Main switch highly utilized");
  if (compliantCircuits < circuits.length) warnings.push(`${circuits.length - compliantCircuits} circuit(s) non-compliant`);

  // Three-phase balancing (if applicable)
  const hasThreePhase = circuits.some(c => c.phases === "three");
  const loadBalancing = hasThreePhase ? balanceThreePhaseLoad(
    circuits.map(c => ({
      circuitNumber: c.circuitNumber,
      name: c.name,
      loadPower: c.loadPower,
      designCurrent: c.loadPower / 230,
      voltage: 230,
      loadType: c.loadType,
      canRelocate: true
    }))
  ) : null;

  // Generate diagram if circuits exist
  const diagram = circuits.length > 0 ? generateSingleLineDiagram({
    circuitNumber: 1,
    name: "Multi-Circuit Installation",
    voltage: 230,
    cableSize: circuitResults[0]?.cableSize || 2.5,
    cpcSize: circuits[0]?.cpcSize || 1.5,
    cableLength: circuits[0]?.cableLength || 0,
    loadType: "mixed",
    loadPower: totalLoad,
    protectionDevice: {
      type: "Main Switch",
      rating: mainSwitchRating,
      kaRating: 6
    },
    rcdProtected: false,
    ze: ze
  }) : null;

  // Generate EIC schedule
  const eicSchedule = circuits.length > 0 ? generateEICSchedule(
    {
      installationId: "INST-" + Date.now(),
      circuits: circuits.map(c => {
        const result = circuitResults.find(r => r.circuitNumber === c.circuitNumber);
        return {
          ...c,
          cableSize: result?.cableSize || c.cableSize,
          protectionDevice: {
            ...c.protectionDevice,
            rating: result?.protectionRating || 0
          },
          calculationResults: {
            zs: result?.zs || 0,
            maxZs: 1.44
          }
        };
      }),
      consumerUnit: {
        incomingSupply: {
          voltage: 230,
          Ze: ze,
          earthingSystem
        }
      }
    },
    planData.projectInfo || {},
    planData.siteInfo || {}
  ) : null;

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Multi-Circuit Installation Designer</CardTitle>
            <Button variant="outline" onClick={onReset}>Back to Start</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Main Switch Rating (A)</Label>
              <Input 
                type="number" 
                value={mainSwitchRating}
                onChange={(e) => setMainSwitchRating(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Earthing System</Label>
              <Select value={earthingSystem} onValueChange={(v: any) => setEarthingSystem(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                  <SelectItem value="TT">TT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Ze (Ω)</Label>
              <Input 
                type="number" 
                step="0.01"
                value={ze}
                onChange={(e) => setZe(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {circuits.length > 0 && (
        <SystemSummary 
          totalCircuits={circuits.length}
          totalLoad={totalLoad}
          diversifiedLoad={diversifiedLoad}
          diversityFactor={diversityFactor}
          mainSwitchRating={mainSwitchRating}
          utilization={utilization}
          compliantCircuits={compliantCircuits}
          warnings={warnings}
        />
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Circuits ({circuits.length})</h3>
        <div className="flex gap-2">
          {circuits.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={() => setShowDiagram(!showDiagram)}>
                <Image className="h-4 w-4 mr-2" />
                {showDiagram ? "Hide" : "Show"} Diagram
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowTesting(!showTesting)}>
                <FileText className="h-4 w-4 mr-2" />
                {showTesting ? "Hide" : "Show"} EIC
              </Button>
              {circuits.length >= 3 && (
                <Button variant="outline" size="sm" onClick={() => {
                  const circuitData = circuits.map(c => ({
                    circuitNumber: c.circuitNumber,
                    name: c.name,
                    voltage: c.voltage || 230,
                    cableSize: c.cableSize,
                    cpcSize: c.cpcSize,
                    cableLength: c.cableLength,
                    loadType: c.loadType,
                    loadPower: c.loadPower,
                    protectionDevice: c.protectionDevice || { type: 'MCB', curve: 'B', rating: 32, kaRating: 6 },
                    rcdProtected: c.rcdProtected || false,
                    ze
                  }));
                  
                  const diagramLayout = generateConsumerUnitDiagram(circuitData, mainSwitchRating);
                  
                  // Create SVG from layout - simplified export
                  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                  svg.setAttribute('width', '600');
                  svg.setAttribute('height', '800');
                  svg.setAttribute('viewBox', '0 0 600 800');
                  
                  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                  text.setAttribute('x', '50');
                  text.setAttribute('y', '50');
                  text.setAttribute('font-size', '16');
                  text.textContent = `Consumer Unit - ${circuits.length} Circuits - ${mainSwitchRating}A Main Switch`;
                  svg.appendChild(text);
                  
                  const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'consumer-unit-layout.svg';
                  a.click();
                  URL.revokeObjectURL(url);
                }}>
                  <Layout className="h-4 w-4 mr-2" />
                  Consumer Unit Layout
                </Button>
              )}
            </>
          )}
          <Button onClick={handleAddCircuit}>
            <Plus className="h-4 w-4 mr-2" />
            Add Circuit
          </Button>
        </div>
      </div>

      {showDiagram && diagram && (
        <Card>
          <CardHeader>
            <CardTitle>Single Line Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <SVGDiagramRenderer layout={diagram} />
          </CardContent>
        </Card>
      )}

      {showTesting && eicSchedule && (
        <TestingDocumentation 
          eicSchedule={eicSchedule}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {circuits.map((circuit) => {
          const result = circuitResults.find(r => r.circuitNumber === circuit.circuitNumber);
          return (
            <CircuitCard
              key={circuit.circuitNumber}
              circuit={circuit}
              circuitNumber={circuit.circuitNumber}
              onEdit={() => handleEditCircuit(circuit)}
              onDelete={() => handleDeleteCircuit(circuit.circuitNumber)}
              onGenerateSchematic={() => handleGenerateSchematic(circuit)}
              loadingSchematic={loadingSchematic && selectedCircuitForSchematic === circuit.circuitNumber}
              calculationResult={result}
            />
          );
        })}
      </div>

      {circuits.length === 0 && (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-white/70 mb-4">No circuits added yet</p>
            <Button onClick={handleAddCircuit}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Circuit
            </Button>
          </CardContent>
        </Card>
      )}

      {loadBalancing && (
        <LoadBalancingView balancing={loadBalancing} />
      )}

      <CircuitFormDialog 
        open={formOpen}
        onOpenChange={setFormOpen}
        circuit={editingCircuit}
        onSave={handleSaveCircuit}
      />

    </div>
  );
};
