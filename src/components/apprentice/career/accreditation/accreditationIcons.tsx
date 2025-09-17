import { 
  Shield, 
  Award, 
  Building, 
  UserCheck, 
  Clipboard, 
  HardHat,
  Zap,
  FileCheck,
  ShieldCheck,
  Building2,
  LucideIcon
} from "lucide-react";

export interface AccreditationIconMapping {
  [key: string]: {
    icon: LucideIcon;
    color: string;
    bgColor: string;
  };
}

export const accreditationIconMap: AccreditationIconMapping = {
  // Competent Person Schemes - Shield icons with blue theme
  "NICEIC": {
    icon: ShieldCheck,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  "NAPIT": {
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  "ELECSA/Certsure": {
    icon: ShieldCheck,
    color: "text-blue-400", 
    bgColor: "bg-blue-500/10"
  },
  "STROMA": {
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  
  // Professional Engineering Bodies - Award icons with purple theme
  "IET": {
    icon: Award,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  "CIBSE": {
    icon: FileCheck,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  
  // Trade Associations - Building icons with green theme
  "ECA": {
    icon: Building2,
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  "SELECT": {
    icon: Building,
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  "JIB": {
    icon: UserCheck,
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  
  // Safety & Health Bodies - Safety icons with orange theme
  "IOSH": {
    icon: HardHat,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10"
  },
  "NEBOSH": {
    icon: Clipboard,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10"
  },
  
  // Project & Construction Management - Building icons with teal theme
  "APM": {
    icon: Building2,
    color: "text-teal-400",
    bgColor: "bg-teal-500/10"
  },
  "CIOB": {
    icon: Building,
    color: "text-teal-400",
    bgColor: "bg-teal-500/10"
  },
  
  // Default fallback
  "default": {
    icon: Zap,
    color: "text-elec-yellow",
    bgColor: "bg-elec-yellow/10"
  }
};

export const getAccreditationIcon = (accreditationBody: string) => {
  return accreditationIconMap[accreditationBody] || accreditationIconMap["default"];
};