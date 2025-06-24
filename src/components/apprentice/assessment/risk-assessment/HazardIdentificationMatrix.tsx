
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Zap, HardHat, Flame, Droplets, Wind } from "lucide-react";

interface HazardCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  hazards: string[];
}

interface HazardIdentificationMatrixProps {
  onHazardSelected: (hazard: string) => void;
}

const HazardIdentificationMatrix = ({ onHazardSelected }: HazardIdentificationMatrixProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customHazard, setCustomHazard] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const hazardCategories: HazardCategory[] = [
    {
      id: "electrical",
      name: "Electrical Hazards",
      icon: Zap,
      color: "bg-red-500",
      hazards: [
        "Live conductors",
        "Damaged cables/equipment",
        "Overloaded circuits",
        "Poor earthing",
        "Arc flash potential",
        "Static electricity",
        "Underground cables",
        "Overhead power lines"
      ]
    },
    {
      id: "physical",
      name: "Physical Hazards",
      icon: HardHat,
      color: "bg-orange-500",
      hazards: [
        "Working at height",
        "Confined spaces",
        "Sharp edges/tools",
        "Heavy lifting",
        "Slip/trip hazards",
        "Falling objects",
        "Noise exposure",
        "Vibration"
      ]
    },
    {
      id: "chemical",
      name: "Chemical Hazards",
      icon: Droplets,
      color: "bg-purple-500",
      hazards: [
        "Soldering fumes",
        "Cable burning",
        "Cleaning solvents",
        "Adhesives/sealants",
        "Insulation materials",
        "Battery acid",
        "PCB exposure",
        "Asbestos (old buildings)"
      ]
    },
    {
      id: "environmental",
      name: "Environmental",
      icon: Wind,
      color: "bg-green-500",
      hazards: [
        "Extreme weather",
        "Poor lighting",
        "Temperature extremes",
        "Wet conditions",
        "Dust/particles",
        "Ventilation issues",
        "Site access issues",
        "Unstable surfaces"
      ]
    },
    {
      id: "fire",
      name: "Fire/Explosion",
      icon: Flame,
      color: "bg-red-600",
      hazards: [
        "Flammable materials",
        "Hot work operations",
        "Electrical faults",
        "Gas atmospheres",
        "Combustible dust",
        "Oxygen enrichment",
        "Ignition sources",
        "Emergency egress"
      ]
    }
  ];

  const filteredHazards = hazardCategories.map(category => ({
    ...category,
    hazards: category.hazards.filter(hazard =>
      hazard.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.hazards.length > 0 || 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHazardSelect = (hazard: string) => {
    onHazardSelected(hazard);
  };

  const handleCustomHazardSubmit = () => {
    if (customHazard.trim()) {
      onHazardSelected(customHazard.trim());
      setCustomHazard("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Hazard Identification Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Search hazards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHazards.map((category) => (
                <Card key={category.id} className="border-gray-700 bg-elec-dark">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <div className={`p-1 rounded ${category.color}`}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.hazards.map((hazard, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 px-3"
                        onClick={() => handleHazardSelect(hazard)}
                      >
                        <span className="text-xs">{hazard}</span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-300 text-sm">Custom Hazard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Describe a specific hazard not listed above..."
                    value={customHazard}
                    onChange={(e) => setCustomHazard(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomHazardSubmit()}
                  />
                  <Button onClick={handleCustomHazardSubmit} disabled={!customHazard.trim()}>
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HazardIdentificationMatrix;
