import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronRight, 
  Download, 
  Building, 
  Factory, 
  Hospital,
  GraduationCap,
  ShoppingCart,
  Warehouse,
  Zap,
  Shield,
  Info
} from "lucide-react";
import { Circuit } from "./types";
import { v4 as uuidv4 } from "uuid";

interface EnhancedTemplate {
  id: string;
  name: string;
  description: string;
  installationType: string;
  buildingType: string;
  size: "small" | "medium" | "large" | "extra-large";
  complexity: "basic" | "standard" | "advanced" | "specialist";
  totalLoad: number;
  diversityFactor: number;
  estimatedCost: string;
  complianceNotes: string[];
  circuits: Omit<Circuit, 'id'>[];
  environmentalRequirements: {
    ipRating: string;
    temperatureRange: string;
    specialConditions: string[];
  };
  projectTimeline: {
    design: string;
    installation: string;
    testing: string;
  };
}

interface EnhancedInstallationTemplatesProps {
  installationType: string;
  onApplyTemplate: (circuits: Circuit[]) => void;
}

const EnhancedInstallationTemplates: React.FC<EnhancedInstallationTemplatesProps> = ({ 
  installationType, 
  onApplyTemplate 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [filterSize, setFilterSize] = useState("all");
  const [filterComplexity, setFilterComplexity] = useState("all");

  const getEnhancedTemplates = (instType: string): EnhancedTemplate[] => {
    switch (instType) {
      case "domestic":
        return [
          {
            id: "eco-home",
            name: "Eco-Friendly Smart Home",
            description: "4-bed house with solar PV, battery storage, heat pump and smart home automation",
            installationType: "domestic",
            buildingType: "Detached House",
            size: "large",
            complexity: "advanced",
            totalLoad: 28500,
            diversityFactor: 0.75,
            estimatedCost: "£8,000-£12,000",
            complianceNotes: [
              "Building Regulations Part P compliance",
              "MCS certification for renewable systems",
              "Smart home systems to BS EN 50090",
              "EV charging to BS EN 61851"
            ],
            circuits: [
              {
                name: "Solar PV System",
                loadType: "solar-inverter",
                totalLoad: 5000,
                voltage: 400,
                phases: "three",
                cableLength: 20,
                installationMethod: "clipped-direct",
                cableType: "solar-ac",
                protectiveDevice: "ac-isolator",
                enabled: true
              },
              {
                name: "Battery Storage",
                loadType: "battery-storage",
                totalLoad: 8000,
                voltage: 400,
                phases: "three",
                cableLength: 15,
                installationMethod: "clipped-direct",
                cableType: "dc-cable",
                protectiveDevice: "dc-isolator",
                enabled: true
              },
              {
                name: "Heat Pump",
                loadType: "heat-pump",
                totalLoad: 6000,
                voltage: 230,
                phases: "single",
                cableLength: 25,
                installationMethod: "swa-direct",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Smart Lighting Control",
                loadType: "smart-lighting",
                totalLoad: 800,
                voltage: 230,
                phases: "single",
                cableLength: 40,
                installationMethod: "clipped-direct",
                cableType: "data-cable",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "EV Charging Point",
                loadType: "ev-charging",
                totalLoad: 7400,
                voltage: 230,
                phases: "single",
                cableLength: 25,
                installationMethod: "swa-direct",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP44 (outdoor equipment)",
              temperatureRange: "-10°C to +50°C",
              specialConditions: ["UV resistance", "Frost protection", "Ventilation"]
            },
            projectTimeline: {
              design: "5-7 days",
              installation: "7-10 days",
              testing: "2-3 days"
            }
          }
        ];
      
      case "commercial":
        return [
          {
            id: "modern-office",
            name: "Modern Office Building",
            description: "3-storey office with intelligent lighting, HVAC control and IT infrastructure",
            installationType: "commercial",
            buildingType: "Office Building",
            size: "medium",
            complexity: "standard",
            totalLoad: 125000,
            diversityFactor: 0.8,
            estimatedCost: "£25,000-£40,000",
            complianceNotes: [
              "BS 7671 18th Edition compliance",
              "Building Regulations Part L (energy efficiency)",
              "Fire safety systems to BS EN 54",
              "Emergency lighting to BS EN 50172"
            ],
            circuits: [
              {
                name: "General Lighting - Ground Floor",
                loadType: "smart-lighting",
                totalLoad: 4000,
                voltage: 230,
                phases: "single",
                cableLength: 80,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "HVAC System",
                loadType: "hvac",
                totalLoad: 25000,
                voltage: 400,
                phases: "three",
                cableLength: 40,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "IT Server Room",
                loadType: "it-equipment",
                totalLoad: 15000,
                voltage: 230,
                phases: "single",
                cableLength: 30,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Emergency Systems",
                loadType: "emergency",
                totalLoad: 3000,
                voltage: 230,
                phases: "single",
                cableLength: 120,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "mcb",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP54 (plant areas)",
              temperatureRange: "15°C to 30°C",
              specialConditions: ["Climate control", "Fire resistance", "EMC compliance"]
            },
            projectTimeline: {
              design: "10-14 days",
              installation: "21-28 days",
              testing: "5-7 days"
            }
          }
        ];

      case "data-center":
        return [
          {
            id: "tier3-datacenter",
            name: "Tier 3 Data Center",
            description: "Resilient data center with dual power feeds, N+1 UPS and advanced cooling",
            installationType: "data-center",
            buildingType: "Data Center",
            size: "large",
            complexity: "specialist",
            totalLoad: 500000,
            diversityFactor: 0.95,
            estimatedCost: "£150,000-£250,000",
            complianceNotes: [
              "TIA-942 Tier 3 compliance",
              "BS EN 50600 data center standards",
              "ISO 27001 security requirements",
              "ASHRAE thermal guidelines"
            ],
            circuits: [
              {
                name: "Primary UPS System",
                loadType: "modular-ups",
                totalLoad: 200000,
                voltage: 400,
                phases: "three",
                cableLength: 15,
                installationMethod: "busbar",
                cableType: "power-cable",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Secondary UPS System",
                loadType: "modular-ups",
                totalLoad: 200000,
                voltage: 400,
                phases: "three",
                cableLength: 20,
                installationMethod: "busbar",
                cableType: "power-cable",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Precision Cooling",
                loadType: "cooling-system",
                totalLoad: 50000,
                voltage: 400,
                phases: "three",
                cableLength: 35,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Backup Generator",
                loadType: "backup-generator",
                totalLoad: 600000,
                voltage: 400,
                phases: "three",
                cableLength: 50,
                installationMethod: "ducted",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP54 (equipment areas)",
              temperatureRange: "18°C to 27°C",
              specialConditions: ["Seismic resistance", "Fire suppression", "EMC shielding"]
            },
            projectTimeline: {
              design: "21-30 days",
              installation: "60-90 days",
              testing: "14-21 days"
            }
          }
        ];

      case "healthcare":
        return [
          {
            id: "hospital-wing",
            name: "Hospital Clinical Wing",
            description: "Medical facility with operating theatres, MRI suite and critical care",
            installationType: "healthcare",
            buildingType: "Hospital",
            size: "large",
            complexity: "specialist",
            totalLoad: 300000,
            diversityFactor: 0.9,
            estimatedCost: "£80,000-£120,000",
            complianceNotes: [
              "HTM 06-01 medical electrical installations",
              "BS 7671 Section 710 medical locations",
              "IEC 60364-7-710 medical electrical systems",
              "Medical device regulations MDR 2017/745"
            ],
            circuits: [
              {
                name: "Operating Theatre 1",
                loadType: "operating-theatre",
                totalLoad: 12000,
                voltage: 230,
                phases: "single",
                cableLength: 15,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "it-isolator",
                enabled: true
              },
              {
                name: "MRI Equipment",
                loadType: "mri-equipment",
                totalLoad: 25000,
                voltage: 400,
                phases: "three",
                cableLength: 20,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "it-isolator",
                enabled: true
              },
              {
                name: "Medical Isolation Transformer",
                loadType: "isolation-transformer",
                totalLoad: 8000,
                voltage: 230,
                phases: "single",
                cableLength: 10,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "it-isolator",
                enabled: true
              },
              {
                name: "Critical Care Equipment",
                loadType: "medical",
                totalLoad: 15000,
                voltage: 230,
                phases: "single",
                cableLength: 20,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "rcbo",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP44 (wet areas)",
              temperatureRange: "20°C to 24°C",
              specialConditions: ["RF shielding", "Backup power", "Medical gas compatibility"]
            },
            projectTimeline: {
              design: "14-21 days",
              installation: "35-45 days",
              testing: "10-14 days"
            }
          }
        ];

      case "industrial":
        return [
          {
            id: "manufacturing-plant",
            name: "Automated Manufacturing Plant",
            description: "High-tech manufacturing with robotic systems and process control",
            installationType: "industrial",
            buildingType: "Manufacturing Facility",
            size: "extra-large",
            complexity: "specialist",
            totalLoad: 1200000,
            diversityFactor: 0.85,
            estimatedCost: "£200,000-£350,000",
            complianceNotes: [
              "BS EN 61439 switchgear standards",
              "Machinery Directive 2006/42/EC",
              "ATEX Directive 2014/34/EU (if applicable)",
              "ISO 13849 functional safety"
            ],
            circuits: [
              {
                name: "Main Production Line",
                loadType: "variable-speed-drive",
                totalLoad: 75000,
                voltage: 400,
                phases: "three",
                cableLength: 100,
                installationMethod: "tray",
                cableType: "vsd-cable",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Robotic Welding Station",
                loadType: "welding",
                totalLoad: 25000,
                voltage: 400,
                phases: "three",
                cableLength: 50,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Process Control Systems",
                loadType: "process-control",
                totalLoad: 5000,
                voltage: 24,
                phases: "dc",
                cableLength: 200,
                installationMethod: "tray",
                cableType: "instrumentation",
                protectiveDevice: "dc-breaker",
                enabled: true
              },
              {
                name: "Overhead Crane",
                loadType: "crane",
                totalLoad: 45000,
                voltage: 400,
                phases: "three",
                cableLength: 150,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP65 (production areas)",
              temperatureRange: "5°C to 40°C",
              specialConditions: ["Vibration resistance", "Oil mist protection", "EMC compliance"]
            },
            projectTimeline: {
              design: "30-45 days",
              installation: "90-120 days",
              testing: "21-30 days"
            }
          },
          {
            id: "steel-processing-plant",
            name: "Steel Processing Facility",
            description: "Heavy industrial steel processing with furnaces and rolling equipment",
            installationType: "industrial",
            buildingType: "Steel Mill",
            size: "extra-large",
            complexity: "specialist",
            totalLoad: 2500000,
            diversityFactor: 0.9,
            estimatedCost: "£400,000-£600,000",
            complianceNotes: [
              "High-voltage switchgear standards",
              "Arc flash protection requirements",
              "Heat-resistant installation methods",
              "Emergency shutdown systems"
            ],
            circuits: [
              {
                name: "Electric Arc Furnace",
                loadType: "arc-furnace",
                totalLoad: 1000000,
                voltage: 400,
                phases: "three",
                cableLength: 25,
                installationMethod: "busbar",
                cableType: "water-cooled",
                protectiveDevice: "hv-breaker",
                enabled: true
              },
              {
                name: "Induction Heating",
                loadType: "induction-furnace",
                totalLoad: 500000,
                voltage: 400,
                phases: "three",
                cableLength: 30,
                installationMethod: "busbar",
                cableType: "water-cooled",
                protectiveDevice: "hv-breaker",
                enabled: true
              },
              {
                name: "Rolling Mill Motors",
                loadType: "motor-large",
                totalLoad: 150000,
                voltage: 400,
                phases: "three",
                cableLength: 80,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Emergency Lighting",
                loadType: "emergency-lighting",
                totalLoad: 2000,
                voltage: 230,
                phases: "single",
                cableLength: 200,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "mcb",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP54 (harsh industrial)",
              temperatureRange: "-10°C to 60°C",
              specialConditions: ["Extreme heat zones", "EMI shielding", "Arc flash protection"]
            },
            projectTimeline: {
              design: "45-60 days",
              installation: "120-180 days",
              testing: "30-45 days"
            }
          },
          {
            id: "automotive-assembly",
            name: "Automotive Assembly Line",
            description: "Car manufacturing with automated assembly and paint systems",
            installationType: "industrial",
            buildingType: "Assembly Plant",
            size: "large",
            complexity: "advanced",
            totalLoad: 800000,
            diversityFactor: 0.85,
            estimatedCost: "£150,000-£250,000",
            complianceNotes: [
              "Automotive industry standards",
              "Paint booth explosion protection",
              "Robotic safety systems",
              "Clean air requirements"
            ],
            circuits: [
              {
                name: "Assembly Line Conveyors",
                loadType: "conveyor-belt",
                totalLoad: 60000,
                voltage: 400,
                phases: "three",
                cableLength: 300,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Paint Booth Systems",
                loadType: "zone1-motor",
                totalLoad: 25000,
                voltage: 400,
                phases: "three",
                cableLength: 50,
                installationMethod: "conduit",
                cableType: "swa",
                protectiveDevice: "ex-mcb",
                enabled: true
              },
              {
                name: "Robotic Welding Cells",
                loadType: "welding",
                totalLoad: 80000,
                voltage: 400,
                phases: "three",
                cableLength: 100,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP65 (wash areas), Zone 1 (paint booth)",
              temperatureRange: "15°C to 35°C",
              specialConditions: ["ATEX compliance", "Clean room standards", "Noise control"]
            },
            projectTimeline: {
              design: "25-35 days",
              installation: "60-90 days",
              testing: "15-21 days"
            }
          }
        ];

      case "education":
        return [
          {
            id: "secondary-school",
            name: "Secondary School Complex",
            description: "Complete secondary school with science labs, sports hall and IT facilities",
            installationType: "education",
            buildingType: "Secondary School",
            size: "large",
            complexity: "standard",
            totalLoad: 180000,
            diversityFactor: 0.75,
            estimatedCost: "£35,000-£55,000",
            complianceNotes: [
              "BS 7671 18th Edition compliance",
              "Building Regulations Part L (energy efficiency)",
              "DfE BB100 electrical guidelines",
              "Emergency lighting to BS EN 50172"
            ],
            circuits: [
              {
                name: "Classroom Power - Block A",
                loadType: "classroom-power",
                totalLoad: 12000,
                voltage: 230,
                phases: "single",
                cableLength: 80,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Science Laboratory Equipment",
                loadType: "lab-equipment",
                totalLoad: 18000,
                voltage: 230,
                phases: "single",
                cableLength: 40,
                installationMethod: "conduit",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Sports Hall Lighting",
                loadType: "sports-lighting",
                totalLoad: 8000,
                voltage: 230,
                phases: "single",
                cableLength: 60,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "IT Server Room",
                loadType: "it-equipment",
                totalLoad: 10000,
                voltage: 230,
                phases: "single",
                cableLength: 25,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP44 (wet areas), IP54 (workshops)",
              temperatureRange: "15°C to 25°C",
              specialConditions: ["Child safety", "Vandal resistance", "Easy maintenance"]
            },
            projectTimeline: {
              design: "14-21 days",
              installation: "35-50 days",
              testing: "7-10 days"
            }
          }
        ];

      case "hospitality":
        return [
          {
            id: "boutique-hotel",
            name: "Boutique Hotel Complex",
            description: "4-star hotel with restaurant, spa and conference facilities",
            installationType: "hospitality",
            buildingType: "Hotel",
            size: "large",
            complexity: "advanced",
            totalLoad: 250000,
            diversityFactor: 0.8,
            estimatedCost: "£50,000-£80,000",
            complianceNotes: [
              "BS 7671 18th Edition compliance",
              "Building Regulations Parts L and P",
              "Hotel industry fire safety standards",
              "Accessibility requirements"
            ],
            circuits: [
              {
                name: "Commercial Kitchen",
                loadType: "kitchen-equipment",
                totalLoad: 45000,
                voltage: 400,
                phases: "three",
                cableLength: 35,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Guest Rooms (20 rooms)",
                loadType: "guest-room",
                totalLoad: 40000,
                voltage: 230,
                phases: "single",
                cableLength: 200,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Laundry Equipment",
                loadType: "laundry-equipment",
                totalLoad: 24000,
                voltage: 400,
                phases: "three",
                cableLength: 30,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Spa Pool Equipment",
                loadType: "pool-equipment",
                totalLoad: 12000,
                voltage: 400,
                phases: "three",
                cableLength: 25,
                installationMethod: "swa-direct",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP44 (wet areas), IP65 (pool areas)",
              temperatureRange: "18°C to 28°C",
              specialConditions: ["Guest safety", "Noise control", "Emergency systems"]
            },
            projectTimeline: {
              design: "21-28 days",
              installation: "50-70 days",
              testing: "10-14 days"
            }
          }
        ];

      case "retail":
        return [
          {
            id: "shopping-center",
            name: "Shopping Centre Complex",
            description: "Modern shopping centre with retail units, food court and entertainment",
            installationType: "retail",
            buildingType: "Shopping Centre",
            size: "extra-large",
            complexity: "advanced",
            totalLoad: 800000,
            diversityFactor: 0.85,
            estimatedCost: "£120,000-£200,000",
            complianceNotes: [
              "BS 7671 18th Edition compliance",
              "Building Regulations compliance",
              "Fire safety and evacuation systems",
              "Public safety requirements"
            ],
            circuits: [
              {
                name: "Retail Display Lighting",
                loadType: "retail-lighting",
                totalLoad: 80000,
                voltage: 230,
                phases: "single",
                cableLength: 400,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Point of Sale Systems",
                loadType: "pos-systems",
                totalLoad: 15000,
                voltage: 230,
                phases: "single",
                cableLength: 200,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Cold Storage Systems",
                loadType: "cold-storage",
                totalLoad: 120000,
                voltage: 400,
                phases: "three",
                cableLength: 100,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Digital Signage",
                loadType: "digital-signage",
                totalLoad: 25000,
                voltage: 230,
                phases: "single",
                cableLength: 300,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              }
            ],
            environmentalRequirements: {
              ipRating: "IP44 (general areas), IP54 (back of house)",
              temperatureRange: "18°C to 24°C",
              specialConditions: ["Public access", "Security systems", "Emergency evacuation"]
            },
            projectTimeline: {
              design: "30-45 days",
              installation: "90-120 days",
              testing: "15-21 days"
            }
          }
        ];

      default:
        return [];
    }
  };

  const templates = getEnhancedTemplates(installationType);
  const filteredTemplates = templates.filter(template => {
    if (filterSize !== "all" && template.size !== filterSize) return false;
    if (filterComplexity !== "all" && template.complexity !== filterComplexity) return false;
    return true;
  });

  const selectedTemplateData = filteredTemplates.find(t => t.id === selectedTemplate);

  const handleApplyTemplate = () => {
    if (selectedTemplateData) {
      const circuits: Circuit[] = selectedTemplateData.circuits.map(circuit => ({
        ...circuit,
        id: uuidv4()
      }));
      onApplyTemplate(circuits);
    }
  };

  const sizeOptions = [
    { value: "all", label: "All Sizes" },
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "extra-large", label: "Extra Large" }
  ];

  const complexityOptions = [
    { value: "all", label: "All Complexities" },
    { value: "basic", label: "Basic" },
    { value: "standard", label: "Standard" },
    { value: "advanced", label: "Advanced" },
    { value: "specialist", label: "Specialist" }
  ];

  if (templates.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="text-center py-8">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Enhanced Templates Coming Soon</h3>
          <p className="text-muted-foreground">
            Enhanced templates for {installationType} installations are being developed.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getInstallationIcon = (type: string) => {
    switch (type) {
      case "commercial": return Building;
      case "industrial": return Factory;
      case "healthcare": return Hospital;
      case "education": return GraduationCap;
      case "retail": return ShoppingCart;
      case "data-center": return Warehouse;
      default: return Zap;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "basic": return "text-green-400 border-green-400/30";
      case "standard": return "text-blue-400 border-blue-400/30";
      case "advanced": return "text-orange-400 border-orange-400/30";
      case "specialist": return "text-red-400 border-red-400/30";
      default: return "text-gray-400 border-gray-400/30";
    }
  };

  const templateOptions = filteredTemplates.map(template => ({
    value: template.id,
    label: template.name
  }));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-2 gap-3">
        <MobileSelectWrapper
          label="Filter by Size"
          value={filterSize}
          onValueChange={setFilterSize}
          options={sizeOptions}
        />
        <MobileSelectWrapper
          label="Filter by Complexity"
          value={filterComplexity}
          onValueChange={setFilterComplexity}
          options={complexityOptions}
        />
      </div>

      {/* Template Selection */}
      <MobileSelectWrapper
        label="Select Enhanced Template"
        placeholder="Choose a comprehensive template"
        value={selectedTemplate}
        onValueChange={setSelectedTemplate}
        options={templateOptions}
      />

      {/* Template Details */}
      {selectedTemplateData && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-base">
              <div className="h-8 w-8 rounded bg-elec-yellow/20 flex items-center justify-center">
                {React.createElement(getInstallationIcon(selectedTemplateData.installationType), {
                  className: "h-4 w-4 text-elec-yellow"
                })}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{selectedTemplateData.name}</div>
                <p className="text-sm text-muted-foreground font-normal">
                  {selectedTemplateData.description}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 rounded-md p-3">
                <div className="text-xs text-muted-foreground">Total Load</div>
                <div className="font-medium">{(selectedTemplateData.totalLoad / 1000).toFixed(0)} kW</div>
              </div>
              <div className="bg-black/20 rounded-md p-3">
                <div className="text-xs text-muted-foreground">Estimated Cost</div>
                <div className="font-medium">{selectedTemplateData.estimatedCost}</div>
              </div>
              <div className="bg-black/20 rounded-md p-3">
                <div className="text-xs text-muted-foreground">Complexity</div>
                <Badge variant="outline" className={getComplexityColor(selectedTemplateData.complexity)}>
                  {selectedTemplateData.complexity}
                </Badge>
              </div>
              <div className="bg-black/20 rounded-md p-3">
                <div className="text-xs text-muted-foreground">Building Type</div>
                <div className="font-medium text-sm">{selectedTemplateData.buildingType}</div>
              </div>
            </div>

            {/* Circuits Overview */}
            <Collapsible 
              open={expandedTemplate === selectedTemplateData.id}
              onOpenChange={(open) => setExpandedTemplate(open ? selectedTemplateData.id : null)}
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-0 h-auto text-sm"
                >
                  <span>View {selectedTemplateData.circuits.length} circuits</span>
                  {expandedTemplate === selectedTemplateData.id ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-2 mt-3">
                {selectedTemplateData.circuits.map((circuit, index) => (
                  <div key={index} className="bg-black/20 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{circuit.name}</div>
                      <Badge variant="outline" className="text-xs">
                        {(circuit.totalLoad / 1000).toFixed(1)}kW
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {circuit.voltage}V • {circuit.phases} phase • {circuit.installationMethod}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Compliance Notes */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-300">Compliance Requirements</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {selectedTemplateData.complianceNotes.map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </div>

            {/* Project Timeline */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-300">Project Timeline</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Design</div>
                  <div className="font-medium">{selectedTemplateData.projectTimeline.design}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Installation</div>
                  <div className="font-medium">{selectedTemplateData.projectTimeline.installation}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Testing</div>
                  <div className="font-medium">{selectedTemplateData.projectTimeline.testing}</div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <Button 
              onClick={handleApplyTemplate}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Apply Enhanced Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedInstallationTemplates;