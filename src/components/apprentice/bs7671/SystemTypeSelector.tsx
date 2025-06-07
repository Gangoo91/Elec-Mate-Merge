
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Building, Home, Factory } from "lucide-react";

interface SystemTypeSelectorProps {
  onSelectionChange: (systemType: string, installationType: string) => void;
}

const SystemTypeSelector = ({ onSelectionChange }: SystemTypeSelectorProps) => {
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [selectedInstallation, setSelectedInstallation] = useState<string>("");

  const systemTypes = [
    { id: "single-phase", name: "Single Phase", description: "230V, typical domestic supply", icon: Home },
    { id: "three-phase", name: "Three Phase", description: "400V/230V, commercial/industrial", icon: Building }
  ];

  const installationTypes = [
    { id: "domestic", name: "Domestic", description: "Houses, flats, small properties", icon: Home },
    { id: "commercial", name: "Commercial", description: "Offices, shops, small businesses", icon: Building },
    { id: "industrial", name: "Industrial", description: "Factories, large facilities", icon: Factory }
  ];

  const handleSystemSelect = (systemId: string) => {
    setSelectedSystem(systemId);
    if (selectedInstallation) {
      onSelectionChange(systemId, selectedInstallation);
    }
  };

  const handleInstallationSelect = (installationId: string) => {
    setSelectedInstallation(installationId);
    if (selectedSystem) {
      onSelectionChange(selectedSystem, installationId);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Select System Type:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {systemTypes.map((system) => {
              const Icon = system.icon;
              return (
                <Button
                  key={system.id}
                  variant={selectedSystem === system.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-start gap-2"
                  onClick={() => handleSystemSelect(system.id)}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{system.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{system.description}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Select Installation Type:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {installationTypes.map((installation) => {
              const Icon = installation.icon;
              return (
                <Button
                  key={installation.id}
                  variant={selectedInstallation === installation.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-start gap-2"
                  onClick={() => handleInstallationSelect(installation.id)}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{installation.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{installation.description}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {selectedSystem && selectedInstallation && (
          <div className="flex items-center gap-2 pt-4 border-t">
            <span className="text-sm">Selected:</span>
            <Badge variant="secondary">{systemTypes.find(s => s.id === selectedSystem)?.name}</Badge>
            <Badge variant="secondary">{installationTypes.find(i => i.id === selectedInstallation)?.name}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemTypeSelector;
