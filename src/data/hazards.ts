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