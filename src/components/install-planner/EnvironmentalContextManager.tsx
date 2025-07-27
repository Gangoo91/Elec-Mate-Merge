import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, MapPin, Thermometer, Shield, AlertTriangle } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MultiSelectDropdown } from "@/components/ui/multi-select-dropdown";
import { EnvironmentalSettings, InstallationZone, Circuit } from "./types";
import { v4 as uuidv4 } from "uuid";

interface EnvironmentalContextManagerProps {
  environmentalSettings: EnvironmentalSettings;
  circuits: Circuit[];
  onUpdateEnvironmentalSettings: (settings: EnvironmentalSettings) => void;
  onUpdateCircuits: (circuits: Circuit[]) => void;
}

const EnvironmentalContextManager: React.FC<EnvironmentalContextManagerProps> = ({
  environmentalSettings,
  circuits,
  onUpdateEnvironmentalSettings,
  onUpdateCircuits
}) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("global");

  const environmentalConditions = [
    "Indoor dry locations",
    "Indoor damp locations", 
    "Outdoor protected",
    "Outdoor exposed",
    "Underground",
    "Corrosive atmosphere",
    "High temperature areas",
    "Dusty environments",
    "Potentially explosive atmospheres",
    "Agricultural/farming environments"
  ];

  const specialRequirements = [
    "Fire alarm circuits",
    "Emergency lighting",
    "Essential services",
    "Medical equipment",
    "Swimming pool areas",
    "Bathroom zones",
    "Sauna/steam rooms",
    "Mobile equipment",
    "Outdoor lighting",
    "HVAC equipment"
  ];

  const addInstallationZone = () => {
    const newZone: InstallationZone = {
      id: uuidv4(),
      name: "New Zone",
      description: "",
      ambientTemperature: environmentalSettings.ambientTemperature,
      environmentalConditions: environmentalSettings.environmentalConditions,
      specialRequirements: [],
      circuitIds: []
    };

    onUpdateEnvironmentalSettings({
      ...environmentalSettings,
      installationZones: [...(environmentalSettings.installationZones || []), newZone]
    });
  };

  const updateZone = (zoneId: string, updates: Partial<InstallationZone>) => {
    const updatedZones = (environmentalSettings.installationZones || []).map(zone =>
      zone.id === zoneId ? { ...zone, ...updates } : zone
    );

    onUpdateEnvironmentalSettings({
      ...environmentalSettings,
      installationZones: updatedZones
    });
  };

  const deleteZone = (zoneId: string) => {
    const updatedZones = (environmentalSettings.installationZones || []).filter(zone => zone.id !== zoneId);
    
    // Remove zone assignment from circuits
    const updatedCircuits = circuits.map(circuit => ({
      ...circuit,
      installationZone: circuit.installationZone === zoneId ? undefined : circuit.installationZone
    }));

    onUpdateEnvironmentalSettings({
      ...environmentalSettings,
      installationZones: updatedZones
    });
    onUpdateCircuits(updatedCircuits);
  };

  const assignCircuitToZone = (circuitId: string, zoneId: string | null) => {
    const updatedCircuits = circuits.map(circuit =>
      circuit.id === circuitId ? { ...circuit, installationZone: zoneId || undefined } : circuit
    );

    // Update zone circuit IDs
    const updatedZones = (environmentalSettings.installationZones || []).map(zone => ({
      ...zone,
      circuitIds: zone.id === zoneId 
        ? [...zone.circuitIds.filter(id => id !== circuitId), circuitId]
        : zone.circuitIds.filter(id => id !== circuitId)
    }));

    onUpdateEnvironmentalSettings({
      ...environmentalSettings,
      installationZones: updatedZones
    });
    onUpdateCircuits(updatedCircuits);
  };

  const getTemperatureGuidance = (temp: number) => {
    if (temp <= 25) {
      return { color: "text-green-400", message: "Ideal temperature conditions" };
    } else if (temp <= 35) {
      return { color: "text-yellow-400", message: "Moderate temperature - may require derating" };
    } else if (temp <= 45) {
      return { color: "text-orange-400", message: "High temperature - derating required" };
    } else {
      return { color: "text-red-400", message: "Very high temperature - special cable may be needed" };
    }
  };

  const tabOptions = [
    { value: "global", label: "Global Settings" },
    { value: "zones", label: "Installation Zones" },
    { value: "assignments", label: "Circuit Assignments" }
  ];

  const specialRequirementsOptions = specialRequirements.map(req => ({
    value: req,
    label: req
  }));

  const environmentalConditionsOptions = environmentalConditions.map(condition => ({
    value: condition,
    label: condition
  }));

  const earthingSystemOptions = [
    { value: "TN-S", label: "TN-S" },
    { value: "TN-C-S", label: "TN-C-S (PME)" },
    { value: "TT", label: "TT" },
    { value: "IT", label: "IT" }
  ];

  return (
    <div className="space-y-4 p-3 sm:p-4 max-w-full">
      {/* Mobile Tab Selector */}
      <div className="w-full">
        <MobileSelectWrapper
          label="Section"
          value={activeTab}
          onValueChange={setActiveTab}
          options={tabOptions}
          placeholder="Select section..."
        />
      </div>

      {/* Global Settings Content */}
      {activeTab === "global" && (
        <div className="space-y-6 pt-4 px-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-semibold text-elec-light">Default Ambient Temperature (°C)</span>
              <MobileInputWrapper
                type="number"
                value={environmentalSettings.ambientTemperature.toString()}
                onChange={(value) => {
                  console.log('Temperature updated:', value);
                  onUpdateEnvironmentalSettings({
                    ...environmentalSettings,
                    ambientTemperature: Number(value)
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-elec-light">Default Environmental Conditions</span>
              <MobileSelectWrapper
                value={environmentalSettings.environmentalConditions}
                onValueChange={(value) => {
                  console.log('Environmental conditions updated:', value);
                  onUpdateEnvironmentalSettings({
                    ...environmentalSettings,
                    environmentalConditions: value
                  });
                }}
                options={environmentalConditionsOptions}
                placeholder="Select environmental conditions..."
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-elec-light">Earthing System</span>
              <MobileSelectWrapper
                value={environmentalSettings.earthingSystem}
                onValueChange={(value) => {
                  console.log('Earthing system updated:', value);
                  // Auto-update Ze values based on earthing system
                  let newZe = environmentalSettings.ze;
                  switch (value) {
                    case "TT":
                      newZe = 0.80;
                      break;
                    case "TN-S":
                      newZe = 0.35;
                      break;
                    case "TN-C-S":
                      newZe = 0.35;
                      break;
                    case "IT":
                      newZe = 1.0;
                      break;
                    default:
                      newZe = 0.35;
                  }
                  
                  onUpdateEnvironmentalSettings({
                    ...environmentalSettings,
                    earthingSystem: value,
                    ze: newZe
                  });
                }}
                options={earthingSystemOptions}
                placeholder="Select earthing system..."
              />
            </div>

            <div className="space-y-3">
              <span className="text-sm font-semibold text-elec-light">Ze Value (Ω)</span>
              
              {/* Prominent Ze Value Display */}
              <div className="bg-elec-dark/30 border border-elec-yellow/30 rounded-lg p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">External earth fault loop impedance</div>
                <div className="text-2xl font-bold text-elec-yellow mb-2">{environmentalSettings.ze}</div>
                <MobileInputWrapper
                  type="number"
                  value={environmentalSettings.ze.toString()}
                  onChange={(value) => {
                    console.log('Ze value updated:', value);
                    onUpdateEnvironmentalSettings({
                      ...environmentalSettings,
                      ze: Number(value)
                    });
                  }}
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Special Requirements
              </div>
              <div className="space-y-3">
                {specialRequirements.map((requirement) => (
                  <div key={requirement} className="flex items-start space-x-3 p-4 rounded-lg bg-elec-gray border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id={requirement}
                        checked={environmentalSettings.specialRequirements.includes(requirement)}
                        onChange={(e) => {
                          const current = environmentalSettings.specialRequirements;
                          if (e.target.checked) {
                            onUpdateEnvironmentalSettings({
                              ...environmentalSettings,
                              specialRequirements: [...current, requirement]
                            });
                          } else {
                            onUpdateEnvironmentalSettings({
                              ...environmentalSettings,
                              specialRequirements: current.filter(req => req !== requirement)
                            });
                          }
                        }}
                        className="w-4 h-4 text-elec-yellow bg-elec-gray border border-elec-yellow/50 rounded focus:ring-2 focus:ring-elec-yellow focus:ring-offset-0 checked:bg-elec-yellow checked:border-elec-yellow"
                      />
                    </div>
                    <label htmlFor={requirement} className="text-sm text-elec-light cursor-pointer flex-1 leading-relaxed">
                      {requirement}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Installation Zones Content */}
      {activeTab === "zones" && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-medium text-elec-light text-center">Installation Zones</h3>
            <Button 
              onClick={addInstallationZone} 
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium w-full py-3 text-sm h-12"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </div>

          <div className="space-y-4">
            {(environmentalSettings.installationZones || []).map((zone) => (
              <div key={zone.id} className="border border-elec-yellow/20 rounded-lg p-4 space-y-4 bg-elec-card/30">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-center gap-2 text-elec-light text-base font-medium">
                    <MapPin className="h-4 w-4 text-elec-yellow" />
                    Zone Configuration
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteZone(zone.id)}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 w-full py-2 h-9 text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Zone
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-elec-light">Zone Name</span>
                    <MobileInputWrapper
                      value={zone.name}
                      onChange={(value) => updateZone(zone.id, { name: value })}
                      placeholder="Enter zone name..."
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-elec-light">Description</span>
                    <MobileInputWrapper
                      value={zone.description}
                      onChange={(value) => updateZone(zone.id, { description: value })}
                      placeholder="Describe this installation zone..."
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-elec-light">Ambient Temperature (°C)</span>
                    <MobileInputWrapper
                      type="number"
                      value={zone.ambientTemperature.toString()}
                      onChange={(value) => updateZone(zone.id, { ambientTemperature: Number(value) })}
                    />
                    <div className={`text-xs ${getTemperatureGuidance(zone.ambientTemperature).color} mt-1`}>
                      {getTemperatureGuidance(zone.ambientTemperature).message}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-elec-light">Environmental Conditions</span>
                    <MobileSelectWrapper
                      value={zone.environmentalConditions}
                      onValueChange={(value) => updateZone(zone.id, { environmentalConditions: value })}
                      options={environmentalConditionsOptions}
                      placeholder="Select environmental conditions..."
                    />
                  </div>

                  {zone.circuitIds.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-elec-light flex items-center gap-2">
                        <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                        Assigned Circuits
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {zone.circuitIds.map((circuitId) => {
                          const circuit = circuits.find(c => c.id === circuitId);
                          return circuit ? (
                            <Badge key={circuitId} variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs px-2 py-1">
                              {circuit.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {(environmentalSettings.installationZones || []).length === 0 && (
              <div className="border border-elec-yellow/20 rounded-lg p-6 space-y-4 bg-elec-card/30 text-center">
                <MapPin className="h-12 w-12 text-elec-light/50 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2 text-elec-light">No Installation Zones</h4>
                <p className="text-elec-light/70 mb-6 px-4">
                  Create zones to group circuits with similar environmental conditions.
                </p>
                <Button 
                  onClick={addInstallationZone} 
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold w-full max-w-xs py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Zone
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Circuit Assignments Content */}
      {activeTab === "assignments" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-light">Circuit Zone Assignments</h3>

          {circuits.length === 0 ? (
            <div className="border border-elec-yellow/20 rounded-lg p-6 space-y-4 bg-elec-card/30 text-center">
              <Shield className="h-12 w-12 text-elec-light/50 mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2 text-elec-light">No Circuits Available</h4>
              <p className="text-elec-light/70">
                Add circuits in the Circuit Design step to assign them to environmental zones.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {circuits.map((circuit) => {
                const zoneOptions = [
                  { value: "no-zone", label: "No specific zone" },
                  ...(environmentalSettings.installationZones || []).map(zone => ({
                    value: zone.id,
                    label: zone.name
                  }))
                ];

                return (
                  <div key={circuit.id} className="border border-elec-yellow/20 rounded-lg p-4 space-y-4 bg-elec-card/30">
                    <div className="text-center">
                      <h4 className="font-medium text-elec-light mb-3">{circuit.name}</h4>
                      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 text-sm">
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
                      </div>
                    </div>
                    
                    <MobileSelectWrapper
                      label="Zone Assignment"
                      value={circuit.installationZone || "no-zone"}
                      onValueChange={(value) => assignCircuitToZone(circuit.id, value === "no-zone" ? null : value)}
                      options={zoneOptions}
                      placeholder="Assign to zone..."
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnvironmentalContextManager;