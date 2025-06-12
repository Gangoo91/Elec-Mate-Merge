
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, AlertTriangle, Zap, HardHat, Flame, Droplets, Wind } from "lucide-react";

interface Hazard {
  id: string;
  name: string;
  category: string;
  description: string;
  riskLevel: "Low" | "Medium" | "High" | "Very High";
  commonControls: string[];
  regulations: string[];
  icon: any;
}

const HazardDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const hazards: Hazard[] = [
    {
      id: "1",
      name: "Electric Shock",
      category: "Electrical",
      description: "Contact with live electrical parts causing injury or death",
      riskLevel: "Very High",
      commonControls: [
        "Isolation and lock-off procedures",
        "Prove dead testing",
        "Appropriate PPE",
        "Safe systems of work"
      ],
      regulations: ["BS 7671", "CDM Regulations", "HASAWA"],
      icon: Zap
    },
    {
      id: "2", 
      name: "Arc Flash",
      category: "Electrical",
      description: "Explosive release of energy from electrical equipment",
      riskLevel: "Very High",
      commonControls: [
        "Arc flash PPE",
        "Remote operation where possible",
        "De-energise equipment",
        "Proper working distances"
      ],
      regulations: ["BS 7671", "IEC 61482"],
      icon: Flame
    },
    {
      id: "3",
      name: "Falls from Height",
      category: "Physical",
      description: "Risk of falling when working at elevated positions",
      riskLevel: "High",
      commonControls: [
        "Edge protection systems",
        "Safety harnesses",
        "Proper ladder use",
        "Mobile elevated work platforms"
      ],
      regulations: ["Work at Height Regulations", "CDM Regulations"],
      icon: HardHat
    },
    {
      id: "4",
      name: "Chemical Exposure", 
      category: "Chemical",
      description: "Exposure to hazardous substances and chemicals",
      riskLevel: "Medium",
      commonControls: [
        "Appropriate PPE",
        "Proper ventilation",
        "COSHH assessments",
        "Safe storage procedures"
      ],
      regulations: ["COSHH Regulations", "REACH"],
      icon: Droplets
    },
    {
      id: "5",
      name: "Confined Spaces",
      category: "Environmental",
      description: "Working in spaces with restricted entry/exit",
      riskLevel: "High",
      commonControls: [
        "Atmospheric testing",
        "Emergency rescue plans",
        "Continuous monitoring",
        "Permit to work systems"
      ],
      regulations: ["Confined Spaces Regulations", "CDM Regulations"],
      icon: Wind
    }
  ];

  const categories = ["All", "Electrical", "Physical", "Chemical", "Environmental"];

  const filteredHazards = hazards.filter(hazard => {
    const matchesSearch = hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hazard.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || hazard.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-orange-500";
      case "Very High": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Hazard Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hazards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hazard Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {hazards.filter(h => h.riskLevel === "Very High").length}
            </div>
            <div className="text-sm text-muted-foreground">Very High Risk</div>
          </CardContent>
        </Card>
        <Card className="border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {hazards.filter(h => h.riskLevel === "High").length}
            </div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {hazards.filter(h => h.riskLevel === "Medium").length}
            </div>
            <div className="text-sm text-muted-foreground">Medium Risk</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {hazards.filter(h => h.riskLevel === "Low").length}
            </div>
            <div className="text-sm text-muted-foreground">Low Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Hazards List */}
      <div className="space-y-4">
        {filteredHazards.map((hazard) => {
          const IconComponent = hazard.icon;
          return (
            <Card key={hazard.id} className="border-elec-yellow/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-elec-yellow/20">
                      <IconComponent className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{hazard.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{hazard.category}</Badge>
                        <Badge className={getRiskColor(hazard.riskLevel)}>
                          {hazard.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <AlertTriangle className={`h-5 w-5 ${
                    hazard.riskLevel === "Very High" ? "text-red-400" :
                    hazard.riskLevel === "High" ? "text-orange-400" :
                    hazard.riskLevel === "Medium" ? "text-yellow-400" : "text-green-400"
                  }`} />
                </div>

                <p className="text-muted-foreground mb-4">{hazard.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-2">Common Control Measures:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {hazard.commonControls.map((control, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1">•</span>
                          {control}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Relevant Regulations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {hazard.regulations.map((regulation, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {regulation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredHazards.length === 0 && (
        <Card className="border-dashed border-elec-yellow/50">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No hazards found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HazardDatabase;
