
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
      case "Low": return "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg shadow-green-500/30";
      case "Medium": return "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-lg shadow-yellow-500/30";
      case "High": return "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/30";
      case "Very High": return "bg-gradient-to-r from-red-500 to-red-400 text-white shadow-lg shadow-red-500/30 animate-pulse";
      default: return "bg-gradient-to-r from-gray-500 to-gray-400 text-white";
    }
  };

  const getRiskGlowColor = (level: string) => {
    switch (level) {
      case "Low": return "shadow-green-400/20";
      case "Medium": return "shadow-yellow-400/20";
      case "High": return "shadow-orange-400/20";
      case "Very High": return "shadow-red-400/30";
      default: return "shadow-gray-400/20";
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

      {/* Hazards List - Enhanced Visual Design */}
      <div className="space-y-6">
        {filteredHazards.map((hazard) => {
          const IconComponent = hazard.icon;
          return (
            <Card 
              key={hazard.id} 
              className={`group relative overflow-hidden border-elec-yellow/20 bg-gradient-to-br from-elec-card via-elec-gray/80 to-elec-gray/60 hover:border-elec-yellow/40 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${getRiskGlowColor(hazard.riskLevel)} backdrop-blur-sm`}
            >
              {/* Gradient overlay based on risk level */}
              <div className={`absolute inset-0 opacity-5 ${
                hazard.riskLevel === "Very High" ? "bg-gradient-to-br from-red-500 to-red-600" :
                hazard.riskLevel === "High" ? "bg-gradient-to-br from-orange-500 to-orange-600" :
                hazard.riskLevel === "Medium" ? "bg-gradient-to-br from-yellow-500 to-yellow-600" :
                "bg-gradient-to-br from-green-500 to-green-600"
              }`} />
              
              <CardContent className="relative p-6 sm:p-8">
                {/* Enhanced Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon with enhanced styling */}
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/30 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                      hazard.riskLevel === "Very High" ? "shadow-lg shadow-red-500/20" :
                      hazard.riskLevel === "High" ? "shadow-lg shadow-orange-500/20" :
                      hazard.riskLevel === "Medium" ? "shadow-lg shadow-yellow-500/20" :
                      "shadow-lg shadow-green-500/20"
                    }`}>
                      <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow group-hover:text-yellow-300 transition-colors duration-300" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl text-white mb-3 group-hover:text-elec-yellow transition-colors duration-300">{hazard.name}</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className="text-xs border-elec-yellow/40 text-elec-yellow/80 bg-elec-yellow/5 hover:bg-elec-yellow/10 transition-colors duration-200"
                        >
                          {hazard.category}
                        </Badge>
                        <Badge className={`${getRiskColor(hazard.riskLevel)} text-xs font-semibold px-3 py-1 border-0`}>
                          {hazard.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced risk indicator */}
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    hazard.riskLevel === "Very High" ? "bg-red-500/20 text-red-400 animate-pulse" :
                    hazard.riskLevel === "High" ? "bg-orange-500/20 text-orange-400" :
                    hazard.riskLevel === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-green-500/20 text-green-400"
                  }`}>
                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>

                {/* Enhanced description */}
                <div className="mb-6 p-4 rounded-lg bg-elec-dark/30 border-l-4 border-elec-yellow/50">
                  <p className="text-elec-light/90 text-sm sm:text-base leading-relaxed">{hazard.description}</p>
                </div>

                {/* Enhanced Content Grid */}
                <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-elec-yellow" />
                      <h4 className="font-semibold text-white text-sm sm:text-base">Control Measures</h4>
                    </div>
                    <div className="space-y-2">
                      {hazard.commonControls.map((control, index) => (
                        <div key={index} className="group flex items-start gap-3 p-3 rounded-lg bg-elec-dark/20 hover:bg-elec-dark/40 transition-colors duration-200">
                          <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                          <span className="flex-1 text-sm text-elec-light/80 group-hover:text-elec-light transition-colors duration-200">{control}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <HardHat className="h-4 w-4 text-elec-yellow" />
                      <h4 className="font-semibold text-white text-sm sm:text-base">Regulations</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hazard.regulations.map((regulation, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs border-elec-yellow/40 text-elec-yellow/90 bg-elec-yellow/5 hover:bg-elec-yellow/10 hover:border-elec-yellow/60 transition-all duration-200 px-3 py-1"
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
