import {
  Cable,
  Wrench,
  Zap,
  Settings,
  Boxes,
  Shield,
  Lightbulb,
  Home,
  Wifi,
  Thermometer,
  Car,
  Flame,
  type LucideIcon,
} from "lucide-react";

export interface MaterialCategoryStyle {
  icon: LucideIcon;
  colorClass: string;
  glowColor: string;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  textColor: string;
}

export const materialCategoryStyles: Record<string, MaterialCategoryStyle> = {
  // Cables & Wiring - Blue
  cables: {
    icon: Cable,
    colorClass: "material-blue",
    glowColor: "bg-blue-500/20",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    gradientFrom: "from-blue-500/10",
    gradientTo: "to-blue-600/5",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    textColor: "text-blue-400",
  },

  // Fixings & Consumables - Slate
  "fixings-consumables": {
    icon: Wrench,
    colorClass: "material-slate",
    glowColor: "bg-slate-500/20",
    iconBg: "bg-slate-500/20 border-slate-500/30",
    gradientFrom: "from-slate-500/10",
    gradientTo: "to-slate-600/5",
    borderColor: "border-slate-500/30 hover:border-slate-500/60",
    textColor: "text-slate-400",
  },

  // Electrical Components - Orange
  components: {
    icon: Zap,
    colorClass: "material-orange",
    glowColor: "bg-orange-500/20",
    iconBg: "bg-orange-500/20 border-orange-500/30",
    gradientFrom: "from-orange-500/10",
    gradientTo: "to-orange-600/5",
    borderColor: "border-orange-500/30 hover:border-orange-500/60",
    textColor: "text-orange-400",
  },

  // Installation Accessories - Cyan
  accessories: {
    icon: Settings,
    colorClass: "material-cyan",
    glowColor: "bg-cyan-500/20",
    iconBg: "bg-cyan-500/20 border-cyan-500/30",
    gradientFrom: "from-cyan-500/10",
    gradientTo: "to-cyan-600/5",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
    textColor: "text-cyan-400",
  },

  // Cable Management & Conduit - Indigo
  "cable-management": {
    icon: Boxes,
    colorClass: "material-indigo",
    glowColor: "bg-indigo-500/20",
    iconBg: "bg-indigo-500/20 border-indigo-500/30",
    gradientFrom: "from-indigo-500/10",
    gradientTo: "to-indigo-600/5",
    borderColor: "border-indigo-500/30 hover:border-indigo-500/60",
    textColor: "text-indigo-400",
  },

  // Protection Equipment - Red
  protection: {
    icon: Shield,
    colorClass: "material-red",
    glowColor: "bg-red-500/20",
    iconBg: "bg-red-500/20 border-red-500/30",
    gradientFrom: "from-red-500/10",
    gradientTo: "to-red-600/5",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    textColor: "text-red-400",
  },

  // Lighting Solutions - Yellow
  lighting: {
    icon: Lightbulb,
    colorClass: "material-yellow",
    glowColor: "bg-yellow-500/20",
    iconBg: "bg-yellow-500/20 border-yellow-500/30",
    gradientFrom: "from-yellow-500/10",
    gradientTo: "to-yellow-600/5",
    borderColor: "border-yellow-500/30 hover:border-yellow-500/60",
    textColor: "text-yellow-400",
  },

  // Smart Home & Controls - Purple
  "smart-controls": {
    icon: Home,
    colorClass: "material-purple",
    glowColor: "bg-purple-500/20",
    iconBg: "bg-purple-500/20 border-purple-500/30",
    gradientFrom: "from-purple-500/10",
    gradientTo: "to-purple-600/5",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    textColor: "text-purple-400",
  },

  // Data & Networking - Teal
  "data-networking": {
    icon: Wifi,
    colorClass: "material-teal",
    glowColor: "bg-teal-500/20",
    iconBg: "bg-teal-500/20 border-teal-500/30",
    gradientFrom: "from-teal-500/10",
    gradientTo: "to-teal-600/5",
    borderColor: "border-teal-500/30 hover:border-teal-500/60",
    textColor: "text-teal-400",
  },

  // Heating Controls - Amber
  "heating-controls": {
    icon: Thermometer,
    colorClass: "material-amber",
    glowColor: "bg-amber-500/20",
    iconBg: "bg-amber-500/20 border-amber-500/30",
    gradientFrom: "from-amber-500/10",
    gradientTo: "to-amber-600/5",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    textColor: "text-amber-400",
  },

  // EV Charging - Green
  "ev-charging": {
    icon: Car,
    colorClass: "material-green",
    glowColor: "bg-green-500/20",
    iconBg: "bg-green-500/20 border-green-500/30",
    gradientFrom: "from-green-500/10",
    gradientTo: "to-green-600/5",
    borderColor: "border-green-500/30 hover:border-green-500/60",
    textColor: "text-green-400",
  },

  // Fire & Security - Rose
  "fire-security": {
    icon: Flame,
    colorClass: "material-rose",
    glowColor: "bg-rose-500/20",
    iconBg: "bg-rose-500/20 border-rose-500/30",
    gradientFrom: "from-rose-500/10",
    gradientTo: "to-rose-600/5",
    borderColor: "border-rose-500/30 hover:border-rose-500/60",
    textColor: "text-rose-400",
  },
};

// Default style for unknown categories
const defaultStyle: MaterialCategoryStyle = {
  icon: Zap,
  colorClass: "material-primary",
  glowColor: "bg-primary/20",
  iconBg: "bg-primary/20 border-primary/30",
  gradientFrom: "from-primary/10",
  gradientTo: "to-primary/5",
  borderColor: "border-primary/30 hover:border-primary/60",
  textColor: "text-primary",
};

export const getMaterialCategoryStyle = (categoryId: string): MaterialCategoryStyle => {
  return materialCategoryStyles[categoryId] || defaultStyle;
};

// Category metadata for titles and descriptions
export const MATERIAL_CATEGORY_META: Record<string, { title: string; description: string }> = {
  cables: {
    title: "Cables & Wiring",
    description: "Twin & Earth, SWA, flex, data and control cabling",
  },
  "fixings-consumables": {
    title: "Fixings & Consumables",
    description: "Screws, plugs, cable ties, tape and installation consumables",
  },
  components: {
    title: "Electrical Components",
    description: "Consumer units, MCBs, RCDs, isolators and accessories",
  },
  accessories: {
    title: "Installation Accessories",
    description: "Junction boxes, glands, trunking and fixings",
  },
  "cable-management": {
    title: "Cable Management & Conduit",
    description: "Trunking, conduit, cable trays and management systems",
  },
  protection: {
    title: "Protection Equipment",
    description: "Earthing, surge protection and circuit protection",
  },
  lighting: {
    title: "Lighting Solutions",
    description: "LED downlights, battens, emergency and controls",
  },
  "smart-controls": {
    title: "Smart Home & Controls",
    description: "Smart switches, dimmers, automation and control systems",
  },
  "data-networking": {
    title: "Data & Networking",
    description: "Cat6 cables, patch panels, switches and network accessories",
  },
  "heating-controls": {
    title: "Heating Controls",
    description: "Thermostats, zone valves, heating timers and controls",
  },
  "ev-charging": {
    title: "EV Charging",
    description: "Electric vehicle charging points and installation accessories",
  },
  "fire-security": {
    title: "Fire & Security",
    description: "Fire alarms, smoke detectors, security systems and panels",
  },
};
