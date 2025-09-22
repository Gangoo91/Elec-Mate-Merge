import { useState, useMemo } from 'react';
import { Zap, HardHat, Flame, Droplets, Wind } from 'lucide-react';

export interface Hazard {
  id: string;
  name: string;
  category: string;
  description: string;
  riskLevel: "Low" | "Medium" | "High" | "Very High";
  commonControls: string[];
  regulations: string[];
  icon: any;
}

export const useHazardDatabase = () => {
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
    },
    {
      id: "6",
      name: "Manual Handling",
      category: "Physical",
      description: "Risk of injury from lifting, carrying or moving equipment",
      riskLevel: "Medium",
      commonControls: [
        "Mechanical aids where possible",
        "Team lifting procedures",
        "Training on safe lifting techniques",
        "Risk assessment of loads"
      ],
      regulations: ["Manual Handling Operations Regulations"],
      icon: HardHat
    },
    {
      id: "7",
      name: "Heat Burns",
      category: "Physical",
      description: "Burns from hot surfaces, equipment or electrical faults",
      riskLevel: "High",
      commonControls: [
        "Heat-resistant PPE",
        "Allow equipment to cool down",
        "Warning signs and barriers",
        "First aid training"
      ],
      regulations: ["Personal Protective Equipment at Work Regulations"],
      icon: Flame
    },
    {
      id: "8",
      name: "Noise Exposure",
      category: "Environmental",
      description: "Hearing damage from prolonged exposure to loud equipment",
      riskLevel: "Medium",
      commonControls: [
        "Hearing protection",
        "Noise level monitoring",
        "Rotation of personnel",
        "Regular hearing tests"
      ],
      regulations: ["Control of Noise at Work Regulations"],
      icon: Wind
    }
  ];

  const categories = ["All", "Electrical", "Physical", "Chemical", "Environmental"];

  const filteredHazards = useMemo(() => {
    return hazards.filter(hazard => {
      const matchesSearch = hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hazard.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || hazard.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [hazards, searchTerm, selectedCategory]);

  const getHazardById = (id: string) => hazards.find(h => h.id === id);

  const getHazardsByCategory = (category: string) => 
    category === "All" ? hazards : hazards.filter(h => h.category === category);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-orange-500";
      case "Very High": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return {
    hazards,
    filteredHazards,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    getHazardById,
    getHazardsByCategory,
    getRiskColor
  };
};