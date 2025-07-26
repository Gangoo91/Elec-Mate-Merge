
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { InstallPlanData } from "./types";
import { 
  Home, Building, Factory, Zap, Lightbulb, Fan, Microwave, 
  Hospital, School, ShoppingCart, Warehouse, Truck, Ship,
  Flame, Snowflake, Car, Cpu, Wind, Sun
} from "lucide-react";

interface InstallationTypeStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const InstallationTypeStep = ({ planData, updatePlanData }: InstallationTypeStepProps) => {
  const installationTypes = [
    { value: "domestic", label: "Domestic Installation", icon: Home, description: "Residential properties, houses, flats" },
    { value: "commercial", label: "Commercial Installation", icon: Building, description: "Offices, shops, restaurants" },
    { value: "industrial", label: "Industrial Installation", icon: Factory, description: "Factories, warehouses, manufacturing" },
    { value: "healthcare", label: "Healthcare Facilities", icon: Hospital, description: "Hospitals, clinics, care homes" },
    { value: "educational", label: "Educational Buildings", icon: School, description: "Schools, colleges, universities" },
    { value: "retail", label: "Retail & Hospitality", icon: ShoppingCart, description: "Shops, hotels, entertainment venues" },
    { value: "data-centre", label: "Data Centres", icon: Cpu, description: "Server rooms, IT facilities" },
    { value: "agricultural", label: "Agricultural", icon: Wind, description: "Farms, rural installations" },
    { value: "marine", label: "Marine & Offshore", icon: Ship, description: "Ships, offshore platforms" },
    { value: "transport", label: "Transport Infrastructure", icon: Truck, description: "Railways, airports, EV charging" },
    { value: "renewable", label: "Renewable Energy", icon: Sun, description: "Solar, wind, battery storage" }
  ];

  // For multi-circuit mode, only show installation environment selection
  if (planData.designMode === "multi") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Installation Environment</h2>
          <p className="text-muted-foreground mb-6">
            Select the type of environment where this electrical installation will be located. 
            This will determine appropriate circuit types, regulations, and safety requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {installationTypes.map((type) => (
            <Card
              key={type.value}
              className={`cursor-pointer border-2 transition-all hover:scale-105 ${
                planData.installationType === type.value
                  ? 'border-elec-yellow bg-elec-yellow/10'
                  : 'border-elec-yellow/20 hover:border-elec-yellow/40'
              }`}
              onClick={() => updatePlanData({ installationType: type.value })}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base">
                  <type.icon className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                  <div>
                    <div>{type.label}</div>
                    <p className="text-sm text-muted-foreground font-normal">{type.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        {planData.installationType && (
          <Card className="bg-green-500/10 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Environment Selected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-200">
                You've selected <strong>{planData.installationType}</strong> installation environment. 
                Next, you'll design the individual circuits for this installation.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Original single-circuit mode with both installation type and load type
  const loadTypes = [
    // Standard loads
    { value: "lighting", label: "Lighting Circuit", icon: Lightbulb, description: "General lighting, LED, fluorescent", category: "Standard" },
    { value: "power", label: "Power Circuit", icon: Zap, description: "Socket outlets, general power", category: "Standard" },
    { value: "heating", label: "Heating Circuit", icon: Fan, description: "Electric heating, underfloor heating", category: "Standard" },
    { value: "cooker", label: "Cooker Circuit", icon: Microwave, description: "Electric cookers, ovens, hobs", category: "Standard" },
    
    // Specialised loads
    { value: "motor", label: "Motor Loads", icon: Fan, description: "Motors, pumps, fans, compressors", category: "Motor" },
    { value: "hvac", label: "HVAC Systems", icon: Snowflake, description: "Air conditioning, ventilation systems", category: "Motor" },
    { value: "welding", label: "Welding Equipment", icon: Flame, description: "Arc welders, resistance welders", category: "Industrial" },
    { value: "furnace", label: "Industrial Furnaces", icon: Flame, description: "Electric furnaces, kilns", category: "Industrial" },
    { value: "crane", label: "Crane & Hoist", icon: Warehouse, description: "Overhead cranes, lifting equipment", category: "Industrial" },
    
    // Specialised installations
    { value: "ev-charging", label: "EV Charging", icon: Car, description: "Electric vehicle charging points", category: "Transport" },
    { value: "emergency", label: "Emergency Systems", icon: Zap, description: "Emergency lighting, fire alarms", category: "Safety" },
    { value: "it-equipment", label: "IT Equipment", icon: Cpu, description: "Servers, networking, UPS", category: "Data" },
    { value: "medical", label: "Medical Equipment", icon: Hospital, description: "Life support, medical devices", category: "Healthcare" },
    { value: "solar-pv", label: "Solar PV Systems", icon: Sun, description: "Photovoltaic installations", category: "Renewable" },
    { value: "battery-storage", label: "Battery Storage", icon: Zap, description: "Energy storage systems", category: "Renewable" }
  ];

  const categories = [...new Set(loadTypes.map(load => load.category))];

  // Format options for dropdowns
  const installationTypeOptions = installationTypes.map(type => ({
    value: type.value,
    label: type.label
  }));

  const loadTypeOptions = loadTypes.map(load => ({
    value: load.value,
    label: load.label
  }));

  // Installation purpose options
  const installationPurposeOptions = [
    { value: "new-installation", label: "New installation" },
    { value: "circuit-addition", label: "Circuit addition/extension" },
    { value: "system-upgrade", label: "System upgrade/replacement" },
    { value: "emergency-repair", label: "Emergency repair" },
    { value: "temporary-installation", label: "Temporary installation" },
    { value: "compliance-upgrade", label: "Compliance upgrade" }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <MobileSelectWrapper
          label="Installation Purpose"
          placeholder="Select installation purpose"
          value={planData.installationPurpose || ""}
          onValueChange={(value) => updatePlanData({ installationPurpose: value })}
          options={installationPurposeOptions}
        />

        <MobileSelectWrapper
          label="Installation Environment"
          placeholder="Select installation environment"
          value={planData.installationType || ""}
          onValueChange={(value) => updatePlanData({ installationType: value })}
          options={installationTypeOptions}
        />

        <MobileSelectWrapper
          label="Load Type & Specialisation"
          placeholder="Select load type"
          value={planData.loadType || ""}
          onValueChange={(value) => updatePlanData({ loadType: value })}
          options={loadTypeOptions}
        />
      </div>

      {planData.installationPurpose && planData.installationType && planData.loadType && (
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
