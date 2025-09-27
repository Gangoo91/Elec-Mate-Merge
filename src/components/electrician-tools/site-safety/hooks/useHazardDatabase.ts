import { useState, useMemo } from 'react';
import { 
  Zap, HardHat, Flame, Droplets, Wind, Car, Sun, TestTube, 
  ClipboardCheck, Search, Package, Wrench, Shield, Home,
  Cable, Volume2, Beaker, ArrowUp
} from 'lucide-react';

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
      category: "Electrical Installation",
      description: "Contact with live electrical parts causing injury or death",
      riskLevel: "Very High",
      commonControls: [
        "Prove dead testing using calibrated voltage detector",
        "Lock-off/tag-out procedures with personal padlocks",
        "Use appropriate PPE: insulated gloves (class 0 minimum)",
        "Maintain safe working distances from live parts"
      ],
      regulations: ["BS 7671:2018+A3:2024", "IET Code of Practice", "HSE GS38"],
      icon: Zap
    },
    {
      id: "2", 
      name: "Arc Flash",
      category: "Electrical Installation",
      description: "Explosive release of energy from electrical equipment",
      riskLevel: "Very High",
      commonControls: [
        "Arc flash PPE including face shields",
        "Remote operation where possible",
        "De-energise equipment before work",
        "Maintain proper working distances"
      ],
      regulations: ["BS 7671:2018+A3:2024", "IEC 61482"],
      icon: Flame
    },
    {
      id: "3",
      name: "Consumer Unit Upgrades",
      category: "Electrical Installation",
      description: "Hazards during consumer unit replacement and electrical panel work",
      riskLevel: "High",
      commonControls: [
        "Arrange DNO isolation or use appropriate isolation procedures",
        "Verify earthing arrangements meet current standards", 
        "Test all RCDs and MCBs before energisation",
        "Use temporary supply arrangements if required"
      ],
      regulations: ["BS 7671:2018+A3:2024", "Part P Building Regulations", "IET Guidance Note 3"],
      icon: Home
    },
    {
      id: "4",
      name: "EV Charging Installation",
      category: "EV Charging",
      description: "High current electrical installation work for vehicle charging points",
      riskLevel: "High",
      commonControls: [
        "Calculate electrical load and supply capacity",
        "Install Type A RCD protection (30mA)",
        "Ensure adequate earthing and bonding",
        "Use appropriate cable sizing for load"
      ],
      regulations: ["BS 7671:2018+A3:2024", "IET Code of Practice for EV Charging", "OLEV Grant Scheme Requirements"],
      icon: Car
    },
    {
      id: "5",
      name: "Solar PV Installation",
      category: "Renewable Energy", 
      description: "Roof work and DC electrical systems installation",
      riskLevel: "High",
      commonControls: [
        "Use appropriate fall protection systems",
        "Install DC isolators in accessible locations",
        "Ensure proper earthing and bonding of metalwork",
        "Use MC4 connectors for all DC connections"
      ],
      regulations: ["BS 7671:2018+A3:2024", "MCS Installation Standards", "G99 Grid Code"],
      icon: Sun
    },
    {
      id: "6",
      name: "Falls from ladders",
      category: "Working at Height",
      description: "Risk of falling when using ladder access equipment",
      riskLevel: "Very High",
      commonControls: [
        "Use mobile elevated work platforms instead of ladders where possible",
        "Ladder stabilisers and foot spreaders for stability",
        "Full body harness with shock absorbing lanyard",
        "Implement edge protection where required"
      ],
      regulations: ["Work at Height Regulations 2005", "HSE Guidance HSG33", "IPAF guidance"],
      icon: ArrowUp
    },
    {
      id: "7",
      name: "PAT Testing",
      category: "Testing & Inspection",
      description: "Electrical testing of portable appliances and equipment",
      riskLevel: "Medium",
      commonControls: [
        "Use calibrated PAT testing equipment",
        "Follow IET Code of Practice testing procedures",
        "Visual inspection before electrical testing",
        "Apply appropriate test labels and documentation"
      ],
      regulations: ["IET Code of Practice for PAT", "Electricity at Work Regulations 1989"],
      icon: TestTube
    },
    {
      id: "8",
      name: "EICR Inspections",
      category: "Testing & Inspection",
      description: "Live testing and inspection work during condition reports",
      riskLevel: "High",
      commonControls: [
        "Use appropriate test equipment (multifunction testers)",
        "Follow safe testing procedures for live testing",
        "Obtain permission before testing (commercial premises)",
        "Document all observations and test results"
      ],
      regulations: ["BS 7671:2018+A3:2024", "IET Guidance Note 3", "Landlord & Tenant Act"],
      icon: ClipboardCheck
    },
    {
      id: "9",
      name: "Electrical Fault Finding",
      category: "Maintenance & Repair",
      description: "Live fault finding and repair work on installations",
      riskLevel: "Very High",
      commonControls: [
        "Use safe testing procedures and appropriate instruments",
        "Isolate circuits where possible for repair work",
        "Use insulated tools for live work",
        "Have emergency procedures in place"
      ],
      regulations: ["Electricity at Work Regulations 1989", "HSE GS38", "BS 7671:2018+A3:2024"],
      icon: Search
    },
    {
      id: "10",
      name: "Manual Handling",
      category: "Manual Handling",
      description: "Risk of injury from lifting, carrying or moving equipment",
      riskLevel: "Medium",
      commonControls: [
        "Use mechanical lifting aids where possible (trolleys, hoists)",
        "Team lifting for items over 25kg",
        "Proper lifting techniques - bend knees, keep back straight",
        "Use cut-resistant gloves for sharp materials"
      ],
      regulations: ["Manual Handling Operations Regulations 1992", "HSE Guidance HSG115"],
      icon: Package
    },
    {
      id: "11",
      name: "Cable Installation",
      category: "Installation Work",
      description: "Manual handling of cables and pulling operations",
      riskLevel: "Medium",
      commonControls: [
        "Use cable pulling machines for long runs",
        "Ensure adequate workforce for manual pulls",
        "Use proper pulling lubricants to reduce friction",
        "Install cable supports at appropriate intervals"
      ],
      regulations: ["Manual Handling Operations Regulations 1992", "BS 7671:2018+A3:2024"],
      icon: Cable
    },
    {
      id: "12",
      name: "Hot Work Activities",
      category: "Fire & Explosion",
      description: "Hot work including soldering and thermal cutting",
      riskLevel: "High",
      commonControls: [
        "Obtain hot work permits where required",
        "Remove combustible materials from work area",
        "Have appropriate fire extinguishers available",
        "Maintain fire watch during and after hot work"
      ],
      regulations: ["HSE HSG140 Safe use of work equipment", "DSEAR Regulations"],
      icon: Flame
    },
    {
      id: "13",
      name: "Chemical Exposure", 
      category: "Hazardous Materials",
      description: "Exposure to electrical installation chemicals and adhesives",
      riskLevel: "Medium",
      commonControls: [
        "Read and understand safety data sheets",
        "Use appropriate chemical-resistant gloves",
        "Ensure adequate ventilation in work areas",
        "Have eye wash facilities available"
      ],
      regulations: ["COSHH Regulations 2002", "HSE Guidance HSG97"],
      icon: Beaker
    },
    {
      id: "14",
      name: "Noise Exposure",
      category: "Environmental",
      description: "Hearing damage from power tools and electrical equipment",
      riskLevel: "Medium",
      commonControls: [
        "Use appropriate hearing protection (ear defenders/plugs)",
        "Take regular breaks from noisy activities",
        "Monitor noise levels with sound meter if required",
        "Use low-noise tools where available"
      ],
      regulations: ["Control of Noise at Work Regulations 2005", "HSE Guidance L108"],
      icon: Volume2
    },
    {
      id: "15",
      name: "Confined Spaces",
      category: "Environmental",
      description: "Working in restricted spaces like ducts, voids, and plant rooms",
      riskLevel: "Very High",
      commonControls: [
        "Implement confined space entry procedures",
        "Test atmosphere for oxygen, flammable gases, toxic substances",
        "Establish emergency rescue procedures",
        "Use communication systems (radios, attendant)"
      ],
      regulations: ["Confined Spaces Regulations 1997", "HSE ACOP L101"],
      icon: Wind
    },
    {
      id: "16",
      name: "Fire Alarm Systems",
      category: "Specialised Systems",
      description: "Installation and maintenance of fire detection systems",
      riskLevel: "Medium",
      commonControls: [
        "Coordinate work with building fire safety officer",
        "Implement temporary fire safety measures during installation",
        "Follow BS 5839 design and installation standards",
        "Commission system in stages to maintain protection"
      ],
      regulations: ["BS 5839-1:2017", "Regulatory Reform (Fire Safety) Order 2005"],
      icon: Shield
    },
    {
      id: "17",
      name: "Tool and Equipment Safety",
      category: "Tools & Equipment",
      description: "Use and maintenance of electrical tools and equipment",
      riskLevel: "Medium",
      commonControls: [
        "Conduct daily visual inspections of all tools",
        "PAT test all portable electrical tools annually",
        "Store tools properly in designated locations",
        "Train personnel in correct tool usage"
      ],
      regulations: ["PUWER Regulations 1998", "Electricity at Work Regulations 1989"],
      icon: Wrench
    }
  ];

  const categories = [
    "All", 
    "Electrical Installation", 
    "EV Charging", 
    "Renewable Energy", 
    "Working at Height", 
    "Testing & Inspection", 
    "Maintenance & Repair", 
    "Manual Handling", 
    "Installation Work", 
    "Fire & Explosion", 
    "Hazardous Materials", 
    "Environmental", 
    "Specialised Systems", 
    "Tools & Equipment"
  ];

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