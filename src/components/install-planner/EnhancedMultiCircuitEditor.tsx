import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
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
  Filter,
  Smartphone
} from "lucide-react";
import { Circuit } from "./types";
import CircuitControls from "./CircuitControls";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

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
  const { isMobile, isTablet, screenSize, orientation, touchSupport } = useMobileEnhanced();
  const [expandedCircuit, setExpandedCircuit] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [mobileStep, setMobileStep] = useState<'overview' | 'edit'>('overview');

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
          <MobileInput
            placeholder="Search circuits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            inputMode="search"
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
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base flex items-center gap-2 mb-3">
                          {circuit.name}
                          {expandedCircuit === circuit.id ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </CardTitle>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="bg-elec-gray rounded p-2 text-center border border-elec-yellow/20">
                            <div className="text-xs text-muted-foreground mb-1">Load</div>
                            <div className="font-medium text-elec-yellow">{circuit.totalLoad}W</div>
                          </div>
                          <div className="bg-elec-gray rounded p-2 text-center border border-elec-yellow/20">
                            <div className="text-xs text-muted-foreground mb-1">Voltage</div>
                            <div className="font-medium text-elec-yellow">{circuit.voltage}V</div>
                          </div>
                          <div className="bg-elec-gray rounded p-2 text-center border border-elec-yellow/20">
                            <div className="text-xs text-muted-foreground mb-1">Length</div>
                            <div className="font-medium text-elec-yellow">{circuit.cableLength}m</div>
                          </div>
                          <div className="bg-elec-gray rounded p-2 text-center border border-elec-yellow/20">
                            <div className="text-xs text-muted-foreground mb-1">Type</div>
                            <div className="font-medium text-elec-yellow text-xs">{circuit.loadType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-full">
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
                        <MobileInputWrapper
                          label="Circuit Name"
                          placeholder="Enter circuit name"
                          value={circuit.name}
                          onChange={(value) => updateCircuit(circuit.id, { name: value })}
                        />

                        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                          <MobileInputWrapper
                            label="Total Load"
                            placeholder="1000"
                            value={circuit.totalLoad.toString()}
                            onChange={(value) => updateCircuit(circuit.id, { totalLoad: Number(value) })}
                            type="number"
                            unit="W"
                          />

                          <MobileInputWrapper
                            label="Cable Length"
                            placeholder="30"
                            value={circuit.cableLength.toString()}
                            onChange={(value) => updateCircuit(circuit.id, { cableLength: Number(value) })}
                            type="number"
                            unit="m"
                          />
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
                          <MobileInputWrapper
                            label="Power Factor"
                            placeholder="0.85"
                            value={(circuit.powerFactor || 0.85).toString()}
                            onChange={(value) => updateCircuit(circuit.id, { powerFactor: Number(value) })}
                            type="number"
                            hint="Typical range: 0.7 - 1.0"
                          />
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
                              { value: "clips-direct-on-surface", label: "Clipped Direct on Surface" },
                              { value: "in-conduit-in-insulated-wall", label: "In Conduit in Insulated Wall" },
                              { value: "in-trunking", label: "In Trunking" },
                              { value: "on-cable-tray", label: "On Cable Tray" },
                              { value: "clipped-to-non-metallic-surface", label: "Clipped to Non-metallic Surface" },
                              { value: "direct-burial", label: "Direct Burial" }
                            ]}
                          />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <MobileSelectWrapper
                            label="Cable Type"
                            value={circuit.cableType}
                            onValueChange={(value) => updateCircuit(circuit.id, { cableType: value })}
                            options={[
                              { value: "pvc-twin-earth", label: "PVC Twin & Earth" },
                              { value: "xlpe-lsoh", label: "XLPE/LSOH Single Core" },
                              { value: "swa-xlpe", label: "SWA XLPE" },
                              { value: "micc", label: "Mineral Insulated" }
                            ]}
                          />

                          <MobileSelectWrapper
                            label="Protective Device Type"
                            value={circuit.protectiveDevice}
                            onValueChange={(value) => updateCircuit(circuit.id, { protectiveDevice: value })}
                            options={[
                              { value: "mcb-b", label: "MCB Type B (up to 125A)" },
                              { value: "mcb-c", label: "MCB Type C (up to 125A)" },
                              { value: "mcb-d", label: "MCB Type D (up to 125A)" },
                              { value: "rcbo-b", label: "RCBO Type B (30mA)" },
                              { value: "rcbo-c", label: "RCBO Type C (30mA)" },
                              { value: "bs88-gg", label: "BS88 HRC Fuse (up to 1250A)" },
                              { value: "mccb", label: "MCCB (16A to 4000A)" },
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