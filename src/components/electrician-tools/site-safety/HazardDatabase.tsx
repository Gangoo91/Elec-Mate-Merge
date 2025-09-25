
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

  

  const filteredHazards = hazards.filter(hazard => {
    const matchesSearch = hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hazard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hazard.commonControls.some(control => control.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         hazard.regulations.some(reg => reg.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "High": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Very High": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Hazard Database
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive database of electrical and workplace hazards with risk assessments and control measures
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hazards, controls, or regulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 h-12"
            />
          </div>
          
        </CardContent>
      </Card>

      {/* Hazard Statistics - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-red-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {hazards.filter(h => h.riskLevel === "Very High").length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Very High Risk</div>
          </CardContent>
        </Card>
        <Card className="border-orange-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {hazards.filter(h => h.riskLevel === "High").length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {hazards.filter(h => h.riskLevel === "Medium").length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Medium Risk</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {hazards.filter(h => h.riskLevel === "Low").length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Low Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Hazards List - Clean & Simple */}
      <div className="space-y-4">
        {filteredHazards.map((hazard) => {
          const IconComponent = hazard.icon;
          return (
            <Card 
              key={hazard.id} 
              className="border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/30 transition-colors duration-200"
            >
              <CardContent className="p-6">
                {/* Simple Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                      <IconComponent className="h-5 w-5 text-elec-yellow" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white mb-2">{hazard.name}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="text-xs border-elec-yellow/30 text-elec-yellow/70"
                        >
                          {hazard.category}
                        </Badge>
                        <Badge className={`${getRiskColor(hazard.riskLevel)} text-xs border`}>
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

                {/* Simple description */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{hazard.description}</p>

                {/* Clean Content Grid */}
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                  <div>
                    <h4 className="font-medium text-white mb-3 text-sm">Control Measures</h4>
                    <ul className="space-y-2">
                      {hazard.commonControls.map((control, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-elec-yellow mt-1 text-xs">•</span>
                          <span>{control}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-3 text-sm">Regulations</h4>
                    <div className="flex flex-wrap gap-2">
                      {hazard.regulations.map((regulation, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs border-elec-yellow/30 text-muted-foreground"
                        >
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

      {/* No Results State */}
      {filteredHazards.length === 0 && (
        <Card className="border-dashed border-elec-yellow/50 bg-elec-gray/30">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No hazards found matching your search criteria.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search terms or category filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HazardDatabase;
