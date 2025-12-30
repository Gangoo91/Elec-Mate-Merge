import React from "react";
import { SafetyEquipment } from "@/hooks/useSafetyEquipment";
import { HardHat, Zap, Wrench, Shield, Flashlight, Gauge, BadgeCheck, Flame, Heart } from "lucide-react";

interface QuickTemplatesProps { onSelectTemplate: (data: Partial<SafetyEquipment>) => void; }

const templates = [
  { category: "Test Equipment", items: [{ name: "Multifunction Tester", category: "Test Equipment", icon: <Gauge className="h-5 w-5" /> }, { name: "Insulation Tester", category: "Test Equipment", icon: <Zap className="h-5 w-5" /> }, { name: "PAT Tester", category: "Test Equipment", icon: <BadgeCheck className="h-5 w-5" /> }, { name: "Voltage Indicator", category: "Test Equipment", icon: <Zap className="h-5 w-5" /> }, { name: "Clamp Meter", category: "Test Equipment", icon: <Gauge className="h-5 w-5" /> }] },
  { category: "PPE", items: [{ name: "Safety Helmet", category: "PPE", icon: <HardHat className="h-5 w-5" /> }, { name: "Safety Glasses", category: "PPE", icon: <Shield className="h-5 w-5" /> }, { name: "Insulated Gloves", category: "PPE", icon: <Shield className="h-5 w-5" /> }, { name: "Hi-Vis Vest", category: "PPE", icon: <Shield className="h-5 w-5" /> }, { name: "Safety Boots", category: "PPE", icon: <Shield className="h-5 w-5" /> }] },
  { category: "Tools", items: [{ name: "Cordless Drill", category: "Power Tools", icon: <Wrench className="h-5 w-5" /> }, { name: "Step Ladder", category: "Ladders & Access", icon: <Wrench className="h-5 w-5" /> }, { name: "Extension Ladder", category: "Ladders & Access", icon: <Wrench className="h-5 w-5" /> }] },
  { category: "Safety", items: [{ name: "Fire Extinguisher", category: "Fire Safety", icon: <Flame className="h-5 w-5" /> }, { name: "First Aid Kit", category: "First Aid", icon: <Heart className="h-5 w-5" /> }, { name: "Torch", category: "Other", icon: <Flashlight className="h-5 w-5" /> }] },
];

export const QuickTemplates: React.FC<QuickTemplatesProps> = ({ onSelectTemplate }) => (
  <div className="py-4 space-y-6 overflow-y-auto max-h-[70vh]">
    {templates.map((g) => (
      <div key={g.category}>
        <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide mb-3">{g.category}</h3>
        <div className="grid grid-cols-2 gap-2">
          {g.items.map((t) => (
            <button key={t.name} onClick={() => onSelectTemplate({ name: t.name, category: t.category, status: "good" })} className="h-14 flex items-center gap-3 px-4 rounded-xl bg-card border border-border/50 text-foreground text-left touch-manipulation active:scale-95 active:bg-elec-yellow/20 transition-all">
              <div className="text-elec-yellow flex-shrink-0">{t.icon}</div>
              <span className="text-sm font-medium truncate">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);
