import {
  Wrench,
  Zap,
  Shield,
  HardHat,
  Ruler,
  Cable,
  Lightbulb,
  MoveVertical,
  Package,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface CategoryStyle {
  colorClass: string;
  glowColor: string;
  borderHover: string;
  iconBg: string;
  icon: LucideIcon;
  gradient: string;
}

export const categoryStyles: Record<string, CategoryStyle> = {
  "Hand Tools": {
    colorClass: "category-blue",
    glowColor: "bg-blue-500/20",
    borderHover: "hover:border-blue-500/40",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    icon: Wrench,
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  "Power Tools": {
    colorClass: "category-orange",
    glowColor: "bg-orange-500/20",
    borderHover: "hover:border-orange-500/40",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    icon: Zap,
    gradient: "from-orange-500/10 to-orange-600/5",
  },
  "Test Equipment": {
    colorClass: "category-green",
    glowColor: "bg-green-500/20",
    borderHover: "hover:border-green-500/40",
    iconBg: "bg-green-500/10 border-green-500/20",
    icon: Settings,
    gradient: "from-green-500/10 to-green-600/5",
  },
  "Safety Tools": {
    colorClass: "category-amber",
    glowColor: "bg-amber-500/20",
    borderHover: "hover:border-amber-500/40",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    icon: Shield,
    gradient: "from-amber-500/10 to-amber-600/5",
  },
  "PPE": {
    colorClass: "category-red",
    glowColor: "bg-red-500/20",
    borderHover: "hover:border-red-500/40",
    iconBg: "bg-red-500/10 border-red-500/20",
    icon: HardHat,
    gradient: "from-red-500/10 to-red-600/5",
  },
  "Access Tools & Equipment": {
    colorClass: "category-purple",
    glowColor: "bg-purple-500/20",
    borderHover: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    icon: MoveVertical,
    gradient: "from-purple-500/10 to-purple-600/5",
  },
  "Tool Storage": {
    colorClass: "category-cyan",
    glowColor: "bg-cyan-500/20",
    borderHover: "hover:border-cyan-500/40",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    icon: Package,
    gradient: "from-cyan-500/10 to-cyan-600/5",
  },
  "Specialist Tools": {
    colorClass: "category-indigo",
    glowColor: "bg-indigo-500/20",
    borderHover: "hover:border-indigo-500/40",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    icon: Settings,
    gradient: "from-indigo-500/10 to-indigo-600/5",
  },
  "Cable & Wiring": {
    colorClass: "category-purple",
    glowColor: "bg-purple-500/20",
    borderHover: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    icon: Cable,
    gradient: "from-purple-500/10 to-purple-600/5",
  },
  "Electrical Components": {
    colorClass: "category-blue",
    glowColor: "bg-blue-500/20",
    borderHover: "hover:border-blue-500/40",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    icon: Zap,
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  "Lighting": {
    colorClass: "category-amber",
    glowColor: "bg-amber-500/20",
    borderHover: "hover:border-amber-500/40",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    icon: Lightbulb,
    gradient: "from-amber-500/10 to-amber-600/5",
  },
  "Installation Tools": {
    colorClass: "category-green",
    glowColor: "bg-green-500/20",
    borderHover: "hover:border-green-500/40",
    iconBg: "bg-green-500/10 border-green-500/20",
    icon: Ruler,
    gradient: "from-green-500/10 to-green-600/5",
  },
};

// Default style for unknown categories
const defaultStyle: CategoryStyle = {
  colorClass: "category-blue",
  glowColor: "bg-primary/20",
  borderHover: "hover:border-primary/40",
  iconBg: "bg-primary/10 border-primary/20",
  icon: Wrench,
  gradient: "from-primary/10 to-primary/5",
};

export function getCategoryStyle(categoryName: string): CategoryStyle {
  return categoryStyles[categoryName] || defaultStyle;
}

export function getCategoryIcon(categoryName: string): LucideIcon {
  return categoryStyles[categoryName]?.icon || Wrench;
}
