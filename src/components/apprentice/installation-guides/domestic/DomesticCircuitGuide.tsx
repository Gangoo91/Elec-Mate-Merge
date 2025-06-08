
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Calculator, Shield } from "lucide-react";

const DomesticCircuitGuide = () => {
  const circuitTypes = [
    {
      type: "Ring Final Circuit",
      cable: "2.5mm² T&E",
      protection: "32A RCBO",
      maxFloorArea: "100m²",
      description: "Standard socket outlet circuit for general use",
      advantages: ["Lower voltage drop", "Continuity of supply if cable fault", "Established UK practice"],
      disadvantages: ["Higher cable usage", "More complex testing", "Potential for overloading"]
    },
    {
      type: "Radial Circuit", 
      cable: "2.5mm² T&E",
      protection: "20A MCB + RCD",
      maxFloorArea: "50m²",
      description: "Alternative socket circuit for smaller areas",
      advantages: ["Less cable required", "Simpler installation", "Easier fault finding"],
      disadvantages: ["Higher voltage drop", "Limited loading capacity", "No supply redundancy"]
    },
    {
      type: "Lighting Circuit",
      cable: "1.5mm² T&E", 
      protection: "6A MCB",
      maxFloorArea: "Unlimited",
      description: "Fixed lighting and switched outlets",
      advantages: ["Low current demand", "Simple installation", "Flexible switching arrangements"],
      disadvantages: ["Limited to lighting loads only", "Requires separate switching"]
    },
    {
      type: "Cooker Circuit",
      cable: "6mm² T&E",
      protection: "32A MCB",
      maxFloorArea: "N/A",
      description: "Dedicated circuit for electric cookers",
      advantages: ["High current capacity", "Dedicated protection", "Meets appliance requirements"],
      disadvantages: ["Single point of failure", "Requires diversity calculation", "High installation cost"]
    }
  ];

  const designConsiderations = [
    "Maximum demand calculations using diversity factors",
    "Voltage drop calculations for circuit length",
    "Discrimination between protective devices",
    "RCD sensitivity and time delay coordination",
    "Future expansion and modification requirements"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Circuit Design Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {circuitTypes.map((circuit, index) => (
            <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-base mb-1">{circuit.type}</h4>
                  <p className="text-sm text-muted-foreground">{circuit.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-elec-yellow text-elec-yellow text-xs">
                    {circuit.cable}
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    {circuit.protection}
                  </Badge>
                  {circuit.maxFloorArea !== "N/A" && circuit.maxFloorArea !== "Unlimited" && (
                    <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                      Max {circuit.maxFloorArea}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <h5 className="text-sm font-medium text-green-300 mb-2">Advantages</h5>
                  <ul className="space-y-1">
                    {circuit.advantages.map((advantage, idx) => (
                      <li key={idx} className="text-xs text-green-200 flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-orange-300 mb-2">Considerations</h5>
                  <ul className="space-y-1">
                    {circuit.disadvantages.map((disadvantage, idx) => (
                      <li key={idx} className="text-xs text-orange-200 flex items-start gap-2">
                        <span className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Design Considerations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {designConsiderations.map((consideration, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                {consideration}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticCircuitGuide;
