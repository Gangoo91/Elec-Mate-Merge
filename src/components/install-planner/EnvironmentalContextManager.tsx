
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, MapPin, Thermometer, Shield, AlertTriangle } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-elec-dark border border-elec-yellow/20">
          <TabsTrigger value="global">Global Settings</TabsTrigger>
          <TabsTrigger value="zones">Installation Zones</TabsTrigger>
          <TabsTrigger value="assignments">Circuit Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-dark/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-elec-yellow" />
                Global Environmental Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="globalTemp">Default Ambient Temperature (°C)</Label>
                  <Input
                    id="globalTemp"
                    type="number"
                    value={environmentalSettings.ambientTemperature}
                    onChange={(e) => onUpdateEnvironmentalSettings({
                      ...environmentalSettings,
                      ambientTemperature: Number(e.target.value)
                    })}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                  <p className={`text-sm mt-1 ${getTemperatureGuidance(environmentalSettings.ambientTemperature).color}`}>
                    {getTemperatureGuidance(environmentalSettings.ambientTemperature).message}
                  </p>
                </div>

                <div>
                  <Label>Default Environmental Conditions</Label>
                  <Select 
                    value={environmentalSettings.environmentalConditions} 
                    onValueChange={(value) => onUpdateEnvironmentalSettings({
                      ...environmentalSettings,
                      environmentalConditions: value
                    })}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {environmentalConditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Earthing System</Label>
                  <Select 
                    value={environmentalSettings.earthingSystem} 
                    onValueChange={(value) => onUpdateEnvironmentalSettings({
                      ...environmentalSettings,
                      earthingSystem: value
                    })}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="TN-S">TN-S</SelectItem>
                      <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                      <SelectItem value="TT">TT</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="zeValue">Ze Value (Ω)</Label>
                  <Input
                    id="zeValue"
                    type="number"
                    step="0.01"
                    value={environmentalSettings.ze}
                    onChange={(e) => onUpdateEnvironmentalSettings({
                      ...environmentalSettings,
                      ze: Number(e.target.value)
                    })}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
              </div>

              <div>
                <Label>Special Requirements</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {specialRequirements.map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
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
                        className="rounded border-elec-yellow/30"
                      />
                      <Label htmlFor={requirement} className="text-sm">{requirement}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Installation Zones</h3>
            <Button onClick={addInstallationZone} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </div>

          <div className="space-y-4">
            {(environmentalSettings.installationZones || []).map((zone) => (
              <Card key={zone.id} className="border-elec-yellow/20 bg-elec-dark/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-elec-yellow" />
                      <Input
                        value={zone.name}
                        onChange={(e) => updateZone(zone.id, { name: e.target.value })}
                        className="bg-elec-dark border-elec-yellow/20 font-semibold"
                      />
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteZone(zone.id)}
                      className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={zone.description}
                      onChange={(e) => updateZone(zone.id, { description: e.target.value })}
                      className="bg-elec-dark border-elec-yellow/20"
                      placeholder="Describe this installation zone..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Ambient Temperature (°C)</Label>
                      <Input
                        type="number"
                        value={zone.ambientTemperature}
                        onChange={(e) => updateZone(zone.id, { ambientTemperature: Number(e.target.value) })}
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>

                    <div>
                      <Label>Environmental Conditions</Label>
                      <Select 
                        value={zone.environmentalConditions} 
                        onValueChange={(value) => updateZone(zone.id, { environmentalConditions: value })}
                      >
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20">
                          {environmentalConditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {zone.circuitIds.length > 0 && (
                    <div>
                      <Label>Assigned Circuits</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {zone.circuitIds.map((circuitId) => {
                          const circuit = circuits.find(c => c.id === circuitId);
                          return circuit ? (
                            <Badge key={circuitId} variant="outline" className="border-elec-yellow/30 text-elec-yellow">
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
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <h3 className="text-lg font-semibold">Circuit Zone Assignments</h3>

          {circuits.length === 0 ? (
            <Card className="border-elec-yellow/20 bg-elec-dark/50">
              <CardContent className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">No Circuits Available</h4>
                <p className="text-muted-foreground">
                  Add circuits in the Circuit Design step to assign them to environmental zones.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {circuits.map((circuit) => (
                <Card key={circuit.id} className="border-elec-yellow/20 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-elec-yellow" />
                        <div>
                          <h4 className="font-medium">{circuit.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {circuit.totalLoad}W • {circuit.voltage}V • {circuit.cableLength}m
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={circuit.installationZone || "no-zone"}
                          onValueChange={(value) => assignCircuitToZone(circuit.id, value === "no-zone" ? null : value)}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 w-48">
                            <SelectValue placeholder="Assign to zone" />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                            <SelectItem value="no-zone">No specific zone</SelectItem>
                            {(environmentalSettings.installationZones || []).map((zone) => (
                              <SelectItem key={zone.id} value={zone.id}>
                                {zone.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnvironmentalContextManager;
