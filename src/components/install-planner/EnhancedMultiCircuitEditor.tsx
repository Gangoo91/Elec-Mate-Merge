import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Zap, 
  Cable, 
  ChevronDown, 
  ChevronRight, 
  Search,
  SortAsc,
  Filter
} from "lucide-react";
import { Circuit } from "./types";
import CircuitControls from "./CircuitControls";

interface EnhancedMultiCircuitEditorProps {
  circuits: Circuit[];
  onUpdateCircuits: (circuits: Circuit[]) => void;
  installationType: string;
}

const EnhancedMultiCircuitEditor: React.FC<EnhancedMultiCircuitEditorProps> = ({ 
  circuits, 
  onUpdateCircuits,
  installationType 
}) => {
  const [expandedCircuit, setExpandedCircuit] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const updateCircuit = (id: string, updates: Partial<Circuit>) => {
    const updatedCircuits = circuits.map(circuit => 
      circuit.id === id ? { ...circuit, ...updates } : circuit
    );
    onUpdateCircuits(updatedCircuits);
  };

  const deleteCircuit = (id: string) => {
    const updatedCircuits = circuits.filter(circuit => circuit.id !== id);
    onUpdateCircuits(updatedCircuits);
    if (expandedCircuit === id) {
      setExpandedCircuit(null);
    }
  };

  const duplicateCircuit = (circuit: Circuit) => {
    const newCircuit: Circuit = {
      ...circuit,
      id: crypto.randomUUID(),
      name: `${circuit.name} (Copy)`
    };
    const updatedCircuits = [...circuits, newCircuit];
    onUpdateCircuits(updatedCircuits);
  };

  const toggleExpanded = (id: string) => {
    setExpandedCircuit(expandedCircuit === id ? null : id);
  };

  const getLoadTypeIcon = (loadType: string) => {
    switch (loadType) {
      case "lighting": return Zap;
      case "power": return Cable;
      case "cooker": return ChevronDown;
      case "shower": return Filter;
      case "heating": return Search;
      case "ev-charging": return SortAsc;
      case "motor-small": return Cable;
      case "motor-large": return Cable;
      case "motor": return Cable;
      case "hvac": return Search;
      case "it-equipment": return ChevronDown;
      case "commercial-lighting": return Zap;
      case "commercial-power": return Cable;
      case "emergency": return Filter;
      case "medical": return SortAsc;
      case "welding": return Search;
      case "crane": return Cable;
      case "furnace": return ChevronDown;
      default: return Cable;
    }
  };

  // Filter and sort circuits
  const filteredAndSortedCircuits = circuits
    .filter(circuit => {
      const matchesSearch = circuit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           circuit.loadType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || 
                           (filterBy === "enabled" && circuit.enabled) ||
                           (filterBy === "disabled" && !circuit.enabled) ||
                           circuit.loadType.includes(filterBy);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "load": return b.totalLoad - a.totalLoad;
        case "voltage": return a.voltage - b.voltage;
        case "type": return a.loadType.localeCompare(b.loadType);
        default: return 0;
      }
    });

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "load", label: "Load (High to Low)" },
    { value: "voltage", label: "Voltage" },
    { value: "type", label: "Circuit Type" }
  ];

  const filterOptions = [
    { value: "all", label: "All Circuits" },
    { value: "enabled", label: "Enabled Only" },
    { value: "disabled", label: "Disabled Only" },
    { value: "lighting", label: "Lighting Circuits" },
    { value: "power", label: "Power Circuits" }
  ];

  if (circuits.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Circuit Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure your {circuits.length} circuits for the {installationType} installation
          </p>
        </div>
        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow self-start sm:self-center">
          {circuits.filter(c => c.enabled).length} / {circuits.length} Active
        </Badge>
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search circuits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-elec-dark border-elec-yellow/30"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <MobileSelectWrapper
            label="Sort by"
            value={sortBy}
            onValueChange={setSortBy}
            options={sortOptions}
          />
          <MobileSelectWrapper
            label="Filter"
            value={filterBy}
            onValueChange={setFilterBy}
            options={filterOptions}
          />
        </div>
      </div>

      {/* Circuit Cards */}
      <div className="space-y-3">
        {filteredAndSortedCircuits.map((circuit) => (
          <Card key={circuit.id} className={`border-2 transition-all ${
            circuit.enabled ? 'border-elec-yellow/30 bg-elec-gray' : 'border-gray-600/30 bg-gray-800/30'
          }`}>
            <Collapsible 
              open={expandedCircuit === circuit.id}
              onOpenChange={(open) => setExpandedCircuit(open ? circuit.id : null)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-black/20 transition-colors">
                  <div className="w-full">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base flex items-center gap-2 mb-3">
                          {circuit.name}
                          {expandedCircuit === circuit.id ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </CardTitle>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-elec-dark/50 rounded p-2 text-center">
                            <div className="text-xs text-muted-foreground mb-1">Load</div>
                            <div className="font-medium text-elec-yellow">{circuit.totalLoad}W</div>
                          </div>
                          <div className="bg-elec-dark/50 rounded p-2 text-center">
                            <div className="text-xs text-muted-foreground mb-1">Voltage</div>
                            <div className="font-medium text-blue-400">{circuit.voltage}V</div>
                          </div>
                          <div className="bg-elec-dark/50 rounded p-2 text-center">
                            <div className="text-xs text-muted-foreground mb-1">Length</div>
                            <div className="font-medium text-green-400">{circuit.cableLength}m</div>
                          </div>
                          <div className="bg-elec-dark/50 rounded p-2 text-center">
                            <div className="text-xs text-muted-foreground mb-1">Type</div>
                            <div className="font-medium text-purple-400 text-xs">{circuit.loadType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <CircuitControls
                        circuit={circuit}
                        onToggleEnabled={(enabled) => updateCircuit(circuit.id, { enabled })}
                        onDuplicate={() => duplicateCircuit(circuit)}
                        onDelete={() => deleteCircuit(circuit.id)}
                        onToggleExpanded={() => toggleExpanded(circuit.id)}
                        isExpanded={expandedCircuit === circuit.id}
                        canDelete={circuits.length > 1}
                      />
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {/* Basic Settings */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-elec-yellow flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Circuit Details
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`name-${circuit.id}`}>Circuit Name</Label>
                          <Input
                            id={`name-${circuit.id}`}
                            value={circuit.name}
                            onChange={(e) => updateCircuit(circuit.id, { name: e.target.value })}
                            className="mt-2 bg-elec-dark border-elec-yellow/30"
                            placeholder="Enter circuit name"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`load-${circuit.id}`}>Total Load (W)</Label>
                            <Input
                              id={`load-${circuit.id}`}
                              type="number"
                              value={circuit.totalLoad}
                              onChange={(e) => updateCircuit(circuit.id, { totalLoad: Number(e.target.value) })}
                              className="mt-2 bg-elec-dark border-elec-yellow/30"
                              placeholder="1000"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`length-${circuit.id}`}>Cable Length (m)</Label>
                            <Input
                              id={`length-${circuit.id}`}
                              type="number"
                              value={circuit.cableLength}
                              onChange={(e) => updateCircuit(circuit.id, { cableLength: Number(e.target.value) })}
                              className="mt-2 bg-elec-dark border-elec-yellow/30"
                              placeholder="30"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <MobileSelectWrapper
                            label="Voltage (V)"
                            value={circuit.voltage.toString()}
                            onValueChange={(value) => updateCircuit(circuit.id, { voltage: Number(value) })}
                            options={[
                              { value: "230", label: "230V" },
                              { value: "400", label: "400V" }
                            ]}
                          />

                          <MobileSelectWrapper
                            label="Phases"
                            value={circuit.phases}
                            onValueChange={(value: "single" | "three") => updateCircuit(circuit.id, { phases: value })}
                            options={[
                              { value: "single", label: "Single" },
                              { value: "three", label: "Three" }
                            ]}
                          />
                        </div>

                        {circuit.phases === "three" && (
                          <div>
                            <Label htmlFor={`pf-${circuit.id}`}>Power Factor</Label>
                            <Input
                              id={`pf-${circuit.id}`}
                              type="number"
                              step="0.01"
                              min="0.1"
                              max="1"
                              value={circuit.powerFactor || 0.85}
                              onChange={(e) => updateCircuit(circuit.id, { powerFactor: Number(e.target.value) })}
                              className="mt-2 bg-elec-dark border-elec-yellow/30"
                              placeholder="0.85"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Typical range: 0.7 - 1.0</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Installation Settings */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-elec-yellow flex items-center gap-2">
                        <Cable className="h-4 w-4" />
                        Installation Details
                      </h4>
                      
                      <div className="space-y-4">
                          <MobileSelectWrapper
                            label="Installation Method"
                            value={circuit.installationMethod}
                            onValueChange={(value) => updateCircuit(circuit.id, { installationMethod: value })}
                            options={[
                              { value: "clipped-direct", label: "Clipped Direct (BS7671: C)" },
                              { value: "enclosed-conduit", label: "Enclosed in Conduit (BS7671: A1)" },
                              { value: "trunking", label: "Trunking (BS7671: B1)" },
                              { value: "conduit", label: "Surface Conduit (BS7671: A2)" },
                              { value: "tray", label: "Cable Tray (BS7671: E)" },
                              { value: "ladder", label: "Cable Ladder (BS7671: F)" },
                              { value: "basket", label: "Cable Basket (BS7671: G)" },
                              { value: "buried-direct", label: "Buried Direct (BS7671: D1)" },
                              { value: "ducted", label: "Ducted Underground (BS7671: D2)" },
                              { value: "touching-wall", label: "Touching Wall (BS7671: C)" },
                              { value: "spaced-from-wall", label: "Spaced from Wall (BS7671: C)" },
                              { value: "in-air", label: "Free Air (BS7671: E, F, G)" }
                            ]}
                          />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <MobileSelectWrapper
                            label="Cable Type"
                            value={circuit.cableType}
                            onValueChange={(value) => updateCircuit(circuit.id, { cableType: value })}
                            options={[
                              { value: "t&e", label: "Twin & Earth (T&E) - BS7671 Table 4E4A" },
                              { value: "swa", label: "Steel Wire Armoured (SWA) - BS7671 Table 4E1A" },
                              { value: "xlpe", label: "XLPE Single Core - BS7671 Table 4E1A" },
                              { value: "pvc-single", label: "PVC Single Core - BS7671 Table 4E2A" },
                              { value: "pvc-multicore", label: "PVC Multicore - BS7671 Table 4E3A" },
                              { value: "mineral", label: "Mineral Insulated - BS7671 Table 4J1A" },
                              { value: "aluminium", label: "Aluminium Conductor - BS7671 Table 4E5A" },
                              { value: "lsf", label: "Low Smoke & Fume (LSF)" },
                              { value: "lszh", label: "Low Smoke Zero Halogen (LSZH)" },
                              { value: "fire-resistant", label: "Fire Resistant Cable" },
                              { value: "data-cable", label: "Data/Communications Cable" }
                            ]}
                          />

                          <MobileSelectWrapper
                            label="Protective Device"
                            value={circuit.protectiveDevice}
                            onValueChange={(value) => updateCircuit(circuit.id, { protectiveDevice: value })}
                            options={[
                              { value: "mcb-b", label: "MCB Type B (3-5 x In)" },
                              { value: "mcb-c", label: "MCB Type C (5-10 x In)" },
                              { value: "mcb-d", label: "MCB Type D (10-20 x In)" },
                              { value: "rcbo-b", label: "RCBO Type B (30mA)" },
                              { value: "rcbo-c", label: "RCBO Type C (30mA)" },
                              { value: "rcbo-100ma", label: "RCBO 100mA (Fire Protection)" },
                              { value: "rcd-30ma", label: "RCD 30mA + MCB" },
                              { value: "rcd-100ma", label: "RCD 100mA + MCB" },
                              { value: "afdd", label: "AFDD (Arc Fault Device)" },
                              { value: "spd", label: "SPD (Surge Protection)" },
                              { value: "fuse-bs88", label: "BS88 Fuse" },
                              { value: "mccb", label: "MCCB (Moulded Case)" }
                            ]}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`notes-${circuit.id}`}>Notes (Optional)</Label>
                          <Textarea
                            id={`notes-${circuit.id}`}
                            value={circuit.notes || ""}
                            onChange={(e) => updateCircuit(circuit.id, { notes: e.target.value })}
                            className="mt-2 bg-elec-dark border-elec-yellow/30"
                            placeholder="Additional notes or requirements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {filteredAndSortedCircuits.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Circuits Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedMultiCircuitEditor;