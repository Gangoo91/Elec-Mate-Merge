
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings, Triangle } from "lucide-react";

const CommercialCircuitGuide = () => {
  const distributionSystems = [
    {
      type: "Three-Phase Distribution",
      voltage: "400V/230V",
      applications: ["Motor loads", "Large heating", "Balanced lighting"],
      advantages: ["Higher power capacity", "Better load balancing", "Smaller cable sizes"],
      considerations: ["Phase rotation important", "Neutral current with unbalanced loads", "Higher voltage safety requirements"]
    },
    {
      type: "Single Phase Supplies",
      voltage: "230V",
      applications: ["General lighting", "Socket outlets", "Small equipment"],
      advantages: ["Simple installation", "Standard domestic practices", "Lower safety requirements"],
      considerations: ["Limited power capacity", "Unbalanced loading", "Larger cable requirements"]
    }
  ];

  const circuitDesign = [
    {
      circuit: "Office Lighting",
      cable: "1.5mm² T&E",
      protection: "10A MCB",
      design: "Radial circuits with emergency lighting integration",
      features: ["PIR control", "Daylight sensing", "Emergency battery backup", "DALI control systems"]
    },
    {
      circuit: "Socket Outlets",
      cable: "2.5mm² T&E", 
      protection: "20A RCBO",
      design: "Radial circuits with RCD protection",
      features: ["13A BS 1363 outlets", "USB charging points", "Floor boxes", "Cable management"]
    },
    {
      circuit: "Air Conditioning",
      cable: "6mm² SWA",
      protection: "32A MCB + Contactor",
      design: "Dedicated three-phase supplies",
      features: ["Variable speed drives", "Power factor correction", "Remote monitoring", "Energy management"]
    },
    {
      circuit: "Fire Alarm System",
      cable: "1.5mm² FP200",
      protection: "6A MCB",
      design: "Fire-rated cable installation",
      features: ["Zone monitoring", "Fault indication", "Remote signalling", "Battery backup"]
    }
  ];

  const loadCalculations = [
    "Lighting: 100% of connected load",
    "Socket outlets: 100% first 10A, 50% remainder", 
    "Motors: 100% largest + 80% second largest + 60% remainder",
    "Heating: 100% of connected load",
    "Air conditioning: 100% with diversity for multiple units"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Triangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Distribution Systems</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {distributionSystems.map((system, index) => (
            <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-medium text-white">{system.type}</h4>
                <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
                  {system.voltage}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-300 mb-2">Applications</h5>
                  <ul className="space-y-1">
                    {system.applications.map((app, idx) => (
                      <li key={idx} className="text-blue-200 text-xs flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Advantages</h5>
                  <ul className="space-y-1">
                    {system.advantages.map((advantage, idx) => (
                      <li key={idx} className="text-green-200 text-xs flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-orange-300 mb-2">Considerations</h5>
                  <ul className="space-y-1">
                    {system.considerations.map((consideration, idx) => (
                      <li key={idx} className="text-orange-200 text-xs flex items-center gap-2">
                        <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Commercial Circuit Design</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {circuitDesign.map((circuit, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-base mb-1">{circuit.circuit}</h4>
                  <p className="text-sm text-muted-foreground">{circuit.design}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                    {circuit.cable}
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                    {circuit.protection}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-green-200 mb-2 text-sm">Features</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {circuit.features.map((feature, idx) => (
                    <div key={idx} className="text-xs text-green-100 flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Load Calculation Guidelines</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {loadCalculations.map((calculation, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                {calculation}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialCircuitGuide;
