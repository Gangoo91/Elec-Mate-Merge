
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InstallPlanData } from "./types";
import { Home, Building, Factory, Zap, Lightbulb, Fan, Microwave } from "lucide-react";

interface InstallationTypeStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const InstallationTypeStep = ({ planData, updatePlanData }: InstallationTypeStepProps) => {
  const installationTypes = [
    { value: "domestic", label: "Domestic Installation", icon: Home, description: "Residential properties, houses, flats" },
    { value: "commercial", label: "Commercial Installation", icon: Building, description: "Offices, shops, restaurants" },
    { value: "industrial", label: "Industrial Installation", icon: Factory, description: "Factories, warehouses, manufacturing" }
  ];

  const loadTypes = [
    { value: "lighting", label: "Lighting Circuit", icon: Lightbulb, description: "General lighting, LED, fluorescent" },
    { value: "power", label: "Power Circuit", icon: Zap, description: "Socket outlets, general power" },
    { value: "heating", label: "Heating Circuit", icon: Fan, description: "Electric heating, underfloor heating" },
    { value: "cooker", label: "Cooker Circuit", icon: Microwave, description: "Electric cookers, ovens, hobs" },
    { value: "immersion", label: "Immersion Heater", icon: Zap, description: "Water heating circuits" },
    { value: "motor", label: "Motor Circuit", icon: Fan, description: "Motor loads, pumps, fans" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Installation Type</h2>
        <p className="text-muted-foreground mb-6">
          Select the type of installation and the load you're planning to supply.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-lg font-medium mb-4 block">Installation Environment</Label>
          <div className="grid gap-3">
            {installationTypes.map((type) => (
              <Card
                key={type.value}
                className={`cursor-pointer border-2 transition-all ${
                  planData.installationType === type.value
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                }`}
                onClick={() => updatePlanData({ installationType: type.value })}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <type.icon className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <h3 className="font-medium">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-lg font-medium mb-4 block">Load Type</Label>
          <div className="grid gap-3">
            {loadTypes.map((load) => (
              <Card
                key={load.value}
                className={`cursor-pointer border-2 transition-all ${
                  planData.loadType === load.value
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                }`}
                onClick={() => updatePlanData({ loadType: load.value })}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <load.icon className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <h3 className="font-medium">{load.label}</h3>
                      <p className="text-sm text-muted-foreground">{load.description}</p>
                    </div>
                  </div>
                </CardContent>
              ))}
            </div>
          </div>
        </div>
      </div>

      {planData.installationType && planData.loadType && (
        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Selection Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-200">
              You've selected a <strong>{planData.loadType}</strong> circuit for a{' '}
              <strong>{planData.installationType}</strong> installation. Click Next to continue with load details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstallationTypeStep;
