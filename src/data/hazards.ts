import { Zap, HardHat, Building2, FlameKindling, Hammer, AlertTriangle, Users, Wind } from "lucide-react";

export interface HazardCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  hazards: string[];
}

export const hazardCategories: HazardCategory[] = [
  {
    id: "electrical",
    name: "Electrical Hazards",
    icon: Zap,
    color: "text-yellow-400",
    hazards: [
      "Live electrical circuits",
      "Faulty electrical equipment",
      "Exposed electrical connections",
      "Inadequate earthing",
      "Overloaded circuits",
      "Working in wet conditions near electricity",
      "Arc flash",
      "Electric shock from tools",
      "Lightning during outdoor work",
      "Static electricity discharge"
    ]
  },
  {
    id: "height",
    name: "Working at Height",
    icon: HardHat,
    color: "text-blue-400",
    hazards: [
      "Falls from ladders",
      "Falls from scaffolding",
      "Falls through roof lights",
      "Falls from mobile elevated work platforms",
      "Falls from cherry pickers",
      "Working near unprotected edges",
      "Unstable working platforms",
      "Equipment falling from height",
      "Wind affecting stability at height",
      "Poor visibility at height"
    ]
  },
  {
    id: "asbestos",
    name: "Asbestos & Hazardous Materials",
    icon: AlertTriangle,
    color: "text-red-400",
    hazards: [
      "Disturbing asbestos-containing materials",
      "Asbestos in ceiling tiles",
      "Asbestos in pipe lagging",
      "Asbestos in electrical panels",
      "Fibreglass insulation",
      "Lead paint",
      "Mineral wool",
      "Chemical vapours",
      "Dust inhalation",
      "Contaminated surfaces"
    ]
  },
  {
    id: "manual",
    name: "Manual Handling",
    icon: Hammer,
    color: "text-green-400",
    hazards: [
      "Heavy lifting of equipment",
      "Awkward lifting positions",
      "Repetitive movements",
      "Pulling cables through conduits",
      "Moving electrical panels",
      "Carrying tools up stairs",
      "Working in confined spaces",
      "Prolonged kneeling or crouching",
      "Overhead cable installation",
      "Team lifting coordination"
    ]
  },
  {
    id: "fire",
    name: "Fire & Explosion",
    icon: FlameKindling,
    color: "text-orange-400",
    hazards: [
      "Hot work near flammable materials",
      "Sparks from electrical equipment",
      "Gas leaks in vicinity",
      "Overheating electrical components",
      "Flammable adhesives and solvents",
      "Fuel storage areas",
      "Dust accumulation",
      "Blocked fire exits during work",
      "Electrical arcing",
      "Chemical reactions"
    ]
  },
  {
    id: "environmental",
    name: "Environmental",
    icon: Wind,
    color: "text-cyan-400",
    hazards: [
      "Adverse weather conditions",
      "Poor lighting conditions",
      "Noise exposure",
      "Temperature extremes",
      "UV exposure",
      "Slippery surfaces",
      "Confined spaces",
      "Poor ventilation",
      "Flooding or water ingress",
      "Unstable ground conditions"
    ]
  },
  {
    id: "equipment",
    name: "Tools & Equipment",
    icon: Building2,
    color: "text-purple-400",
    hazards: [
      "Defective hand tools",
      "Power tool malfunction",
      "Inadequate PPE",
      "Incorrect tool selection",
      "Electrical testing equipment faults",
      "Cutting and drilling operations",
      "Compressed air equipment",
      "Vehicle and plant movements",
      "Lifting equipment failure",
      "Calibration issues with test equipment"
    ]
  },
  {
    id: "human",
    name: "Human Factors",
    icon: Users,
    color: "text-pink-400",
    hazards: [
      "Inadequate training",
      "Communication failures",
      "Fatigue and stress",
      "Rushing to meet deadlines",
      "Working alone",
      "Language barriers",
      "Inexperienced personnel",
      "Health conditions affecting work",
      "Distraction and complacency",
      "Poor supervision"
    ]
  }
];

export const commonHazards = [
  "Live electrical circuits",
  "Working at height",
  "Asbestos-containing materials", 
  "Manual handling of heavy equipment",
  "Hot work operations",
  "Confined spaces",
  "Poor lighting conditions",
  "Defective tools",
  "Inadequate training",
  "Vehicle movements on site"
];

export interface RiskConsequence {
  id: string;
  hazardId: string;
  consequence: string;
  defaultControlMeasures: string[];
}

export const riskConsequences: RiskConsequence[] = [
  // Electrical Hazards
  {
    id: "elec_shock",
    hazardId: "Live electrical circuits",
    consequence: "Electric shock leading to injury or death",
    defaultControlMeasures: [
      "Isolate electrical supply and lock off",
      "Use voltage indicator to prove dead",
      "Use appropriate PPE including insulated gloves",
      "Follow permit to work procedures"
    ]
  },
  {
    id: "elec_burn",
    hazardId: "Exposed electrical connections",
    consequence: "Electrical burns from arc flash",
    defaultControlMeasures: [
      "Install appropriate barriers and guards",
      "Use arc flash rated PPE",
      "Maintain safe working distances",
      "Ensure proper earthing arrangements"
    ]
  },
  {
    id: "elec_fire",
    hazardId: "Overloaded circuits",
    consequence: "Electrical fire causing property damage",
    defaultControlMeasures: [
      "Calculate load requirements before connection",
      "Use appropriate cable ratings",
      "Install proper protection devices",
      "Regular inspection and testing"
    ]
  },
  
  // Working at Height
  {
    id: "height_fall",
    hazardId: "Falls from ladders",
    consequence: "Fall from height causing serious injury or death",
    defaultControlMeasures: [
      "Use appropriate access equipment (scaffold/MEWP)",
      "Wear full body harness with lanyard",
      "Maintain 3 points of contact on ladders",
      "Ensure competent person supervision"
    ]
  },
  {
    id: "height_object",
    hazardId: "Equipment falling from height",
    consequence: "Injury to personnel below from falling objects",
    defaultControlMeasures: [
      "Use tool lanyards and secure containers",
      "Establish exclusion zones below work area",
      "Use debris netting where required",
      "Coordinate with other trades"
    ]
  },
  
  // Asbestos & Hazardous Materials
  {
    id: "asbestos_exposure",
    hazardId: "Disturbing asbestos-containing materials",
    consequence: "Lung disease from asbestos fibre inhalation",
    defaultControlMeasures: [
      "Conduct asbestos survey before work starts",
      "Use licensed asbestos removal contractors",
      "Wear appropriate respiratory protection",
      "Follow HSE guidance on asbestos work"
    ]
  },
  {
    id: "chemical_exposure",
    hazardId: "Chemical vapours",
    consequence: "Respiratory problems from chemical inhalation",
    defaultControlMeasures: [
      "Ensure adequate ventilation",
      "Use appropriate respiratory protection",
      "Check safety data sheets",
      "Limit exposure time"
    ]
  },
  
  // Manual Handling
  {
    id: "manual_injury",
    hazardId: "Heavy lifting of equipment",
    consequence: "Musculoskeletal injury from manual handling",
    defaultControlMeasures: [
      "Use mechanical lifting aids where possible",
      "Conduct manual handling assessment",
      "Train personnel in safe lifting techniques",
      "Use team lifting for heavy items"
    ]
  },
  {
    id: "awkward_posture",
    hazardId: "Awkward lifting positions",
    consequence: "Back injury from poor lifting posture",
    defaultControlMeasures: [
      "Plan lifting operations in advance",
      "Clear access routes of obstacles",
      "Use lifting aids and equipment",
      "Rotate personnel for repetitive tasks"
    ]
  },
  
  // Fire & Explosion
  {
    id: "fire_ignition",
    hazardId: "Hot work near flammable materials",
    consequence: "Fire or explosion causing injury and property damage",
    defaultControlMeasures: [
      "Obtain hot work permit before starting",
      "Remove or protect flammable materials",
      "Provide fire extinguishers and fire watch",
      "Monitor area for 2 hours after completion"
    ]
  },
  {
    id: "gas_explosion",
    hazardId: "Gas leaks in vicinity",
    consequence: "Gas explosion causing serious injury",
    defaultControlMeasures: [
      "Use gas detection equipment",
      "Ensure no ignition sources present",
      "Ventilate confined spaces",
      "Stop work and evacuate if gas detected"
    ]
  },
  
  // Environmental
  {
    id: "weather_exposure",
    hazardId: "Adverse weather conditions",
    consequence: "Exposure-related illness or injury",
    defaultControlMeasures: [
      "Monitor weather forecasts",
      "Provide weather protection equipment",
      "Suspend outdoor work in severe conditions",
      "Ensure adequate breaks and hydration"
    ]
  },
  {
    id: "slip_trip",
    hazardId: "Slippery surfaces",
    consequence: "Slip, trip or fall injury",
    defaultControlMeasures: [
      "Keep work areas clean and tidy",
      "Use non-slip footwear",
      "Provide adequate lighting",
      "Mark or barrier hazardous areas"
    ]
  },
  
  // Tools & Equipment
  {
    id: "tool_injury",
    hazardId: "Defective hand tools",
    consequence: "Injury from tool failure or misuse",
    defaultControlMeasures: [
      "Conduct daily tool inspections",
      "Remove defective tools from service",
      "Provide appropriate tool training",
      "Use tools only for intended purpose"
    ]
  },
  {
    id: "power_tool_injury",
    hazardId: "Power tool malfunction",
    consequence: "Serious injury from power tool accident",
    defaultControlMeasures: [
      "Regular PAT testing of electrical tools",
      "Use RCD protection for all power tools",
      "Ensure guards are in place and secure",
      "Provide and use appropriate PPE"
    ]
  },
  
  // Human Factors
  {
    id: "human_error",
    hazardId: "Inadequate training",
    consequence: "Injury due to lack of competence",
    defaultControlMeasures: [
      "Provide comprehensive training programme",
      "Ensure competency assessments completed",
      "Provide ongoing supervision and support",
      "Maintain training records"
    ]
  },
  {
    id: "communication_failure",
    hazardId: "Communication failures",
    consequence: "Injury due to miscommunication",
    defaultControlMeasures: [
      "Establish clear communication protocols",
      "Use standardised hand signals",
      "Conduct regular toolbox talks",
      "Ensure language barriers addressed"
    ]
  }
];