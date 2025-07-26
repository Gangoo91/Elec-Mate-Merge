
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
    <div className="space-y-6 p-4">
      {/* Mobile Tab Selector */}
      <MobileSelectWrapper
        label="Section"
        value={activeTab}
        onValueChange={setActiveTab}
        options={tabOptions}
        placeholder="Select section..."
      />

      {/* Global Settings Content */}
      {activeTab === "global" && (
        <Card className="border-elec-yellow/20 bg-elec-card/50 backdrop-blur-sm">
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <MobileInputWrapper
                label="Default Ambient Temperature (°C)"
                type="number"
                value={environmentalSettings.ambientTemperature.toString()}
                onChange={(value) => onUpdateEnvironmentalSettings({
                  ...environmentalSettings,
                  ambientTemperature: Number(value)
                })}
              />

              <MobileSelectWrapper
                label="Default Environmental Conditions"
                value={environmentalSettings.environmentalConditions}
                onValueChange={(value) => onUpdateEnvironmentalSettings({
                  ...environmentalSettings,
                  environmentalConditions: value
                })}
                options={environmentalConditionsOptions}
                placeholder="Select environmental conditions..."
              />

              <MobileSelectWrapper
                label="Earthing System"
                value={environmentalSettings.earthingSystem}
                onValueChange={(value) => {
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

              <MobileInputWrapper
                label="Ze Value (Ω)"
                type="number"
                value={environmentalSettings.ze.toString()}
                onChange={(value) => onUpdateEnvironmentalSettings({
                  ...environmentalSettings,
                  ze: Number(value)
                })}
                hint="External earth fault loop impedance"
              />

              <div className="space-y-3">
                <div className="text-sm font-semibold text-elec-light flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  Special Requirements
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialRequirements.map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-3 p-3 rounded-lg bg-elec-card/30 border border-elec-gray/30">
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
                        className="w-4 h-4 text-elec-yellow bg-elec-card border-elec-gray/50 rounded focus:ring-elec-yellow focus:ring-2"
                      />
                      <label htmlFor={requirement} className="text-sm text-elec-light cursor-pointer flex-1">
                        {requirement}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Installation Zones Content */}
      {activeTab === "zones" && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <h3 className="text-lg font-semibold text-elec-light">Installation Zones</h3>
            <Button 
              onClick={addInstallationZone} 
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </div>

          <div className="space-y-4">
            {(environmentalSettings.installationZones || []).map((zone) => (
              <Card key={zone.id} className="border-elec-yellow/20 bg-elec-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
                    <CardTitle className="flex items-center gap-2 text-elec-light">
                      <MapPin className="h-5 w-5 text-elec-yellow" />
                      Zone Configuration
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteZone(zone.id)}
                      className="border-destructive/30 text-destructive hover:bg-destructive/10 w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-2 sm:mr-0" />
                      <span className="sm:hidden">Delete Zone</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <MobileInputWrapper
                    label="Zone Name"
                    value={zone.name}
                    onChange={(value) => updateZone(zone.id, { name: value })}
                    placeholder="Enter zone name..."
                  />

                  <MobileInputWrapper
                    label="Description"
                    value={zone.description}
                    onChange={(value) => updateZone(zone.id, { description: value })}
                    placeholder="Describe this installation zone..."
                  />

                  <MobileInputWrapper
                    label="Ambient Temperature (°C)"
                    type="number"
                    value={zone.ambientTemperature.toString()}
                    onChange={(value) => updateZone(zone.id, { ambientTemperature: Number(value) })}
                  />

                  <MobileSelectWrapper
                    label="Environmental Conditions"
                    value={zone.environmentalConditions}
                    onValueChange={(value) => updateZone(zone.id, { environmentalConditions: value })}
                    options={environmentalConditionsOptions}
                    placeholder="Select environmental conditions..."
                  />

                  {zone.circuitIds.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-elec-light flex items-center gap-2">
                        <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                        Assigned Circuits
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {zone.circuitIds.map((circuitId) => {
                          const circuit = circuits.find(c => c.id === circuitId);
                          return circuit ? (
                            <Badge key={circuitId} variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                              {circuit.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {(environmentalSettings.installationZones || []).length === 0 && (
              <Card className="border-elec-yellow/20 bg-elec-card/50 backdrop-blur-sm">
                <CardContent className="text-center py-8">
                  <MapPin className="h-12 w-12 text-elec-light/50 mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2 text-elec-light">No Installation Zones</h4>
                  <p className="text-elec-light/70 mb-4">
                    Create zones to group circuits with similar environmental conditions.
                  </p>
                  <Button 
                    onClick={addInstallationZone} 
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Zone
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Circuit Assignments Content */}
      {activeTab === "assignments" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-light">Circuit Zone Assignments</h3>

          {circuits.length === 0 ? (
            <Card className="border-elec-yellow/20 bg-elec-card/50 backdrop-blur-sm">
              <CardContent className="text-center py-8">
                <Shield className="h-12 w-12 text-elec-light/50 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2 text-elec-light">No Circuits Available</h4>
                <p className="text-elec-light/70">
                  Add circuits in the Circuit Design step to assign them to environmental zones.
                </p>
              </CardContent>
            </Card>
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
                  <Card key={circuit.id} className="border-elec-yellow/20 bg-elec-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-elec-yellow" />
                        <div className="flex-1">
                          <h4 className="font-medium text-elec-light">{circuit.name}</h4>
                          <p className="text-sm text-elec-light/70">
                            {circuit.totalLoad}W • {circuit.voltage}V • {circuit.cableLength}m
                          </p>
                        </div>
                      </div>
                      
                      <MobileSelectWrapper
                        label="Zone Assignment"
                        value={circuit.installationZone || "no-zone"}
                        onValueChange={(value) => assignCircuitToZone(circuit.id, value === "no-zone" ? null : value)}
                        options={zoneOptions}
                        placeholder="Assign to zone..."
                      />
                    </CardContent>
                  </Card>
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
