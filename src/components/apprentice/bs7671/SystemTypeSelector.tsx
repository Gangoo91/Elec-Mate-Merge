
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Building, Home, Factory, CheckCircle } from "lucide-react";

interface SystemTypeSelectorProps {
  onSelectionChange: (systemType: string, installationType: string) => void;
}

const SystemTypeSelector = ({ onSelectionChange }: SystemTypeSelectorProps) => {
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [selectedInstallation, setSelectedInstallation] = useState<string>("");

  const systemTypes = [
    { id: "single-phase", name: "Single Phase", description: "230V, typical domestic supply", icon: Home, color: "blue" },
    { id: "three-phase", name: "Three Phase", description: "400V/230V, commercial/industrial", icon: Building, color: "purple" }
  ];

  const installationTypes = [
    { id: "domestic", name: "Domestic", description: "Houses, flats, small properties", icon: Home, color: "green" },
    { id: "commercial", name: "Commercial", description: "Offices, shops, small businesses", icon: Building, color: "cyan" },
    { id: "industrial", name: "Industrial", description: "Factories, large facilities", icon: Factory, color: "orange" }
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
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Zap className="h-5 w-5 text-elec-yellow" />
          </div>
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        <div>
          <h4 className="font-medium mb-3 text-white/80">Select System Type:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {systemTypes.map((system) => {
              const Icon = system.icon;
              const isSelected = selectedSystem === system.id;
              return (
                <button
                  key={system.id}
                  onClick={() => handleSystemSelect(system.id)}
                  className={`relative p-4 rounded-xl border transition-all duration-300 text-left touch-manipulation active:scale-98 ${
                    isSelected
                      ? 'bg-elec-yellow/10 border-elec-yellow/50'
                      : 'bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-elec-yellow/20' : 'bg-white/5'}`}>
                      <Icon className={`h-4 w-4 ${isSelected ? 'text-elec-yellow' : 'text-white/60'}`} />
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-elec-yellow' : 'text-white'}`}>{system.name}</span>
                  </div>
                  <span className="text-xs text-white/60">{system.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-white/80">Select Installation Type:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {installationTypes.map((installation) => {
              const Icon = installation.icon;
              const isSelected = selectedInstallation === installation.id;
              return (
                <button
                  key={installation.id}
                  onClick={() => handleInstallationSelect(installation.id)}
                  className={`relative p-4 rounded-xl border transition-all duration-300 text-left touch-manipulation active:scale-98 ${
                    isSelected
                      ? 'bg-elec-yellow/10 border-elec-yellow/50'
                      : 'bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-elec-yellow/20' : 'bg-white/5'}`}>
                      <Icon className={`h-4 w-4 ${isSelected ? 'text-elec-yellow' : 'text-white/60'}`} />
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-elec-yellow' : 'text-white'}`}>{installation.name}</span>
                  </div>
                  <span className="text-xs text-white/60">{installation.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedSystem && selectedInstallation && (
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <span className="text-sm text-white/60">Selected:</span>
            <Badge className="bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30">
              {systemTypes.find(s => s.id === selectedSystem)?.name}
            </Badge>
            <Badge className="bg-green-500/10 text-green-400 border border-green-500/30">
              {installationTypes.find(i => i.id === selectedInstallation)?.name}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemTypeSelector;
